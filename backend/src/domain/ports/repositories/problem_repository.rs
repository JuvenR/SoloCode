use async_trait::async_trait;
use uuid::Uuid;

use crate::domain::entities::Problem;
use crate::domain::errors::DomainError;

#[async_trait]
pub trait ProblemRepository {
    async fn get(&self, id: Uuid) -> Result<Problem, DomainError>;
    async fn list(&self) -> Result<Vec<Problem>, DomainError>;
}
