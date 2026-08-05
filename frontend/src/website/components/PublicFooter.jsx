import React from 'react';
import { Link } from 'react-router-dom';
import './PublicFooter.css';

const PublicFooter = () => {
  return (
    <>
      <footer className="footer-section">
        <div className="footer-inner">
          <div className="footer-top-grid">
            {/* Brand Col */}
            <div className="footer-brand-col">
              <Link to="/">
                <img className="footer-brand-logo" src="/images/logo1.jpeg" alt="YGR Global IT Services" />
              </Link>
              <p className="footer-brand-desc">
                YGR Gobal IT Services Pvt. Ltd. provides complete enterprise IT solutions 
                including software engineering, mobile app development, growth marketing, 
                and professional technology training.
              </p>
              <div className="footer-social-row">
                <a href="https://x.com/ygrgobalit2024" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-x-twitter"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61568888033386" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/ygrgobalitservices/" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@rrtalktrends" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="footer-links-col">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/global-internships">Global Internships</Link></li>
                <li><Link to="/client-registration">Client Registration</Link></li>
                <li><Link to="/login">Employee Portal</Link></li>
              </ul>
            </div>

            {/* Contact Col */}
            <div className="footer-contact-col">
              <h4>Head Office</h4>
              <div className="footer-contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>Manjeera Trinity Corporate, Next to Lulu Mall, Kukatpally Housing Board Colony, Hyderabad, Telangana 500072</p>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-phone-alt"></i>
                <p><a href="tel:+917794053340">+91 77940 53340</a></p>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-envelope"></i>
                <p><a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a></p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <p>&copy; {new Date().getFullYear()} <a href="https://ygrgobalitservices.com">YGR Global IT Services Pvt. Ltd.</a> All Rights Reserved.</p>
            <p>Architected for Enterprise Excellence</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Navigation Footer */}
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
