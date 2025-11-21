use serde::{Serialize, Deserialize};
use uuid::Uuid;

use crate::domain::entities::JudgeResult;
use crate::domain::errors::DomainError;
use crate::domain::value_objects::Language;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Submission {
    pub id: Uuid,
    pub problem_id: Uuid,
    pub code: String,
    pub language: Language,
    pub timestamp: i64,
    pub result: Option<JudgeResult>,
}

impl Submission {
    pub fn new(problem_id: Uuid, code: String, language: Language, timestamp: i64) -> Self {
        Self {
            id: Uuid::new_v4(),
            problem_id,
            code,
            language,
            timestamp,
            result: None,
        }
    }

    pub fn validate(&self) -> Result<(), DomainError> {
        if self.code.trim().is_empty() {
            return Err(DomainError::Validation(
                "Submission code cannot be empty".into(),
            ));
        }

        Ok(())
    }

    pub fn mark_result(&mut self, result: JudgeResult) -> Result<(), DomainError> {
        if self.result.is_some() {
            return Err(DomainError::InvalidState(
                "Submission already judged".into(),
            ));
        }

        self.result = Some(result);
        Ok(())
    }

    pub fn is_accepted(&self) -> bool {
        match &self.result {
            Some(r) => r.is_accepted(),
            None => false,
        }
    }

    pub fn has_been_judged(&self) -> bool {
        self.result.is_some()
    }
}

