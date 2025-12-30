import './css/testCases.css'
import { motion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'

interface TestCaseProps {
    number: string,
    isActive: boolean,
    onClick: () => void,
    onDelete: () => void,
    canDelete: boolean
}

interface TestCaseContentProps {
    content: string,
    onChange: (newValue: string) => void
}
function TestCase({ number, isActive, onClick, onDelete, canDelete }: TestCaseProps) {
    return (
        <>
            <motion.div className='testcase-button-wrapper' style={{ position: 'relative' }}>
                <motion.button
                    className={`testcase-button ${isActive ? 'active-case' : ''}`}
                    whileHover={{ y: -2 }}
                    onClick={onClick}
                > Case {number}
                    {canDelete && (
                        <span className='btn-delete' onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}>
                            x
                        </span>
                    )}
                </motion.button>
            </motion.div>

        </>
    )
}

function TestCaseContent({ content, onChange }: TestCaseContentProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const resize = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }

    useEffect(() => {
        resize()
    }, [content])

    return (
        <>
            <article className='testcase-container'>
                <p className='testcase-title'>Input</p>
                <textarea
                    className='testcase-input'
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck='false'
                    onInput={resize}
                ></textarea>
            </article>
        </>
    )
}
function TestCasesView() {

    const [activeTab, setActiveTab] = useState<number>(0)

    //array with the default testcases
    const [cases, setCase] = useState<string[]>([
        "nums = [2,7,11,15]\ntarget = 9",
        "nums = [3,2,4]\ntarget = 6",
        "nums = [3,3]\ntarget = 6"
    ])

    const deleteTestCase = (index: number) => {
        if (cases.length <= 1) return;

        const updatedCases = cases.filter((_,i) => i !== index)
        setCase(updatedCases)
        if(activeTab >= updatedCases.length){
            setActiveTab(updatedCases.length-1)
        } else if(activeTab === index){
            setActiveTab(activeTab-1)
        }

    }

    const updateTestCase = (newValue: string) => {
        const updatedCases = [...cases]
        updatedCases[activeTab] = newValue
        setCase(updatedCases)
    }

    //to add a customized testcase
    const addTestCase = () => {
        const newCases = [...cases, ""]
        setCase(newCases)
        setActiveTab(newCases.length-1)
    }
    return (
        <>
            <main className='testcase-main'>
                <nav className='cases-container'>
                    {cases.map((_, i) => (
                        <TestCase
                            key={i}
                            number={(i + 1).toString()}
                            onClick={() => setActiveTab(i)}
                            onDelete={() => deleteTestCase(i)}
                            canDelete={cases.length>1}
                            isActive={activeTab === i} />
                    ))}

                    <motion.button
                        className='testcase-button'
                        whileHover={{ y: -2 }}
                        id='add-testcase'
                        onClick={addTestCase}
                    > + </motion.button>
                </nav>
                <TestCaseContent
                    key={activeTab}
                    content={cases[activeTab]}
                    onChange={updateTestCase}
                />
            </main>
        </>
    )
}

export default function RunCodeView() {
    const [activeView, setActiveView] = useState<'testcases' | 'results'>('testcases')

    return (
        <>
            <main className='run-main-container'>
                <nav className='buttons-group'>
                    <motion.button
                        className='btn-test'
                        id='testcases'
                        whileHover={{ y: -3 }}
                        onClick={() => setActiveView('testcases')}
                    > Test Cases</motion.button>
                    <motion.button
                        className='btn-test'
                        id='test-results'
                        whileHover={{ y: -3 }}
                        onClick={() => setActiveView('results')}
                    > Test Results</motion.button>
                </nav>
                <div className='view-content'>
                    {activeView === 'testcases' ? (
                        <TestCasesView />
                    ) : (
                        <div className='results-view'>
                            <p>Without results. Run your code to see them.</p>
                        </div>
                    )}

                </div>
            </main>
        </>
    )
}