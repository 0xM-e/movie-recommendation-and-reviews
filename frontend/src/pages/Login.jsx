import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import authService from '../services/AuthService';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        authService.login({ email, password})
        console.log({ email, password, remember });
        setError('');
        alert('Login successful!');
        navigate('/home');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-logo">🎬 MoviVibe</div>
                <h2 className="auth-title">Login</h2>
                <p className="auth-tagline">Step into the world of movies. 🎬</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="auth-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        maxLength={40}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className="auth-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        maxLength={40}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="auth-remember-forgot">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="forgot-link">
                            Forgot password?
                        </Link>
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="auth-button">Login</button>
                </form>

                <div className="auth-alt-login">
                    <img
                        src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp"
                        alt="Google login"
                        className="alt-login-icon"
                        onClick={() => alert('Google login not implemented')}
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                        alt="Facebook login"
                        className="alt-login-icon"
                        onClick={() => alert('Facebook login not implemented')}
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                        alt="Apple login"
                        className="alt-login-icon"
                        onClick={() => alert('Apple login not implemented')}
                    />
                </div>

                <p className="auth-footer">
                    Don’t have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
