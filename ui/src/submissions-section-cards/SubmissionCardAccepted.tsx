import '../css/submissionCards.css'
import btnClose from '../assets/closeButton.png'
import { useState } from 'react'
import { motion } from 'motion/react'
import CodeContainer from './CodeContainer'


interface SubmissionProps {
    onClose: () => void
}



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



export default function SubmissionCardAccepted({ onClose }: SubmissionProps) {
    const [isViewMore, setViewMore] = useState(false)
    return (
        <>
            <div className='card-submission-container' id='green-container'>
                <main className='card-submission-main'>
                    <strong className='card-title' id='green-title'>Accepted</strong>
                    <motion.img 
                    whileHover={{y:-4}}
                    src={btnClose} onClick={onClose}></motion.img>
                </main>
                <article className='card-submission-info'>
                    <p className='card-submission-testcases'>
                        666 / 666 Testcases passed
                    </p>
                    <p className='card-submission-date'>
                        Submitted at Nov 22, 2025 14:48
                    </p>
                </article>
                <article className='accepted-submission-details'>
                    <div className='accepted-submission-individual-info'>
                        <p className='accepted-submission-info-title'>
                            Runtime
                        </p>
                        <div className='accepted-submission-info-content'>
                            <p> 0 ms</p>
                        </div>
                    </div>

                    <div className='accepted-submission-individual-info'>
                        <p className='accepted-submission-info-title'>
                            Memory
                        </p>
                        <div className='accepted-submission-info-content'>
                            <p>43.78 MB</p>
                        </div>
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

                    <CodeContainer answerCode={answerCode} isViewMore={isViewMore} setViewMore = {setViewMore}/>
                </article>
            </div>
        </>
    )
}