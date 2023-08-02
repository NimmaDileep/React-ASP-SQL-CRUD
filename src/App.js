import React, { useState } from 'react';
import './App.css';
import CRUD from './CRUD';
import UserLogin from './UserLogin';

function App() {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    return (
        <div className="App">
            {token ? <CRUD token={token} userData={userData}/> : <UserLogin onLogin={setToken} onUserData={setUserData} />}
        </div>
    );
}

export default App;