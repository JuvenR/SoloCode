pub mod runtime_adapter;
pub mod python_wasm_runner;
pub mod js_wasm_runner;
pub mod c_wasm_runner;
pub mod rust_wasm_runner;

// Re-export si quieres hacer accesibles las implementaciones desde afuera
pub use runtime_adapter::RuntimeAdapter;
pub use python_wasm_runner::PythonWasmRunner;
pub use js_wasm_runner::JsWasmRunner;
pub use c_wasm_runner::CWasmRunner;
pub use rust_wasm_runner::RustWasmRunner;
