import { useMemo, useState } from "react";

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

export const getStatusColor  = (status:string | undefined) => {
        if(!status) return 'gray'
        if(status === 'accepted') return 'green'
        return 'red'
}

export function useProblemController() {
    const [language, setLanguage] = useState<string>('javascript') // state of the language on use
    const [isRunning, setIsRunning] = useState(false)  // if the code is runing with a test case
    const [code, setCode] = useState<string>('')
    const [activeTab, setActiveTab] = useState<number>(0)
    const [activeTestView, setActiveTestView] = useState<'testcases' | 'results'>('testcases')

    //map with the default testcases (key, value)
    const [cases, setCase] = useState([
        { id: '1', content: "nums = [2,7,11,15]"},
        { id: '2', content: "nums = [3,2,4]" },
        { id: '3', content: "nums = [3,3]" }
    ])

    // test case view

    // transform the cases array into a single string
    const getRawCases = useMemo(() => {
        return cases.map(c => c.content).join('\n')
    }, [cases])

    // splits the string with the test cases into the cases array
    const setCasesFromRaw = (text : string) => {

        if(!text.trim()) {
            setCase([{ id: Date.now().toString(), content: ''}])
            setActiveTab(0)
            return
        }

        const lines = text.split('\n')

        const newCases = lines.map((line, index) => ({
            id: (Date.now() + index).toString(),
            content: line
        }))

        setCase(newCases)

        if(activeTab >= newCases.length){
            setActiveTab(Math.max(0, newCases.length-1))
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



    const [results, setResults] = useState<ExecutionResult | null>(null) // state of the run code results

    const runCode = async () => {
        setIsRunning(true)
        setActiveTestView('results')
        console.log(`running tescase on ${language}`, code)

        // backend response simulation 
        setTimeout(() => {
            setResults({ status: 'accepted', output: '[1,2,3]', runtime:'0', memory:'43.78' })
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