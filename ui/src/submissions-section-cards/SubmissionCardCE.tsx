import '../css/submissionCards.css'
import btnClose from '../assets/closeButton.png'
import { useState } from 'react'
import { motion } from 'motion/react'
import CodeContainer from './CodeContainer'

interface SubmissionProps {
    onClose: () => void
}


export default function SubmissionCardCompileError({ onClose }: SubmissionProps) {
    const errorMessage =
        `Line 6: error: not a statement      
        for (true) {             
            ^
Line 6: error: ';' expected
        for (true) {               
            ^ 
2 errors`

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

    const [isViewMore, setViewMore] = useState(false)


    return (
        <>
            <div className='card-submission-container' id='red-container'>
                <main className='card-submission-main'>
                    <strong className='card-title' id='red-title'>Compile Error</strong>
                     <motion.img 
                    whileHover={{y:-4}}
                    src={btnClose} onClick={onClose}></motion.img>
                </main>
                <article className='card-submission-info'>
                    <p className='card-submission-testcases'>
                        0 / 666 Testcases passed
                    </p>
                    <p className='card-submission-date'>
                        Submitted at Nov 22, 2025 14:48
                    </p>
                </article>

                <article className='ce-submission-code'>
                    {errorMessage}
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

                    <CodeContainer answerCode={answerCode} isViewMore={isViewMore} setViewMore = {setViewMore}/>
                </article>
            </div>
        </>
    )
}