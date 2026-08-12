import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './contact-hero-premium.css';

const Contact = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
    agreePrivacy: false
  });

  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Fetch dynamic service categories from backend API GET /api/services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
          if (data.length > 0) {
            setFormData((prev) => ({ ...prev, service: data[0].name }));
          }
        }
      } catch (err) {
        console.error('Error fetching service categories:', err);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreePrivacy) {
      setStatusMessage({ type: 'error', text: 'Please agree to the privacy policy to submit.' });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: data.message || 'Thank you! Your project enquiry has been submitted. Our team will contact you within one business day.'
        });
        
        // Optionally launch WhatsApp connection
        const waMsg = `Hello YGR Gobal! I submitted a project inquiry.\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nMessage: ${formData.message}`;
        window.open(`https://wa.me/917794053340?text=${encodeURIComponent(waMsg)}`, '_blank');

        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: services.length > 0 ? services[0].name : '',
          budget: '',
          timeline: '',
          message: '',
          agreePrivacy: false
        });
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to submit enquiry. Please try again.' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Network error. Please try again or reach out on WhatsApp.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleScheduleMeeting = () => {
    const meetingText = `Hello YGR Gobal IT Services! I would like to schedule a consultation meeting regarding our software project.`;
    window.open(`https://wa.me/917794053340?text=${encodeURIComponent(meetingText)}`, '_blank');
  };

  return (
    <>
      {/* ==========================================================
          FIRST SECTION: REDESIGNED PREMIUM ENTERPRISE CONTACT HERO + FORM
         ========================================================== */}
      <section className="contact-hero-master">
        <div className="contact-container-custom">
          
          <div className="contact-split-row">
            
            {/* ── LEFT SIDE: COMPANY INFORMATION ── */}
            <motion.div
              className="contact-left-col"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-badge-pill">
                <span className="green-dot"></span>
                CONTACT YGR GOBAL IT SERVICES
              </div>

              <h1 className="contact-hero-h1">
                Let's Build <br />
                Your Next <br />
                <span className="text-glow-blue">Digital Success</span>
              </h1>

              <p className="contact-hero-desc">
                Whether you're planning a new software product, modernizing enterprise systems, or exploring AI-driven solutions, our experts are ready to help transform your vision into reality.
              </p>

              {/* DISPLAY PREMIUM CONTACT CARDS */}
              <div className="location-card-grid">
                <motion.div className="office-card-item" whileHover={{ y: -4 }}>
                  <div className="office-card-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <div>
                    <div className="office-card-title">🏢 Headquarters</div>
                    <div className="office-card-subtitle">KPHB, Hyderabad — Enterprise Operations Center</div>
                  </div>
                </motion.div>

                <motion.div className="office-card-item" whileHover={{ y: -4 }}>
                  <div className="office-card-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <div className="office-card-title">📍 Guntur Branch</div>
                    <div className="office-card-subtitle">Training & Development Center</div>
                  </div>
                </motion.div>

                <motion.div className="office-card-item" whileHover={{ y: -4 }}>
                  <div className="office-card-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <div>
                    <div className="office-card-title">📍 Vinukonda Branch</div>
                    <div className="office-card-subtitle">Business Expansion Office</div>
                  </div>
                </motion.div>
              </div>

              {/* QUICK CONTACT CHIPS */}
              <div className="quick-chips-wrapper">
                <a href="tel:+917794053340" className="contact-chip">
                  <i className="fas fa-phone-alt"></i> +91 77940 53340
                </a>
                <a href="mailto:support@ygrgobalitservices.com" className="contact-chip">
                  <i className="fas fa-envelope"></i> support@ygrgobalitservices.com
                </a>
                <a href="https://wa.me/917794053340" target="_blank" rel="noreferrer" className="contact-chip chip-whatsapp">
                  <i className="fab fa-whatsapp"></i> WhatsApp Chat
                </a>
                <span className="contact-chip text-muted" style={{ cursor: 'default' }}>
                  <i className="far fa-clock"></i> Mon–Fri | 9:30 AM – 6:30 PM
                </span>
              </div>

              {/* TRUST CARDS */}
              <div className="trust-cards-grid">
                <div className="trust-card-box">
                  <div className="trust-card-val">145+</div>
                  <div className="trust-card-lbl">Projects Delivered</div>
                </div>

                <div className="trust-card-box">
                  <div className="trust-card-val">99%</div>
                  <div className="trust-card-lbl">Client Satisfaction</div>
                </div>

                <div className="trust-card-box">
                  <div className="trust-card-val">24 Hours</div>
                  <div className="trust-card-lbl">Avg Response</div>
                </div>

                <div className="trust-card-box">
                  <div className="trust-card-val">5+</div>
                  <div className="trust-card-lbl">Years Experience</div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT SIDE: DYNAMIC CONTACT FORM ── */}
            <motion.div
              className="contact-right-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="contact-form-glass-card">
                <h3 className="form-header-title">Send Us A Message</h3>
                <p className="form-header-sub">
                  Tell us about your project and our specialists will contact you within one business day.
                </p>

                {statusMessage && (
                  <div className={`alert ${statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'} rounded-3 p-3 mb-4 small`}>
                    {statusMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-md-6">
                      <label className="form-label-custom">Full Name *</label>
                      <input
                        type="text"
                        className="form-control-custom"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </div>

                    {/* Company Name */}
                    <div className="col-md-6">
                      <label className="form-label-custom">Company Name</label>
                      <input
                        type="text"
                        className="form-control-custom"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Tech Solutions"
                      />
                    </div>

                    {/* Business Email */}
                    <div className="col-md-6">
                      <label className="form-label-custom">Business Email *</label>
                      <input
                        type="email"
                        className="form-control-custom"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@company.com"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="col-md-6">
                      <label className="form-label-custom">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control-custom"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>

                    {/* Service Category (Dynamic Dropdown loaded from GET /api/services) */}
                    <div className="col-12">
                      <label className="form-label-custom">Service Category (Dynamic) *</label>
                      {loadingServices ? (
                        <div className="form-control-custom text-muted">Loading services...</div>
                      ) : (
                        <select
                          className="form-select-custom"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                        >
                          {services.map((svc) => (
                            <option key={svc.id} value={svc.name}>
                              {svc.name}
                            </option>
                          ))}
                          {services.length === 0 && (
                            <>
                              <option value="Web Applications & Custom Portals">Web Applications & Custom Portals</option>
                              <option value="Mobile App Development (iOS & Android)">Mobile App Development (iOS & Android)</option>
                              <option value="Enterprise Cloud Systems & Migration">Enterprise Cloud Systems & Migration</option>
                              <option value="AI Engineering & LLM Automation">AI Engineering & LLM Automation</option>
                            </>
                          )}
                        </select>
                      )}
                    </div>

                    {/* Budget (Optional) */}
                    <div className="col-md-6">
                      <label className="form-label-custom">Budget (Optional)</label>
                      <select
                        className="form-select-custom"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select Estimated Budget</option>
                        <option value="Under ₹10,000">Under ₹10,000</option>
                        <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000+">₹50,000+</option>
                      </select>
                    </div>

                    {/* Project Timeline (Optional) */}
                    <div className="col-md-6">
                      <label className="form-label-custom">Project Timeline (Optional)</label>
                      <select
                        className="form-select-custom"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                      >
                        <option value="">Select Target Timeline</option>
                        <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                        <option value="1 - 3 Months">1 - 3 Months</option>
                        <option value="3 - 6 Months">3 - 6 Months</option>
                        <option value="Flexible / Strategic">Flexible / Strategic</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label className="form-label-custom">Project Overview & Goals *</label>
                      <textarea
                        className="form-control-custom"
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements, scope, or current challenges..."
                        required
                      ></textarea>
                    </div>

                    {/* Checkbox Privacy Policy */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="agreePrivacy"
                          name="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label form-check-label-custom" htmlFor="agreePrivacy">
                          I agree to the privacy policy and consent to YGR Gobal processing my enquiry details.
                        </label>
                      </div>
                    </div>

                    {/* Buttons: Send Message & Schedule Meeting */}
                    <div className="col-12 mt-4 d-flex flex-wrap gap-3">
                      <motion.button
                        type="submit"
                        className="btn-send-message flex-grow-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span> Submitting...
                          </>
                        ) : (
                          <>
                            Send Message <i className="fas fa-paper-plane"></i>
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        className="btn-schedule-meeting flex-grow-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleScheduleMeeting}
                      >
                        <i className="far fa-calendar-check"></i> Schedule Meeting
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================================
          EXISTING SECOND SECTION: GOOGLE MAPS EMBED SECTION
         ========================================================== */}
      <div className="map-section reveal my-5">
        <div className="container" style={{ maxWidth: '1320px' }}>
          <div className="rounded-4 overflow-hidden shadow-sm border" style={{ borderRadius: '24px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8205.3507874237!2d78.392665!3d17.489361!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2aa1a33d59440f77%3A0x595e01da47d1657b!2sYGR%20GOBAL%20IT%20SERVICES%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1767593924604!5m2!1sen!2sin"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              title="YGR Gobal Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
