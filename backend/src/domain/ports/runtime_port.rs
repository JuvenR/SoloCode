use crate::domain::entities::ExecutionResult;
use crate::domain::entities::TestCase;
use crate::domain::value_objects::SubmissionExecutionConfig;
use crate::domain::errors::DomainError;

pub trait ExecutionEngine {
    fn execute_test(
        &self,
        config: &SubmissionExecutionConfig,
        test: &TestCase,
    ) -> Result<ExecutionResult, DomainError>;
}
