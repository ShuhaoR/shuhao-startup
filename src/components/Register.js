// src/components/Register.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', values);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data.error : error.message);
      alert('Registration failed: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <Formik initialValues={{ username: '', email: '', password: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field name="username" placeholder="Username" />
        <Field name="email" type="email" placeholder="Email" />
        <Field name="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default Register;

