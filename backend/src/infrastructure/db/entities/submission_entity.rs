use sea_orm::entity::prelude::*;
use uuid::Uuid;
use sea_orm::JsonValue;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "submissions")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: Uuid,
    pub problem_id: Uuid,
    pub language: String,
    #[sea_orm(column_type = "Text")]
    pub code: String,
    pub submitted_at: DateTimeUtc,
    #[sea_orm(column_type = "Json")]
    pub result: JsonValue,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}