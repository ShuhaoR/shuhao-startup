// src/components/Home.js
import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection"; // Import the ServicesSection
import "../styles/styles.css";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
    </div>
  );
};

export default Home;
