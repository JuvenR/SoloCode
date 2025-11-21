use serde::{Serialize, Deserialize};
use uuid::Uuid;

use crate::domain::errors::DomainError;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct TestCase {
    pub id: Uuid,
    pub input: String,
    pub expected_output: String,
    pub timeout_ms: u64,
}

impl TestCase {
    pub fn new(input: String, expected_output: String, timeout_ms: u64) -> Self {
        Self {
            id: Uuid::new_v4(),
            input,
            expected_output,
            timeout_ms,
        }
    }

    pub fn validate(&self) -> Result<(), DomainError> {
        if self.input.trim().is_empty() {
            return Err(DomainError::Validation(
                "TestCase input cannot be empty".into(),
            ));
        }

        if self.expected_output.trim().is_empty() {
            return Err(DomainError::Validation(
                "TestCase output cannot be empty".into(),
            ));
        }

        if self.timeout_ms == 0 {
            return Err(DomainError::Validation(
                "TestCase timeout    time cannot be zero".into(),
            ));
        }

        Ok(())
    }
}
