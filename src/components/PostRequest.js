import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../styles/postRequest.css";

const PostRequest = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  const { t } = useTranslation(); // Initialize translation hook

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
      alert(t("request_success")); // Translated success message
      navigate("/");
    } catch (error) {
      console.error(
        "Failed to submit request:",
        error.response ? error.response.data.error : error.message
      );
      alert(
        t("request_failed") +
          (error.response ? error.response.data.error : error.message)
      ); // Translated failure message
    }
  };

  return (
    <div className="post-request-container">
      <h1>{t("submit_request")}</h1> {/* Translated Submit Request */}
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        onSubmit={handleSubmit}
      >
        <Form className="request-form">
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
            name="message"
            as="textarea"
            placeholder={t("message")} // Translated Message
            className="form-field textarea-field"
          />
          <button type="submit" className="submit-button">
            {t("submit_request")} {/* Translated Submit Button */}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PostRequest;
