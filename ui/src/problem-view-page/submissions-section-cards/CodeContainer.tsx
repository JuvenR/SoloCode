import { useEffect, useRef, useState } from 'react'
import '../../css/submissionCards.css'
import { motion } from 'motion/react'

interface CodeProps {
    answerCode: string | undefined,
}
export default function CodeContainer({answerCode}: CodeProps) {

    const [isViewMore, setViewMore] = useState(false)

    const[needsButton, setNeedsButton] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(contentRef.current){
            const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight
            setNeedsButton(isOverflowing)
        }
    }, [answerCode])

    return (
        <>
            <div className={`submission-code-content ${isViewMore ? 'expanded-content' : ''}`}>
                
                <div ref = {contentRef} className={`submission-code-answer ${isViewMore ? 'expanded' : ''}`}>
                    {answerCode}
                </div>

                {needsButton && !isViewMore && (
                    <motion.button className='submission-code-viewmore' onClick={() => setViewMore(true)} whileHover={{y:-3}}>
                        v  View more
                    </motion.button>
                )}

                {needsButton && isViewMore && (
                    <motion.button className='submission-code-viewmore' onClick={() => setViewMore(false)} whileHover={{y:-3}}>
                        ^ View less
                    </motion.button>
                )}
            </div>
        </>
    )
}