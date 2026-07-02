import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useRef, useEffect, useState } from 'react'
import type { ProblemCase, ProblemController } from '../../controllers/UseProblemController'

interface TestCaseProps {
    number: string,
    isActive: boolean,
    onClick: () => void,
    onDelete: () => void,
    canDelete: boolean
}

interface TestCaseContentProps {
    content: string,
    expectedOutput?: string,
    onChange: (newValue: string) => void
    onExpectedChange: (newValue: string) => void
}

interface RawTestCaseContentProps {
    content: string,
    onChange: (newValue: string) => void
}

const ListIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='list-icon'><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
const CodeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='code-icon'><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>

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

function TestCaseContent({ content, expectedOutput, onChange, onExpectedChange }: TestCaseContentProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const expectedTextareaRef = useRef<HTMLTextAreaElement>(null)

    const resizeTextArea = (textarea: HTMLTextAreaElement | null) => {
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }

    const resize = useCallback(() => {
        resizeTextArea(textareaRef.current)
        resizeTextArea(expectedTextareaRef.current)
    }, [])

    useEffect(() => {
        resize()
    }, [content, expectedOutput, resize])

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
            <article className='testcase-container'>
                <p className='testcase-title'>Expected Output</p>
                <textarea
                    className='testcase-input'
                    ref={expectedTextareaRef}
                    value={expectedOutput || ""}
                    onChange={(e) => onExpectedChange(e.target.value)}
                    spellCheck='false'
                    onInput={resize}
                ></textarea>
            </article>
        </>
    )
}

function RawTestCaseContent({ content, onChange }: RawTestCaseContentProps) {
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
            <article className='raw-testcase-container'>
                <textarea
                    className='raw-testcase-input'
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

export default function TestCasesView({ controller }: { controller: ProblemController }) {
    const [viewMode, setViewMode] = useState<'list' | 'code'>('list')


    return (
        <>
            <main className='testcase-main'>

                <header className='testcase-header'>
                        <button 
                        className={`testcase-header-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        >
                            <ListIcon />
                        </button>

                        <button 
                        className={`testcase-header-btn ${viewMode === 'code' ? 'active' : ''}`}
                        onClick={() => setViewMode('code')}
                        >
                            <CodeIcon />
                        </button>
                </header>

                <AnimatePresence mode='wait'>
                    {viewMode === 'list' ? (
                        <motion.div key='list-view'>
                            <nav className='cases-container'>
                                <AnimatePresence mode='popLayout'>
                                    {controller.cases.map((test: ProblemCase, i: number) => (
                                        <motion.div
                                            key={test.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                        >

                                            <TestCase
                                                key={test.id}
                                                number={(i + 1).toString()}
                                                onClick={() => controller.setActiveTab(i)}
                                                onDelete={() => controller.deleteTestCase(test.id)}
                                                canDelete={controller.cases.length > 1}
                                                isActive={controller.activeTab === i} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <motion.button
                                    className='testcase-button'
                                    whileHover={{ y: -2 }}
                                    id='add-testcase'
                                    onClick={controller.addTestCase}
                                > + </motion.button>
                            </nav>
                            <TestCaseContent
                                key={controller.cases[controller.activeTab]?.id || 'empty'}
                                content={controller.cases[controller.activeTab]?.content || ""}
                                expectedOutput={controller.cases[controller.activeTab]?.expectedOutput}
                                onChange={controller.updateTestCase}
                                onExpectedChange={controller.updateExpectedOutput}
                            />
                        </motion.div>
                    ) : (
                        <motion.div key='code-view'>
                             <RawTestCaseContent
                                content={controller.getRawCases}
                                onChange={controller.setCasesFromRaw}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>


            </main>
        </>
    )
}
