import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './PublicHeader.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about',
    children: [
      { label: 'Company Overview', to: '/about', desc: 'Our mission, vision & values' },
      { label: 'Meet the Team', to: '/team', desc: 'The leadership behind YGR' },
    ]
  },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  {
    label: 'Demo',
    to: '#',
    children: [
      { label: 'Customer Care Vizag', href: 'http://demo.ygrgobalitservices.com/', desc: 'CRM & Support Platform' },
      { label: 'Trip Management', href: 'http://trip.ygrgobalitservices.com/', desc: 'Logistics & Fleet Portal' },
      { label: 'CodeLabs Vizag', href: 'http://uiux.ygrgobalitservices.com/', desc: 'UI/UX Design Studio' },
    ]
  },
];

const PublicHeader = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path) && path !== '#';
  };

  const toggleMobileSubmenu = (label) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="ygr-header-wrapper">
      {/* ── 1. Slim Premium Announcement Top Bar ── */}
      <div className="ygr-announcement-bar">
        <div className="announcement-inner">
          <div className="announcement-item">
            <span className="announcement-badge">
              <span className="badge-dot"></span>
              ENTERPRISE IT
            </span>
          </div>

          <div className="announcement-divider"></div>

          <div className="announcement-item">
            <span className="announcement-text">Trusted by Businesses Across India</span>
          </div>

          <div className="announcement-divider"></div>

          <div className="announcement-item">
            <span className="announcement-pills-row">
              <span className="pill-tech">Web</span>
              <span className="bullet-dot">•</span>
              <span className="pill-tech">Mobile</span>
              <span className="bullet-dot">•</span>
              <span className="pill-tech">AI</span>
              <span className="bullet-dot">•</span>
              <span className="pill-tech">Cloud</span>
            </span>
          </div>

          <div className="announcement-divider"></div>

          <div className="announcement-item">
            <a href="tel:+917794053340" className="announcement-phone">
              <i className="fas fa-phone-alt phone-icon"></i>
              <span>+91 77940 53340</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Floating Glassmorphism Navbar (Refined 82px height, 92% width, 40px gap) ── */}
      <header className={`ygr-floating-navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand Logo (15-20% Larger) */}
          <Link to="/" className="brand-logo" aria-label="YGR Gobal IT Services Home">
            <div className="logo-img-wrapper">
              <img
                src="/images/logo1.jpeg"
                alt="YGR Gobal IT Services"
                onError={(e) => { e.target.src = '/images/logo.png'; }}
              />
            </div>
            <div className="brand-text">
              <span className="brand-name">YGR Gobal</span>
              <span className="brand-tag">IT SERVICES</span>
            </div>
          </Link>

          {/* Center Navigation Links (Luxurious 40px Spacing & Perfect Vertical Alignment) */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.to);
                const hasChildren = Boolean(link.children);
                const isOpen = activeDropdown === link.label;

                return (
                  <li
                    key={link.label}
                    className="nav-item"
                    onMouseEnter={() => hasChildren && setActiveDropdown(link.label)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    {hasChildren ? (
                      <button
                        className={`nav-link-btn ${isOpen ? 'open' : ''}`}
                        onClick={() => setActiveDropdown(isOpen ? null : link.label)}
                        aria-expanded={isOpen}
                      >
                        <span className="nav-label">{link.label}</span>
                        <i className={`fas fa-chevron-down dropdown-arrow ${isOpen ? 'rotate' : ''}`}></i>
                      </button>
                    ) : (
                      <Link to={link.to} className={`nav-link ${active ? 'active' : ''}`}>
                        <span className="nav-label">{link.label}</span>
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="active-pill-indicator"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="hover-underline"></span>
                      </Link>
                    )}

                    {/* Desktop Glass Dropdown */}
                    <AnimatePresence>
                      {hasChildren && isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="glass-dropdown"
                        >
                          <div className="dropdown-grid">
                            {link.children.map((child) => (
                              child.href ? (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="dropdown-item"
                                >
                                  <div className="dropdown-item-content">
                                    <span className="dropdown-item-title">
                                      {child.label}
                                      <i className="fas fa-arrow-up-right-from-square external-icon"></i>
                                    </span>
                                    <span className="dropdown-item-desc">{child.desc}</span>
                                  </div>
                                </a>
                              ) : (
                                <Link
                                  key={child.label}
                                  to={child.to}
                                  className="dropdown-item"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="dropdown-item-content">
                                    <span className="dropdown-item-title">{child.label}</span>
                                    <span className="dropdown-item-desc">{child.desc}</span>
                                  </div>
                                </Link>
                              )
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action CTA Button (Breathing room & 50px height) */}
          <div className="nav-actions">
            <Link to="/login" className="btn-portal-cta">
              <span className="cta-accent-dot"></span>
              <span>Portal Login</span>
              <i className="fas fa-arrow-right cta-arrow"></i>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`hamburger-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="ham-line top"></span>
              <span className="ham-line mid"></span>
              <span className="ham-line bot"></span>
            </button>
          </div>
        </div>
      </header>

      {/* ── 3. Redesigned Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="mobile-drawer-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close (X) Button in Top-Right Corner with 16px Padding */}
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* Logo Section & Subtle Divider */}
              <div className="mobile-drawer-header">
                <div className="mobile-brand-box">
                  <img
                    src="/images/logo1.jpeg"
                    alt="YGR Gobal IT Services"
                    className="mobile-brand-logo"
                    onError={(e) => { e.target.src = '/images/logo.png'; }}
                  />
                  <div className="mobile-brand-text">
                    <span className="mobile-brand-title">YGR GOBAL</span>
                    <span className="mobile-brand-subtitle">IT SERVICES</span>
                  </div>
                </div>
              </div>

              {/* Navigation List */}
              <div className="mobile-nav-list">
                {NAV_LINKS.map((link) => {
                  const hasChildren = Boolean(link.children);
                  const isExpanded = Boolean(mobileExpanded[link.label]);
                  const active = isActive(link.to);

                  return (
                    <div key={link.label} className="mobile-nav-item">
                      {hasChildren ? (
                        <>
                          <button
                            type="button"
                            className={`mobile-nav-link ${isExpanded ? 'is-open' : ''} ${active ? 'active' : ''}`}
                            onClick={() => toggleMobileSubmenu(link.label)}
                          >
                            <span className="mobile-link-label">{link.label}</span>
                            <i className={`fas fa-chevron-down mobile-caret ${isExpanded ? 'rotate' : ''}`}></i>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="mobile-submenu-accordion"
                              >
                                {link.children.map((child) => (
                                  child.href ? (
                                    <a
                                      key={child.label}
                                      href={child.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="mobile-sublink"
                                    >
                                      <span>{child.label}</span>
                                      <i className="fas fa-arrow-up-right-from-square sublink-external-icon"></i>
                                    </a>
                                  ) : (
                                    <Link
                                      key={child.label}
                                      to={child.to}
                                      className={`mobile-sublink ${isActive(child.to) ? 'active-sublink' : ''}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <span>{child.label}</span>
                                    </Link>
                                  )
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={link.to}
                          className={`mobile-nav-link ${active ? 'active' : ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="mobile-link-label">{link.label}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer CTA */}
              <div className="mobile-drawer-footer">
                <Link to="/login" className="mobile-portal-btn" onClick={() => setMobileMenuOpen(false)}>
                  <span className="portal-accent-dot"></span>
                  <span>Portal Login</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PublicHeader;
