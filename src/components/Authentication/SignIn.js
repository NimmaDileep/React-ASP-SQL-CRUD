import React, { useState } from 'react';
import './SignIn.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../AuthContext";

function SignIn() {
    const [userName, setUsername] = useState(''); // Added this line
    const [email, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const { setAuthToken, setAuthRole } = React.useContext(AuthContext);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignIn = async () => {
        // if (!validateEmail(email)) {
        //     alert("Invalid email address.");
        //     return;
        // }

        if (!validatePassword(userPassword)) {
            alert("Password should be at least 6 characters long.");
            return;
        }

        const params = new URLSearchParams();
        params.append('username', userName);
        params.append('password', userPassword);
        params.append('grant_type', 'password');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            const response = await axios.post('https://localhost:44316/token', params, config);
            const userRes = await axios.get(`https://localhost:44316/api/user/${userName}`);
            setUserData(userRes.data);
            console.log('Access Token',response.data);
            // console.log('Access Token',response.data.access_token);
            console.log('User Data',userRes.data);
            // console.log('User Role', userRes.data.Roles);
            setAuthToken(response.data.access_token);
            // setAuthRole(userRes.data.Roles)
            navigate('/dashboard');
        } catch (error) {
            console.log("Error")
        }

    };

    return (
        <div className="login-card">
            <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="Profile" />
            <h2>Sign In</h2>
            <form className="login-form">
                <div className="username-section">
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        className="control"
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={handleUsernameChange}
                    />
                </div>
                {/*<div className="email-section">*/}
                {/*    <input*/}
                {/*        autoComplete="off"*/}
                {/*        spellCheck="false"*/}
                {/*        className="control"*/}
                {/*        type="email"*/}
                {/*        placeholder="Email"*/}
                {/*        value={email}*/}
                {/*        onChange={handleEmailChange}*/}
                {/*    />*/}
                {/*</div>*/}
                <input
                    spellCheck="false"
                    className="control"
                    type="password"
                    placeholder="Password"
                    value={userPassword}
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
