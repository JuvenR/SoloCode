use crate::application::errors::ApplicationError;
use crate::domain::entities::{ExecutionResult, TestCase};
use crate::domain::ports::ExecutionEngine;
use crate::domain::value_objects::SubmissionExecutionConfig;

use std::sync::Arc;

pub struct RunCodeUseCase {
    engine: Arc<dyn ExecutionEngine>,
}

impl RunCodeUseCase {
    pub fn new(engine: Arc<dyn ExecutionEngine>) -> Self {
        Self { engine }
    }

    pub fn execute(
        &self,
        config: SubmissionExecutionConfig,
        test: TestCase,
    ) -> Result<ExecutionResult, ApplicationError>
    {
        let result = self.engine
            .execute_test(&config, &test)
            .map_err(ApplicationError::from)?;

        Ok(result)
    }
}
