import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo">MoviVibe</div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
          />
        </div>

        <nav className="header-nav">
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
