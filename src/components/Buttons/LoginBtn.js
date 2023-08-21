import { Button } from 'react-bootstrap';
import React from "react";
import './button.css';

function LoginBtn() {
    return (
        <Button className="btn btn-primary login-btn" size="lg" active> Log In </Button>
    );
}
export default LoginBtn;
