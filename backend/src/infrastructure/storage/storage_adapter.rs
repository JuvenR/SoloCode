use async_trait::async_trait;
use std::collections::HashMap;
use uuid::Uuid;

use crate::domain::entities::{Problem, TestCase};
use crate::domain::errors::DomainError;
use crate::domain::ports::repositories::ProblemRepository;
use crate::domain::value_objects::Difficulty;

pub struct StorageAdapter {
    problems: HashMap<Uuid, Problem>,
}

impl StorageAdapter {
    pub fn new() -> Self {
        let problems = Self::seed_problems()
            .into_iter()
            .map(|problem| (problem.id, problem))
            .collect();

        Self { problems }
    }

    fn seed_problems() -> Vec<Problem> {
        vec![Problem::new(
            "Two Sum".into(),
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.".into(),
            Difficulty::Easy,
            vec![TestCase::new("2 7 11 15\n9".into(), "0 1".into(), 1000)],
        )]
    }
}

impl Default for StorageAdapter {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl ProblemRepository for StorageAdapter {
    async fn get(&self, id: Uuid) -> Result<Problem, DomainError> {
        self.problems.get(&id).cloned().ok_or(DomainError::NotFound)
    }

    async fn list(&self) -> Result<Vec<Problem>, DomainError> {
        Ok(self.problems.values().cloned().collect())
    }
}

#[cfg(test)]
mod tests {
    use super::StorageAdapter;
    use crate::domain::ports::repositories::ProblemRepository;
    use uuid::Uuid;

    #[tokio::test]
    async fn seeded_problem_list_is_not_empty() {
        let adapter = StorageAdapter::new();
        let problems = adapter.list().await.expect("list should succeed");
        assert!(!problems.is_empty());
    }

    #[tokio::test]
    async fn unknown_problem_returns_not_found() {
        let adapter = StorageAdapter::new();
        let result = adapter.get(Uuid::new_v4()).await;
        assert!(result.is_err());
    }
}
