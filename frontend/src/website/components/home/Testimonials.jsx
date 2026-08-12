import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const INDUSTRIES_DATA = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    desc: 'Secure digital healthcare platforms, patient portals, and HIPAA-compliant systems.',
    icon: 'fa-heart-pulse',
    accentColor: '#2D4A6D'
  },
  {
    id: 'education',
    name: 'Education',
    desc: 'Learning management systems, virtual classrooms, and digital education platforms.',
    icon: 'fa-graduation-cap',
    accentColor: '#5E9133'
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    desc: 'Enterprise banking software, payment gateways, and fintech applications.',
    icon: 'fa-building-columns',
    accentColor: '#D36B1C'
  },
  {
    id: 'retail',
    name: 'Retail & E-Commerce',
    desc: 'Omnichannel retail platforms, inventory management, and digital checkout systems.',
    icon: 'fa-cart-shopping',
    accentColor: '#2D4A6D'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    desc: 'Smart factory automation, Supply Chain 4.0, and IoT telemetry dashboards.',
    icon: 'fa-industry',
    accentColor: '#5E9133'
  },
  {
    id: 'logistics',
    name: 'Logistics & Transportation',
    desc: 'Fleet tracking, route optimization, and international transit logistics.',
    icon: 'fa-truck-fast',
    accentColor: '#D36B1C'
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    desc: 'PropTech portals, virtual tour platforms, and tenant management systems.',
    icon: 'fa-city',
    accentColor: '#2D4A6D'
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    desc: 'Citizen service portals, secure public infrastructure, and e-governance systems.',
    icon: 'fa-landmark',
    accentColor: '#5E9133'
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    desc: 'Digital content streaming, digital asset management, and media workflows.',
    icon: 'fa-clapperboard',
    accentColor: '#2D4A6D'
  }
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    client_name: 'Robert Sterling',
    company_name: 'Apex Global Logistics',
    country: 'United States',
    message: 'YGR Gobal IT Services delivered our real-time supply chain management portal 3 weeks ahead of deadline. Outstanding engineering and communication!'
  },
  {
    id: 2,
    client_name: 'Elena Rostova',
    company_name: 'FinTech Dynamics',
    country: 'United Kingdom',
    message: 'The microservices architecture built by YGR handled our Peak Friday traffic of 250k transactions with sub-10ms latency. Exceptional quality.'
  },
  {
    id: 3,
    client_name: 'Marcus Vance',
    company_name: 'HealthPulse Solutions',
    country: 'Canada',
    message: 'Their team built our HIPAA-compliant telemedicine platform with top-tier security and intuitive UX. Highly recommended engineering partner!'
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [clientTestimonials, setClientTestimonials] = React.useState(FALLBACK_TESTIMONIALS);

  React.useEffect(() => {
    fetch('/api/public/testimonials/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setClientTestimonials(data);
        }
      })
      .catch(() => {});
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="industries-serve-section" ref={sectionRef}>
      {/* Background Atmosphere: Blueprint Grid & Soft Radial Glows */}
      <div className="industries-bg-canvas">
        <div className="industries-blueprint-grid"></div>
        <div className="industries-radial-glow blue-glow"></div>
        <div className="industries-radial-glow green-glow"></div>
      </div>

      <div className="industries-container">
        {/* ── 1. Header Stack ── */}
        <motion.div
          className="industries-header-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="industries-eyebrow">
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-title">INDUSTRIES WE SERVE</span>
          </div>

          <h2 className="industries-heading">
            Technology Solutions <br />
            Across Every Industry
          </h2>

          <p className="industries-description">
            We help organizations across diverse industries modernize operations, improve customer experiences, and accelerate digital transformation with scalable technology solutions.
          </p>
        </motion.div>

        {/* ── 2. Bento Grid of 10 Industries ── */}
        <motion.div
          className="industries-bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {INDUSTRIES_DATA.map((ind) => (
            <motion.div
              key={ind.id}
              className="industry-bento-card"
              variants={cardVariant}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-top-bar">
                <div className="industry-icon-box" style={{ color: ind.accentColor }}>
                  <i className={`fas ${ind.icon}`}></i>
                </div>
                <i className="fas fa-arrow-up-right card-arrow-icon"></i>
              </div>

              <h3 className="industry-card-title">{ind.name}</h3>
              <p className="industry-card-desc">{ind.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 3. DYNAMIC CLIENT TESTIMONIALS SECTION ── */}
        <div style={{ marginTop: '90px', paddingTop: '60px', borderTop: '1px solid #E2E8F0' }}>
          <div className="industries-header-stack" style={{ marginBottom: '36px' }}>
            <div className="industries-eyebrow">
              <span className="eyebrow-dot" style={{ background: '#1E88E5' }}></span>
              <span className="eyebrow-title">CLIENT TESTIMONIALS</span>
            </div>

            <h2 className="industries-heading">
              What Our Global Clients <br />
              Say About Working With Us
            </h2>

            <p className="industries-description">
              Real feedback and stories from business leaders who rely on YGR Gobal IT Services for mission-critical software engineering.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {clientTestimonials.map((t, idx) => (
              <div
                key={t.id || idx}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '14px', marginBottom: '14px' }}>
                    ★★★★★
                  </div>
                  <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '20px' }}>
                    &ldquo;{t.message || t.feedback}&rdquo;
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0F2B46, #1E88E5)',
                      color: '#FFFFFF',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      fontSize: '16px'
                    }}
                  >
                    {(t.client_name || t.name || 'C').charAt(0)}
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                      {t.client_name || t.name}
                    </h5>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                      {t.company_name || t.company} {t.country ? `• ${t.country}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Bottom Statement & Primary CTA ── */}
        <motion.div
          className="industries-bottom-stack"
          style={{ marginTop: '60px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="bottom-statement-text">
            &ldquo;No matter the industry, our engineering approach remains focused on quality, scalability, security, and measurable business value.&rdquo;
          </p>

          <Link to="/contact" className="btn-discuss-industry">
            <span>Discuss Your Industry Needs</span>
            <span className="cta-arrow-circle">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
