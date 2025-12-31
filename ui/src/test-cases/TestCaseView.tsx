import { AnimatePresence, motion } from 'motion/react'
import { useRef, useEffect } from 'react'

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

export default function TestCasesView({ controller }: { controller: any }) {
    return (
        <>
            <main className='testcase-main'>
                <nav className='cases-container'>
                    <AnimatePresence mode='popLayout'>
                        {controller.cases.map((test:any, i:number) => (
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
                    onChange={controller.updateTestCase}
                />
            </main>
        </>
    )
}