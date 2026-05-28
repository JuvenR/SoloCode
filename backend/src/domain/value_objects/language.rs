use serde::{Deserialize, Serialize};
use std::{fmt, str::FromStr};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
pub enum Language {
    Rust,
    Python,
    Java,
    Cpp,
    C,
}

impl Language {
    pub fn as_str(&self) -> &'static str {
        match self {
            Language::Rust => "rust",
            Language::Python => "python",
            Language::Java => "java",
            Language::Cpp => "cpp",
            Language::C => "c",
        }
    }
}

impl fmt::Display for Language {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.as_str())
    }
}

impl FromStr for Language {
    type Err = String;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        match value.trim().to_ascii_lowercase().as_str() {
            "rust" => Ok(Language::Rust),
            "python" => Ok(Language::Python),
            "java" | "javascript" | "js" => Ok(Language::Java),
            "cpp" | "c++" => Ok(Language::Cpp),
            "c" => Ok(Language::C),
            other => Err(format!("Unsupported language: {other}")),
        }
    }
}
