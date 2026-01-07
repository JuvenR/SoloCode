import '../css/submissionCards.css'
import btnClose from '../assets/closeButton.png'
import { useState } from 'react'
import { motion } from 'motion/react'
import CodeContainer from './CodeContainer'

interface SubmissionProps {
    onClose: () => void
}


export default function SubmissionCardOLE({ onClose }: SubmissionProps) {

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

    const lastExecutedInput = '[1,0,0,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,00000000000000000000000000000000000000000,0,0,0,1,0,1,0,0,0,0,1,1,0,1,0,0,0,1]'
    const lastExecutedOutput = `Hola Mundo :)
Hola Mundo :) 
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
Hola Mundo :)
`

    const [isViewMore, setViewMore] = useState(false)


    return (
        <>
            <div className='card-submission-container' id='red-container'>
                <main className='card-submission-main'>
                    <strong className='card-title' id='red-title'>Output Limit Exceeded</strong>
                    <motion.img
                        whileHover={{ y: -4 }}
                        src={btnClose} onClick={onClose}></motion.img>
                </main>
                <article className='card-submission-info'>
                    <p className='card-submission-testcases'>
                        100 / 666 Testcases passed
                    </p>
                    <p className='card-submission-date'>
                        Aubmitted at Nov 22, 2025 14:48
                    </p>
                </article>

                <article className='submission-last-executed-input'>
                    <p className='submission-subtitle'>
                        Last Executed Input
                    </p>
                    <div className='executed-code'>
                        {lastExecutedInput}
                    </div>
                </article>

                <article className='submission-last-executed-output'>
                     <p className='submission-subtitle'>
                        Last Executed Output
                    </p>
                   <CodeContainer answerCode={lastExecutedOutput} isViewMore={isViewMore} setViewMore = {setViewMore}/>
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