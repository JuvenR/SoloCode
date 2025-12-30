import ProblemDescription from './problem-details/ProblemDescription'
import ProblemSubmissions from './submissions-section-cards/ProblemSubmissions'
import { useState } from 'react'
import { motion } from 'motion/react'

interface ProblemTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

function ProblemTabs({ activeTab, onTabChange }: ProblemTabsProps) {
    return (
        <>
            <div className="tabs-group">
                <motion.button
                    whileHover={{ scaleY: .96 }}
                    style={{ originY: 1 }}
                    className={`description-button ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => onTabChange('description')}
                >
                    Description
                </motion.button>
                <motion.button
                    whileHover={{ scaleY: .96 }}
                    style={{ originY: 1 }}
                    className={`submissions-button ${activeTab === 'submissions' ? 'active' : ''}`}
                    onClick={() => onTabChange('submissions')}
                >
                    Submissions
                </motion.button>
            </div>
        </>
    )

}
export default function problemView() {
    const [activeTab, setActiveTab] = useState('description')
    return (
        <>
            <div className='main-container'>
                <ProblemTabs activeTab={activeTab} onTabChange={setActiveTab}/>    
                {activeTab === 'description' && <ProblemDescription />}
                {activeTab === 'submissions' && <ProblemSubmissions />}
                 
            </div>

        </>
    )
}