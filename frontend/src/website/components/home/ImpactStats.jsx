import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './ImpactStats.css';

const AnimCounter = ({ target, duration = 2000 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const inc = target / (duration / 16);
      const tick = () => {
        start += inc;
        if (start < target) {
          setVal(Math.ceil(start));
          requestAnimationFrame(tick);
        } else {
          setVal(target);
        }
      };
      tick();
    }
  }, [target, duration, isInView]);

  return <span ref={ref}>{val}</span>;
};

const STATS_ITEMS = [
  { id: '1', number: 100, suffix: 'K+', label: 'Lines of Code Shipped', icon: 'fa-code-branch' },
  { id: '2', number: 4, suffix: '', label: 'Global Operation Hubs', icon: 'fa-globe-americas' },
  { id: '3', number: 50, suffix: '+', label: 'Enterprise Clients', icon: 'fa-building' },
  { id: '4', number: 99, suffix: '.99%', label: 'Guaranteed SLA Uptime', icon: 'fa-server' }
];

const ImpactStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section className="premium-stats-section" ref={containerRef}>
      
      {/* Background Mesh */}
      <div className="ps-mesh-bg"></div>

      <div className="corp-container">
        
        {/* Section Header */}
        <motion.div 
          className="section-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow-badge">
            <i className="fas fa-chart-bar"></i>
            <span>Measured Performance</span>
          </div>
          <h2 className="section-heading text-white">
            Quantifiable Impact <br/>
            <span className="text-gradient">Delivered</span>
          </h2>
          <p className="section-subtext text-gray">
            Our numbers reflect our relentless commitment to speed, security, and global delivery standards.
          </p>
        </motion.div>

        {/* 4-Column Stats Ribbon */}
        <div className="ps-stats-grid">
          {STATS_ITEMS.map((item, idx) => (
            <motion.div 
              key={item.id} 
              className="ps-stat-card glass-dark"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)", borderColor: "rgba(37,99,235,0.3)" }}
            >
              <div className="ps-icon-wrapper">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 className="ps-stat-number">
                <AnimCounter target={item.number} />{item.suffix}
              </h3>
              <p className="ps-stat-label">{item.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactStats;
