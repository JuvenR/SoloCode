use async_trait::async_trait;
use uuid::Uuid;

use crate::domain::entities::Submission;
use crate::domain::errors::DomainError;

#[async_trait]
pub trait SubmissionRepository {
    async fn save(&self, submission: &Submission) -> Result<(), DomainError>;
    async fn get(&self, id: Uuid) -> Result<Submission, DomainError>;
    async fn list_by_problem(&self, problem_id: Uuid) -> Result<Vec<Submission>, DomainError>;
}
