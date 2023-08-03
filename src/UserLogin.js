import React, { useState } from 'react';
import axios from 'axios';
import './UserLogin.css';

const UserLogin = ({ onLogin, onUserData }) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        role: "User"
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState('initial');
    const [userData, setUserData] = useState();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    };

    const validateForm = () => {
        if (user.username.trim() === "" || user.password.trim() === "" || (form === 'register' && user.email.trim() === "")) {
            setError("All fields must be filled.");
            return false;
        }
        setError("");
        return true;
    }

    const login = async () => {
        if (!validateForm()) return;

        const params = new URLSearchParams();
        params.append('username', user.username);
        params.append('password', user.password);
        params.append('grant_type', 'password');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            const response = await axios.post('https://localhost:44316/token', params, config);
            const userRes = await axios.get(`https://localhost:44316/api/user/${user.username}`);
            setUserData(userRes.data);
            onLogin(response.data.access_token);
            onUserData(userRes.data);
        } catch (error) {
            setError("Invalid username or password.");
        }
    };


    const register = async () => {
        if (!validateForm()) return;

        const url = "https://localhost:44316/api/user";
        const data = {
            username: user.username,
            password: user.password,
            email: user.email,
            Roles: user.role
        };

        try {
            await axios.post(url, data);
            setSuccess("Registration successful. Proceed to login with your credentials.");
            setForm('initial');
            setUser({ username: "", password: "", email: "", role: "User"});
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="form-wrapper">
            {form === 'initial' ? (
                <div className="button-container">
                    <button type="button" onClick={() => setForm('login')}>Login</button>
                    <button type="button" onClick={() => setForm('register')}>Register</button>
                </div>
            ) : (
                <>
                    <h2>{form.charAt(0).toUpperCase() + form.slice(1)}</h2>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username"/>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"/>
                    {form === 'register' && <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>}
                    <div className="button-container">
                        <button type="button" onClick={form === 'login' ? login : register}>{form.charAt(0).toUpperCase() + form.slice(1)}</button>
                        <button type="button" onClick={() => setForm('initial')}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserLogin;
