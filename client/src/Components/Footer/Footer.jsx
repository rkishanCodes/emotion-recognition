import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FOLLOW</h3>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>CUSTOMERS</h3>
          <ul>
            <li>Contact Us</li>
            <li>Customer Service</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="footer-section">
          <h3>PUBLISHER</h3>
          <ul>
            <li>About Us</li>
            <li>Work With Us</li>
            <li>Manus</li>
            <li>Coworker</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>FOLLOW</h3>
          <ul>
            <li>Good Places</li>
            <li>Pathways</li>
            <li>Careers</li>
            <li>Wholesale</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Street2site | 2025. COPYRIGHT</p>
      </div>
    </footer>
  );
};

export default Footer;
