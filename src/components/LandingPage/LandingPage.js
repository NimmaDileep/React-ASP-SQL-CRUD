import React, {useState} from 'react';
import './LandingPage.css';
import CRUD from "../Dashboard/CRUD";
import UserLogin from "./UserLogin";

const LandingPage = () => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    return (
        <div className="landing-container">
            {token ? <CRUD token={token} userData={userData}/> : <UserLogin onLogin={setToken} onUserData={setUserData} />}
        </div>
    );
};

export default LandingPage;
