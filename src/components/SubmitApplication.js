import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("school", values.school);
      formData.append("major", values.major);
      formData.append("resume", values.resume);

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
          school: "",
          major: "",
          resume: null,
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = t("required");
          }
          if (!values.email) {
            errors.email = t("required");
          }
          if (!values.school) {
            errors.school = t("required");
          }
          if (!values.major) {
            errors.major = t("required");
          }
          if (!values.resume) {
            errors.resume = t("required");
          } else if (
            ![
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(values.resume.type)
          ) {
            errors.resume = t("invalid_file_type");
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
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />

            <Field
              name="email"
              type="email"
              placeholder={t("email")}
              className={`form-field ${
                touched.email && errors.email ? "error" : ""
              }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            <Field
              name="school"
              placeholder={t("school_graduated")}
              className={`form-field ${
                touched.school && errors.school ? "error" : ""
              }`}
            />
            <ErrorMessage
              name="school"
              component="div"
              className="error-message"
            />

            <Field
              name="major"
              placeholder={t("major")}
              className={`form-field ${
                touched.major && errors.major ? "error" : ""
              }`}
            />
            <ErrorMessage
              name="major"
              component="div"
              className="error-message"
            />

            <input
              name="resume"
              type="file"
              accept=".pdf,.docx"
              onChange={(event) =>
                setFieldValue("resume", event.currentTarget.files[0])
              }
              className={`form-field ${
                touched.resume && errors.resume ? "error" : ""
              }`}
            />
            <ErrorMessage
              name="resume"
              component="div"
              className="error-message"
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
