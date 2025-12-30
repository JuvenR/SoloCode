import './css/testCases.css'
import { AnimatePresence, motion } from 'motion/react'
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

    //map with the default testcases (key, value)
    const [cases, setCase] = useState([
        { id: 1, content: "nums = [2,7,11,15]\ntarget = 9" },
        { id: '2', content: "nums = [3,2,4]\ntarget = 6" },
        { id: '3', content: "nums = [3,3]\ntarget = 6" }
    ])

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

    //to add a customized testcase
    const addTestCase = () => {
        // generate an ID based on current date
        const newCase = { id: Date.now().toString(), content: "" }
        const newCases = [...cases, newCase]
        setCase(newCases)
        setActiveTab(newCases.length - 1)
    }
    return (
        <>
            <main className='testcase-main'>
                <nav className='cases-container'>
                    <AnimatePresence mode='popLayout'>


                        {cases.map((test, i) => (
                            <motion.div
                                key={test.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            >

                                <TestCase
                                    key={test.id}
                                    number={(i + 1).toString()}
                                    onClick={() => setActiveTab(i)}
                                    onDelete={() => deleteTestCase(test.id)}
                                    canDelete={cases.length > 1}
                                    isActive={activeTab === i} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <motion.button
                        className='testcase-button'
                        whileHover={{ y: -2 }}
                        id='add-testcase'
                        onClick={addTestCase}
                    > + </motion.button>
                </nav>
                <TestCaseContent
                    key={cases[activeTab]?.id || 'empty'}
                    content={cases[activeTab]?.content || ""}
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