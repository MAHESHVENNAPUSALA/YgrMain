import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const TRUST_BADGES = [
  { value: '99.8%', label: 'Client Satisfaction', icon: 'fa-award' },
  { value: '8+ Yrs', label: 'Tech Excellence', icon: 'fa-shield-halved' },
  { value: '250+', label: 'Global Deployments', icon: 'fa-rocket' },
];

const SERVICE_PILLS = [
  { id: 'cloud', label: 'Cloud Architecture', icon: 'fa-cloud' },
  { id: 'ai', label: 'AI & Machine Learning', icon: 'fa-brain' },
  { id: 'web', label: 'Enterprise Web Apps', icon: 'fa-layer-group' },
  { id: 'mobile', label: 'iOS & Android Native', icon: 'fa-mobile-screen' },
];

const HeroBanner = () => {
  // Mouse Parallax Physics
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 26;
      const y = (clientY / window.innerHeight - 0.5) * 26;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mousePos.x, { stiffness: 45, damping: 25 });
  const springY = useSpring(mousePos.y, { stiffness: 45, damping: 25 });

  const card1X = useTransform(springX, (v) => v * 1.3);
  const card1Y = useTransform(springY, (v) => v * 1.3);
  const card2X = useTransform(springX, (v) => v * -1.1);
  const card2Y = useTransform(springY, (v) => v * -1.1);
  const card3X = useTransform(springX, (v) => v * 0.8);
  const card3Y = useTransform(springY, (v) => v * 0.8);

  return (
    <section className="editorial-hero">
      {/* ── Background: Subtle Blueprint Grid & Logo Color Mesh Blobs ── */}
      <div className="hero-bg-canvas">
        <div className="blueprint-grid"></div>
        <motion.div
          className="bg-blob blob-primary"
          style={{ x: springX, y: springY }}
        />
        <motion.div
          className="bg-blob blob-secondary"
          style={{ x: useTransform(springX, (v) => -v * 1.4), y: useTransform(springY, (v) => -v * 1.4) }}
        />
        <motion.div
          className="bg-blob blob-accent"
          style={{ x: useTransform(springX, (v) => v * 0.8), y: useTransform(springY, (v) => -v * 0.8) }}
        />
      </div>

      <div className="hero-container">
        {/* ── Left Column: 45% Content (Left-Aligned, Perfect Vertical Axis) ── */}
        <div className="hero-editorial-left">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hero-eyebrow"
          >
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-brand">YGR GLOBAL IT SERVICES</span>
            <span className="eyebrow-sep">•</span>
            <span className="eyebrow-text">Digital Transformation</span>
          </motion.div>

          {/* Headline (font-weight:900, line-height:0.9, letter-spacing:-3px, max-width:650px) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-headline"
          >
            TRANSFORMING <br />
            BUSINESSES <br />
            THROUGH <br />
            INTELLIGENT <br />
            DIGITAL <br />
            <span className="headline-highlight">INNOVATION</span>
          </motion.h1>

          {/* Description (max-width:520px, 28px margin-bottom) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-description"
          >
            We engineer high-performance web applications, cloud infrastructure, and AI-driven enterprise software that accelerate global growth for forward-thinking organizations.
          </motion.p>

          {/* CTA Buttons (56px height, 20px gap, rounded-full) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hero-cta-group"
          >
            <Link to="/services" className="hero-btn-primary">
              <span>Explore Solutions</span>
              <span className="btn-arrow-circle">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>

            <Link to="/contact" className="hero-btn-secondary">
              <span>Schedule Consultation</span>
              <i className="fas fa-calendar-check btn-sec-icon"></i>
            </Link>
          </motion.div>

          {/* Trust Metric Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="hero-trust-row"
          >
            {TRUST_BADGES.map((badge, idx) => (
              <div key={badge.label} className="trust-item">
                <div className="trust-icon-box">
                  <i className={`fas ${badge.icon}`}></i>
                </div>
                <div className="trust-info">
                  <span className="trust-num">{badge.value}</span>
                  <span className="trust-lbl">{badge.label}</span>
                </div>
                {idx < TRUST_BADGES.length - 1 && <div className="trust-divider"></div>}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column: 55% Illustration (Shifted Upward, 10% Larger) ── */}
        <div className="hero-visual-right">
          <div className="visual-canvas">
            {/* Ambient Graphic Halo */}
            <div className="graphic-halo"></div>

            {/* Central Microservices Glass Card */}
            <motion.div
              style={{ x: card1X, y: card1Y }}
              initial={{ opacity: 0, scale: 0.9, rotateX: 6, rotateY: -6 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-tech-card card-main-architecture"
            >
              <div className="card-top-bar">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="card-title-tag">Enterprise Core System • v4.8</span>
                <span className="status-pill-live">
                  <span className="live-dot"></span> Operational
                </span>
              </div>

              <div className="card-architecture-body">
                <div className="node-grid">
                  <div className="node-box node-cloud">
                    <i className="fas fa-cloud-arrow-up"></i>
                    <span>Cloud Native</span>
                  </div>
                  <div className="node-connector">
                    <div className="connector-line"></div>
                    <div className="pulse-signal"></div>
                  </div>
                  <div className="node-box node-ai">
                    <i className="fas fa-microchip"></i>
                    <span>AI Engine</span>
                  </div>
                  <div className="node-connector">
                    <div className="connector-line"></div>
                    <div className="pulse-signal delay"></div>
                  </div>
                  <div className="node-box node-app">
                    <i className="fas fa-server"></i>
                    <span>Enterprise Core</span>
                  </div>
                </div>

                <div className="arch-metrics-row">
                  <div className="metric-chip">
                    <span className="m-label">Uptime</span>
                    <span className="m-val val-green">99.99%</span>
                  </div>
                  <div className="metric-chip">
                    <span className="m-label">Latency</span>
                    <span className="m-val val-blue">&lt; 12ms</span>
                  </div>
                  <div className="metric-chip">
                    <span className="m-label">Security</span>
                    <span className="m-val val-orange">ISO 27001</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: AI Intelligence Widget */}
            <motion.div
              style={{ x: card2X, y: card2Y }}
              initial={{ opacity: 0, x: 30, y: -16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-tech-card card-ai-widget"
            >
              <div className="ai-widget-header">
                <div className="ai-icon-circle">
                  <i className="fas fa-wand-magic-sparkles"></i>
                </div>
                <div>
                  <div className="ai-widget-title">AI Automation Engine</div>
                  <div className="ai-widget-sub">Real-Time Data Pipeline</div>
                </div>
              </div>
              <div className="ai-waveform">
                <span className="wave-bar bar-1"></span>
                <span className="wave-bar bar-2"></span>
                <span className="wave-bar bar-3"></span>
                <span className="wave-bar bar-4"></span>
                <span className="wave-bar bar-5"></span>
              </div>
            </motion.div>

            {/* Floating Service Pills */}
            <motion.div
              style={{ x: card3X, y: card3Y }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="service-pills-float-wrapper"
            >
              {SERVICE_PILLS.map((pill) => (
                <div key={pill.id} className="floating-service-pill">
                  <i className={`fas ${pill.icon} pill-icon`}></i>
                  <span className="pill-text">{pill.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
