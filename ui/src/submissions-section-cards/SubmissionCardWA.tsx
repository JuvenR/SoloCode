import '../css/submissionCards.css'
import btnClose from '../assets/closeButton.png'
import { useState } from 'react'
import { motion } from 'motion/react'

interface SubmissionProps {
    onClose: () => void
}


export default function SubmissionCardWA({ onClose }: SubmissionProps) {

    const answerCode = `print('este texto es una prueba ) print('este texto es una prueba )
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
pruebeeeeeeee
`

    const input = `Hola Mundo :)`
    const output = `undefined`
    const expected = `[ 2 , 2 ]`

    const [isViewMore, setViewMore] = useState(false)


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
                        500 / 666 Testcases passed
                    </p>
                    <p className='card-submission-date'>
                        Submitted at Nov 22, 2025 14:48
                    </p>
                </article>

                 <article className='submission-testcase-button'>
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
                        {input}
                    </div>
                </article>

                <article className='submission-output'>
                    <p className='submission-subtitle'>
                        Output
                    </p>
                    <div className='executed-code'>
                        {output}
                    </div>
                </article>

                 <article className='submission-expected'>
                    <p className='submission-subtitle'>
                        Expected
                    </p>
                    <div className='executed-code'>
                        {expected}
                    </div>
                </article>

                <article className='submission-code'>
                    <div className='submission-code-details'>
                        <p className='submission-code-title'>
                            Code
                        </p>
                        <div className='submission-separator'></div>
                        <p className='submission-code-title'>
                            Python
                        </p>
                    </div>

                    <div className={`submission-code-content ${isViewMore ? 'expanded-content' : ''}`}>
                        <div className={`submission-code-answer ${isViewMore ? 'expanded' : ''}`}>
                            {answerCode}
                        </div>
                        {!isViewMore && (
                            <button className='submission-code-viewmore' onClick={() => setViewMore(true)}>
                                v  View more
                            </button>
                        )}

                        {isViewMore && (
                            <button className='submission-code-viewmore' onClick={() => setViewMore(false)}>
                                ^ View less
                            </button>
                        )}
                    </div>
                </article>
            </div>
        </>
    )
}