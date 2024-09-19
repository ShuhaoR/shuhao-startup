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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("resumeFile", values.resumeFile);
    formData.append("school", values.school);
    formData.append("major", values.major);
    formData.append("graduate", values.graduate);
    formData.append("skills", values.skills);
    formData.append("GPA", values.GPA);

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
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="application-container">
      <h1>{t("submit_application")}</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          resumeFile: null,
          school: "",
          major: "",
          experience: "",
          skills: "",
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
          if (!values.resumeFile) {
            errors.resumeFile = "Required";
          }
          return errors;
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="application-form">
            <label htmlFor="name" className="form-label">{t("name")} <span className="required">*</span></label>
            <Field
              name="name"
              className={`form-field ${touched.name && errors.name ? "error" : ""}`}
            />

            <label htmlFor="email" className="form-label">{t("email")} <span className="required">*</span></label>
            <Field
              name="email"
              type="email"
              className={`form-field ${touched.email && errors.email ? "error" : ""}`}
            />

            <label htmlFor="phone" className="form-label">{t("phone")}</label>
            <Field
              name="phone"
              type="phone"
              className={`form-field ${touched.email && errors.email ? "error" : ""}`}
            />

            
            <label htmlFor="resumeFile" className="form-label">{t("resume")}</label>
            <input
              id="resumeFile"
              name="resumeFile"
              type="file"
              onChange={(event) => {
                setFieldValue("resumeFile", event.currentTarget.files[0]);
              }}
              className="form-field"
            />

            <label htmlFor="linkedin" className="form-label">{t("LinkedIn_URL")}</label>
            <Field
              name="linkedin"
              type="url"
              className={`form-field ${touched.email && errors.email ? "error" : ""}`}
            />

            <label htmlFor="school" className="form-label">{t("school_graduated")}</label>
            <Field name="school" className="form-field" />

            <label htmlFor="major" className="form-label">{t("major")}</label>
            <Field name="major" className="form-field" />

            <label htmlFor="graduate" className="form-label">{t("when will you graduate")}</label>
            <Field name="graduate" as="select" className="form-field">
              <option value="">{t("<select>")}</option>
              <option value="December 2024">{t("December 2024")}</option>
              <option value="Spring 2025">{t("Spring 2025")}</option>
              <option value="December 2025">{t("December 2025")}</option>
            </Field>

            <label htmlFor="skills" className="form-label">{t("list_your_skills")}</label>
            <Field name="skills" as="textarea" className="form-field textarea-field" />

            <label htmlFor="reasons" className="form-label">{t("reasons")}</label>
            <Field name="reasons" as="textarea" className="form-field textarea-field" />

            <label htmlFor="GPA" className="form-label">{t("GPA")}</label>
            <Field
              name="GPA"
              type="number"
              className={`form-field ${touched.GPA && errors.GPA ? "error" : ""}`}
              min="0"
              max="4.0"
              step="0.1"
              validate={(value) => (value < 0 || value > 4.0 ? "GPA must be between 0 and 4.0" : undefined)}
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