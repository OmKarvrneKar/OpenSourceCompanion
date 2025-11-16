// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import IssuesList from '../components/IssuesList';
import { mockUser, mockIssues } from '../mockData';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState('');
    const [filteredIssues, setFilteredIssues] = useState([]);

    // Extract unique languages from user's skills
    const userLanguages = [...new Set(mockUser.skills.map(s => s.language))];

    // Filter issues when language changes
    useEffect(() => {
        const filtered = selectedLang
            ? mockIssues.filter(issue => issue.language === selectedLang)
            : mockIssues;
        setFilteredIssues(filtered);
    }, [selectedLang]);

    return (
        <div className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Recommended Issues</h2>
                    <p className="text-muted">
                        Hi <strong>{mockUser.githubUsername}</strong>! Here are issues matching your skills.
                    </p>
                </div>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/profile')}
                >
                    Edit Profile
                </button>
            </div>

            <div className="mb-4">
                <LanguageSelector
                    languages={userLanguages}
                    selected={selectedLang}
                    onChange={setSelectedLang}
                />
            </div>

            <IssuesList issues={filteredIssues} />
        </div>
    );
};

export default Dashboard;