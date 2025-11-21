use crate::domain::entities::{ExecutionResult, TestCase};
use crate::domain::errors::DomainError;
use crate::domain::value_objects::SubmissionExecutionConfig;

pub struct CWasmRunner;

impl CWasmRunner {
    pub fn new() -> Self {
        Self {}
    }

    pub fn execute(
        &self,
        config: &SubmissionExecutionConfig,
        test: &TestCase,
    ) -> Result<ExecutionResult, DomainError>
    {

      Err(DomainError::InvalidState(
        "not implemented".into(),
    ))
    }
}
