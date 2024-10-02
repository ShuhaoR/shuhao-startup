import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import styles from "../styles/home.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import "../styles/navbar.css";
import "../styles/styles.css";
const Home = () => {
  const { t } = useTranslation(); // Hook to use translations

  useEffect(() => {
    document.body.classList.add(styles.homeBody);
    return () => {
      document.body.classList.remove(styles.homeBody);
    };
  }, []);

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <div className="additional-content">
        <h1>{t("welcome_message")}</h1> {/* Translated welcome message */}
      </div>
    </div>
  );
};
export default Home;