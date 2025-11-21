use uuid::Uuid;

use crate::domain::entities::Submission;
use crate::domain::errors::DomainError;

pub trait SubmissionRepository {
    fn save(&self, submission: &Submission) -> Result<(), DomainError>;
    fn get(&self, id: Uuid) -> Result<Submission, DomainError>;
    fn list_by_problem(&self, problem_id: Uuid) -> Result<Vec<Submission>, DomainError>;
}
