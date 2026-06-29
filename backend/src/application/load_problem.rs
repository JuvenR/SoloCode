use crate::application::errors::ApplicationError;
use crate::domain::ports::repositories::ProblemRepository;

use std::sync::Arc;
use uuid::Uuid;

pub struct LoadProblemUseCase {
    problem_repo: Arc<dyn ProblemRepository>,
}

impl LoadProblemUseCase {
    pub fn new(problem_repo: Arc<dyn ProblemRepository>) -> Self {
        Self { problem_repo }
    }

    pub async fn execute(
        &self,
        problem_id: Uuid,
    ) -> Result<crate::domain::entities::Problem, ApplicationError> {
        let problem = self
            .problem_repo
            .get(problem_id)
            .await
            .map_err(ApplicationError::from)?;

        Ok(problem)
    }
}
