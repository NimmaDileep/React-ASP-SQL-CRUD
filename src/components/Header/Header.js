import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css'
import AuthContext from "../AuthContext";
import logo from './conquer-tech.png';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  z-index: 100;
`;


const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin: 0 20px;
  color: ${props => props.isActive ? '#e74c3c' : '#ecf0f1'};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #e74c3c;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProfileLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = () => {
    const { setAuthToken, authToken, setAuthRole } = React.useContext(AuthContext);
    const location = useLocation();

    const handleLogout = () => {
        setAuthToken(null);
        setAuthRole(null);
    }

    return (
        <StyledHeader>
            <NavContainer>
                {authToken ? (
                    <>
                        <img src={logo} alt="Company Logo" className="header-logo" />
                        <StyledLink to="/home" isActive={location.pathname === "/home"}>Home</StyledLink>
                        <StyledLink to="/about" isActive={location.pathname === "/about"}>About</StyledLink>
                        <StyledLink to="/dashboard" isActive={location.pathname === "/dashboard"}>Dashboard</StyledLink>
                        <StyledLink to="/employees" isActive={location.pathname === "/employees"}>Show Consultants</StyledLink>
                        <StyledLink to="/consultant" isActive={location.pathname === "/consultant"}>Consultant Dashboard</StyledLink>
                        <StyledLink to="/submissionForm" isActive={location.pathname === "/submissionForm"}>New Submission</StyledLink>
                        <ProfileLink to="/profile" isActive={location.pathname === "/profile"}>
                            <FontAwesomeIcon icon={faUser} color="#ecf0f1" size="lg" />
                            <span>Profile</span>
                        </ProfileLink>
                        <StyledLink to="/logout" onClick={handleLogout} isActive={location.pathname === "/logout"}>Logout</StyledLink>
                    </>
                ) : (
                    <>
                        <img src={logo} alt="Company Logo" className="header-logo" />
                        <StyledLink to="/home" isActive={location.pathname === "/home"}>Home</StyledLink>
                        <StyledLink to="/about" isActive={location.pathname === "/about"}>About</StyledLink>
                        <StyledLink to="/signin" isActive={location.pathname === "/signin"}>Sign In</StyledLink>
                        <StyledLink to="/signup" isActive={location.pathname === "/signup"}>Sign Up</StyledLink>
                    </>
                )}
            </NavContainer>
        </StyledHeader>
    );
}

export default Header;
