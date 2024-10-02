// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../styles/login.css";
import "../styles/submitApplication.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { t } = useTranslation(); // Initialize translation hook

  // src/components/Login.js

  const handleLogin = async () => {
    try {
      console.log("Sending login request:", { email, password });

      const response = await fetch(
        "https://shuhao-startup.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/services");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError(t("network_error"));
    }
  };

  return (
    <div className="login-container">
      <h1>{t("login")}</h1> {/* Translated Login */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("email")} // Translated Email
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("password")} // Translated Password
      />
      <button onClick={handleLogin}>{t("login")}</button>{" "}
      {/* Translated Login Button */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
