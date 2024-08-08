// Example: src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/company-intro">Company Intro</Link></li>
            <li><Link to="/post-request">Post Request</Link></li>
            <li><Link to="/submit-application">Submit Application</Link></li>
            <li><Link to="/logout">Logout</Link></li>
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

