import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-brand">
            <h2 className="footer-logo">🎬 MoviVibe</h2>
            <p className="footer-description">
              Discover and review the world of cinema. From timeless classics to new releases – your journey starts here.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/movies">Movies</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} MoviVibe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
