import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PublicNavbar from '../../components/PublicNavbar';

const SERVICES_CONFIG = {
  web: {
    title: 'Website Development',
    subtitle: 'Modern Website Architecture',
    tagline: 'Development Excellence',
    desc: 'We blend aesthetic excellence with technical precision to build websites that are fast, secure, and conversion-optimized.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    blueprint: [
      { step: '01', title: 'Discovery', desc: 'In-depth analysis of your market, competitors, and core business objectives to define a winning strategy.', icon: 'fa-search-dollar' },
      { step: '02', title: 'Architecture', desc: 'Defining the technical stack and UI/UX wireframes to ensure scalability and user-centric navigation.', icon: 'fa-drafting-compass' },
      { step: '03', title: 'Development', desc: 'Agile engineering with clean code practices, transforming designs into a high-performance digital asset.', icon: 'fa-layer-group' },
      { step: '04', title: 'Optimization', desc: 'Rigorous testing, SEO fine-tuning, and deployment followed by continuous performance monitoring.', icon: 'fa-rocket' },
    ],
    pricing: [
      { name: 'Startup', price: '₹16,999', period: '', features: ['5 Custom Pages', 'Basic Logo Design', 'Free Hosting (1st Year)', 'SSL Certificate', 'Social Integration'] },
      { name: 'Business', price: '₹27,999', period: '', popular: true, features: ['10 Professional Pages', 'Premium Logo Design', '2 Business Emails', 'Advanced SEO', 'Priority Support'] },
      { name: 'E-Commerce', price: '₹39,999', period: '', features: ['30+ Products', 'Inventory Management', 'Payment Gateway', 'Order Tracking', 'Secure Checkout'] },
    ]
  },
  webapp: {
    title: 'Web Applications',
    subtitle: 'Scalable Web Applications',
    tagline: 'Enterprise Solutions',
    desc: 'We build robust, multi-tenant web applications with seamless integrations and cloud-native architectures.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    blueprint: [
      { step: '01', title: 'System Design', desc: 'Architecting database schemas and server logic for maximum efficiency and data integrity.', icon: 'fa-microchip' },
      { step: '02', title: 'API Integration', desc: 'Building secure, RESTful endpoints and integrating third-party services seamlessly.', icon: 'fa-network-wired' },
      { step: '03', title: 'Security Layer', desc: 'Implementing JWT, OAuth, and multi-factor authentication to protect enterprise data.', icon: 'fa-shield-virus' },
      { step: '04', title: 'CI/CD Pipeline', desc: 'Automated deployment workflows ensuring zero downtime and rapid feature releases.', icon: 'fa-cloud-upload-alt' },
    ],
    pricing: [
      { name: 'MVP', price: '₹49,999', period: '', features: ['Core Logic Dev', 'User Auth System', 'Basic Database', 'API Integration', 'Deployment Setup'] },
      { name: 'Business', price: '₹99,999', period: '', popular: true, features: ['Advanced Dashboard', 'Payment Gateways', 'Role Based Access', 'Data Analytics', '3 Months Maintenance'] },
      { name: 'Enterprise', price: 'Custom', period: '', features: ['Microservices Arch', 'Multi-region Cloud', 'AI/ML Integration', 'Dedicated DevOps', '24/7 SLA Support'] },
    ]
  },
  mobile: {
    title: 'Mobile App Development',
    subtitle: 'Next-Gen Mobile Experiences',
    tagline: 'Mobility Innovation',
    desc: 'Native performance with cross-platform efficiency. We build apps that users love to keep on their home screens.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    blueprint: [
      { step: '01', title: 'Native Optimization', desc: 'Ensuring smooth 60FPS animations and responsive touch interactions across all devices.', icon: 'fa-mobile-alt' },
      { step: '02', title: 'Offline-First', desc: 'Implementing robust local caching to keep your app functional even without connectivity.', icon: 'fa-sync-alt' },
      { step: '03', title: 'Push Strategy', desc: 'Intelligent notification systems to drive user retention without being intrusive.', icon: 'fa-bell' },
      { step: '04', title: 'App Store Ready', desc: 'Full compliance with Apple and Google guidelines for a seamless approval process.', icon: 'fa-store' },
    ],
    pricing: [
      { name: 'Basic App', price: '₹29,999', period: '', features: ['Single Platform (Android)', '5 Screen Design', 'Firebase Auth', 'Basic Analytics', 'Play Store Upload'] },
      { name: 'Cross-Platform', price: '₹59,999', period: '', popular: true, features: ['Flutter / React Native', 'iOS + Android', 'Custom UI / UX', 'Push Notifications', 'API Integration'] },
      { name: 'Premium App', price: '₹99,999+', period: '', features: ['Complex Logic / AI', 'Real-time Features', 'Payment Wallet', 'Offline Mode', '6 Months Support'] },
    ]
  },
  dm: {
    title: 'Digital Marketing',
    subtitle: 'Data-Driven Growth',
    tagline: 'Market Dominance',
    desc: 'We combine analytics with creativity to drive meaningful engagement and ROI-focused marketing campaigns.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    blueprint: [
      { step: '01', title: 'Precision Targeting', desc: 'Using demographic and behavioral data to reach the exact audience likely to convert.', icon: 'fa-bullseye' },
      { step: '02', title: 'Funnel Mastery', desc: 'Optimizing every touchpoint from awareness to final purchase for maximum conversion.', icon: 'fa-funnel-dollar' },
      { step: '03', title: 'Real-time Analytics', desc: 'Constant A/B testing and performance tracking to pivot strategies for better results.', icon: 'fa-chart-line' },
      { step: '04', title: 'Retention Loop', desc: 'Implementing loyalty programs and remarketing to increase customer lifetime value.', icon: 'fa-users-cog' },
    ],
    pricing: [
      { name: 'Starter', price: '₹9,999', period: '/mo', features: ['Basic SEO Optimization', 'Social Media (2 Plat.)', '8 Custom Posts', 'Google My Business', 'Monthly Report'] },
      { name: 'Growth', price: '₹19,999', period: '/mo', popular: true, features: ['Advanced SEO (On/Off)', 'Social Media (3 Plat.)', '16 Custom Posts', 'Google Ads Setup', 'Bi-weekly Analytics'] },
      { name: 'Scale', price: '₹39,999', period: '/mo', features: ['Full Funnel Strategy', 'Ads (Google & Meta)', 'Content Marketing', 'Lead Gen Focus', 'Weekly Deep Dive'] },
    ]
  },
  uiux: {
    title: 'UI / UX Design',
    subtitle: 'Intuitive Product Design',
    tagline: 'Visual Mastery',
    desc: 'We create digital experiences that feel as good as they look. User-centric design that converts curiosity into loyalty.',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80',
    blueprint: [
      { step: '01', title: 'Persona Research', desc: 'Deep diving into user behaviors to understand their pain points and expectations.', icon: 'fa-user-friends' },
      { step: '02', title: 'User Journeys', desc: 'Mapping every possible interaction to ensure the path to goal is frictionless.', icon: 'fa-stream' },
      { step: '03', title: 'Visual Identity', desc: 'Crafting a unique design system that reflects your brand\'s soul across all screens.', icon: 'fa-palette' },
      { step: '04', title: 'Usability Testing', desc: 'Validating designs with real users to refine interactions before development starts.', icon: 'fa-vial' },
    ],
    pricing: [
      { name: 'Essential', price: '₹14,999', period: '', features: ['Up to 5 Key Screens', 'Basic Wireframing', 'Brand Style Guide', 'Clickable Prototype', 'Figma Source Files'] },
      { name: 'Professional', price: '₹29,999', period: '', popular: true, features: ['Up to 15 Screens', 'UX Research / Audits', 'Micro-animations', 'Design System', 'Dev Handoff Support'] },
      { name: 'Premium Suite', price: '₹49,999+', period: '', features: ['Unlimited Screens', 'Product Discovery', 'High-end Prototyping', 'User Testing Sessions', 'Icon & Asset Library'] },
    ]
  },
  testing: {
    title: 'Software Testing',
    subtitle: 'Flawless Software Delivery',
    tagline: 'Quality Assurance',
    desc: 'We eliminate technical debt and security risks through rigorous manual and automated testing protocols.',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    blueprint: [
      { step: '01', title: 'Manual Audit', desc: 'Human-led testing to verify UI consistency, usability, and edge-case behavior.', icon: 'fa-vials' },
      { step: '02', title: 'Automation', desc: 'Scripted regression tests that run on every build to prevent technical debt.', icon: 'fa-robot' },
      { step: '03', title: 'Load Testing', desc: 'Simulating high-traffic scenarios to ensure your infrastructure scales under pressure.', icon: 'fa-tachometer-alt' },
      { step: '04', title: 'UAT Phase', desc: 'User Acceptance Testing to ensure the final product meets all business requirements.', icon: 'fa-user-check' },
    ],
    pricing: [
      { name: 'Basic QA', price: '₹14,999', period: '', features: ['Manual Testing', 'Bug Tracking', 'UI / UX Validation', 'Cross-browser Test', 'Final QA Report'] },
      { name: 'Standard', price: '₹29,999', period: '', popular: true, features: ['Manual + Automation', 'API Testing', 'Performance Testing', 'Regression Cycles', 'Weekly Status'] },
      { name: 'Full Suite', price: '₹49,999+', period: '', features: ['Security Pen-Testing', 'Load & Stress Test', 'Continuous CI/CD QA', 'Database Validation', 'Dedicated Lead'] },
    ]
  },
  support: {
    title: 'IT Support & Maintenance',
    subtitle: '24/7 Managed Infrastructure',
    tagline: 'Technical Stability',
    desc: 'We provide proactive monitoring and maintenance to ensure your digital ecosystem is always operational, secure, and fast.',
    img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&q=80',
    blueprint: [
      { step: '01', title: 'Real-time Mon.', desc: 'Continuous health checks on servers and databases to identify issues before they occur.', icon: 'fa-heartbeat' },
      { step: '02', title: 'Hardening', desc: 'Regular security patches and firewall optimizations to protect against evolving threats.', icon: 'fa-user-shield' },
      { step: '03', title: 'Data Safety', desc: 'Automated multi-region backups and disaster recovery drills to ensure data persistence.', icon: 'fa-database' },
      { step: '04', title: 'SLA Guarantee', desc: 'Dedicated response times and technical support to keep your business running smoothly.', icon: 'fa-headset' },
    ],
    pricing: [
      { name: 'Essential', price: '₹7,999', period: '/mo', features: ['Weekly Backups', 'Security Updates', 'Bug Fixes (Standard)', 'Email Support', 'Performance Check'] },
      { name: 'Business', price: '₹14,999', period: '/mo', popular: true, features: ['Daily Backups', 'Priority Bug Fixes', '24/7 Monitoring', 'Chat Support', 'Monthly Health Audit'] },
      { name: 'Enterprise', price: '₹29,999', period: '/mo', features: ['Real-time Monitoring', 'Dedicated Engineer', 'Cloud Management', 'Phone Support', 'Disaster Recovery'] },
    ]
  },
  intern: {
    title: 'Internships & Training',
    subtitle: 'Industry-Led Training',
    tagline: 'Future Ready',
    desc: 'Bridge the gap between academia and industry with real-world projects, expert mentorship, and career-launching certifications.',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    blueprint: [
      { step: '01', title: 'Core Theory', desc: 'Deep dive into the fundamental principles of your chosen technology stack with expert guidance.', icon: 'fa-book-reader' },
      { step: '02', title: 'Practical Labs', desc: 'Intensive hands-on coding sessions to apply theoretical knowledge in a controlled environment.', icon: 'fa-laptop-code' },
      { step: '03', title: 'Live Projects', desc: 'Working on real-world industry requirements under the mentorship of senior developers.', icon: 'fa-project-diagram' },
      { step: '04', title: 'Career Readiness', desc: 'Resume building, mock interviews, and certification to bridge the gap to your dream job.', icon: 'fa-user-tie' },
    ],
    pricing: [
      { name: 'Starter', price: '₹5,899', period: ' (incl. GST)', features: ['Basics & Fundamentals', 'Recorded Sessions', 'Weekly Assignments', 'Basic Certification', 'Community Access'] },
      { name: 'Professional', price: '₹17,699', period: ' (incl. GST)', popular: true, features: ['Live Training Sessions', 'Hands-on Projects', 'Industry Certification', 'Code Reviews', 'Resume Building'] },
      { name: 'Advanced Plus', price: '₹29,499', period: ' (incl. GST)', features: ['Live Industry Projects', '1-on-1 Mentorship', 'Interview Preparation', 'Placement Assistance', 'Portfolio Showcase'] },
    ],
    students: [
      { name: 'Tharun', role: 'JAVA Intern', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80' },
      { name: 'Himesh', role: 'JAVA Intern', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
      { name: 'Pavan', role: 'JAVA Intern', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' },
      { name: 'Vamsi', role: 'JAVA Intern', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80' },
      { name: 'Nikilesh', role: 'PYTHON Intern', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80' },
    ]
  }
};

const TABS = [
  { id: 'web', name: 'Web Design' },
  { id: 'webapp', name: 'Web Apps' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'dm', name: 'Marketing' },
  { id: 'uiux', name: 'UI / UX' },
  { id: 'testing', name: 'Testing' },
  { id: 'support', name: 'Support' },
  { id: 'intern', name: 'Internships' },
];

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('type') || 'web';
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const current = SERVICES_CONFIG[activeTab] || SERVICES_CONFIG.web;

  const handleTabChange = (tabId) => {
    setSearchParams({ type: tabId });
    setDropdownOpen(false);
  };

  const getActiveTabName = () => {
    const matched = TABS.find(t => t.id === activeTab);
    return matched ? matched.name : 'Services';
  };

  return (
    <>
      {/* CDN Fonts & Icons needed by PublicNavbar */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />

      <PublicNavbar />

      <style>{`
        .svc-hero { background: linear-gradient(135deg, #092a49 0%, #1e3c72 100%); padding: 80px 30px; text-align: center; }
        .svc-hero h1 { font-family:'Oswald','Outfit',sans-serif; font-size:clamp(2rem,5vw,3rem); color:#fff; font-weight:700; margin-bottom:16px; }
        .svc-hero p { color:rgba(255,255,255,0.8); font-size:17px; max-width:600px; margin:0 auto 16px; }
        .svc-breadcrumb { color:rgba(255,255,255,0.6); font-size:14px; }
        .svc-breadcrumb a { color:#fbcc27; text-decoration:none; }

        .svc-filter-bar { background:#fff; padding:20px 30px; border-bottom:1px solid #eee; position:sticky; top:70px; z-index:90; box-shadow:0 2px 10px rgba(0,0,0,0.06); }
        .svc-filter-inner { max-width:1200px; margin:0 auto; display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
        .svc-filter-btn {
          padding:8px 20px; border-radius:50px; border:2px solid #dde6f5;
          background:#fff; color:#555; font-size:14px; font-weight:600;
          cursor:pointer; transition:all 0.2s; font-family:inherit;
        }
        .svc-filter-btn.active, .svc-filter-btn:hover { background:#092a49; color:#fff; border-color:#092a49; }

        .svc-details-container { padding: 60px 0; background: #f8fafc; }
        
        .hero-glass-container {
          background: #fff; border-radius: 24px; padding: 60px;
          display: flex; align-items: center; justify-content: space-between; gap: 40px;
          max-width: 1200px; margin: 0 auto 50px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border: 1px solid #eee;
        }
        .hero-glass-content { flex: 1; }
        .hero-glass-content span { color: #0796fe; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 10px; }
        .hero-glass-content h1 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; margin-bottom: 20px; }
        .hero-glass-content p { color: #666; font-size: 17px; line-height: 1.7; margin-bottom: 30px; }
        .gold-btn {
          padding: 14px 36px; border-radius: 50px; background: linear-gradient(135deg, #092a49, #1e3c72);
          color: #fff; font-size: 15px; font-weight: 700; border: none; cursor: pointer;
          transition: all 0.3s; font-family: inherit; text-decoration: none; display: inline-block;
        }
        .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(9,42,73,0.3); }
        
        .hero-abstract-art img { max-width: 460px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }

        .execution-model-section { padding: 60px 20px; background: #fff; border-radius: 24px; max-width: 1200px; margin: 0 auto 50px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .section-head { text-align: center; margin-bottom: 40px; }
        .section-head span { color: #0796fe; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
        .section-head h2 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size: 2rem; font-weight: 700; margin-top: 10px; }
        
        .model-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 30px; }
        .model-card { background: #f8fafc; padding: 40px 30px; border-radius: 20px; border: 1px solid #edf2f7; text-align: center; position: relative; transition: all 0.3s; }
        .model-card:hover { transform: translateY(-8px); background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-color: #0796fe; }
        .step-number { position: absolute; top: 15px; right: 20px; font-size: 36px; font-weight: 900; color: #092a49; opacity: 0.05; font-family: 'Oswald', sans-serif; }
        .model-icon-wrapper { width: 70px; height: 70px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 28px; color: #092a49; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .model-card:hover .model-icon-wrapper { background: #092a49; color: #fff; }
        .model-card h4 { font-family:'Oswald','Outfit',sans-serif; font-size: 18px; font-weight: 700; color: #092a49; margin-bottom: 12px; }
        .model-card p { color: #666; font-size: 14px; line-height: 1.6; }

        .pricing-section { padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; }
        .pricing-card-modern {
          background: #fff; border-radius: 24px; padding: 50px 36px; text-align: center;
          border: 1px solid #f0f0f0; transition: all 0.3s; position: relative;
          display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }
        .pricing-card-modern:hover { transform: translateY(-10px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); border-color: #0796fe; }
        .badge-popular { position: absolute; top: 0; right: 0; background: linear-gradient(135deg, #092a49, #1e3c72); color: #fff; padding: 8px 24px; border-radius: 0 24px 0 24px; font-size: 11px; font-weight: 800; letter-spacing: 1px; }
        .pricing-card-modern .price-header { margin-bottom: 30px; }
        .pricing-card-modern .price-header h4 { font-family:'Oswald','Outfit',sans-serif; font-size: 24px; color: #092a49; margin-bottom: 10px; }
        .pricing-card-modern .price-amount { font-size: 42px; font-family: 'Oswald', sans-serif; color: #092a49; display: flex; align-items: center; justify-content: center; gap: 5px; font-weight: 700; }
        .pricing-card-modern .price-amount span { font-size: 18px; color: #888; font-weight: 400; }
        .feature-list { list-style: none; padding: 0; margin: 0 0 35px; text-align: left; flex: 1; }
        .feature-list li { padding: 12px 0; display: flex; align-items: center; gap: 12px; font-size: 15px; color: #555; border-bottom: 1px solid #f9f9f9; }
        .feature-list li i { color: #27ae60; font-size: 16px; }

        .success-stories { padding: 60px 20px; background: #fff; border-radius: 24px; max-width: 1200px; margin: 0 auto 50px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .students-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 30px; }
        .student-card-modern { text-align: center; padding: 20px; border-radius: 20px; background: #f8fafc; border: 1px solid #edf2f7; width: 150px; transition: all 0.3s; }
        .student-card-modern:hover { transform: scale(1.05); box-shadow: 0 10px 25px rgba(0,0,0,0.08); border-color: #0796fe; }
        .student-card-modern img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 12px; border: 3px solid #0796fe; }
        .student-card-modern h5 { font-family:'Oswald','Outfit',sans-serif; font-size: 15px; font-weight: 700; color: #092a49; margin-bottom: 4px; }
        .student-card-modern p { font-size: 11px; color: #888; margin: 0; }

        .mobile-dropdown { display: none; margin: 15px auto; max-width: 90%; position: relative; }
        .dropdown-trigger { width: 100%; padding: 12px 20px; border-radius: 50px; border: 2px solid #dde6f5; background: #fff; color: #092a49; font-size: 15px; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between; align-items: center; }
        .dropdown-menu { position: absolute; top: 105%; left: 0; right: 0; background: #fff; border: 1px solid #edf2f7; border-radius: 18px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 100; overflow: hidden; display: none; }
        .dropdown-menu.open { display: block; }
        .dropdown-item { padding: 12px 20px; display: block; color: #092a49; text-decoration: none; font-weight: 600; font-size: 14px; border-bottom: 1px solid #f8fafc; }
        .dropdown-item.active, .dropdown-item:hover { background-color: #edf2f7; color: #0796fe; }

        @media (max-width: 768px) {
          .svc-filter-bar { display: none; }
          .mobile-dropdown { display: block; }
          .hero-glass-container { flex-direction: column; padding: 40px 25px; text-align: center; }
          .hero-abstract-art { display: none; }
          .pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="svc-hero">
        <h1>Our Services</h1>
        <p>Comprehensive IT solutions designed to accelerate your business growth.</p>
        <div className="svc-breadcrumb"><a href="/">Home</a> › Services</div>
      </div>

      {/* DESKTOP FILTER BAR */}
      <div className="svc-filter-bar">
        <div className="svc-filter-inner">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`svc-filter-btn${activeTab === t.id ? ' active' : ''}`}
              onClick={() => handleTabChange(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE DROPDOWN SELECTOR */}
      <div className="mobile-dropdown">
        <button className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span>{getActiveTabName()}</span>
          <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
        </button>
        <div className={`dropdown-menu${dropdownOpen ? ' open' : ''}`}>
          {TABS.map(t => (
            <a
              key={t.id}
              href="#!"
              className={`dropdown-item${activeTab === t.id ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleTabChange(t.id); }}
            >
              {t.name}
            </a>
          ))}
        </div>
      </div>

      <div className="svc-details-container">
        {/* HERO SECTION */}
        <section className="hero-glass-container">
          <div className="hero-glass-content">
            <span>{current.tagline}</span>
            <h1>{current.subtitle}</h1>
            <p>{current.desc}</p>
            <div className="hero-actions">
              <button
                className="gold-btn"
                onClick={() => navigate(`/contact?service=${encodeURIComponent(current.title)}`)}
              >
                {activeTab === 'intern' ? 'Enroll / Join Program' : 'Start Your Project'}
              </button>
            </div>
          </div>
          <div className="hero-abstract-art">
            <img src={current.img} alt={current.title} />
          </div>
        </section>

        {/* BLUEPRINT / STRATEGIC MODEL */}
        <section className="execution-model-section">
          <div className="section-head">
            <span>The Blueprint</span>
            <h2>{activeTab === 'intern' ? 'Learning & Development Model' : 'Strategic Delivery Model'}</h2>
          </div>

          <div className="model-grid">
            {current.blueprint.map((b, idx) => (
              <div className="model-card" key={idx}>
                <div className="step-number">{b.step}</div>
                <div className="model-icon-wrapper">
                  <i className={`fas ${b.icon}`}></i>
                </div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STUDENT SUCCESS STORIES (FOR INTERNSHIP ONLY) */}
        {activeTab === 'intern' && current.students && (
          <section className="success-stories">
            <div className="section-head">
              <span>Wall of Fame</span>
              <h2>Our Success Stories</h2>
            </div>
            <div className="students-grid">
              {current.students.map((s, idx) => (
                <div className="student-card-modern" key={idx}>
                  <img src={s.img} alt={s.name} />
                  <h5>{s.name}</h5>
                  <p>{s.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PRICING PLANS */}
        <section className="pricing-section">
          <div className="section-head">
            <span>Flexible Plans</span>
            <h2>{activeTab === 'intern' ? 'Certification Programs' : 'Choose Your Scale'}</h2>
          </div>

          <div className="pricing-grid">
            {current.pricing.map((p, idx) => (
              <div className="pricing-card-modern" key={idx}>
                {p.popular && <div className="badge-popular">{activeTab === 'intern' ? 'CAREER TRACK' : 'MOST POPULAR'}</div>}
                <div className="price-header">
                  <h4>{p.name}</h4>
                  <div className="price-amount">
                    {p.price}
                    {p.period && <span>{p.period}</span>}
                  </div>
                </div>
                <ul className="feature-list">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx}>
                      <i className="fas fa-check-circle"></i> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="gold-btn"
                  onClick={() => navigate(`/contact?service=${encodeURIComponent(`${current.title} - ${p.name} Plan`)}`)}
                >
                  {activeTab === 'intern' ? 'Enroll Now' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* ===== FOOTER ===== */}
      <footer style={{ background:'#092a49', color:'#ccc', textAlign:'center', padding:'30px 20px', fontSize:'14px' }}>
        <p style={{ margin:'0 0 8px' }}>
          <a href="/privacy" style={{ color:'#fbcc27', textDecoration:'none', marginRight:'16px' }}>Privacy Policy</a>
          <a href="/terms" style={{ color:'#fbcc27', textDecoration:'none', marginRight:'16px' }}>Terms of Use</a>
          <a href="/refund" style={{ color:'#fbcc27', textDecoration:'none', marginRight:'16px' }}>Refund Policy</a>
          <a href="/contact" style={{ color:'#fbcc27', textDecoration:'none' }}>Contact Us</a>
        </p>
        <p style={{ margin:'0', color:'rgba(255,255,255,0.5)' }}>
          &copy; {new Date().getFullYear()} <a href="https://ygrgobalitservices.com" style={{ color:'#fbcc27', textDecoration:'none' }}>YGR Gobal IT Services Pvt. Ltd.</a> All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default ServicesPage;
