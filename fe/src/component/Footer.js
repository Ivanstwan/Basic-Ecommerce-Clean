import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-text">
          <i className="far fa-copyright" /> 2021 Ivan Setiawan.
        </div>
        <div className="footer-icons">
          <i className="fab fa-linkedin footer-icon"></i>
          <i className="fas fa-arrow-up footer-icon"></i>
          <i className="fas fa-arrow-up footer-icon"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer;
