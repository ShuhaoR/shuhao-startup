import React from "react";
import { useTranslation } from "react-i18next";


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select onChange={changeLanguage} className="language-switcher">
      <option value="en">語言:English</option>
      <option value="zh">中文</option>
      <option value="jp">日本語</option>
    </select>
  );
};

export default LanguageSwitcher;
