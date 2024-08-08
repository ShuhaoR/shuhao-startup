// src/components/Login.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://shuhao-startup.onrender.com/api/auth/login', values);
      localStorage.setItem('token', response.data.token);  // Store the token
      localStorage.setItem('isLoggedIn', true);
      navigate('/company-intro');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data.message : error.message);
      alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field name="email" type="email" placeholder="Email" />
        <Field name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default Login;

