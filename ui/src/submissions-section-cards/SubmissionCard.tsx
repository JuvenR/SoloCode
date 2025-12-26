import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import '../css/submissionsView.css'
import SubmissionCardAccepted from './SubmissionCardAccepted'
import SubmissionCardCompileError from './SubmissionCardCE'
import SubmissionCardOLE from './SubmissionCardOLE'
import SubmissionCardWA from './SubmissionCardWA'
import SubmissionCardTLE from './SubmissionCardTLE'
import SubmissionCardMLE from './SubmissionCardMLE'
import SubmissionCardRE from './SubmissionCardRE'

export default function SubmissionCard({ submissionType }: { submissionType: string }) {

    const isSubmissionAccepted = submissionType?.toLowerCase() === 'accepted'
    const submissionColor = isSubmissionAccepted ? 'green' : 'red'

    const [isOpen, setIsOpen] = useState(false);

    const submissionResult = submissionType.toLowerCase()

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const submissionCardType = () => {

        switch (submissionResult) {
            case 'accepted':
                return <SubmissionCardAccepted onClose={() => setIsOpen(false)} />

            case 'compile error':
                return <SubmissionCardCompileError onClose={() => setIsOpen(false)} />

            case 'output limit exceeded':
                return <SubmissionCardOLE onClose={() => setIsOpen(false)} />

            case 'wrong answer':
                return <SubmissionCardWA onClose={() => setIsOpen(false)} />

            case 'time limit exceeded':
                return <SubmissionCardTLE onClose={() => setIsOpen(false)} />

            case 'memory limit exceeded':
                return <SubmissionCardMLE onClose={() => setIsOpen(false)} />

            case 'runtime error':
                return <SubmissionCardRE onClose={() => setIsOpen(false)} />
        }
    }

    const language = 'Python'
    const runtime = 0
    const memory = 43.78
    const date = 'Nov 26, 2025'

    return (
        <>
            <motion.div whileHover={{ y: -5 }} className='problem-submission' id={`submission-${submissionColor}`} onClick={toggleOpen}>
                <strong className='submission-title' id={`title-${submissionColor}`}>{submissionType}</strong>
                <div className='submission-container'>

                    <p className='submission-info'> {language}</p>
                    <div className='submission-separator'></div>

                    <p className='submission-info'> {runtime} ms</p>
                    <div className='submission-separator'></div>

                    <p className='submission-info'> {memory} MB</p>
                    <div className='submission-separator'></div>

                    <p className='submission-info'>{date}</p>

                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ y: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}

                        className="submission-details-wrapper">
                        {submissionCardType()}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
