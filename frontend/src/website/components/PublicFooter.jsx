import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import './PublicFooter.css';

const PublicFooter = () => {
  return (
    <>
      <footer className="enterprise-footer-section">
        {/* Ambient Glow Elements */}
        <div className="footer-bg-canvas">
          <div className="footer-blueprint-grid"></div>
          <div className="footer-radial-glow blue-glow"></div>
          <div className="footer-radial-glow green-glow"></div>
        </div>

        <div className="footer-container">
          {/* ── MAIN FOOTER (4-COLUMN ENTERPRISE LAYOUT) ── */}
          <div className="footer-main-grid">
            {/* Column 1: Brand & Socials */}
            <div className="footer-col brand-col">
              <Link to="/" className="footer-logo-link">
                <img className="footer-brand-logo" src="/images/logo1.jpeg" alt="YGR Gobal IT Services" />
                <span className="footer-brand-name">YGR IT SERVICES</span>
              </Link>

              <p className="footer-brand-bio">
YGR Gobal IT Services Pvt. Ltd. provides complete IT solutions including software, web & mobile app development, digital marketing, professional IT training, internships, and full stack courses.              </p>

              {/* Social Icons */}
              <div className="footer-social-links">
                <a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61568888033386" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/ygrgobalitservices/" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/917794053340" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://www.youtube.com/@rrtalktrends" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-icon">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://x.com/ygrgobalit2024" target="_blank" rel="noreferrer" aria-label="Twitter X" className="social-icon">
                  <i className="fab fa-x-twitter"></i>
                </a>
              </div>
            </div>

            {/* Column 2: Company Navigation */}
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="footer-col">
              <h4 className="footer-col-title">Solutions</h4>
              <ul className="footer-nav-list">
                <li><Link to="/services">Enterprise Software</Link></li>
                <li><Link to="/services">Cloud & DevOps</Link></li>
                <li><Link to="/services">AI Automation</Link></li>
                <li><Link to="/services">Mobile Apps</Link></li>
                <li><Link to="/services">UI / UX Design</Link></li>
                <li><Link to="/services">QA & Testing</Link></li>
                <li><Link to="/services">Digital Marketing</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact & Location */}
            <div className="footer-col contact-col">
              <h4 className="footer-col-title">Contact</h4>
              
              <div className="contact-info-block">
                <div className="contact-item">
                  <i className="fas fa-location-dot contact-icon"></i>
                  <span>Hyderabad Office: Manjeera Trinity Corporate, Next to Lulu Mall, Kukatpally, Hyderabad 500072</span>
                </div>

                <div className="contact-item">
                  <i className="fas fa-phone contact-icon"></i>
                  <a href="tel:+917794053340">+91 77940 53340</a>
                </div>

                <div className="contact-item">
                  <i className="fas fa-envelope contact-icon"></i>
                  <a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a>
                </div>

                <div className="contact-item">
                  <i className="fas fa-clock contact-icon"></i>
                  <span>Mon - Fri: 9:30 AM - 6:30 PM IST</span>
                </div>

                <a
                  href="https://maps.google.com/?q=Manjeera+Trinity+Corporate+Hyderabad"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-google-maps"
                >
                  <i className="fas fa-map-location-dot"></i>
                  <span>View on Google Maps &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── PART 3: BOTTOM BAR ── */}
          <div className="footer-bottom-bar">
            <p className="copyright-text">
              &copy; 2023 YGR Gobal IT Services Pvt. Ltd. All Rights Reserved.
            </p>

            <div className="bottom-links-row">
              <Link to={ROUTES.PRIVACY || "/privacy"}>Privacy Policy</Link>
              <span className="dot-divider">•</span>
              <Link to={ROUTES.TERMS || "/terms"}>Terms of Service</Link>
              <span className="dot-divider">•</span>
              <Link to={ROUTES.COOKIES || "/cookies"}>Cookie Policy</Link>
            </div>

            <p className="credit-text">Designed by YGR Gobal IT Services</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <nav className="mobile-bottom-bar">
        <Link to="/" className="mobile-bar-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link to="/services" className="mobile-bar-item">
          <i className="fas fa-laptop-code"></i>
          <span>Services</span>
        </Link>
        <Link to="/careers" className="mobile-bar-item">
          <i className="fas fa-briefcase"></i>
          <span>Careers</span>
        </Link>
        <Link to="/contact" className="mobile-bar-item">
          <i className="fas fa-envelope"></i>
          <span>Contact</span>
        </Link>
      </nav>
    </>
  );
};

export default PublicFooter;
