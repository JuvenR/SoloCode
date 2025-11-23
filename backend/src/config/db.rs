use sea_orm::{Database, DatabaseConnection, DbErr, Schema, ConnectionTrait};
use crate::infrastructure::db::submission_entity;
use std::env;

pub async fn establish_connection() -> Result<DatabaseConnection, DbErr> {
    dotenvy::dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = Database::connect(&db_url).await?;

    let schema = Schema::new(db.get_database_backend());

    let mut create_table_statement = schema.create_table_from_entity(submission_entity::Entity);

    db.execute(db.get_database_backend().build(
        create_table_statement.if_not_exists()
    )).await?;

    println!("Database connection established and `submissions` table is ready.");

    Ok(db)
}