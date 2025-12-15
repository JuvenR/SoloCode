import ProblemTabs from './ProblemTabs'
import ProblemDescription from './ProblemDescription'

export default function problemView() {
    return (
        <>
            <div className='main-container'>
                <ProblemTabs />
                <ProblemDescription />
            </div>

        </>
    )
}