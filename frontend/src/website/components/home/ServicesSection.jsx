import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ServicesSection.css';

const SERVICES_BENTO = [
  {
    id: 'enterprise',
    size: 'hero-large', // 2 columns span on desktop
    title: 'Enterprise Software Development',
    desc: 'Scalable web platforms, microservices architecture, and enterprise core systems engineered for global performance.',
    icon: 'fa-layer-group',
    visualType: 'microservices',
    tag: 'Core Systems',
    accentColor: '#2D4A6D'
  },
  {
    id: 'cloud',
    size: 'medium',
    title: 'Cloud & DevOps Solutions',
    desc: 'Multi-cloud infrastructure, CI/CD pipeline automation, and Kubernetes cluster orchestration.',
    icon: 'fa-cloud-nodes',
    visualType: 'cloud-nodes',
    tag: 'Infrastructure',
    accentColor: '#5E9133'
  },
  {
    id: 'ai',
    size: 'medium',
    title: 'AI & Business Automation',
    desc: 'Machine learning models, intelligent workflow automation, and real-time predictive analytics.',
    icon: 'fa-brain',
    visualType: 'ai-neural',
    tag: 'Intelligence',
    accentColor: '#D36B1C'
  },
  {
    id: 'webapp',
    size: 'medium',
    title: 'Web Application Development',
    desc: 'High-performance React & Node.js web applications engineered for speed, conversion, and security.',
    icon: 'fa-code',
    visualType: 'code-snippet',
    tag: 'Modern Web',
    accentColor: '#2D4A6D'
  },
  {
    id: 'mobile',
    size: 'medium',
    title: 'Mobile Application Development',
    desc: 'Native iOS & Android mobile apps with fluid performance and intuitive user interfaces.',
    icon: 'fa-mobile-screen',
    visualType: 'mobile-mockup',
    tag: 'iOS & Android',
    accentColor: '#5E9133'
  },
  {
    id: 'uiux',
    size: 'standard',
    title: 'UI / UX Design',
    desc: 'Human-centered design systems, wireframes, and interactive product prototypes.',
    icon: 'fa-pen-ruler',
    visualType: 'wireframe',
    tag: 'Design System',
    accentColor: '#D36B1C'
  },
  {
    id: 'qa',
    size: 'standard',
    title: 'Quality Assurance & Testing',
    desc: 'Automated test suites, security penetration testing, and zero-defect product launches.',
    icon: 'fa-bug-slash',
    visualType: 'qa-test',
    tag: 'Quality Engineering',
    accentColor: '#2D4A6D'
  },
  {
    id: 'support',
    size: 'standard',
    title: 'Application Maintenance & Support',
    desc: '24/7 proactive monitoring, security updates, and dedicated SLA technical maintenance.',
    icon: 'fa-headset',
    visualType: 'sla-support',
    tag: '24/7 SLA Support',
    accentColor: '#5E9133'
  }
];

const RenderCardVisual = ({ visualType }) => {
  switch (visualType) {
    case 'microservices':
      return (
        <div className="preview-box microservices-preview">
          <div className="preview-top-bar">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <span className="preview-label">Core Architecture • Cluster Live</span>
          </div>
          <div className="nodes-flow">
            <div className="mini-node"><i className="fas fa-server"></i> Gateway</div>
            <div className="mini-line"><span className="pulse"></span></div>
            <div className="mini-node active-green"><i className="fas fa-microchip"></i> Microservices</div>
            <div className="mini-line"><span className="pulse delay"></span></div>
            <div className="mini-node"><i className="fas fa-database"></i> DB Mesh</div>
          </div>
        </div>
      );
    case 'cloud-nodes':
      return (
        <div className="preview-box cloud-preview">
          <div className="cloud-chip"><i className="fas fa-cloud"></i> AWS / Azure / GCP</div>
          <div className="cloud-status"><span className="live-dot"></span> Uptime 99.99%</div>
        </div>
      );
    case 'ai-neural':
      return (
        <div className="preview-box ai-preview">
          <div className="ai-chip"><i className="fas fa-brain"></i> Neural Pipeline Active</div>
          <div className="ai-wave">
            <span className="w-bar b1"></span><span className="w-bar b2"></span><span className="w-bar b3"></span>
          </div>
        </div>
      );
    case 'code-snippet':
      return (
        <div className="preview-box code-preview">
          <span className="code-line"><span className="c-blue">const</span> app = <span className="c-green">createApp</span>()</span>
          <span className="code-line"><span className="c-orange">await</span> app.<span className="c-blue">deploy</span>(&apos;production&apos;)</span>
        </div>
      );
    case 'mobile-mockup':
      return (
        <div className="preview-box mobile-preview">
          <div className="phone-frame">
            <span className="notch"></span>
            <div className="app-ui-item"></div>
            <div className="app-ui-item short"></div>
          </div>
        </div>
      );
    case 'wireframe':
      return (
        <div className="preview-box wireframe-preview">
          <div className="wf-grid">
            <span className="wf-box"></span>
            <span className="wf-box"></span>
            <span className="wf-box"></span>
          </div>
        </div>
      );
    case 'qa-test':
      return (
        <div className="preview-box qa-preview">
          <span className="qa-badge"><i className="fas fa-check-double"></i> 100% Passed</span>
        </div>
      );
    case 'sla-support':
      return (
        <div className="preview-box sla-preview">
          <span className="sla-badge"><i className="fas fa-shield-halved"></i> 24/7 SLA Active</span>
        </div>
      );
    default:
      return null;
  }
};

const ServicesSection = () => {
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
    <section className="expertise-bento-section" ref={sectionRef}>
      {/* Background Atmosphere: Subtle Blueprint Grid & Radial Glows */}
      <div className="expertise-bg-canvas">
        <div className="expertise-blueprint-grid"></div>
        <div className="expertise-radial-glow blue-glow"></div>
        <div className="expertise-radial-glow green-glow"></div>
      </div>

      <div className="expertise-container">
        {/* ── 1. Top Section Header (Concise 2-3 Lines Description) ── */}
        <motion.div
          className="expertise-header-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="expertise-eyebrow">
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-title">OUR EXPERTISE</span>
          </div>

          <h2 className="expertise-heading">
            Comprehensive Digital Solutions <br />
            Built to Scale Your Business
          </h2>

          <p className="expertise-description">
            From enterprise software and cloud platforms to AI-powered automation and mobile applications, we deliver end-to-end technology solutions that help businesses innovate, optimize operations, and achieve sustainable growth.
          </p>
        </motion.div>

        {/* ── 2. Asymmetrical Bento Grid (8 Services with Visual Previews) ── */}
        <motion.div
          className="expertise-bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {SERVICES_BENTO.map((service) => (
            <motion.div
              key={service.id}
              className={`bento-card card-${service.size}`}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Card Header Row */}
              <div className="card-top-bar">
                <div className="icon-badge" style={{ color: service.accentColor }}>
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <span className="category-tag">{service.tag}</span>
                <i className="fas fa-arrow-up-right card-arrow-icon"></i>
              </div>

              {/* Title & One-line Description */}
              <h3 className="bento-card-title">{service.title}</h3>
              <p className="bento-card-desc">{service.desc}</p>

              {/* Rich Visual Preview Diagram */}
              <RenderCardVisual visualType={service.visualType} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── 3. Bottom CTA Bar ── */}
        <motion.div
          className="expertise-bottom-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="cta-prompt-text">Need a Custom Technology Solution?</span>
          <Link to="/contact" className="btn-build-together">
            <span>Let&apos;s Build Together</span>
            <span className="cta-arrow-circle">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
