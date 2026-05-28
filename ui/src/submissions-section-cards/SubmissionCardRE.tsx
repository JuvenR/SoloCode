import '../css/submissionCards.css'
import btnClose from '../assets/closeButton.png'
import { motion } from 'motion/react'
import CodeContainer from './CodeContainer'
import type { SubmissionProps } from './SubmissionCard'


export default function SubmissionCardRE({ onClose, submission }: SubmissionProps) {

    return (
        <>
            <div className='card-submission-container' id='red-container'>
                <main className='card-submission-main'>
                    <strong className='card-title' id='red-title'>Runtime Error</strong>
                    <motion.img
                        whileHover={{ y: -4 }}
                        src={btnClose} onClick={onClose}></motion.img>
                </main>
                <article className='card-submission-info'>
                    <p className='card-submission-testcases'>
                        {submission.testcasesPassed} / {submission.totalTestcases} Testcases passed
                    </p>
                    <p className='card-submission-date'>
                        Submitted at {submission.date} {submission.timestamp}
                    </p>
                </article>

                <article className='re-submission-code'>
                    {submission.errorMessage}
                </article>

                <article className='submission-last-executed-input'>
                    <p className='submission-subtitle'>
                        Last Executed Input
                    </p>
                    <div className='executed-code'>
                        {submission.lastExecutedInput}
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