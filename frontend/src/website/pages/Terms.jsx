import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import './Terms.css';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms of Service | YGR Gobal IT Services";
  }, []);

  const handlePrint = (e) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="terms-page-wrapper">
      {/* ── HERO BANNER ── */}
      <section className="terms-hero">
        <div className="terms-hero-bg-glow"></div>
        <div className="terms-hero-content">
          <nav className="terms-breadcrumbs" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME || "/"}>Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span>Terms of Service</span>
          </nav>

          <div className="terms-hero-badge">
            <i className="fas fa-file-contract"></i> User & Service Agreement
          </div>

          <h1 className="terms-hero-title">Terms & Services</h1>
          <p className="terms-hero-subtitle">
            These terms define the agreement governing your access to YGR Gobal IT Services platforms, training academies, software products, and candidate internship portals.
          </p>

          <div className="terms-hero-meta">
            <span><i className="far fa-calendar-check"></i> Last Updated: October 2026</span>
            <span><i className="far fa-clock"></i> Reading Time: ~7 mins</span>
            <span><i className="fas fa-balance-scale"></i> Jurisdiction: Hyderabad, India</span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="terms-container">
        <div className="terms-layout-grid">
          {/* Left Column: Sticky Table of Contents */}
          <aside className="terms-sidebar">
            <div className="terms-toc-card">
              <div className="terms-toc-title">
                <i className="fas fa-list-ul"></i> Table of Contents
              </div>
              <ul className="terms-toc-list">
                <li><a href="#acceptance"><i className="fas fa-chevron-right"></i> 1. Acceptance of Terms</a></li>
                <li><a href="#services"><i className="fas fa-chevron-right"></i> 2. Services & Solutions</a></li>
                <li><a href="#user-obligations"><i className="fas fa-chevron-right"></i> 3. User & Candidate Conduct</a></li>
                <li><a href="#payments-refunds"><i className="fas fa-chevron-right"></i> 4. Payments & Refunds</a></li>
                <li><a href="#intellectual-property"><i className="fas fa-chevron-right"></i> 5. Intellectual Property</a></li>
                <li><a href="#disclaimers"><i className="fas fa-chevron-right"></i> 6. Disclaimers & Warranties</a></li>
                <li><a href="#liability"><i className="fas fa-chevron-right"></i> 7. Limitation of Liability</a></li>
                <li><a href="#termination"><i className="fas fa-chevron-right"></i> 8. Account Termination</a></li>
                <li><a href="#governing-law"><i className="fas fa-chevron-right"></i> 9. Governing Law</a></li>
                <li><a href="#contact"><i className="fas fa-chevron-right"></i> 10. Contact & Address</a></li>
              </ul>
            </div>

            <div className="terms-help-card">
              <div className="terms-help-icon">
                <i className="fas fa-gavel"></i>
              </div>
              <h4>Legal Inquiries?</h4>
              <p>Contact our contracts and legal advisory team for assistance.</p>
              <a href="mailto:info@ygrgobalitservices.com" className="terms-btn-contact">
                <i className="fas fa-envelope"></i> Contact Legal
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
          <main className="terms-main-content">
            {/* 1. Acceptance of Terms */}
            <article id="acceptance" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h2>1. Acceptance of Terms</h2>
              </div>
              <p className="terms-lead-text">
                Welcome to <strong>YGR Gobal IT Services Pvt. Ltd.</strong> (“YGR”, “we”, “our”, or “us”). By visiting our website (<code>ygrgobalitservices.com</code>), using our client dashboards, registering for training programs, or submitting applications via our candidate examination portal, you agree to comply with and be legally bound by these Terms of Service.
              </p>
              <p>
                If you do not agree to these terms in their entirety, you must discontinue your use of our websites, platforms, and services immediately.
              </p>
              <div className="terms-callout-box">
                <p>
                  <strong>Amendments:</strong> We reserve the right to revise or update these terms at our sole discretion. Any modifications take effect upon publication on this page with an updated timestamp.
                </p>
              </div>
            </article>

            {/* 2. Services & Solutions */}
            <article id="services" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h2>2. Scope of Services & IT Solutions</h2>
              </div>
              <p>YGR Gobal IT Services provides a comprehensive suite of enterprise and educational services:</p>
              <ul>
                <li>Custom enterprise software development, web & mobile application engineering, and Cloud/DevOps infrastructure.</li>
                <li>Digital marketing solutions, SEO campaigns, and UI/UX design architecture.</li>
                <li>Professional IT training, full-stack certification courses, and live project workshops.</li>
                <li>Global Internship programs, candidate assessments, skill evaluations, and industry recruitment pipelines.</li>
              </ul>
              <p>
                We strive to maintain maximum platform reliability, but reserve the right to modify, suspend, or enhance any service feature without prior liability.
              </p>
            </article>

            {/* 3. User & Candidate Conduct */}
            <article id="user-obligations" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-user-check"></i>
                </div>
                <h2>3. User Responsibilities & Candidate Conduct</h2>
              </div>
              <p>By engaging with our platform and services, you agree and covenant that you shall:</p>
              <ul>
                <li>Provide accurate, genuine, and verified personal, educational, and contact details during registration.</li>
                <li>Maintain the strict confidentiality of your candidate registration IDs, login tokens, and dashboard passwords.</li>
                <li>Refrain from attempting unauthorized access, penetration testing, DDoS attacks, or scraping of our platform infrastructure.</li>
                <li>Abide strictly by examination rules: candidates may only attempt an assessment once per invitation link. Impersonation, unauthorized tab-switching, copying question items, or distributing exam materials constitutes immediate grounds for disqualification.</li>
              </ul>
            </article>

            {/* 4. Payments & Refunds */}
            <article id="payments-refunds" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-credit-card"></i>
                </div>
                <h2>4. Payment, Fees & Refund Policy</h2>
              </div>
              <p>
                Payments for training modules, project registrations, or internship examination processing fees are collected via authorized payment gateways (e.g., Razorpay) in Indian Rupees (INR) or designated foreign currencies:
              </p>
              <ul>
                <li><strong>Full Payment:</strong> Fees must be received in full before portal access, exam slots, or program onboarding can be granted.</li>
                <li><strong>Non-Refundable Policy:</strong> Internship examination evaluation and registration fees are non-refundable once an assessment link is dispatched or an exam attempt is initiated.</li>
                <li><strong>Billing Discrepancies:</strong> In the rare event of duplicate payment debits, candidates may email <a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a> with transaction references within 7 business days for prompt reconciliation.</li>
              </ul>
              <div className="terms-callout-box warning">
                <p>
                  <strong>Notice:</strong> YGR Gobal IT Services reserves the right to modify fee structures and discount schedules at any time prior to an individual enrollment confirmation.
                </p>
              </div>
            </article>

            {/* 5. Intellectual Property */}
            <article id="intellectual-property" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-copyright"></i>
                </div>
                <h2>5. Intellectual Property Rights</h2>
              </div>
              <p>
                All materials contained within our websites and portals—including software code, examination question banks, design assets, course syllabi, logos, and proprietary frameworks—are the exclusive intellectual property of <strong>YGR Gobal IT Services Pvt. Ltd.</strong> and protected by Indian and international copyright and trademark laws.
              </p>
              <p>
                You are granted a revocable, non-exclusive, non-transferable license to access course materials solely for individual personal learning. No part of our platform may be copied, reproduced, repackaged, or commercialized without prior written consent.
              </p>
            </article>

            {/* 6. Disclaimers & Warranties */}
            <article id="disclaimers" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h2>6. Disclaimer of Warranties</h2>
              </div>
              <p>
                Our services, assessments, and platforms are provided strictly on an <strong>“AS IS”</strong> and <strong>“AS AVAILABLE”</strong> basis without representations or warranties of any kind, whether express or implied.
              </p>
              <ul>
                <li>We do not warrant uninterrupted, error-free operation or that defects will be corrected instantaneously.</li>
                <li>While our internship and corporate training programs provide industry skills, enrollment does not guarantee employment or placement offers.</li>
              </ul>
            </article>

            {/* 7. Limitation of Liability */}
            <article id="liability" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h2>7. Limitation of Liability</h2>
              </div>
              <p>
                To the fullest extent permissible by applicable law, in no event shall YGR Gobal IT Services Pvt. Ltd., its directors, officers, or staff be liable for any indirect, punitive, special, incidental, or consequential damages resulting from your access to or inability to use our platform.
              </p>
            </article>

            {/* 8. Account Termination */}
            <article id="termination" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-ban"></i>
                </div>
                <h2>8. Termination & Suspension</h2>
              </div>
              <p>
                We reserve the right to suspend or terminate your portal access, candidate registration, or course enrollment without notice if you violate any provision of these Terms of Service or engage in academic misconduct.
              </p>
            </article>

            {/* 9. Governing Law */}
            <article id="governing-law" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <h2>9. Governing Law & Dispute Resolution</h2>
              </div>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes, claims, or controversies arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Hyderabad, Telangana, India</strong>.
              </p>
            </article>

            {/* 10. Contact & Address */}
            <article id="contact" className="terms-card-section">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <i className="fas fa-address-card"></i>
                </div>
                <h2>10. Contact Information & Legal Headquarters</h2>
              </div>
              <p>
                For official correspondence, contractual clarifications, or formal notices, please reach out through our designated communications channels:
              </p>

              <div className="terms-contacts-grid">
                <div className="terms-info-block">
                  <div className="terms-info-icon"><i className="fas fa-envelope"></i></div>
                  <div className="terms-info-content">
                    <h4>Official Email</h4>
                    <p><a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a></p>
                    <p><a href="mailto:hr@ygrgobalitservices.com">hr@ygrgobalitservices.com</a></p>
                  </div>
                </div>

                <div className="terms-info-block">
                  <div className="terms-info-icon"><i className="fas fa-phone-alt"></i></div>
                  <div className="terms-info-content">
                    <h4>Direct Telephone</h4>
                    <p><a href="tel:+917794053340">+91 77940 53340</a></p>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Mon – Fri: 9:30 AM – 6:30 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="terms-offices-grid">
                <div className="terms-office-card">
                  <span className="terms-office-tag head">Registered Head Office</span>
                  <h3>Corporate Headquarters</h3>
                  <address>
                    1st Floor, Manjeera Trinity Corporate, Unit No. 114,<br />
                    Next to Lulu Mall, Kukatpally Housing Board Colony,<br />
                    Kukatpally, Hyderabad, Telangana 500072, India
                  </address>
                </div>

                <div className="terms-office-card">
                  <span className="terms-office-tag branch">Regional Training Centre</span>
                  <h3>KPHB Branch Facility</h3>
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

export default Terms;
