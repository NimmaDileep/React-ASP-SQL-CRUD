import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f5f5f5' }}>
            <nav>
                <Link to="/home" style={{ marginLeft: '50px' }}>Home</Link>
                <Link to="/dashboard" style={{ marginLeft: '20px' }}>Dashboard</Link>
                <Link to="/employees" style={{ marginLeft: '20px' }}>Show Employees</Link>
                <Link to="/profile" style={{ marginLeft: '20px' }}>Profile</Link>
                <Link to="localhost:3000" style={{ marginLeft: '20px' }}>Logout</Link>
            </nav>
        </header>
    );
}

export default Header;
