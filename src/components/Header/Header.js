import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background: #2c3e50;
  position: relative;
  z-index: 100;
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin: 0 20px;
  color: #ecf0f1;
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

const Header = ({ token, handleLogout }) => {
    return (
        <StyledHeader>
            <NavContainer>
                <StyledLink to="/home">Home</StyledLink>
                <StyledLink to="/about">About</StyledLink>
                {token ? (
                    <>
                        <StyledLink to="/dashboard">Dashboard</StyledLink>
                        <StyledLink to="/employees">Show Employees</StyledLink>
                        <StyledLink to="/logout" onClick={handleLogout}>Logout</StyledLink>
                    </>
                ) : (
                    <>
                        <StyledLink to="/signin">Sign In</StyledLink>
                        <StyledLink to="/signup">Sign Up</StyledLink>
                        <StyledLink to="/profile">Profile</StyledLink>
                    </>
                )}
            </NavContainer>

        </StyledHeader>
    );
}

export default Header;
