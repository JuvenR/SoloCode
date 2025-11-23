use sea_orm::ActiveValue::Set;
use crate::domain::value_objects::Language;
use crate::domain::{entities::submission::Submission, value_objects::language};
use crate::infrastructure::db::entities::submission_entity;
use std::str::FromStr;
use chrono::{DateTime, Utc}; 

impl From<Submission> for submission_entity::ActiveModel {
    fn from(submission: Submission) -> Self {
        let judge_result_json = serde_json::to_value(submission.result) 
            .expect("Failed to serialize JudgeResult");

        let submitted_at_datetime = DateTime::from_timestamp(submission.timestamp, 0)
            .expect("Invalid timestamp");

        let language_str: String = format!("{:?}", submission.language); 
        
        Self {
            id: Set(submission.id),
            problem_id: Set(submission.problem_id),
            language: Set(language_str),
            code: Set(submission.code),
            submitted_at: Set(submitted_at_datetime), 
            result: Set(judge_result_json),
        }
    }
}

impl From<submission_entity::Model> for Submission {
    fn from(model: submission_entity::Model) -> Self {
        let judge_result = serde_json::from_value(model.result)
            .expect("Failed to deserialize JudgeResult");

        let language_enum : Result<Language, serde_json::Error> = serde_json::from_str(&model.language) ;

        Self {
            id: model.id,
            problem_id: model.problem_id,
            language: language_enum.expect("Failed to parse Language enum"),
            code: model.code,
            timestamp: model.submitted_at.timestamp(),
            result: judge_result,
        }
    }
}