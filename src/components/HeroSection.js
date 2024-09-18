import React from "react";
import { useTranslation } from "react-i18next";
//import "../styles/styles.css";

const HeroSection = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <header className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>{t("welcome_message")}</h1> {/* Translated Welcome message */}
          <p>{t("one_stop_solution")}</p>{" "}
          {/* Translated one-stop solution message */}
          <a href="/register" className="btn btn-primary">
            {t("register_now")} {/* Translated Register Now */}
          </a>
          <a href="/login" className="btn btn-secondary">
            {t("login")} {/* Translated Log In */}
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
