import React, { useState } from "react";
import axios from "axios"; // Import axios to make HTTP requests
import "../styles/register.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success message

  const { t } = useTranslation();

  const handleRegister = async () => {
    // Clear previous errors
    setError("");
    setSuccess("");

    // Basic validation
    if (!username || !email || !password) {
      setError(t("all_fields_required")); // Translated error message
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post(
        "https://your-backend-url.com/api/register",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        // Assuming 201 is returned for successful registration
        setSuccess(t("registration_success")); // Show success message
      } else {
        setError(t("registration_failed")); // Handle failure
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(t("registration_failed")); // Show a generic error message
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
      {error && <p className="error-message">{error}</p>} {/* Display error */}
      {success && <p className="success-message">{success}</p>}{" "}
      {/* Display success */}
    </div>
  );
};

export default Register;
