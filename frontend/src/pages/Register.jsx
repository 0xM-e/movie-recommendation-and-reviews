import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const RegisterPage = () => {
    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';

        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        return newErrors;
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        alert('Account created successfully!');
    };

    return (
        <div className="auth-container">
            <div className="overlay" />
            <div className="auth-box">
                <div className="auth-logo">🎬 MoviVibe</div>
                <h2 className="auth-title">Sign Up</h2>
                <p className="auth-tagline">Discover, rate, and share your favorite movies. 🔍⭐📤</p>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <label htmlFor="username" className="auth-label">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        maxLength={40}
                        value={formData.username}
                        onChange={handleChange}
                        required
                        aria-describedby="username-error"
                    />
                    {errors.username && <div className="auth-error" id="username-error">{errors.username}</div>}

                    <label htmlFor="email" className="auth-label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        maxLength={40}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-describedby="email-error"
                    />
                    {errors.email && <div className="auth-error" id="email-error">{errors.email}</div>}

                    <label htmlFor="password" className="auth-label">
                        Password
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={formData.password}
                            maxLength={40}
                            onChange={handleChange}
                            required
                            aria-describedby="password-error"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="password-toggle"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.password && <div className="auth-error" id="password-error">{errors.password}</div>}

                    <button type="submit" className="auth-button" disabled={Object.keys(errors).length > 0 && !formData.username}>
                        Create Account
                    </button>
                </form>

                <div className="auth-alt-login">
                    <img
                        src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
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
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
