import type {
    ExecutionResult,
    PythonCaseResult,
    PythonHarnessReport,
    PythonWorkerRequest,
    PythonWorkerResponse,
    RunnerRequest,
    RunnerTestCase,
} from "../types";

const DEFAULT_TIMEOUT_MS = 3000;
const PYODIDE_LOAD_TIMEOUT_MS = 30000;

// MVP frontend runner. The future production-grade backend path belongs in
// backend/src/infrastructure/runtime/python_wasm_runner.rs using CPython WASI + Wasmtime.
export class PythonPyodideRunner {
    private worker: Worker | null = null;
    private readyPromise: Promise<void> | null = null;
    private nextRequestId = 1;

    async run(request: RunnerRequest): Promise<ExecutionResult> {
        if (request.problemId !== 1) {
            return {
                status: "runtime_error",
                errorMessage: "Python execution currently supports only Problem 1: Two Sum.",
            };
        }

        if (request.testCases.length === 0) {
            return {
                status: "runtime_error",
                errorMessage: "Add at least one test case before running Python code.",
            };
        }

        const worker = this.ensureWorker();

        try {
            await this.waitUntilReady();
        } catch (error) {
            this.dispose();
            return {
                status: "runtime_error",
                errorMessage: error instanceof Error ? error.message : String(error),
            };
        }

        return this.runInWorker(worker, request);
    }

    dispose() {
        this.worker?.terminate();
        this.worker = null;
        this.readyPromise = null;
    }

    private ensureWorker(): Worker {
        if (this.worker) {
            return this.worker;
        }

        const worker = new Worker(new URL("./python.worker.ts", import.meta.url), {
            type: "module",
        });

        this.worker = worker;
        this.readyPromise = this.createReadyPromise(worker);

        return worker;
    }

    private createReadyPromise(worker: Worker): Promise<void> {
        return new Promise((resolve, reject) => {
            const timeout = window.setTimeout(() => {
                cleanup();
                reject(new Error("Pyodide took too long to initialize."));
            }, PYODIDE_LOAD_TIMEOUT_MS);

            const cleanup = () => {
                window.clearTimeout(timeout);
                worker.removeEventListener("message", handleMessage);
                worker.removeEventListener("error", handleError);
            };

            const handleMessage = (event: MessageEvent<PythonWorkerResponse>) => {
                if (event.data.type === "ready") {
                    cleanup();
                    resolve();
                }

                if (event.data.type === "ready_error") {
                    cleanup();
                    reject(new Error(event.data.error));
                }
            };

            const handleError = (event: ErrorEvent) => {
                cleanup();
                reject(new Error(event.message || "Pyodide worker failed to start."));
            };

            worker.addEventListener("message", handleMessage);
            worker.addEventListener("error", handleError);
        });
    }

    private waitUntilReady(): Promise<void> {
        return this.readyPromise ?? Promise.reject(new Error("Pyodide worker is not available."));
    }

    private runInWorker(worker: Worker, request: RunnerRequest): Promise<ExecutionResult> {
        return new Promise((resolve) => {
            const requestId = this.nextRequestId++;
            const timeoutMs = request.timeoutMs ?? DEFAULT_TIMEOUT_MS;

            const timeout = window.setTimeout(() => {
                cleanup();
                this.dispose();
                resolve({
                    status: "time_limit_exceeded",
                    runtime: timeoutMs.toString(),
                    lastExecutedInput: request.testCases[0]?.input,
                    errorMessage: "Python execution timed out.",
                });
            }, timeoutMs);

            const cleanup = () => {
                window.clearTimeout(timeout);
                worker.removeEventListener("message", handleMessage);
                worker.removeEventListener("error", handleError);
            };

            const handleMessage = (event: MessageEvent<PythonWorkerResponse>) => {
                const message = event.data;

                if (!("requestId" in message) || message.requestId !== requestId) {
                    return;
                }

                cleanup();

                if (message.type === "result") {
                    resolve(
                        this.toExecutionResult(
                            request.testCases,
                            message.report,
                            message.runtimeMs,
                            message.stderr,
                        ),
                    );
                    return;
                }

                resolve({
                    status: "runtime_error",
                    errorMessage: [message.error, message.stderr].filter(Boolean).join("\n"),
                });
            };

            const handleError = (event: ErrorEvent) => {
                cleanup();
                this.dispose();
                resolve({
                    status: "runtime_error",
                    errorMessage: event.message || "Pyodide worker failed while running Python.",
                });
            };

            const message: PythonWorkerRequest = {
                type: "run",
                requestId,
                payload: {
                    problemId: request.problemId,
                    code: request.code,
                    testCases: request.testCases,
                },
            };

            worker.addEventListener("message", handleMessage);
            worker.addEventListener("error", handleError);
            worker.postMessage(message);
        });
    }

   private toExecutionResult(
    testCases: RunnerTestCase[],
    report: PythonHarnessReport,
    runtimeMs: number,
    stderr: string,
): ExecutionResult {
    if (report.kind === "compile_error") {
        return {
            status: "compile_error",
            runtime: runtimeMs.toString(),
            errorMessage: report.error,
            lastExecutedInput: report.lastExecutedInput,
        };
    }

    if (report.kind === "runtime_error") {
        return {
            status: "runtime_error",
            runtime: runtimeMs.toString(),
            errorMessage: [report.error, stderr].filter(Boolean).join("\n"),
            lastExecutedInput: report.lastExecutedInput,
        };
    }

    const caseResults: Array<{ id: string; passed: boolean; input: string; output: string; expected?: string }> = [];
    let firstFailure: { input: string; output: string; expected: string } | null = null;

    for (const caseResult of report.cases) {
        const testCase = testCases.find((candidate) => candidate.id === caseResult.id);
        const output = this.stringifyOutput(caseResult.output);

        // Sin expected → lo tratamos como passed (igual que antes)
        if (!testCase?.expectedOutput) {
            caseResults.push({ id: caseResult.id, passed: true, input: caseResult.input, output });
            continue;
        }

        const passed = this.outputsMatch(caseResult, testCase.expectedOutput);

        caseResults.push({
            id: caseResult.id,
            passed,
            input: caseResult.input,
            output,
            expected: testCase.expectedOutput,
        });

        // Guardamos solo el PRIMER fallo, pero NO cortamos el loop
        if (!passed && !firstFailure) {
            firstFailure = { input: caseResult.input, output, expected: testCase.expectedOutput };
        }
    }

    if (firstFailure) {
        return {
            status: "wrong_answer",
            runtime: runtimeMs.toString(),
            input: firstFailure.input,
            output: firstFailure.output,
            expected: firstFailure.expected,
            caseResults,   // ⬅️ ahora trae TODOS los casos
        };
    }

    return {
        status: "accepted",
        runtime: runtimeMs.toString(),
        memory: "N/A",
        output: report.cases.map((c) => this.stringifyOutput(c.output)).join("\n"),
        caseResults,
    };
}

    private outputsMatch(caseResult: PythonCaseResult, expectedOutput: string): boolean {
        const actual = caseResult.output;
        const expected = this.parseExpectedOutput(expectedOutput);

        if (Array.isArray(actual) && Array.isArray(expected)) {
            return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
        }

        return JSON.stringify(actual) === JSON.stringify(expected);
    }

    private parseExpectedOutput(expectedOutput: string): unknown {
        try {
            return JSON.parse(expectedOutput);
        } catch {
            return expectedOutput.trim();
        }
    }

    private stringifyOutput(output: unknown): string {
        return typeof output === "string" ? output : JSON.stringify(output);
    }
}
