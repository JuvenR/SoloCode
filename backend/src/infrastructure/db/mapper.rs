use chrono::{DateTime, Utc};
use sea_orm::ActiveValue::Set;
use std::str::FromStr;

use crate::domain::entities::{JudgeResult, Submission};
use crate::domain::errors::DomainError;
use crate::domain::value_objects::Language;
use crate::infrastructure::db::entities::submission_entity;

pub fn submission_to_active_model(
    submission: &Submission,
) -> Result<submission_entity::ActiveModel, DomainError> {
    let judge_result_json = serde_json::to_value(submission.result.clone())
        .map_err(|error| DomainError::Other(format!("Failed to serialize JudgeResult: {error}")))?;

    let submitted_at_datetime = DateTime::<Utc>::from_timestamp(submission.timestamp, 0)
        .ok_or_else(|| DomainError::Other("Invalid submission timestamp".into()))?;

    Ok(submission_entity::ActiveModel {
        id: Set(submission.id),
        problem_id: Set(submission.problem_id),
        language: Set(submission.language.to_string()),
        code: Set(submission.code.clone()),
        submitted_at: Set(submitted_at_datetime),
        result: Set(judge_result_json),
    })
}

pub fn model_to_submission(model: submission_entity::Model) -> Result<Submission, DomainError> {
    let judge_result: Option<JudgeResult> =
        serde_json::from_value(model.result).map_err(|error| {
            DomainError::Other(format!("Failed to deserialize JudgeResult: {error}"))
        })?;

    let language = Language::from_str(&model.language)
        .map_err(|error| DomainError::Other(format!("Failed to parse language: {error}")))?;

    Ok(Submission {
        id: model.id,
        problem_id: model.problem_id,
        language,
        code: model.code,
        timestamp: model.submitted_at.timestamp(),
        result: judge_result,
    })
}

#[cfg(test)]
mod tests {
    use chrono::Utc;
    use sea_orm::JsonValue;
    use uuid::Uuid;

    use crate::domain::value_objects::Language;
    use crate::infrastructure::db::mapper::{model_to_submission, submission_to_active_model};
    use crate::{domain::entities::Submission, infrastructure::db::entities::submission_entity};

    #[test]
    fn submission_to_active_model_rejects_invalid_timestamp() {
        let submission = Submission::new(
            Uuid::new_v4(),
            "fn main() {}".into(),
            Language::Rust,
            i64::MAX,
        );

        let result = submission_to_active_model(&submission);
        assert!(result.is_err());
    }

    #[test]
    fn model_to_submission_maps_language_and_result() {
        let model = submission_entity::Model {
            id: Uuid::new_v4(),
            problem_id: Uuid::new_v4(),
            language: "python".into(),
            code: "print('ok')".into(),
            submitted_at: Utc::now(),
            result: JsonValue::Null,
        };

        let submission = model_to_submission(model).expect("model conversion should succeed");
        assert_eq!(submission.language, Language::Python);
        assert!(submission.result.is_none());
    }
}
