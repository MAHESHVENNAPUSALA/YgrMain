import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';

// ── RICH ENTERPRISE CASE STUDY FALLBACK DATA ──
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Enterprise Healthcare Telehealth Platform',
    slug: 'telehealth-platform',
    category: 'Enterprise Software',
    industry: 'Healthcare',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80'
    ],
    shortDescription: 'HIPAA-compliant telemedicine portal connecting 50,000+ patients with specialist doctors via real-time video consults.',
    overview: 'GlobalCare Inc required a secure, high-availability telehealth portal to handle nationwide patient consultations, electronic health records (EHR), and prescription management.',
    challenge: 'High latency during peak consultation hours, strict HIPAA compliance requirements, and complex video streaming integration across low-bandwidth mobile devices.',
    solution: 'Engineered a WebRTC-based microservices platform backed by FastAPI and React, deploying dedicated WebRTC media servers on AWS with automated end-to-end encryption.',
    results: [
      { num: '35%', label: 'Improved Consultation Throughput' },
      { num: '60%', label: 'Reduced Patient Wait Times' },
      { num: '99.99%', label: 'HIPAA SLA Uptime' }
    ],
    technologyStack: ['React', 'Python', 'FastAPI', 'WebRTC', 'AWS', 'Docker', 'PostgreSQL'],
    status: 'Completed',
    duration: '6 Months',
    clientName: 'GlobalCare Inc',
    testimonial: 'YGR Global delivered our HIPAA-compliant portal ahead of schedule. Outstanding engineering execution and zero security vulnerabilities!',
    projectUrl: 'https://demo.ygrgobalitservices.com/',
    caseStudyUrl: '/contact',
    featured: true
  },
  {
    id: 2,
    title: 'Global Logistics & Fleet Management System',
    slug: 'fleet-management',
    category: 'Cloud Platform',
    industry: 'Logistics',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80'
    ],
    shortDescription: 'Real-time IoT telemetry system tracking 2,500+ commercial vehicles with automated route optimization.',
    overview: 'Apex Logistics needed real-time GPS tracking and automated fuel consumption analytics for their fleet operating across 12 countries.',
    challenge: 'Processing 10,000+ telemetry data packets per second without server latency, and generating instant dispatch routes.',
    solution: 'Built an event-driven Node.js microservices telemetry hub utilizing Redis caching and MongoDB geospatial queries deployed on Kubernetes.',
    results: [
      { num: '45%', label: 'Reduced Fuel & Idle Overhead' },
      { num: '50%', label: 'Faster Route Dispatching' },
      { num: '99.9%', label: 'Fleet Telemetry Availability' }
    ],
    technologyStack: ['Node.js', 'React', 'MongoDB', 'Docker', 'AWS', 'Redis', 'Kubernetes'],
    status: 'Completed',
    duration: '8 Months',
    clientName: 'Apex Logistics Ltd',
    testimonial: 'The real-time fleet engine developed by YGR Global has saved our operations team over $120k annually in fuel costs.',
    projectUrl: 'https://trip.ygrgobalitservices.com/',
    caseStudyUrl: '/contact',
    featured: true
  },
  {
    id: 3,
    title: 'AI-Powered FinTech Analytics Dashboard',
    slug: 'fintech-analytics',
    category: 'AI Solution',
    industry: 'Finance',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    ],
    shortDescription: 'Predictive financial modeling suite providing fraud detection algorithms and automated regulatory compliance reporting.',
    overview: 'Vanguard Capital required an intelligent analytics dashboard to process multi-market transaction streams and detect anomalies in real time.',
    challenge: 'Identifying fraudulent transaction patterns across millions of financial records with sub-100ms inference times.',
    solution: 'Deployed custom PyTorch deep learning models served via Python FastAPI microservices with interactive React dashboard visualizers.',
    results: [
      { num: '94%', label: 'Fraud Detection Accuracy' },
      { num: '50ms', label: 'Real-Time Transaction Audit Speed' },
      { num: '100%', label: 'Automated Regulatory Compliance' }
    ],
    technologyStack: ['Python', 'PyTorch', 'React', 'PostgreSQL', 'FastAPI', 'Redis'],
    status: 'Completed',
    duration: '1 Year',
    clientName: 'Vanguard Capital',
    testimonial: 'YGR Global’s AI dashboard transformed our compliance audits from days to milliseconds.',
    projectUrl: 'https://demo.ygrgobalitservices.com/',
    caseStudyUrl: '/contact',
    featured: true
  },
  {
    id: 4,
    title: 'Omnichannel Retail E-Commerce Portal',
    slug: 'retail-ecommerce',
    category: 'Web Applications',
    industry: 'Retail',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80'
    ],
    shortDescription: 'Scalable e-commerce store with multi-currency checkout, dynamic inventory sync, and loyalty program integration.',
    overview: 'Aura Fashion required a Next.js server-side rendered storefront capable of handling 100k+ monthly active shoppers with instant checkout.',
    challenge: 'High cart abandonment rate on mobile devices and inventory synchronization lag across physical retail stores.',
    solution: 'Engineered a headless Next.js e-commerce architecture connected to Stripe API and GraphQL inventory endpoints.',
    results: [
      { num: '2.8x', label: 'Increase in Mobile Conversions' },
      { num: '0.6s', label: 'Average Page Load Time' },
      { num: '100%', label: 'Real-Time Inventory Sync' }
    ],
    technologyStack: ['React', 'Next.js', 'Stripe API', 'GraphQL', 'Vercel', 'PostgreSQL'],
    status: 'Completed',
    duration: '4 Months',
    clientName: 'Aura Fashion',
    testimonial: 'Our online sales doubled within two months of launching the new YGR-built storefront.',
    projectUrl: 'https://demo.ygrgobalitservices.com/',
    caseStudyUrl: '/contact',
    featured: false
  },
  {
    id: 5,
    title: 'Cross-Platform Mobile Learning Application',
    slug: 'mobile-learning-app',
    category: 'Mobile Applications',
    industry: 'Education',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80'
    ],
    shortDescription: 'Interactive mobile learning app with offline video caching, gamified quizzes, and student progress tracking.',
    overview: 'EduPulse Global needed a cross-platform mobile app to deliver video courses and interactive assessments to 100,000+ students.',
    challenge: 'Supporting offline video playback in areas with weak mobile internet connectivity.',
    solution: 'Built a React Native mobile application with encrypted local SQLite video storage and Firebase push notifications.',
    results: [
      { num: '100k+', label: 'Active Student Downloads' },
      { num: '4.8★', label: 'App Store Rating' },
      { num: '70%', label: 'Higher Course Completion Rate' }
    ],
    technologyStack: ['React Native', 'Firebase', 'Redux', 'Node.js', 'SQLite'],
    status: 'Completed',
    duration: '5 Months',
    clientName: 'EduPulse Global',
    testimonial: 'The mobile app is flawless. Students love the offline video caching and smooth interface!',
    projectUrl: 'https://demo.ygrgobalitservices.com/',
    caseStudyUrl: '/contact',
    featured: false
  },
  {
    id: 6,
    title: 'Automated QA & Penetration Audit Suite',
    slug: 'qa-penetration-audit',
    category: 'QA & Testing',
    industry: 'Fintech',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'
    ],
    shortDescription: 'Comprehensive vulnerability audit and automated regression testing pipeline for core banking API endpoints.',
    overview: 'SecureBank requested automated QA regression testing and OWASP vulnerability penetration testing before their major cloud update.',
    challenge: 'Verifying 500+ microservice endpoints under simulated 50,000 concurrent user loads.',
    solution: 'Implemented Cypress & JMeter automated pipelines integrated into GitHub Actions with OWASP ZAP security scanners.',
    results: [
      { num: '0', label: 'Vulnerabilities in Production' },
      { num: '5x', label: 'Faster Regression Testing Cycles' },
      { num: '100%', label: 'Banking Security Compliance' }
    ],
    technologyStack: ['Cypress', 'JMeter', 'OWASP ZAP', 'Postman', 'GitHub Actions'],
    status: 'Completed',
    duration: '3 Months',
    clientName: 'SecureBank Corp',
    testimonial: 'YGR Global identified critical edge-case vulnerabilities that saved our launch.',
    projectUrl: 'https://demo.ygrgobalitservices.com/',
    caseStudyUrl: '/contact',
    featured: false
  }
];

const CATEGORIES = [
  'All',
  'Enterprise Software',
  'Web Applications',
  'Mobile Applications',
  'Cloud Platform',
  'AI Solution',
  'QA & Testing'
];

const Portfolio = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Fetch Dynamic Projects
  useEffect(() => {
    fetch('/api/public/projects/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((p) => {
            const title = p.title || p.name || 'Untitled Project';
            const category = p.category || 'Web Applications';
            const thumbnail = p.thumbnail || p.image1 || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';
            const gallery = (p.gallery && p.gallery.length > 0) ? p.gallery : [p.image1, p.image2, p.image3, p.image4].filter(Boolean);
            const shortDesc = p.shortDescription || p.case_study || 'Enterprise cloud solution built with modern technology.';

            let techList = p.technologyStack;
            if (!techList || !Array.isArray(techList) || techList.length === 0) {
              if (p.tech_stack && typeof p.tech_stack === 'string') {
                techList = p.tech_stack.split(',').map((s) => s.trim()).filter(Boolean);
              } else {
                techList = ['React', 'Python', 'AWS'];
              }
            }

            return {
              id: p.id,
              title,
              name: title,
              category,
              industry: p.industry || category,
              thumbnail,
              gallery: gallery.length > 0 ? gallery : [thumbnail],
              shortDescription: shortDesc,
              overview: p.overview || shortDesc,
              challenge: p.challenge || 'Scaling constraints and infrastructure requirements.',
              solution: p.solution || 'Cloud-native microservices architecture.',
              technologyStack: techList,
              duration: p.duration || p.time_taken || '3 Months',
              projectUrl: p.projectUrl || p.link || '#',
              status: 'Completed'
            };
          });
          setProjects(normalized);
        }
      })
      .catch(() => {});
  }, []);

  // Filtering & Search
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category === selectedCategory ||
      (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      (p.industry && p.industry.toLowerCase().includes(query)) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(query)) ||
      (p.technologyStack && p.technologyStack.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="portfolio-page-container">
      {/* ── 1. HERO SECTION ── */}
      <section className="portfolio-hero-section">
        <div className="portfolio-blueprint-grid"></div>

        <div className="portfolio-container-1320 text-center">
          <div className="portfolio-badge-pill">
            <span className="green-dot"></span>
            ENGINEERING CASE STUDIES
          </div>
          <h1 className="portfolio-page-title">
            Digital Products & <br />
            <span className="text-primary">Enterprise Case Studies</span>
          </h1>
          <p className="portfolio-page-subtitle">
            Explore how YGR Gobal IT Services builds mission-critical applications, cloud infrastructures, and AI solutions for industry leaders worldwide.
          </p>

          {/* Statistics Bar */}
          <div className="portfolio-stats-row">
            <div className="portfolio-stat-item"><i className="fas fa-check-circle"></i> 250+ Projects Delivered</div>
            <div className="portfolio-stat-item"><i className="fas fa-users"></i> 120+ Global Clients</div>
            <div className="portfolio-stat-item"><i className="fas fa-shield-alt"></i> 99.9% System Uptime</div>
            <div className="portfolio-stat-item"><i className="fas fa-globe"></i> 15+ Countries</div>
          </div>

          {/* Search Box */}
          <div className="portfolio-search-box">
            <i className="fas fa-search search-icon-inside"></i>
            <input
              type="text"
              className="portfolio-search-input"
              placeholder="Search by project name, technology, or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="portfolio-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. PROJECT CASE STUDY GRID ── */}
      <section className="portfolio-master-section">
        <div className="portfolio-container-1320">
          <div className="portfolio-grid-3col">
            <AnimatePresence>
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="case-study-card"
                >
                  <div className="case-thumb-wrapper">
                    <img src={p.thumbnail} alt={p.title} className="case-thumb-img" />
                    <span className="case-badge-overlay">{p.category}</span>
                    <span className="case-status-overlay">{p.status || 'Completed'}</span>
                  </div>

                  <div className="case-card-body">
                    <div>
                      <div className="case-meta-row">
                        <span><i className="fas fa-building me-1"></i>{p.industry}</span>
                        <span><i className="far fa-clock me-1"></i>{p.duration || '6 Months'}</span>
                      </div>
                      <h3 className="case-card-title">{p.title}</h3>
                      <p className="case-card-desc">{p.shortDescription}</p>

                      <div className="case-tech-chips">
                        {(p.technologyStack || ['React', 'Python', 'AWS']).map((tech) => (
                          <span key={tech} className="case-tech-pill">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className="case-card-actions">
                      <button
                        className="btn-view-case"
                        onClick={() => setActiveModalProject(p)}
                      >
                        View Case Study <i className="fas fa-arrow-right"></i>
                      </button>

                      {p.projectUrl && (
                        <a href={p.projectUrl} target="_blank" rel="noreferrer" className="btn-demo-link">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE CASE STUDY MODAL ── */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="modal-backdrop-custom" onClick={() => setActiveModalProject(null)}>
            <motion.div
              className="modal-case-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btn-close-modal" onClick={() => setActiveModalProject(null)}>
                <i className="fas fa-times"></i>
              </button>

              <div className="portfolio-badge-pill mb-2">
                <span className="green-dot"></span>
                {activeModalProject.category} • {activeModalProject.industry}
              </div>

              <h2 className="fw-bold fs-2 color-slate-900 mb-2">{activeModalProject.title}</h2>
              <p className="text-muted mb-4">{activeModalProject.shortDescription}</p>

              {/* Overview */}
              <div className="p-3 bg-light rounded-4 mb-4">
                <h5 className="fw-bold mb-2 text-dark">Project Overview</h5>
                <p className="small text-secondary mb-0">{activeModalProject.overview || activeModalProject.shortDescription}</p>
              </div>

              {/* Business Results Metrics */}
              <div className="modal-results-grid">
                {(activeModalProject.results || [
                  { num: '30%', label: 'Improved Productivity' },
                  { num: '50%', label: 'Reduced Manual Work' },
                  { num: '99.9%', label: 'System Availability' }
                ]).map((res, idx) => (
                  <div key={idx}>
                    <div className="results-num">{res.num}</div>
                    <div className="results-label">{res.label}</div>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="p-3 border rounded-4 bg-white h-100">
                    <h6 className="fw-bold text-danger mb-2"><i className="fas fa-exclamation-triangle me-1"></i> Business Challenge</h6>
                    <p className="small text-muted mb-0">{activeModalProject.challenge || 'Scaling constraints and system latency.'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 border rounded-4 bg-white h-100">
                    <h6 className="fw-bold text-success mb-2"><i className="fas fa-check-circle me-1"></i> YGR Solution</h6>
                    <p className="small text-muted mb-0">{activeModalProject.solution || 'Cloud-native microservices architecture with auto-scaling.'}</p>
                  </div>
                </div>
              </div>

              {/* Technology Used */}
              <div className="mb-4">
                <h6 className="fw-bold text-dark mb-2">Technologies Used</h6>
                <div className="d-flex flex-wrap gap-2">
                  {(activeModalProject.technologyStack || ['React', 'Spring Boot', 'AWS', 'Docker', 'MySQL']).map((tech) => (
                    <span key={tech} className="case-tech-pill px-3 py-1 fs-7">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Gallery Screenshots */}
              {activeModalProject.gallery && activeModalProject.gallery.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-2">Project Screenshots & Views</h6>
                  <div className="modal-gallery-row">
                    {activeModalProject.gallery.map((imgUrl, i) => (
                      <img key={i} src={imgUrl} alt={`Screenshot ${i + 1}`} className="modal-gallery-img" />
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial Quote */}
              {activeModalProject.testimonial && (
                <div className="p-4 bg-light rounded-4 border border-info mb-4 italic">
                  <i className="fas fa-quote-left text-primary me-2"></i>
                  <span className="small text-dark fw-semibold">"{activeModalProject.testimonial}"</span>
                  <div className="small text-muted mt-2 fw-bold">— {activeModalProject.clientName || 'Client Partner'}</div>
                </div>
              )}

              {/* Modal CTA */}
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 p-4 rounded-4" style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', color: '#FFF' }}>
                <div>
                  <h5 className="fw-bold mb-1">Need a Similar Business Solution?</h5>
                  <p className="small text-muted mb-0" style={{ color: '#94A3B8' }}>Let our engineering team build a custom enterprise platform for you.</p>
                </div>
                <Link to="/contact" className="btn-view-case" style={{ width: 'auto', padding: '10px 24px' }}>
                  Start Your Project <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 4. CALL TO ACTION SECTION ── */}
      <section className="portfolio-cta-section">
        <div className="portfolio-container-1320">
          <div className="portfolio-cta-card">
            <h2 className="fw-bold fs-2 text-white mb-2">Have a Similar Project?</h2>
            <h3 className="fw-bold fs-3 text-success mb-3">Let's Build It Together.</h3>
            <p className="mb-4 mx-auto" style={{ color: '#94A3B8', maxWidth: '600px' }}>
              Partner with YGR Global IT Services to build scalable software, cloud platforms, or AI applications.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/contact" className="btn-view-case" style={{ width: 'auto', padding: '14px 32px', fontSize: '0.95rem' }}>
                Start Your Project <i className="fas fa-paper-plane"></i>
              </Link>
              <a href="tel:+917794053340" className="btn-demo-link" style={{ background: 'transparent', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', padding: '14px 28px', fontSize: '0.95rem' }}>
                <i className="fas fa-phone-alt me-1"></i> Schedule Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
