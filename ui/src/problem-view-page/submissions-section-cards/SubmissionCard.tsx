import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import '../../css/submissionsView.css'
import SubmissionCardAccepted from './SubmissionCardAccepted'
import SubmissionCardCompileError from './SubmissionCardCE'
import SubmissionCardOLE from './SubmissionCardOLE'
import SubmissionCardWA from './SubmissionCardWA'
import SubmissionCardTLE from './SubmissionCardTLE'
import SubmissionCardMLE from './SubmissionCardMLE'
import SubmissionCardRE from './SubmissionCardRE'
import type { Submission } from '../../controllers/UseSubmissionsController'


export interface SubmissionProps {
    onClose: () => void
    submission: Submission

}

interface SubmissionCardProps {
    submission: Submission
}

export default function SubmissionCard({submission} : SubmissionCardProps) {

    const isSubmissionAccepted =submission.status ?.toLowerCase() === 'accepted'
    const submissionColor = isSubmissionAccepted ? 'green' : 'red'

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const submissionCardType = () => {

        switch (submission.status) {
            case 'accepted':
                return <SubmissionCardAccepted submission={submission} onClose={() => setIsOpen(false)} />

            case 'compile_error':
                return <SubmissionCardCompileError submission={submission} onClose={() => setIsOpen(false)} />

            case 'output_limit_exceeded':
                return <SubmissionCardOLE submission={submission} onClose={() => setIsOpen(false)} />

            case 'wrong_answer':
                return <SubmissionCardWA submission={submission} onClose={() => setIsOpen(false)} />

            case 'time_limit_exceeded':
                return <SubmissionCardTLE submission={submission} onClose={() => setIsOpen(false)} />

            case 'memory_limit_exceeded':
                return <SubmissionCardMLE submission={submission} onClose={() => setIsOpen(false)} />

            case 'runtime_error':
                return <SubmissionCardRE submission={submission} onClose={() => setIsOpen(false)} />
        }
    }

    const formattedTitle = (text:string) => {
        if(!text) return ''
        return text
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
    }

    return (
        
        <>
            <motion.div whileHover={{ y: -5 }} className='problem-submission' id={`submission-${submissionColor}`} onClick={toggleOpen}>
                <strong className='submission-title' id={`title-${submissionColor}`}>{formattedTitle(submission.status)}</strong>
                <div className='submission-container'>

                    <p className='submission-info'> {submission.language}</p>
                    <div className='submission-separator' id='card'></div>

                    <p className='submission-info'> {submission.runtime} </p>
                    <div className='submission-separator' id='card'></div>

                    <p className='submission-info'> {submission.memory} </p>
                    <div className='submission-separator' id='card'></div>

                    <p className='submission-info'>{submission.date}</p>

                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ y: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}

                        className="submission-details-wrapper">
                        {submissionCardType()}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
