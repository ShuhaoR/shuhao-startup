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
import UserDashboard from "./components/UserDashboard"; // Import UserDashboard
import EmployeeDashboard from "./components/EmployeeDashboard"; // Import EmployeeDashboard
import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard
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
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
