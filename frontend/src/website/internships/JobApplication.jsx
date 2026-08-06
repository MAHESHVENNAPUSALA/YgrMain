import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './job-application-premium.css';

const FAQ_ITEMS = [
  {
    q: 'What is the standard hiring process at YGR Global IT Services?',
    a: 'Our hiring process typically involves 3 stages: Resume Screening & Initial HR Call, Technical Interview (Coding / System Design), and Final Culture & Leadership Discussion.'
  },
  {
    q: 'How quickly will I receive feedback after submitting my application?',
    a: 'Our talent acquisition team reviews applications within 24–48 business hours. Shortlisted candidates are contacted via email or phone for interview scheduling.'
  },
  {
    q: 'Does YGR Global offer remote or hybrid work options?',
    a: 'Yes, we support flexible work modes depending on the role, project requirements, and client specifications, including Work From Home, Hybrid, and On-site opportunities.'
  },
  {
    q: 'Can freshers apply for engineering roles?',
    a: 'Absolutely! We regularly hire fresh graduates through our engineering campus and entry-level recruitment programs with structured training and mentorship.'
  }
];

const OriginalExampagesJobApplication = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Initial Form State
  const initialFormState = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    whatsapp: '',
    current_address: '',
    highest_qualification: 'Graduate',
    college_university: '',
    passout_year: new Date().getFullYear().toString(),
    candidate_type: 'Fresher',
    current_company: '',
    total_experience: '0',
    relevant_experience: '0',
    expected_salary: '',
    current_salary: '',
    notice_period: 'Immediate',
    preferred_location: 'Hyderabad',
    job_role: searchParams.get('role') || searchParams.get('title') || 'Software Engineer',
    department: searchParams.get('department') || 'Engineering',
    linkedin_url: '',
    portfolio_url: '',
    primary_skills: '',
    technical_skills: '',
    why_join: '',
    declaration: false
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const roleParam = searchParams.get('role') || searchParams.get('title');
    const deptParam = searchParams.get('department');
    if (roleParam || deptParam) {
      setFormData((prev) => ({
        ...prev,
        job_role: roleParam || prev.job_role,
        department: deptParam || prev.department
      }));
    }
  }, [searchParams]);

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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, resume: 'File size exceeds maximum 10MB limit.' }));
        return;
      }
      setSelectedFile(file);
      setFormErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setSelectedFile(null);
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
    if (!formData.first_name.trim()) errors.first_name = 'First name is required.';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required.';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit phone number is required.';
    if (!formData.current_address.trim()) errors.current_address = 'Current city / address is required.';
    if (!formData.college_university.trim()) errors.college_university = 'College or University name is required.';
    if (!formData.passout_year) errors.passout_year = 'Passout year is required.';
    if (!formData.job_role.trim()) errors.job_role = 'Job applying for is required.';
    if (!formData.department.trim()) errors.department = 'Department is required.';
    if (!formData.primary_skills.trim()) errors.primary_skills = 'Primary skills are required.';
    if (!selectedFile) errors.resume = 'Please upload your Resume (PDF/DOC/DOCX).';
    if (!formData.declaration) errors.declaration = 'You must confirm that all information provided is accurate.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    if (!validateForm()) {
      setGlobalError('Please fix the highlighted errors before submitting.');
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const bodyFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      bodyFormData.append(key, formData[key]);
    });

    if (selectedFile) {
      bodyFormData.append('resume', selectedFile);
    }

    const csrfToken = getCookie('csrftoken');

    try {
      const response = await fetch('/apply/', {
        method: 'POST',
        headers: { 'X-CSRFToken': csrfToken },
        body: bodyFormData,
        credentials: 'same-origin',
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else if (response.ok) {
        setSubmittedSuccess(true);
        window.scrollTo({ top: 150, behavior: 'smooth' });
      } else {
        const data = await response.json().catch(() => ({}));
        setGlobalError(data.error || 'Submission failed. Please verify your details and try again.');
      }
    } catch (err) {
      console.error('Job application error:', err);
      setSubmittedSuccess(true);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgressStep = () => {
    if (selectedFile && formData.declaration) return 4;
    if (selectedFile) return 3;
    if (formData.first_name && formData.email && formData.phone && formData.college_university) return 2;
    if (formData.first_name || formData.email) return 1;
    return 1;
  };

  const activeStepNum = calculateProgressStep();

  return (
    <>
      {/* ── 1. BREADCRUMB ── */}
      <div className="job-app-breadcrumb-container">
        <div className="job-app-container-1320">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/careers">Careers</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Job Application
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── 2. APPLICATION HERO (Compact Top 40px, Bottom 40px) ── */}
      <div className="job-app-header-hero">
        <div className="job-app-container-1320 text-center">
          <div className="job-app-badge-pill">
            <span className="green-dot"></span>
            CAREER APPLICATION
          </div>
          <h1 className="job-app-page-title">Apply for Your Dream Career</h1>
          <p className="job-app-page-subtitle">
            Complete your application to join YGR Gobal IT Services. Our recruitment team carefully reviews every application.
          </p>
        </div>
      </div>

      {/* ── 3. MAIN APPLICATION FORM SECTION (Centered 820px Width) ── */}
      <section className="job-app-master-section">
        <div className="job-form-wrapper-820">
          <AnimatePresence mode="wait">
            {submittedSuccess ? (
              /* ── SUCCESS SCREEN ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="job-success-card"
              >
                <div className="success-icon-badge">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h2 className="success-title">Application Submitted Successfully</h2>
                <p className="success-message">
                  Thank you for applying to YGR Gobal IT Services. Our HR recruitment team will review your profile and contact shortlisted candidates.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                  <Link to="/careers" className="btn-submit-application" style={{ width: 'auto' }}>
                    <i className="fas fa-arrow-left"></i> Return to Careers
                  </Link>
                  <Link to="/vacancies" className="btn-reset-form" style={{ width: 'auto' }}>
                    View Other Opportunities <i className="fas fa-external-link-alt ms-1"></i>
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ── FORM CONTAINER ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* ── TRUST BAR (4 Badges) ── */}
                <div className="job-trust-bar">
                  <div className="job-trust-badge">
                    <i className="fas fa-shield-alt"></i> Secure Application
                  </div>
                  <div className="job-trust-badge">
                    <i className="fas fa-user-lock"></i> Privacy Protected
                  </div>
                  <div className="job-trust-badge">
                    <i className="fas fa-clock"></i> Response Within 24h
                  </div>
                  <div className="job-trust-badge">
                    <i className="fas fa-check-circle"></i> No Application Fee
                  </div>
                </div>

                {/* ── APPLICATION PROGRESS BAR ── */}
                <div className="job-progress-card">
                  <div className="job-progress-header">
                    <span className="job-progress-title">Application Progress</span>
                    <span className="job-progress-time">
                      <i className="far fa-clock"></i> Estimated Time: 5 Minutes
                    </span>
                  </div>

                  <div className="job-progress-steps-row">
                    <div className={`progress-step-item ${activeStepNum >= 1 ? 'active' : ''} ${activeStepNum > 1 ? 'completed' : ''}`}>
                      <span className="progress-step-dot"></span> Personal Info
                    </div>
                    <div className={`progress-step-item ${activeStepNum >= 2 ? 'active' : ''} ${activeStepNum > 2 ? 'completed' : ''}`}>
                      <span className="progress-step-dot"></span> Professional Details
                    </div>
                    <div className={`progress-step-item ${activeStepNum >= 3 ? 'active' : ''} ${activeStepNum > 3 ? 'completed' : ''}`}>
                      <span className="progress-step-dot"></span> Resume Upload
                    </div>
                    <div className={`progress-step-item ${activeStepNum >= 4 ? 'active' : ''}`}>
                      <span className="progress-step-dot"></span> Final Submission
                    </div>
                  </div>
                </div>

                {/* ── CENTERED FORM CARD ── */}
                <div className="job-form-glass-card">
                  <h2 className="job-form-header-title">Job Application</h2>
                  <p className="job-form-header-sub">
                    Fill out the information below carefully.
                  </p>

                  {globalError && (
                    <div className="alert alert-danger rounded-3 p-3 mb-4 small fw-semibold">
                      <i className="fas fa-exclamation-triangle me-2"></i> {globalError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                      
                      {/* Full Name */}
                      <div className="col-md-6">
                        <label className="job-field-label">First Name *</label>
                        <input
                          type="text"
                          className={`job-field-control ${formErrors.first_name ? 'is-invalid' : formData.first_name ? 'is-valid' : ''}`}
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul"
                          required
                        />
                        {formErrors.first_name && <div className="field-error-hint">{formErrors.first_name}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">Last Name *</label>
                        <input
                          type="text"
                          className={`job-field-control ${formErrors.last_name ? 'is-invalid' : formData.last_name ? 'is-valid' : ''}`}
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="e.g. Sharma"
                          required
                        />
                        {formErrors.last_name && <div className="field-error-hint">{formErrors.last_name}</div>}
                      </div>

                      {/* Email & Phone */}
                      <div className="col-md-6">
                        <label className="job-field-label">Email Address *</label>
                        <input
                          type="email"
                          className={`job-field-control ${formErrors.email ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="rahul@domain.com"
                          required
                        />
                        {formErrors.email && <div className="field-error-hint">{formErrors.email}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">Mobile Number *</label>
                        <input
                          type="tel"
                          className={`job-field-control ${formErrors.phone ? 'is-invalid' : formData.phone ? 'is-valid' : ''}`}
                          name="phone"
                          maxLength="10"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                        />
                        {formErrors.phone && <div className="field-error-hint">{formErrors.phone}</div>}
                      </div>

                      {/* WhatsApp & Current City */}
                      <div className="col-md-6">
                        <label className="job-field-label">WhatsApp Number</label>
                        <input
                          type="tel"
                          className="job-field-control"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="WhatsApp number (optional)"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">Current City / Location *</label>
                        <input
                          type="text"
                          className={`job-field-control ${formErrors.current_address ? 'is-invalid' : formData.current_address ? 'is-valid' : ''}`}
                          name="current_address"
                          value={formData.current_address}
                          onChange={handleChange}
                          placeholder="e.g. Hyderabad, India"
                          required
                        />
                        {formErrors.current_address && <div className="field-error-hint">{formErrors.current_address}</div>}
                      </div>

                      {/* Highest Qualification & College */}
                      <div className="col-md-6">
                        <label className="job-field-label">Highest Qualification *</label>
                        <select
                          className="job-field-select"
                          name="highest_qualification"
                          value={formData.highest_qualification}
                          onChange={handleChange}
                        >
                          <option value="Graduate">Graduate (B.Tech/B.E/B.Sc/BCA)</option>
                          <option value="Post Graduate">Post Graduate (M.Tech/M.Sc/MCA/MBA)</option>
                          <option value="PhD">PhD</option>
                          <option value="Diploma">Diploma</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">College / University *</label>
                        <input
                          type="text"
                          className={`job-field-control ${formErrors.college_university ? 'is-invalid' : formData.college_university ? 'is-valid' : ''}`}
                          name="college_university"
                          value={formData.college_university}
                          onChange={handleChange}
                          placeholder="University / Institute Name"
                          required
                        />
                        {formErrors.college_university && <div className="field-error-hint">{formErrors.college_university}</div>}
                      </div>

                      {/* Passing Year & Candidate Type */}
                      <div className="col-md-6">
                        <label className="job-field-label">Passing Year *</label>
                        <input
                          type="number"
                          className="job-field-control"
                          name="passout_year"
                          min="1970"
                          max="2030"
                          value={formData.passout_year}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">Experience Type *</label>
                        <select
                          className="job-field-select"
                          name="candidate_type"
                          value={formData.candidate_type}
                          onChange={handleChange}
                        >
                          <option value="Fresher">Fresher (0 Years)</option>
                          <option value="Experienced">Experienced Professional</option>
                        </select>
                      </div>

                      {/* Current Company & Total Exp */}
                      {formData.candidate_type === 'Experienced' && (
                        <>
                          <div className="col-md-6">
                            <label className="job-field-label">Current Company</label>
                            <input
                              type="text"
                              className="job-field-control"
                              name="current_company"
                              value={formData.current_company}
                              onChange={handleChange}
                              placeholder="Current Employer Name"
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="job-field-label">Total Experience (Years)</label>
                            <input
                              type="number"
                              step="0.1"
                              className="job-field-control"
                              name="total_experience"
                              value={formData.total_experience}
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      )}

                      {/* Salary & Notice Period */}
                      <div className="col-md-4">
                        <label className="job-field-label">Current Salary (LPA)</label>
                        <input
                          type="text"
                          className="job-field-control"
                          name="current_salary"
                          value={formData.current_salary}
                          onChange={handleChange}
                          placeholder="e.g. 4.5 LPA"
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="job-field-label">Expected Salary (LPA)</label>
                        <input
                          type="text"
                          className="job-field-control"
                          name="expected_salary"
                          value={formData.expected_salary}
                          onChange={handleChange}
                          placeholder="e.g. 6.5 LPA"
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="job-field-label">Notice Period</label>
                        <select
                          className="job-field-select"
                          name="notice_period"
                          value={formData.notice_period}
                          onChange={handleChange}
                        >
                          <option value="Immediate">Immediate Joiner</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>

                      {/* Preferred Location & Job Applying For */}
                      <div className="col-md-6">
                        <label className="job-field-label">Preferred Work Location</label>
                        <select
                          className="job-field-select"
                          name="preferred_location"
                          value={formData.preferred_location}
                          onChange={handleChange}
                        >
                          <option value="Hyderabad">Hyderabad Headquarters</option>
                          <option value="Guntur">Guntur Branch</option>
                          <option value="Vinukonda">Vinukonda Branch</option>
                          <option value="Remote">Work From Home / Remote</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">Job Applying For *</label>
                        <input
                          type="text"
                          className={`job-field-control ${formErrors.job_role ? 'is-invalid' : ''}`}
                          name="job_role"
                          value={formData.job_role}
                          onChange={handleChange}
                          required
                        />
                        {formErrors.job_role && <div className="field-error-hint">{formErrors.job_role}</div>}
                      </div>

                      {/* Department & Primary Skills */}
                      <div className="col-md-6">
                        <label className="job-field-label">Department *</label>
                        <input
                          type="text"
                          className="job-field-control"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          placeholder="e.g. Software Engineering"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">Primary Skills *</label>
                        <input
                          type="text"
                          className={`job-field-control ${formErrors.primary_skills ? 'is-invalid' : ''}`}
                          name="primary_skills"
                          value={formData.primary_skills}
                          onChange={handleChange}
                          placeholder="e.g. React, Python, Django, AWS"
                          required
                        />
                        {formErrors.primary_skills && <div className="field-error-hint">{formErrors.primary_skills}</div>}
                      </div>

                      {/* LinkedIn & Portfolio */}
                      <div className="col-md-6">
                        <label className="job-field-label">LinkedIn URL</label>
                        <input
                          type="url"
                          className="job-field-control"
                          name="linkedin_url"
                          value={formData.linkedin_url}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="job-field-label">GitHub / Portfolio (Optional)</label>
                        <input
                          type="url"
                          className="job-field-control"
                          name="portfolio_url"
                          value={formData.portfolio_url}
                          onChange={handleChange}
                          placeholder="https://github.com/username"
                        />
                      </div>

                      {/* RESUME UPLOAD SECTION (Height 140px) */}
                      <div className="col-12 mt-3">
                        <label className="job-field-label">Resume Upload (PDF, DOC, DOCX up to 10MB) *</label>
                        <div className={`resume-upload-dropzone ${selectedFile ? 'has-file' : ''} ${formErrors.resume ? 'border-danger' : ''}`}>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required={!selectedFile}
                          />
                          <i className="fas fa-cloud-upload-alt dropzone-icon"></i>
                          
                          {selectedFile ? (
                            <div className="file-preview-pill">
                              <i className="far fa-file-pdf text-danger"></i>
                              <span className="file-preview-name">{selectedFile.name}</span>
                              <span className="text-muted small">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                              <div className="file-preview-actions">
                                <button type="button" className="btn-replace-file" onClick={() => document.querySelector('input[type="file"]').click()}>
                                  Replace
                                </button>
                                <button type="button" className="btn-remove-file" onClick={removeFile}>
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

                      {/* TEXTAREAS (120px Height) */}
                      <div className="col-12">
                        <label className="job-field-label">Cover Letter / Technical Overview</label>
                        <textarea
                          className="job-field-control"
                          name="technical_skills"
                          value={formData.technical_skills}
                          onChange={handleChange}
                          placeholder="Briefly introduce your background and technical highlights..."
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <label className="job-field-label">Why do you want to join YGR Gobal IT Services?</label>
                        <textarea
                          className="job-field-control"
                          name="why_join"
                          value={formData.why_join}
                          onChange={handleChange}
                          placeholder="Tell us what motivates you to join our engineering ecosystem..."
                        ></textarea>
                      </div>

                      {/* Declaration Checkbox */}
                      <div className="col-12 mt-3">
                        <div className="form-check">
                          <input
                            className={`form-check-input ${formErrors.declaration ? 'is-invalid' : ''}`}
                            type="checkbox"
                            id="declaration"
                            name="declaration"
                            checked={formData.declaration}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label small text-muted" htmlFor="declaration">
                            I confirm that all information provided in this job application is accurate and true to the best of my knowledge.
                          </label>
                        </div>
                        {formErrors.declaration && <div className="field-error-hint">{formErrors.declaration}</div>}
                      </div>

                      {/* CENTERED BUTTONS */}
                      <div className="col-12 mt-4">
                        <div className="job-buttons-container">
                          <motion.button
                            type="submit"
                            className="btn-submit-application"
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
                                Submit Application <i className="fas fa-paper-plane"></i>
                              </>
                            )}
                          </motion.button>

                          <motion.button
                            type="button"
                            className="btn-reset-form"
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

                  {/* HELP SECTION */}
                  <div className="job-help-box">
                    <div className="job-help-title">Need Help?</div>
                    <div className="job-help-details">
                      <span>
                        <i className="far fa-envelope text-primary me-1"></i>
                        <a href="mailto:careers@ygrgobalitservices.com">careers@ygrgobalitservices.com</a>
                      </span>
                      <span>•</span>
                      <span>
                        <i className="fas fa-phone-alt text-success me-1"></i>
                        <a href="tel:+917794053340">+91 77940 53340</a>
                      </span>
                      <span>•</span>
                      <span>
                        <i className="far fa-clock text-muted me-1"></i> Mon–Fri | 9:30 AM–6:30 PM
                      </span>
                    </div>
                  </div>

                  {/* SECURITY NOTICE */}
                  <div className="job-security-notice">
                    <i className="fas fa-lock"></i>
                    <span>Your personal information is securely stored and is only accessible to the recruitment team.</span>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 4. FAQ SECTION ── */}
      <section className="job-faq-section">
        <div className="job-app-container-1320 max-w-900" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold fs-3 color-slate-900">Frequently Asked Questions</h2>
            <p className="text-muted small">Everything you need to know about applying and working with YGR Global IT Services.</p>
          </div>

          <div className="faq-accordion-wrapper">
            {FAQ_ITEMS.map((faq, idx) => {
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

     
    </>
  );
};

export default OriginalExampagesJobApplication;
