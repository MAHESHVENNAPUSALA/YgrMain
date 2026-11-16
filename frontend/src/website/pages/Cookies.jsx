import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import './Cookies.css';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cookie Policy | YGR Gobal IT Services";
  }, []);

  const handlePrint = (e) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="cookies-page-wrapper">
      {/* ── HERO BANNER ── */}
      <section className="cookies-hero">
        <div className="cookies-hero-bg-glow"></div>
        <div className="cookies-hero-content">
          <nav className="cookies-breadcrumbs" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME || "/"}>Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span>Cookie Policy</span>
          </nav>

          <div className="cookies-hero-badge">
            <i className="fas fa-cookie-bite"></i> Transparency & Data Integrity
          </div>

          <h1 className="cookies-hero-title">Cookies Policy</h1>
          <p className="cookies-hero-subtitle">
            Learn how YGR Gobal IT Services Pvt. Ltd. uses cookies, local web storage, and session technologies to deliver secure, responsive, and tailored user experiences.
          </p>

          <div className="cookies-hero-meta">
            <span><i className="far fa-calendar-check"></i> Last Updated: October 2026</span>
            <span><i className="far fa-clock"></i> Reading Time: ~5 mins</span>
            <span><i className="fas fa-laptop-code"></i> Secure Session Tracking</span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="cookies-container">
        <div className="cookies-layout-grid">
          {/* Left Column: Sticky Table of Contents */}
          <aside className="cookies-sidebar">
            <div className="cookies-toc-card">
              <div className="cookies-toc-title">
                <i className="fas fa-list-ul"></i> Table of Contents
              </div>
              <ul className="cookies-toc-list">
                <li><a href="#what-are-cookies"><i className="fas fa-chevron-right"></i> 1. What Are Cookies?</a></li>
                <li><a href="#why-we-use"><i className="fas fa-chevron-right"></i> 2. Why We Use Cookies</a></li>
                <li><a href="#cookie-types"><i className="fas fa-chevron-right"></i> 3. Types of Cookies We Use</a></li>
                <li><a href="#cookie-table"><i className="fas fa-chevron-right"></i> 4. Cookie Breakdown Table</a></li>
                <li><a href="#third-parties"><i className="fas fa-chevron-right"></i> 5. Third-Party Technologies</a></li>
                <li><a href="#managing-cookies"><i className="fas fa-chevron-right"></i> 6. Managing Preferences</a></li>
                <li><a href="#policy-updates"><i className="fas fa-chevron-right"></i> 7. Updates & Consent</a></li>
                <li><a href="#contact"><i className="fas fa-chevron-right"></i> 8. Contact & Offices</a></li>
              </ul>
            </div>

            <div className="cookies-help-card">
              <div className="cookies-help-icon">
                <i className="fas fa-shield-virus"></i>
              </div>
              <h4>Data Privacy Questions?</h4>
              <p>Review our Privacy Policy or speak with our technical team.</p>
              <Link to={ROUTES.PRIVACY || "/privacy"} className="cookies-btn-contact">
                <i className="fas fa-shield-alt"></i> View Privacy Policy
              </Link>
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
          <main className="cookies-main-content">
            {/* 1. What Are Cookies? */}
            <article id="what-are-cookies" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-info-circle"></i>
                </div>
                <h2>1. What Are Cookies?</h2>
              </div>
              <p className="cookies-lead-text">
                Cookies are small encrypted alphanumeric data files stored in your web browser or device storage when you visit a website.
              </p>
              <p>
                Cookies enable websites to recognize your device across visits, keep you logged into protected candidate or employee areas, remember your language and layout preferences, and understand how visitors interact with our content so we can continually optimize user performance.
              </p>
              <div className="cookies-callout-box">
                <p>
                  In addition to HTTP cookies, we may also utilize modern browser technologies like <strong>HTML5 LocalStorage</strong> and <strong>SessionStorage</strong> to maintain state during active candidate examination sessions.
                </p>
              </div>
            </article>

            {/* 2. Why We Use Cookies */}
            <article id="why-we-use" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h2>2. Why We Use Cookies</h2>
              </div>
              <p>YGR Gobal IT Services utilizes cookies and tracking technologies for essential purposes:</p>
              <ul>
                <li><strong>Session & Authentication:</strong> Verifying authenticated candidate dashboards and HRMS employee sessions so you do not have to re-enter credentials repeatedly.</li>
                <li><strong>Examination Integrity:</strong> Validating assessment tokens, checking single-attempt status, and recording timestamp telemetry during candidate exams.</li>
                <li><strong>Security & Anti-Fraud:</strong> Protecting against Cross-Site Request Forgery (CSRF) and thwarting automated spam submissions on registration forms.</li>
                <li><strong>Platform Analytics:</strong> Aggregating anonymous traffic volume and page navigation patterns to improve system response times.</li>
              </ul>
            </article>

            {/* 3. Types of Cookies We Use */}
            <article id="cookie-types" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-layer-group"></i>
                </div>
                <h2>3. Categories of Cookies We Use</h2>
              </div>
              <p>We classify our cookies into three core operational categories:</p>
              <ul>
                <li><strong>Strictly Necessary / Essential Cookies:</strong> Indispensable for the basic operation of the website, user authentication, and secure checkout with payment gateways. These cannot be disabled in our systems.</li>
                <li><strong>Performance & Analytics Cookies:</strong> Provide aggregate analytical metrics regarding which pages are visited most often and whether error messages occur. All gathered information is pseudonymized.</li>
                <li><strong>Functional & Preference Cookies:</strong> Enable enhanced features and remember user configurations (such as dark/light display preferences or auto-filled registration fields).</li>
              </ul>
            </article>

            {/* 4. Cookie Breakdown Table */}
            <article id="cookie-table" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-table"></i>
                </div>
                <h2>4. Typical Cookies & Web Storage Usage</h2>
              </div>
              <p>The table below provides transparency into key storage items deployed across our platforms:</p>

              <div className="cookies-table-wrapper">
                <table className="cookies-table">
                  <thead>
                    <tr>
                      <th>Identifier</th>
                      <th>Category</th>
                      <th>Lifespan</th>
                      <th>Purpose & Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>ygr_token / access_token</code></td>
                      <td><span className="cookies-badge-pill essential">Essential</span></td>
                      <td>Session / 24 hrs</td>
                      <td>Maintains secure authentication token for candidate and HRMS portal accounts.</td>
                    </tr>
                    <tr>
                      <td><code>csrftoken</code></td>
                      <td><span className="cookies-badge-pill essential">Essential</span></td>
                      <td>1 Year</td>
                      <td>Protects form submissions and API transactions against CSRF attacks.</td>
                    </tr>
                    <tr>
                      <td><code>exam_session_lock</code></td>
                      <td><span className="cookies-badge-pill essential">Essential</span></td>
                      <td>Exam Duration</td>
                      <td>Ensures candidates attempt evaluations within designated time limits.</td>
                    </tr>
                    <tr>
                      <td><code>_ga, _gid</code></td>
                      <td><span className="cookies-badge-pill analytics">Analytics</span></td>
                      <td>Up to 2 Years</td>
                      <td>Used by Google Analytics to distinguish unique users and generate anonymized reports.</td>
                    </tr>
                    <tr>
                      <td><code>ygr_theme_preference</code></td>
                      <td><span className="cookies-badge-pill preference">Preference</span></td>
                      <td>Persistent</td>
                      <td>Remembers user display and accessibility preferences across visits.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* 5. Third-Party Technologies */}
            <article id="third-parties" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-external-link-alt"></i>
                </div>
                <h2>5. Third-Party Technologies</h2>
              </div>
              <p>
                Some features on our website rely on external partners who may set their own cookies:
              </p>
              <ul>
                <li><strong>Razorpay:</strong> When paying application or training fees, Razorpay's secure checkout sets cookies necessary for payment verification, fraud detection, and transaction confirmation.</li>
                <li><strong>Google Fonts & FontAwesome:</strong> Deliver typography and iconography with high performance and zero data profiling.</li>
              </ul>
            </article>

            {/* 6. Managing Preferences */}
            <article id="managing-cookies" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-sliders-h"></i>
                </div>
                <h2>6. Managing & Disabling Cookies</h2>
              </div>
              <p>
                You have the option to accept or decline cookies. Most web browsers automatically accept cookies, but you can alter your browser settings to decline or delete them:
              </p>
              <ul>
                <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Cookies and other site data.</li>
                <li><strong>Mozilla Firefox:</strong> Options &rarr; Privacy & Security &rarr; Cookies and Site Data.</li>
                <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies.</li>
                <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data.</li>
              </ul>
              <div className="cookies-callout-box">
                <p>
                  <strong>Important:</strong> Disabling essential cookies may prevent you from logging into your candidate dashboard or completing your online internship assessment.
                </p>
              </div>
            </article>

            {/* 7. Updates & Consent */}
            <article id="policy-updates" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h2>7. Updates to This Cookie Policy</h2>
              </div>
              <p>
                We may periodically revise this Cookie Policy to reflect changes in technological standards, legal requirements, or our operational practices. When updates are published, the “Last Updated” date at the top of this document will be revised accordingly.
              </p>
            </article>

            {/* 8. Contact & Offices */}
            <article id="contact" className="cookies-card-section">
              <div className="cookies-section-header">
                <div className="cookies-section-badge">
                  <i className="fas fa-building"></i>
                </div>
                <h2>8. Contact & Corporate Offices</h2>
              </div>
              <p>
                If you have questions regarding our use of cookies or web storage technologies, please reach out to our technical administration team:
              </p>

              <div className="cookies-contacts-grid">
                <div className="cookies-info-block">
                  <div className="cookies-info-icon"><i className="fas fa-envelope"></i></div>
                  <div className="cookies-info-content">
                    <h4>Technical Support</h4>
                    <p><a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a></p>
                    <p><a href="mailto:hr@ygrgobalitservices.com">hr@ygrgobalitservices.com</a></p>
                  </div>
                </div>

                <div className="cookies-info-block">
                  <div className="cookies-info-icon"><i className="fas fa-phone-alt"></i></div>
                  <div className="cookies-info-content">
                    <h4>Helpdesk Phone</h4>
                    <p><a href="tel:+917794053340">+91 77940 53340</a></p>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Mon – Fri: 9:30 AM – 6:30 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="cookies-offices-grid">
                <div className="cookies-office-card">
                  <span className="cookies-office-tag head">Registered Head Office</span>
                  <h3>Corporate Headquarters</h3>
                  <address>
                    1st Floor, Manjeera Trinity Corporate, Unit No. 114,<br />
                    Next to Lulu Mall, Kukatpally Housing Board Colony,<br />
                    Kukatpally, Hyderabad, Telangana 500072, India
                  </address>
                </div>

                <div className="cookies-office-card">
                  <span className="cookies-office-tag branch">Regional Training Facility</span>
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

export default Cookies;
