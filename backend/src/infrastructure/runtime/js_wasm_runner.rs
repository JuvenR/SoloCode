use crate::domain::entities::{ExecutionResult, TestCase};
use crate::domain::errors::DomainError;
use crate::domain::value_objects::SubmissionExecutionConfig;

pub struct JsWasmRunner;

impl JsWasmRunner {
    pub fn new() -> Self {
        Self {}
    }

    pub fn execute(
        &self,
        config: &SubmissionExecutionConfig,
        test: &TestCase,
    ) -> Result<ExecutionResult, DomainError>
    {
    
    }
}
