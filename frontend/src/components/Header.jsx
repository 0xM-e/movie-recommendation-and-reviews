import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const localAvatar = "https://wallpapers.com/images/hd/meme-profile-picture-2rhxt0ddudotto63.jpg"

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
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
      <div className="header-container">
        <div className="header-logo">MoviVibe</div>
        <SearchBar />
        <nav className="header-nav">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>

          {isAuthenticated ? (
            <div className="user-profile" onClick={toggleMenu} ref={avatarRef}>
              <span className="username">{user?.username || 'John Doe'}</span>
              <div className="avatar">
                <img src={user?.avatar || localAvatar} alt="User Avatar" />
              </div>
              {menuOpen && (
                <div className="dropdown-menu" ref={menuRef}>
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
