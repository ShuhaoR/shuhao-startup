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
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("resume", values.resume);
    formData.append("school", values.school);
    formData.append("major", values.major);

    try {
      const response = await axios.post(
        "https://shuhao-startup.onrender.com/api/applications",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
        initialValues={{
          name: "",
          email: "",
          resume: null,
          school: "",
          major: "",
        }}
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
          } else if (
            values.resume.type !== "application/pdf" &&
            values.resume.type !==
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
            values.resume.type !== "application/msword"
          ) {
            errors.resume = "Only .pdf or .docx files are accepted";
          }
          return errors;
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="application-form">
            <Field
              name="name"
              placeholder={t("name")}
              className={`form-field ${
                touched.name && errors.name ? "error" : ""
              }`}
            />
            {errors.name && touched.name && (
              <div className="error-message">{errors.name}</div>
            )}
            <Field
              name="email"
              type="email"
              placeholder={t("email")}
              className={`form-field ${
                touched.email && errors.email ? "error" : ""
              }`}
            />
            {errors.email && touched.email && (
              <div className="error-message">{errors.email}</div>
            )}
            <input
              id="resume"
              name="resume"
              type="file"
              className={`form-field ${
                touched.resume && errors.resume ? "error" : ""
              }`}
              onChange={(event) => {
                setFieldValue("resume", event.currentTarget.files[0]);
              }}
              accept=".pdf,.doc,.docx"
            />
            {errors.resume && touched.resume && (
              <div className="error-message">{errors.resume}</div>
            )}
            <Field
              name="school"
              placeholder={t("school_graduated")}
              className="form-field"
            />
            <Field
              name="major"
              placeholder={t("major")}
              className="form-field"
            />
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
