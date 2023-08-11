import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import UserLogin from "./TestExtraCode/UserLogin";
import SignUp from "./components/Authentication/SignUp";
import './App.css'
import SignIn from "./components/Authentication/SignIn";
import CRUD from "./components/Dashboard/CRUD";
import Home from "./components/LandingPage/Home";
import About from "./components/LandingPage/About";
import AuthContext from './components/AuthContext'
import Profile from './components/Profile/Profile'


function MainContent() {
    const location = useLocation();

    return (
        <main className= "main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<CRUD />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<SignIn />} />
                <Route path="/employees" element={<CRUD />} />
            </Routes>
        </main>
    );
}

function App() {
    const initialToken = localStorage.getItem('accessToken');
    const initialRole = localStorage.getItem('userRole');
    const initialUserData = JSON.parse(localStorage.getItem('userData'));

    const [authToken, setAuthToken] = React.useState(initialToken);
    const [authRole, setAuthRole] = React.useState(initialRole);
    const [userData, setUserData] = React.useState(initialUserData);


    React.useEffect(() => {
        if (authToken) {
            const tokenDuration = 3600000;
            const logoutTimer = setTimeout(() => {
                setAuthToken(null);
                setAuthRole(null);
                setUserData(null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userData');
            }, tokenDuration);

            return () => {
                clearTimeout(logoutTimer);
            }
        }
    }, [authToken]);


    return (
        <Router>
            <AuthContext.Provider value={{ authToken, setAuthToken, authRole, setAuthRole }}>
                <Header />
                <MainContent />
                <Footer />
            </AuthContext.Provider>
        </Router>
    );
}


export default App;
