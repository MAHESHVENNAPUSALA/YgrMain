import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WhyChooseUs.css';

const FEATURED_PROJECTS = [
  {
    id: 'fintech-core',
    title: 'Global FinTech Transaction Engine',
    industry: 'FinTech & Banking',
    techBadges: ['React', 'Spring Boot', 'AWS', 'PostgreSQL'],
    challenge: 'Legacy transactional bottleneck restricting multi-region expansion and speed.',
    solution: 'Architected a high-throughput microservices backend with real-time settlement.',
    businessOutcome: '+340% Processing Speed',
    imageType: 'fintech',
    link: '/portfolio'
  },
  {
    id: 'health-ai',
    title: 'AI Diagnostic Healthcare Platform',
    industry: 'Healthcare & AI',
    techBadges: ['Node.js', 'Python', 'TensorFlow', 'Cloud'],
    challenge: 'Manual medical image diagnostic processing causing treatment turnaround delays.',
    solution: 'Built an AI diagnostic platform with automated anomaly detection algorithms.',
    businessOutcome: '-75% Turnaround Time',
    imageType: 'health',
    link: '/portfolio'
  },
  {
    id: 'logistics-iot',
    title: 'Enterprise Supply Chain & Tracking App',
    industry: 'Logistics & Supply Chain',
    techBadges: ['Flutter', 'Node.js', 'IoT', 'Kubernetes'],
    challenge: 'Lack of real-time shipment visibility across international transit hubs.',
    solution: 'Created a cross-platform mobile & IoT telemetry tracking platform.',
    businessOutcome: '99.9% Tracking Accuracy',
    imageType: 'logistics',
    link: '/portfolio'
  },
  {
    id: 'retail-hub',
    title: 'Omnichannel Retail Intelligence Platform',
    industry: 'E-Commerce & Retail',
    techBadges: ['React', 'GraphQL', 'Redis', 'AWS'],
    challenge: 'Peak traffic surge spikes causing checkout latency and cart drop-offs.',
    solution: 'Deployed serverless auto-scaling architecture with multi-region edge caching.',
    businessOutcome: '+180% Conversion Rate',
    imageType: 'retail',
    link: '/portfolio'
  }
];

const RenderMockupVisual = ({ type }) => {
  switch (type) {
    case 'fintech':
      return (
        <div className="mockup-frame fintech-mockup">
          <div className="mockup-header">
            <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
            <span className="mockup-url">https://fintech-core.ygrglobal.com</span>
          </div>
          <div className="mockup-content">
            <div className="mockup-stat-row">
              <span className="stat-card">Volume: $4.2B</span>
              <span className="stat-card green">Latency: 8ms</span>
            </div>
            <div className="chart-bars">
              <span className="bar b1"></span><span className="bar b2"></span><span className="bar b3"></span><span className="bar b4"></span>
            </div>
          </div>
        </div>
      );
    case 'health':
      return (
        <div className="mockup-frame health-mockup">
          <div className="mockup-header">
            <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
            <span className="mockup-url">https://ai-diagnostics.ygrhealth.com</span>
          </div>
          <div className="mockup-content">
            <div className="ai-scan-box">
              <span className="scan-line"></span>
              <i className="fas fa-brain scan-icon"></i>
            </div>
          </div>
        </div>
      );
    case 'logistics':
      return (
        <div className="mockup-frame logistics-mockup">
          <div className="mockup-header">
            <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
            <span className="mockup-url">https://fleet-iot.ygrlogistics.com</span>
          </div>
          <div className="mockup-content">
            <div className="gps-map-preview">
              <i className="fas fa-truck-fast map-pin"></i>
              <div className="radar-circle"></div>
            </div>
          </div>
        </div>
      );
    case 'retail':
      return (
        <div className="mockup-frame retail-mockup">
          <div className="mockup-header">
            <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
            <span className="mockup-url">https://retail-engine.ygrglobal.com</span>
          </div>
          <div className="mockup-content">
            <div className="retail-grid-preview">
              <span className="r-item"></span><span className="r-item"></span><span className="r-item"></span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % (FEATURED_PROJECTS.length - 2));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? FEATURED_PROJECTS.length - 3 : prev - 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="portfolio-showcase-section" ref={sectionRef}>
      {/* Background Atmosphere: Blueprint Grid & Radial Glows */}
      <div className="portfolio-bg-canvas">
        <div className="portfolio-blueprint-grid"></div>
        <div className="portfolio-radial-glow blue-glow"></div>
        <div className="portfolio-radial-glow green-glow"></div>
      </div>

      <div className="portfolio-container">
        {/* ── 1. Header Stack with Carousel Navigation Controls ── */}
        <div className="portfolio-header-row">
          <motion.div
            className="portfolio-header-left"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portfolio-eyebrow">
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-title">FEATURED PROJECTS</span>
            </div>

            <h2 className="portfolio-heading">
              Real Solutions. <br />
              <span className="text-gradient-highlight">Real Business Impact.</span>
            </h2>

            <p className="portfolio-description">
              Explore a selection of digital products and enterprise solutions we&apos;ve designed and developed for businesses across different industries.
            </p>
          </motion.div>

          {/* Carousel Prev/Next Buttons */}
          <motion.div
            className="carousel-controls-group"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <button className="carousel-btn prev-btn" onClick={handlePrev} aria-label="Previous Project">
              <i className="fas fa-arrow-left"></i>
            </button>
            <button className="carousel-btn next-btn" onClick={handleNext} aria-label="Next Project">
              <i className="fas fa-arrow-right"></i>
            </button>
          </motion.div>
        </div>

        {/* ── 2. Premium Horizontal Showcase Cards Track (3 Cards Visible on Desktop) ── */}
        <motion.div
          className="portfolio-cards-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {FEATURED_PROJECTS.slice(activeIndex, activeIndex + 3).map((project) => (
            <motion.div
              key={project.id}
              className="project-showcase-card"
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Large Rounded 32px Browser/Device Mockup Frame */}
              <div className="project-image-wrapper">
                <RenderMockupVisual type={project.imageType} />

                {/* Floating Technology Badges */}
                <div className="floating-tech-tags">
                  {project.techBadges.map((badge) => (
                    <span key={badge} className="tech-badge">{badge}</span>
                  ))}
                </div>
              </div>

              {/* Glass Information Panel */}
              <div className="project-glass-info-panel">
                <div className="project-meta-bar">
                  <span className="industry-pill">{project.industry}</span>
                  <span className="outcome-pill">{project.businessOutcome}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>

                <div className="challenge-solution-block">
                  <div className="info-row">
                    <span className="lbl-tag">Challenge:</span>
                    <span className="desc-text">{project.challenge}</span>
                  </div>
                  <div className="info-row">
                    <span className="lbl-tag green">Solution:</span>
                    <span className="desc-text">{project.solution}</span>
                  </div>
                </div>

                <Link to={project.link} className="btn-view-case-study">
                  <span>View Case Study</span>
                  <i className="fas fa-arrow-right case-arrow"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 3. Bottom CTA Section ── */}
        <motion.div
          className="portfolio-bottom-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="cta-prompt-text">Have an idea for your next project?</span>
          <Link to="/contact" className="btn-build-it-together">
            <span>Let&apos;s Build It Together</span>
            <span className="cta-arrow-circle">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
