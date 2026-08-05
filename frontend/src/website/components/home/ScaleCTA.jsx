import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ScaleCTA.css';

const TIMELINE_STEPS = [
  { id: 1, title: "Discovery", desc: "We analyze your architecture and business goals.", icon: "fa-magnifying-glass" },
  { id: 2, title: "Blueprint", desc: "Our architects design a scalable, secure roadmap.", icon: "fa-compass-drafting" },
  { id: 3, title: "Execution", desc: "Agile sprints deliver rapid, high-quality results.", icon: "fa-rocket" }
];

const ScaleCTA = () => {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section className="premium-cta-section" ref={ctaRef}>
      <div className="corp-container">
        
        <motion.div 
          className="premium-cta-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Background Mesh */}
          <div className="pcta-mesh-bg">
            <motion.div className="pcta-orb pcta-orb-1" style={{ y: y1 }} />
            <motion.div className="pcta-orb pcta-orb-2" style={{ y: y2 }} />
            <div className="pcta-grid-overlay"></div>
          </div>

          <div className="pcta-content-grid">
            <div className="pcta-text-col">
              <motion.div 
                className="eyebrow-badge pcta-eyebrow"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <i className="fas fa-sparkles"></i>
                <span>Our Proven Process</span>
              </motion.div>

              <motion.h2 
                className="pcta-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Ready to Architect Your <br/>
                <span className="text-gradient">Digital Future?</span>
              </motion.h2>

              <motion.div 
                className="pcta-timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {TIMELINE_STEPS.map((step, index) => (
                  <div className="pcta-timeline-item" key={step.id}>
                    <div className="pcta-step-indicator">
                      <div className="pcta-step-icon"><i className={`fas ${step.icon}`}></i></div>
                      {index !== TIMELINE_STEPS.length - 1 && <div className="pcta-step-line"></div>}
                    </div>
                    <div className="pcta-step-content">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              className="pcta-action-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="pcta-action-card glass-dark">
                <h3 className="pcta-card-title">Free Architecture Review</h3>
                <p className="pcta-card-desc">Consult with our senior enterprise architects and receive a tailored scalability roadmap for your company.</p>
                <Link to="/contact" className="btn-primary-glow pcta-main-btn">
                  <span>Start Your Project</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
                <Link to="/services" className="btn-outline-light-glow pcta-sec-btn" style={{ color: '#fff' }}>
                  <span>Explore Services</span>
                </Link>
              </div>
            </motion.div>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
};

export default ScaleCTA;
