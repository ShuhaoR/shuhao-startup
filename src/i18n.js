import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en/translation.json";
import translationZH from "./locales/zh/translation.json"; // Assuming zh-tw was changed to zh
import translationJP from "./locales/ja/translation.json";

const resources = {
  en: { translation: translationEN },
  zh: { translation: translationZH },
  jp: { translation: translationJP },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "en", // Default to English if no language is set
    fallbackLng: "en", // Fallback to English
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
