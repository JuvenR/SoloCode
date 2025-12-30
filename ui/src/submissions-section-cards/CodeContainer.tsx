import '../css/submissionCards.css'
import { motion } from 'motion/react'

interface CodeProps {
    answerCode: string,
    isViewMore: boolean,
    setViewMore: (state:boolean) => void
}
export default function CodeContainer({answerCode, isViewMore, setViewMore}: CodeProps) {

    return (
        <>
            <div className={`submission-code-content ${isViewMore ? 'expanded-content' : ''}`}>
                <div className={`submission-code-answer ${isViewMore ? 'expanded' : ''}`}>
                    {answerCode}
                </div>
                {!isViewMore && (
                    <motion.button className='submission-code-viewmore' onClick={() => setViewMore(true)} whileHover={{y:-3}}>
                        v  View more
                    </motion.button>
                )}

                {isViewMore && (
                    <motion.button className='submission-code-viewmore' onClick={() => setViewMore(false)} whileHover={{y:-3}}>
                        ^ View less
                    </motion.button>
                )}
            </div>
        </>
    )
}