import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Luxury Hotel</h3>
            <p>Experience luxury and comfort at our premium hotel with stunning views and exceptional service.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@MehmanPalace.com</p>
            <p>Phone: +92 (555) 123-4567</p>
            <p>Address: 123 Luxury Lane, abc City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Mehman Palace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
