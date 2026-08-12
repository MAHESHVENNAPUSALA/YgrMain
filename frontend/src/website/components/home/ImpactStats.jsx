import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ImpactStats.css';

const TESTIMONIALS_DATA = {
  left: [
    {
      id: 'david',
      name: 'David Miller',
      role: 'Chief Technology Officer',
      company: 'FinTech Dynamics',
      country: 'USA',
      rating: 5,
      quote: 'YGR Gobal delivered our core cloud payment engine 3 weeks ahead of schedule. Their zero-trust security architecture gave us complete peace of mind.',
      projectType: 'FinTech Architecture • AWS & Spring Boot'
    },
    {
      id: 'sarah',
      name: 'Sarah Jenkins',
      role: 'VP of Engineering',
      company: 'CloudScale Logistics',
      country: 'Canada',
      rating: 5,
      quote: 'The speed and execution quality of YGR senior engineers are outstanding. They scaled our mobile app to 1M+ active users with zero friction.',
      projectType: 'Mobile App Engineering • React Native'
    }
  ],
  centerFeatured: {
    id: 'vikram',
    name: 'Vikram Malhotra',
    role: 'Managing Director',
    company: 'Apex Health Systems',
    country: 'UK',
    rating: 5,
    quote: 'Working with YGR transformed our entire digital ecosystem. Their AI diagnostic platform and HIPAA-compliant patient portal delivered a 300% surge in user engagement and operational efficiency.',
    projectType: 'AI Diagnostic SaaS • Node.js & Python'
  },
  right: [
    {
      id: 'elena',
      name: 'Elena Rostova',
      role: 'Director of Innovation',
      company: 'OmniRetail Global',
      country: 'Germany',
      rating: 5,
      quote: 'Their omnichannel retail engine handled peak Cyber Monday traffic without a single millisecond of latency. Truly an exceptional engineering team!',
      projectType: 'E-Commerce Engine • React & Redis'
    },
    {
      id: 'marcus',
      name: 'Marcus Vance',
      role: 'Chief Information Officer',
      company: 'AeroLogistics Corp',
      country: 'Australia',
      rating: 5,
      quote: 'YGR\'s 24/7 technical support, transparent agile process, and high-performance engineers make them our most trusted technology partner.',
      projectType: '24/7 Cloud Operations • Kubernetes'
    }
  ]
};

const BOTTOM_TRUST_METRICS = [
  { label: '★ ★ ★ ★ ★ Overall Rating', icon: 'fa-star' },
  { label: '145+ Successful Projects', icon: 'fa-check-double' },
  { label: '99% Client Satisfaction', icon: 'fa-heart' },
  { label: 'Long-Term Partnerships', icon: 'fa-handshake' }
];

const RenderAvatarInitials = ({ name }) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'YG';
  return <div className="avatar-initials-box">{initials}</div>;
};

const ImpactStats = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="client-testimonials-section" ref={sectionRef}>
      {/* Background Atmosphere: Blueprint Grid & Soft Radial Glows */}
      <div className="testimonials-bg-canvas">
        <div className="testimonials-blueprint-grid"></div>
        <div className="testimonials-radial-glow blue-glow"></div>
        <div className="testimonials-radial-glow green-glow"></div>
      </div>

      <div className="testimonials-container">
        {/* ── 1. Header Stack ── */}
        <motion.div
          className="testimonials-header-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="testimonials-eyebrow">
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-title">CLIENT SUCCESS STORIES</span>
          </div>

          <h2 className="testimonials-heading">
            Trusted by Businesses, <br />
            <span className="text-gradient-highlight">Recognized for Results.</span>
          </h2>

          <p className="testimonials-description">
            Our greatest achievement is the long-term trust we&apos;ve built with our clients. Here&apos;s what they say about partnering with YGR Gobal IT Services.
          </p>
        </motion.div>

        {/* ── 2. Asymmetric Featured Testimonial Layout (Left 2, Center Featured, Right 2) ── */}
        <motion.div
          className="testimonials-showcase-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left Column: 2 Small Cards */}
          <div className="testimonial-side-column">
            {TESTIMONIALS_DATA.left.map((card) => (
              <motion.div
                key={card.id}
                className="testimonial-card small-card"
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25 }}
              >
                <div className="card-top-info">
                  <RenderAvatarInitials name={card.name} />
                  <div className="client-meta">
                    <span className="client-name">{card.name}</span>
                    <span className="client-role">{card.role} • {card.company} ({card.country})</span>
                  </div>
                </div>

                <div className="star-rating-row">
                  {[...Array(card.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star star-icon"></i>
                  ))}
                </div>

                <p className="quote-text">&ldquo;{card.quote}&rdquo;</p>
                <span className="tech-used-pill">{card.projectType}</span>
                <i className="fas fa-quote-right quote-watermark"></i>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Large Featured Card */}
          <div className="testimonial-center-column">
            <motion.div
              className="testimonial-card featured-large-card"
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="featured-badge-tag">FEATURED SUCCESS STORY</div>

              <div className="card-top-info">
                <RenderAvatarInitials name={TESTIMONIALS_DATA.centerFeatured.name} />
                <div className="client-meta">
                  <span className="client-name large">{TESTIMONIALS_DATA.centerFeatured.name}</span>
                  <span className="client-role large">
                    {TESTIMONIALS_DATA.centerFeatured.role} • {TESTIMONIALS_DATA.centerFeatured.company} ({TESTIMONIALS_DATA.centerFeatured.country})
                  </span>
                </div>
              </div>

              <div className="star-rating-row large">
                {[...Array(TESTIMONIALS_DATA.centerFeatured.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star star-icon"></i>
                ))}
              </div>

              <p className="quote-text large">&ldquo;{TESTIMONIALS_DATA.centerFeatured.quote}&rdquo;</p>
              <span className="tech-used-pill large">{TESTIMONIALS_DATA.centerFeatured.projectType}</span>
              <i className="fas fa-quote-right quote-watermark large"></i>
            </motion.div>
          </div>

          {/* Right Column: 2 Small Cards */}
          <div className="testimonial-side-column">
            {TESTIMONIALS_DATA.right.map((card) => (
              <motion.div
                key={card.id}
                className="testimonial-card small-card"
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25 }}
              >
                <div className="card-top-info">
                  <RenderAvatarInitials name={card.name} />
                  <div className="client-meta">
                    <span className="client-name">{card.name}</span>
                    <span className="client-role">{card.role} • {card.company} ({card.country})</span>
                  </div>
                </div>

                <div className="star-rating-row">
                  {[...Array(card.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star star-icon"></i>
                  ))}
                </div>

                <p className="quote-text">&ldquo;{card.quote}&rdquo;</p>
                <span className="tech-used-pill">{card.projectType}</span>
                <i className="fas fa-quote-right quote-watermark"></i>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 3. Bottom Trust Metrics Row & Primary CTA ── */}
        <motion.div
          className="testimonials-bottom-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="trust-metrics-bar">
            {BOTTOM_TRUST_METRICS.map((metric) => (
              <div key={metric.label} className="trust-metric-pill">
                <i className={`fas ${metric.icon} metric-icon`}></i>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <Link to="/contact" className="btn-become-success-story">
            <span>Become Our Next Success Story</span>
            <span className="cta-arrow-circle">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
