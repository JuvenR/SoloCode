use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
pub enum Language {
    Rust,
    Python,
    Java,
    Cpp,
    C,
}
