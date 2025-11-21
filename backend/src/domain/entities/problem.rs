use serde::{Serialize, Deserialize};
use uuid::Uuid;

use crate::domain::entities::TestCase;
use crate::domain::errors::DomainError;
use crate::domain::value_objects::Difficulty;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Problem {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub difficulty: Difficulty,
    pub testcases: Vec<TestCase>,
}

impl Problem {
    pub fn new(
        title: String,
        description: String,
        difficulty: Difficulty,
        testcases: Vec<TestCase>,
    ) -> Self {
        Self {
            id: Uuid::new_v4(),
            title,
            description,
            difficulty,
            testcases,
        }
    }

    pub fn add_testcase(&mut self, testcase: TestCase) {
        self.testcases.push(testcase);
    }

    pub fn test_count(&self) -> usize {
        self.testcases.len()
    }

    pub fn validate(&self) -> Result<(), DomainError> {
        if self.title.trim().is_empty() {
            return Err(DomainError::Validation(
                "Problem title cannot be empty".into(),
            ));
        }

        if self.description.trim().is_empty() {
            return Err(DomainError::Validation(
                "Problem description cannot be empty".into(),
            ));
        }

        if self.testcases.is_empty() {
            return Err(DomainError::Validation(
                "Problem must contain at least one TestCase".into(),
            ));
        }

        for tc in &self.testcases {
            tc.validate()?;
        }

        Ok(())
    }
}
