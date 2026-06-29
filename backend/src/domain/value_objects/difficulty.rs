use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
pub enum Difficulty {
    Easy,
    Medium,
    Hard,
}
