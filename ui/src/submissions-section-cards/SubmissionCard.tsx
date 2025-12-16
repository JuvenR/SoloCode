import { useState } from 'react'
import '../css/submissionsView.css'
import SubmissionCardAccepted from './SubmissionCardAccepted'
import SubmissionCardCompileError from './SubmissionCardCE'


export default function SubmissionCard({ submissionType }: { submissionType: string }) {

    const isSubmissionAccepted = submissionType?.toLowerCase() === 'accepted'
    const submissionColor = isSubmissionAccepted ? 'green' : 'red'

    const [isOpen, setIsOpen] = useState(false);

    const submissionResult = submissionType.toLowerCase()

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const submissionCardType = () => {

        switch (submissionResult) {
            case 'accepted':
                return <SubmissionCardAccepted onClose={() => setIsOpen(false)} />
            
            case 'compile error':
            return <SubmissionCardCompileError onClose={() => setIsOpen(false)} />
        }
    }

    return (
        <>
            <div className='problem-submission' id={`submission-${submissionColor}`} onClick={toggleOpen}>
                <strong className='submission-title' id={`title-${submissionColor}`}>{submissionType}</strong>
                <div className='submission-container'>

                    <p className='submission-info'> JavaScript</p>
                    <div className='submission-separator'></div>

                    <p className='submission-info'> 0ms</p>
                    <div className='submission-separator'></div>

                    <p className='submission-info'> 43.78 MB</p>
                    <div className='submission-separator'></div>

                    <p className='submission-info'>Nov 26, 2025</p>

                </div>
            </div>
           
             {isOpen && (
               <div className="submission-details-wrapper">
                    {submissionCardType()}
               </div>
           )}
          
        </>
    )
}