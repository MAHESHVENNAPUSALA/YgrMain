import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SERVICES_LINKS = [
  { label: 'Web Design',   type: 'web'     },
  { label: 'Web Apps',     type: 'webapp'  },
  { label: 'Mobile Apps',  type: 'mobile'  },
  { label: 'Marketing',    type: 'dm'      },
  { label: 'UI / UX',      type: 'uiux'   },
  { label: 'Testing',      type: 'testing' },
  { label: 'Support',      type: 'support' },
  { label: 'Internships',  type: 'intern'  },
];

const PublicNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const navRef = useRef(null);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
        setAboutOpen(false);
        setServicesOpen(false);
        setDemoOpen(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    setServicesOpen(false);
    setDemoOpen(false);
  }, [location.pathname]);

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      <style>{`
        /* ===== PUBLIC NAVBAR ===== */
        .pub-topbar {
          height: 45px; background: #0796fe;
          display: flex; align-items: center;
        }
        .pub-topbar .tb-left {
          display: flex; align-items: center;
          padding: 0 20px; gap: 0;
        }
        .pub-topbar .tb-text {
          display: flex; align-items: center;
          height: 45px; padding: 0 20px;
          border-right: 1px solid rgba(255,255,255,.2);
          color: #fff; font-size: 14px; font-weight: 500; gap: 8px;
        }
        .pub-topbar .tb-text:first-child { border-left: 1px solid rgba(255,255,255,.2); }
        .pub-topbar .tb-text i { font-size: 15px; }
        .pub-topbar .tb-text a { color: #fff; text-decoration: none; }
        .pub-topbar .tb-right {
          margin-left: auto; display: flex; height: 45px;
        }
        .pub-topbar .tb-social a {
          display: flex; align-items: center; justify-content: center;
          width: 45px; height: 45px; color: #fff; font-size: 16px;
          border-left: 1px solid rgba(255,255,255,.2);
          transition: background 0.2s;
        }
        .pub-topbar .tb-social a:hover { background: rgba(255,255,255,0.15); }

        .pub-header {
          background: #092a49; padding: 0 40px;
          display: flex; justify-content: space-between; align-items: center;
          height: 70px; position: sticky; top: 0; z-index: 1000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .pub-header .pub-logo img { height: 50px; width: auto; border-radius: 4px; }

        .pub-mobile-toggle {
          display: none; font-size: 26px; color: #fff; cursor: pointer;
          background: none; border: none;
        }

        .pub-nav {
          display: flex; gap: 28px; align-items: center;
        }
        .pub-nav > a {
          color: #fff !important; font-size: 15px; font-weight: 500;
          text-decoration: none; transition: color 0.2s;
        }
        .pub-nav > a:hover, .pub-nav > a.active { color: #fbcc27 !important; }

        /* Dropdown container */
        .pub-dd { position: relative; }
        .pub-dd-trigger {
          color: #fff; font-size: 15px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 4px;
          background: none; border: none; padding: 0; font-family: inherit;
          transition: color 0.2s;
        }
        .pub-dd-trigger:hover, .pub-dd-trigger.active { color: #fbcc27; }

        .pub-dd-menu {
          position: absolute; top: calc(100% + 14px); left: -20px;
          min-width: 200px; background: #092a49;
          border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          opacity: 0; visibility: hidden; transform: translateY(8px);
          transition: all 0.25s ease; z-index: 9999;
        }
        .pub-dd-menu.open {
          opacity: 1; visibility: visible; transform: translateY(0);
        }
        .pub-dd:hover .pub-dd-menu { opacity: 1; visibility: visible; transform: translateY(0); }

        .pub-dd-menu a {
          display: block; padding: 10px 20px;
          color: #fff; font-size: 14px; font-weight: 500;
          text-decoration: none; transition: color 0.2s;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pub-dd-menu a:last-child { border-bottom: none; }
        .pub-dd-menu a:hover { color: #fbcc27; background: rgba(255,255,255,0.05); }

        /* Employee Login */
        .pub-emp-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #fbcc27, #f39c12);
          color: #092a49 !important; font-size: 14px; font-weight: 700;
          padding: 8px 18px; border-radius: 50px; text-decoration: none;
          transition: all 0.3s; box-shadow: 0 4px 15px rgba(251,204,39,0.35);
          white-space: nowrap; text-transform: uppercase; letter-spacing: 0.5px;
          cursor: pointer; border: none; font-family: inherit;
        }
        .pub-emp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(251,204,39,0.5);
          color: #092a49 !important;
        }

        /* WhatsApp support btn */
        .pub-support-btn {
          position: fixed; bottom: 20px; right: 20px;
          width: 55px; height: 55px; background: #092a49; color: #fff;
          border-radius: 50%; font-size: 26px;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          z-index: 9999; transition: all 0.3s;
        }
        .pub-support-btn:hover { background: #0d2b7a; transform: translateY(-3px); color: #fff; }

        /* ===== MOBILE ===== */
        @media (max-width: 991px) {
          .pub-topbar { display: none !important; }
          .pub-header { padding: 15px 20px; height: auto; }
          .pub-header .pub-logo img { height: 40px; border-radius: 50%; }
          .pub-mobile-toggle { display: block; }

          .pub-nav {
            position: absolute; top: 100%; left: 0; width: 100%;
            background: #092a49; flex-direction: column;
            gap: 0; display: none; z-index: 999;
            max-height: 80vh; overflow-y: auto;
          }
          .pub-nav.open { display: flex; }
          .pub-nav > a { padding: 14px 20px; font-size: 16px; width: 100%; display: block; }

          .pub-dd { width: 100%; }
          .pub-dd-trigger { padding: 14px 20px; width: 100%; font-size: 16px; }
          .pub-dd-menu {
            position: static; transform: none !important;
            opacity: 1 !important; visibility: hidden;
            background: #0b355a; box-shadow: none; border-radius: 0;
            max-height: 0; overflow: hidden; transition: max-height 0.3s ease;
          }
          .pub-dd-menu.open {
            visibility: visible; max-height: 400px;
          }
          .pub-dd-menu a { padding: 12px 36px; }
          .pub-emp-btn { margin: 10px 20px; width: calc(100% - 40px); justify-content: center; padding: 12px 20px; font-size: 15px; border-radius: 8px; }
          .pub-support-btn { width: 48px; height: 48px; font-size: 22px; bottom: 90px; right: 15px; }
        }
      `}</style>

      {/* ===== TOP BAR ===== */}
      <div className="pub-topbar d-none d-md-block">
        <div className="container-fluid">
          <div className="row align-items-center" style={{ height: '45px' }}>
            <div className="col-md-8">
              <div className="tb-left">
                <div className="tb-text">
                  <i className="far fa-clock"></i>
                  <strong>9:30 AM 6:30 PM</strong>
                  <span>Mon - Fri</span>
                </div>
                <div className="tb-text">
                  <i className="fa fa-phone-alt"></i>
                  <a href="tel:+917794053340">+91 77940 53340</a>
                  <span>For Quotation</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="tb-social" style={{ display: 'flex', justifyContent: 'flex-end', height: '45px' }}>
                <a href="https://x.com/ygrgobalit2024" target="_blank" rel="noreferrer"><i className="fab fa-x-twitter"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61568888033386" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/ygrgobalitservices/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@rrtalktrends" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="pub-header" ref={navRef}>
        {/* Logo */}
        <div className="pub-logo">
          <a href="/" onClick={e => { e.preventDefault(); go('/'); }}>
            <img src="/static/images/logo1.jpeg" alt="YGR Global IT Services" onError={e => { e.target.style.display='none'; }} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="pub-mobile-toggle" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle navigation">
          <i className={`fas fa-${mobileOpen ? 'times' : 'bars'}`}></i>
        </button>

        {/* Nav */}
        <nav className={`pub-nav${mobileOpen ? ' open' : ''}`}>
          <a href="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''} onClick={e => { e.preventDefault(); go('/'); }}>Home</a>

          {/* About Us */}
          <div className="pub-dd">
            <button className={`pub-dd-trigger${aboutOpen ? ' active' : ''}`} onClick={() => { setAboutOpen(o => !o); setServicesOpen(false); setDemoOpen(false); }}>
              About Us <i className={`fas fa-chevron-${aboutOpen ? 'up' : 'down'}`} style={{ fontSize: '11px' }}></i>
            </button>
            <div className={`pub-dd-menu${aboutOpen ? ' open' : ''}`}>
              <a href="/about" onClick={e => { e.preventDefault(); go('/about'); }}>Company Overview</a>
              <a href="/team" onClick={e => { e.preventDefault(); go('/team'); }}>Meet the Team</a>
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="pub-dd">
            <button className={`pub-dd-trigger${isActive('/services') ? ' active' : ''}`} onClick={() => { setServicesOpen(o => !o); setAboutOpen(false); setDemoOpen(false); }}>
              Services <i className={`fas fa-chevron-${servicesOpen ? 'up' : 'down'}`} style={{ fontSize: '11px' }}></i>
            </button>
            <div className={`pub-dd-menu${servicesOpen ? ' open' : ''}`}>
              {SERVICES_LINKS.map(s => (
                <a key={s.type} href={`/services?type=${s.type}`} onClick={e => { e.preventDefault(); go(`/services?type=${s.type}`); setServicesOpen(false); }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <a href="/portfolio" className={isActive('/portfolio') ? 'active' : ''} onClick={e => { e.preventDefault(); go('/portfolio'); }}>Portfolio</a>
          <a href="/careers" className={isActive('/careers') ? 'active' : ''} onClick={e => { e.preventDefault(); go('/careers'); }}>Careers</a>
          <a href="/blog" className={isActive('/blog') ? 'active' : ''} onClick={e => { e.preventDefault(); go('/blog'); }}>Blog</a>
          <a href="/contact" className={isActive('/contact') ? 'active' : ''} onClick={e => { e.preventDefault(); go('/contact'); }}>Contact Us</a>

          {/* Demo For Client */}
          <div className="pub-dd">
            <button className={`pub-dd-trigger${demoOpen ? ' active' : ''}`} onClick={() => { setDemoOpen(o => !o); setAboutOpen(false); setServicesOpen(false); }}>
              Demo For Client <i className={`fas fa-chevron-${demoOpen ? 'up' : 'down'}`} style={{ fontSize: '11px' }}></i>
            </button>
            <div className={`pub-dd-menu${demoOpen ? ' open' : ''}`}>
              <a href="http://demo.ygrgobalitservices.com/" target="_blank" rel="noreferrer">Customer Care Vizag</a>
              <a href="http://trip.ygrgobalitservices.com/" target="_blank" rel="noreferrer">Trip</a>
              <a href="http://uiux.ygrgobalitservices.com/" target="_blank" rel="noreferrer">CodeLabs</a>
            </div>
          </div>

          {/* Employee Login */}
          <button className="pub-emp-btn" onClick={() => go('/login')}>
            <i className="fas fa-user-circle"></i> Employee Login
          </button>
        </nav>
      </header>

      {/* WhatsApp Support */}
      <a href="https://wa.me/917794053340" className="pub-support-btn" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <i className="bi bi-headset"></i>
      </a>
    </>
  );
};

export default PublicNavbar;
