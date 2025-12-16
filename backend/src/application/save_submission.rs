use crate::application::errors::ApplicationError;
use crate::domain::entities::Submission;
use crate::domain::ports::repositories::SubmissionRepository;

use std::sync::Arc;

pub struct SaveSubmissionUseCase {
    submission_repo: Arc<dyn SubmissionRepository>,
}

impl SaveSubmissionUseCase {
    pub fn new(submission_repo: Arc<dyn SubmissionRepository>) -> Self {
        Self { submission_repo }
    }

    pub fn execute(&self, submission: Submission) -> Result<(), ApplicationError> {
        self.submission_repo
            .save(&submission)
            .map_err(ApplicationError::from)?;

        Ok(())
    }
}
