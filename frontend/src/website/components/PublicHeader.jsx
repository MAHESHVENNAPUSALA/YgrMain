import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PublicHeader.css';

const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us', to: '#', children: [
      { label: 'Company Overview', to: '/about' },
      { label: 'Meet the Team', to: '/team' },
    ]
  },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  {
    label: 'Demo', to: '#', children: [
      { label: 'Customer Care Vizag', href: 'http://demo.ygrgobalitservices.com/' },
      { label: 'Trip', href: 'http://trip.ygrgobalitservices.com/' },
      { label: 'CodeLabs', href: 'http://uiux.ygrgobalitservices.com/' },
    ]
  },
];

const PublicHeader = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal — attach to every page change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    const attach = () =>
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale')
        .forEach(el => observer.observe(el));
    attach();
    const t = setTimeout(attach, 600);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [location.pathname]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  const isActive = (to) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <>
      {/* ── Top Bar (desktop only) ── */}
      <div className="ygr-topbar d-none d-lg-flex">
        <div className="topbar-inner">
          <div className="topbar-left">
            <div className="topbar-info">
              <i className="far fa-clock"></i>
              <span>Mon – Fri, 9:30 AM – 6:30 PM</span>
            </div>
            <div className="topbar-info">
              <i className="fa fa-phone-alt"></i>
              <a href="tel:+917794053340">+91 77940 53340</a>
            </div>
            <div className="topbar-info">
              <i className="fa fa-envelope"></i>
              <a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a>
            </div>
          </div>
          <div className="topbar-right">
            <a href="https://x.com/ygrgobalit2024" target="_blank" rel="noreferrer" className="topbar-social"><i className="fab fa-x-twitter"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61568888033386" target="_blank" rel="noreferrer" className="topbar-social"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/" target="_blank" rel="noreferrer" className="topbar-social"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/ygrgobalitservices/" target="_blank" rel="noreferrer" className="topbar-social"><i className="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/@rrtalktrends" target="_blank" rel="noreferrer" className="topbar-social"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header className={`ygr-header ${scrolled ? 'scrolled' : ''} ${!isHome ? 'solid' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src="/images/logo1.jpeg" alt="YGR Global IT Services" />
          </Link>

          {/* Desktop Nav */}
          <ul className="header-nav">
            {navLinks.map((link) => (
              <li key={link.label} className="nav-link-item">
                {link.children ? (
                  <>
                    <a href="#" onClick={e => e.preventDefault()}>
                      {link.label} <i className="fas fa-chevron-down"></i>
                    </a>
                    <div className="nav-dropdown">
                      {link.children.map(child => (
                        child.href
                          ? <a key={child.label} href={child.href} target="_blank" rel="noreferrer">{child.label}</a>
                          : <Link key={child.label} to={child.to}>{child.label}</Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={link.to} className={isActive(link.to) ? 'active' : ''}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Employee Login (desktop) */}
          <Link to="/login" className="nav-cta d-none d-lg-flex">
            <i className="fas fa-user-shield"></i> Employee Login
          </Link>

          {/* Mobile Toggle */}
          <button className="mobile-toggle-btn d-lg-none" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <nav className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
          <i className="fas fa-times"></i>
        </button>
        <ul className="drawer-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/team">Meet the Team</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <Link to="/login" className="drawer-cta">
          <i className="fas fa-user-shield"></i> Employee Login
        </Link>
      </nav>

      {/* ── WhatsApp Float ── */}
      <a href="https://wa.me/917794053340" className="wa-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
};

export default PublicHeader;
