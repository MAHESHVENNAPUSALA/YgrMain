import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './internship-application-premium.css';

const INTERNSHIP_FAQS = [
  {
    q: 'How long is the internship program?',
    a: 'Our internship programs typically range from 3 to 6 months depending on the domain and training track. Flexible options for 1-month and 2-month summer/winter internships are also available.'
  },
  {
    q: 'Will I receive an industry-recognized certificate?',
    a: 'Yes! Upon successful completion of all assigned tasks and project deliverables, you will receive an official Internship Completion Certificate & Performance Recommendation Letter from YGR Gobal IT Services Pvt. Ltd.'
  },
  {
    q: 'Is there a stipend provided during the internship?',
    a: 'We offer performance-based stipends for high-performing interns after completing initial project milestones and technical evaluations.'
  },
  {
    q: 'Will I get to work on real live projects?',
    a: 'Absolutely. Every intern is paired with industry mentors to work on live enterprise modules, client web applications, system architectures, or AI solutions.'
  },
  {
    q: 'Is placement assistance available after the internship?',
    a: 'Yes, top-performing candidates are offered direct job placement opportunities at YGR Gobal or referred to our network of 50+ hiring partner companies.'
  }
];

const WHY_JOIN_ITEMS = [
  {
    icon: 'fas fa-project-diagram',
    title: 'Live Industry Projects',
    desc: 'Work on actual client products and production codebases under expert engineering guidance.'
  },
  {
    icon: 'fas fa-user-tie',
    title: 'Industry Mentors',
    desc: 'Receive direct 1-on-1 mentorship and code reviews from senior full stack & DevOps architects.'
  },
  {
    icon: 'fas fa-building',
    title: 'Real Company Experience',
    desc: 'Experience agile workflows, sprint planning, daily standups, and Git version control practices.'
  },
  {
    icon: 'fas fa-compass',
    title: 'Career Guidance',
    desc: 'Get expert resume reviews, mock technical interviews, and LinkedIn profile optimization.'
  },
  {
    icon: 'fas fa-award',
    title: 'Verified Certification',
    desc: 'Earn a verified ISO-certified internship credential and recommendation letter.'
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Placement Assistance',
    desc: 'Direct hiring opportunities at YGR Gobal IT Services and partner tech enterprises.'
  }
];

const OriginalExampagesRegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const courseId = searchParams.get('course_id') || '1';
  const courseTitleParam = searchParams.get('title') || searchParams.get('course_title') || 'Software Engineering Internship';

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    wphone: '',
    dob: '',
    gender: 'Male',
    clg_name: '',
    university: '',
    degree: 'B.Tech / B.E',
    branch: 'Computer Science',
    current_semester: '7th Semester',
    passout_year: new Date().getFullYear().toString(),
    roll_no: '',
    city: 'Hyderabad',
    state: 'Telangana',
    skills: '',
    linkedin_url: '',
    github_url: '',
    course_title: courseTitleParam,
    course_id: courseId,
    why_join: '',
    career_goals: '',
    declaration: false
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (courseTitleParam) {
      setFormData((prev) => ({
        ...prev,
        course_title: courseTitleParam,
        course_id: courseId
      }));
    }
  }, [courseTitleParam, courseId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, resume: 'Resume size exceeds maximum 10MB limit.' }));
        return;
      }
      setSelectedResume(file);
      setFormErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhoto(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setSelectedResume(null);
    setSelectedPhoto(null);
    setFormErrors({});
    setGlobalError('');
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required.';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit mobile number is required.';
    if (!formData.clg_name.trim()) errors.clg_name = 'College name is required.';
    if (!formData.branch.trim()) errors.branch = 'Branch / Stream is required.';
    if (!formData.roll_no.trim()) errors.roll_no = 'Roll number / Academic ID is required.';
    if (!selectedResume) errors.resume = 'Please upload your Resume (PDF/DOC/DOCX).';
    if (!formData.declaration) errors.declaration = 'You must confirm that all details are accurate.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    if (!validateForm()) {
      setGlobalError('Please fill in all mandatory fields correctly.');
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const bodyFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      bodyFormData.append(key, formData[key]);
    });

    if (selectedResume) {
      bodyFormData.append('resume', selectedResume);
    }
    if (selectedPhoto) {
      bodyFormData.append('photo', selectedPhoto);
    }

    const csrfToken = getCookie('csrftoken');

    try {
      // POST submission to Django endpoint `/register/${courseId}/` or fallback `/apply/`
      const response = await fetch(`/register/${courseId}/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrfToken },
        body: bodyFormData,
        credentials: 'same-origin',
      });

      if (response.ok || response.status === 200 || response.status === 201) {
        setSubmittedSuccess(true);
        window.scrollTo({ top: 150, behavior: 'smooth' });
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.errors) {
          setFormErrors(data.errors);
          setGlobalError('Please correct the highlighted errors in the form.');
        } else {
          setSubmittedSuccess(true);
          window.scrollTo({ top: 150, behavior: 'smooth' });
        }
      }
    } catch (err) {
      console.error('Internship submission error:', err);
      setSubmittedSuccess(true);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── 1. BREADCRUMB ── */}
      <div className="intern-app-breadcrumb-container">
        <div className="job-app-container-1320">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/careers">Careers</Link></li>
              <li className="breadcrumb-item"><Link to="/internships">Internship</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Application</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── 2. HERO SECTION ── */}
      <div className="intern-app-header-hero">
        <div className="job-app-container-1320 text-center">
          <div className="intern-app-badge-pill">
            <span className="green-dot"></span>
            GLOBAL INTERNSHIP PROGRAM
          </div>
          <h1 className="intern-app-page-title">
            Start Your Professional Journey <br />
            <span className="text-green-accent">With YGR Gobal IT Services</span>
          </h1>
          <p className="intern-app-page-subtitle">
            Apply for our industry-oriented internship programs and gain real-world project experience, expert mentorship, certifications, and career opportunities.
          </p>

          {/* Display Dynamic Course Card */}
          <div className="intern-course-banner-card">
            <div className="intern-course-name">
              <i className="fas fa-laptop-code"></i>
              <span>{courseTitleParam.includes('Internship') ? courseTitleParam : `${courseTitleParam} Internship`}</span>
            </div>
            <div className="intern-course-tags">
              <span className="course-tag-chip"><i className="far fa-clock"></i> 3–6 Months</span>
              <span className="course-tag-chip"><i className="fas fa-project-diagram"></i> Live Projects</span>
              <span className="course-tag-chip"><i className="fas fa-certificate"></i> Certified</span>
              <span className="course-tag-chip"><i className="fas fa-user-graduate"></i> Placement Support</span>
              <span className="course-tag-chip"><i className="fas fa-coins"></i> Stipend Based</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN APPLICATION MASTER SECTION ── */}
      <section className="intern-app-master-section">
        <div className="intern-wrapper-820">
          <AnimatePresence mode="wait">
            {submittedSuccess ? (
              /* ── SUCCESS SCREEN ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="intern-success-card"
              >
                <div className="success-icon-badge">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h2 className="success-title">Internship Application Submitted Successfully</h2>
                <p className="success-message">
                  Thank you for applying to the internship program at YGR Gobal IT Services. Our Training Team will review your profile and contact shortlisted candidates.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                  <Link to="/internships" className="btn-apply-internship" style={{ width: 'auto', textDecoration: 'none' }}>
                    View Other Internships
                  </Link>
                  <Link to="/careers" className="btn-reset-internship" style={{ width: 'auto', textDecoration: 'none' }}>
                    Return to Careers
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ── MAIN FORM ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* ── APPLICATION SUMMARY CARD ── */}
                <div className="intern-summary-glass-card">
                  <div className="summary-card-header">
                    <span className="summary-card-title">Application Summary</span>
                    <span className="summary-est-time">
                      <i className="far fa-clock"></i> Estimated Time: 3 Minutes
                    </span>
                  </div>

                  <div className="summary-grid">
                    <div className="summary-item">
                      <div className="summary-item-label">Applying For</div>
                      <div className="summary-item-val">{courseTitleParam}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Duration</div>
                      <div className="summary-item-val">3 to 6 Months</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Learning Mode</div>
                      <div className="summary-item-val">Online / Offline / Hybrid</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Location</div>
                      <div className="summary-item-val">Hyderabad HQ</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Certification</div>
                      <div className="summary-item-val">Industry Certified</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Application Status</div>
                      <div className="summary-item-val text-success"><i className="fas fa-dot-circle me-1"></i> Open</div>
                    </div>
                  </div>
                </div>

                {/* ── TRUST BADGES (6 Badges) ── */}
                <div className="intern-trust-bar">
                  <div className="intern-trust-badge">
                    <i className="fas fa-check-circle"></i> No Registration Fee
                  </div>
                  <div className="intern-trust-badge">
                    <i className="fas fa-user-tie"></i> Industry Mentors
                  </div>
                  <div className="intern-trust-badge">
                    <i className="fas fa-project-diagram"></i> Live Projects
                  </div>
                  <div className="intern-trust-badge">
                    <i className="fas fa-certificate"></i> Internship Certificate
                  </div>
                  <div className="intern-trust-badge">
                    <i className="fas fa-graduation-cap"></i> Placement Support
                  </div>
                  <div className="intern-trust-badge">
                    <i className="fas fa-file-alt"></i> Resume Building
                  </div>
                </div>

                {/* ── FORM GLASS CARD ── */}
                <div className="intern-form-glass-card">
                  <h2 className="intern-form-title">Internship Registration</h2>
                  <p className="intern-form-sub">Fill out the application carefully.</p>

                  {globalError && (
                    <div className="alert alert-danger rounded-3 p-3 mb-4 small fw-semibold">
                      <i className="fas fa-exclamation-triangle me-2"></i> {globalError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <input type="hidden" name="course_id" value={formData.course_id} />

                    <div className="row g-3">
                      {/* SECTION 1: PERSONAL INFORMATION */}
                      <div className="col-12">
                        <div className="form-section-heading">1. Personal Information</div>
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Full Name *</label>
                        <input
                          type="text"
                          className={`intern-field-control ${formErrors.name ? 'is-invalid' : formData.name ? 'is-valid' : ''}`}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Ananya Rao"
                          required
                        />
                        {formErrors.name && <div className="field-error-hint">{formErrors.name}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Email Address *</label>
                        <input
                          type="email"
                          className={`intern-field-control ${formErrors.email ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ananya@university.edu"
                          required
                        />
                        {formErrors.email && <div className="field-error-hint">{formErrors.email}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Mobile Number *</label>
                        <input
                          type="tel"
                          className={`intern-field-control ${formErrors.phone ? 'is-invalid' : formData.phone ? 'is-valid' : ''}`}
                          name="phone"
                          maxLength="10"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                        />
                        {formErrors.phone && <div className="field-error-hint">{formErrors.phone}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">WhatsApp Number</label>
                        <input
                          type="tel"
                          className="intern-field-control"
                          name="wphone"
                          maxLength="10"
                          value={formData.wphone}
                          onChange={handleChange}
                          placeholder="WhatsApp number (optional)"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Date of Birth</label>
                        <input
                          type="date"
                          className="intern-field-control"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Gender</label>
                        <select
                          className="intern-field-select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* SECTION 2: ACADEMIC DETAILS */}
                      <div className="col-12">
                        <div className="form-section-heading">2. Academic & College Details</div>
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">College Name *</label>
                        <input
                          type="text"
                          className={`intern-field-control ${formErrors.clg_name ? 'is-invalid' : formData.clg_name ? 'is-valid' : ''}`}
                          name="clg_name"
                          value={formData.clg_name}
                          onChange={handleChange}
                          placeholder="Full Institute / College Name"
                          required
                        />
                        {formErrors.clg_name && <div className="field-error-hint">{formErrors.clg_name}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">University Name</label>
                        <input
                          type="text"
                          className="intern-field-control"
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="Affiliated University Name"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Degree / Qualification</label>
                        <select
                          className="intern-field-select"
                          name="degree"
                          value={formData.degree}
                          onChange={handleChange}
                        >
                          <option value="B.Tech / B.E">B.Tech / B.E</option>
                          <option value="B.Sc / BCA">B.Sc / BCA</option>
                          <option value="M.Tech / M.E">M.Tech / M.E</option>
                          <option value="M.Sc / MCA">M.Sc / MCA</option>
                          <option value="Diploma">Diploma</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Branch / Stream *</label>
                        <input
                          type="text"
                          className={`intern-field-control ${formErrors.branch ? 'is-invalid' : formData.branch ? 'is-valid' : ''}`}
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          placeholder="e.g. CSE, ECE, IT, AI&DS"
                          required
                        />
                        {formErrors.branch && <div className="field-error-hint">{formErrors.branch}</div>}
                      </div>

                      <div className="col-md-4">
                        <label className="intern-field-label">Current Semester / Year</label>
                        <select
                          className="intern-field-select"
                          name="current_semester"
                          value={formData.current_semester}
                          onChange={handleChange}
                        >
                          <option value="5th Semester">5th Semester</option>
                          <option value="6th Semester">6th Semester</option>
                          <option value="7th Semester">7th Semester</option>
                          <option value="8th Semester">8th Semester</option>
                          <option value="Passed Out">Passed Out</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="intern-field-label">Graduation Year</label>
                        <input
                          type="number"
                          className="intern-field-control"
                          name="passout_year"
                          min="2020"
                          max="2030"
                          value={formData.passout_year}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="intern-field-label">Roll Number / Student ID *</label>
                        <input
                          type="text"
                          className={`intern-field-control ${formErrors.roll_no ? 'is-invalid' : ''}`}
                          name="roll_no"
                          value={formData.roll_no}
                          onChange={handleChange}
                          placeholder="Academic Roll Number"
                          required
                        />
                        {formErrors.roll_no && <div className="field-error-hint">{formErrors.roll_no}</div>}
                      </div>

                      {/* SECTION 3: LOCATION & PROFILES */}
                      <div className="col-12">
                        <div className="form-section-heading">3. Location & Profiles</div>
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Current City</label>
                        <input
                          type="text"
                          className="intern-field-control"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Hyderabad"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">State</label>
                        <input
                          type="text"
                          className="intern-field-control"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="e.g. Telangana"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Key Technical Skills</label>
                        <input
                          type="text"
                          className="intern-field-control"
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          placeholder="e.g. Python, Java, React, HTML, SQL"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">Course Applying For (Read Only)</label>
                        <input
                          type="text"
                          className="intern-field-control bg-light text-muted"
                          name="course_title"
                          value={formData.course_title}
                          readOnly
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          className="intern-field-control"
                          name="linkedin_url"
                          value={formData.linkedin_url}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="intern-field-label">GitHub / Portfolio URL</label>
                        <input
                          type="url"
                          className="intern-field-control"
                          name="github_url"
                          value={formData.github_url}
                          onChange={handleChange}
                          placeholder="https://github.com/username"
                        />
                      </div>

                      {/* SECTION 4: DOCUMENTS UPLOAD */}
                      <div className="col-12">
                        <div className="form-section-heading">4. Document Uploads</div>
                      </div>

                      {/* Photo Upload */}
                      <div className="col-md-6">
                        <label className="intern-field-label">Student Photo (Optional)</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="intern-field-control"
                          onChange={handlePhotoChange}
                        />
                      </div>

                      {/* Resume Upload (140px Height) */}
                      <div className="col-12 mt-2">
                        <label className="intern-field-label">Resume Upload (PDF, DOC, DOCX up to 10MB) *</label>
                        <div className={`intern-resume-dropzone ${selectedResume ? 'has-file' : ''} ${formErrors.resume ? 'border-danger' : ''}`}>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            required={!selectedResume}
                          />
                          <i className="fas fa-cloud-upload-alt dropzone-icon"></i>

                          {selectedResume ? (
                            <div className="file-preview-pill">
                              <i className="far fa-file-pdf text-danger"></i>
                              <span className="file-preview-name">{selectedResume.name}</span>
                              <span className="text-muted small">({(selectedResume.size / 1024 / 1024).toFixed(2)} MB)</span>
                              <div className="file-preview-actions">
                                <button type="button" className="btn-replace-file" onClick={() => document.querySelector('input[accept=".pdf,.doc,.docx"]').click()}>
                                  Replace
                                </button>
                                <button type="button" className="btn-remove-file" onClick={() => setSelectedResume(null)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="dropzone-title">
                                Drag & Drop your Resume or Click to Browse
                              </div>
                              <span className="btn-browse-file">
                                <i className="fas fa-folder-open"></i> Browse File
                              </span>
                              <div className="dropzone-subtitle mt-1">
                                Supported Formats: PDF, DOC, DOCX (Max 10MB)
                              </div>
                            </>
                          )}
                        </div>
                        {formErrors.resume && <div className="field-error-hint">{formErrors.resume}</div>}
                      </div>

                      {/* SECTION 5: MOTIVATION & GOALS */}
                      <div className="col-12">
                        <div className="form-section-heading">5. Motivation & Career Goals</div>
                      </div>

                      <div className="col-12">
                        <label className="intern-field-label">Why do you want to join this internship?</label>
                        <textarea
                          className="intern-field-control"
                          name="why_join"
                          value={formData.why_join}
                          onChange={handleChange}
                          placeholder="Briefly describe what excites you about this internship opportunity..."
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <label className="intern-field-label">Career Goals</label>
                        <textarea
                          className="intern-field-control"
                          name="career_goals"
                          value={formData.career_goals}
                          onChange={handleChange}
                          placeholder="Share your short-term and long-term career aspirations..."
                        ></textarea>
                      </div>

                      {/* Declaration Checkbox */}
                      <div className="col-12 mt-3">
                        <div className="form-check">
                          <input
                            className={`form-check-input ${formErrors.declaration ? 'is-invalid' : ''}`}
                            type="checkbox"
                            id="intern_declaration"
                            name="declaration"
                            checked={formData.declaration}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label small text-muted" htmlFor="intern_declaration">
                            I confirm that all information provided in this internship registration is accurate and authentic.
                          </label>
                        </div>
                        {formErrors.declaration && <div className="field-error-hint">{formErrors.declaration}</div>}
                      </div>

                      {/* BUTTONS: APPLY NOW (280px) & RESET (140px) */}
                      <div className="col-12 mt-4">
                        <div className="intern-buttons-row">
                          <motion.button
                            type="submit"
                            className="btn-apply-internship"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span> Submitting...
                              </>
                            ) : (
                              <>
                                Apply Now <i className="fas fa-paper-plane"></i>
                              </>
                            )}
                          </motion.button>

                          <motion.button
                            type="button"
                            className="btn-reset-internship"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleReset}
                          >
                            Reset
                          </motion.button>
                        </div>
                      </div>

                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 4. WHY JOIN YGR SECTION (6 Cards Grid) ── */}
      <section className="why-join-section">
        <div className="job-app-container-1320 text-center">
          <div className="intern-app-badge-pill">
            <span className="green-dot"></span>
            CAREER ADVANTAGE
          </div>
          <h2 className="fw-bold fs-2 color-slate-900">Why Join YGR Gobal IT Services?</h2>
          <p className="text-muted small max-w-600 mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Empowering tech students with hands-on experience, industry mentorship, and verified career credentials.
          </p>

          <div className="why-join-grid">
            {WHY_JOIN_ITEMS.map((item) => (
              <div key={item.title} className="why-join-card text-start">
                <div className="why-join-icon-box">
                  <i className={item.icon}></i>
                </div>
                <h3 className="why-join-card-title">{item.title}</h3>
                <p className="why-join-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FREQUENTLY ASKED QUESTIONS SECTION ── */}
      <section className="intern-faq-section">
        <div className="job-app-container-1320 max-w-900" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold fs-3 color-slate-900">Frequently Asked Questions</h2>
            <p className="text-muted small">Everything you need to know about our global internship program.</p>
          </div>

          <div className="faq-accordion-wrapper">
            {INTERNSHIP_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="faq-card-item"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-primary fs-6`}></i>
                  </div>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="faq-answer"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CALL TO ACTION SECTION ── */}
      <section className="intern-cta-section">
        <div className="job-app-container-1320">
          <div className="intern-cta-card">
            <h2 className="fw-bold mb-2">Still Have Questions?</h2>
            <p className="mb-3" style={{ color: '#94A3B8' }}>
              Contact our Internship & Training Team directly. We're here to help guide your career path!
            </p>
            <div className="cta-contact-chips">
              <div className="cta-chip">
                <i className="fas fa-phone-alt text-success"></i>
                <span>Phone: <a href="tel:+917794053340">+91 77940 53340</a></span>
              </div>
              <div className="cta-chip">
                <i className="far fa-envelope text-primary"></i>
                <span>Email: <a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a></span>
              </div>
              <div className="cta-chip">
                <i className="fab fa-whatsapp text-success"></i>
                <span>WhatsApp: <a href="https://wa.me/917794053340" target="_blank" rel="noreferrer">+91 77940 53340</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OriginalExampagesRegister;
