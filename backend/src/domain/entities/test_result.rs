use serde::{Serialize, Deserialize};

use crate::domain::entities::ExecutionResult;
use crate::domain::errors::DomainError;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct TestResult {
    pub index: usize,
    pub execution: ExecutionResult,
    pub is_passed: bool,
}

impl TestResult {
    pub fn from_execution(
        index: usize,
        execution: ExecutionResult,
        expected_output: &str,
    ) -> Self {
        let is_passed = execution.stdout.trim() == expected_output.trim();

        Self {
            index,
            execution,
            is_passed,
        }
    }

    pub fn validate(&self, expected_index: usize) -> Result<(), DomainError> {
        if self.index != expected_index {
            return Err(DomainError::InvalidState(
                "TestResult index mismatch".into(),
            ));
        }

        Ok(())
    }
}
