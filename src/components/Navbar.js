// src/components/Navbar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/styles.css";
import LanguageSwitcher from "./LanguageSwitcher"; // Ensure this import is correct

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { t } = useTranslation(); // Hook to use translations
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the JWT
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login after logging out
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">{t("home")}</Link> {/* Translated Home */}
        </li>
        <li>
          <Link to="/services">{t("services")}</Link>{" "}
          {/* Translated Services */}
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/register-user">{t("register_now")}</Link>{" "}
              {/* Register User */}
            </li>
            <li>
              <Link to="/register-employee">{t("register_as_employee")}</Link>{" "}
              {/* Register Employee */}
            </li>
            <li>
              <Link to="/login">{t("login")}</Link> {/* Translated Login */}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/post-request">{t("submit_request")}</Link>{" "}
              {/* Translated Post Request */}
            </li>
            <li>
              <Link to="/submit-application">{t("submit_application")}</Link>{" "}
              {/* Translated Submit Application */}
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                {t("logout")} {/* Translated Logout */}
              </button>
            </li>
          </>
        )}
        {/* Add the Language Switcher here */}
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
