import React, {useEffect, useState} from 'react';
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
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

const Main = (props) => {
    const navigate = useNavigate();
    const authToken = props.authToken;
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (!authToken) {
            setShowSuccessModal(true);
            navigate('/signin')
        }
    }, [authToken]);

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
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Proceed to signin in order to continue</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setShowSuccessModal(false);
                        navigate('/signin');
                    }}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
};

export default Main;
