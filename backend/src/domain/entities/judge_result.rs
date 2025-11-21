use serde::{Serialize, Deserialize};

use crate::domain::entities::TestResult;
use crate::domain::errors::DomainError;
use crate::domain::value_objects::JudgeStatus;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct JudgeResult {
    pub status: JudgeStatus,
    pub message: Option<String>,
    pub failed_test_index: Option<usize>,
    pub test_results: Vec<TestResult>,
}

impl JudgeResult {
    pub fn new(status: JudgeStatus, test_results: Vec<TestResult>) -> Self {
        let failed_test_index = test_results.iter().position(|tr| !tr.is_passed);

        Self {
            status,
            message: None,
            failed_test_index,
            test_results,
        }
    }

    pub fn is_accepted(&self) -> bool {
        self.status.is_accepted()
    }

    pub fn validate(&self) -> Result<(), DomainError> {
        if let Some(idx) = self.failed_test_index {
            if idx >= self.test_results.len() {
                return Err(DomainError::InvalidState(
                    "failed test index is out of bounds".into(),
                ));
            }
            if self.test_results[idx].is_passed {
                return Err(DomainError::InvalidState(
                    "failed test index points to a passing test".into(),
                ));
            }
        }

        if self.status.is_accepted() {
            let any_failed = self.test_results.iter().any(|t| !t.is_passed);
            if any_failed {
                return Err(DomainError::InvalidState(
                    "JudgeResult marked as Accepted but has failed tests inside".into(),
                ));
            }
        }

        Ok(())
    }
}
