import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import './Privacy.css';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | YGR Gobal IT Services";
  }, []);

  const handlePrint = (e) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="privacy-page-wrapper">
      {/* ── HERO BANNER ── */}
      <section className="privacy-hero">
        <div className="privacy-hero-bg-glow"></div>
        <div className="privacy-hero-content">
          <nav className="privacy-breadcrumbs" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME || "/"}>Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span>Privacy Policy</span>
          </nav>

          <div className="privacy-hero-badge">
            <i className="fas fa-shield-alt"></i> Enterprise Data Protection
          </div>

          <h1 className="privacy-hero-title">Privacy Policy</h1>
          <p className="privacy-hero-subtitle">
            At YGR Gobal IT Services Pvt. Ltd., we respect your confidentiality and are committed to safeguarding the personal information of our clients, students, candidates, and portal users.
          </p>

          <div className="privacy-hero-meta">
            <span><i className="far fa-calendar-check"></i> Last Updated: October 2026</span>
            <span><i className="far fa-clock"></i> Reading Time: ~6 mins</span>
            <span><i className="fas fa-map-marker-alt"></i> Hyderabad, India</span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="privacy-container">
        <div className="privacy-layout-grid">
          {/* Left Column: Quick Sticky Navigation */}
          <aside className="privacy-sidebar">
            <div className="privacy-toc-card">
              <div className="privacy-toc-title">
                <i className="fas fa-list-ul"></i> Table of Contents
              </div>
              <ul className="privacy-toc-list">
                <li><a href="#overview"><i className="fas fa-chevron-right"></i> Overview</a></li>
                <li><a href="#information-collect"><i className="fas fa-chevron-right"></i> 1. Information We Collect</a></li>
                <li><a href="#usage"><i className="fas fa-chevron-right"></i> 2. How We Use Information</a></li>
                <li><a href="#security"><i className="fas fa-chevron-right"></i> 3. Data Protection & Security</a></li>
                <li><a href="#sharing"><i className="fas fa-chevron-right"></i> 4. Sharing & Disclosure</a></li>
                <li><a href="#cookies-tech"><i className="fas fa-chevron-right"></i> 5. Cookies & Tracking</a></li>
                <li><a href="#candidate-data"><i className="fas fa-chevron-right"></i> 6. Internship & Exam Data</a></li>
                <li><a href="#user-rights"><i className="fas fa-chevron-right"></i> 7. Your Legal Rights</a></li>
                <li><a href="#contact"><i className="fas fa-chevron-right"></i> 8. Contact & Offices</a></li>
              </ul>
            </div>

            <div className="privacy-help-card">
              <div className="privacy-help-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h4>Have Privacy Questions?</h4>
              <p>Our Data Governance and Compliance team is ready to assist you.</p>
              <a href="mailto:info@ygrgobalitservices.com" className="privacy-btn-contact">
                <i className="fas fa-envelope"></i> Contact Legal Team
              </a>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4px' }}>
              <button 
                onClick={handlePrint}
                style={{
                  background: 'transparent',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.8125rem',
                  color: '#64748b',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <i className="fas fa-print"></i> Print Document
              </button>
            </div>
          </aside>

          {/* Right Column: Structured Legal Clauses */}
          <main className="privacy-main-content">
            {/* Overview */}
            <article id="overview" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-book-open"></i>
                </div>
                <h2>Overview & Commitment</h2>
              </div>
              <p className="privacy-lead-text">
                YGR Gobal IT Services Pvt. Ltd. (“YGR”, “we”, “our”, or “us”) operates enterprise IT consulting, software engineering, professional IT training, global internship programs, and candidate examination assessment portals.
              </p>
              <p>
                This Privacy Policy articulates how we collect, process, store, and protect your personal information when you visit our website (<code>ygrgobalitservices.com</code>), utilize our client or candidate portals, apply for internships, take proctored assessments, or interact with our teams.
              </p>
              <div className="privacy-callout-box">
                <p>
                  <strong>Note:</strong> By accessing our website, enrolling in training, or registering on our candidate examination portal, you acknowledge that you have read and agreed to the practices outlined in this Privacy Policy.
                </p>
              </div>
            </article>

            {/* 1. Information We Collect */}
            <article id="information-collect" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-database"></i>
                </div>
                <h2>1. Information We Collect</h2>
              </div>
              <p>Depending on your interaction with YGR Gobal IT Services, we may collect the following classes of data:</p>
              <ul>
                <li><strong>Identity & Contact Details:</strong> Full name, email address, contact phone number, residential/correspondence address, date of birth, and identity credentials provided during portal registration or internship enrollment.</li>
                <li><strong>Academic & Professional Information:</strong> Degree/qualification, college or university name, year of graduation, resume, portfolio links, and technical skill sets submitted during internship or career applications.</li>
                <li><strong>Examination & Performance Data:</strong> Candidate ID, test completion timestamps, exam question responses, aggregate assessment scores, and system verification records.</li>
                <li><strong>Transaction & Billing Data:</strong> Payment receipt references, transaction identifiers, and amounts processed through our authorized payment gateway (Razorpay). <em>(Note: YGR does not store raw credit/debit card numbers or bank PINs on its servers)</em>.</li>
                <li><strong>Technical & Usage Information:</strong> Device type, browser version, Internet Protocol (IP) address, operating system, session duration, and pages navigated via standard web log files and session cookies.</li>
              </ul>
            </article>

            {/* 2. How We Use Information */}
            <article id="usage" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-cogs"></i>
                </div>
                <h2>2. How We Use Your Information</h2>
              </div>
              <p>We process personal data for legitimate business operations, legal obligations, and student/client service delivery:</p>
              <ul>
                <li>Facilitating registration, identity verification, and profile management across candidate and student dashboards.</li>
                <li>Scheduling, conducting, and scoring technical assessment examinations for global internship applicants.</li>
                <li>Issuing offer letters, internship certificates, verification credentials, and progress evaluation reports.</li>
                <li>Processing enrollment fees, generating official invoices, and issuing payment receipts via automated email notifications.</li>
                <li>Delivering timely academic notices, assessment links, schedule updates, and system alert communications.</li>
                <li>Diagnosing server performance, combating fraudulent activities, and ensuring high-availability platform security.</li>
              </ul>
            </article>

            {/* 3. Data Protection & Security */}
            <article id="security" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-lock"></i>
                </div>
                <h2>3. Data Protection & Security</h2>
              </div>
              <p>
                We enforce multi-tiered administrative, physical, and technical controls to safeguard your data against unauthorized access, loss, alteration, or disclosure:
              </p>
              <ul>
                <li><strong>End-to-End Encryption:</strong> All web traffic is encrypted in transit using industry-standard Transport Layer Security (TLS 1.2/1.3) protocols.</li>
                <li><strong>Restricted Role-Based Access:</strong> Access to candidate examination scores, resume submissions, and financial records is restricted to authorized HR administrators and evaluators.</li>
                <li><strong>Secure Database Hosting:</strong> Data is persisted in audited, firewall-protected database clusters with regular automated backups.</li>
              </ul>
              <div className="privacy-callout-box security">
                <p>
                  While we implement rigorous security measures, please note that no method of transmission over the Internet is 100% immune from security threats. Users are encouraged to maintain confidential passwords and tokens.
                </p>
              </div>
            </article>

            {/* 4. Sharing & Disclosure */}
            <article id="sharing" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-share-alt"></i>
                </div>
                <h2>4. Sharing of Information</h2>
              </div>
              <p>
                <strong>We do not sell, rent, or trade your personal information to third-party advertisers.</strong> Data is shared only under strict conditions:
              </p>
              <ul>
                <li><strong>Authorized Service Providers:</strong> Trusted third-party partners who provide transactional infrastructure, such as Razorpay (secure payments), cloud hosting providers, and transactional email deliverability systems (SMTP).</li>
                <li><strong>Corporate & Hiring Partners:</strong> Candidate assessment ratings and academic credentials may be shared with vetted enterprise hiring partners exclusively for candidate placement opportunities with explicit consent.</li>
                <li><strong>Statutory & Legal Requirements:</strong> If required by judicial process, court orders, law enforcement, or applicable Indian legislation (Information Technology Act, 2000).</li>
              </ul>
            </article>

            {/* 5. Cookies & Tracking */}
            <article id="cookies-tech" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-cookie-bite"></i>
                </div>
                <h2>5. Cookies & Tracking Technologies</h2>
              </div>
              <p>
                Our portal utilizes essential cookies and browser local storage to maintain session states, preserve portal authentication, and ensure seamless navigation between assessment modules.
              </p>
              <p>
                You may customize or disable cookies through your browser preferences. For detailed disclosures on cookie types and consent management, please review our comprehensive <Link to={ROUTES.COOKIES || "/cookies"}>Cookie Policy</Link>.
              </p>
            </article>

            {/* 6. Candidate & Exam Data */}
            <article id="candidate-data" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <h2>6. Internship & Assessment Integrity</h2>
              </div>
              <p>
                To maintain fair evaluation for all applicants, candidate assessment sessions are tracked with session tokens, start/submission timestamps, and single-attempt locks. Attempt records and scores are archived to facilitate credential verification for future employers.
              </p>
            </article>

            {/* 7. Your Legal Rights */}
            <article id="user-rights" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-user-shield"></i>
                </div>
                <h2>7. Your Rights & Choices</h2>
              </div>
              <p>Under applicable Indian data protection principles, you possess rights regarding your data:</p>
              <ul>
                <li><strong>Right to Access:</strong> Request a summary of the personal details stored in your candidate or student profile.</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate academic details, contact phone numbers, or email addresses.</li>
                <li><strong>Right to Deletion:</strong> Request account closure and erasure of discretionary information, subject to statutory record-retention laws.</li>
                <li><strong>Opt-Out of Promotional Emails:</strong> You can unsubscribe from marketing alerts at any time via the opt-out link in promotional emails.</li>
              </ul>
            </article>

            {/* 8. Contact & Offices */}
            <article id="contact" className="privacy-card-section">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">
                  <i className="fas fa-envelope-open-text"></i>
                </div>
                <h2>8. Contact Information & Registered Offices</h2>
              </div>
              <p>
                If you have inquiries, concerns, or requests regarding this Privacy Policy, our Data Protection Officer may be reached through the following channels:
              </p>

              <div className="privacy-contacts-grid">
                <div className="privacy-info-block">
                  <div className="privacy-info-icon"><i className="fas fa-envelope"></i></div>
                  <div className="privacy-info-content">
                    <h4>Direct Email</h4>
                    <p><a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a></p>
                    <p><a href="mailto:hr@ygrgobalitservices.com">hr@ygrgobalitservices.com</a></p>
                  </div>
                </div>

                <div className="privacy-info-block">
                  <div className="privacy-info-icon"><i className="fas fa-phone-alt"></i></div>
                  <div className="privacy-info-content">
                    <h4>Telephone Assistance</h4>
                    <p><a href="tel:+917794053340">+91 77940 53340</a></p>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Mon – Fri: 9:30 AM – 6:30 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="privacy-offices-grid">
                <div className="privacy-office-card">
                  <span className="privacy-office-tag head">Corporate Head Office</span>
                  <h3>Hyderabad Headquarters</h3>
                  <address>
                    1st Floor, Manjeera Trinity Corporate, Unit No. 114,<br />
                    Next to Lulu Mall, Kukatpally Housing Board Colony,<br />
                    Kukatpally, Hyderabad, Telangana 500072, India
                  </address>
                </div>

                <div className="privacy-office-card">
                  <span className="privacy-office-tag branch">Regional Training Centre</span>
                  <h3>KPHB Branch Office</h3>
                  <address>
                    H.No. 15-26-101, 4th Floor, Road No. 2,<br />
                    KPHB Colony, Near KPHB Metro Station,<br />
                    Hyderabad, Telangana 500072, India
                  </address>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
