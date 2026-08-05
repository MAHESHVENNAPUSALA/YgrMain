import React, { useState, useEffect } from 'react';

const FALLBACK_JOBS = [
  { title:'React.js Developer', type:'Full Time', exp:'1-3 Years', location:'KPHB, Hyderabad', dept:'Engineering', desc:'Build dynamic web applications using React.js, Redux, and REST APIs. Experience with Django or Node.js backend is a plus.', skills:['React.js','JavaScript','REST APIs','Git','HTML/CSS'] },
  { title:'Django Backend Developer', type:'Full Time', exp:'1-3 Years', location:'KPHB, Hyderabad', dept:'Engineering', desc:'Develop and maintain Django-based REST APIs. Knowledge of PostgreSQL, authentication, and deployment is required.', skills:['Python','Django','PostgreSQL','REST API','Linux'] },
  { title:'Digital Marketing Executive', type:'Full Time', exp:'0-2 Years', location:'KPHB, Hyderabad', dept:'Marketing', desc:'Manage SEO, Google Ads, social media campaigns, and content strategy for clients across industries.', skills:['SEO','Google Ads','Social Media','Content Writing','Analytics'] },
  { title:'UI/UX Designer', type:'Full Time', exp:'1-2 Years', location:'KPHB, Hyderabad', dept:'Design', desc:'Create user-centric designs using Figma. Strong portfolio of mobile and web UI work required.', skills:['Figma','Adobe XD','Wireframing','Prototyping','Design Systems'] },
  { title:'IT Training Instructor', type:'Full Time', exp:'2-4 Years', location:'KPHB, Hyderabad', dept:'Training', desc:'Conduct training sessions for Python, Java, or React. Curriculum development and student mentoring experience needed.', skills:['Python/Java/React','Teaching','Curriculum Design','Mentoring'] },
  { title:'Internship \u2013 Full Stack Developer', type:'Internship', exp:'Fresher', location:'KPHB, Hyderabad (Remote eligible)', dept:'Engineering', desc:'6-month internship on live projects. Learn and apply React, Django, databases and deployment. Stipend + certificate provided.', skills:['HTML/CSS','JavaScript','Python basics','Eager to learn'] },
];

const Careers = () => {
  const [open, setOpen] = useState(null);
  const [jobs, setJobs] = useState(FALLBACK_JOBS);
  const [form, setForm] = useState({ name:'', email:'', phone:'', role:'', msg:'' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/public/jobs/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleApply = (title) => { setForm(f => ({...f, role:title})); document.getElementById('careers-apply-form').scrollIntoView({behavior:'smooth'}); };
  const handleChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <style>{`
        .car-hero { background:linear-gradient(135deg,#092a49 0%,#1e3c72 100%); padding:80px 30px; text-align:center; }
        .car-hero h1 { font-family:'Oswald','Outfit',sans-serif; font-size:clamp(2rem,5vw,3rem); color:#fff; font-weight:700; margin-bottom:14px; }
        .car-hero p { color:rgba(255,255,255,0.8); font-size:17px; max-width:600px; margin:0 auto 14px; }
        .car-breadcrumb { color:rgba(255,255,255,0.6); font-size:14px; }
        .car-breadcrumb a { color:#fbcc27; text-decoration:none; }

        .car-body { padding:60px 30px; background:#f8fafc; }
        .car-inner { max-width:1000px; margin:0 auto; }
        .car-section-title { text-align:center; margin-bottom:40px; }
        .car-section-title h2 { font-family:'Oswald','Outfit',sans-serif; font-size:2rem; color:#092a49; font-weight:700; }
        .car-section-title p { color:#666; font-size:15px; }

        .car-job-card { background:#fff; border-radius:16px; padding:28px 30px; margin-bottom:18px; box-shadow:0 3px 16px rgba(0,0,0,0.07); border:1px solid #f0f0f0; transition:box-shadow 0.2s; }
        .car-job-card:hover { box-shadow:0 8px 28px rgba(0,0,0,0.12); }
        .car-job-header { display:flex; justify-content:space-between; align-items:flex-start; cursor:pointer; gap:16px; }
        .car-job-meta { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
        .car-job-tag { background:#f0f4ff; color:#0796fe; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; }
        .car-job-tag.type { background:#e8fff4; color:#27ae60; }
        .car-job-tag.exp { background:#fff8e8; color:#e67e22; }
        .car-job-title { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.2rem; font-weight:700; }
        .car-job-toggle { font-size:20px; color:#0796fe; flex-shrink:0; }
        .car-job-body { margin-top:18px; padding-top:18px; border-top:1px solid #f0f0f0; }
        .car-job-body p { color:#666; font-size:14px; line-height:1.7; margin-bottom:14px; }
        .car-skill-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:18px; }
        .car-skill-tag { background:#f0f4ff; color:#092a49; font-size:11px; font-weight:600; padding:3px 10px; border-radius:20px; }
        .car-apply-btn { padding:10px 24px; border-radius:50px; background:linear-gradient(135deg,#0796fe,#0765fe); color:#fff; border:none; cursor:pointer; font-size:13px; font-weight:700; transition:all 0.3s; font-family:inherit; }
        .car-apply-btn:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(7,150,254,0.35); }

        .car-form-section { background:#fff; border-radius:20px; padding:48px 40px; margin-top:60px; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
        .car-form-section h2 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.8rem; font-weight:700; margin-bottom:8px; }
        .car-form-section p { color:#666; margin-bottom:30px; }
        .car-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .car-form-group { display:flex; flex-direction:column; gap:6px; }
        .car-form-group label { font-size:13px; font-weight:700; color:#092a49; text-transform:uppercase; letter-spacing:0.05em; }
        .car-form-group input, .car-form-group select, .car-form-group textarea { padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; color:#333; outline:none; transition:border 0.2s; font-family:inherit; }
        .car-form-group input:focus, .car-form-group select:focus, .car-form-group textarea:focus { border-color:#0796fe; }
        .car-form-full { grid-column:1/-1; }
        .car-submit-btn { margin-top:10px; padding:14px 36px; border-radius:50px; background:linear-gradient(135deg,#092a49,#1e3c72); color:#fff; border:none; cursor:pointer; font-size:15px; font-weight:700; transition:all 0.3s; font-family:inherit; }
        .car-submit-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(9,42,73,0.3); }
        .car-success { text-align:center; padding:40px; }
        .car-success i { font-size:60px; color:#27ae60; margin-bottom:18px; display:block; }
        .car-success h3 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.5rem; }

        @media (max-width:600px) { .car-form-grid { grid-template-columns:1fr; } .car-form-section { padding:28px 20px; } }
      `}</style>

      <div className="car-hero">
        <h1>Careers at YGR</h1>
        <p>Join our growing team of innovators and build the future of technology together.</p>
        <div className="car-breadcrumb"><a href="/">Home</a> › Careers</div>
      </div>

      <div className="car-body">
        <div className="car-inner">
          <div className="car-section-title">
            <h2>Open Positions</h2>
            <p>We're always looking for talented people. See if there's a role that fits you.</p>
          </div>

          {jobs.map((j, i) => (
            <div key={i} className="car-job-card">
              <div className="car-job-header" onClick={() => setOpen(open === i ? null : i)}>
                <div>
                  <div className="car-job-title">{j.title}</div>
                  <div className="car-job-meta">
                    <span className="car-job-tag type">{j.type}</span>
                    <span className="car-job-tag exp">{j.exp}</span>
                    <span className="car-job-tag"><i className="fas fa-map-marker-alt"></i> {j.location}</span>
                    <span className="car-job-tag">{j.dept}</span>
                  </div>
                </div>
                <span className="car-job-toggle">{open === i ? '\u2212' : '+'}</span>
              </div>
              {open === i && (
                <div className="car-job-body">
                  <p>{j.desc}</p>
                  <div className="car-skill-tags">{(j.skills || []).map((s, k) => <span key={k} className="car-skill-tag">{s}</span>)}</div>
                  <button className="car-apply-btn" onClick={() => handleApply(j.title)}>Apply Now →</button>
                </div>
              )}
            </div>
          ))}

          {/* APPLICATION FORM */}
          <div className="car-form-section" id="careers-apply-form">
            <h2>Apply Now</h2>
            <p>Fill in your details and we'll get back to you within 2 business days.</p>
            {submitted ? (
              <div className="car-success">
                <i className="fas fa-check-circle"></i>
                <h3>Application Submitted!</h3>
                <p>Thank you for your interest. Our HR team will review your application and contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="car-form-grid">
                  <div className="car-form-group">
                    <label>Full Name *</label>
                    <input name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="car-form-group">
                    <label>Email *</label>
                    <input name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="car-form-group">
                    <label>Phone *</label>
                    <input name="phone" required placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="car-form-group">
                    <label>Position Applying For *</label>
                    <select name="role" required value={form.role} onChange={handleChange}>
                      <option value="">Select a position</option>
                      {jobs.map((j, i) => <option key={i} value={j.title}>{j.title}</option>)}
                    </select>
                  </div>
                  <div className="car-form-group car-form-full">
                    <label>Cover Letter / Message</label>
                    <textarea name="msg" rows="4" placeholder="Tell us about yourself and why you'd like to join YGR..." value={form.msg} onChange={handleChange}></textarea>
                  </div>
                </div>
                <button type="submit" className="car-submit-btn">Submit Application</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
