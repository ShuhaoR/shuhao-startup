import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/submitApplication.css";

const SubmitApplication = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://shuhao-startup.onrender.com/api/applications",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );
      alert("Application submitted successfully");
      navigate("/");
    } catch (error) {
      console.error(
        "Failed to submit application:",
        error.response ? error.response.data.error : error.message
      );
      alert(
        "Failed to submit application: " +
          (error.response ? error.response.data.error : error.message)
      );
    }
  };

  return (
    <div className="application-container">
      <h1>Submit Application</h1>
      <Formik
        initialValues={{ name: "", email: "", resume: "" }}
        onSubmit={handleSubmit}
      >
        <Form className="application-form">
          <Field name="name" placeholder="Name" className="form-field" />
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="form-field"
          />
          <Field
            name="resume"
            as="textarea"
            placeholder="Resume"
            className="form-field textarea-field"
          />
          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SubmitApplication;
