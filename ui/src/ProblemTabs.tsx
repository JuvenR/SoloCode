import './problemView.css'
import { useState } from 'react';

export default function problemTabs() {
    const [activeTab, setActiveTab] = useState('description');
    return (
        <>
            <div className="tabs-group">
                <button
                    className={`description-button ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`submissions-button ${activeTab === 'submissions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('submissions')}
                >
                    Submissions
                </button>
            </div>
        </>
    )

}