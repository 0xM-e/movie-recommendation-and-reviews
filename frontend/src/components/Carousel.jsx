import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = ({ panels, panelWidth, panelHeight, rotationSpeed }) => {
    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [expandedPanels, setExpandedPanels] = useState({});

    const panelCount = panels.length;
    const angle = 360 / panelCount;

    useEffect(() => {
        if (!isHovered) {
            let animationFrameId;
            const animate = () => {
                setRotation((prev) => (prev + rotationSpeed) % 360);
                animationFrameId = requestAnimationFrame(animate);
            };
            animationFrameId = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrameId);
        }
    }, [isHovered, rotationSpeed]);

    const handlePrev = () => setRotation((prev) => prev - angle);
    const handleNext = () => setRotation((prev) => prev + angle);

    const toggleExpand = (id) => {
        setExpandedPanels((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div
            className="carousel-wrapper"
            style={{ width: panelWidth, height: panelHeight }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 style={{ textAlign: 'center' }}>🎬 Daily Most Rated</h2>

            <div className="carousel-container">
                <div
                    className="carousel"
                    style={{ transform: `translateZ(-450px) rotateY(${rotation}deg)` }}
                >
                    {panels.map((panel, index) => {
                        const panelAngle = angle * index;
                        const isExpanded = expandedPanels[panel.id];

                        return (
                            <div
                                key={panel.id}
                                className="carousel-panel"
                                style={{
                                    transform: `rotateY(${panelAngle}deg) translateZ(550px) rotateY(${-rotation - panelAngle}deg)`,
                                }}
                            >
                                <div className="card-image">
                                    <img src={panel.image} alt={panel.title} />
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{panel.title}</h3>
                                    <p className="card-rate">{panel.rate}</p>
                                    <div className="card-meta">
                                        <p><strong>Director:</strong> {panel.director}</p>
                                        <p><strong>Year:</strong> {panel.year}</p>
                                        <p><strong>Genre:</strong> {panel.genre}</p>

                                    </div>
                                    <p className={`card-description ${isExpanded ? 'expanded' : ''}`}>
                                        {panel.description}
                                    </p>
                                    <button
                                        className="read-more-btn"
                                        onClick={() => toggleExpand(panel.id)}
                                    >
                                        Read
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
