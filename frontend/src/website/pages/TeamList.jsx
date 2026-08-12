import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './TeamList.css';

const StatCounterNumber = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value, 10) || 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / Math.max(end, 1)), 16);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="team-stat-number">
      {count}{suffix}
    </span>
  );
};

const TeamList = () => {
  const [activeTeam, setActiveTeam] = useState('mgmt');
  const [teamMembers, setTeamMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch Swipe coordinates
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch Team & Events data from backend
  useEffect(() => {
    fetch('/api/public/team/')
      .then((r) => r.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error('Team API error:', err));

    fetch('/api/public/events/')
      .then((r) => r.json())
      .then((data) => {
        let loadedEvents = Array.isArray(data) ? data : [];
        if (loadedEvents.length === 0) {
          // Default fallbacks if backend returns empty
          loadedEvents = [
            { id: 'fallback-1', image: '/images/yg.jpeg', title: 'YGR Team Collaboration' },
            { id: 'fallback-2', image: '/images/rr.jpeg', title: 'Engineering Excellence' },
            { id: 'fallback-3', image: '/images/su.jpeg', title: 'Innovation Workshop' }
          ];
        }
        setEvents(loadedEvents);
      })
      .catch((err) => {
        console.error('Events API error:', err);
        setEvents([
          { id: 'fallback-1', image: '/images/yg.jpeg', title: 'YGR Team Collaboration' },
          { id: 'fallback-2', image: '/images/rr.jpeg', title: 'Engineering Excellence' },
          { id: 'fallback-3', image: '/images/su.jpeg', title: 'Innovation Workshop' }
        ]);
      });
  }, []);

  // Carousel Next / Prev Controls
  const handlePrev = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused || events.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, events.length]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [events.length]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Helper to determine relative position for carousel items (-1, 0, 1, etc.)
  const getSlidePosition = (index) => {
    if (events.length === 0) return 0;
    let diff = index - currentIndex;
    const half = Math.floor(events.length / 2);
    if (diff > half) diff -= events.length;
    if (diff < -half) diff += events.length;
    return diff;
  };

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-10%' });

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="corporate-team-page">
      {/* ── REDESIGNED TEAM HERO SECTION ── */}
      <section className="redesigned-team-hero" ref={heroRef}>
        {/* Background Atmosphere */}
        <div className="team-hero-bg-canvas">
          <div className="team-blueprint-grid"></div>
          <div className="team-radial-glow blue-glow"></div>
          <div className="team-radial-glow green-glow"></div>
        </div>

        <div className="team-hero-container">
          {/* Header Stack */}
          <motion.div
            className="team-hero-header-stack"
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
            variants={fadeUpVariant}
          >
            {/* Section Eyebrow Label */}
            <div className="team-eyebrow">
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-title">OUR TEAM</span>
            </div>

            {/* Main Heading */}
            <h1 className="team-hero-heading">
              The People Behind <br />
              <span className="ygr-green-highlight">Every Digital Success</span>
            </h1>

            {/* Description (2-3 lines max) */}
            <p className="team-hero-description">
              Behind every successful project is a passionate team of engineers, designers, developers, testers, and innovators working together to build secure, scalable, and future-ready digital solutions.
            </p>

            {/* Action Buttons */}
            <div className="team-hero-buttons">
              <a href="#executive-board" className="btn-team-primary">
                <span>Meet Our Experts</span>
                <span className="cta-arrow-circle">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </a>

              <a href="#executive-board" className="btn-team-secondary" onClick={() => setActiveTeam('team')}>
                <span>Join Our Team</span>
              </a>
            </div>
          </motion.div>

          {/* Large Premium Dynamic Carousel */}
          <motion.div
            className="team-carousel-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Glass Navigation Controls */}
            <button
              type="button"
              className="carousel-glass-btn prev-btn"
              onClick={handlePrev}
              aria-label="Previous Slide"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="carousel-3d-stage">
              {events.map((item, index) => {
                const pos = getSlidePosition(index);
                const isCenter = pos === 0;

                let translateX = pos * 460; // Parallax spacing
                let scale = isCenter ? 1.06 : 0.84;
                let opacity = isCenter ? 1 : Math.abs(pos) === 1 ? 0.65 : 0;
                let zIndex = 100 - Math.abs(pos);
                let blur = isCenter ? '0px' : '4px';

                return (
                  <div
                    key={item.id || index}
                    className={`carousel-slide-item ${isCenter ? 'center-active' : 'side-preview'}`}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                      filter: `blur(${blur})`
                    }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className="slide-image-card">
                      <img
                        src={item.image || '/images/placeholder.jpg'}
                        alt={item.title || 'YGR Gobal Team'}
                        loading="eager"
                      />
                      <div className="slide-glass-overlay">
                        {item.title && <span className="slide-title">{item.title}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="carousel-glass-btn next-btn"
              onClick={handleNext}
              aria-label="Next Slide"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Carousel Dot Indicators */}
            {events.length > 1 && (
              <div className="carousel-dots-row">
                {events.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Team Stats Cards (Below Carousel) */}
          <motion.div
            className="team-hero-stats-grid"
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
            variants={fadeUpVariant}
          >
            <div className="team-stat-card">
              <div className="stat-icon-box text-blue">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-value-group">
                <StatCounterNumber value={teamMembers.length ? teamMembers.length + 45 : 50} suffix="+" />
                <span className="stat-title-lbl">Dedicated Engineers</span>
              </div>
            </div>

            <div className="team-stat-card">
              <div className="stat-icon-box text-green">
                <i className="fas fa-layer-group"></i>
              </div>
              <div className="stat-value-group">
                <StatCounterNumber value="250" suffix="+" />
                <span className="stat-title-lbl">Successful Projects</span>
              </div>
            </div>

            <div className="team-stat-card">
              <div className="stat-icon-box text-orange">
                <i className="fas fa-award"></i>
              </div>
              <div className="stat-value-group">
                <StatCounterNumber value="8" suffix="+" />
                <span className="stat-title-lbl">Years of Excellence</span>
              </div>
            </div>

            <div className="team-stat-card">
              <div className="stat-icon-box text-blue">
                <i className="fas fa-smile"></i>
              </div>
              <div className="stat-value-group">
                <StatCounterNumber value="99" suffix="%" />
                <span className="stat-title-lbl">Client Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXISTING SECTIONS (Executive Board & Team Grids) ── */}

      {/* Chairman Section */}
      <section className="director-kinetic-sec reverse-layout reveal">
        <div className="kinetic-container">
          <div className="kinetic-content">
            <h1>Chairman</h1>
            <h2>Driving Excellence &amp; Growth</h2>
            <div className="executive-summary">
              <p>
                We provide professional IT services including Website Development, Web Applications, Mobile Applications, and Digital Marketing solutions. Our goal is to deliver quality services that help businesses grow and succeed in the digital world.
                <br /><br />
                We are committed to innovation, customer satisfaction, and building long-term relationships with our clients. Thank you for your trust and support.
              </p>
              <div className="signature-box">
                <div className="sig-line"></div>
                <div className="sig-name">Y.Varalakshmi</div>
              </div>
            </div>
          </div>

          <div className="kinetic-stack">
            <div className="outline-bg-text">OPERATIONS</div>
            <div className="stack-card card-main">
              <img src="/images/yg.jpeg" alt="Y.Vara Lakshmi" />
            </div>
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="director-kinetic-sec reveal">
        <div className="kinetic-container">
          <div className="kinetic-stack">
            <div className="outline-bg-text">LEADERSHIP</div>
            <div className="stack-card card-main">
              <img src="/images/rr.jpeg" alt="Y. Ravindra Reddy" />
            </div>
          </div>

          <div className="kinetic-content">
            <h4>Director's Message</h4>
            <h2>Architect of Innovation</h2>
            <div className="executive-summary">
              <p>
                We started our journey with a vision to empower individuals and businesses through technology, innovation, and quality services. With dedication, hard work, and continuous growth, we have built a platform that provides professional IT training and reliable technology solutions.
                <br /><br />
                Our commitment is to deliver excellence, create opportunities, and support our students and clients in achieving success. We thank everyone who has been part of our journey and trusted us throughout our growth. Together, let us build a smarter future with technology.
              </p>
              <div className="signature-box">
                <div className="sig-line"></div>
                <div className="sig-name">RavindraReddy Yanna</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Manager Section */}
      <section className="director-kinetic-sec reverse-layout reveal">
        <div className="kinetic-container">
          <div className="kinetic-content">
            <h4>General Manager Message</h4>
            <h2>Driving Operational Excellence</h2>
            <div className="executive-summary">
              <p>
                As the General Manager of our organization, I am proud to lead a dedicated team committed to excellence, innovation, and customer satisfaction. Our mission is to provide high-quality services while building strong relationships with our clients and community. We continuously strive to create new opportunities, maintain professional standards, and deliver the best possible experience to everyone associated with our company.
              </p>
              <div className="signature-box">
                <div className="sig-line"></div>
                <div className="sig-name">Y.Suneetha Reddy</div>
              </div>
            </div>
          </div>

          <div className="kinetic-stack">
            <div className="outline-bg-text">OPERATIONS</div>
            <div className="stack-card card-main">
              <img src="/images/su.jpeg" alt="Suneetha Reddy" />
            </div>
          </div>
        </div>
      </section>

      {/* Executive Board / Creative Core Toggle Nav */}
      <div id="executive-board" className="team-nav-outer">
        <div className="team-toggle">
          <button
            className={`toggle-btn ${activeTeam === 'mgmt' ? 'active' : ''}`}
            onClick={() => setActiveTeam('mgmt')}
          >
            Executive Board
          </button>
          <button
            className={`toggle-btn ${activeTeam === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTeam('team')}
          >
            Creative Core
          </button>
        </div>
      </div>

      {/* Team Grid */}
      <section id="team-grid" className="team-section">
        <div className={`team-grid ${activeTeam === 'mgmt' ? 'active' : ''}`} id="grid-mgmt">
          <div className="member-card">
            <div className="member-img-wrap">
              <img src="/images/yg.jpeg" alt="Y.Vara Lakshmi" />
            </div>
            <div className="member-info">
              <h3>Y.Vara Lakshmi</h3>
              <p>Chairman</p>
            </div>
          </div>

          <div className="member-card">
            <div className="member-img-wrap">
              <img src="/images/rr1.jpeg" alt="RavindraReddy Yanna" />
            </div>
            <div className="member-info">
              <h3>RavindraReddy Yanna</h3>
              <p>Director &amp; CEO</p>
            </div>
          </div>

          <div className="member-card">
            <div className="member-img-wrap">
              <img src="/images/su1.jpeg" alt="Suneetha Reddy" />
            </div>
            <div className="member-info">
              <h3>Suneetha Reddy</h3>
              <p>General Manager</p>
            </div>
          </div>
        </div>

        <div className={`team-grid ${activeTeam === 'team' ? 'active' : ''}`} id="grid-team">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div className="member-card" key={member.id}>
                <div className="member-img-wrap">
                  <img src={member.image || '/images/placeholder.jpg'} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1', padding: '50px' }}>
              <p style={{ color: 'var(--text-slate)', fontWeight: 600 }}>The creative ensemble is growing. Stay tuned.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeamList;
