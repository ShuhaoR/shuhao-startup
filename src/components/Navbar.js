// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav>
      <ul>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/company-intro">Company Intro</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/company-intro">Company Intro</Link>
            </li>
            <li>
              <Link to="/post-request">Post Request</Link>
            </li>
            <li>
              <Link to="/submit-application">Submit Application</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', padding: 0 }}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

