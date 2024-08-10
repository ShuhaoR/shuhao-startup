import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/submitApplication.css";

const SubmitApplication = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://shuhao-startup.onrender.com/api/applications",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(t("application_success"));
      navigate("/");
    } catch (error) {
      console.error(
        "Failed to submit application:",
        error.response ? error.response.data.error : error.message
      );
      alert(
        t("application_failed") +
          (error.response ? error.response.data.error : error.message)
      );
    }
  };

  return (
    <div className="application-container">
      <h1>{t("submit_application")}</h1>
      <Formik
        initialValues={{ name: "", email: "", resume: "" }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.resume) {
            errors.resume = "Required";
          }
          return errors;
        }}
      >
        {({ errors, touched }) => (
          <Form className="application-form">
            <Field
              name="name"
              placeholder={t("name")}
              className={`form-field ${
                touched.name && errors.name ? "error" : ""
              }`}
            />
            <Field
              name="email"
              type="email"
              placeholder={t("email")}
              className={`form-field ${
                touched.email && errors.email ? "error" : ""
              }`}
            />
            <Field
              name="resume"
              as="textarea"
              placeholder={t("resume")}
              className={`form-field textarea-field ${
                touched.resume && errors.resume ? "error" : ""
              }`}
            />
            {errors.name && touched.name && (
              <div className="error-message">{errors.name}</div>
            )}
            {errors.email && touched.email && (
              <div className="error-message">{errors.email}</div>
            )}
            {errors.resume && touched.resume && (
              <div className="error-message">{errors.resume}</div>
            )}
            <button type="submit" className="submit-button">
              {t("submit_application")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubmitApplication;
