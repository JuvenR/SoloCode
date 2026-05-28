use async_trait::async_trait;
use sea_orm::{ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use uuid::Uuid;

use crate::domain::entities::Submission;
use crate::domain::errors::DomainError;
use crate::domain::ports::repositories::SubmissionRepository;
use crate::infrastructure::db::entities::submission_entity;
use crate::infrastructure::db::mapper::{model_to_submission, submission_to_active_model};

pub struct DbAdapter {
    connection: DatabaseConnection,
}

impl DbAdapter {
    pub fn new(connection: DatabaseConnection) -> Self {
        Self { connection }
    }
}

#[async_trait]
impl SubmissionRepository for DbAdapter {
    async fn save(&self, submission: &Submission) -> Result<(), DomainError> {
        let active_model = submission_to_active_model(submission)?;

        active_model
            .insert(&self.connection)
            .await
            .map_err(|db_error| {
                DomainError::Other(format!("Insert submission failed: {db_error}"))
            })?;

        Ok(())
    }

    async fn get(&self, id: Uuid) -> Result<Submission, DomainError> {
        let model = submission_entity::Entity::find_by_id(id)
            .one(&self.connection)
            .await
            .map_err(|db_error| {
                DomainError::Other(format!("Find submission failed: {db_error}"))
            })?;

        match model {
            Some(model) => model_to_submission(model),
            None => Err(DomainError::NotFound),
        }
    }

    async fn list_by_problem(&self, problem_id: Uuid) -> Result<Vec<Submission>, DomainError> {
        let models = submission_entity::Entity::find()
            .filter(submission_entity::Column::ProblemId.eq(problem_id))
            .all(&self.connection)
            .await
            .map_err(|db_error| {
                DomainError::Other(format!("List submissions by problem failed: {db_error}"))
            })?;

        models.into_iter().map(model_to_submission).collect()
    }
}
