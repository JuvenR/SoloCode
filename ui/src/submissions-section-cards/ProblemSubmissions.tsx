import '../css/submissionsView.css'
import SubmissionCard from './SubmissionCard'
import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useSubmissionController } from '../UseSubmissionsController'

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible : (i:number) => ({
        opacity: 1, y:0, transition: {
            delay : i * 0.07, type: 'spring', stiffness: 300, damping: 24
        }
    })
}
export default function ProblemSubmissions() {
    const controller = useSubmissionController()

    return (
        <>
            {
                //get the submissions info from each problem
            }
            <div className='submissions-container'>
                <div className='submissions-container-header'></div>
                <motion.main
                    className='submissions-main'
                    initial='hidden'
                    animate='show'
                >
                    <strong className='submissions-main-title'>Submissions for this problem</strong>

                    {controller.submissions.map((sub, i) => (
                        <motion.div
                            key={sub.id}
                            custom={i}
                            variants={cardVariants}
                            layout
                            initial='hidden'
                            animate='visible'
                        >
                            <SubmissionCard 
                            id={sub.id}
                            status={sub.status}
                            date={sub.date}
                            language={sub.language}
                            memory={sub.memory}
                            runtime={sub.runtime}
                             />
                        </motion.div>
                    ))}

                </motion.main>
            </div>
        </>
    )
}