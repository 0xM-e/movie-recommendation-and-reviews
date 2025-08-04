import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo">MoviVibe</div>
        <SearchBar />
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
