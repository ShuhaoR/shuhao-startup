import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../styles/styles.css";
import ecommerceIcon from "../assets/images/ecommerce.png"; // Replace with your actual file name
import artistIcon from "../assets/images/artist.png"; // Replace with your actual file name
import securityIcon from "../assets/images/security.png"; // Replace with your actual file name
import studentIcon from "../assets/images/student.png"; // Replace with your actual file name

const ServicesSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <section className="services">
      <div className="container">
        <h2>{t("our_services")}</h2> {/* Translated Our Services */}
        <div className="service-cards">
          <div className="service-card">
            <div className="icon">
              <img src={ecommerceIcon} alt={t("ecommerce")} />
            </div>
            <h3>{t("ecommerce")}</h3> {/* Translated E-Commerce */}
            <p>{t("ecommerce_description")}</p>{" "}
            {/* Translated E-Commerce Description */}
            <button className="btn" onClick={() => navigate("/post-request")}>
              {t("post_request")} {/* Translated Post Request */}
            </button>
          </div>
          <div className="service-card">
            <div className="icon">
              <img src={artistIcon} alt={t("artist")} />
            </div>
            <h3>{t("artist")}</h3> {/* Translated Artist */}
            <p>{t("artist_description")}</p>{" "}
            {/* Translated Artist Description */}
            <button className="btn" onClick={() => navigate("/post-request")}>
              {t("post_request")} {/* Translated Post Request */}
            </button>
          </div>
          <div className="service-card">
            <div className="icon">
              <img src={securityIcon} alt={t("web_security")} />
            </div>
            <h3>{t("web_security")}</h3> {/* Translated Web Security */}
            <p>{t("web_security_description")}</p>{" "}
            {/* Translated Web Security Description */}
          </div>
          <div className="service-card">
            <div className="icon">
              <img src={studentIcon} alt={t("students")} />
            </div>
            <h3>{t("students")}</h3> {/* Translated Students */}
            <p>{t("students_description")}</p>{" "}
            {/* Translated Students Description */}
            <button
              className="btn"
              onClick={() => navigate("/submit-application")}
            >
              {t("submit_application")} {/* Translated Submit Application */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
