import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/styles.css";
import ecommerceIcon from "../assets/images/ecommerce.png"; // Replace with your actual file name
import artistIcon from "../assets/images/artist.png"; // Replace with your actual file name
import securityIcon from "../assets/images/security.png"; // Replace with your actual file name
import studentIcon from "../assets/images/student.png"; // Replace with your actual file name

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="icon">
              <img src={ecommerceIcon} alt="E-Commerce" />
            </div>
            <h3>E-Commerce</h3>
            <p>
              We provide top-notch e-commerce solutions to grow your business.
            </p>
            <button className="btn" onClick={() => navigate("/post-request")}>
              Post Request
            </button>
          </div>
          <div className="service-card">
            <div className="icon">
              <img src={artistIcon} alt="Artist" />
            </div>
            <h3>Artist</h3>
            <p>We provide portfolio website services for artists.</p>
            <button className="btn" onClick={() => navigate("/post-request")}>
              Post Request
            </button>
          </div>
          <div className="service-card">
            <div className="icon">
              <img src={securityIcon} alt="Web Security" />
            </div>
            <h3>Web Security</h3>
            <p>We ensure your site is safe and secure.</p>
          </div>
          <div className="service-card">
            <div className="icon">
              <img src={studentIcon} alt="Students" />
            </div>
            <h3>Students</h3>
            <p>We are taking student applications to work for us.</p>
            <button
              className="btn"
              onClick={() => navigate("/submit-application")}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
