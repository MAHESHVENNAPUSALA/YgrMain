import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './GlobalPresence.css';

const LOCATIONS_DATA = [
  {
    id: 'usa',
    code: 'US',
    country: 'United States',
    city: 'Delaware Hub',
    desc: 'Strategic North American client engagement & cloud architecture center.',
    status: 'Online',
    flag: '🇺🇸'
  },
  {
    id: 'uk',
    code: 'GB',
    country: 'United Kingdom',
    city: 'London Operations',
    desc: 'European enterprise relations & financial software consulting.',
    status: 'Online',
    flag: '🇬🇧'
  },
  {
    id: 'ca',
    code: 'CA',
    country: 'Canada',
    city: 'Toronto Tech Center',
    desc: 'Cross-border SaaS engineering & AI product acceleration.',
    status: 'Online',
    flag: '🇨🇦'
  },
  {
    id: 'in',
    code: 'IN',
    country: 'India',
    city: 'Visakhapatnam R&D',
    desc: 'Primary 24/7 software development & quality assurance hub.',
    status: 'Active 24/7',
    flag: '🇮🇳'
  }
];

const GlobalPresence = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="premium-presence-section" ref={ref}>
      
      {/* Background visual map element */}
      <div className="pp-world-map-bg"></div>

      <div className="corp-container">
        
        {/* Section Header */}
        <motion.div 
          className="section-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow-badge">
            <i className="fas fa-globe"></i>
            <span>Global Delivery Network</span>
          </div>
          <h2 className="section-heading">
            Borderless Operations Across <br/>
            <span className="text-gradient">Key Timezones</span>
          </h2>
          <p className="section-subtext">
            Our strategic global hubs enable continuous 24/7 engineering sprint cycles and zero-delay client support.
          </p>
        </motion.div>

        {/* Hub Cards Grid */}
        <div className="pp-grid">
          {LOCATIONS_DATA.map((loc, idx) => (
            <motion.div 
              key={loc.id} 
              className="pp-hub-card glass-panel"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, borderColor: "rgba(37,99,235,0.2)" }}
            >
              <div className="pp-card-glow"></div>
              
              <div className="pp-hub-header">
                <span className="pp-hub-flag">{loc.flag}</span>
                <div className="pp-status-pill">
                  <span className="pp-status-dot"></span>
                  <span className="pp-status-txt">{loc.status}</span>
                </div>
              </div>

              <div className="pp-hub-body">
                <h3 className="pp-hub-country">{loc.country}</h3>
                <h4 className="pp-hub-city">{loc.city}</h4>
                <p className="pp-hub-desc">{loc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GlobalPresence;
