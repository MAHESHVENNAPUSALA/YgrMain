import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ScaleCTA.css';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Consultation',
    desc: 'Understand business goals, users, challenges, and project requirements.',
    icon: 'fa-magnifying-glass-chart'
  },
  {
    step: '02',
    title: 'Strategy & Planning',
    desc: 'Define architecture, technology stack, roadmap, and milestones.',
    icon: 'fa-diagram-project'
  },
  {
    step: '03',
    title: 'UI / UX Design',
    desc: 'Design intuitive, user-friendly interfaces and interactive prototypes.',
    icon: 'fa-pen-ruler'
  },
  {
    step: '04',
    title: 'Development',
    desc: 'Build secure, scalable, and high-performance applications.',
    icon: 'fa-code'
  },
  {
    step: '05',
    title: 'Testing & Quality Assurance',
    desc: 'Perform functional, performance, security, and usability testing.',
    icon: 'fa-vial-circle-check'
  },
  {
    step: '06',
    title: 'Deployment & Support',
    desc: 'Deploy, monitor, optimize, and provide continuous support.',
    icon: 'fa-rocket'
  }
];

const ScaleCTA = () => {
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
    <section className="our-process-section" ref={sectionRef}>
      {/* Background Atmosphere: Subtle Blueprint Grid & Radial Glows */}
      <div className="process-bg-canvas">
        <div className="process-blueprint-grid"></div>
        <div className="process-radial-glow blue-glow"></div>
        <div className="process-radial-glow green-glow"></div>
      </div>

      <div className="process-container">
        {/* ── 1. Header Stack ── */}
        <motion.div
          className="process-header-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="process-eyebrow">
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-title">OUR PROCESS</span>
          </div>

          <h2 className="process-heading">
            A Proven Process <br />
            For Building Digital Excellence
          </h2>

          <p className="process-description">
            Every successful digital product begins with a clear strategy. Our collaborative and agile development process ensures transparency, quality, faster delivery, and scalable outcomes from concept to deployment.
          </p>
        </motion.div>

        {/* ── 2. Premium Horizontal Timeline Track ── */}
        <div className="timeline-track-wrapper">
          <div className="timeline-connecting-line">
            <motion.div
              className="timeline-progress-fill"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>

          <div className="timeline-nodes-row">
            {PROCESS_STEPS.map((item, idx) => (
              <div key={item.step} className="timeline-node-item">
                <span className="node-circle">
                  <span className="inner-pulse-dot"></span>
                </span>
                <span className="node-step-tag">Step {item.step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. 6-Step Process Cards Grid (24px Gap, Glassmorphism, Hover Lift) ── */}
        <motion.div
          className="process-cards-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.step}
              className="process-step-card"
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-header-row">
                <span className="step-number-text">{step.step}</span>
                <div className="step-icon-box">
                  <i className={`fas ${step.icon}`}></i>
                </div>
              </div>

              <h3 className="step-card-title">{step.title}</h3>
              <p className="step-card-desc">{step.desc}</p>

              <div className="card-hover-border"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 4. Bottom Centered Statement & Primary CTA ── */}
        <motion.div
          className="process-bottom-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="bottom-statement-text">
            &ldquo;Your vision. Our process. One successful digital transformation.&rdquo;
          </p>

          <Link to="/contact" className="btn-start-project">
            <span>Start Your Project</span>
            <span className="cta-arrow-circle">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ScaleCTA;
