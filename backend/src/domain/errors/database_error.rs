use thiserror::Error;

#[derive(Debug, Error)]
pub enum DbError {
    #[error("Database connection error: {0}")]
    ConnectionError(String),

    #[error("Query execution error: {0}")]
    QueryError(String),

    #[error("Record not found")]
    NotFound,

    #[error("Unexpected database error: {0}")]
    Unexpected(String),
}