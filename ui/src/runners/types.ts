export type SubmissionStatus =
    | "accepted"
    | "wrong_answer"
    | "compile_error"
    | "runtime_error"
    | "time_limit_exceeded"
    | "output_limit_exceeded"
    | "memory_limit_exceeded";

export interface ExecutionResult {
    status: SubmissionStatus;
    runtime?: string;
    memory?: string;
    output?: string;
    expected?: string;
    input?: string;
    errorMessage?: string;
    lastExecutedInput?: string;
}

export interface RunnerTestCase {
    id: string;
    input: string;
    expectedOutput?: string;
}

export interface RunnerRequest {
    problemId: number;
    code: string;
    testCases: RunnerTestCase[];
    timeoutMs?: number;
}

export interface PythonCaseResult {
    id: string;
    input: string;
    output: unknown;
}

export type PythonHarnessReport =
    | {
          kind: "success";
          cases: PythonCaseResult[];
      }
    | {
          kind: "compile_error";
          error: string;
          lastExecutedInput?: string;
      }
    | {
          kind: "runtime_error";
          error: string;
          lastExecutedInput?: string;
      };

export interface PythonWorkerRunPayload {
    problemId: number;
    code: string;
    testCases: RunnerTestCase[];
}

export type PythonWorkerRequest = {
    type: "run";
    requestId: number;
    payload: PythonWorkerRunPayload;
};

export type PythonWorkerResponse =
    | {
          type: "ready";
      }
    | {
          type: "ready_error";
          error: string;
      }
    | {
          type: "result";
          requestId: number;
          report: PythonHarnessReport;
          stdout: string;
          stderr: string;
          runtimeMs: number;
      }
    | {
          type: "error";
          requestId: number;
          error: string;
          stderr?: string;
      };
