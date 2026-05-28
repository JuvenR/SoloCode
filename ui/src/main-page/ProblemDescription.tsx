
import '../css/problemView.css'
import btnBack from '../assets/backButton.png'
import btnNext from '../assets/nextButton.png'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import { useEffect, useRef } from 'react'
import type { ProblemDTO } from '../services/ProblemService'

// manages different problem difficulties
function DifficultyBadge({ problemDifficulty }: { problemDifficulty: string }) {

    if (!problemDifficulty) {
        return <div className="problem-difficulty">No difficulty found</div>
    }

    const difficulty = problemDifficulty.toLowerCase()
    const problemDifficulties = ['easy', 'medium', 'hard']

    if (!problemDifficulties.includes(difficulty)) {
        return <div className="problem-difficulty">No difficulty found</div>
    }

    const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)

    return <div className="problem-difficulty" id={`problem-difficulty-${difficulty}`}>
        {label}
    </div>

}

interface ProblemExampleProps {
    title: string
    input: string
    output: string
    explanation: string
}

function ProblemExample({ title, input, output, explanation }: ProblemExampleProps) {
    return (
        <>
            <div className="problem-example">

                <strong className="example-title">
                    {title}
                </strong>

                <div className='example-container'>
                    <div className="example-sidebar"></div>
                    <div className='example-main'>
                        <p className="example-content">
                            <strong> Input: </strong>
                            {input}
                        </p>
                        <p className="example-content">
                            <strong> Output: </strong>
                            {output}
                        </p>
                        <div className="example-content">
                            <strong> Explanation: </strong>
                            <ReactMarkdown>{explanation}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface ProblemDescriptionProps {
    currentProblem: ProblemDTO
    handleNext: () => void
    handleBack: () => void
}


export default function ProblemDescription({ currentProblem, handleNext, handleBack }: ProblemDescriptionProps) {

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [currentProblem])

    if (!currentProblem) {
        return <div> Problem not found</div>
    }

    return (
        <>
            <div className="problem-container" ref={containerRef}>
                <div className="problem-container-header"></div>
                <main className="problem-main">
                    <strong className="problem-title">
                        {currentProblem.id}. {currentProblem.title}
                    </strong>

                    <DifficultyBadge problemDifficulty={currentProblem.difficulty} />

                    <article className="problem-description">
                        <strong> Description: </strong>

                        <div className='problem-description-content'>
                            <ReactMarkdown
                                components={{
                                    p: ({ ...props }) => <p style={{ marginTop: '10px', marginBottom: '10px', lineHeight: '1.6' }} {...props} />,
                                    code: ({ ...props }) => (
                                        <code
                                            style={{
                                                backgroundColor: 'var(--dark-gray-background)',
                                                padding: '2px 6px',
                                                borderRadius: '5px',
                                                fontFamily: '"JetBrains Mono", monospace',
                                                fontSize: '0.9em',
                                                color: 'var(--content-text-color, #fff)'
                                            }}
                                            {...props}
                                        />
                                    ),
                                    strong: ({ ...props }) => (
                                        <strong
                                            style={{
                                                fontFamily: 'inherit',  
                                                fontSize: 'inherit',   
                                                color: 'inherit',      
                                                fontWeight: '600' 
                                            }}
                                            {...props}
                                        />
                                    )
                                }}
                            >
                                {currentProblem.description.join('\n\n')}
                            </ReactMarkdown>
                        </div>
                    </article>
                    <article className="problem-examples-container">
                        {currentProblem.examples.map((example) => (
                            <ProblemExample
                                key={example.id}
                                title={example.title}
                                input={example.input}
                                output={example.output}
                                explanation={example.explanation}
                            />
                        ))}


                    </article>
                </main>
                <footer className="problem-footer">
                    <button className="problem-pagination-button" id="btnBack" onClick={handleBack}>
                        <motion.img src={btnBack} whileHover={{ y: -4 }}></motion.img>
                    </button>
                    <p className="problem-number">{currentProblem.id}</p>
                    <button className="problem-pagination-button" id="btnNext" onClick={handleNext}>
                        <motion.img src={btnNext} whileHover={{ y: -4 }}></motion.img>
                    </button>
                </footer>
            </div>
        </>
    )
}
