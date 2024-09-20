import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Register = ({ role }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError(t("all_fields_required"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("passwords_do_not_match"));
      return;
    }

    try {
      const response = await axios.post(
        `https://shuhao-sep.onrender.com/api/auth/register-${role}`,
        {
          username,
          email,
          password,
          confirmPassword,
        }
      );

      if (response.status === 201) {
        setSuccess(t("registration_success"));
        setTimeout(() => {
          navigate("/registration-success", { state: { role } });
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
      <h1>
        {t("register_now")} as {role === "user" ? "User" : "Employee"}
      </h1>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder={t("confirm_password")}
      />
      <button onClick={handleRegister}>{t("register_now")}</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Register;
