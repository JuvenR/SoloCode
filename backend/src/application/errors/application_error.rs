use thiserror::Error;

use crate::domain::errors::{DbError, DomainError};

#[derive(Debug, Error)]
pub enum ApplicationError {
    #[error(transparent)]
    Domain(#[from] DomainError),

    #[error(transparent)]
    Database(#[from] DbError),

    #[error("Not found: {0}")]
    NotFound(String),

    #[error("Internal error: {0}")]
    Internal(String),
}

impl From<sea_orm::DbErr> for ApplicationError {
    fn from(error: sea_orm::DbErr) -> Self {
        ApplicationError::Internal(error.to_string())
    }
}
