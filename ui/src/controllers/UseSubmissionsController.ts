import { useMemo } from "react";

export type SubmissionStatus =
    | "accepted"
    | "wrong_answer"
    | "compile_error"
    | "runtime_error"
    | "time_limit_exceeded"
    | "output_limit_exceeded"
    | "memory_limit_exceeded";

export interface Submission {
    id: string;
    status: SubmissionStatus;
    date: string;
    language: "JavaScript" | "Python" | "C++";
    memory: string;
    runtime: string;
    timestamp: string;
    code: string;
    errorMessage?: string;
    lastExecutedInput?: string;
    lastExecutedOutput?: string;
    input?: string;
    output?: string;
    expected?: string;
    testcasesPassed?: number;
    totalTestcases?: number;
}

function buildMockSubmissions(problemId: number): Submission[] {
    if (problemId === 3190) {
        return [
            {
                id: "1",
                status: "accepted",
                date: "Feb 28, 2026",
                language: "JavaScript",
                memory: "44.2 MB",
                runtime: "54 ms",
                timestamp: "14:15:32",
                code: "function minimumOperations(nums) {\n    return nums.reduce((acc, curr) => acc + (curr % 3 === 0 ? 0 : 1), 0);\n}",
                testcasesPassed: 666,
                totalTestcases: 666,
            },
            {
                id: "2",
                status: "wrong_answer",
                date: "Feb 28, 2026",
                language: "JavaScript",
                memory: "44.5 MB",
                runtime: "62 ms",
                timestamp: "13:42:10",
                code: "function minimumOperations(nums) {\n    return 0; // Thought it was always 0\n}",
                testcasesPassed: 500,
                totalTestcases: 666,
                input: "[1, 2, 3, 4]",
                output: "0",
                expected: "2",
            },
            {
                id: "3",
                status: "compile_error",
                date: "Feb 26, 2026",
                language: "C++",
                memory: "N/A",
                runtime: "N/A",
                timestamp: "18:25:00",
                code: "class Solution {\npublic:\n    int minimumOperations(vector<int>& nums) {\n        return 0 // Missing semicolon\n    }\n};",
                testcasesPassed: 0,
                totalTestcases: 666,
                errorMessage:
                    "Line 4: Char 17: error: expected ';' after return statement\n        return 0 \n                ^\n                ;\n1 error generated.",
            },
            {
                id: "8",
                status: "runtime_error",
                date: "Feb 26, 2026",
                language: "Python",
                memory: "N/A",
                runtime: "N/A",
                timestamp: "18:30:12",
                code: "def minimumOperations(self, nums):\n    return nums[1000]  # Index out of bounds",
                testcasesPassed: 10,
                totalTestcases: 666,
                errorMessage:
                    "IndexError: list index out of range\n    return nums[1000]\nLine 2 in minimumOperations (Solution.py)",
                lastExecutedInput: "[1, 2, 3]",
            },
        ];
    }

    if (problemId === 1) {
        return [
            {
                id: "4",
                status: "accepted",
                date: "Feb 25, 2026",
                language: "Python",
                memory: "17.1 MB",
                runtime: "60 ms",
                timestamp: "09:00:12",
                code: "class Solution:\n    def twoSum(self, nums, target):\n        prevMap = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i",
                testcasesPassed: 63,
                totalTestcases: 63,
            },
            {
                id: "5",
                status: "time_limit_exceeded",
                date: "Feb 25, 2026",
                language: "Python",
                memory: "16.5 MB",
                runtime: "N/A",
                timestamp: "08:45:00",
                code: "class Solution:\n    def twoSum(self, nums, target):\n        for i in range(len(nums)):\n            for j in range(i+1, len(nums)):\n                if nums[i] + nums[j] == target:\n                    return [i, j]",
                testcasesPassed: 53,
                totalTestcases: 63,
                lastExecutedInput:
                    "[1,0,0,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,0,0,0,1,1,0,1,0,0,0,1]\n100000",
            },
        ];
    }

    if (problemId === 3) {
        return [
            {
                id: "6",
                status: "wrong_answer",
                date: "Jan 10, 2026",
                language: "JavaScript",
                memory: "42.1 MB",
                runtime: "70 ms",
                timestamp: "11:20:00",
                code: "function lengthOfLongestSubstring(s) {\n    return new Set(s).size; // Counts unique chars only\n}",
                testcasesPassed: 100,
                totalTestcases: 987,
                input: '"pwwkew"',
                output: "4",
                expected: "3",
            },
            {
                id: "7",
                status: "memory_limit_exceeded",
                date: "Feb 26, 2026",
                language: "C++",
                memory: "N/A",
                runtime: "N/A",
                timestamp: "18:25:00",
                code: "class Solution {\npublic:\n    int minimumOperations(vector<int>& nums) {\n        return 0 // Missing semicolon\n    }\n};",
                testcasesPassed: 50,
                totalTestcases: 987,
                errorMessage:
                    "Line 4: Char 17: error: expected ';' after return statement\n        return 0 \n                ^\n                ;\n1 error generated.",
                lastExecutedInput:
                    "[1,0,0,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,00000000000000000000000000000000000000000,0,0,0,1,0,1,0,0,0,0,1,1,0,1,0,0,0,1]",
            },
            {
                id: "9",
                status: "output_limit_exceeded",
                date: "Feb 27, 2026",
                language: "Python",
                memory: "N/A",
                runtime: "N/A",
                timestamp: "10:15:00",
                code: "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        for i in range(10000):\n            print('Hello world')\n        return 0",
                testcasesPassed: 10,
                totalTestcases: 987,
                lastExecutedInput: '"abcabcbb"',
                lastExecutedOutput:
                    "Hello world\nHello world\nHello world\nHello world\nHello world\nHello world\nHello world\nHello world\nHello world\nHello world\n",
            },
        ];
    }

    return [];
}

export function useSubmissionController(problemId: number) {
    const submissions = useMemo(() => buildMockSubmissions(problemId), [problemId]);
    return { submissions };
}
