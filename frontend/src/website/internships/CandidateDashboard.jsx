import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CandidateDashboard.css';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CandidateDashboard = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('candidateToken') || localStorage.getItem('candidateToken');

    if (!registrationId) {
      if (storedToken) {
        navigate(`/internships/candidate-dashboard/${storedToken}`, { replace: true });
      } else {
        navigate('/internships/candidate-login', { replace: true });
      }
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/portal/internships/register/${registrationId}/`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Registration record '${registrationId}' was not found. Please verify your Registration ID or login again.`);
          }
          throw new Error('Failed to load dashboard data. Please try again.');
        }
        const result = await response.json();
        setData(result.data);

        // Keep session in storage so refreshes stay logged in
        sessionStorage.setItem('candidateToken', registrationId);
        localStorage.setItem('candidateToken', registrationId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [registrationId, navigate]);

  const copyRegistrationId = () => {
    if (data?.registration_id) {
      navigator.clipboard.writeText(data.registration_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('candidateToken');
    localStorage.removeItem('candidateToken');
    navigate('/internships/candidate-login');
  };

  const handleConfirmAttendance = async (actionType) => {
    if (!data?.registration_id) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/portal/internships/register/${data.registration_id}/confirm_interview/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: actionType })
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to update interview status');
      setStatusMessage({ type: 'success', text: resData.message || 'Updated successfully!' });
      // Refresh data
      const refreshRes = await fetch(`/api/portal/internships/register/${registrationId}/`);
      if (refreshRes.ok) {
        const result = await refreshRes.json();
        setData(result.data);
      }
    } catch (err) {
      setStatusMessage({ type: 'danger', text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handlePendingPayment = async () => {
    if (!data) return;
    setActionLoading(true);
    setStatusMessage(null);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error('Could not load payment gateway. Please check your internet connection.');
      }

      const orderRes = await fetch(`/api/portal/internships/register/${data.registration_id}/create_payment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_type: data.payment_type || 'full' })
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Failed to create payment order.');
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: 'INR',
        name: 'YGR Gobal IT Services',
        description: `Internship Fee: ${data.course}`,
        order_id: orderData.order_id,
        handler: async function (paymentResponse) {
          try {
            const verifyRes = await fetch(`/api/portal/internships/register/${data.registration_id}/verify_payment/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(paymentResponse)
            });
            if (verifyRes.ok) {
              setStatusMessage({ type: 'success', text: 'Payment completed successfully! Refreshing dashboard...' });
              setTimeout(() => window.location.reload(), 1500);
            } else {
              throw new Error('Payment verification failed.');
            }
          } catch (vErr) {
            setStatusMessage({ type: 'danger', text: vErr.message });
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone
        },
        theme: {
          color: '#2563EB'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setStatusMessage({ type: 'danger', text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // Determine Stepper Stages
  const isPaid = data && (data.amount_paid >= data.total_amount || ['Paid', 'Exam Scheduled', 'Exam Completed', 'Qualified', 'Interview 1 Scheduled', 'Interview 1 Completed', 'Selected', 'Offer Issued'].includes(data.status));
  const isExamCompleted = Boolean(data && (data.exam_completed || data.exam_status === 'Completed' || ['Exam Completed', 'Qualified', 'Not Qualified', 'Interview 1 Scheduled', 'Interview 1 Completed', 'Selected', 'Offer Issued'].includes(data.status)));
  const canTakeExam = Boolean(data && data.can_take_exam && data.exam_token && !isExamCompleted);
  const isInterviewDone = data && (data.interview_status === 'Completed' || ['Interview 1 Completed', 'Selected', 'Offer Issued'].includes(data.status));
  const isSelected = data && (data.status === 'Selected' || data.status === 'Offer Issued');
  const isNotQualified = data && (data.status === 'Not Qualified' || data.status === 'Not Selected');

  if (loading) {
    return (
      <div className="cd-wrapper">
        <div className="cd-container">
          <div className="cd-state-box">
            <div className="cd-spinner"></div>
            <h4 style={{ fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Loading Your Dashboard</h4>
            <p style={{ color: '#64748B', fontSize: '0.95rem' }}>Fetching real-time assessment and selection status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="cd-wrapper">
        <div className="cd-container" style={{ maxWidth: '640px' }}>
          <div className="cd-card" style={{ textAlign: 'center', padding: '50px 30px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '20px' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 style={{ fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>Unable to Access Dashboard</h3>
            <p style={{ color: '#64748B', marginBottom: '30px', lineHeight: 1.6 }}>{error || 'Candidate credentials could not be loaded.'}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/internships/candidate-login" className="cd-btn-primary">
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Candidate Login
              </Link>
              <button className="cd-btn-outline" onClick={() => window.location.reload()}>
                <i className="fa-solid fa-rotate-right"></i> Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cd-wrapper">
      <div className="cd-container">
        
        {/* Toast / Status Banner */}
        {statusMessage && (
          <div 
            style={{ 
              background: statusMessage.type === 'success' ? '#DEF7EC' : '#FEE2E2',
              border: `1px solid ${statusMessage.type === 'success' ? '#84E1BC' : '#F87171'}`,
              color: statusMessage.type === 'success' ? '#03543F' : '#991B1B',
              padding: '14px 20px',
              borderRadius: '14px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 600
            }}
          >
            <span>
              <i className={`fa-solid ${statusMessage.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} me-2`}></i>
              {statusMessage.text}
            </span>
            <button 
              onClick={() => setStatusMessage(null)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 'bold' }}
            >
              &times;
            </button>
          </div>
        )}

        {/* ── HERO BANNER ── */}
        <div className="cd-hero-card">
          <div className="cd-hero-top">
            <div className="cd-hero-title-group">
              <div className="cd-pill-badge">
                <span className="dot"></span>
                All-India Internship Selection Portal
              </div>
              <h1 className="cd-hero-name">Welcome, {data.name}</h1>
              <p className="cd-hero-sub">
                Candidate Dashboard &bull; Track assessment progress, schedule interviews, and accept offer letters.
              </p>
            </div>

            <div className="cd-hero-actions">
              <div className="cd-id-badge" onClick={copyRegistrationId} title="Click to copy Registration ID">
                <i className="fa-solid fa-id-card"></i>
                <span>{data.registration_id}</span>
                <i className={`fa-regular ${copied ? 'fa-check text-success' : 'fa-copy'}`}></i>
                {copied && <span style={{ fontSize: '0.72rem', color: '#10B981' }}>Copied!</span>}
              </div>

              <button className="cd-btn-logout" onClick={handleLogout} title="Logout">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── SELECTION PROGRESS STEPPER ── */}
        <div className="cd-stepper-card">
          <div className="cd-stepper-title">
            <i className="fa-solid fa-bars-progress text-primary"></i> Selection Journey Timeline
          </div>
          <div className="cd-stepper-track">
            {/* Step 1: Registration */}
            <div className="cd-step-item completed">
              <div className="cd-step-circle">
                <i className="fa-solid fa-check"></i>
              </div>
              <span className="cd-step-label">Application</span>
              <span className="cd-step-status">Submitted</span>
            </div>

            {/* Step 2: Payment */}
            <div className={`cd-step-item ${isPaid ? 'completed' : 'active'}`}>
              <div className="cd-step-circle">
                {isPaid ? <i className="fa-solid fa-check"></i> : '2'}
              </div>
              <span className="cd-step-label">Assessment Fee</span>
              <span className="cd-step-status">{isPaid ? 'Verified' : 'Pending'}</span>
            </div>

            {/* Step 3: Screening Exam */}
            <div className={`cd-step-item ${isExamCompleted ? 'completed' : canTakeExam ? 'active' : isPaid ? 'upcoming' : ''}`}>
              <div className="cd-step-circle">
                {isExamCompleted ? <i className="fa-solid fa-check"></i> : '3'}
              </div>
              <span className="cd-step-label">Online Test</span>
              <span className="cd-step-status">
                {isExamCompleted ? (data.status === 'Not Qualified' ? 'Evaluated' : 'Completed') : canTakeExam ? 'Ready to Start' : isPaid ? 'Awaiting HR Mail' : 'Upcoming'}
              </span>
            </div>

            {/* Step 4: Interview */}
            <div className={`cd-step-item ${isInterviewDone ? 'completed' : data.interview_status ? 'active' : ''}`}>
              <div className="cd-step-circle">
                {isInterviewDone ? <i className="fa-solid fa-check"></i> : '4'}
              </div>
              <span className="cd-step-label">Interview</span>
              <span className="cd-step-status">
                {data.interview_status || (isExamCompleted ? 'In Review' : 'Upcoming')}
              </span>
            </div>

            {/* Step 5: Final Selection */}
            <div className={`cd-step-item ${isSelected ? 'completed' : isNotQualified ? 'not-qualified' : ''}`}>
              <div className="cd-step-circle">
                {isSelected ? <i className="fa-solid fa-trophy"></i> : isNotQualified ? <i className="fa-solid fa-times"></i> : '5'}
              </div>
              <span className="cd-step-label">Offer Letter</span>
              <span className="cd-step-status">
                {isSelected ? 'Selected' : isNotQualified ? 'Not Selected' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* ── 2-COLUMN PROFILE & PAYMENT SUMMARY ── */}
        <div className="cd-grid-2">
          {/* Card 1: Profile Details */}
          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">
                <i className="fa-regular fa-user"></i> Candidate Details
              </h3>
              <span className="cd-badge primary">{data.status || 'Registered'}</span>
            </div>
            <div className="cd-data-list">
              <div className="cd-data-row">
                <span className="cd-data-label">Full Name:</span>
                <span className="cd-data-value">{data.name}</span>
              </div>
              <div className="cd-data-row">
                <span className="cd-data-label">Email Address:</span>
                <span className="cd-data-value">{data.email}</span>
              </div>
              <div className="cd-data-row">
                <span className="cd-data-label">Contact Phone:</span>
                <span className="cd-data-value">{data.phone}</span>
              </div>
              <div className="cd-data-row">
                <span className="cd-data-label">Internship Domain:</span>
                <span className="cd-data-value" style={{ color: '#2563EB' }}>{data.course}</span>
              </div>
              {data.degree && (
                <div className="cd-data-row">
                  <span className="cd-data-label">Education:</span>
                  <span className="cd-data-value">{data.degree} ({data.branch || 'Engg'})</span>
                </div>
              )}
              {data.clg_name && (
                <div className="cd-data-row">
                  <span className="cd-data-label">College / University:</span>
                  <span className="cd-data-value">{data.clg_name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Assessment Fee & Payment */}
          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">
                <i className="fa-solid fa-receipt"></i> Assessment Fee Status
              </h3>
              {isPaid ? (
                <span className="cd-badge success">
                  <i className="fa-solid fa-circle-check"></i> Paid
                </span>
              ) : (
                <span className="cd-badge warning">
                  <i className="fa-solid fa-clock"></i> Payment Pending
                </span>
              )}
            </div>
            <div className="cd-data-list">
              <div className="cd-data-row">
                <span className="cd-data-label">Total Assessment Fee:</span>
                <span className="cd-data-value">₹{data.total_amount || 0}</span>
              </div>
              <div className="cd-data-row">
                <span className="cd-data-label">Amount Paid:</span>
                <span className="cd-data-value" style={{ color: isPaid ? '#10B981' : '#F59E0B' }}>
                  ₹{data.amount_paid || 0}
                </span>
              </div>
              <div className="cd-data-row">
                <span className="cd-data-label">Payment Mode:</span>
                <span className="cd-data-value">Razorpay Secure Online</span>
              </div>
            </div>

            {!isPaid && (
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                <p style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '14px' }}>
                  <i className="fa-solid fa-circle-info text-primary me-1"></i>
                  Complete your assessment fee payment to unlock the technical screening test.
                </p>
                <button 
                  className="cd-btn-primary" 
                  style={{ width: '100%' }}
                  disabled={actionLoading}
                  onClick={handlePendingPayment}
                >
                  <i className="fa-solid fa-credit-card"></i> Pay Fee Now (₹{data.total_amount})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── TECHNICAL EXAMINATION ASSESSMENT MODULE ── */}
        <div className={`cd-module-card ${canTakeExam ? 'exam-ready' : ''}`}>
          <div className="cd-module-inner">
            <div className="cd-module-info">
              <span className={`cd-module-badge ${isExamCompleted ? 'bg-success text-white' : canTakeExam ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                {isExamCompleted ? 'Assessment Submitted' : canTakeExam ? 'Stage 1: Assessment Link Active (1 Attempt Allowed)' : 'Stage 1: Online Assessment'}
              </span>
              <h3 className="cd-module-title">{data.course} &bull; Technical Screening Test</h3>
              <p className="cd-module-desc">
                Proctored multiple-choice evaluation covering core domain fundamentals, problem solving, and analytical thinking.
              </p>

              <div className="cd-meta-chips">
                <div className="cd-chip">
                  <span className="cd-chip-label">Test Duration</span>
                  <span className="cd-chip-val">{data.duration_minutes || 60} Minutes</span>
                </div>
                <div className="cd-chip">
                  <span className="cd-chip-label">Format</span>
                  <span className="cd-chip-val">Multiple Choice (MCQ)</span>
                </div>
                <div className="cd-chip">
                  <span className="cd-chip-label">Attempts Allowed</span>
                  <span className="cd-chip-val" style={{ color: '#EF4444', fontWeight: 700 }}>Strictly 1 Attempt</span>
                </div>
                <div className="cd-chip">
                  <span className="cd-chip-label">Evaluation Status</span>
                  <span className="cd-chip-val" style={{ color: isExamCompleted ? '#10B981' : canTakeExam ? '#2563EB' : '#F59E0B' }}>
                    {isExamCompleted ? 'Completed (1 Attempt Used)' : canTakeExam ? 'Link Emailed & Ready' : isPaid ? 'Awaiting HR Email Link' : 'Fee Pending'}
                  </span>
                </div>
                {data.exam_score !== null && (
                  <div className="cd-chip">
                    <span className="cd-chip-label">Score</span>
                    <span className="cd-chip-val" style={{ color: '#10B981' }}>{data.exam_score} Marks</span>
                  </div>
                )}
              </div>
            </div>

            <div className="cd-module-action">
              {/* 1. Exam Completed: Show completed status, NO attempt button */}
              {isExamCompleted && (
                <div style={{ textAlign: 'center', background: '#F0FDF4', padding: '16px 24px', borderRadius: '14px', border: '1px solid #BBF7D0', minWidth: '240px' }}>
                  <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '2rem', marginBottom: '6px' }}></i>
                  <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.95rem' }}>Assessment Submitted Successfully</div>
                  <div style={{ fontSize: '0.78rem', color: '#15803D', marginTop: '2px' }}>
                    1 of 1 attempt used &bull; Score updated in HR review
                  </div>
                </div>
              )}

              {/* 2. HR sent link & candidate has NOT taken exam yet: Show Take Assessment CTA */}
              {!isExamCompleted && canTakeExam && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                  <button
                    className="cd-btn-primary"
                    onClick={() => navigate(`/internships/exam/${data.exam_token}`)}
                  >
                    <i className="fa-solid fa-play"></i> Take Assessment
                  </button>
                  <span style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 600 }}>
                    <i className="fa-solid fa-circle-exclamation me-1"></i> 1 attempt only &bull; Webcam required
                  </span>
                </div>
              )}

              {/* 3. Fee paid, but HR has NOT sent link yet: Show clean awaiting notice */}
              {!isExamCompleted && !canTakeExam && isPaid && (
                <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', maxWidth: '300px' }}>
                  <i className="fa-solid fa-envelope-circle-check text-primary" style={{ fontSize: '1.8rem', marginBottom: '6px' }}></i>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.88rem', marginBottom: '4px' }}>
                    Awaiting HR Assessment Link
                  </div>
                  <p style={{ fontSize: '0.74rem', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                    Your assessment fee is verified. The HR team will email your proctored assessment link. Once sent, the assessment button will activate here.
                  </p>
                </div>
              )}

              {/* 4. Fee not paid yet */}
              {!isPaid && (
                <div style={{ textAlign: 'center', background: '#FFFBEB', padding: '14px 18px', borderRadius: '14px', border: '1px solid #FDE68A', maxWidth: '260px' }}>
                  <i className="fa-solid fa-lock text-warning" style={{ fontSize: '1.6rem', marginBottom: '6px' }}></i>
                  <div style={{ fontWeight: 700, color: '#92400E', fontSize: '0.84rem' }}>Assessment Locked</div>
                  <div style={{ fontSize: '0.74rem', color: '#B45309' }}>Complete fee above to unlock stage</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── TECHNICAL INTERVIEW MODULE (ROUND 1) ── */}
        {data.interview_status && (
          <div className="cd-module-card interview-card">
            <div className="cd-module-inner">
              <div className="cd-module-info">
                <span className="cd-module-badge" style={{ background: '#FEF3C7', color: '#92400E' }}>
                  Stage 2: Technical Interview
                </span>
                <h3 className="cd-module-title">Interview Round 1 &bull; Technical & Domain Discussion</h3>
                <p className="cd-module-desc">
                  Detailed discussion on projects, practical problem solving, and technical capabilities.
                </p>

                <div className="cd-meta-chips">
                  <div className="cd-chip">
                    <span className="cd-chip-label">Scheduled Date & Time</span>
                    <span className="cd-chip-val">
                      {data.interview_scheduled_date ? new Date(data.interview_scheduled_date).toLocaleString() : 'TBD'}
                    </span>
                  </div>
                  <div className="cd-chip">
                    <span className="cd-chip-label">Interview Mode</span>
                    <span className="cd-chip-val">
                      {data.interview_mode === 'Offline' ? (
                        <>🏢 In-Person (Hyderabad HQ)</>
                      ) : (
                        <>🎥 Online Video Conference</>
                      )}
                    </span>
                  </div>
                  <div className="cd-chip">
                    <span className="cd-chip-label">Confirmation Status</span>
                    <span className="cd-chip-val" style={{ color: data.interview_status === 'Confirmed' ? '#10B981' : '#F59E0B' }}>
                      {data.interview_status}
                    </span>
                  </div>
                </div>

                {data.interview_mode === 'Offline' && data.interview_link && (
                  <div style={{ marginTop: '16px', background: '#F8FAFC', padding: '12px 18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>
                      <i className="fa-solid fa-location-dot text-danger me-1"></i> Venue / Office Address:
                    </span>
                    <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.9rem' }}>{data.interview_link}</span>
                  </div>
                )}
              </div>

              <div className="cd-module-action">
                {data.interview_status === 'Scheduled' && (
                  <>
                    <button 
                      className="cd-btn-success" 
                      style={{ width: '100%' }}
                      disabled={actionLoading}
                      onClick={() => handleConfirmAttendance('confirm')}
                    >
                      <i className="fa-solid fa-check"></i> Confirm Attendance
                    </button>
                    <button 
                      className="cd-btn-outline" 
                      style={{ width: '100%' }}
                      disabled={actionLoading}
                      onClick={() => {
                        if (window.confirm('Request HR to reschedule your interview?')) {
                          handleConfirmAttendance('reschedule');
                        }
                      }}
                    >
                      Request Reschedule
                    </button>
                  </>
                )}

                {data.interview_status === 'Confirmed' && data.interview_mode === 'Online' && data.interview_link && (
                  <a 
                    href={data.interview_link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="cd-btn-primary" 
                    style={{ width: '100%' }}
                  >
                    <i className="fa-solid fa-video"></i> Join Meeting Link
                  </a>
                )}

                {data.interview_status === 'Confirmed' && data.interview_mode === 'Offline' && (
                  <div style={{ textAlign: 'center', background: '#ECFDF5', padding: '14px 22px', borderRadius: '14px', border: '1px solid #A7F3D0' }}>
                    <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '1.8rem', marginBottom: '4px' }}></i>
                    <div style={{ fontWeight: 800, color: '#065F46', fontSize: '0.9rem' }}>Attendance Confirmed</div>
                    <div style={{ fontSize: '0.75rem', color: '#047857' }}>See you at Hyderabad HQ!</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── OFFER LETTER / SELECTION MODULE ── */}
        {data.offer_status && (
          <div className="cd-module-card offer-card">
            <div className="cd-module-inner">
              <div className="cd-module-info">
                <span className="cd-module-badge" style={{ background: '#DEF7EC', color: '#03543F' }}>
                  🎉 Official Selection &bull; Internship Offer
                </span>
                <h3 className="cd-module-title">Congratulations! You Have Been Selected</h3>
                <p className="cd-module-desc">
                  You have successfully cleared all selection rounds for the <strong>{data.course} Internship Program</strong>.
                </p>

                <div className="cd-meta-chips">
                  <div className="cd-chip">
                    <span className="cd-chip-label">Offer Status</span>
                    <span className="cd-chip-val" style={{ color: '#10B981' }}>{data.offer_status}</span>
                  </div>
                  {data.offer_start_date && (
                    <div className="cd-chip">
                      <span className="cd-chip-label">Start Date</span>
                      <span className="cd-chip-val">{data.offer_start_date}</span>
                    </div>
                  )}
                  {data.offer_deadline && (
                    <div className="cd-chip">
                      <span className="cd-chip-label">Acceptance Deadline</span>
                      <span className="cd-chip-val" style={{ color: '#DC2626' }}>{data.offer_deadline}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="cd-module-action">
                <div style={{ textAlign: 'center', background: '#ffffff', padding: '16px 24px', borderRadius: '14px', border: '1px solid #A7F3D0', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)' }}>
                  <i className="fa-solid fa-award text-success" style={{ fontSize: '2.2rem', marginBottom: '6px' }}></i>
                  <div style={{ fontWeight: 800, color: '#065F46', fontSize: '1rem' }}>Official Offer Issued</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Check your email for the detailed offer letter.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── REJECTION / NOT QUALIFIED CARD ── */}
        {isNotQualified && (
          <div className="cd-card" style={{ borderLeft: '6px solid #EF4444', background: '#FEF2F2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <i className="fa-solid fa-circle-exclamation text-danger" style={{ fontSize: '2rem' }}></i>
              <div>
                <h4 style={{ fontWeight: 800, color: '#991B1B', margin: '0 0 4px 0' }}>Selection Update</h4>
                <p style={{ margin: 0, color: '#7F1D1D', fontSize: '0.9rem' }}>
                  Thank you for participating in our internship selection program. Based on your assessment results, you did not meet the criteria for this cohort. We encourage you to continue enhancing your skills and reapply in upcoming batches.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CandidateDashboard;
