import '../css/submissionsView.css'
import SubmissionCard from './SubmissionCard'
import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { type Submission } from '../controllers/UseSubmissionsController'

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1, y: 0, transition: {
            delay: i * 0.07, type: 'spring', stiffness: 300, damping: 24
        }
    })
}

interface ProblemSubmissionsProps {
    submissions: Submission[]
}

export default function ProblemSubmissions({ submissions }: ProblemSubmissionsProps) {

    return (
        <>
            <div className='submissions-container'>
                <div className='submissions-container-header'></div>
                <motion.main
                    className='submissions-main'
                    initial='hidden'
                    animate='show'
                >
                    <strong className='submissions-main-title'>Submissions for this problem</strong>

                    {submissions.length === 0 ? (
                        <div className='empty-submissions'>
                            No submissions yet. Time to code!
                 
                        </div>
                       
                    ) : (
                        submissions.map((sub, i) => (
                            <motion.div
                                key={sub.id}
                                custom={i}
                                variants={cardVariants}
                                layout
                                initial='hidden'
                                animate='visible'
                            >
                                <SubmissionCard submission = {sub}/>
                            </motion.div>
                        ))
                    )}


                </motion.main>
            </div>
        </>
    )
}