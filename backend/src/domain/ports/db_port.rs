use crate::domain::entities::submission::Submission;
use crate::domain::errors::DbError;
use uuid::Uuid;
use async_trait::async_trait;

#[async_trait]
pub trait SubmissionRepository {
    async fn save(&self, submission: Submission) -> Result<(), DbError>;
    async fn find_by_id(&self, id: Uuid) -> Result<Option<Submission>, DbError>;
}