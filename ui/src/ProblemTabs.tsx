import './css/problemView.css'

interface ProblemTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function problemTabs({ activeTab, onTabChange}: ProblemTabsProps)
  {
    return (
        <>
            <div className="tabs-group">
                <button
                    className={`description-button ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => onTabChange('description')}
                >
                    Description
                </button>
                <button
                    className={`submissions-button ${activeTab === 'submissions' ? 'active' : ''}`}
                    onClick={() => onTabChange('submissions')}
                >
                    Submissions
                </button>
            </div>
        </>
    )

}