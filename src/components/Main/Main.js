import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../LandingPage/Home";
import SignUp from "../Authentication/SignUp";
import SignIn from "../Authentication/SignIn";
import CardDisplay from "../Dashboard/CardDisplay";
import Profile from "../Profile/Profile";
import CRUD from "../Dashboard/CRUD";
import ConsultantDashboard from "../Dashboard/Consultant/ConsultantDashboard";
import ConsultantForm from "../Dashboard/Consultant/ConsultantForm";
import './Main.css'

const Main = () => {
    return (
        <main className= "main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<CardDisplay />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<SignIn />} />
                <Route path="/employees" element={<CRUD />} />
                <Route path="/consultant" element={ <ConsultantDashboard />} />
                <Route path="/submissionForm" element={ <ConsultantForm />} />
            </Routes>
        </main>
    );
};

export default Main;
