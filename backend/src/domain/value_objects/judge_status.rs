use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
pub enum JudgeStatus {
    Accepted,
    WrongAnswer,
    TimeLimitExceeded,
    RuntimeError,
}

impl JudgeStatus {
    pub fn is_accepted(&self) -> bool {
        matches!(self, JudgeStatus::Accepted)
    }
}
