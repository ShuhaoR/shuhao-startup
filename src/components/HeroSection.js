// src/components/HeroSection.js

import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/styles.css";

const HeroSection = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <header className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>{t("welcome_message")}</h1> {/* Translated Welcome message */}
          <p>{t("one_stop_solution")}</p>{" "}
          {/* Translated one-stop solution message */}
          <a href="/register-user" className="btn btn-primary">
            {t("register_now_as_user")} {/* Register Now as User */}
          </a>
          <a href="/register-employee" className="btn btn-secondary">
            {t("register_now_as_employee")} {/* Register Now as Employee */}
          </a>
          <a href="/login" className="btn btn-tertiary">
            {t("login")} {/* Translated Log In */}
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
