import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../styles/submitApplication.css";

const SubmitApplication = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  const { t } = useTranslation(); // Initialize translation hook

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
      alert(t("application_success")); // Translated success message
      navigate("/");
    } catch (error) {
      console.error(
        "Failed to submit application:",
        error.response ? error.response.data.error : error.message
      );
      alert(
        t("application_failed") +
          (error.response ? error.response.data.error : error.message)
      ); // Translated failure message
    }
  };

  return (
    <div className="application-container">
      <h1>{t("submit_application")}</h1> {/* Translated Submit Application */}
      <Formik
        initialValues={{ name: "", email: "", resume: "" }}
        onSubmit={handleSubmit}
      >
        <Form className="application-form">
          <Field
            name="name"
            placeholder={t("name")} // Translated Name
            className="form-field"
          />
          <Field
            name="email"
            type="email"
            placeholder={t("email")} // Translated Email
            className="form-field"
          />
          <Field
            name="resume"
            as="textarea"
            placeholder={t("resume")} // Translated Resume
            className="form-field textarea-field"
          />
          <button type="submit" className="submit-button">
            {t("submit_application")} {/* Translated Submit Button */}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SubmitApplication;
