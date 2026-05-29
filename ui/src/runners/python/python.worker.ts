import { loadPyodide, type PyodideInterface } from "pyodide";
import type {
    PythonHarnessReport,
    PythonWorkerRequest,
    PythonWorkerResponse,
    RunnerTestCase,
} from "../types";

const pyodideIndexUrl = new URL("/pyodide/", self.location.href).toString();

let pyodidePromise: Promise<PyodideInterface> | null = null;

function post(response: PythonWorkerResponse) {
    self.postMessage(response);
}

function getPyodide(): Promise<PyodideInterface> {
    if (!pyodidePromise) {
        pyodidePromise = loadPyodide({
            indexURL: pyodideIndexUrl,
            lockFileURL: new URL("pyodide-lock.json", pyodideIndexUrl).toString(),
            stdLibURL: new URL("python_stdlib.zip", pyodideIndexUrl).toString(),
            stdout: () => undefined,
            stderr: () => undefined,
            env: {
                HOME: "/home/pyodide",
                PYTHONINSPECT: "0",
            },
        });
    }

    return pyodidePromise;
}

function buildHarness(code: string, testCases: RunnerTestCase[]): string {
    const casesJson = JSON.stringify(
        testCases.map((testCase) => ({
            id: testCase.id,
            input: testCase.input,
        })),
    );

    return `
import ast
import json
import traceback

USER_CODE = ${JSON.stringify(code)}
TEST_CASES = json.loads(${JSON.stringify(casesJson)})

def parse_case(input_text):
    values = {}
    tree = ast.parse(input_text, mode="exec")

    for node in tree.body:
        if not isinstance(node, ast.Assign) or len(node.targets) != 1:
            raise ValueError("Test case lines must look like: name = value")

        target = node.targets[0]
        if not isinstance(target, ast.Name):
            raise ValueError("Test case assignment target must be a variable name")

        values[target.id] = ast.literal_eval(node.value)

    return values

def to_jsonable(value):
    try:
        json.dumps(value)
        return value
    except TypeError:
        return repr(value)

report = None
namespace = {}
current_input = None

try:
    exec(USER_CODE, namespace)
    solution_cls = namespace.get("Solution")
    if solution_cls is None:
        raise NameError("Expected submitted code to define class Solution")

    outputs = []
    for test_case in TEST_CASES:
        current_input = test_case["input"]
        values = parse_case(current_input)
        solution = solution_cls()

        if "nums" not in values or "target" not in values:
            raise ValueError("Two Sum test cases must define nums and target")

        output = solution.twoSum(values["nums"], values["target"])
        outputs.append({
            "id": test_case["id"],
            "input": current_input,
            "output": to_jsonable(output),
        })

    report = {"kind": "success", "cases": outputs}
except (SyntaxError, IndentationError):
    report = {
        "kind": "compile_error",
        "error": traceback.format_exc(),
        "lastExecutedInput": current_input,
    }
except Exception:
    report = {
        "kind": "runtime_error",
        "error": traceback.format_exc(),
        "lastExecutedInput": current_input,
    }

json.dumps(report)
`;
}

async function runPython(requestId: number, code: string, testCases: RunnerTestCase[]) {
    const pyodide = await getPyodide();
    const stdout: string[] = [];
    const stderr: string[] = [];
    const start = performance.now();

    pyodide.setStdout({ batched: (output) => stdout.push(output) });
    pyodide.setStderr({ batched: (output) => stderr.push(output) });
    pyodide.setStdin({ stdin: () => "" });

    try {
        const resultJson = await pyodide.runPythonAsync(buildHarness(code, testCases));
        const report = JSON.parse(String(resultJson)) as PythonHarnessReport;

        post({
            type: "result",
            requestId,
            report,
            stdout: stdout.join("\n"),
            stderr: stderr.join("\n"),
            runtimeMs: Math.max(0, Math.round(performance.now() - start)),
        });
    } catch (error) {
        post({
            type: "error",
            requestId,
            error: error instanceof Error ? error.message : String(error),
            stderr: stderr.join("\n"),
        });
    }
}

getPyodide()
    .then(() => post({ type: "ready" }))
    .catch((error) =>
        post({
            type: "ready_error",
            error: error instanceof Error ? error.message : String(error),
        }),
    );

self.onmessage = (event: MessageEvent<PythonWorkerRequest>) => {
    const message = event.data;

    if (message.type === "run") {
        void runPython(message.requestId, message.payload.code, message.payload.testCases);
    }
};
