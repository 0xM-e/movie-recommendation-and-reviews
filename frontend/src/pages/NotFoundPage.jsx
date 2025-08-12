import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">The page you are looking for could not be found.</p>
        <img
          className="notfound-image"
          src="https://i.imgur.com/A040Lxr.png"
          alt="Lost in space illustration"
        />
        <Link to="/home" className="notfound-button">
          <span>Go Back Home</span>
          <span style={{ fontSize: '1.2rem' }}>🏠</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
