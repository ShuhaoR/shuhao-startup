// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={{ background: "#2c3e50", padding: "1rem" }}>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {!isLoggedIn ? (
          <>
            <li style={{ marginRight: "1rem" }}>
              <Link to="/" style={{ color: "#ecf0f1", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li style={{ marginRight: "1rem" }}>
              <Link
                to="/company-intro"
                style={{ color: "#ecf0f1", textDecoration: "none" }}
              >
                Company Intro
              </Link>
            </li>
            <li style={{ marginRight: "1rem" }}>
              <Link
                to="/register"
                style={{ color: "#ecf0f1", textDecoration: "none" }}
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                style={{ color: "#ecf0f1", textDecoration: "none" }}
              >
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li style={{ marginRight: "1rem" }}>
              <Link to="/" style={{ color: "#ecf0f1", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li style={{ marginRight: "1rem" }}>
              <Link
                to="/company-intro"
                style={{ color: "#ecf0f1", textDecoration: "none" }}
              >
                Company Intro
              </Link>
            </li>
            <li style={{ marginRight: "1rem" }}>
              <Link
                to="/post-request"
                style={{ color: "#ecf0f1", textDecoration: "none" }}
              >
                Post Request
              </Link>
            </li>
            <li style={{ marginRight: "1rem" }}>
              <Link
                to="/submit-application"
                style={{ color: "#ecf0f1", textDecoration: "none" }}
              >
                Submit Application
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ecf0f1",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
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
