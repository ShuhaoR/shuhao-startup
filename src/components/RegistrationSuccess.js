// src/components/RegistrationSuccess.js

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/success.css"; // Import the CSS for this component

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || { role: "user" }; // Default role to 'user'

  const handleRedirect = () => {
    if (role === "user") {
      navigate("/login-user"); // Redirect to user login page
    } else if (role === "employee") {
      navigate("/login-employee"); // Redirect to employee login page
    }
  };

  return (
    <div className="success-container">
      <h1>Registration Successful!</h1>
      <p>
        You have successfully registered as a{" "}
        {role === "user" ? "User" : "Employee"}.
      </p>
      <button onClick={handleRedirect}>Go to Login</button>
    </div>
  );
};

export default RegistrationSuccess;
