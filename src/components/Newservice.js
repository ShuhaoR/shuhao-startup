import React from "react";
import "../styles/Newservice.css";
import { useNavigate } from "react-router-dom"; 
const Newservice = () => {
  const navigate = useNavigate();
  return (
    
    
    <section id="services" className="services-section">
      <div className="container">
             <div className="info-grid">
                <div className="personal-info">
                  <h3>bobby</h3>
                  <p><span className="info-description">Description:   </span></p>
                  <p>
                    <span className="info-phone">Phone: </span><br/>
                    <span className="info-email">Email:</span>
                  </p>
                  
                
                </div>
                <div className="company-info">
                  <h3>Name of Company</h3>
                  <p>
                    Description <br/>
                    
                  </p>
                </div>
              </div>


        
        <h2 className="section-title">bobby's thing</h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h3>Academic consulting </h3>
            <p>
             
            Description:


            </p>
            <button className="btn" onClick={() => navigate("/post-request")}>
                    {"post_request"} {/* Translated Post Request */}
                </button>
          </div>
          <div className="service-card">
            <div className="icon">
              <i className="fas fa-laptop"></i>
            </div>
            <h3>  College Reserch  </h3>
            <p>
            Description:
            </p>
            <button className="btn" onClick={() => navigate("/post-request")}>
                    {"post_request"} {/* Translated Post Request */}
                </button>
         
          </div>
          <div className="service-card">
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3> essay/resume series</h3>
            <p>
            Description:

            </p>

            <button className="btn" onClick={() => navigate("/post-request")}>
                    {"post_request"} {/* Translated Post Request */}
                </button>
          </div>
          <div className="service-card">
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3> personality Analysis</h3>

            <p>
              Description:
            </p>
            <button className="btn" onClick={() => navigate("/post-request")}>
                    {"post_request"} {/* Translated Post Request */}
                </button>
          
          
          </div>
        </div>
      </div>
    </section>
  );
  };
  
  export default Newservice;
