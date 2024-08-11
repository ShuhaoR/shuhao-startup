import React, { useState } from "react";
import "../styles/register.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success message

  const { t } = useTranslation();

  const handleRegister = () => {
    // Clear previous errors
    setError("");
    setSuccess("");

    // Basic validation
    if (!username || !email || !password) {
      setError(t("all_fields_required")); // Translated error message
      return;
    }

    // Simulate registration process (replace with actual API call)
    console.log("User registered:", { username, email, password });
    setSuccess(t("registration_success")); // Show success message
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
      {error && <p className="error-message">{error}</p>} {/* Display error */}
      {success && <p className="success-message">{success}</p>}{" "}
      {/* Display success */}
    </div>
  );
};

export default Register;
