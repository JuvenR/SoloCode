use uuid::Uuid;

use crate::domain::entities::Problem;
use crate::domain::errors::DomainError;

pub trait ProblemRepository {
    fn get(&self, id: Uuid) -> Result<Problem, DomainError>;
    fn list(&self) -> Result<Vec<Problem>, DomainError>;
}
