import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ServicesSection.css';

const SERVICES_DATA = [
  {
    id: 'web',
    category: 'dev',
    title: 'Website Architecture',
    desc: 'High-speed, SEO-optimized digital platforms designed for maximum conversion and brand authority.',
    icon: 'fa-globe',
    metaLabel: 'Delivery SLA',
    metaValue: '4 Weeks',
    link: '/services?type=web',
    tag: 'Web Tech'
  },
  {
    id: 'webapp',
    category: 'dev',
    title: 'Enterprise Web Apps',
    desc: 'Robust, scalable cloud applications built with React, Node.js, and high-security architecture.',
    icon: 'fa-layer-group',
    metaLabel: 'Delivery SLA',
    metaValue: '8 Weeks',
    link: '/services?type=webapp',
    tag: 'Cloud & SaaS'
  },
  {
    id: 'mobile',
    category: 'dev',
    title: 'Mobile Experiences',
    desc: 'Native-grade iOS and Android apps that blend fluid performance with intuitive user interactions.',
    icon: 'fa-mobile-screen-button',
    metaLabel: 'Delivery SLA',
    metaValue: '10 Weeks',
    link: '/services?type=mobile',
    tag: 'iOS & Android'
  },
  {
    id: 'dm',
    category: 'growth',
    title: 'Growth Marketing',
    desc: 'Data-driven SEO, PPC, and lead generation strategies focused on measurable business ROI.',
    icon: 'fa-chart-line',
    metaLabel: 'ROI Impact',
    metaValue: 'High Growth',
    link: '/services?type=dm',
    tag: 'Marketing'
  },
  {
    id: 'uiux',
    category: 'design',
    title: 'Experience Design',
    desc: 'Human-centric UI/UX research and prototyping that drives user engagement and long-term loyalty.',
    icon: 'fa-pen-ruler',
    metaLabel: 'Cycle Time',
    metaValue: '3 Weeks',
    link: '/services?type=uiux',
    tag: 'UI / UX'
  },
  {
    id: 'testing',
    category: 'dev',
    title: 'Quality Engineering',
    desc: 'Comprehensive manual and automated testing cycles ensuring zero-defect product launches.',
    icon: 'fa-bug-slash',
    metaLabel: 'QA Coverage',
    metaValue: '99.9%',
    link: '/services?type=testing',
    tag: 'Cyber QA'
  }
];

const CATEGORY_TABS = [
  { key: 'all', label: 'All Solutions' },
  { key: 'dev', label: 'Software Engineering' },
  { key: 'design', label: 'Creative Design' },
  { key: 'growth', label: 'Business Growth' }
];

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <section className="premium-services-section" ref={sectionRef}>
      <div className="corp-container">
        
        {/* Section Header */}
        <motion.div 
          className="section-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow-badge">
            <i className="fas fa-rocket"></i> 
            <span>Enterprise Capabilities</span>
          </div>
          <h2 className="section-heading">
            Empowering Your <br/>
            <span className="text-gradient">Digital Ecosystem</span>
          </h2>
          <p className="section-subtext">
            We deliver cutting-edge IT services tailored for growth, high security, 
            and unmatched user experiences on a global scale.
          </p>
        </motion.div>

        {/* Category Navigation Tabs */}
        <motion.div 
          className="ps-tabs-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.key}
              className={`ps-tab-btn ${activeCategory === tab.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.key)}
            >
              {activeCategory === tab.key && (
                <motion.div layoutId="activeTab" className="ps-tab-bg" />
              )}
              <span className="ps-tab-label">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Services Cards Grid */}
        <motion.div className="ps-services-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={service.link} className="ps-service-card">
                  <div className="ps-card-glow"></div>
                  <div className="ps-card-content">
                    <div className="ps-card-top">
                      <div className="ps-icon-wrapper">
                        <i className={`fas ${service.icon}`}></i>
                      </div>
                      <span className="ps-tag">{service.tag}</span>
                    </div>

                    <h3 className="ps-card-title">{service.title}</h3>
                    <p className="ps-card-desc">{service.desc}</p>

                    <div className="ps-card-footer">
                      <div className="ps-meta">
                        <span className="ps-meta-lbl">{service.metaLabel}:</span>
                        <span className="ps-meta-val">{service.metaValue}</span>
                      </div>
                      <div className="ps-card-arrow">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;
