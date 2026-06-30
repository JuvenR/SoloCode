import '../../css/submissionCards.css'
import btnClose from '../../assets/closeButton.png'
import { motion } from 'motion/react'
import CodeContainer from './CodeContainer'
import type { SubmissionProps } from './SubmissionCard'

export default function SubmissionCardWA({ onClose, submission }: SubmissionProps) {

    return (
        <>
            <div className='card-submission-container' id='red-container'>
                <main className='card-submission-main'>
                    <strong className='card-title' id='red-title'>Wrong Answer</strong>
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

                 <article className='submission-testcase-container'>
                   <motion.button 
                   whileHover={{y:-4}}
                   className='submission-use-testcase'>
                    Use Testcase
                   </motion.button>
                </article>

                <article className='submission-input'>
                    <p className='submission-subtitle'>
                        Your Input
                    </p>
                    <div className='executed-code'>
                        {submission.input}
                    </div>
                </article>

                <article className='submission-output'>
                    <p className='submission-subtitle'>
                        Output
                    </p>
                    <div className='executed-code'>
                        {submission.output}
                    </div>
                </article>

                 <article className='submission-expected'>
                    <p className='submission-subtitle'>
                        Expected
                    </p>
                    <div className='executed-code'>
                        {submission.expected}
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