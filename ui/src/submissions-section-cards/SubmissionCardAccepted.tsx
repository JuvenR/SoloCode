import '../css/submissionCards.css'
import btnClose from '../assets/closeButton.png'
import { useState } from 'react'
import { motion } from 'motion/react'
import CodeContainer from './CodeContainer'
import type { SubmissionProps } from './SubmissionCard'


export default function SubmissionCardAccepted({ onClose, submission }: SubmissionProps) {
    return (
        <>
            <div className='card-submission-container' id='green-container'>
                <main className='card-submission-main'>
                    <strong className='card-title' id='green-title'>Accepted</strong>
                    <motion.img 
                    whileHover={{y:-4}}
                    src={btnClose} 
                    onClick={onClose} 
                    style={{cursor : 'pointer'}} />
                </main>

                <article className='card-submission-info'>
                    <p className='card-submission-testcases'>
                        {submission.testcasesPassed} / {submission.totalTestcases} Testcases passed
                    </p>
                    <p className='card-submission-date'>
                        Submitted at {submission.date} {submission.timestamp}
                    </p>
                </article>

                <article className='accepted-submission-details'>
                    <div className='accepted-submission-individual-info'>
                        <p className='accepted-submission-info-title'>
                            Runtime
                        </p>
                        <div className='accepted-submission-info-content'>
                            <p> {submission.runtime}</p>
                        </div>
                    </div>

                    <div className='accepted-submission-individual-info'>
                        <p className='accepted-submission-info-title'>
                            Memory
                        </p>
                        <div className='accepted-submission-info-content'>
                            <p>{submission.memory}</p>
                        </div>
                    </div>
                </article>

                <article className='submission-code'>
                    <div className='submission-code-details'>
                        <p className='submission-code-title'>
                            Code
                        </p>
                        <div className='submission-separator'></div>
                        <p className='submission-code-title'>
                            {submission.language}
                        </p>
                    </div>

                    <CodeContainer answerCode={submission.code}/>
                </article>
            </div>
        </>
    )
}