import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/postRequest.css";

const PostRequest = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://shuhao-startup.onrender.com/api/requests",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );
      alert("Request submitted successfully");
      navigate("/");
    } catch (error) {
      console.error(
        "Failed to submit request:",
        error.response ? error.response.data.error : error.message
      );
      alert(
        "Failed to submit request: " +
          (error.response ? error.response.data.error : error.message)
      );
    }
  };

  return (
    <div className="post-request-container">
      <h1>Submit Request</h1>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        onSubmit={handleSubmit}
      >
        <Form className="request-form">
          <Field name="name" placeholder="Name" className="form-field" />
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="form-field"
          />
          <Field
            name="message"
            as="textarea"
            placeholder="Message"
            className="form-field textarea-field"
          />
          <button type="submit" className="submit-button">
            Submit Request
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PostRequest;
