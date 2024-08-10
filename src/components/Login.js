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

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/services");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(t("network_error")); // Use translated message
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
