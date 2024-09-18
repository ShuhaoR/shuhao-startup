// src/App.js

import "./i18n"; // Add this to import i18n
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CompanyIntro from "./components/CompanyIntro";
import Register from "./components/Register";
import Login from "./components/Login";
import PostRequest from "./components/PostRequest";
import SubmitApplication from "./components/SubmitApplication";
import ServicesSection from "./components/ServicesSection"; // Import the ServicesSection
import RegistrationSuccess from "./components/RegistrationSuccess"; // Import the new RegistrationSuccess component
import "./styles/styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/company-intro" element={<CompanyIntro />} />
        {/* Add role props to Register route for user or employee registration */}
        <Route path="/register-user" element={<Register role="user" />} />
        <Route
          path="/register-employee"
          element={<Register role="employee" />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/post-request" element={<PostRequest />} />
        <Route path="/submit-application" element={<SubmitApplication />} />
        {/* Add the RegistrationSuccess route */}
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
