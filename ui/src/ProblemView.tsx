import ProblemTabs from './ProblemTabs'
import ProblemDescription from './problem-details/ProblemDescription'
import ProblemSubmissions from './submissions-section-cards/ProblemSubmissions'
import { useState } from 'react'

export default function problemView() {
    const [activeTab, setActiveTab] = useState('description')
    return (
        <>
            <div className='main-container'>
                <ProblemTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                />
                
                {activeTab === 'description' && <ProblemDescription />}
                {activeTab === 'submissions' && <ProblemSubmissions />}
                 
            </div>

        </>
    )
}