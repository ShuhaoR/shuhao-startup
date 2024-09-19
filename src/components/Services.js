// src/components/Services.js
import React from "react";
//import "../styles/styles.css";

const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">          </h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h3>E-Commerce</h3>
            <p>
              We provide top-notch e-commerce solutions to grow your business.
            </p>
          </div>
          <div className="service-card">
            <div className="icon">
              <i className="fas fa-laptop"></i>
            </div>
            <h3>Responsive Design</h3>
            <p>Support user login, submit request, we will process it</p>
          </div>
          <div className="service-card">
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3>Welcome Talents!</h3>
            <p>
              Students can submit resume to apply for jobs and work for our
              company :)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
