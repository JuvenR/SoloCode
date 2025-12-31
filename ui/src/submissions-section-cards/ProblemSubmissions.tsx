import '../css/submissionsView.css'
import SubmissionCard from './SubmissionCard'
import { motion } from 'motion/react'



export default function ProblemSubmissions() {
    return (
        <>
            {
                //get the submissions info from each problem
            }
            <div className='submissions-container'>
                <div className='submissions-container-header'></div>
                <main className='submissions-main'>
                    <strong className='submissions-main-title'>Submissions for this problem</strong>

                    <motion.div initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                        <SubmissionCard submissionType="Accepted" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                        <SubmissionCard submissionType="Compile Error" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                        <SubmissionCard submissionType="Output Limit Exceeded" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                        <SubmissionCard submissionType="Wrong Answer" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                        <SubmissionCard submissionType="Time Limit Exceeded" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                        <SubmissionCard submissionType="Memory Limit Exceeded" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                        <SubmissionCard submissionType="Runtime Error" />
                    </motion.div>








                </main>
            </div>
        </>
    )
}