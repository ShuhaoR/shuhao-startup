// src/components/PostRequest.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostRequest = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://shuhao-startup.onrender.com/api/requests', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Request submitted successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to submit request:', error.response ? error.response.data.error : error.message);
      alert('Failed to submit request: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <Formik initialValues={{ name: '', email: '', message: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field name="name" placeholder="Name" />
        <Field name="email" type="email" placeholder="Email" />
        <Field name="message" as="textarea" placeholder="Message" />
        <button type="submit">Submit Request</button>
      </Form>
    </Formik>
  );
};

export default PostRequest;

