import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CompanyIntro.css';

const TRUST_POINTS = [
  'Client-First Approach',
  'Agile Development Process',
  'Transparent Communication',
  'Enterprise Security Standards',
  'Dedicated Engineering Team',
  'Quality-Driven Delivery',
  'Long-Term Technical Support',
  'Future-Ready Technologies'
];

const TRUST_METRICS = [
  { value: 250, suffix: '+', label: 'Projects Delivered' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
  { value: 8, suffix: '+', label: 'Years Excellence' },
  { value: 24, suffix: '×7', label: 'Technical Support' },
  { value: 100, suffix: '%', label: 'Transparent Process' }
];

const FLOATING_TRUST_BADGES = [
  { label: 'ISO 27001 Quality', icon: 'fa-certificate', position: 'top-left' },
  { label: 'Enterprise Security', icon: 'fa-shield-halved', position: 'top-right' },
  { label: 'AI Anomaly Detection', icon: 'fa-brain', position: 'bottom-left' },
  { label: 'Multi-Region Cloud', icon: 'fa-cloud', position: 'bottom-right' }
];

// Count-up animated number component
const AnimatedNumber = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 16));

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="metric-num">
      {count}{suffix}
    </span>
  );
};

const CompanyIntro = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  // Mouse Parallax Physics for Left Dashboard
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mousePos.x, { stiffness: 45, damping: 25 });
  const springY = useSpring(mousePos.y, { stiffness: 45, damping: 25 });

  const card1X = useTransform(springX, (v) => v * 1.2);
  const card1Y = useTransform(springY, (v) => v * 1.2);
  const card2X = useTransform(springX, (v) => -v * 1.1);
  const card2Y = useTransform(springY, (v) => -v * 1.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="why-choose-ygr-section" ref={containerRef}>
      {/* Background Atmosphere: Subtle Blueprint Grid & Radial Glows */}
      <div className="why-bg-canvas">
        <div className="why-blueprint-grid"></div>
        <div className="why-radial-glow blue-glow"></div>
        <div className="why-radial-glow green-glow"></div>
      </div>

      <div className="why-container">
        <motion.div
          className="why-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ── Left Side: 15% Wider Dashboard Visual ── */}
          <motion.div className="why-left-visual" variants={fadeUpVariant}>
            <div className="visual-trust-canvas">
              {/* Soft Ambient Radial Halo */}
              <div className="graphic-halo"></div>

              {/* Enterprise Security Operations & Technology Command Panel (Rounded 32px) */}
              <motion.div
                className="command-center-panel"
                style={{ x: card1X, y: card1Y }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Top Control Bar */}
                <div className="command-header">
                  <div className="window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="command-tag">YGR Security Operations Center • Active</span>
                  <span className="status-live-pill">
                    <span className="live-dot"></span> 100% Protected
                  </span>
                </div>

                {/* Cyber Security Hub Banner */}
                <div className="command-security-banner">
                  <div className="shield-icon-box">
                    <i className="fas fa-shield-halved"></i>
                  </div>
                  <div className="security-banner-info">
                    <span className="banner-title">Zero Trust Security Architecture</span>
                    <span className="banner-subtitle">Continuous Threat Monitoring & Encryption</span>
                  </div>
                  <span className="threat-zero-badge">THREAT LEVEL: ZERO</span>
                </div>

                {/* Node Grid Flow */}
                <div className="command-nodes-row">
                  <div className="node-item">
                    <div className="node-icon icon-blue">
                      <i className="fas fa-cloud"></i>
                    </div>
                    <span>Cloud Mesh</span>
                  </div>

                  <div className="node-connector">
                    <div className="connector-line"></div>
                    <div className="pulse-signal"></div>
                  </div>

                  <div className="node-item">
                    <div className="node-icon icon-green">
                      <i className="fas fa-brain"></i>
                    </div>
                    <span>AI Sensor</span>
                  </div>

                  <div className="node-connector">
                    <div className="connector-line"></div>
                    <div className="pulse-signal delay"></div>
                  </div>

                  <div className="node-item">
                    <div className="node-icon icon-orange">
                      <i className="fas fa-lock"></i>
                    </div>
                    <span>Firewall</span>
                  </div>
                </div>

                {/* Live Telemetry & Traffic Chart */}
                <div className="command-traffic-row">
                  <div className="traffic-details">
                    <span className="traffic-lbl">Inspection Throughput</span>
                    <span className="traffic-val text-blue">120,000 req/sec • AES-256</span>
                  </div>
                  <div className="mini-bars">
                    <span className="m-bar bar-1"></span>
                    <span className="m-bar bar-2"></span>
                    <span className="m-bar bar-3"></span>
                    <span className="m-bar bar-4"></span>
                    <span className="m-bar bar-5"></span>
                  </div>
                </div>

                {/* Operational Metrics Stack */}
                <div className="command-metrics-grid">
                  <div className="metric-chip">
                    <span className="m-lbl">Security Standard</span>
                    <span className="m-val text-green">ISO 27001 Certified</span>
                  </div>
                  <div className="metric-chip">
                    <span className="m-lbl">Response Time</span>
                    <span className="m-val text-blue">&lt; 12ms SLA</span>
                  </div>
                  <div className="metric-chip">
                    <span className="m-lbl">System Reliability</span>
                    <span className="m-val text-orange">99.99% Uptime</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Glass Badges */}
              {FLOATING_TRUST_BADGES.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className={`floating-trust-badge badge-${badge.position}`}
                  style={{ x: card2X, y: card2Y }}
                  animate={{ y: [0, (i % 2 === 0 ? -6 : 6), 0] }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                >
                  <i className={`fas ${badge.icon} badge-icon`}></i>
                  <span className="badge-text">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Side: Headline (64px, Weight 900, Line-height 0.92, -2px Letter Spacing) ── */}
          <div className="why-right-content">
            {/* Section Eyebrow Name */}
            <motion.div className="why-eyebrow" variants={fadeUpVariant}>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-title">WHY CHOOSE YGR</span>
            </motion.div>

            {/* H1 Headline with Intentionally Typeset Manual Line Breaks & Highlight ONLY "Long-Term Digital Success" */}
            <motion.h2 className="why-heading" variants={fadeUpVariant}>
              Your Trusted <br />
              Technology Partner <br />
              For <span className="ygr-green-highlight">Long-Term Digital Success</span>
            </motion.h2>

            {/* Description Paragraphs */}
            <motion.div className="why-description-block" variants={fadeUpVariant}>
              <p>
                At YGR Global IT Services, we believe technology should create measurable business value.
              </p>
              <p>
                We focus on quality engineering, transparent collaboration, secure development practices, and long-term partnerships to help organizations innovate with confidence.
              </p>
            </motion.div>

            {/* 8 Trust Points Grid */}
            <motion.div className="why-trust-points-grid" variants={fadeUpVariant}>
              {TRUST_POINTS.map((point) => (
                <div key={point} className="trust-point-card">
                  <div className="point-check-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  <span className="point-text">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* 5 Trust Metrics Bar */}
            <motion.div className="why-trust-metrics-container" variants={fadeUpVariant}>
              <div className="metrics-row">
                {TRUST_METRICS.map((metric, idx) => (
                  <React.Fragment key={metric.label}>
                    <div className="trust-metric-item">
                      <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                      <span className="metric-desc">{metric.label}</span>
                    </div>
                    {idx < TRUST_METRICS.length - 1 && <div className="metric-vertical-divider"></div>}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Action CTA Button */}
            <motion.div className="why-cta-row" variants={fadeUpVariant}>
              <Link to="/contact" className="btn-why-choose-us">
                <span>Partner With YGR</span>
                <span className="cta-arrow-circle">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntro;
