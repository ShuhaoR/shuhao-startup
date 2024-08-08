// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/company-intro">Company Intro</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/post-request">Post Request</Link></li>
            <li><Link to="/submit-application">Submit Application</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

