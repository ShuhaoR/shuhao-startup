// src/components/Home.js
import React from 'react';
import '../styles/main.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Shuhao Startup</h1>
      <p>Your one-stop solution for all your business needs.</p>
      <a href="/company-intro" className="button">Learn More</a>
    </div>
  );
};

export default Home;

