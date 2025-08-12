import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  const menuRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !avatarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="main-header">
      <div className='mobile-menu'>
        <div className='hamburger-icon' onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="header-container">
        <div className="header-logo">MoviVibe</div>
        <SearchBar isOpen={mobileMenuOpen} />
        <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>

          {isAuthenticated ? (
            <div className="user-profile" onClick={toggleMenu} ref={avatarRef}>
              <span className="username">{user?.username || 'John Doe'}</span>
              <div className="avatar">
                <img src={user?.avatar || 'https://avatars.githubusercontent.com/u/159952115?v=4'} alt="User Avatar" />
              </div>
              {menuOpen && (
                <div className="dropdown-content" ref={menuRef}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
