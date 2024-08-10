import React, { useState } from "react";
import "../styles/register.css";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation(); // Initialize translation hook

  const handleRegister = () => {
    // Add your registration logic here
    console.log("User registered:", { username, email, password });
  };

  return (
    <div className="register-container">
      <h1>{t("register_now")}</h1> {/* Translated Register */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t("username")} // Translated Username
      />
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
      <button onClick={handleRegister}>{t("register_now")}</button>{" "}
      {/* Translated Register Button */}
    </div>
  );
};

export default Register;
