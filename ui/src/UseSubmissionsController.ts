import { useEffect, useState } from "react"

export type SubmissionStatus = 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'time_limit_exceeded' | 'output_limit_exceeded' | 'memory_limit_exceeded'

export interface Submission{
    id: string
    status: SubmissionStatus
    date: string
    language: string
    memory: string
    runtime: string
}

export function useSubmissionController(){
    const [submissions, setSubmissions] = useState<Submission[]>([])

    useEffect(() => {
        const mockSubmissions: Submission[] = [
            { id: '1', status: 'accepted', date: 'Nov 26, 2025', language : 'Javascript', memory : '43.78', runtime : '0'},
            { id: '2', status: 'wrong_answer', date: 'Nov 26, 2025', language : 'Python', memory : '43.78', runtime : '0'},
            { id: '3', status: 'compile_error', date: 'Nov 26, 2025', language : 'C++', memory : '78', runtime : '12'},
            { id: '4', status: 'runtime_error', date: 'Nov 26, 2025', language : 'Python', memory : '43.78', runtime : '0'},
            { id: '5', status: 'time_limit_exceeded', date: 'Nov 26, 2025', language : 'Python', memory : '43.78', runtime : '0'},
            { id: '6', status: 'output_limit_exceeded', date: 'Nov 26, 2025', language : 'Python', memory : '43.78', runtime : '0'},
            { id: '7', status: 'memory_limit_exceeded', date: 'Nov 26, 2025', language : 'Python', memory : '43.78', runtime : '0'}
        ]

        setSubmissions(mockSubmissions)
    },[])

    return{
    submissions
    
}
}

