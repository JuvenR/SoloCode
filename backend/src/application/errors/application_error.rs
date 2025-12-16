use crate::domain::errors::DomainError;

pub enum ApplicationError {
    Domain(DomainError),
    NotFound(String),
    Internal(String),
}

impl From<DomainError> for ApplicationError {
    fn from(e: DomainError) -> Self {
        ApplicationError::Domain(e)
    }
}
