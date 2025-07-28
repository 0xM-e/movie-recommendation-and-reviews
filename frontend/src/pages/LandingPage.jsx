import React from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
    };

    return (
        <div className="landing-container">
            <div className="overlay" />
            <div className="glass-box">
                <h1 className="main-title">🎬 Movie Review</h1>
                <p className="tagline">Discover, comment, save your favorites.</p>
                <button className="cta-button" onClick={handleStart}>
                    🎥 Start Exploring
                </button>
            </div>
        </div>
    );
    

};

export default LandingPage;
