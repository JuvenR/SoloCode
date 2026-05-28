import { useMemo, useState } from "react";

type SubmissionStatus =
    | "accepted"
    | "wrong_answer"
    | "compile_error"
    | "runtime_error"
    | "time_limit_exceeded"
    | "output_limit_exceeded"
    | "memory_limit_exceeded";

export type EditorLanguage = "javascript" | "python" | "cpp";

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

export interface ProblemCase {
    id: string;
    content: string;
}

export interface ProblemController {
    code: string;
    setCode: (value: string) => void;
    language: EditorLanguage;
    setLanguage: (language: EditorLanguage) => void;
    isRunning: boolean;
    results: ExecutionResult | null;
    cases: ProblemCase[];
    activeTab: number;
    setActiveTab: (index: number) => void;
    activeTestView: "testcases" | "results";
    setActiveTestView: (view: "testcases" | "results") => void;
    runCode: () => Promise<void>;
    statusColor: "gray" | "green" | "red";
    getRawCases: string;
    setCasesFromRaw: (text: string) => void;
    deleteTestCase: (id: string) => void;
    updateTestCase: (value: string) => void;
    addTestCase: () => void;
}

export const getStatusColor = (status: string | undefined): "gray" | "green" | "red" => {
    if (!status) return "gray";
    if (status === "accepted") return "green";
    return "red";
};

function getInitialCases(problemId: number): ProblemCase[] {
    switch (problemId) {
        case 1:
            return [
                { id: "1", content: "nums = [2,7,11,15]\ntarget = 9" },
                { id: "2", content: "nums = [3,2,4]\ntarget = 6" },
                { id: "3", content: "nums = [3,3]\ntarget = 6" },
            ];
        case 3:
            return [
                { id: "1", content: 's = "abcabcbb"' },
                { id: "2", content: 's = "pwwkew"' },
            ];
        case 3190:
            return [
                { id: "1", content: "nums = [1,2,3,4]" },
                { id: "2", content: "nums = [3,6,9]" },
            ];
        case 42:
            return [
                { id: "1", content: "height = [0,1,0,2,1,0,1,3,2,1,2,1]" },
                { id: "2", content: "height = [4,2,0,3,2,5]" },
            ];
        default:
            return [{ id: "1", content: "" }];
    }
}

export function useProblemController(currentProblemId: number): ProblemController {
    const [language, setLanguage] = useState<EditorLanguage>("javascript");
    const [isRunning, setIsRunning] = useState(false);
    const [code, setCode] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [activeTestView, setActiveTestView] = useState<"testcases" | "results">("testcases");
    const [results, setResults] = useState<ExecutionResult | null>(null);
    const [cases, setCase] = useState<ProblemCase[]>(() => getInitialCases(currentProblemId));

    const getRawCases = useMemo(() => {
        return cases.map((problemCase) => problemCase.content).join("\n---\n");
    }, [cases]);

    const setCasesFromRaw = (text: string) => {
        if (text === "") {
            setCase([{ id: Date.now().toString(), content: "" }]);
            setActiveTab(0);
            return;
        }

        const blocks = text.split("\n---\n");
        const newCases = blocks.map((block, index) => ({
            id: cases[index]?.id || (Date.now() + index).toString(),
            content: block,
        }));

        setCase(newCases);

        if (activeTab >= newCases.length) {
            setActiveTab(Math.max(0, newCases.length - 1));
        }
    };

    const deleteTestCase = (id: string) => {
        if (cases.length <= 1) return;

        const indexToDelete = cases.findIndex((problemCase) => problemCase.id === id);
        const updatedCases = cases.filter((problemCase) => problemCase.id !== id);
        setCase(updatedCases);

        if (indexToDelete === activeTab) {
            setActiveTab(Math.max(0, indexToDelete - 1));
        } else if (indexToDelete < activeTab) {
            setActiveTab(activeTab - 1);
        }
    };

    const updateTestCase = (newValue: string) => {
        const updatedCases = cases.map((item, index) => {
            if (index === activeTab) {
                return { ...item, content: newValue };
            }
            return item;
        });

        setCase(updatedCases);
    };

    const addTestCase = () => {
        const newCase = { id: Date.now().toString(), content: "" };
        const newCases = [...cases, newCase];
        setCase(newCases);
        setActiveTab(newCases.length - 1);
    };

    const runCode = async () => {
        setIsRunning(true);
        setActiveTestView("results");
        console.log(`running testcase on ${language}`, code);

        setTimeout(() => {
            setResults({ status: "accepted", output: "[1,2,3]", runtime: "0", memory: "43.78" });
            setIsRunning(false);
        }, 500);
    };

    return {
        code,
        setCode,
        language,
        setLanguage,
        isRunning,
        results,
        cases,
        activeTab,
        setActiveTab,
        activeTestView,
        setActiveTestView,
        runCode,
        statusColor: getStatusColor(results?.status),
        getRawCases,
        setCasesFromRaw,
        deleteTestCase,
        updateTestCase,
        addTestCase,
    };
}
