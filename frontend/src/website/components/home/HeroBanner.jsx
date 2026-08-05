import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const SERVICES_PILLS = [
  { id: '01', title: 'Web Development', icon: 'fa-globe' },
  { id: '02', title: 'Software Engineering', icon: 'fa-code' },
  { id: '03', title: 'Mobile Apps', icon: 'fa-mobile-screen' },
  { id: '04', title: 'UI/UX Design', icon: 'fa-pen-nib' }
];

const HeroBanner = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse Parallax Effect
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const springY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  return (
    <section ref={containerRef} className="premium-hero">
      
      {/* --- Ambient Background --- */}
      <div className="ph-background">
        <div className="ph-grid"></div>
        <motion.div 
          className="ph-glow-orb orb-primary"
          style={{ x: springX, y: springY }}
        />
        <motion.div 
          className="ph-glow-orb orb-accent"
          style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
        />
      </div>

      <motion.div 
        className="ph-content-wrapper"
        style={{ y, opacity }}
      >
        <div className="corp-container ph-container">
          
          <div className="ph-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="ph-eyebrow"
            >
              <span className="ph-badge">YGR GLOBAL IT SERVICES</span>
              <span className="ph-badge-text">Pioneering Digital Transformation</span>
            </motion.div>

            <motion.h1 
              className="ph-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Architecting <br />
              <span className="ph-title-gradient">Scalable Enterprise</span> <br />
              Software Solutions.
            </motion.h1>

            <motion.p 
              className="ph-desc"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Transforming complex business requirements into high-performance web, mobile, and cloud architectures. We engineer the technology that drives global business growth.
            </motion.p>

            <motion.div 
              className="ph-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services" className="ph-btn-primary">
                <span>Explore Solutions</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="ph-btn-secondary">
                <span>Schedule Consultation</span>
              </Link>
            </motion.div>

            {/* Floating Service Pills (Replacing Carousel) */}
            <motion.div 
              className="ph-services-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {SERVICES_PILLS.map((pill, i) => (
                <motion.div 
                  key={pill.id}
                  className="ph-service-pill"
                  whileHover={{ y: -5, scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                >
                  <i className={`fas ${pill.icon}`}></i>
                  <span>{pill.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interactive Abstract Visual */}
          <div className="ph-visual">
            <motion.div 
              className="ph-glass-panel panel-1"
              style={{ x: useTransform(springX, v => v * 1.5), y: useTransform(springY, v => v * 1.5) }}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pg-header">
                <div className="pg-dots"><span></span><span></span><span></span></div>
                <div className="pg-title">deployment_status.json</div>
              </div>
              <div className="pg-body code-block">
                <span className="c-blue">const</span> <span className="c-yellow">system</span> = {'{'} <br/>
                &nbsp;&nbsp;uptime: <span className="c-green">"99.99%"</span>,<br/>
                &nbsp;&nbsp;latency: <span className="c-green">"12ms"</span>,<br/>
                &nbsp;&nbsp;status: <span className="c-green">"Operational"</span><br/>
                {'}'};
              </div>
            </motion.div>

            <motion.div 
              className="ph-glass-panel panel-2"
              style={{ x: useTransform(springX, v => v * -1), y: useTransform(springY, v => v * -1.5) }}
              initial={{ opacity: 0, scale: 0.8, x: 50, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="pg-stat-flex">
                 <div className="pg-stat-icon"><i className="fas fa-shield-check"></i></div>
                 <div>
                   <div className="pg-stat-label">Security Protocol</div>
                   <div className="pg-stat-val">ISO 9001:2015</div>
                 </div>
               </div>
            </motion.div>
            
            <motion.div 
              className="ph-glass-panel panel-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="pg-stat-label">Global Scale</div>
               <div className="pg-progress-bar">
                 <motion.div 
                    className="pg-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                 />
               </div>
               <div className="pg-progress-text">Infrastructure Ready</div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
