import '../css/submissionsView.css'
import SubmissionCard from './SubmissionCard'



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

                    <SubmissionCard submissionType="Accepted" />
                    <SubmissionCard submissionType="Compile Error" />
                    <SubmissionCard submissionType="Output Limit Exceeded" />
                    <SubmissionCard submissionType="Wrong Answer" />
                    <SubmissionCard submissionType="Time Limit Exceeded" />
                    <SubmissionCard submissionType="Memory Limit Exceeded" />


                </main>
            </div>
        </>
    )
}