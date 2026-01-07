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
import type {Submission} from '../UseSubmissionsController'

export default function SubmissionCard({ id, status, date, language, memory, runtime }: Submission) {

    const isSubmissionAccepted =status ?.toLowerCase() === 'accepted'
    const submissionColor = isSubmissionAccepted ? 'green' : 'red'

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const submissionCardType = () => {

        switch (status) {
            case 'accepted':
                return <SubmissionCardAccepted onClose={() => setIsOpen(false)} />

            case 'compile_error':
                return <SubmissionCardCompileError onClose={() => setIsOpen(false)} />

            case 'output_limit_exceeded':
                return <SubmissionCardOLE onClose={() => setIsOpen(false)} />

            case 'wrong_answer':
                return <SubmissionCardWA onClose={() => setIsOpen(false)} />

            case 'time_limit_exceeded':
                return <SubmissionCardTLE onClose={() => setIsOpen(false)} />

            case 'memory_limit_exceeded':
                return <SubmissionCardMLE onClose={() => setIsOpen(false)} />

            case 'runtime_error':
                return <SubmissionCardRE onClose={() => setIsOpen(false)} />
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
                <strong className='submission-title' id={`title-${submissionColor}`}>{formattedTitle(status)}</strong>
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
