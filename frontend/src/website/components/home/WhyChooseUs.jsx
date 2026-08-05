import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './WhyChooseUs.css';

const WHY_REASONS = [
  {
    id: 'security',
    title: 'Bank-Grade Cybersecurity & Compliance',
    desc: 'Multi-layered encryption protocols, zero-trust architecture, and strict ISO 9001 quality compliance.',
    icon: 'fa-shield-halved',
    isLarge: true,
    tag: 'Enterprise Standard'
  },
  {
    id: 'speed',
    title: 'Rapid Speed-to-Market',
    desc: 'Agile 2-week sprint cycles ensuring fast feature deployment.',
    icon: 'fa-bolt',
    tag: 'Agile Engine'
  },
  {
    id: 'uptime',
    title: '99.99% Cloud SLA Uptime',
    desc: 'High-availability infrastructure engineered for zero downtime.',
    icon: 'fa-server',
    tag: 'Cloud Reliability'
  },
  {
    id: 'team',
    title: 'Dedicated Senior Engineers',
    desc: 'Hand-picked developers, architects, and QA engineers working as an extension of your team.',
    icon: 'fa-user-gear',
    tag: 'Expert Talent'
  },
  {
    id: 'support',
    title: 'Borderless 24/7 Delivery',
    desc: 'Round-the-clock technical operations across USA, UK, Canada, and India timezones.',
    icon: 'fa-globe-americas',
    tag: 'Global Hubs'
  }
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="premium-why-section" ref={ref}>
      <div className="corp-container">
        
        {/* Section Header */}
        <motion.div 
          className="section-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow-badge">
            <i className="fas fa-award"></i>
            <span>Unmatched Excellence</span>
          </div>
          <h2 className="section-heading">
            Why Global Leaders <br/>
            <span className="text-gradient">Partner With YGR</span>
          </h2>
          <p className="section-subtext">
            We combine deep technical expertise, bulletproof security, and agile execution to deliver digital products that dominate markets.
          </p>
        </motion.div>

        {/* Minimalist Bento Grid Layout */}
        <div className="p-bento-grid">
          {WHY_REASONS.map((item, i) => (
            <motion.div
              key={item.id}
              className={`p-bento-card ${item.isLarge ? 'p-bento-large' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="p-bento-header">
                <div className="p-bento-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <span className="p-bento-tag">{item.tag}</span>
              </div>

              <h3 className="p-bento-title">{item.title}</h3>
              <p className="p-bento-desc">{item.desc}</p>
              
              {/* Subtle hover glow inside card */}
              <div className="p-bento-glow"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
