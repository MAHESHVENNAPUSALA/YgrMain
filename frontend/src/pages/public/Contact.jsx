import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ContactPage = () => {
  const location = useLocation();
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Extract initial subject/service from URL params if directed from Services page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service') || params.get('subject');
    if (serviceParam) {
      setForm(f => ({ ...f, subject: serviceParam }));
    }
  }, [location]);

  const handleChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}));
  
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    fetch('/api/public/inquiry/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to submit inquiry.');
        }
        return res.json();
      })
      .then(() => {
        setSubmitted(true);
      })
      .catch(err => {
        setErrorMsg(err.message || 'Something went wrong. Please try again.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <style>{`
        .con-hero { background:linear-gradient(135deg,#092a49 0%,#1e3c72 100%); padding:80px 30px; text-align:center; }
        .con-hero h1 { font-family:'Oswald','Outfit',sans-serif; font-size:clamp(2rem,5vw,3rem); color:#fff; font-weight:700; margin-bottom:14px; }
        .con-hero p { color:rgba(255,255,255,0.8); font-size:17px; max-width:580px; margin:0 auto 14px; }
        .con-breadcrumb { color:rgba(255,255,255,0.6); font-size:14px; }
        .con-breadcrumb a { color:#fbcc27; text-decoration:none; }

        .con-body { padding:70px 30px; background:#f8fafc; }
        .con-inner { max-width:1200px; margin:0 auto; }
        .con-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:50px; }

        .con-info h2 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.8rem; font-weight:700; margin-bottom:8px; }
        .con-info p { color:#666; font-size:15px; line-height:1.7; margin-bottom:28px; }
        .con-info-card { background:#fff; border-radius:14px; padding:24px; box-shadow:0 3px 16px rgba(0,0,0,0.06); margin-bottom:16px; display:flex; gap:16px; align-items:flex-start; }
        .con-info-icon { width:50px; height:50px; border-radius:12px; background:#e8f4ff; display:flex; align-items:center; justify-content:center; font-size:20px; color:#0796fe; flex-shrink:0; }
        .con-info-text h4 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1rem; font-weight:700; margin-bottom:4px; }
        .con-info-text p { color:#666; font-size:14px; margin:0; line-height:1.5; }
        .con-info-text a { color:#0796fe; text-decoration:none; }

        .con-social-row { display:flex; gap:12px; margin-top:24px; }
        .con-social-btn { width:42px; height:42px; border-radius:50%; background:#092a49; color:#fff; display:flex; align-items:center; justify-content:center; font-size:16px; text-decoration:none; transition:all 0.3s; }
        .con-social-btn:hover { background:#0796fe; transform:translateY(-3px); }

        .con-form-card { background:#fff; border-radius:20px; padding:44px 40px; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
        .con-form-card h2 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.8rem; font-weight:700; margin-bottom:8px; }
        .con-form-card > p { color:#666; margin-bottom:28px; }
        .con-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .con-form-group { display:flex; flex-direction:column; gap:6px; }
        .con-form-group.full { grid-column:1/-1; }
        .con-form-group label { font-size:12px; font-weight:700; color:#092a49; text-transform:uppercase; letter-spacing:0.05em; }
        .con-form-group input, .con-form-group textarea, .con-form-group select { padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; color:#333; outline:none; transition:border 0.2s; font-family:inherit; resize:vertical; }
        .con-form-group input:focus, .con-form-group textarea:focus, .con-form-group select:focus { border-color:#0796fe; box-shadow:0 0 0 3px rgba(7,150,254,0.1); }
        .con-submit-btn { width:100%; padding:14px; border-radius:50px; background:linear-gradient(135deg,#092a49,#1e3c72); color:#fff; border:none; cursor:pointer; font-size:15px; font-weight:700; margin-top:20px; transition:all 0.3s; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:8px; }
        .con-submit-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(9,42,73,0.3); }
        .con-submit-btn:disabled { opacity:0.7; cursor:not-allowed; }

        .con-success { text-align:center; padding:40px 20px; }
        .con-success i { font-size:60px; color:#27ae60; margin-bottom:18px; display:block; }
        .con-success h3 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.5rem; margin-bottom:10px; }
        .con-success p { color:#666; }

        .con-error { background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-size: 14px; border: 1px solid #f5c6cb; }

        .con-map { margin-top:60px; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.1); }
        .con-map iframe { width:100%; height:350px; border:none; display:block; }

        @media (max-width:900px) { .con-grid { grid-template-columns:1fr; } }
        @media (max-width:560px) { .con-form-grid { grid-template-columns:1fr; } .con-form-card { padding:28px 20px; } }
      `}</style>

      <div className="con-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out for a free consultation or project inquiry.</p>
        <div className="con-breadcrumb"><a href="/">Home</a> › Contact Us</div>
      </div>

      <div className="con-body">
        <div className="con-inner">
          <div className="con-grid">
            {/* LEFT: Info */}
            <div className="con-info">
              <h2>Get In Touch</h2>
              <p>Whether you have a project idea, need IT support, or want to join our team — we're here to help.</p>

              <div className="con-info-card">
                <div className="con-info-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="con-info-text">
                  <h4>Our Office</h4>
                  <p>KPHB Colony, Kukatpally<br/>Hyderabad, Telangana – 500072</p>
                </div>
              </div>
              <div className="con-info-card">
                <div className="con-info-icon"><i className="fas fa-phone-alt"></i></div>
                <div className="con-info-text">
                  <h4>Phone / WhatsApp</h4>
                  <p><a href="tel:+917794053340">+91 77940 53340</a></p>
                </div>
              </div>
              <div className="con-info-card">
                <div className="con-info-icon"><i className="fas fa-envelope"></i></div>
                <div className="con-info-text">
                  <h4>Email</h4>
                  <p><a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a></p>
                </div>
              </div>
              <div className="con-info-card">
                <div className="con-info-icon"><i className="fas fa-clock"></i></div>
                <div className="con-info-text">
                  <h4>Business Hours</h4>
                  <p>Monday – Friday: 9:30 AM – 6:30 PM<br/>Saturday: 10:00 AM – 2:00 PM</p>
                </div>
              </div>

              <div className="con-social-row">
                <a href="https://x.com/ygrgobalit2024" className="con-social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-x-twitter"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61568888033386" className="con-social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/" className="con-social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/ygrgobalitservices/" className="con-social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@rrtalktrends" className="con-social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="con-form-card">
              <h2>Send Us a Message</h2>
              <p>Fill the form and our team will respond within 24 hours.</p>
              
              {errorMsg && <div className="con-error">{errorMsg}</div>}

              {submitted ? (
                <div className="con-success">
                  <i className="fas fa-check-circle"></i>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="con-form-grid">
                    <div className="con-form-group">
                      <label>Your Name *</label>
                      <input name="name" required placeholder="Full name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="con-form-group">
                      <label>Email *</label>
                      <input name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="con-form-group">
                      <label>Phone</label>
                      <input name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="con-form-group">
                      <label>Subject / Service Required *</label>
                      <select name="subject" required value={form.subject} onChange={handleChange}>
                        <option value="">Select Service / Subject</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="IT Training & Internships">IT Training & Internships</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="IT Support & Maintenance">IT Support & Maintenance</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                    <div className="con-form-group full">
                      <label>Message *</label>
                      <textarea name="message" rows="5" required placeholder="Tell us more about your project or requirement..." value={form.message} onChange={handleChange}></textarea>
                    </div>
                  </div>
                  <button type="submit" className="con-submit-btn" disabled={submitting}>
                    <i className="fas fa-paper-plane"></i> {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* MAP */}
          <div className="con-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.516!2d78.3942!3d17.4875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzE1LjAiTiA3OMKwMjMnMzkuMSJF!5e0!3m2!1sen!2sin!4v1625000000000"
              allowFullScreen="" loading="lazy" title="YGR Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
