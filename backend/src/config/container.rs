use std::sync::Arc;

use sea_orm::DatabaseConnection;

use crate::application::{
    JudgeSubmissionUseCase, LoadProblemUseCase, RunCodeUseCase, SaveSubmissionUseCase,
    errors::ApplicationError,
};
use crate::domain::ports::{ExecutionEngine, ProblemRepository, SubmissionRepository};
use crate::infrastructure::{db::DbAdapter, runtime::RuntimeAdapter, storage::StorageAdapter};

pub struct ApplicationContainer {
    pub problem_repo: Arc<dyn ProblemRepository>,
    pub submission_repo: Arc<dyn SubmissionRepository>,
    pub execution_engine: Arc<dyn ExecutionEngine>,
    pub load_problem_use_case: Arc<LoadProblemUseCase>,
    pub save_submission_use_case: Arc<SaveSubmissionUseCase>,
    pub run_code_use_case: Arc<RunCodeUseCase>,
    pub judge_submission_use_case: Arc<JudgeSubmissionUseCase>,
}

impl ApplicationContainer {
    pub fn from_connection(connection: DatabaseConnection) -> Self {
        let problem_repo: Arc<dyn ProblemRepository> = Arc::new(StorageAdapter::new());
        let submission_repo: Arc<dyn SubmissionRepository> = Arc::new(DbAdapter::new(connection));
        let execution_engine: Arc<dyn ExecutionEngine> = Arc::new(RuntimeAdapter::new());

        let load_problem_use_case = Arc::new(LoadProblemUseCase::new(problem_repo.clone()));
        let save_submission_use_case =
            Arc::new(SaveSubmissionUseCase::new(submission_repo.clone()));
        let run_code_use_case = Arc::new(RunCodeUseCase::new(execution_engine.clone()));
        let judge_submission_use_case = Arc::new(JudgeSubmissionUseCase::new(
            submission_repo.clone(),
            problem_repo.clone(),
            execution_engine.clone(),
        ));

        Self {
            problem_repo,
            submission_repo,
            execution_engine,
            load_problem_use_case,
            save_submission_use_case,
            run_code_use_case,
            judge_submission_use_case,
        }
    }

    pub async fn from_env() -> Result<Self, ApplicationError> {
        let connection = super::db::establish_connection().await?;
        Ok(Self::from_connection(connection))
    }
}
