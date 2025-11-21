use crate::domain::ports::ExecutionEngine;
use crate::domain::entities::{ExecutionResult, TestCase};
use crate::domain::errors::DomainError;
use crate::domain::value_objects::{SubmissionExecutionConfig, Language};

use super::{
    PythonWasmRunner,
    JsWasmRunner,
    CWasmRunner,
    RustWasmRunner,
};

/// RuntimeAdapter es el punto de entrada que implementa el trait (puerto) de ExecutionEngine en runtime_port.rs
/// seleccionamos el runtime deseado de acuerdo al lenguaje escogido por el  usario.
pub struct RuntimeAdapter {
    python_runner: PythonWasmRunner,
    js_runner: JsWasmRunner,
    c_runner: CWasmRunner,
    rust_runner: RustWasmRunner,
}

impl RuntimeAdapter {
    pub fn new() -> Self {
        Self {
            python_runner: PythonWasmRunner::new(),
            js_runner: JsWasmRunner::new(),
            c_runner: CWasmRunner::new(),
            rust_runner: RustWasmRunner::new(),
        }
    }
}

impl ExecutionEngine for RuntimeAdapter {
    fn execute_test(
        &self,
        config: &SubmissionExecutionConfig,
        test: &TestCase,
    ) -> Result<ExecutionResult, DomainError> 
    {
        match config.language {
            Language::Python => self.python_runner.execute(config, test),
            Language::Java   => self.js_runner.execute(config, test),
            Language::C | Language::Cpp => self.c_runner.execute(config, test),
            Language::Rust   => self.rust_runner.execute(config, test),
        }
    }
}
