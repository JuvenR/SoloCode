use sea_orm::{DatabaseConnection, ActiveModelTrait, EntityTrait};
use crate::domain::ports::db_port::SubmissionRepository;
use crate::domain::entities::submission::Submission;
use crate::domain::errors::DbError;
use crate::infrastructure::db::entities::submission_entity;
use async_trait::async_trait;

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
    async fn save(&self, submission: Submission) -> Result<(), DbError> {
        let active_model: submission_entity::ActiveModel = submission.into(); 
        
        active_model.insert(&self.connection)
            .await
            .map_err(|db_err| DbError::QueryError(db_err.to_string()))?;
        
        Ok(())
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Result<Option<Submission>, DbError> {
        let model = submission_entity::Entity::find_by_id(id)
            .one(&self.connection)
            .await
            .map_err(|db_err| DbError::QueryError(db_err.to_string()))?;

        Ok(model.map(|m| m.into()))
    }
}