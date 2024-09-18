// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../styles/login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { t } = useTranslation(); // Initialize translation hook

  const handleLogin = async () => {
    try {
      const url = email.includes("employee")
        ? "https://shuhao-sep.onrender.com/api/auth/login-employee"
        : "https://shuhao-sep.onrender.com/api/auth/login-user";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token); // Store token in localStorage
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
