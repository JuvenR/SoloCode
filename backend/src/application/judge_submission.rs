use crate::application::errors::ApplicationError;
use crate::domain::ports::ExecutionEngine;
use crate::domain::ports::repositories::{ProblemRepository, SubmissionRepository};

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

    pub async fn execute(&self) -> Result<(), ApplicationError> {
        let _ = &self.submission_repo;
        let _ = &self.problem_repo;
        let _ = &self.engine;

        // cargar submission
        // cargar programa
        // construir el config
        // correr por  el puerto de ejecucion
        // computar resulrado
        // guardar la submission con el resultado

        Ok(())
    }
}
