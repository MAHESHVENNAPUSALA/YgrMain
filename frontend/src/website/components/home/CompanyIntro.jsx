import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CompanyIntro.css';

const CompanyIntro = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="luxury-intro-section" ref={containerRef}>
      <motion.div 
        className="luxury-intro-container corp-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="luxury-intro-grid">
          
          {/* Left Column: Media & Floating Elements */}
          <motion.div className="luxury-intro-media" variants={itemVariants}>
            <div className="li-image-wrapper">
              <img
                src="/images/ygr_company_artwork.png"
                alt="YGR Global IT Services"
                className="li-main-img"
                onError={(e) => { e.target.src = '/images/logo1.jpeg'; }}
              />
              <div className="li-image-overlay"></div>
            </div>

            {/* Floating Glass Cards */}
            <motion.div 
              className="li-floating-card top-right glass-panel"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="li-fc-icon"><i className="fas fa-certificate"></i></div>
              <div className="li-fc-text">
                <h5>ISO 9001:2015</h5>
                <p>Quality Standard</p>
              </div>
            </motion.div>

            <motion.div 
              className="li-floating-card bottom-left glass-panel"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="li-fc-icon text-accent"><i className="fas fa-shield-halved"></i></div>
              <div className="li-fc-text">
                <h5>Bank-Grade</h5>
                <p>Cybersecurity</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div className="luxury-intro-content" variants={itemVariants}>
            
            <motion.div className="eyebrow-badge" variants={itemVariants}>
              <i className="fas fa-bolt"></i>
              <span>YGR Excellence Hub</span>
            </motion.div>

            <motion.h2 className="section-heading" variants={itemVariants}>
              Transforming Complexity Into <br/>
              <span className="text-gradient">Elegant Digital Solutions</span>
            </motion.h2>

            <motion.p className="section-subtext" variants={itemVariants} style={{ marginBottom: '40px' }}>
              Since our inception, YGR Gobal IT Services has been pioneering the digital frontier.
              We don't just write code — we engineer scalable, secure, and hyper-efficient digital ecosystems
              that drive measurable Fortune-level growth for our partners.
            </motion.p>

            <motion.div className="li-capabilities" variants={itemVariants}>
              <div className="li-cap-item">
                <div className="li-cap-icon"><i className="fas fa-layer-group"></i></div>
                <div className="li-cap-info">
                  <h4>Agile Delivery Engine</h4>
                  <p>Rapid iterative sprints ensuring strict speed-to-market and seamless deployment.</p>
                </div>
              </div>

              <div className="li-cap-item">
                <div className="li-cap-icon li-icon-accent"><i className="fas fa-brain"></i></div>
                <div className="li-cap-info">
                  <h4>AI-Driven Architecture</h4>
                  <p>Future-proof infrastructure engineered to handle tomorrow's scale and data demands.</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="li-footer-row" variants={itemVariants}>
              <div className="li-metrics">
                <div className="li-metric">
                  <h3>10+</h3>
                  <p>Years Innovation</p>
                </div>
                <div className="li-metric">
                  <h3>99%</h3>
                  <p>Client Retention</p>
                </div>
              </div>

              <Link to="/about" className="btn-primary-glow">
                <span>Discover Our Legacy</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default CompanyIntro;
