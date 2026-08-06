import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Careers.css';

// ── FALLBACK DATASETS FOR DYNAMIC API RENDERING ───────────────────────
const FALLBACK_JOBS = [
  {
    id: 1,
    title: 'DevOps & Cloud Engineer',
    department: 'Cloud Engineering',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    workMode: 'Work From Office',
    experience: '2–4 Years',
    salary: '₹6–10 LPA',
    vacancies: 2,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform', 'CI/CD'],
    description: 'Design, build, and maintain scalable cloud infrastructure, automated pipelines, and Kubernetes orchestrations.',
    postedDate: '2 Days Ago',
    status: 'Urgent',
    slug: 'devops-cloud-engineer'
  },
  {
    id: 2,
    title: 'Senior Java Backend Engineer',
    department: 'Enterprise Software',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    workMode: 'Hybrid',
    experience: '3–6 Years',
    salary: '₹8–14 LPA',
    vacancies: 4,
    skills: ['Java 17', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Kafka', 'Redis'],
    description: 'Lead backend microservice engineering for high-throughput enterprise financial & healthcare platforms.',
    postedDate: '3 Days Ago',
    status: 'Hiring',
    slug: 'senior-java-backend-engineer'
  },
  {
    id: 3,
    title: 'Full Stack React & Node Developer',
    department: 'Web Applications',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    workMode: 'Work From Office',
    experience: '2–4 Years',
    salary: '₹7–12 LPA',
    vacancies: 3,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL', 'TailwindCSS'],
    description: 'Build modern responsive single-page web applications with seamless REST & GraphQL API integrations.',
    postedDate: '1 Week Ago',
    status: 'Hiring',
    slug: 'full-stack-react-node-developer'
  },
  {
    id: 4,
    title: 'AI / ML Solutions Architect',
    department: 'Artificial Intelligence',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    workMode: 'Hybrid',
    experience: '2–5 Years',
    salary: '₹10–18 LPA',
    vacancies: 1,
    skills: ['Python', 'PyTorch', 'FastAPI', 'LangChain', 'OpenAI API', 'Vector DBs'],
    description: 'Develop custom LLM applications, retrieval-augmented generation (RAG) pipelines, and predictive models.',
    postedDate: 'Just Now',
    status: 'Urgent',
    slug: 'ai-ml-solutions-architect'
  },
  {
    id: 5,
    title: 'QA Automation Lead',
    department: 'Software Quality',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    workMode: 'Work From Office',
    experience: '2–4 Years',
    salary: '₹5–9 LPA',
    vacancies: 2,
    skills: ['Selenium', 'Cypress', 'Java', 'TestNG', 'Postman', 'JMeter'],
    description: 'Write end-to-end automated test suites for web applications, mobile apps, and performance API testing.',
    postedDate: '5 Days Ago',
    status: 'Hiring',
    slug: 'qa-automation-lead'
  },
  {
    id: 6,
    title: 'Cloud Systems & DevOps Intern',
    department: 'Cloud Engineering',
    location: 'Hyderabad',
    employmentType: 'Internship',
    workMode: 'Work From Office',
    experience: '0–1 Year',
    salary: 'Stipend Provided',
    vacancies: 5,
    skills: ['Linux', 'Bash', 'Networking', 'Git', 'Docker', 'AWS Basics'],
    description: 'Hands-on cloud mentorship on AWS deployments, system monitoring, Linux administration, and CI/CD.',
    postedDate: 'Yesterday',
    status: 'Internship',
    slug: 'cloud-systems-intern'
  }
];

const FALLBACK_EMPLOYEES_LEFT = [
  { id: 1, name: 'Pavan', role: 'Java Developer', department: 'Engineering Team', experience: '2 Years', photo: '/media/team/pavan.jpeg' },
  { id: 2, name: 'Himesh Reddy', role: 'Full Stack Engineer', department: 'Web Solutions', experience: '3 Years', photo: '/media/team/reddy_odFoq3p.jpeg' },
  { id: 3, name: 'Tharun', role: 'Backend Architect', department: 'Enterprise Systems', experience: '4 Years', photo: '/media/team/tharun.jpeg' }
];

const FALLBACK_EMPLOYEES_RIGHT = [
  { id: 4, name: 'Vamsi', role: 'Cloud Engineer', department: 'DevOps & Cloud', experience: '3 Years', photo: '/media/team/vamsi.jpeg' },
  { id: 5, name: 'Nikilesh', role: 'Python Developer', department: 'AI & Data Science', experience: '2 Years', photo: '/media/team/sai.nikilesh.jpg.jpeg' },
  { id: 6, name: 'Anil Kumar', role: 'QA Automation Lead', department: 'Software Quality', experience: '5 Years', photo: '/media/team/anil.kumar.jpg.jpeg' }
];

const WHY_JOIN_FEATURES = [
  { icon: 'fa-chart-line', title: 'Rapid Career Growth', desc: 'Structured promotions, clear career paths, and leadership opportunities for high performers.' },
  { icon: 'fa-microchip', title: 'Latest Technologies', desc: 'Work hands-on with Cloud, Microservices, AI/ML models, React, and DevOps tooling.' },
  { icon: 'fa-globe', title: 'Global Enterprise Projects', desc: 'Deliver mission-critical software for global enterprise clients across North America & Europe.' },
  { icon: 'fa-graduation-cap', title: 'Continuous Learning', desc: 'Access paid courses, certifications, technical workshops, and senior engineering mentorship.' },
  { icon: 'fa-lightbulb', title: 'Innovation First Culture', desc: 'Encouraging technical experimentation, hackathons, and creative solution architecture.' },
  { icon: 'fa-people-group', title: 'Supportive Team Environment', desc: 'Collaborative, transparent, and respectful workplace built on mutual trust and growth.' },
  { icon: 'fa-certificate', title: 'Certification Support', desc: '100% reimbursement for AWS, Java, Cloud, and Agile professional certifications.' },
  { icon: 'fa-trophy', title: 'Performance Rewards', desc: 'Quarterly bonuses, project completion rewards, and annual merit salary reviews.' }
];

const EMPLOYEE_BENEFITS = [
  { icon: 'fa-money-bill-trend-up', title: 'Competitive Compensation', desc: 'Above-market salary packages with transparent annual reviews.' },
  { icon: 'fa-heart-pulse', title: 'Comprehensive Medical', desc: 'Health insurance coverage for employees and immediate family members.' },
  { icon: 'fa-umbrella-beach', title: 'Paid Time Off & Leaves', desc: 'Generous annual leave, festive holidays, sick leave, and parental leaves.' },
  { icon: 'fa-laptop-code', title: 'Learning Allowance', desc: 'Annual budget allocated for books, courses, conferences, and tech gear.' },
  { icon: 'fa-award', title: 'Certification Sponsorship', desc: 'Full financial support for AWS, GCP, Azure, Oracle, and Scrum exams.' },
  { icon: 'fa-clock', title: 'Flexible Work Timings', desc: 'Core operational hours with flexible check-in windows & hybrid options.' },
  { icon: 'fa-gift', title: 'Quarterly Performance Bonuses', desc: 'Financial rewards celebrating milestone deliveries and outstanding effort.' },
  { icon: 'fa-rocket', title: 'Accelerated Mentorship', desc: 'Direct 1-on-1 guidance from principal architects and tech leads.' }
];

const HIRING_PROCESS_STEPS = [
  { num: '01', title: 'Application', desc: 'Submit your resume & technical profile online.', icon: 'fa-file-signature' },
  { num: '02', title: 'Screening', desc: 'Quick introductory call with our Talent team.', icon: 'fa-user-check' },
  { num: '03', title: 'Tech Interview', desc: 'In-depth problem solving & architecture review.', icon: 'fa-code' },
  { num: '04', title: 'HR Discussion', desc: 'Cultural fitment, team alignment & offer terms.', icon: 'fa-comments' },
  { num: '05', title: 'Offer Letter', desc: 'Formal offer roll-out with competitive perks.', icon: 'fa-file-contract' },
  { num: '06', title: 'Welcome to YGR', desc: 'Smooth onboarding & dedicated buddy system.', icon: 'fa-handshake' }
];

const TECH_ECOSYSTEM = [
  { name: 'Java', icon: 'fa-java', category: 'Backend' },
  { name: 'Spring Boot', icon: 'fa-leaf', category: 'Backend' },
  { name: 'React', icon: 'fa-react', category: 'Frontend' },
  { name: 'Angular', icon: 'fa-angular', category: 'Frontend' },
  { name: 'Node.js', icon: 'fa-node-js', category: 'Backend' },
  { name: 'Python', icon: 'fa-python', category: 'AI & Data' },
  { name: 'AWS Cloud', icon: 'fa-aws', category: 'Cloud' },
  { name: 'Docker', icon: 'fa-docker', category: 'DevOps' },
  { name: 'Kubernetes', icon: 'fa-cubes', category: 'DevOps' },
  { name: 'Azure', icon: 'fa-cloud', category: 'Cloud' },
  { name: 'AI & LLMs', icon: 'fa-brain', category: 'Artificial Intelligence' },
  { name: 'PostgreSQL', icon: 'fa-database', category: 'Database' }
];

const FALLBACK_INTERNSHIPS = [
  {
    id: 1,
    title: 'Java Enterprise Internship',
    slug: 'java-enterprise-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Java 17, Spring Boot, REST APIs, SQL',
    description: 'Hands-on enterprise Java software development program. Learn to architect scalable backends and microservices.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    status: 'Active',
    displayOrder: 1,
    applicationFormId: '1'
  },
  {
    id: 2,
    title: 'Python & AI Solutions Internship',
    slug: 'python-ai-solutions-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Python, FastAPI, Pandas, OpenAI APIs',
    description: 'Learn modern Python engineering, predictive analytics, custom LLMs, and RAG pipelines.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    status: 'Active',
    displayOrder: 2,
    applicationFormId: '2'
  },
  {
    id: 3,
    title: 'Frontend Engineering Internship',
    slug: 'frontend-engineering-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'React, TypeScript, CSS3, Redux',
    description: 'Master modern frontend development. Build fast single-page applications and responsive interfaces.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
    status: 'Active',
    displayOrder: 3,
    applicationFormId: '3'
  },
  {
    id: 4,
    title: 'UI/UX Product Design Internship',
    slug: 'ui-ux-product-design-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Figma, User Research, Wireframing',
    description: 'Design intuitive digital product experiences. Conduct user research and build design systems.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    status: 'Active',
    displayOrder: 4,
    applicationFormId: '4'
  },
  {
    id: 5,
    title: 'Cloud & DevOps Internship',
    slug: 'cloud-devops-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'AWS, Linux, Docker, Bash, CI/CD',
    description: 'Gain practical experience in cloud infrastructure automation, container orchestration, and CI/CD.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80',
    status: 'Active',
    displayOrder: 5,
    applicationFormId: '5'
  },
  {
    id: 6,
    title: 'Software QA Automation Internship',
    slug: 'software-quality-automation-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Selenium, Postman, Java, Test Automation',
    description: 'Learn automated software testing methodologies. Write test scripts and API automation suites.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    status: 'Active',
    displayOrder: 6,
    applicationFormId: '6'
  }
];

const FAQ_ITEMS = [
  {
    q: 'What is the interview process like at YGR Global IT Services?',
    a: 'Our interview process typically consists of 3 stages: an initial recruiter screening call, a technical evaluation (coding/architecture session), and a final HR discussion covering role alignment and compensation.'
  },
  {
    q: 'Do you offer remote or hybrid work options?',
    a: 'Yes! Depending on the role and project requirements, we offer flexible work options including full in-office, hybrid model, and remote opportunities for senior positions.'
  },
  {
    q: 'Does YGR provide support for professional certifications?',
    a: 'Absolutely. We provide 100% reimbursement for approved technical certifications including AWS, Spring Certified Professional, PMP, Scrum Master, and Cloud Architecture exams.'
  },
  {
    q: 'Are freshers and interns hired into full-time roles?',
    a: 'Yes. Our Internship Program is a direct talent pipeline into full-time Software Engineer and Associate Analyst roles upon successful completion of the training period.'
  },
  {
    q: 'What technologies are primarily used in projects?',
    a: 'We work on enterprise tech stacks including Java Spring Boot, React, Node.js, Python, AWS, Docker, Kubernetes, Microservices, and AI/ML LLM integrations.'
  }
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Anil Kumar',
    role: 'Senior Java Developer',
    experience: '3+ Years at YGR',
    review: 'Working at YGR Global IT Services has allowed me to design enterprise microservices at scale. The engineering leadership is deeply supportive of learning new technologies.',
    photo: '/media/team/anil.kumar.jpg.jpeg'
  },
  {
    id: 2,
    name: 'Reddy Himesh',
    role: 'Full Stack Lead',
    experience: '4+ Years at YGR',
    review: 'The collaborative culture and client exposure here are exceptional. Every project presents unique engineering challenges that keep work exciting every day.',
    photo: '/media/team/reddy_odFoq3p.jpeg'
  },
  {
    id: 3,
    name: 'Nikilesh Sai',
    role: 'Cloud & AI Engineer',
    experience: '2+ Years at YGR',
    review: 'From day one, I was given ownership of cloud architecture and AI model deployments. The mentorship from principal architects accelerated my career growth.',
    photo: '/media/team/sai.nikilesh.jpg.jpeg'
  }
];

const FALLBACK_GALLERY = [
  { id: 1, title: 'Annual Tech Hackathon 2026', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', tag: 'Events' },
  { id: 2, title: 'Engineering Team Workshop', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', tag: 'Training' },
  { id: 3, title: 'Quarterly Rewards & Recognition', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80', tag: 'Celebration' },
  { id: 4, title: 'Annual Outing & Team Building', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', tag: 'Outing' }
];

const Careers = () => {
  const [jobs, setJobs] = useState(FALLBACK_JOBS);
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [galleryImages, setGalleryImages] = useState(FALLBACK_GALLERY);
  const [internshipsList, setInternshipsList] = useState(FALLBACK_INTERNSHIPS);
  const [leftEmployees, setLeftEmployees] = useState(FALLBACK_EMPLOYEES_LEFT);
  const [rightEmployees, setRightEmployees] = useState(FALLBACK_EMPLOYEES_RIGHT);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedEmpType, setSelectedEmpType] = useState('All');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Lightbox Modal State
  const [lightboxImg, setLightboxImg] = useState(null);

  const navigate = useNavigate();

  // Animation Refs
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    // Fetch dynamic jobs
    fetch('/api/public/jobs/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setJobs(data);
      })
      .catch((err) => console.log('Careers jobs API:', err));

    // Fetch dynamic internships
    fetch('/api/public/internships/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setInternshipsList(data);
      })
      .catch((err) => console.log('Careers internships API:', err));

    // Fetch dynamic testimonials
    fetch('/api/public/testimonials/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch((err) => console.log('Careers testimonials API:', err));

    // Fetch dynamic gallery events
    fetch('/api/public/events/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setGalleryImages(data);
      })
      .catch((err) => console.log('Careers events API:', err));

    // Fetch dynamic team
    fetch('/api/public/team/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mid = Math.ceil(data.length / 2);
          setLeftEmployees(data.slice(0, mid));
          setRightEmployees(data.slice(mid));
        }
      })
      .catch((err) => console.log('Careers team API:', err));
  }, []);

  // Filter Jobs Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.skills && Array.isArray(job.skills) && job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesMode = selectedWorkMode === 'All' || job.workMode === selectedWorkMode;
    const matchesType = selectedEmpType === 'All' || job.employmentType === selectedEmpType;

    return matchesSearch && matchesDept && matchesMode && matchesType;
  });

  const getStatusClass = (statusStr) => {
    if (!statusStr) return 'hiring';
    const s = statusStr.toLowerCase();
    if (s.includes('urgent')) return 'urgent';
    if (s.includes('intern')) return 'internship';
    return 'hiring';
  };

  const getStatusSymbol = (statusStr) => {
    if (!statusStr) return '🟢';
    const s = statusStr.toLowerCase();
    if (s.includes('urgent')) return '🟡';
    if (s.includes('intern')) return '🔵';
    return '🟢';
  };

  return (
    <div className="new-enterprise-careers-page">
      {/* ── SECTION 1: PREMIUM CAREER HERO ── */}
      <section className="n-careers-hero-section" ref={heroRef}>
        <div className="n-hero-bg-canvas">
          <div className="n-hero-blueprint-grid"></div>
          <div className="n-hero-radial-glow blue"></div>
          <div className="n-hero-radial-glow green"></div>
        </div>

        <div className="n-hero-container">
          <div className="n-hero-two-column">
            {/* Left Hero Column */}
            <motion.div
              className="n-hero-left-content"
              initial={{ opacity: 0, x: -35 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
              transition={{ duration: 0.8 }}
            >
              <div className="n-careers-pill-eyebrow">
                <span className="pill-pulse-dot"></span>
                <span className="pill-text">CAREERS AT YGR GOBAL IT SERVICES</span>
              </div>

              <h1 className="n-hero-main-title">
                Build Technology. <br />
                <span className="n-highlight-green">Build Your Future.</span>
              </h1>

              <p className="n-hero-subtitle">
                Join one of India's growing software engineering teams and work on enterprise applications, AI solutions, cloud platforms, and digital transformation projects for global clients.
              </p>

              <div className="n-hero-cta-group">
                <a href="#open-positions" className="n-btn-primary">
                  <span>Explore Open Positions</span>
                  <i className="fas fa-arrow-right"></i>
                </a>

                <Link to="/team" className="n-btn-secondary">
                  <span>Meet Our Team</span>
                </Link>
              </div>

              {/* Floating Stat Badges Row */}
              <div className="n-hero-stats-row">
                <div className="stat-card">
                  <span className="stat-num">250+</span>
                  <span className="stat-lbl">Projects Delivered</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">99%</span>
                  <span className="stat-lbl">Client Retention</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">8+ Yrs</span>
                  <span className="stat-lbl">Industry Excellence</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">24×7</span>
                  <span className="stat-lbl">Global Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Column: Premium Interactive Illustration Stack */}
            <motion.div
              className="n-hero-right-illustration"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="n-tech-mesh-card">
                <div className="mesh-card-header">
                  <div className="window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="window-title">ygr-engineering-stack.v2</span>
                </div>

                <div className="mesh-card-body">
                  <div className="code-snippet-box">
                    <code>
                      <span className="c-keyword">class</span> <span className="c-class">YgrEngineer</span> {'{'} <br />
                      &nbsp;&nbsp;<span className="c-prop">focus</span>: <span className="c-str">'Enterprise Scaling'</span>, <br />
                      &nbsp;&nbsp;<span className="c-prop">techStack</span>: [<span className="c-str">'Java'</span>, <span className="c-str">'React'</span>, <span className="c-str">'AWS'</span>, <span className="c-str">'AI/ML'</span>], <br />
                      &nbsp;&nbsp;<span className="c-prop">growth</span>: <span className="c-num">100</span>% <br />
                      {'}'}
                    </code>
                  </div>

                  <div className="floating-tech-badges">
                    <div className="floating-badge b-1">
                      <i className="fab fa-java"></i>
                      <span>Spring Boot Microservices</span>
                    </div>

                    <div className="floating-badge b-2">
                      <i className="fab fa-aws"></i>
                      <span>AWS Cloud Architecture</span>
                    </div>

                    <div className="floating-badge b-3">
                      <i className="fas fa-brain"></i>
                      <span>AI / LLM Integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY JOIN YGR GOBAL IT SERVICES ── */}
      <section className="n-why-join-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">WHY YGR GOBAL IT SERVICES</span>
            </div>
            <h2 className="n-section-title">
              Why Build Your Career <span className="n-highlight-green">With Us?</span>
            </h2>
            <p className="n-section-desc">
              We empower software engineers and innovators to solve complex digital challenges while building long-term, rewarding careers.
            </p>
          </div>

          <div className="n-why-join-grid">
            {WHY_JOIN_FEATURES.map((item, idx) => (
              <motion.div
                key={idx}
                className="n-feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="feature-icon-wrapper">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="feature-card-title">{item.title}</h3>
                <p className="feature-card-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: EMPLOYEE BENEFITS ── */}
      <section className="n-benefits-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">COMPREHENSIVE PERKS</span>
            </div>
            <h2 className="n-section-title">
              Designed for Your <span className="n-highlight-green">Wellbeing & Growth</span>
            </h2>
            <p className="n-section-desc">
              We invest in your financial security, continuous learning, work-life balance, and career satisfaction.
            </p>
          </div>

          <div className="n-benefits-grid">
            {EMPLOYEE_BENEFITS.map((b, idx) => (
              <div key={idx} className="n-benefit-card">
                <div className="benefit-icon-ring">
                  <i className={`fas ${b.icon}`}></i>
                </div>
                <div className="benefit-content">
                  <h4 className="benefit-title">{b.title}</h4>
                  <p className="benefit-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LIFE AT YGR (DYNAMIC GALLERY CAROUSEL) ── */}
      <section className="n-life-at-ygr-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">COMPANY CULTURE</span>
            </div>
            <h2 className="n-section-title">
              Life at <span className="n-highlight-green">YGR Global IT Services</span>
            </h2>
            <p className="n-section-desc">
              A glimpse into our collaborative team events, engineering workshops, hackathons, and celebrations.
            </p>
          </div>

          <div className="n-gallery-grid">
            {galleryImages.map((gItem, idx) => (
              <div
                key={gItem.id || idx}
                className="n-gallery-card"
                onClick={() => setLightboxImg(gItem.image || gItem.src)}
              >
                <img src={gItem.image || gItem.src} alt={gItem.title || 'Life at YGR'} />
                <div className="gallery-overlay">
                  <span className="gallery-tag">{gItem.tag || 'Culture'}</span>
                  <h4 className="gallery-title">{gItem.title}</h4>
                  <span className="gallery-zoom-icon"><i className="fas fa-expand"></i></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CURRENT OPEN POSITIONS (DYNAMIC FILTERS) ── */}
      <section className="n-open-positions-section" id="open-positions">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">CAREER OPPORTUNITIES</span>
            </div>
            <h2 className="n-section-title">
              Current Open <span className="n-highlight-green">Positions</span>
            </h2>
            <p className="n-section-desc">
              Explore active job openings and find your next milestone at YGR Global IT Services.
            </p>
          </div>

          {/* Interactive Search & Filter Bar */}
          <div className="n-jobs-filter-bar">
            {/* Search Input */}
            <div className="filter-input-wrap">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search job title, skills, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Department Dropdown */}
            <select
              className="filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Cloud Engineering">Cloud Engineering</option>
              <option value="Enterprise Software">Enterprise Software</option>
              <option value="Web Applications">Web Applications</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Software Quality">Software Quality</option>
            </select>

            {/* Work Mode Dropdown */}
            <select
              className="filter-select"
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
            >
              <option value="All">All Work Modes</option>
              <option value="Work From Office">Work From Office</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>

            {/* Employment Type */}
            <select
              className="filter-select"
              value={selectedEmpType}
              onChange={(e) => setSelectedEmpType(e.target.value)}
            >
              <option value="All">All Job Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Dynamic 3-Column Jobs Grid */}
          <div className="n-jobs-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => {
                const statusClass = getStatusClass(job.status);
                const statusSymbol = getStatusSymbol(job.status);
                const skillsList = Array.isArray(job.skills)
                  ? job.skills
                  : typeof job.skills === 'string'
                  ? job.skills.split(',').map((s) => s.trim())
                  : [];

                return (
                  <motion.div
                    key={job.id || job.slug || idx}
                    className="n-job-card"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                  >
                    <div className="job-card-top-head">
                      <span className="job-dept-name">{job.department || 'Engineering'}</span>
                      <div className={`job-status-badge ${statusClass}`}>
                        <span>{statusSymbol}</span>
                        <span>{job.status || 'Hiring'}</span>
                      </div>
                    </div>

                    <h3 className="job-card-title">{job.title}</h3>
                    <p className="job-card-summary">{job.description}</p>

                    {/* Meta Details Grid */}
                    <div className="job-meta-grid">
                      <div className="meta-chip">
                        <i className="fas fa-location-dot"></i>
                        <span>{job.location ? job.location.split(',')[0].trim() : 'Hyderabad'}</span>
                      </div>
                      <div className="meta-chip">
                        <i className="fas fa-briefcase"></i>
                        <span>{job.employmentType || 'Full Time'}</span>
                      </div>
                      <div className="meta-chip">
                        <i className="fas fa-building"></i>
                        <span>{job.workMode || 'Work From Office'}</span>
                      </div>
                      <div className="meta-chip">
                        <i className="fas fa-hourglass-half"></i>
                        <span>{job.experience || '2–4 Yrs'}</span>
                      </div>
                      <div className="meta-chip">
                        <i className="fas fa-indian-rupee-sign"></i>
                        <span>{job.salary || 'Best in Industry'}</span>
                      </div>
                      <div className="meta-chip">
                        <i className="fas fa-users"></i>
                        <span>{job.vacancies ? `${job.vacancies} Vacancies` : 'Multiple'}</span>
                      </div>
                    </div>

                    {/* Skill Badges */}
                    {skillsList.length > 0 && (
                      <div className="job-skills-row">
                        {skillsList.map((skill, sIdx) => (
                          <span key={sIdx} className="skill-chip">{skill}</span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="job-card-footer">
                      <span className="posted-lbl"><i className="fas fa-clock"></i> Posted {job.postedDate || 'Recently'}</span>

                      <div className="job-btn-group">
                        <button
                          type="button"
                          className="btn-view-details"
                          onClick={() => navigate('/vacancies')}
                        >
                          Details
                        </button>
                        <Link
                          to="/legacy/exampages/job_application"
                          className="btn-apply-now"
                        >
                          Apply Now <i className="fas fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="no-jobs-box">
                <i className="fas fa-search"></i>
                <h3>No Open Positions Found</h3>
                <p>Try resetting your search filters or check back soon for new openings.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: HIRING PROCESS ── */}
      <section className="n-hiring-process-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">TRANSPARENT RECRUITMENT</span>
            </div>
            <h2 className="n-section-title">
              Our <span className="n-highlight-green">Hiring Process</span>
            </h2>
            <p className="n-section-desc">
              A smooth, transparent 6-step hiring experience designed to evaluate mutual technical and cultural fit.
            </p>
          </div>

          <div className="n-timeline-track">
            {HIRING_PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="timeline-step-card">
                <div className="step-number-ring">
                  <span>{step.num}</span>
                </div>
                <div className="step-icon-box">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TECHNOLOGIES WE WORK WITH ── */}
      <section className="n-tech-ecosystem-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">MODERN STACK</span>
            </div>
            <h2 className="n-section-title">
              Technologies <span className="n-highlight-green">We Work With</span>
            </h2>
            <p className="n-section-desc">
              We build enterprise solutions using battle-tested frameworks, cloud platforms, and modern AI architectures.
            </p>
          </div>

          <div className="n-tech-grid">
            {TECH_ECOSYSTEM.map((tech, idx) => (
              <div key={idx} className="n-tech-card">
                <i className={`fab ${tech.icon} tech-icon`}></i>
                <span className="tech-name">{tech.name}</span>
                <span className="tech-category">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: DYNAMIC EMPLOYEE TESTIMONIALS ── */}
      <section className="n-testimonials-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">EMPLOYEE STORIES</span>
            </div>
            <h2 className="n-section-title">
              Hear From <span className="n-highlight-green">Our Engineers</span>
            </h2>
            <p className="n-section-desc">
              Real stories from team members building their careers at YGR Global IT Services.
            </p>
          </div>

          <div className="n-testimonials-grid">
            {testimonials.map((item, idx) => (
              <div key={item.id || idx} className="n-testimonial-card">
                <i className="fas fa-quote-left quote-mark"></i>
                <p className="review-text">"{item.review || item.content}"</p>
                <div className="author-row">
                  <img src={item.photo || item.image || '/images/placeholder.jpg'} alt={item.name} />
                  <div className="author-meta">
                    <h4 className="author-name">{item.name}</h4>
                    <span className="author-role">{item.role || item.designation}</span>
                    <span className="author-exp">{item.experience || 'Team Member'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: DYNAMIC INTERNSHIP PROGRAM ── */}
      <section className="n-internship-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">EARLY CAREER PIPELINE</span>
            </div>
            <h2 className="n-section-title">
              Global Internship <span className="n-highlight-green">& Freshers Program</span>
            </h2>
            <p className="n-section-desc">
              Kickstart your tech career with real-world industry projects, senior mentorship, and full-time hiring pathways.
            </p>
          </div>

          <div className="n-internships-grid">
            {internshipsList.map((prog, idx) => {
              const itemSlug = prog.slug || prog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              const formId = prog.applicationFormId || prog.id;
              const applyUrl = `/register-internship?course_id=${formId}&title=${encodeURIComponent(prog.title)}`;

              return (
                <div key={prog.id || idx} className="n-intern-card">
                  <div className="intern-card-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h3 className="intern-title">{prog.title}</h3>
                  <div className="intern-meta-badges">
                    <span className="badge-item"><i className="fas fa-clock"></i> {prog.duration || '6 Months'}</span>
                    <span className="badge-item"><i className="fas fa-certificate"></i> {prog.certificate || 'Industry Certified'}</span>
                    <span className="badge-item"><i className="fas fa-wallet"></i> {prog.stipend || 'Stipend Included'}</span>
                  </div>
                  <p className="intern-skills"><strong>Skills:</strong> {prog.skills || 'Modern Tech Stack'}</p>

                  <div className="intern-btn-group" style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <Link to={`/internships/${itemSlug}`} className="btn-intern-details" style={{ flex: 1, height: '42px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#2D4A6D', fontWeight: 700, borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '0.84rem' }}>
                      Explore Program
                    </Link>
                    <a href={applyUrl} className="btn-intern-apply" style={{ flex: 1.2, height: '42px', background: '#5E9133', color: '#FFFFFF', fontWeight: 700, borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.84rem' }}>
                      Apply Now <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) ── */}
      <section className="n-faq-section">
        <div className="n-section-container">
          <div className="n-section-header">
            <div className="n-careers-pill-eyebrow">
              <span className="pill-pulse-dot"></span>
              <span className="pill-text">GOT QUESTIONS?</span>
            </div>
            <h2 className="n-section-title">
              Frequently Asked <span className="n-highlight-green">Questions</span>
            </h2>
            <p className="n-section-desc">
              Everything you need to know about our recruitment process, culture, and benefits.
            </p>
          </div>

          <div className="n-faq-accordion-wrapper">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <i className={`fas fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── LIGHTBOX MODAL FOR GALLERY ── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxImg} alt="Enlarged gallery view" />
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxImg(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
