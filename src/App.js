// import React, { useState } from 'react';
// import './App.css';
// import CRUD from './components/Dashboard/CRUD';
// import UserLogin from './components/LandingPage/UserLogin';
//
// function App() {
//     const [token, setToken] = useState(null);
//     const [userData, setUserData] = useState(null);
//     return (
//         <div className="App">
//             {token ? <CRUD token={token} userData={userData}/> : <UserLogin onLogin={setToken} onUserData={setUserData} />}
//         </div>
//     );
// }
//
// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                    {/*<Route path="/profile" element={<Profile />} />*/}
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
