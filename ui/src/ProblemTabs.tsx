import './css/problemView.css'
import { motion } from 'motion/react'

interface ProblemTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function problemTabs({ activeTab, onTabChange }: ProblemTabsProps) {
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