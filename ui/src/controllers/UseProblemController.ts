import { useEffect, useMemo, useState } from "react";

type SubmissionStatus = 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'time_limit_exceeded' | 'output_limit_exceeded' | 'memory_limit_exceeded'
export interface ExecutionResult {
    status: SubmissionStatus
    runtime?: string
    memory?: string
    output?: string
    expected?: string
    input?: string
    errorMessage?: string
    lastExecutedInput?: string
}

export const getStatusColor = (status: string | undefined) => {
    if (!status) return 'gray'
    if (status === 'accepted') return 'green'
    return 'red'
}

export function useProblemController(currentProblemId: number) {
    const [language, setLanguage] = useState<string>('javascript') // state of the language on use
    const [isRunning, setIsRunning] = useState(false)  // if the code is runing with a test case
    const [code, setCode] = useState<string>('')
    const [activeTab, setActiveTab] = useState<number>(0)
    const [activeTestView, setActiveTestView] = useState<'testcases' | 'results'>('testcases')
    const [results, setResults] = useState<ExecutionResult | null>(null) // state of the run code results

    //map with the default testcases (key, value)
    const [cases, setCase] = useState<{ id: string, content: string }[]>([])


    useEffect(() => {
        let initialCases = [];

        switch (currentProblemId) {
            case 1: // Two Sum
                initialCases = [
                    { id: '1', content: "nums = [2,7,11,15]\ntarget = 9" },
                    { id: '2', content: "nums = [3,2,4]\ntarget = 6" },
                    { id: '3', content: "nums = [3,3]\ntarget = 6" }
                ];
                break;
            case 3: // Longest Substring
                initialCases = [
                    { id: '1', content: 's = "abcabcbb"' },
                    { id: '2', content: 's = "pwwkew"' }
                ];
                break;
            case 3190: // Divisible by Three
                initialCases = [
                    { id: '1', content: "nums = [1,2,3,4]" },
                    { id: '2', content: "nums = [3,6,9]" }
                ];
                break;
            case 42: // Trapping Rain Water
                initialCases = [
                    { id: '1', content: "height = [0,1,0,2,1,0,1,3,2,1,2,1]" },
                    { id: '2', content: "height = [4,2,0,3,2,5]" }
                ];
                break;
            default: // Por si el problema no tiene test cases mockeados
                initialCases = [{ id: '1', content: "" }];
                break;
        }
        setCase(initialCases)
        setActiveTab(0)
        setResults(null)
        setActiveTestView('testcases')
    }, [currentProblemId])


    // test case view

    // transform the cases array into a single string
    const getRawCases = useMemo(() => {
        // Usamos un separador visual claro para los diferentes casos
        return cases.map(c => c.content).join('\n---\n')
    }, [cases])


    // splits the string with the test cases into the cases array
    const setCasesFromRaw = (text: string) => {

        if (text === '') {
            setCase([{ id: Date.now().toString(), content: '' }])
            setActiveTab(0)
            return
        }

        const blocks = text.split('\n---\n')

        const newCases = blocks.map((block, index) => ({
            id: cases[index]?.id || (Date.now() + index).toString(),
            
            content: block 
        }))

        setCase(newCases)

        if (activeTab >= newCases.length) {
            setActiveTab(Math.max(0, newCases.length - 1))
        }
    }

    // test case CRUD
    const deleteTestCase = (index: string) => {
        if (cases.length <= 1) return;

        const indexToDelete = cases.findIndex(c => c.id === index)
        const updatedCases = cases.filter(c => c.id !== index)
        setCase(updatedCases)

        if (indexToDelete === activeTab) {
            setActiveTab(Math.max(0, indexToDelete - 1))
        } else if (indexToDelete < activeTab) {
            setActiveTab(activeTab - 1)
        }

    }

    const updateTestCase = (newValue: string) => {
        const updatedCases = cases.map((item, i) => {
            if (i === activeTab) {
                return { ...item, content: newValue }
            }
            return item
        })

        setCase(updatedCases)
    }

    const addTestCase = () => {
        // generate an ID based on current date
        const newCase = { id: Date.now().toString(), content: "" }
        const newCases = [...cases, newCase]
        setCase(newCases)
        setActiveTab(newCases.length - 1)
    }


    const runCode = async () => {
        setIsRunning(true)
        setActiveTestView('results')
        console.log(`running tescase on ${language}`, code)

        // backend response simulation 
        setTimeout(() => {
            setResults({ status: 'accepted', output: '[1,2,3]', runtime: '0', memory: '43.78' })
            setIsRunning(false)
        }, 500);
    }


    return {
        code, setCode,
        language, setLanguage,
        isRunning,
        results,
        cases,
        activeTab, setActiveTab,

        activeTestView, setActiveTestView,
        runCode,
        statusColor: getStatusColor(results?.status),
        getRawCases, setCasesFromRaw,
        deleteTestCase, updateTestCase, addTestCase
    }
}