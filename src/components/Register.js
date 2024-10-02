import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import "../styles/submitApplication.css";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError(t("all_fields_required"));
      return;
    }

    try {
      const response = await axios.post(
        "https://shuhao-startup.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        setSuccess(t("registration_success"));
        setTimeout(() => {
          navigate("/login"); // Redirect to the login page after 2 seconds
        }, 2000);
      } else {
        setError(response.data.message || t("registration_failed"));
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.error || t("registration_failed"));
    }
  };

  return (
    <div className="register-container">
      <h1>{t("register_now")}</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t("username")}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("email")}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("password")}
      />
      <button onClick={handleRegister}>{t("register_now")}</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Register;
