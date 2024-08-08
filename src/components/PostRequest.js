// src/components/PostRequest.js
import React, { useState } from 'react';
import axios from 'axios';

const PostRequest = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/requests', formData);
      alert('Request submitted successfully');
    } catch (error) {
      alert('Failed to submit request');
    }
  };

  return (
    <div>
      <h2>Post a Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostRequest;

