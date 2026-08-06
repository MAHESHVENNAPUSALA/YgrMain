import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';

// ── DEFAULT DYNAMIC SERVICES WITH DETAILED SOLUTION MAPPINGS ──
const DEFAULT_SERVICES = [
  {
    id: 1,
    name: 'Enterprise Web Applications',
    slug: 'webapp',
    icon: 'fa-layer-group',
    shortDescription: 'Scalable multi-tenant SaaS, cloud platforms, and microservices.',
    overview: 'We build high-concurrency, cloud-native web applications that streamline business operations, automate workflows, and support seamless multi-region expansion.',
    challenges: [
      'Monolithic legacy codebases causing slow deployment cycles',
      'Scalability bottlenecks during peak traffic volume',
      'Complex multi-tenant data isolation and security requirements'
    ],
    solution: [
      'Decoupled microservices architecture with containerization',
      'Auto-scaling serverless and Kubernetes cloud deployments',
      'Enterprise-grade OAuth 2.0 / JWT role-based security'
    ],
    benefits: [
      '300% Improvement in System Concurrency',
      '99.99% Guaranteed SLA Uptime',
      '50% Reduction in Cloud Infrastructure Overhead'
    ],
    deliverables: ['Full Source Code & IP Ownership', 'REST / GraphQL API Specs', 'CI/CD Automated Deployment', '24/7 SLA Support'],
    techStack: ['Python', 'Django', 'React.js', 'PostgreSQL', 'Docker', 'AWS'],
    industries: ['Fintech', 'Healthcare', 'E-Commerce', 'Logistics'],
    projects: [
      { id: 101, title: 'Multi-Tenant SaaS HR Portal', industry: 'Enterprise', tech: ['React', 'Django', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
      { id: 102, title: 'Global Supply Chain Engine', industry: 'Logistics', tech: ['Node.js', 'MongoDB', 'AWS'], image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80' },
      { id: 103, title: 'Fintech Payment Gateway', industry: 'Finance', tech: ['Python', 'FastAPI', 'Redis'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' }
    ]
  },
  {
    id: 2,
    name: 'Web Design & Architecture',
    slug: 'web',
    icon: 'fa-globe',
    shortDescription: 'Conversion-optimized, responsive websites & design systems.',
    overview: 'Crafting modern, lightning-fast digital brand platforms engineered for maximum engagement, accessibility compliance, and high search visibility.',
    challenges: [
      'Outdated UI design hurting brand credibility and conversions',
      'Slow mobile load speeds causing high bounce rates',
      'Lack of content management flexibility for marketing teams'
    ],
    solution: [
      'Pixel-perfect responsive design systems with micro-animations',
      'Server-side rendering (SSR) for instant sub-second page loads',
      'Custom headless CMS integration for effortless updates'
    ],
    benefits: [
      '2.5x Increase in Conversion Rate',
      'Sub-Second Mobile Load Times (95+ Lighthouse Score)',
      'Enhanced Brand Perception & UX Accessibility'
    ],
    deliverables: ['Custom UI Design System', 'Headless CMS Integration', 'SEO & Analytics Setup', 'Cross-Browser QA Report'],
    techStack: ['React', 'Next.js', 'TypeScript', 'Bootstrap 5', 'Vercel'],
    industries: ['Corporate', 'Real Estate', 'Education', 'Retail'],
    projects: [
      { id: 201, title: 'Corporate Real Estate Portal', industry: 'Real Estate', tech: ['Next.js', 'React', 'Tailwind'], image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
      { id: 202, title: 'Aura Fashion E-Commerce', industry: 'Retail', tech: ['React', 'GraphQL', 'Stripe'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
      { id: 203, title: 'Global Tech Advisory Site', industry: 'Consulting', tech: ['React', 'Bootstrap', 'Vite'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80' }
    ]
  },
  {
    id: 3,
    name: 'Mobile Application Dev',
    slug: 'mobile',
    icon: 'fa-mobile-screen-button',
    shortDescription: 'Native iOS & Android mobile applications built with Flutter & React Native.',
    overview: 'Engineering native and cross-platform mobile applications that deliver smooth 60fps performance, offline capabilities, and intuitive user experiences.',
    challenges: [
      'High cost of maintaining separate iOS and Android codebases',
      'Poor offline app responsiveness in low-connectivity environments',
      'Complex push notification and payment gateway integrations'
    ],
    solution: [
      'Single codebase cross-platform engineering with Flutter / React Native',
      'Local SQLite & Realm database sync for offline functionality',
      'Native biometric authentication & automated Play/App Store publishing'
    ],
    benefits: [
      '40% Savings in Cross-Platform Development Cost',
      'Seamless 60fps Native Animations',
      '4.8+ Star User Satisfaction Rating'
    ],
    deliverables: ['iOS & Android App Bundles', 'Store Submission Documentation', 'Push Notification Engine', 'Analytics Setup'],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    industries: ['Healthcare', 'EdTech', 'On-Demand Services', 'Finance'],
    projects: [
      { id: 301, title: 'Telehealth Patient Mobile App', industry: 'Healthcare', tech: ['React Native', 'WebRTC', 'Firebase'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80' },
      { id: 302, title: 'EduPulse Learning Mobile App', industry: 'EdTech', tech: ['Flutter', 'Node.js', 'AWS'], image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
      { id: 303, title: 'Instant Ride On-Demand App', industry: 'Services', tech: ['React Native', 'Google Maps API'], image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=80' }
    ]
  },
  {
    id: 4,
    name: 'Cloud Infrastructure & DevOps',
    slug: 'support',
    icon: 'fa-cloud',
    shortDescription: '24/7 SLA cloud support, AWS/Azure DevOps pipelines, and serverless scaling.',
    overview: 'Architecting resilient cloud infrastructures, automated deployment pipelines, and zero-downtime server setups for enterprise applications.',
    challenges: ['Manual deployment errors', 'Unpredictable cloud hosting costs', 'Security compliance risks'],
    solution: ['Infrastructure as Code (Terraform)', 'Kubernetes container management', 'Automated security compliance scans'],
    benefits: ['Zero-Downtime Deployments', '35% Cost Optimization', 'Automated Disaster Recovery'],
    deliverables: ['Cloud Architecture Blueprint', 'CI/CD Pipeline Configuration', '24/7 SLA Monitoring Setup'],
    techStack: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    industries: ['Fintech', 'SaaS', 'E-Commerce', 'Logistics'],
    projects: [
      { id: 401, title: 'AWS Cloud Migration & Kubernetes', industry: 'SaaS', tech: ['AWS', 'Kubernetes', 'Docker'], image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' },
      { id: 402, title: 'Fintech Automated CI/CD Pipeline', industry: 'Fintech', tech: ['Jenkins', 'Terraform', 'AWS'], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' },
      { id: 403, title: 'Multi-Region Disaster Recovery', industry: 'Enterprise', tech: ['Azure', 'Docker', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80' }
    ]
  },
  {
    id: 5,
    name: 'AI & Automation Systems',
    slug: 'ai',
    icon: 'fa-brain',
    shortDescription: 'Generative AI integration, OpenAI models, custom ML pipelines, and NLP chatbots.',
    overview: 'Integrating artificial intelligence models into enterprise software to automate complex decisions, analyze unstructured data, and enhance customer interactions.',
    challenges: ['Manual data entry inefficiencies', 'Lack of predictive business insights', 'High customer support response times'],
    solution: ['Custom Fine-tuned LLMs & RAG pipelines', 'Document AI & intelligent OCR', 'Automated customer support bots'],
    benefits: ['60% Reduction in Operational Costs', 'Real-Time Predictive Analytics', 'Instant Customer Query Resolution'],
    deliverables: ['Custom ML Model API', 'Data Pipeline Documentation', 'Monitoring Dashboard'],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'TensorFlow', 'FastAPI'],
    industries: ['Healthcare', 'Finance', 'Legal', 'Customer Support'],
    projects: [
      { id: 501, title: 'AI Legal Document Analyzer', industry: 'Legal', tech: ['Python', 'OpenAI', 'LangChain'], image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&q=80' },
      { id: 502, title: 'Predictive Fraud Detection System', industry: 'Finance', tech: ['TensorFlow', 'Python', 'Redis'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
      { id: 503, title: 'Smart Conversational AI Agent', industry: 'Support', tech: ['FastAPI', 'OpenAI', 'React'], image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' }
    ]
  },
  {
    id: 6,
    name: 'Software QA & Testing',
    slug: 'testing',
    icon: 'fa-vial-circle-check',
    shortDescription: 'Automated regression testing, vulnerability penetration audits, and load testing.',
    overview: 'Comprehensive quality assurance and automated testing frameworks ensuring zero security vulnerabilities, optimal performance, and bug-free code.',
    challenges: ['Critical software bugs reaching production', 'Slow manual QA testing cycles', 'Unidentified security vulnerabilities'],
    solution: ['End-to-End Automated Regression Suites', 'OWASP Penetration Audits', 'Load & Stress Testing'],
    benefits: ['99.9% Bug-Free Software Releases', '5x Faster QA Cycle Time', 'Certified Security Compliance'],
    deliverables: ['Automated Test Scripts', 'Vulnerability Audit Report', 'Performance Benchmark Report'],
    techStack: ['Selenium', 'Cypress', 'JMeter', 'OWASP ZAP', 'Postman'],
    industries: ['Healthcare', 'Fintech', 'SaaS', 'Government'],
    projects: [
      { id: 601, title: 'Fintech Automated QA Suite', industry: 'Fintech', tech: ['Cypress', 'Postman', 'Jenkins'], image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80' },
      { id: 602, title: 'Healthcare Penetration Audit', industry: 'Healthcare', tech: ['OWASP ZAP', 'Burp Suite'], image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80' },
      { id: 603, title: 'High-Load E-Commerce Stress Test', industry: 'Retail', tech: ['JMeter', 'Python', 'AWS'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' }
    ]
  }
];

// ── TECH STACK DATA ──
const TECH_STACK_CATEGORIES = {
  frontend: [
    { name: 'React.js', icon: 'fab fa-react' },
    { name: 'Angular', icon: 'fab fa-angular' },
    { name: 'Next.js', icon: 'fas fa-code' },
    { name: 'Vue.js', icon: 'fab fa-vuejs' },
    { name: 'HTML5 / CSS3', icon: 'fab fa-html5' }
  ],
  backend: [
    { name: 'Python / Django', icon: 'fab fa-python' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Java Spring Boot', icon: 'fab fa-java' },
    { name: 'PHP / Laravel', icon: 'fab fa-php' },
    { name: 'FastAPI', icon: 'fas fa-bolt' }
  ],
  mobile: [
    { name: 'Flutter', icon: 'fas fa-mobile-alt' },
    { name: 'React Native', icon: 'fab fa-react' },
    { name: 'Swift (iOS)', icon: 'fab fa-apple' },
    { name: 'Kotlin (Android)', icon: 'fab fa-android' }
  ],
  cloud: [
    { name: 'AWS Cloud', icon: 'fab fa-aws' },
    { name: 'Microsoft Azure', icon: 'fab fa-microsoft' },
    { name: 'Google Cloud Platform', icon: 'fab fa-google-cloud' }
  ],
  database: [
    { name: 'PostgreSQL', icon: 'fas fa-database' },
    { name: 'MySQL', icon: 'fas fa-server' },
    { name: 'MongoDB', icon: 'fas fa-leaf' },
    { name: 'Redis', icon: 'fas fa-memory' }
  ],
  devops: [
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'Kubernetes', icon: 'fas fa-dharmachakra' },
    { name: 'Jenkins', icon: 'fab fa-jenkins' },
    { name: 'GitHub Actions', icon: 'fab fa-github' }
  ],
  ai: [
    { name: 'OpenAI API', icon: 'fas fa-brain' },
    { name: 'TensorFlow', icon: 'fas fa-chart-line' },
    { name: 'LangChain', icon: 'fas fa-link' },
    { name: 'Machine Learning', icon: 'fas fa-microchip' }
  ]
};

// ── DEVELOPMENT PROCESS TIMELINE ──
const DEV_PROCESS_STEPS = [
  { step: '01', title: 'Requirement', desc: 'In-depth scoping & business goals analysis.', icon: 'fas fa-search' },
  { step: '02', title: 'Planning', desc: 'System design, milestones & tech selection.', icon: 'fas fa-drafting-compass' },
  { step: '03', title: 'Design', desc: 'Wireframing, UI mockups & design system.', icon: 'fas fa-palette' },
  { step: '04', title: 'Development', desc: 'Agile sprints with clean code standards.', icon: 'fas fa-code' },
  { step: '05', title: 'Testing', desc: 'QA automation & security penetration audits.', icon: 'fas fa-vial-circle-check' },
  { step: '06', title: 'Deployment', desc: 'Zero-downtime production cloud launch.', icon: 'fas fa-rocket' },
  { step: '07', title: 'Support', desc: '24/7 SLA monitoring & continuous updates.', icon: 'fas fa-headset' }
];

// ── SERVICES FAQS ──
const SERVICES_FAQS = [
  { q: 'What IT services does YGR Global specialize in?', a: 'YGR Global IT Services specializes in Enterprise Software Development, Cloud & DevOps, Mobile App Development (iOS & Android), AI & Automation, UI/UX Design, Software Testing, Digital Marketing, and Corporate IT Training.' },
  { q: 'How do you handle project timeline and pricing estimates?', a: 'We offer flexible engagement models: Fixed-Price Dedicated Contracts for defined scope, and Time & Material / Staff Augmentation for agile scaling. Detailed milestone timelines are provided during initial scoping.' },
  { q: 'Can YGR migrate our existing legacy software to cloud platforms?', a: 'Yes! Our cloud engineering team specializes in seamless migration of legacy architectures to cloud-native AWS or Azure infrastructure with zero downtime and microservices refactoring.' },
  { q: 'Do you provide post-launch maintenance and technical support?', a: 'SLA-backed 24/7 maintenance contracts, continuous performance monitoring, security patches, server backups, and feature upgrades are provided for all clients.' },
  { q: 'How does YGR protect client data and intellectual property (IP)?', a: 'We sign comprehensive Non-Disclosure Agreements (NDAs), enforce ISO-compliant data security protocols, and transfer 100% full source code ownership to client organizations upon project completion.' }
];

const Services = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeSlugParam = searchParams.get('type') || 'webapp';

  const [servicesList, setServicesList] = useState(DEFAULT_SERVICES);
  const [activeTechCategory, setActiveTechCategory] = useState('frontend');
  const [openFaq, setOpenFaq] = useState(null);

  // Dynamic Fetch
  useEffect(() => {
    fetch('/api/public/services/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        }
      })
      .catch(() => {});
  }, []);

  // Find currently active service object
  const activeService = servicesList.find((s) => s.slug === activeSlugParam) || servicesList[0];

  return (
    <div className="corporate-services-page">
      {/* ── 1. COMPACT HERO SECTION ── */}
      <section className="services-main-hero">
        <div className="services-hero-bg-canvas">
          <div className="services-blueprint-grid"></div>
        </div>

        <div className="services-container-1320">
          <div className="services-hero-grid">
            {/* Left Content */}
            <div className="services-hero-left">
              <div className="section-badge-pill">
                <span className="green-dot"></span>
                ENTERPRISE DIGITAL SOLUTIONS
              </div>

              <h1 className="services-hero-title">
                Engineering Digital Products & <br />
                <span className="section-main-heading"><span className="text-green-highlight">Business Transformation</span></span>
              </h1>

              <p className="services-hero-desc">
                YGR Gobal IT Services delivers enterprise software, AI solutions, cloud platforms, mobile applications, and digital transformation services that help organizations innovate and scale globally.
              </p>

              <div className="services-hero-btns">
                <a href="#services-nav" className="btn-hero-primary">
                  Explore Services <i className="fas fa-arrow-down ms-1"></i>
                </a>
                <Link to="/contact" className="btn-hero-secondary">
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Right Side Subtle Floating Enterprise Graphics */}
            <div className="services-hero-right">
              <div className="hero-floating-box">
                <div className="floating-pill-card">
                  <div className="floating-pill-icon"><i className="fas fa-brain"></i></div>
                  <div className="floating-pill-text">AI & Machine Learning Integration</div>
                </div>
                <div className="floating-pill-card">
                  <div className="floating-pill-icon"><i className="fas fa-cloud"></i></div>
                  <div className="floating-pill-text">Multi-Cloud AWS & Azure Mesh</div>
                </div>
                <div className="floating-pill-card">
                  <div className="floating-pill-icon"><i className="fas fa-shield-halved"></i></div>
                  <div className="floating-pill-text">Ironclad Cyber Security & Audits</div>
                </div>
                <div className="floating-pill-card">
                  <div className="floating-pill-icon"><i className="fas fa-network-wired"></i></div>
                  <div className="floating-pill-text">DevOps CI/CD Automation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DYNAMIC SERVICE NAVIGATION TRACK ── */}
      <section className="dynamic-service-nav-section" id="services-nav">
        <div className="services-container-1320">
          <div className="text-center mb-3">
            <div className="section-badge-pill">
              <span className="green-dot"></span>
              CORE SERVICES
            </div>
            <h2 className="section-main-heading">Select a Business Solution</h2>
          </div>

          <div className="nav-services-track">
            {servicesList.map((service) => {
              const isActive = service.slug === activeSlugParam;
              return (
                <Link
                  to={`/services?type=${service.slug}`}
                  key={service.id || service.slug}
                  className={`nav-service-card-item ${isActive ? 'active' : ''}`}
                >
                  <div className="nav-card-icon-box">
                    <i className={`fas ${service.icon || 'fa-cubes'}`}></i>
                  </div>
                  <div className="nav-card-title">{service.name || service.title}</div>
                  <div className="nav-card-short-desc">{service.shortDescription}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. SELECTED SERVICE SOLUTION VIEW (DYNAMIC DETAILS) ── */}
      <section className="service-solution-view">
        <div className="services-container-1320">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {/* Solution Overview Banner */}
              <div className="solution-header-card">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="nav-card-icon-box mb-0 fs-4">
                    <i className={`fas ${activeService.icon || 'fa-layer-group'}`}></i>
                  </div>
                  <h2 className="solution-title mb-0">{activeService.name || activeService.title}</h2>
                </div>
                <p className="solution-overview mb-0">{activeService.overview || activeService.shortDescription}</p>
              </div>

              {/* 2-Column Business Challenges & Our Solution */}
              <div className="challenges-solution-grid">
                <div className="challenges-card">
                  <div className="card-box-title text-danger">
                    <i className="fas fa-exclamation-triangle"></i> Key Business Challenges
                  </div>
                  <ul className="card-box-list">
                    {(activeService.challenges || [
                      'High infrastructure management overhead',
                      'Scaling constraints during high traffic spikes',
                      'Security compliance and data privacy risks'
                    ]).map((c, i) => (
                      <li key={i}><i className="fas fa-times-circle text-danger"></i> {c}</li>
                    ))}
                  </ul>
                </div>

                <div className="solution-card">
                  <div className="card-box-title text-success">
                    <i className="fas fa-check-circle"></i> YGR Global Solution
                  </div>
                  <ul className="card-box-list">
                    {(activeService.solution || [
                      'Cloud-native microservices architecture with auto-scaling',
                      'End-to-end encryption & OAuth2 security compliance',
                      'Automated CI/CD deployment pipelines with 24/7 SLA'
                    ]).map((s, i) => (
                      <li key={i}><i className="fas fa-check-circle text-success"></i> {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benefits & Deliverables Grid */}
              <div className="benefits-deliverables-grid">
                <div>
                  <h4 className="fw-bold mb-3 color-slate-900 fs-5"><i className="fas fa-chart-line text-primary me-2"></i> Business Benefits</h4>
                  <div className="d-flex flex-column gap-2">
                    {(activeService.benefits || [
                      '300% Improvement in System Concurrency',
                      '99.99% Guaranteed SLA Uptime',
                      '50% Reduction in Infrastructure Overhead'
                    ]).map((b, i) => (
                      <div key={i} className="benefit-pill-item">
                        <i className="fas fa-arrow-right text-success"></i> {b}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="fw-bold mb-3 color-slate-900 fs-5"><i className="fas fa-box-archive text-primary me-2"></i> Key Deliverables</h4>
                  <div className="d-flex flex-column gap-2">
                    {(activeService.deliverables || [
                      'Full Source Code & 100% IP Ownership',
                      'REST / GraphQL API Documentation',
                      'CI/CD Deployment Pipelines',
                      '24/7 SLA Maintenance Support'
                    ]).map((d, i) => (
                      <div key={i} className="benefit-pill-item">
                        <i className="fas fa-cube text-primary"></i> {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technology Stack & Ideal Industries */}
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="p-4 bg-white rounded-4 border">
                    <h5 className="fw-bold mb-3 text-dark">Technology Stack Used</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {(activeService.techStack || ['React', 'Python', 'Django', 'PostgreSQL', 'AWS', 'Docker']).map((t) => (
                        <span key={t} className="tech-tag-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 bg-white rounded-4 border">
                    <h5 className="fw-bold mb-3 text-dark">Ideal Industries</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {(activeService.industries || ['Fintech', 'Healthcare', 'E-Commerce', 'Logistics']).map((ind) => (
                        <span key={ind} className="industry-chip">{ind}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Projects */}
              <div className="related-projects-section">
                <h3 className="fw-bold fs-4 color-slate-900 mb-1">Related Projects & Case Studies</h3>
                <p className="text-muted small">Real enterprise products developed in this service domain.</p>

                <div className="related-projects-grid">
                  {(activeService.projects || [
                    { id: 1, title: 'Enterprise Healthcare Platform', industry: 'Healthcare', tech: ['React', 'Python', 'AWS'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80' },
                    { id: 2, title: 'Fleet Management System', industry: 'Logistics', tech: ['Node.js', 'MongoDB', 'Docker'], image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80' },
                    { id: 3, title: 'FinTech Analytics Dashboard', industry: 'Finance', tech: ['React', 'Python', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' }
                  ]).map((p) => (
                    <div key={p.id} className="project-case-card">
                      <img src={p.image} alt={p.title} className="project-card-thumb" />
                      <div className="project-card-body">
                        <div>
                          <span className="project-card-cat">{p.industry}</span>
                          <h4 className="project-card-title">{p.title}</h4>
                          <div className="project-tech-chips">
                            {p.tech.map((t) => (
                              <span key={t} className="tech-chip-sm">{t}</span>
                            ))}
                          </div>
                        </div>
                        <Link to="/portfolio" className="btn-hero-primary" style={{ width: '100%', justifyContent: 'center', padding: '8px 16px', fontSize: '0.82rem' }}>
                          View Case Study <i className="fas fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 4. TECHNOLOGY STACK SECTION ── */}
      <section className="tech-stack-section">
        <div className="services-container-1320">
          <div className="text-center">
            <div className="section-badge-pill">
              <span className="green-dot"></span>
              ENGINEERING ECOSYSTEM
            </div>
            <h2 className="section-main-heading">Modern Technology Stack</h2>
            <p className="section-subtext mx-auto">
              We leverage cutting-edge frameworks, cloud platforms, and AI models to build high-performance applications.
            </p>

            <div className="tech-tabs-row">
              {Object.keys(TECH_STACK_CATEGORIES).map((catKey) => (
                <button
                  key={catKey}
                  className={`tech-tab-btn ${activeTechCategory === catKey ? 'active' : ''}`}
                  onClick={() => setActiveTechCategory(catKey)}
                >
                  {catKey.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="tech-cards-grid">
            {TECH_STACK_CATEGORIES[activeTechCategory].map((tech) => (
              <motion.div
                key={tech.name}
                className="tech-card-item"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="tech-card-icon">
                  <i className={tech.icon}></i>
                </div>
                <div className="tech-card-name">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. DEVELOPMENT PROCESS HORIZONTAL TIMELINE ── */}
      <section className="dev-process-section">
        <div className="services-container-1320">
          <div className="text-center">
            <div className="section-badge-pill">
              <span className="green-dot"></span>
              DEVELOPMENT TIMELINE
            </div>
            <h2 className="section-main-heading">Our 7-Step Software Development Process</h2>
            <p className="section-subtext mx-auto">
              A structured agile methodology ensuring quality execution, complete transparency, and on-time delivery.
            </p>
          </div>

          <div className="process-timeline-row">
            {DEV_PROCESS_STEPS.map((step) => (
              <div key={step.step} className="process-step-card">
                <div className="step-num-badge">{step.step}</div>
                <div className="step-icon"><i className={step.icon}></i></div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ SECTION ── */}
      <section className="services-faq-section">
        <div className="services-container-1320">
          <div className="text-center">
            <div className="section-badge-pill">
              <span className="green-dot"></span>
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="section-main-heading">Service & Scoping Queries</h2>
          </div>

          <div className="faq-accordion-wrapper">
            {SERVICES_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="faq-card-item"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-primary fs-6`}></i>
                  </div>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="faq-answer"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. CALL TO ACTION SECTION ── */}
      <section className="services-cta-section">
        <div className="services-container-1320">
          <div className="services-cta-card">
            <h2 className="section-main-heading text-white mb-3">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-light mb-4 mx-auto" style={{ color: '#94A3B8', maxWidth: '640px' }}>
              Ready to transform your business vision into a high-performance software product? Talk to our technology architects today.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/contact" className="btn-hero-primary">
                Start Your Project <i className="fas fa-paper-plane"></i>
              </Link>
              <a href="tel:+917794053340" className="btn-hero-secondary" style={{ background: 'transparent', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
                <i className="fas fa-phone-alt me-1"></i> Talk To Experts
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
