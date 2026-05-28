use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::domain::entities::JudgeResult;
use crate::domain::errors::DomainError;
use crate::domain::value_objects::Language;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Submission {
    pub id: Uuid,
    pub problem_id: Uuid,
    pub code: String,
    pub language: Language,
    pub timestamp: i64,
    pub result: Option<JudgeResult>,
}

impl Submission {
    pub fn new(problem_id: Uuid, code: String, language: Language, timestamp: i64) -> Self {
        Self {
            id: Uuid::new_v4(),
            problem_id,
            code,
            language,
            timestamp,
            result: None,
        }
    }

    pub fn validate(&self) -> Result<(), DomainError> {
        if self.code.trim().is_empty() {
            return Err(DomainError::Validation(
                "Submission code cannot be empty".into(),
            ));
        }

        Ok(())
    }

    pub fn mark_result(&mut self, result: JudgeResult) -> Result<(), DomainError> {
        if self.result.is_some() {
            return Err(DomainError::InvalidState(
                "Submission already judged".into(),
            ));
        }

        self.result = Some(result);
        Ok(())
    }

    pub fn is_accepted(&self) -> bool {
        match &self.result {
            Some(r) => r.is_accepted(),
            None => false,
        }
    }

    pub fn has_been_judged(&self) -> bool {
        self.result.is_some()
    }
}

#[cfg(test)]
mod tests {
    use uuid::Uuid;

    use crate::domain::entities::{ExecutionResult, JudgeResult, TestResult};
    use crate::domain::value_objects::{JudgeStatus, Language};

    use super::Submission;

    fn accepted_result() -> JudgeResult {
        let execution = ExecutionResult {
            stdout: "ok".into(),
            stderr: "".into(),
            exit_code: 0,
            time_ms: 1,
            memory_kb: 64,
        };

        let test_result = TestResult::from_execution(0, execution, "ok");
        JudgeResult::new(JudgeStatus::Accepted, vec![test_result])
    }

    #[test]
    fn validate_rejects_empty_code() {
        let submission = Submission::new(Uuid::new_v4(), "".into(), Language::Python, 0);
        assert!(submission.validate().is_err());
    }

    #[test]
    fn mark_result_is_single_use() {
        let mut submission = Submission::new(
            Uuid::new_v4(),
            "print('hi')".into(),
            Language::Python,
            1_700_000_000,
        );

        submission
            .mark_result(accepted_result())
            .expect("first mark should succeed");
        assert!(submission.has_been_judged());
        assert!(submission.is_accepted());
        assert!(submission.mark_result(accepted_result()).is_err());
    }
}
