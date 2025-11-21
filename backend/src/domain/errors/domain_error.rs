use thiserror::Error;

#[derive(Debug, Error)]
pub enum DomainError {
    #[error("Validation failed: {0}")]
    Validation(String),

    #[error("Not allowed: {0}")]
    Forbidden(String),

    #[error("Entity not found")]
    NotFound,

    #[error("Operation not permitted in current state: {0}")]
    InvalidState(String),

    #[error("{0}")]
    Other(String),
}
