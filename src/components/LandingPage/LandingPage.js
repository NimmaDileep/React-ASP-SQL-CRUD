import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import CRUD from "../Dashboard/CRUD";
import UserLogin from "../Authentication/UserLogin";
import Header from '../Header/Header';

const LandingPage = () => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);

    // Logic for handling scroll spy remains the same...
    // ...

    const handleLogout = () => {
        setToken(null);
        setUserData(null);
    };

    return (
        <div className="landing-container">
            <Header token={token} handleLogout={handleLogout} />

            <section id="home" className="section">
                <div className="container">
                    <div className="content-wrapper text-center">
                        <div className="content">
                            <h2>Welcome to Our Platform</h2>
                            <p>Log in or Register to access amazing features.</p>
                            <UserLogin onLogin={setToken} onUserData={setUserData} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Other sections like About, etc... */}

            {token && (
                <section id="profile" className="section">
                    <CRUD token={token} userData={userData} />
                </section>
            )}
        </div>
    );
};

export default LandingPage;
