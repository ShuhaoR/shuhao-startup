// src/components/Home.js

import React from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import "../styles/styles.css";
import LanguageSwitcher from "./LanguageSwitcher";

const Home = () => {
  const { t } = useTranslation(); // Hook to use translations

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <div className="additional-content">
        <h2>{t("welcome_message")}</h2> {/* Translated welcome message */}
      </div>
    </div>
  );
};

export default Home;
