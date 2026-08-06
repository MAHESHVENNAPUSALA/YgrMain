import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './InternshipDetail.css';

const FALLBACK_INTERNSHIPS = [
  {
    id: 1,
    title: 'Java Enterprise Internship',
    slug: 'java-enterprise-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Java 17, Spring Boot, REST APIs, SQL, Hibernate, Microservices',
    description: 'Hands-on enterprise Java software development program. Learn to architect scalable backends, microservices, and database systems with industry leads.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
    status: 'Active',
    displayOrder: 1,
    applicationFormId: '1',
    syllabus: 'Module 1: Advanced Core Java 17\nModule 2: Spring Boot & Spring Data JPA\nModule 3: RESTful Web Services & Microservices\nModule 4: PostgreSQL & Database Optimization\nModule 5: Real-World Enterprise Capstone Project'
  },
  {
    id: 2,
    title: 'Python & AI Solutions Internship',
    slug: 'python-ai-solutions-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Python, FastAPI, Pandas, OpenAI APIs, PyTorch, LangChain',
    description: 'Learn modern Python engineering, predictive analytics, custom LLM fine-tuning, and retrieval-augmented generation (RAG) pipelines.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
    status: 'Active',
    displayOrder: 2,
    applicationFormId: '2',
    syllabus: 'Module 1: Python Data Science Foundations\nModule 2: FastAPI & REST Web Frameworks\nModule 3: Neural Networks & PyTorch Fundamentals\nModule 4: Large Language Models & OpenAI Integrations\nModule 5: End-to-End AI Production System'
  },
  {
    id: 3,
    title: 'Frontend Engineering Internship',
    slug: 'frontend-engineering-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'React, TypeScript, Next.js, Redux Toolkit, CSS3, Vite',
    description: 'Master modern frontend development. Build fast single-page applications, design systems, and responsive user interfaces.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80',
    status: 'Active',
    displayOrder: 3,
    applicationFormId: '3',
    syllabus: 'Module 1: Modern JavaScript ES6+ & TypeScript\nModule 2: React Core & Component Architecture\nModule 3: State Management with Redux Toolkit\nModule 4: Next.js & Server Side Rendering\nModule 5: Production Build Optimization'
  },
  {
    id: 4,
    title: 'UI/UX Product Design Internship',
    slug: 'ui-ux-product-design-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Figma, User Research, Wireframing, Prototyping, Design Systems',
    description: 'Design intuitive digital product experiences. Conduct user research, construct wireframes, and build design systems in Figma.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    status: 'Active',
    displayOrder: 4,
    applicationFormId: '4',
    syllabus: 'Module 1: UX Research & User Persona Mapping\nModule 2: Information Architecture & Wireframing\nModule 3: Figma Prototyping & Component Libraries\nModule 4: Design Systems & Design-to-Dev Handoff\nModule 5: Live App Redesign Capstone'
  },
  {
    id: 5,
    title: 'Cloud & DevOps Internship',
    slug: 'cloud-devops-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'AWS, Linux, Docker, Bash, Terraform, CI/CD Pipelines',
    description: 'Gain practical experience in cloud infrastructure automation, container orchestration, Linux administration, and CI/CD pipelines.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&q=80',
    status: 'Active',
    displayOrder: 5,
    applicationFormId: '5',
    syllabus: 'Module 1: Linux Administration & Shell Scripting\nModule 2: AWS Cloud Core Services (EC2, S3, RDS, IAM)\nModule 3: Containerization with Docker & Compose\nModule 4: Infrastructure as Code (Terraform)\nModule 5: GitHub Actions Automated CI/CD'
  },
  {
    id: 6,
    title: 'Software Quality Automation Internship',
    slug: 'software-quality-automation-internship',
    duration: '6 Months',
    certificate: 'Industry Certified',
    stipend: 'Stipend Included',
    skills: 'Selenium, Postman, Java, Cypress, TestNG, JIRA',
    description: 'Learn automated software testing methodologies. Write test scripts, API testing collections, and integrate automated quality checks.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    status: 'Active',
    displayOrder: 6,
    applicationFormId: '6',
    syllabus: 'Module 1: Software Testing Fundamentals & Test Case Design\nModule 2: API Contract Testing with Postman\nModule 3: Web Automation with Selenium WebDriver & Java\nModule 4: Cypress Modern End-to-End Testing\nModule 5: CI/CD Test Pipeline Execution'
  }
];

const InternshipDetail = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/public/internships/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const match = data.find(
            (item) =>
              (item.slug && item.slug.toLowerCase() === slug.toLowerCase()) ||
              String(item.id) === String(slug) ||
              item.title.toLowerCase().replace(/\s+/g, '-').includes(slug.toLowerCase())
          );
          if (match) {
            setProgram(match);
            return;
          }
        }
        // Fallback search
        const fbMatch = FALLBACK_INTERNSHIPS.find(
          (item) =>
            item.slug.toLowerCase() === slug.toLowerCase() ||
            String(item.id) === String(slug) ||
            item.title.toLowerCase().replace(/\s+/g, '-').includes(slug.toLowerCase())
        );
        setProgram(fbMatch || FALLBACK_INTERNSHIPS[0]);
      })
      .catch(() => {
        const fbMatch = FALLBACK_INTERNSHIPS.find(
          (item) => item.slug.toLowerCase() === slug.toLowerCase() || String(item.id) === String(slug)
        );
        setProgram(fbMatch || FALLBACK_INTERNSHIPS[0]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="internship-detail-page loading-state">
        <p>Loading program details...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="internship-detail-page error-state">
        <h2>Internship Program Not Found</h2>
        <Link to="/global-internships" className="btn-back">
          ← Back to All Internships
        </Link>
      </div>
    );
  }

  const applyUrl = `/register-internship?course_id=${program.applicationFormId || program.id}&title=${encodeURIComponent(program.title)}`;

  return (
    <div className="internship-detail-page">
      {/* Hero Banner */}
      <section className="detail-hero-section">
        <div className="detail-bg-canvas">
          <img src={program.image || program.bannerImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80'} alt={program.title} className="detail-hero-banner-img" />
          <div className="detail-hero-overlay"></div>
        </div>

        <div className="detail-hero-container">
          <Link to="/careers" className="btn-back-link">
            <i className="fas fa-arrow-left"></i> Back to Careers
          </Link>

          <div className="detail-badge-row">
            <span className="badge-pill green">{program.duration || '6 Months'}</span>
            <span className="badge-pill blue">{program.certificate || 'Industry Certified'}</span>
            <span className="badge-pill gold">{program.stipend || 'Stipend Included'}</span>
          </div>

          <h1 className="detail-program-title">{program.title}</h1>
          <p className="detail-program-desc">{program.description}</p>

          <div className="detail-cta-bar">
            <a href={applyUrl} className="btn-apply-primary">
              <span>Apply for this Program</span>
              <i className="fas fa-arrow-right"></i>
            </a>

            <a href="#syllabus" className="btn-syllabus-secondary">
              <span>View Syllabus</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="detail-main-content-section">
        <div className="detail-content-container">
          <div className="detail-grid">
            {/* Left Content Column */}
            <div className="detail-left-col">
              {/* Program Overview */}
              <div className="content-box">
                <h2>Program Overview</h2>
                <p>{program.description}</p>
              </div>

              {/* Skills Learned */}
              <div className="content-box">
                <h2>Skills & Technologies Covered</h2>
                <div className="skills-tags-wrapper">
                  {typeof program.skills === 'string'
                    ? program.skills.split(',').map((skill, idx) => (
                        <span key={idx} className="skill-tag-pill">
                          {skill.trim()}
                        </span>
                      ))
                    : Array.isArray(program.skills)
                    ? program.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag-pill">
                          {skill}
                        </span>
                      ))
                    : null}
                </div>
              </div>

              {/* Syllabus Timeline */}
              {program.syllabus && (
                <div className="content-box" id="syllabus">
                  <h2>Curriculum & Syllabus Modules</h2>
                  <div className="syllabus-modules-list">
                    {program.syllabus.split('\n').map((module, idx) => (
                      <div key={idx} className="syllabus-module-card">
                        <span className="module-idx">0{idx + 1}</span>
                        <span className="module-text">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Column */}
            <div className="detail-right-sidebar">
              <div className="sidebar-sticky-card">
                <h3>Program Highlights</h3>

                <div className="highlight-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Duration</strong>
                    <span>{program.duration || '6 Months'}</span>
                  </div>
                </div>

                <div className="highlight-item">
                  <i className="fas fa-certificate"></i>
                  <div>
                    <strong>Certification</strong>
                    <span>{program.certificate || 'Industry Recognized'}</span>
                  </div>
                </div>

                <div className="highlight-item">
                  <i className="fas fa-wallet"></i>
                  <div>
                    <strong>Financial Support</strong>
                    <span>{program.stipend || 'Stipend Included'}</span>
                  </div>
                </div>

                <div className="highlight-item">
                  <i className="fas fa-user-tie"></i>
                  <div>
                    <strong>Mentorship</strong>
                    <span>1-on-1 Senior Developer Guide</span>
                  </div>
                </div>

                <a href={applyUrl} className="btn-apply-full">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternshipDetail;
