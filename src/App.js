import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import UserLogin from "./components/LandingPage/UserLogin";
import SignUp from "./components/LandingPage/SignUp";
import './App.css'
import SignIn from "./components/LandingPage/SignIn";
import CRUD from "./components/Dashboard/CRUD";
import Home from "./components/LandingPage/Home";
import About from "./components/LandingPage/About";

function App() {
    return (
        <Router>
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<CRUD />} />
                    <Route path="/profile" element={<CRUD />} />
                    {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                    {/*<Route path="/profile" element={<Profile />} />*/}
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}


export default App;
