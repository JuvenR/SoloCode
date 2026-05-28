import ProblemDescription from './ProblemDescription'
import ProblemSubmissions from '../submissions-section-cards/ProblemSubmissions'
import { useState } from 'react'
import { motion } from 'motion/react'
import { mockProblems } from '../services/ProblemService'
import { useSubmissionController } from '../controllers/UseSubmissionsController'
import type { ProblemViewProps } from './ProblemPage'

interface ProblemTabsProps {
    activeTab: string
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

export default function ProblemView({currentIndex, currentProblem, setCurrentIndex}:ProblemViewProps) {
    const [activeTab, setActiveTab] = useState('description')

    

    const {submissions} = useSubmissionController(currentProblem.id)

        // navigation functions
    const handleNext = () => {
        // it changes if it's not on the last element
        if(currentIndex < mockProblems.length - 1){
            setCurrentIndex(currentIndex + 1)
        }
    }

    const handleBack = () => {
         // it changes if it's not on the first element
         if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1)
         }
    }

    return (
        <>
            <div className='main-container'>
                <ProblemTabs activeTab={activeTab} onTabChange={setActiveTab}/>    
                {activeTab === 'description' && <ProblemDescription currentProblem={currentProblem} handleNext={handleNext} handleBack={handleBack}/>}
                {activeTab === 'submissions' && <ProblemSubmissions submissions={submissions}/>}
                 
            </div>

        </>
    )
}
