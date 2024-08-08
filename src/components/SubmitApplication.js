// src/components/SubmitApplication.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmitApplication = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://shuhao-startup.onrender.com/api/applications', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Application submitted successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to submit application:', error.response ? error.response.data.error : error.message);
      alert('Failed to submit application: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <Formik initialValues={{ name: '', email: '', resume: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field name="name" placeholder="Name" />
        <Field name="email" type="email" placeholder="Email" />
        <Field name="resume" as="textarea" placeholder="Resume" />
        <button type="submit">Submit Application</button>
      </Form>
    </Formik>
  );
};

export default SubmitApplication;

