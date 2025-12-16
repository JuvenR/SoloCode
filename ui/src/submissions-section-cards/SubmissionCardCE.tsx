import '../css/submissionCards.css'
import btnClose from '../assets/closeButton.png'

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
2 errors`;

    return (
        <>
            <div className='card-submission-container' id='red-container'>
                <main className='card-submission-main'>
                    <strong className='card-title' id='red-title'>Compile Error</strong>
                    <img src={btnClose} onClick={onClose}></img>
                </main>
                <article className='card-submission-info'>
                    <p className='card-submission-testcases'>
                        0 / 666 Testcases passed
                    </p>
                    <p className='card-submission-date'>
                        submitted at Nov 22, 2025 14:48
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

                    <div className='submission-code-content'>
                        <div className='submission-code'>
                            print('llamen a dios verdaderamente')
                        </div>


                        <div className='submission-code-viewmore-separator'> </div>
                        <div className='submission-code-viewmore'>
                            v  View more
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}