import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        // Simple regex for email validation
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const validatePassword = (password) => {
        // Password should be at least 6 characters long for this example.
        return password.length >= 6;
    };

    const handleSignIn = () => {
        if (!validateEmail(email)) {
            alert("Invalid email address.");
            return;
        }

        if (!validatePassword(password)) {
            alert("Password should be at least 6 characters long.");
            return;
        }

        // Continue with sign in logic (like sending data to the backend, etc.)
    };

    return (
        <div className="login-card">
            <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="Profile" />
            <h2>Sign In</h2>
            <form className="login-form">
                <div className="email-section">
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        className="control"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <input
                    spellCheck="false"
                    className="control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button className="control" type="button" onClick={handleSignIn}>
                    SIGN IN
                </button>
            </form>
        </div>
    );
}

export default SignIn;
