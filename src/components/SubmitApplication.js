// src/components/SubmitApplication.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmitApplication = () => {
  const [formData, setFormData] = useState({ name: '', email: '', application: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/applications', formData);
      alert('Application submitted successfully');
    } catch (error) {
      alert('Failed to submit application');
    }
  };

  return (
    <div>
      <h2>Submit Your Application</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="application"
          placeholder="Your Application"
          value={formData.application}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitApplication;

