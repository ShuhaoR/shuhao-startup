// src/components/HeroSection.js
import React from "react";
import "../styles/styles.css";

const HeroSection = () => {
  return (
    <header className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Shuhao Startup</h1>
          <p>Your one-stop solution for all your business needs.</p>
          <a href="/company-intro" className="btn btn-primary">
            Learn More
          </a>
          <a href="/register" className="btn btn-secondary">
            Register Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
