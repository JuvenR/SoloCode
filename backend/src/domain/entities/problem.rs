use serde::{Serialize, Deserialize};
use uuid::Uuid;

use crate::domain::entities::TestCase;
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
}
