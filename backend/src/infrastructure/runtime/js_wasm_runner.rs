use crate::domain::entities::{ExecutionResult, TestCase};
use crate::domain::errors::DomainError;
use crate::domain::value_objects::SubmissionExecutionConfig;
use javy_codegen::{Generator, JS, LinkingKind, Plugin};
use std::borrow::Cow;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::{self, RecvTimeoutError};
use std::sync::Arc;
use std::thread;
use std::time::{Duration, Instant};
use wasmtime::{Config, Engine, Linker, Module, Store, StoreLimits, StoreLimitsBuilder};
use wasmtime_wasi::p2::pipe::{MemoryInputPipe, MemoryOutputPipe};
use wasmtime_wasi::preview1::{self, WasiP1Ctx};
use wasmtime_wasi::{I32Exit, WasiCtxBuilder};

// runtime de javy embebido para poder ejecutar js como wasm sin depender de node
const JAVY_PLUGIN_WASM: &[u8] = include_bytes!("../../../assets/runtime/javy/plugin.wasm");

// namespace esperado por los módulos generados con linking dinámico
const JAVY_PLUGIN_IMPORT_NAMESPACE: &str = "javy-default-plugin-v1";

// límite defensivo para evitar salidas demasiado grandes en stdout/stderr
const MAX_OUTPUT_BYTES: usize = 1024 * 1024;

// código estándar usado para marcar ejecuciones detenidas por timeout
const TIMEOUT_EXIT_CODE: i32 = 124;

pub struct JsWasmRunner;

// estado interno del store de wasmtime: contexto wasi + límites de recursos
struct JsWasmStoreState {
    wasi: WasiP1Ctx,
    limits: StoreLimits,
}

impl JsWasmRunner {
    pub fn new() -> Self {
        Self {}
    }

    pub fn execute(
        &self,
        config: &SubmissionExecutionConfig,
        test: &TestCase,
    ) -> Result<ExecutionResult, DomainError> {
        let timeout_ms = Self::resolve_timeout_ms(config, test);
        let start = Instant::now();

        // el código js del usuario se transforma a wasm antes de ejecutarse
        let wasm = Self::compile_js_to_wasm(&config.code)?;

        Self::execute_wasm(&wasm, &test.input, config, timeout_ms, start)
    }

    fn compile_js_to_wasm(code: &str) -> Result<Vec<u8>, DomainError> {
        // el plugin de javy contiene el runtime necesario para el módulo generado
        let plugin = Plugin::new(Cow::Borrowed(JAVY_PLUGIN_WASM))
            .map_err(|error| DomainError::InvalidState(format!("Invalid Javy plugin: {error}")))?;

        let js = JS::from_string(code.to_string());
        let mut generator = Generator::new(plugin);

        // linking dinámico para que el wasm generado use el plugin embebido
        generator.linking(LinkingKind::Dynamic);

        generator.generate(&js).map_err(|error| {
            DomainError::Other(format!("Failed to compile JavaScript to WASM: {error}"))
        })
    }

    fn execute_wasm(
        wasm: &[u8],
        input: &str,
        config: &SubmissionExecutionConfig,
        timeout_ms: u64,
        start: Instant,
    ) -> Result<ExecutionResult, DomainError> {
        let mut wasmtime_config = Config::new();

        // necesario para poder interrumpir código wasm en loops largos o infinitos
        wasmtime_config.epoch_interruption(true);

        let engine = Engine::new(&wasmtime_config).map_err(|error| {
            DomainError::Other(format!("Failed to create Wasmtime engine: {error}"))
        })?;

        let plugin_module = Module::new(&engine, JAVY_PLUGIN_WASM).map_err(|error| {
            DomainError::InvalidState(format!("Failed to load Javy plugin: {error}"))
        })?;

        let user_module = Module::new(&engine, wasm).map_err(|error| {
            DomainError::Other(format!("Failed to load generated WASM: {error}"))
        })?;

        // stdin/stdout/stderr viven en memoria; no se toca el filesystem del host
        let stdin = MemoryInputPipe::new(input.as_bytes().to_vec());
        let stdout = MemoryOutputPipe::new(MAX_OUTPUT_BYTES);
        let stderr = MemoryOutputPipe::new(MAX_OUTPUT_BYTES);

        let mut wasi_builder = WasiCtxBuilder::new();
        wasi_builder
            .stdin(stdin)
            .stdout(stdout.clone())
            .stderr(stderr.clone());

        // no se inyectan env vars, red ni directorios preabiertos
        let state = JsWasmStoreState {
            wasi: wasi_builder.build_p1(),
            limits: Self::store_limits(config),
        };

        let mut linker = Linker::new(&engine);

        preview1::add_to_linker_sync(&mut linker, |state: &mut JsWasmStoreState| &mut state.wasi)
            .map_err(|error| DomainError::Other(format!("Failed to configure WASI: {error}")))?;

        let mut store = Store::new(&engine, state);

        // se activa el limitador solo cuando el config define memoria máxima
        if config.memory_limit_kb > 0 {
            store.limiter(|state| &mut state.limits);
        }

        // el deadline se cumple cuando otro hilo incrementa el epoch del engine
        store.set_epoch_deadline(1);

        let timed_out = Arc::new(AtomicBool::new(false));
        let timeout_signal = Self::start_timeout_signal(&engine, timeout_ms, timed_out.clone());

        // orden de ejecución:
        // 1. cargar plugin de javy
        // 2. cargar módulo wasm del usuario
        // 3. ejecutar _start como entrypoint wasi
        let result = Self::instantiate_javy_plugin(&mut linker, &mut store, &plugin_module)
            .and_then(|()| linker.instantiate(&mut store, &user_module))
            .and_then(|instance| instance.get_typed_func::<(), ()>(&mut store, "_start"))
            .and_then(|start_func| start_func.call(&mut store, ()));

        // cancela el watcher de timeout si la ejecución ya terminó
        let _ = timeout_signal.send(());

        let elapsed_ms = start.elapsed().as_millis() as u64;
        let stdout = String::from_utf8_lossy(&stdout.contents()).to_string();
        let mut stderr = String::from_utf8_lossy(&stderr.contents()).to_string();

        let (exit_code, time_ms) = match result {
            Ok(()) if timed_out.load(Ordering::SeqCst) => {
                Self::append_timeout_message(&mut stderr);
                (TIMEOUT_EXIT_CODE, timeout_ms)
            }
            Ok(()) => (0, elapsed_ms),
            Err(_) if timed_out.load(Ordering::SeqCst) => {
                Self::append_timeout_message(&mut stderr);
                (TIMEOUT_EXIT_CODE, timeout_ms)
            }
            Err(error) => {
                if let Some(exit) = error.downcast_ref::<I32Exit>() {
                    (exit.0, elapsed_ms)
                } else {
                    if !stderr.is_empty() {
                        stderr.push('\n');
                    }

                    stderr.push_str(&error.to_string());
                    (-1, elapsed_ms)
                }
            }
        };

        Ok(ExecutionResult {
            stdout,
            stderr,
            exit_code,
            time_ms,

            // todavía no se reporta memoria real consumida por la ejecución wasm
            memory_kb: 0,
        })
    }

    fn start_timeout_signal(
        engine: &Engine,
        timeout_ms: u64,
        timed_out: Arc<AtomicBool>,
    ) -> mpsc::Sender<()> {
        let engine = engine.clone();
        let (sender, receiver) = mpsc::channel();

        thread::spawn(
            move || match receiver.recv_timeout(Duration::from_millis(timeout_ms)) {
                Ok(()) | Err(RecvTimeoutError::Disconnected) => {}
                Err(RecvTimeoutError::Timeout) => {
                    timed_out.store(true, Ordering::SeqCst);
                    engine.increment_epoch();
                }
            },
        );

        sender
    }

    fn instantiate_javy_plugin(
        linker: &mut Linker<JsWasmStoreState>,
        store: &mut Store<JsWasmStoreState>,
        plugin_module: &Module,
    ) -> wasmtime::Result<()> {
        let plugin_instance = linker.instantiate(&mut *store, plugin_module)?;

        // el módulo del usuario importa el runtime desde este namespace
        linker.instance(&mut *store, JAVY_PLUGIN_IMPORT_NAMESPACE, plugin_instance)?;

        Ok(())
    }

    fn store_limits(config: &SubmissionExecutionConfig) -> StoreLimits {
        if config.memory_limit_kb == 0 {
            return StoreLimitsBuilder::new().build();
        }

        let limit_bytes = config
            .memory_limit_kb
            .saturating_mul(1024)
            .min(usize::MAX as u64) as usize;

        StoreLimitsBuilder::new()
            .memory_size(limit_bytes)
            .trap_on_grow_failure(true)
            .build()
    }

    fn append_timeout_message(stderr: &mut String) {
        if !stderr.is_empty() {
            stderr.push('\n');
        }

        stderr.push_str("Execution timed out.");
    }

    fn resolve_timeout_ms(config: &SubmissionExecutionConfig, test: &TestCase) -> u64 {
        let config_timeout = config.time_limit_ms;
        let test_timeout = test.timeout_ms;

        match (config_timeout, test_timeout) {
            (0, 0) => 1000,
            (0, t) => t,
            (c, 0) => c,
            (c, t) => c.min(t),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::domain::entities::TestCase;
    use crate::domain::value_objects::{ExecutionMode, Language, SubmissionExecutionConfig};

    use super::JsWasmRunner;

    fn config_for(code: &str, timeout_ms: u64) -> SubmissionExecutionConfig {
        SubmissionExecutionConfig::new(
            code.into(),
            Language::JavaScript,
            timeout_ms,
            64 * 1024,
            ExecutionMode::Run,
        )
    }

    #[test]
    fn execute_returns_stdout_for_valid_script() {
        let runner = JsWasmRunner::new();
        let config = config_for(
            r#"
                const input = new Uint8Array(1024);
                const n = Javy.IO.readSync(0, input);
                const text = new TextDecoder().decode(input.subarray(0, n)).trim();
                const output = new TextEncoder().encode(text.toUpperCase());
                Javy.IO.writeSync(1, output);
                "#,
            5000,
        );

        let testcase = TestCase::new("hello".into(), "HELLO".into(), 5000);

        let result = runner
            .execute(&config, &testcase)
            .expect("runner should execute successfully");

        assert_eq!(result.exit_code, 0, "{result:?}");
        assert_eq!(result.stdout.trim(), "HELLO", "{result:?}");
        assert!(result.stderr.trim().is_empty(), "{result:?}");
    }

    #[test]
    fn execute_returns_stderr_and_non_zero_for_runtime_error() {
        let runner = JsWasmRunner::new();
        let config = config_for(r#"throw new Error("boom");"#, 5000);
        let testcase = TestCase::new("input".into(), "unused".into(), 5000);

        let result = runner
            .execute(&config, &testcase)
            .expect("runner should return runtime error result");

        assert_ne!(result.exit_code, 0, "{result:?}");
        assert!(result.stderr.contains("boom"), "{result:?}");
    }

    #[test]
    fn execute_times_out_for_slow_script() {
        let runner = JsWasmRunner::new();
        let config = config_for("while (true) {}", 50);
        let testcase = TestCase::new("input".into(), "unused".into(), 50);

        let result = runner
            .execute(&config, &testcase)
            .expect("runner should return timeout result");

        assert_eq!(result.exit_code, 124, "{result:?}");
        assert!(result.stderr.contains("timed out"), "{result:?}");
    }
}