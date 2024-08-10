// src/components/ServicesSection.js
import React from "react";
import "../styles/styles.css";

const ServicesSection = () => {
  return (
    <section className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>E-Commerce</h3>
            <p>
              We provide top-notch e-commerce solutions to grow your business.
            </p>
          </div>
          <div className="service-card">
            <h3>Responsive Design</h3>
            <p>Our designs look great on all devices.</p>
          </div>
          <div className="service-card">
            <h3>Web Security</h3>
            <p>We ensure your site is safe and secure.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
