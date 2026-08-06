import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Aboutus.css';

// Count-up animated number component for stats
const AnimatedNumber = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 16));

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
};

const ABOUT_STATS = [
  { value: 250, suffix: '+', label: 'Projects Delivered' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
  { value: 8, suffix: '+', label: 'Years of Excellence' },
  { value: 24, suffix: '×7', label: 'Technical Support' }
];

const FLOATING_TECH_BADGES = [
  { label: 'ISO 27001 Certified', icon: 'fa-shield-halved', position: 'top-left' },
  { label: 'AI Intelligence Mesh', icon: 'fa-brain', position: 'top-right' },
  { label: 'Multi-Cloud Architecture', icon: 'fa-cloud', position: 'bottom-left' },
  { label: '99.99% SLA Uptime', icon: 'fa-server', position: 'bottom-right' }
];

const TIMELINE_MILESTONES = [
  {
    step: '01',
    title: 'Idea',
    desc: 'Conceptualizing user-centric digital transformation.',
    icon: 'fa-lightbulb'
  },
  {
    step: '02',
    title: 'Research',
    desc: 'Deep architecture planning & technical analysis.',
    icon: 'fa-compass-drafting'
  },
  {
    step: '03',
    title: 'Innovation',
    desc: 'Integrating AI, cloud, & cutting-edge frameworks.',
    icon: 'fa-brain'
  },
  {
    step: '04',
    title: 'Engineering',
    desc: 'Building secure, scalable, enterprise-grade software.',
    icon: 'fa-code'
  },
  {
    step: '05',
    title: 'Growth',
    desc: 'Accelerating business expansion & market reach.',
    icon: 'fa-chart-line'
  },
  {
    step: '06',
    title: 'Digital Transformation',
    desc: 'Delivering long-term digital evolution.',
    icon: 'fa-rocket'
  }
];

const STORY_HIGHLIGHT_CARDS = [
  {
    id: 'innovation',
    title: 'Innovation First',
    desc: 'We embrace modern technologies and creative problem-solving to engineer forward-thinking software platforms.',
    icon: 'fa-lightbulb'
  },
  {
    id: 'customer',
    title: 'Customer-Centric',
    desc: 'Every solution is designed around business objectives, user experience, and measurable strategic outcomes.',
    icon: 'fa-user-check'
  },
  {
    id: 'engineering',
    title: 'Engineering Excellence',
    desc: 'We follow enterprise-grade architecture standards, zero-trust security, and agile delivery frameworks.',
    icon: 'fa-shield-halved'
  }
];

const CORE_VALUE_CHIPS = [
  'Innovation',
  'Integrity',
  'Collaboration',
  'Customer Success',
  'Quality',
  'Continuous Learning',
  'Transparency',
  'Excellence'
];

const COMPANY_JOURNEY_MILESTONES = [
  {
    year: '2023',
    title: 'Company Founded',
    desc: 'Started with a vision to build reliable digital solutions.',
    icon: 'fa-flag'
  },
  {
    year: '2024',
    title: 'Expanding Capabilities',
    desc: 'Successfully delivered projects across multiple industries while growing our engineering expertise.',
    icon: 'fa-chart-line'
  },
  {
    year: '2025',
    title: 'Enterprise Growth',
    desc: 'Strengthened our development processes and expanded our portfolio with scalable enterprise applications.',
    icon: 'fa-building'
  },
  {
    year: '2026',
    title: 'Innovation & AI',
    desc: 'Focused on cloud-native development, AI-powered solutions, automation, and modern digital platforms.',
    icon: 'fa-brain'
  },
  {
    year: 'Future',
    title: 'Global Digital Partner',
    desc: 'Continuing to innovate and build secure, intelligent technology solutions for businesses worldwide.',
    icon: 'fa-globe-americas'
  }
];

const TEAM_MEMBERS = [
  {
    name: 'Vikram Reddy',
    role: 'Senior Cloud & DevOps Architect',
    specs: 'AWS • Kubernetes • Terraform',
    avatarBg: '#2D4A6D',
    initials: 'VR',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Ananya Sharma',
    role: 'Lead AI & Software Engineer',
    specs: 'Python • PyTorch • React',
    avatarBg: '#5E9133',
    initials: 'AS',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Karthik Verma',
    role: 'Enterprise Solutions Architect',
    specs: 'Microservices • Java • Node.js',
    avatarBg: '#D36B1C',
    initials: 'KV',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Priya Sundaram',
    role: 'Head of Product & UX Design',
    specs: 'Design Systems • UI/UX • Agile',
    avatarBg: '#0F172A',
    initials: 'PS',
    linkedin: 'https://linkedin.com'
  }
];

const ENGINEERING_PRINCIPLES = [
  {
    title: 'Scalable Architecture',
    desc: 'Applications designed for future business growth.',
    icon: 'fa-layer-group'
  },
  {
    title: 'Security First',
    desc: 'Enterprise-grade security integrated into every layer.',
    icon: 'fa-shield-halved'
  },
  {
    title: 'Cloud Native',
    desc: 'Optimized for modern cloud infrastructure.',
    icon: 'fa-cloud'
  },
  {
    title: 'Performance Focused',
    desc: 'Fast, optimized and highly reliable systems.',
    icon: 'fa-gauge-high'
  },
  {
    title: 'Quality Assurance',
    desc: 'Continuous testing and quality-driven delivery.',
    icon: 'fa-square-check'
  },
  {
    title: 'Continuous Improvement',
    desc: 'Monitoring, optimization and long-term support.',
    icon: 'fa-arrows-rotate'
  }
];

const ARCHITECTURE_LAYERS = [
  { step: '01', title: 'Users & Interfaces', icon: 'fa-users-gear' },
  { step: '02', title: 'Frontend UI Mesh', icon: 'fa-desktop' },
  { step: '03', title: 'API Gateway & WAF', icon: 'fa-network-wired' },
  { step: '04', title: 'Microservices Cluster', icon: 'fa-cubes' },
  { step: '05', title: 'Database & Caching', icon: 'fa-database' },
  { step: '06', title: 'Cloud Infrastructure', icon: 'fa-cloud-meatball' },
  { step: '07', title: 'Monitoring & Security', icon: 'fa-shield-heart' }
];

const TECH_GROUPS = [
  {
    title: 'Enterprise Development',
    tag: 'Core Backend Services',
    icon: 'fa-server',
    iconColor: '#2D4A6D',
    chips: ['Java', 'Spring Boot', 'Hibernate', 'Node.js', 'Python']
  },
  {
    title: 'Frontend Technologies',
    tag: 'UI & Web Experience',
    icon: 'fa-desktop',
    iconColor: '#5E9133',
    chips: ['React', 'Angular', 'Next.js', 'TypeScript', 'JavaScript']
  },
  {
    title: 'Cloud & DevOps',
    tag: 'Infrastructure & CI/CD',
    icon: 'fa-cloud',
    iconColor: '#D36B1C',
    chips: ['AWS', 'Microsoft Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins']
  },
  {
    title: 'Databases',
    tag: 'Storage & Caching',
    icon: 'fa-database',
    iconColor: '#2D4A6D',
    chips: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase']
  },
  {
    title: 'Quality & Collaboration',
    tag: 'QA & Automation Mesh',
    icon: 'fa-vial',
    iconColor: '#5E9133',
    chips: ['Git', 'Postman', 'Swagger', 'JUnit', 'Playwright', 'Selenium']
  }
];

const CULTURE_HIGHLIGHTS = [
  {
    title: 'Continuous Learning',
    desc: 'We encourage constant skill development and knowledge sharing.',
    icon: 'fa-graduation-cap'
  },
  {
    title: 'Innovation',
    desc: 'We embrace modern technologies and creative thinking.',
    icon: 'fa-lightbulb'
  },
  {
    title: 'Collaboration',
    desc: 'Cross-functional teamwork drives every successful project.',
    icon: 'fa-people-group'
  },
  {
    title: 'Ownership',
    desc: 'Every team member takes responsibility for delivering quality.',
    icon: 'fa-user-check'
  },
  {
    title: 'Customer Focus',
    desc: 'Business outcomes guide every engineering decision.',
    icon: 'fa-bullseye'
  },
  {
    title: 'Integrity',
    desc: 'Transparency, trust, and professionalism define our work.',
    icon: 'fa-handshake'
  }
];

const WORKspace_NODES = [
  { label: 'Software Developers', icon: 'fa-code', color: 'text-blue' },
  { label: 'UI/UX Product Designers', icon: 'fa-compass-drafting', color: 'text-green' },
  { label: 'Cloud Solutions Mesh', icon: 'fa-cloud', color: 'text-orange' },
  { label: 'AI Intelligence Engine', icon: 'fa-brain', color: 'text-blue' },
  { label: 'Enterprise Architecture', icon: 'fa-network-wired', color: 'text-green' },
  { label: 'Agile Delivery Sprints', icon: 'fa-arrows-spin', color: 'text-orange' }
];

const TRUST_INDICATORS = [
  'Free Consultation',
  'Transparent Process',
  'Long-Term Support',
  'Enterprise Solutions'
];

const Aboutus = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const foundationRef = useRef(null);
  const journeyRef = useRef(null);
  const leadershipRef = useRef(null);
  const engineeringRef = useRef(null);
  const techRef = useRef(null);
  const cultureRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-10%' });
  const isStoryInView = useInView(storyRef, { once: true, margin: '-10%' });
  const isFoundationInView = useInView(foundationRef, { once: true, margin: '-10%' });
  const isJourneyInView = useInView(journeyRef, { once: true, margin: '-10%' });
  const isLeadershipInView = useInView(leadershipRef, { once: true, margin: '-10%' });
  const isEngineeringInView = useInView(engineeringRef, { once: true, margin: '-10%' });
  const isTechInView = useInView(techRef, { once: true, margin: '-10%' });
  const isCultureInView = useInView(cultureRef, { once: true, margin: '-10%' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-10%' });

  // Mouse Parallax Physics for Right Visual Composition
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mousePos.x, { stiffness: 45, damping: 25 });
  const springY = useSpring(mousePos.y, { stiffness: 45, damping: 25 });

  const card1X = useTransform(springX, (v) => v * 1.1);
  const card1Y = useTransform(springY, (v) => v * 1.1);
  const card2X = useTransform(springX, (v) => -v * 1.0);
  const card2Y = useTransform(springY, (v) => -v * 1.0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="corporate-about-page">
      {/* ── 1. ABOUT HERO SECTION ── */}
      <section className="about-hero-section" ref={heroRef}>
        <div className="about-hero-bg-canvas">
          <div className="about-blueprint-grid"></div>
          <div className="about-radial-glow blue-glow"></div>
          <div className="about-radial-glow green-glow"></div>
        </div>

        <div className="about-hero-container">
          <motion.div
            className="about-hero-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
          >
            {/* Left Column */}
            <div className="about-hero-left">
              <motion.div className="about-eyebrow" variants={fadeUpVariant}>
                <span className="eyebrow-dot"></span>
                <span className="eyebrow-title">ABOUT YGR GOBAL IT SERVICES</span>
              </motion.div>

              <motion.h1 className="about-hero-heading" variants={fadeUpVariant}>
                Engineering Innovation. <br />
                <span className="ygr-green-highlight">Building Long-Term Digital Partnerships.</span>
              </motion.h1>

              <motion.p className="about-hero-description" variants={fadeUpVariant}>
                YGR Gobal IT Services is a technology-driven software engineering company delivering enterprise applications, cloud-native solutions, AI-powered innovation, and digital transformation services for businesses worldwide. We combine engineering excellence, modern technologies, and customer-first thinking to create secure, scalable, and future-ready digital products.
              </motion.p>

              <motion.div className="about-hero-buttons" variants={fadeUpVariant}>
                <a href="#our-story" className="btn-about-primary">
                  <span>Explore Our Story</span>
                  <span className="cta-arrow-circle">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </a>

                <Link to="/contact" className="btn-about-secondary">
                  <span>Contact Us</span>
                </Link>
              </motion.div>

              <motion.div className="about-hero-stats-row" variants={fadeUpVariant}>
                {ABOUT_STATS.map((stat) => (
                  <div key={stat.label} className="stat-item">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column Visual Composition */}
            <motion.div className="about-hero-right" variants={fadeUpVariant}>
              <div className="about-visual-canvas">
                <div className="about-graphic-halo"></div>

                <motion.div
                  className="about-command-panel"
                  style={{ x: card1X, y: card1Y }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="panel-header">
                    <div className="window-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <span className="panel-tag">YGR Gobal Architecture Mesh</span>
                    <span className="status-pill">
                      <span className="live-dot"></span> Active
                    </span>
                  </div>

                  <div className="panel-architecture-grid">
                    <div className="arch-card">
                      <i className="fas fa-cloud text-blue"></i>
                      <span>Cloud Native</span>
                    </div>
                    <div className="arch-card">
                      <i className="fas fa-layer-group text-green"></i>
                      <span>Enterprise Core</span>
                    </div>
                    <div className="arch-card">
                      <i className="fas fa-brain text-orange"></i>
                      <span>AI Intelligence</span>
                    </div>
                    <div className="arch-card">
                      <i className="fas fa-shield-halved text-blue"></i>
                      <span>Zero Trust QA</span>
                    </div>
                  </div>

                  <div className="panel-telemetry-banner">
                    <div className="telemetry-info">
                      <span className="telemetry-lbl">Global Throughput</span>
                      <span className="telemetry-val">99.99% Availability • Multi-Region</span>
                    </div>
                    <div className="mini-pulse-bars">
                      <span className="p-bar b1"></span>
                      <span className="p-bar b2"></span>
                      <span className="p-bar b3"></span>
                      <span className="p-bar b4"></span>
                    </div>
                  </div>
                </motion.div>

                {FLOATING_TECH_BADGES.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    className={`floating-about-badge badge-${badge.position}`}
                    style={{ x: card2X, y: card2Y }}
                    animate={{ y: [0, (i % 2 === 0 ? -6 : 6), 0] }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  >
                    <i className={`fas ${badge.icon} badge-icon`}></i>
                    <span className="badge-text">{badge.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. OUR STORY SECTION ── */}
      <section id="our-story" className="our-story-section" ref={storyRef}>
        <div className="story-bg-canvas">
          <div className="story-blueprint-grid"></div>
          <div className="story-radial-glow blue-glow"></div>
          <div className="story-radial-glow green-glow"></div>
        </div>

        <div className="story-container">
          <motion.div
            className="story-two-column-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isStoryInView ? 'visible' : 'hidden'}
          >
            {/* Left Side */}
            <div className="story-left-content">
              <motion.div className="story-eyebrow" variants={fadeUpVariant}>
                <span className="eyebrow-dot"></span>
                <span className="eyebrow-title">OUR STORY</span>
              </motion.div>

              <motion.h2 className="story-heading" variants={fadeUpVariant}>
                Transforming Ideas Into <br />
                <span className="ygr-green-highlight">Digital Excellence</span>
              </motion.h2>

              <motion.p className="story-subtitle" variants={fadeUpVariant}>
                Driven by Innovation. Built on Trust. Focused on the Future.
              </motion.p>

              <motion.div className="story-paragraphs-block" variants={fadeUpVariant}>
                <p>
                  YGR Gobal IT Services was established with a vision to help businesses embrace digital transformation through innovative software solutions.
                </p>
                <p>
                  From our early projects to enterprise-scale digital platforms, we have remained committed to engineering excellence, customer success, and continuous innovation.
                </p>
                <p>
                  Our journey is defined by long-term partnerships, modern technologies, agile delivery, and measurable business outcomes rather than simply delivering software.
                </p>
              </motion.div>

              <motion.div className="founder-quote-block" variants={fadeUpVariant}>
                <div className="quote-mark-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="quote-statement">
                  &ldquo;Technology should empower businesses, simplify complexity, and create opportunities for sustainable growth.&rdquo;
                </p>
                <span className="quote-author">— Founder&apos;s Vision</span>
              </motion.div>
            </div>

            {/* Right Side */}
            <motion.div className="story-right-timeline" variants={fadeUpVariant}>
              <div className="vertical-timeline-track">
                <div className="timeline-line-background">
                  <motion.div
                    className="timeline-line-fill"
                    initial={{ scaleY: 0 }}
                    animate={isStoryInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  />
                </div>

                <div className="timeline-milestones-list">
                  {TIMELINE_MILESTONES.map((milestone) => (
                    <div key={milestone.step} className="milestone-item">
                      <div className="milestone-icon-node">
                        <i className={`fas ${milestone.icon}`}></i>
                      </div>
                      <div className="milestone-card">
                        <div className="milestone-header">
                          <h4 className="milestone-title">{milestone.title}</h4>
                          <span className="milestone-step">Step {milestone.step}</span>
                        </div>
                        <p className="milestone-desc">{milestone.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Highlight Cards */}
          <motion.div
            className="story-highlight-cards-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isStoryInView ? 'visible' : 'hidden'}
          >
            {STORY_HIGHLIGHT_CARDS.map((card) => (
              <motion.div
                key={card.id}
                className="story-highlight-card"
                variants={fadeUpVariant}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="highlight-icon-box">
                  <i className={`fas ${card.icon}`}></i>
                </div>
                <h3 className="highlight-card-title">{card.title}</h3>
                <p className="highlight-card-desc">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. OUR FOUNDATION SECTION ── */}
      <section className="our-foundation-section" ref={foundationRef}>
        <div className="foundation-bg-canvas">
          <div className="foundation-blueprint-grid"></div>
          <div className="foundation-radial-glow blue-glow"></div>
          <div className="foundation-radial-glow green-glow"></div>
        </div>

        <div className="foundation-container">
          <motion.div
            className="foundation-header-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={isFoundationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="foundation-eyebrow">
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-title">OUR FOUNDATION</span>
            </div>

            <h2 className="foundation-heading">
              Driven by Purpose. <br />
              <span className="ygr-green-highlight">Guided by Innovation.</span>
            </h2>

            <p className="foundation-description">
              Our vision, mission, and values define every solution we build, every partnership we establish, and every innovation we pursue. These principles inspire our teams to deliver technology that creates measurable business value and long-term success.
            </p>
          </motion.div>

          <motion.div
            className="foundation-bento-layout"
            variants={containerVariants}
            initial="hidden"
            animate={isFoundationInView ? 'visible' : 'hidden'}
          >
            {/* Top Large Card: Our Vision */}
            <motion.div
              className="foundation-card vision-large-card"
              variants={fadeUpVariant}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-top-gradient-line"></div>
              <div className="card-header-bar">
                <div className="card-icon-box text-blue">
                  <i className="fas fa-eye"></i>
                </div>
                <span className="card-tag">PURPOSE & HORIZON</span>
              </div>

              <h3 className="bento-title">Our Vision</h3>
              <p className="bento-text large">
                To become a globally trusted technology partner delivering innovative, scalable, and future-ready digital solutions that empower businesses to thrive in a rapidly evolving world.
              </p>

              <div className="card-abstract-visual">
                <div className="mini-orbit-ring">
                  <span className="orbit-dot dot-1"></span>
                  <span className="orbit-dot dot-2"></span>
                </div>
                <span className="visual-badge-pill">Future-Ready Architecture</span>
              </div>
            </motion.div>

            {/* Bottom Row Grid */}
            <div className="foundation-bottom-grid">
              <motion.div
                className="foundation-card mission-medium-card"
                variants={fadeUpVariant}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-top-gradient-line green-gradient"></div>
                <div className="card-header-bar">
                  <div className="card-icon-box text-green">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <span className="card-tag">MISSION & EXECUTION</span>
                </div>

                <h3 className="bento-title">Our Mission</h3>
                <p className="bento-text">
                  To combine engineering excellence, customer-centric thinking, and modern technologies to build secure, intelligent, and high-performing digital products that create lasting business impact.
                </p>
              </motion.div>

              <motion.div
                className="foundation-card values-medium-card"
                variants={fadeUpVariant}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-top-gradient-line orange-gradient"></div>
                <div className="card-header-bar">
                  <div className="card-icon-box text-orange">
                    <i className="fas fa-gem"></i>
                  </div>
                  <span className="card-tag">PRINCIPLES & CULTURE</span>
                </div>

                <h3 className="bento-title">Our Core Values</h3>
                
                <div className="values-chips-grid">
                  {CORE_VALUE_CHIPS.map((chip) => (
                    <motion.div
                      key={chip}
                      className="value-chip-item"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className="fas fa-check-circle chip-check-icon"></i>
                      <span>{chip}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. COMPANY JOURNEY SECTION ── */}
      <section className="company-journey-section" ref={journeyRef}>
        <div className="journey-bg-canvas">
          <div className="journey-blueprint-grid"></div>
          <div className="journey-radial-glow blue-glow"></div>
          <div className="journey-radial-glow green-glow"></div>
        </div>

        <div className="journey-container">
          <motion.div
            className="journey-header-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={isJourneyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="journey-eyebrow">
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-title">OUR JOURNEY</span>
            </div>

            <h2 className="journey-heading">
              Every Milestone <br />
              <span className="ygr-green-highlight">Shapes Our Future</span>
            </h2>

            <p className="journey-description">
              Our journey reflects continuous innovation, engineering excellence, and a commitment to helping businesses succeed through technology. Every milestone represents growth, learning, stronger partnerships, and greater impact.
            </p>
          </motion.div>

          <div className="horizontal-journey-track-wrapper">
            <div className="horizontal-journey-connecting-line">
              <motion.div
                className="horizontal-journey-progress-fill"
                initial={{ scaleX: 0 }}
                animate={isJourneyInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </div>

            <div className="horizontal-journey-nodes-row">
              {COMPANY_JOURNEY_MILESTONES.map((item) => (
                <div key={item.year} className="journey-node-item">
                  <span className="glowing-node-circle">
                    <span className="inner-pulse-dot"></span>
                  </span>
                  <span className="node-year-tag">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="journey-milestones-cards-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isJourneyInView ? 'visible' : 'hidden'}
          >
            {COMPANY_JOURNEY_MILESTONES.map((m) => (
              <motion.div
                key={m.year}
                className="journey-milestone-card"
                variants={fadeUpVariant}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="journey-card-top">
                  <span className="journey-year-text">{m.year}</span>
                  <div className="journey-icon-box">
                    <i className={`fas ${m.icon}`}></i>
                  </div>
                </div>

                <h3 className="journey-card-title">{m.title}</h3>
                <p className="journey-card-desc">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="journey-bottom-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={isJourneyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="bottom-journey-statement">
              &ldquo;Our journey is only the beginning. Every milestone strengthens our commitment to engineering excellence and long-term client success.&rdquo;
            </p>

            <Link to="/services" className="btn-explore-expertise">
              <span>Explore Our Expertise</span>
              <span className="cta-arrow-circle">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 5. LEADERSHIP & TEAM SECTION ── */}
      <section className="leadership-team-section" ref={leadershipRef}>
        <div className="leadership-bg-canvas">
          <div className="leadership-blueprint-grid"></div>
          <div className="leadership-radial-glow blue-glow"></div>
          <div className="leadership-radial-glow green-glow"></div>
        </div>

        <div className="leadership-container">
          <motion.div
            className="leadership-header-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={isLeadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="leadership-eyebrow">
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-title">OUR LEADERSHIP</span>
            </div>

            <h2 className="leadership-heading">
              Driven by Vision. <br />
              <span className="ygr-green-highlight">Powered by People.</span>
            </h2>

            <p className="leadership-description">
              Behind every successful digital solution is a passionate team of engineers, designers, architects, and innovators committed to delivering exceptional technology experiences.
            </p>
          </motion.div>

          <motion.div
            className="featured-leadership-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isLeadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            whileHover={{ y: -6 }}
          >
            <div className="featured-leader-badge-row">
              <span className="experience-badge">
                <i className="fas fa-certificate"></i> 12+ Years IT Leadership
              </span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="leader-linkedin-btn"
                aria-label="LinkedIn Profile"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            <div className="featured-leader-body">
              <div className="leader-avatar-wrapper">
                <div className="leader-avatar-graphic">
                  <span>MV</span>
                </div>
                <div className="avatar-live-badge">
                  <span className="live-dot"></span> Executive
                </div>
              </div>

              <div className="leader-info-content">
                <h3 className="leader-name">RavindraReddy Yanna</h3>
                <span className="leader-title">Founder & Chief Executive Officer</span>

                <blockquote className="leader-quote">
                  &ldquo;We believe technology should simplify complexity and create measurable business value for every client.&rdquo;
                </blockquote>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="team-members-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isLeadershipInView ? 'visible' : 'hidden'}
          >
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.name}
                className="team-member-card"
                variants={fadeUpVariant}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="team-card-header">
                  <div className="team-avatar-graphic" style={{ background: member.avatarBg }}>
                    <span>{member.initials}</span>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="team-linkedin-link"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>

                <div className="team-card-body">
                  <h4 className="team-member-name">{member.name}</h4>
                  <span className="team-member-role">{member.role}</span>
                  <div className="team-specs-chip">
                    <i className="fas fa-microchip"></i>
                    <span>{member.specs}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="leadership-bottom-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={isLeadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="bottom-team-statement">
              Engineering is a team effort. Every successful solution is built through collaboration, creativity, and continuous learning.
            </p>

            <Link to="/careers" className="btn-join-our-team">
              <span>Join Our Team</span>
              <span className="cta-arrow-circle">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 6. ENGINEERING EXCELLENCE SECTION ── */}
      <section className="engineering-excellence-section" ref={engineeringRef}>
        <div className="eng-bg-canvas">
          <div className="eng-blueprint-grid"></div>
          <div className="eng-radial-glow blue-glow"></div>
          <div className="eng-radial-glow green-glow"></div>
        </div>

        <div className="eng-container">
          <motion.div
            className="eng-split-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isEngineeringInView ? 'visible' : 'hidden'}
          >
            <div className="eng-left-content">
              <motion.div className="eng-eyebrow" variants={fadeUpVariant}>
                <span className="eyebrow-dot"></span>
                <span className="eyebrow-title">ENGINEERING EXCELLENCE</span>
              </motion.div>

              <motion.h2 className="eng-heading" variants={fadeUpVariant}>
                Building Software <br />
                That Performs Today <br />
                <span className="ygr-green-highlight">And Scales Tomorrow</span>
              </motion.h2>

              <motion.p className="eng-description" variants={fadeUpVariant}>
                At YGR Gobal IT Services, engineering is more than writing code. Every solution is designed with scalability, security, maintainability, performance, and long-term business value in mind. We follow modern engineering principles to ensure every application is reliable, future-ready, and built for growth.
              </motion.p>

              <motion.div className="eng-principles-grid" variants={fadeUpVariant}>
                {ENGINEERING_PRINCIPLES.map((principle) => (
                  <motion.div
                    key={principle.title}
                    className="eng-principle-card"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="principle-icon-box">
                      <i className={`fas ${principle.icon}`}></i>
                    </div>
                    <h3 className="principle-card-title">{principle.title}</h3>
                    <p className="principle-card-desc">{principle.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div className="eng-right-visual" variants={fadeUpVariant}>
              <div className="architecture-pipeline-panel">
                <div className="panel-header">
                  <div className="window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="panel-tag">YGR Enterprise Architecture Pipeline</span>
                  <span className="status-pill">
                    <span className="live-dot"></span> Verified
                  </span>
                </div>

                <div className="pipeline-nodes-stack">
                  {ARCHITECTURE_LAYERS.map((layer, index) => (
                    <motion.div
                      key={layer.step}
                      className="pipeline-layer-node"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isEngineeringInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 6 }}
                    >
                      <span className="layer-step-num">{layer.step}</span>
                      <div className="layer-icon-box">
                        <i className={`fas ${layer.icon}`}></i>
                      </div>
                      <span className="layer-title-text">{layer.title}</span>
                      <span className="layer-connector-arrow">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="eng-bottom-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={isEngineeringInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="bottom-eng-statement">
              &ldquo;Engineering excellence is not a destination. It is a continuous commitment to innovation, quality, and customer success.&rdquo;
            </p>

            <Link to="/services" className="btn-explore-engineering">
              <span>Explore Our Engineering</span>
              <span className="cta-arrow-circle">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 7. TECHNOLOGY STACK & INNOVATION ECOSYSTEM SECTION ── */}
      <section className="technology-ecosystem-section" ref={techRef}>
        <div className="tech-bg-canvas">
          <div className="tech-blueprint-grid"></div>
          <div className="tech-radial-glow blue-glow"></div>
          <div className="tech-radial-glow green-glow"></div>
        </div>

        <div className="tech-container">
          <motion.div
            className="tech-header-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tech-eyebrow">
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-title">TECHNOLOGY ECOSYSTEM</span>
            </div>

            <h2 className="tech-heading">
              Powered by Modern Technologies. <br />
              <span className="ygr-green-highlight">Driven by Continuous Innovation.</span>
            </h2>

            <p className="tech-description">
              We leverage proven enterprise technologies, cloud platforms, modern frameworks, and engineering best practices to build scalable, secure, and future-ready digital solutions.
            </p>
          </motion.div>

          <motion.div
            className="tech-ecosystem-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isTechInView ? 'visible' : 'hidden'}
          >
            {TECH_GROUPS.map((group) => (
              <motion.div
                key={group.title}
                className="tech-group-card"
                variants={fadeUpVariant}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="tech-card-header">
                  <div className="tech-icon-box" style={{ color: group.iconColor }}>
                    <i className={`fas ${group.icon}`}></i>
                  </div>
                  <span className="tech-group-tag">{group.tag}</span>
                </div>

                <h3 className="tech-group-title">{group.title}</h3>

                <div className="tech-chips-list">
                  {group.chips.map((chip) => (
                    <motion.span
                      key={chip}
                      className="tech-chip"
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="tech-group-card featured-innovation-card"
              variants={fadeUpVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="tech-card-header">
                <div className="tech-icon-box text-green">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <span className="tech-group-tag tag-green">R&D & INNOVATION</span>
              </div>

              <h3 className="tech-group-title">Always Learning. Always Evolving.</h3>

              <p className="innovation-card-text">
                Our engineering teams continuously evaluate emerging technologies, frameworks, and cloud platforms to deliver solutions that remain relevant, secure, and scalable for the future.
              </p>

              <div className="innovation-footer-pill">
                <span className="pill-dot"></span>
                <span>Continuous R&D • AI Integration • Cloud Native</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. COMPANY CULTURE SECTION ── */}
      <section className="company-culture-section" ref={cultureRef}>
        <div className="culture-bg-canvas">
          <div className="culture-blueprint-grid"></div>
          <div className="culture-radial-glow blue-glow"></div>
          <div className="culture-radial-glow green-glow"></div>
        </div>

        <div className="culture-container">
          <motion.div
            className="culture-split-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isCultureInView ? 'visible' : 'hidden'}
          >
            <div className="culture-left-content">
              <motion.div className="culture-eyebrow" variants={fadeUpVariant}>
                <span className="eyebrow-dot"></span>
                <span className="eyebrow-title">OUR CULTURE</span>
              </motion.div>

              <motion.h2 className="culture-heading" variants={fadeUpVariant}>
                Where Innovation <br />
                <span className="ygr-green-highlight">Meets Collaboration</span>
              </motion.h2>

              <motion.p className="culture-description" variants={fadeUpVariant}>
                At YGR Gobal IT Services, we believe great technology is built by empowered people. Our culture encourages curiosity, continuous learning, collaboration, ownership, and innovation while maintaining a strong commitment to quality and customer success.
              </motion.p>

              <motion.div className="culture-highlights-grid" variants={fadeUpVariant}>
                {CULTURE_HIGHLIGHTS.map((item) => (
                  <motion.div
                    key={item.title}
                    className="culture-highlight-card"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="culture-icon-box">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h3 className="culture-card-title">{item.title}</h3>
                    <p className="culture-card-desc">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="culture-featured-quote-card" variants={fadeUpVariant}>
                <div className="quote-icon-bar">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="quote-body-text">
                  &ldquo;Strong technology is built by strong teams working with a shared vision.&rdquo;
                </p>
              </motion.div>

              <motion.div className="culture-cta-wrapper" variants={fadeUpVariant}>
                <Link to="/careers" className="btn-explore-careers">
                  <span>Explore Career Opportunities</span>
                  <span className="cta-arrow-circle">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div className="culture-right-visual" variants={fadeUpVariant}>
              <div className="culture-workspace-panel">
                <div className="panel-header">
                  <div className="window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="panel-tag">YGR Collaborative Workspace Mesh</span>
                  <span className="status-pill">
                    <span className="live-dot"></span> Empowered
                  </span>
                </div>

                <div className="workspace-nodes-grid">
                  {WORKspace_NODES.map((node) => (
                    <motion.div
                      key={node.label}
                      className="workspace-node-card"
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="workspace-icon-wrapper">
                        <i className={`fas ${node.icon} ${node.color}`}></i>
                      </div>
                      <span className="workspace-node-label">{node.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="culture-collaboration-footer">
                  <div className="collab-pulse-indicator">
                    <span className="pulse-wave"></span>
                    <span className="collab-text">Cross-Functional Agile Squads • 100% Ownership</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. FINAL CALL TO ACTION SECTION (Centered Premium Container Layout) ── */}
      <section className="about-final-cta-section" ref={ctaRef}>
        <div className="cta-container">
          <motion.div
            className="about-cta-card-container"
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background Atmosphere */}
            <div className="cta-bg-canvas">
              <div className="cta-blueprint-grid"></div>
              <div className="cta-radial-glow blue-glow"></div>
              <div className="cta-radial-glow green-glow"></div>
            </div>

            <div className="cta-centered-content">
              {/* Premium Badge */}
              <motion.div className="cta-eyebrow" variants={fadeUpVariant}>
                <span className="eyebrow-dot"></span>
                <span className="eyebrow-title">LET&apos;S BUILD THE FUTURE TOGETHER</span>
              </motion.div>

              {/* Large Centered Heading */}
              <motion.h2 className="cta-heading" variants={fadeUpVariant}>
                Ready to Transform <br />
                <span className="ygr-green-highlight">Your Business?</span>
              </motion.h2>

              {/* Concise Description (Max 3 lines) */}
              <motion.p className="cta-description" variants={fadeUpVariant}>
                Whether you&apos;re launching a new product, modernizing existing systems, or planning your next digital transformation initiative, YGR Gobal IT Services is ready to become your trusted technology partner. Let&apos;s build secure, scalable, and future-ready digital solutions together.
              </motion.p>

              {/* Two CTA Buttons Stack (58px Height, Rounded Full) */}
              <motion.div className="cta-buttons-group" variants={fadeUpVariant}>
                <Link to="/contact" className="btn-cta-primary">
                  <span>Start Your Project</span>
                  <span className="cta-arrow-circle">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>

                <Link to="/contact" className="btn-cta-secondary">
                  <span>Schedule a Free Consultation</span>
                </Link>
              </motion.div>

              {/* Small Glass Trust Chips */}
              <motion.div className="cta-trust-chips-row" variants={fadeUpVariant}>
                {TRUST_INDICATORS.map((indicator) => (
                  <motion.div
                    key={indicator}
                    className="trust-chip-item"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <i className="fas fa-check-circle trust-check-icon"></i>
                    <span>{indicator}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
