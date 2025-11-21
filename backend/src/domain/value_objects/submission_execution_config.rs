use serde::{Serialize, Deserialize};

use crate::domain::errors::DomainError;
use crate::domain::value_objects::{ExecutionMode, Language};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SubmissionExecutionConfig {
    pub code: String,
    pub language: Language,
    pub time_limit_ms: u64,
    pub memory_limit_kb: u64,
    pub mode: ExecutionMode,
}

impl SubmissionExecutionConfig {
    pub fn new(
        code: String,
        language: Language,
        time_limit_ms: u64,
        memory_limit_kb: u64,
        mode: ExecutionMode,
    ) -> Self {
        Self {
            code,
            language,
            time_limit_ms,
            memory_limit_kb,
            mode,
        }
    }

    pub fn validate(&self) -> Result<(), DomainError> {
        if self.code.trim().is_empty() {
            return Err(DomainError::Validation(
                "Submission cannot be empty".into(),
            ));
        }

        if self.time_limit_ms == 0 {
            return Err(DomainError::Validation(
                "time limit must be greater than 0".into(),
            ));
        }

        if self.memory_limit_kb < 64 {
            return Err(DomainError::Validation(
                "memory lmit must be greater or equal than 64KB".into(),
            ));
        }

        Ok(())
    }
}
