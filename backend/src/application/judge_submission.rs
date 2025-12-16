use crate::domain::ports::ExecutionEngine;
use crate::domain::ports::repositories::{
    ProblemRepository,
    SubmissionRepository,
};
use crate::application::errors::ApplicationError;

use std::sync::Arc;

pub struct JudgeSubmissionUseCase {
    submission_repo: Arc<dyn SubmissionRepository>,
    problem_repo: Arc<dyn ProblemRepository>,
    engine: Arc<dyn ExecutionEngine>,
}

impl JudgeSubmissionUseCase {
    pub fn new(
        submission_repo: Arc<dyn SubmissionRepository>,
        problem_repo: Arc<dyn ProblemRepository>,
        engine: Arc<dyn ExecutionEngine>,
    ) -> Self {
        Self {
            submission_repo,
            problem_repo,
            engine,
        }
    }

    pub fn execute(&self)
        -> Result<(), ApplicationError>
    {
        // cargar submission
        // cargar programa
        // construir el config
        // correr por  el puerto de ejecucion
        // computar resulrado
        // guardar la submission con el resultado

        Ok(())
    }
}
