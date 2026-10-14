import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const getCsrfToken = () => {
  const match = document.cookie.match(/(?:^|; )\s*csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
};

const getExamHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const csrf = getCsrfToken();
  if (csrf) {
    headers['X-CSRFToken'] = csrf;
  }
  return headers;
};

const CandidateExam = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  // Core session states
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeToken, setActiveToken] = useState(token);

  // Pre-exam verification states
  const [hasStarted, setHasStarted] = useState(false);
  const [cameraPermitted, setCameraPermitted] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [agreed, setAgreed] = useState(false);

  // In-exam questions and answering states
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewMarked, setReviewMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saveStatus, setSaveStatus] = useState('All changes saved'); // 'Saving...', 'All changes saved'
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Anti-cheat & Proctoring states
  const [warningCount, setWarningCount] = useState(0);
  const [maxWarnings, setMaxWarnings] = useState(3);
  const [activeViolationModal, setActiveViolationModal] = useState(null); // { number, type, message }
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [disqualificationReason, setDisqualificationReason] = useState('');
  const [multipleFaceCount, setMultipleFaceCount] = useState(0); // Track multiple-face violations

  // Refs for hardware & proctoring
  const videoRef = useRef(null);
  const pipVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const lastViolationTimeRef = useRef(0);
  const answersRef = useRef({});
  const multipleFaceCountRef = useRef(0);
  answersRef.current = answers;

  // Enable scrolling specifically for the exam page so buttons are never cut off
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. Initial Load & Session Validation
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchExamData();
  }, [token]);

  const fetchExamData = async () => {
    try {
      let resolvedToken = token;
      if (!resolvedToken || resolvedToken === 'undefined' || resolvedToken === 'null') {
        const storedId = sessionStorage.getItem('candidateToken') || localStorage.getItem('candidateToken');
        if (storedId) {
          resolvedToken = storedId;
        }
      }

      if (!resolvedToken) {
        throw new Error('Assessment session not found or invalid access token.');
      }

      let response = await fetch(`/api/portal/admin/internships/exams/${resolvedToken}/details/`);
      if (!response.ok) {
        const storedId = sessionStorage.getItem('candidateToken') || localStorage.getItem('candidateToken');
        if (storedId && storedId !== resolvedToken) {
          const fallbackRes = await fetch(`/api/portal/admin/internships/exams/${storedId}/details/`);
          if (fallbackRes.ok) {
            response = fallbackRes;
          }
        }
      }

      if (!response.ok) {
        throw new Error('Assessment session not found or invalid access token.');
      }
      const data = await response.json();
      const currentToken = data.token || resolvedToken;
      setActiveToken(currentToken);

      if (data.status === 'Completed') {
        setSessionData(data);
        setSubmitted(true);
        if (data.proctoring_status === 'Disqualified') {
          setIsDisqualified(true);
          setDisqualificationReason(data.submission_reason || 'Disqualified due to proctoring policy violation.');
        }
        setLoading(false);
        return;
      }

      setSessionData(data);
      setMaxWarnings(data.max_warnings || 3);
      setWarningCount(data.warning_count || 0);

      // Restore saved answers if candidate refreshed or re-entered
      if (data.saved_answers && typeof data.saved_answers === 'object') {
        setAnswers(data.saved_answers);
      }

      // Configure timer
      if (data.remaining_seconds !== undefined) {
        setTimeLeft(data.remaining_seconds);
      } else {
        setTimeLeft(data.duration_minutes * 60);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 2. Hardware / Webcam Setup
  // ─────────────────────────────────────────────────────────────
  const initializeWebcam = async () => {
    setCameraLoading(true);
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });

      mediaStreamRef.current = stream;
      setCameraPermitted(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      if (pipVideoRef.current) {
        pipVideoRef.current.srcObject = stream;
      }

      // Track stream interruption
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          if (hasStarted && !submitted) {
            triggerViolation('webcam_lost', 'Webcam video stream was disconnected or disabled.');
          }
        };
      }
    } catch (err) {
      setCameraPermitted(false);
      setCameraError(err.message || 'Unable to access webcam. Please enable camera permissions in your browser settings.');
    } finally {
      setCameraLoading(false);
    }
  };

  // Keep PIP video feed in sync when exam starts
  useEffect(() => {
    if (hasStarted && mediaStreamRef.current && pipVideoRef.current) {
      pipVideoRef.current.srcObject = mediaStreamRef.current;
    }
  }, [hasStarted]);

  // Clean up media streams when leaving
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 3. Snapshot Capture Helper
  // ─────────────────────────────────────────────────────────────
  const captureSnapshot = useCallback(() => {
    try {
      const activeVideo = pipVideoRef.current || videoRef.current;
      if (activeVideo && activeVideo.videoWidth > 0 && canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = 320;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(activeVideo, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.6);
      }
    } catch (e) {
      console.warn('Snapshot capture failed:', e);
    }
    return null;
  }, []);

  // Periodic Snapshot every 60s
  useEffect(() => {
    if (!hasStarted || submitted || isDisqualified) return;
    const interval = setInterval(() => {
      captureSnapshot();
    }, 60000);
    return () => clearInterval(interval);
  }, [hasStarted, submitted, isDisqualified, captureSnapshot]);

  // ─────────────────────────────────────────────────────────────
  // 4. Anti-Cheating & Violation Enforcement Engine
  // ─────────────────────────────────────────────────────────────
  const triggerViolation = useCallback(async (type, details) => {
    if (!hasStarted || submitted || isDisqualified) return;

    // Debounce check: ignore events triggered within 4 seconds of previous violation
    const now = Date.now();
    if (now - lastViolationTimeRef.current < 4000) {
      return;
    }
    lastViolationTimeRef.current = now;

    const snapshot = captureSnapshot();

    try {
      const response = await fetch(`/api/portal/admin/internships/exams/${activeToken || token}/log_violation/`, {
        method: 'POST',
        headers: getExamHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify({
          violation_type: type,
          details: details,
          snapshot: snapshot
        })
      });

      const data = await response.json();
      const currentCount = data.warning_count || (warningCount + 1);
      setWarningCount(currentCount);

      if (data.terminated || currentCount >= maxWarnings) {
        // Strike 3 - Disqualified
        setIsDisqualified(true);
        setDisqualificationReason(data.submission_reason || 'Exceeded maximum allowable proctoring violations.');
        setSubmitted(true);
        setActiveViolationModal(null);
        if (document.fullscreenElement) {
          try { document.exitFullscreen(); } catch (e) {}
        }
      } else {
        // Warning 1 or 2 modal
        setActiveViolationModal({
          number: currentCount,
          type: type.replace('_', ' ').toUpperCase(),
          message: details,
          remaining: Math.max(0, maxWarnings - currentCount)
        });
      }
    } catch (err) {
      console.error('Failed to log violation to server:', err);
    }
  }, [hasStarted, submitted, isDisqualified, warningCount, maxWarnings, token, captureSnapshot]);

  // Browser Event Listeners
  useEffect(() => {
    if (!hasStarted || submitted || isDisqualified) return;

    // Tab Switch / Visibility Change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerViolation('tab_switch', 'Candidate navigated away from the exam tab or minimized the browser.');
      }
    };

    // Window Blur (Switching applications / Alt+Tab)
    const handleWindowBlur = () => {
      triggerViolation('window_blur', 'Window lost focus. Candidate switched to another application.');
    };

    // Fullscreen Exit
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && hasStarted && !submitted && !isDisqualified) {
        triggerViolation('fullscreen_exit', 'Candidate exited mandatory fullscreen mode.');
      }
    };

    // Prevent right click
    const handleContextMenu = (e) => e.preventDefault();

    // Prevent copy, cut, paste
    const handleCopyPaste = (e) => e.preventDefault();

    // Keyboard lock: block F12, Ctrl+C/V/X/U/S, Alt+Tab, etc.
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && ['c', 'v', 'x', 'u', 's', 'p', 'a'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) ||
        e.key === 'Alt' ||
        e.key === 'Meta'
      ) {
        e.preventDefault();
        triggerViolation('keyboard_shortcut', `Disallowed key pressed: ${e.key}`);
      }
    };

    // Prevent page reload / navigation
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to exit? Your exam attempt may be disqualified.';
      return e.returnValue;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasStarted, submitted, isDisqualified, triggerViolation]);

  // ─────────────────────────────────────────────────────────────
  // Multi-Face Detection Engine
  // Runs every 5 seconds during exam. If >1 face → warning.
  // Second multi-face violation → immediate exam submission.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasStarted || submitted || isDisqualified) return;
    if (!('FaceDetector' in window)) return; // API not available in this browser

    let detector;
    try {
      detector = new window.FaceDetector({ maxDetectedFaces: 5, fastMode: true });
    } catch (e) {
      return;
    }

    const checkFaces = async () => {
      try {
        const video = pipVideoRef.current;
        if (!video || video.readyState < 2 || video.videoWidth === 0) return;

        const faces = await detector.detect(video);

        if (faces.length > 1) {
          const currentCount = multipleFaceCountRef.current;
          multipleFaceCountRef.current += 1;
          setMultipleFaceCount(multipleFaceCountRef.current);

          if (currentCount >= 1) {
            // Second multi-face violation → immediate submission
            performSubmit('Exam auto-submitted: Multiple faces detected repeatedly. Only the registered candidate is allowed in front of the camera.');
          } else {
            // First multi-face violation → warning
            triggerViolation('multiple_faces', `Multiple faces detected in camera (${faces.length} faces). Only the registered candidate is allowed. A second occurrence will immediately submit your exam.`);
          }
        }
      } catch (e) {
        // Silently ignore detection errors
      }
    };

    const interval = setInterval(checkFaces, 5000);
    return () => clearInterval(interval);
  }, [hasStarted, submitted, isDisqualified, triggerViolation]);

  // ─────────────────────────────────────────────────────────────
  // 5. Exam Countdown Timer
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let timerId;
    if (hasStarted && !submitted && !isDisqualified && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            performSubmit('Timer Expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [hasStarted, submitted, isDisqualified, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ─────────────────────────────────────────────────────────────
  // 6. Answer Selection & Real-time Auto-Save
  // ─────────────────────────────────────────────────────────────
  const handleOptionChange = async (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
    setSaveStatus('Saving answer...');

    try {
      await fetch(`/api/portal/admin/internships/exams/${activeToken || token}/save_answer/`, {
        method: 'POST',
        headers: getExamHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify({
          question_id: qId,
          selected_option: option
        })
      });
      setSaveStatus('All changes saved');
    } catch (err) {
      console.warn('Auto-save network error:', err);
      setSaveStatus('Offline: changes saved locally');
    }
  };

  const handleClearAnswer = async (qId) => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setSaveStatus('Updating...');

    try {
      await fetch(`/api/portal/admin/internships/exams/${activeToken || token}/save_answer/`, {
        method: 'POST',
        headers: getExamHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify({
          question_id: qId,
          selected_option: ''
        })
      });
      setSaveStatus('All changes saved');
    } catch (err) {
      setSaveStatus('Offline');
    }
  };

  const toggleReview = (qId) => {
    setReviewMarked(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // ─────────────────────────────────────────────────────────────
  // 7. Exam Launch Handler
  // ─────────────────────────────────────────────────────────────
  const handleStartExam = async () => {
    if (!cameraPermitted) {
      alert('You must enable and verify your webcam before starting the assessment.');
      return;
    }
    if (!agreed) {
      alert('You must agree to the proctoring terms and instructions.');
      return;
    }

    try {
      // 1. Enter browser fullscreen
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }

      // 2. Notify backend exam has started
      await fetch(`/api/portal/admin/internships/exams/${activeToken || token}/start_exam/`, {
        method: 'POST',
        headers: getExamHeaders(),
        credentials: 'same-origin'
      });

      setHasStarted(true);
    } catch (err) {
      console.error('Fullscreen or start failure:', err);
      // Still proceed if fullscreen API was blocked by security policy
      setHasStarted(true);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 8. Exam Final Submission
  // ─────────────────────────────────────────────────────────────
  const performSubmit = async (reason = 'Normal Candidate Submission') => {
    setSubmitting(true);
    const finalSnapshot = captureSnapshot();

    try {
      const response = await fetch(`/api/portal/admin/internships/exams/${activeToken || token}/submit/`, {
        method: 'POST',
        headers: getExamHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify({
          answers: answersRef.current,
          submission_reason: reason,
          snapshot: finalSnapshot
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || result.detail || result.message || 'Failed to submit assessment.');
      }

      setSubmitted(true);
      setShowSubmitConfirm(false);

      if (document.fullscreenElement) {
        try { document.exitFullscreen(); } catch (e) {}
      }

      if (result.proctoring_status === 'Disqualified') {
        setIsDisqualified(true);
        setDisqualificationReason(result.submission_reason || 'Disqualified due to proctoring policy violation.');
      }
    } catch (err) {
      alert('Assessment Submission Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Acknowledge warning modal and re-enter fullscreen
  const acknowledgeWarning = async () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {}
    setActiveViolationModal(null);
  };

  // ─────────────────────────────────────────────────────────────
  // RENDERING
  // ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column' }}>
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <h4 className="mt-4 fw-semibold tracking-wide">Initializing Secure Proctoring Environment...</h4>
        <p className="text-secondary small">Authenticating token and preparing questions</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="card shadow-2xl border-0 p-5 text-center" style={{ maxWidth: '520px', borderRadius: '16px', background: '#131b2e', color: '#fff' }}>
          <div className="mb-3" style={{ fontSize: '4rem', color: '#ef4444' }}>
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h3 className="fw-bold mb-3">Access Denied</h3>
          <p className="text-secondary mb-4">{error}</p>
          <button className="btn btn-outline-light rounded-pill px-4 py-2" onClick={() => navigate('/internships/candidate-login')}>
            Return to Candidate Login
          </button>
        </div>
      </div>
    );
  }

  // Hidden canvas for snapshots
  const renderHiddenCanvas = () => <canvas ref={canvasRef} style={{ display: 'none' }} />;

  // ─────────────────────────────────────────────────────────────
  // A. EXAM COMPLETED / DISQUALIFIED VIEW
  // ─────────────────────────────────────────────────────────────
  if (submitted || sessionData?.status === 'Completed') {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        {renderHiddenCanvas()}
        <div className="card shadow-2xl border-0 p-5 text-center" style={{ maxWidth: '640px', borderRadius: '24px', background: '#131b2e', color: '#fff' }}>
          {isDisqualified ? (
            <>
              <div className="mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '3rem' }}>
                <i className="fa-solid fa-ban"></i>
              </div>
              <h2 className="fw-bold text-danger mb-2">Assessment Terminated</h2>
              <div className="badge bg-danger bg-opacity-25 text-danger px-3 py-2 rounded-pill mb-4 fs-6 fw-semibold">
                Status: Failed — Proctoring Violation
              </div>
              <div className="p-4 rounded-3 text-start mb-4" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <h6 className="fw-bold text-danger mb-2"><i className="fa-solid fa-circle-exclamation me-2"></i> Reason for Disqualification:</h6>
                <p className="mb-2 text-light small">{disqualificationReason}</p>
                <p className="mb-0 text-secondary small">
                  The system detected repeated violations of the proctoring guidelines (e.g. tab switching, fullscreen exit, or unauthorized actions). Your webcam snapshots, timestamps, and event logs have been locked and submitted to the HR review panel.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '3rem' }}>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h2 className="fw-bold text-white mb-2">Assessment Submitted Successfully!</h2>
              <div className="badge bg-success bg-opacity-25 text-success px-4 py-2 rounded-pill mb-4 fs-6 fw-semibold">
                <i className="fa-solid fa-check-double me-1"></i> Score & Responses Updated in HR System
              </div>
              <div className="p-4 rounded-3 text-start mb-4" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h6 className="fw-bold text-white mb-2"><i className="fa-solid fa-user-check me-2 text-primary"></i> Assessment Receipt:</h6>
                <p className="text-secondary small mb-1"><strong>Candidate:</strong> {sessionData?.candidate_name} ({sessionData?.registration_id})</p>
                <p className="text-secondary small mb-1"><strong>Domain:</strong> {sessionData?.course}</p>
                <p className="text-secondary small mb-1"><strong>Status:</strong> Completed &bull; 1 of 1 Attempt Used</p>
                <p className="text-secondary small mb-0"><strong>Proctoring Audit:</strong> Verified & submitted cleanly for HR evaluation.</p>
              </div>
              <div className="p-3 rounded-3 mb-4 text-start small" style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div className="text-primary fw-bold mb-1">
                  <i className="fa-solid fa-circle-info me-1"></i> Next Steps & Notification:
                </div>
                <div className="text-light">
                  Your assessment score has been recorded and submitted to the HR evaluation dashboard. Our HR and Technical recruitment team will review your score and email you regarding the Technical Interview (Round 1).
                </div>
              </div>
            </>
          )}

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary px-5 py-2 rounded-pill fw-semibold shadow"
              onClick={() => navigate(`/internships/candidate-dashboard/${sessionData?.registration_id}`)}
            >
              <i className="fa-solid fa-arrow-left me-2"></i> Return to Candidate Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // B. PRE-EXAM INSTRUCTION & HARDWARE CHECK SCREEN
  // ─────────────────────────────────────────────────────────────
  if (!hasStarted) {
    const questionCount = sessionData?.questions?.length || 0;
    const durationMins = sessionData?.duration_minutes || 60;

    return (
      <div style={{ minHeight: '100vh', height: '100vh', overflowY: 'auto', background: '#090d16', color: '#f8fafc', padding: '16px 16px 40px 16px' }}>
        {renderHiddenCanvas()}
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Header Banner */}
          <div className="text-center mb-3">
            <h3 className="fw-bold text-white mb-1">Pre-Assessment Verification & System Check</h3>
            <p className="text-secondary small mb-0">Please verify your camera feed and accept the examination rules to proceed.</p>
          </div>

          <div className="row g-3">
            {/* Left: Webcam Setup */}
            <div className="col-lg-5">
              <div className="card border-0 p-3 h-100" style={{ background: '#131b2e', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h6 className="fw-bold text-white mb-2 d-flex align-items-center">
                  <i className="fa-solid fa-camera me-2 text-primary"></i> 1. Webcam Verification
                </h6>
                <p className="text-secondary small mb-2" style={{ fontSize: '0.78rem' }}>
                  A live webcam feed is required throughout this assessment for anti-cheating verification.
                </p>

                {/* Webcam Box */}
                <div style={{ position: 'relative', width: '100%', height: '190px', background: '#000', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: cameraPermitted ? '2px solid #10b981' : '2px dashed rgba(255,255,255,0.2)' }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: cameraPermitted ? 'block' : 'none', transform: 'scaleX(-1)' }}
                  />

                  {!cameraPermitted && (
                    <div className="text-center p-2">
                      {cameraLoading ? (
                        <>
                          <div className="spinner-border text-primary spinner-border-sm mb-2" role="status"></div>
                          <div className="text-secondary small">Requesting camera permissions...</div>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-video-slash text-secondary mb-2" style={{ fontSize: '2rem' }}></i>
                          <div className="text-secondary small mb-2">Camera not yet connected</div>
                          <button className="btn btn-sm btn-primary rounded-pill px-3 py-1 fw-semibold" onClick={initializeWebcam}>
                            <i className="fa-solid fa-camera me-1"></i> Enable & Test Camera
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {cameraPermitted && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(16, 185, 129, 0.9)', color: '#fff', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-circle-check me-1"></i> Camera Active
                    </div>
                  )}
                </div>

                {cameraError && (
                  <div className="alert alert-danger p-2 mt-2 small mb-0 rounded-3" style={{ fontSize: '0.75rem' }}>
                    <i className="fa-solid fa-triangle-exclamation me-1"></i> {cameraError}
                  </div>
                )}

                {cameraPermitted && (
                  <div className="d-flex align-items-center gap-2 mt-2 text-success small fw-semibold" style={{ fontSize: '0.78rem' }}>
                    <i className="fa-solid fa-circle-check"></i> Webcam operational. Face in view.
                  </div>
                )}

                {/* Candidate Credentials Card */}
                <div className="mt-3 rounded-3 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  {/* Header like dashboard */}
                  <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', padding: '10px 14px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Welcome back</div>
                    <div className="fw-bold text-white" style={{ fontSize: '1rem' }}>{sessionData?.candidate_name}</div>
                  </div>
                  {/* Details row */}
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 14px' }} className="d-flex flex-column gap-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Registration ID</span>
                      <span className="badge bg-primary text-white" style={{ fontSize: '0.7rem' }}>
                        {sessionData?.registration_id}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Email</span>
                      <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{sessionData?.candidate_email}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Domain</span>
                      <span style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: '600' }}>{sessionData?.course}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Instructions & Consent */}
            <div className="col-lg-7">
              <div className="card border-0 p-3 h-100 d-flex flex-column" style={{ background: '#131b2e', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h6 className="fw-bold text-white mb-2 d-flex align-items-center">
                  <i className="fa-solid fa-list-check me-2 text-warning"></i> 2. Examination Guidelines & Anti-Cheat Rules
                </h6>

                <div className="p-2 rounded-3 mb-2" style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <div className="row text-center g-1">
                    <div className="col-4 border-end border-secondary border-opacity-25">
                      <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Total Questions</div>
                      <div className="fw-bold text-white fs-6">{questionCount}</div>
                    </div>
                    <div className="col-4 border-end border-secondary border-opacity-25">
                      <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Time Limit</div>
                      <div className="fw-bold text-white fs-6">{durationMins} Mins</div>
                    </div>
                    <div className="col-4">
                      <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Allowed Warnings</div>
                      <div className="fw-bold text-warning fs-6">2 Max (3rd Fails)</div>
                    </div>
                  </div>
                </div>

                <div className="overflow-auto pe-1 mb-2" style={{ maxHeight: '130px' }}>
                  <ul className="list-unstyled d-flex flex-column gap-1 text-secondary mb-0" style={{ fontSize: '0.78rem' }}>
                    <li className="d-flex align-items-start gap-2">
                      <i className="fa-solid fa-expand text-primary mt-1"></i>
                      <span><strong>Fullscreen:</strong> Mandatory fullscreen. Exiting triggers an immediate warning.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="fa-solid fa-ban text-danger mt-1"></i>
                      <span><strong>No Tab Switching:</strong> Navigating away from this tab or pressing Alt+Tab records a strike.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="fa-solid fa-video text-success mt-1"></i>
                      <span><strong>Webcam Feed:</strong> Camera must remain active at all times. Snapshots are audited by HR.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="fa-solid fa-triangle-exclamation text-warning mt-1"></i>
                      <span><strong>3 Strikes Policy:</strong> Warning 1 & 2 are issued. A 3rd violation triggers automatic failure and disqualification.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="fa-solid fa-cloud-arrow-up text-secondary mt-1"></i>
                      <span><strong>Auto-Save:</strong> Answers are automatically saved to the cloud on selection.</span>
                    </li>
                  </ul>
                </div>

                {/* Consent Checkbox */}
                <div className="p-2 rounded-3 mb-3 mt-auto" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div className="form-check d-flex align-items-center mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="proctorConsentCheck"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      style={{ cursor: 'pointer', transform: 'scale(1.2)', flexShrink: 0 }}
                    />
                    <label className="form-check-label ms-2 text-light fw-medium" htmlFor="proctorConsentCheck" style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                      I agree to mandatory webcam monitoring, fullscreen lock, and proctoring rules.
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between align-items-center pt-2 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <button className="btn btn-outline-secondary rounded-pill px-3 py-2 text-light" onClick={() => navigate('/internships/candidate-dashboard')}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-lg d-flex align-items-center gap-2"
                    disabled={!cameraPermitted || !agreed}
                    onClick={handleStartExam}
                    style={{
                      background: (!cameraPermitted || !agreed) ? '#475569' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      border: 'none',
                      fontSize: '0.95rem'
                    }}
                  >
                    <span>Start Assessment & Enter Fullscreen</span>
                    <i className="fa-solid fa-play ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // C. SECURE PROCTORED EXAM ENVIRONMENT
  // ─────────────────────────────────────────────────────────────
  const currentQ = sessionData?.questions?.[currentIdx];
  const isAnswered = (id) => answers[id] !== undefined && answers[id] !== '';
  const isReview = (id) => reviewMarked[id] === true;
  const answeredTotal = Object.keys(answers).filter(k => answers[k] !== '').length;
  const questionsTotal = sessionData?.questions?.length || 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#090d16',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {renderHiddenCanvas()}

      {/* ── TOP SECURE TOOLBAR ── */}
      <header
        style={{
          background: '#101726',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        {/* Left: Assessment Brand & Candidate */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', fontSize: '1.2rem' }}>
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h6 className="mb-0 fw-bold text-white">YGR Proctored Assessment</h6>
              <span className="badge bg-primary text-white py-1 px-2 font-monospace" style={{ fontSize: '0.75rem' }}>
                {sessionData?.registration_id}
              </span>
            </div>
            <small className="text-secondary">{sessionData?.candidate_name} • {sessionData?.course}</small>
          </div>
        </div>

        {/* Center: Live Warning Meter & Cloud Sync */}
        <div className="d-none d-md-flex align-items-center gap-3">
          {/* Strikes Meter */}
          <div
            className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
            style={{
              background: warningCount === 0 ? 'rgba(16, 185, 129, 0.1)' : warningCount === 1 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${warningCount === 0 ? 'rgba(16, 185, 129, 0.3)' : warningCount === 1 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.5)'}`
            }}
          >
            <i className={`fa-solid fa-triangle-exclamation ${warningCount === 0 ? 'text-success' : warningCount === 1 ? 'text-warning' : 'text-danger'}`}></i>
            <span className="small fw-semibold text-light">
              Strikes: <span className={warningCount === 0 ? 'text-success' : warningCount === 1 ? 'text-warning' : 'text-danger'}>{warningCount} / {maxWarnings}</span>
            </span>
          </div>

          {/* Cloud Auto-Save Badge */}
          <div className="d-flex align-items-center gap-1 text-secondary small px-2">
            <i className="fa-solid fa-cloud-arrow-up text-primary"></i>
            <span style={{ fontSize: '0.8rem' }}>{saveStatus}</span>
          </div>
        </div>

        {/* Right: Countdown Clock & Submit Action */}
        <div className="d-flex align-items-center gap-3">
          {/* Timer Clock */}
          <div
            className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
            style={{
              background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.2)' : timeLeft < 600 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(15, 23, 42, 0.8)',
              border: `1px solid ${timeLeft < 300 ? '#ef4444' : 'rgba(255,255,255,0.1)'}`
            }}
          >
            <i className={`fa-regular fa-clock ${timeLeft < 300 ? 'text-danger fa-beat' : 'text-warning'}`}></i>
            <span className="font-monospace fw-bold fs-6 text-white">{formatTime(timeLeft)}</span>
          </div>

          {/* Finish & Submit Button */}
          <button
            className="btn btn-sm btn-success rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2 shadow"
            onClick={() => setShowSubmitConfirm(true)}
          >
            <i className="fa-solid fa-paper-plane"></i>
            <span className="d-none d-sm-inline">Submit Assessment</span>
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE CONTAINER ── */}
      <div className="container-fluid flex-grow-1 p-3 p-lg-4" style={{ maxWidth: '1440px' }}>
        <div className="row g-4">
          
          {/* LEFT 8 COLUMNS: QUESTION CARD */}
          <div className="col-lg-8 col-xl-9">
            {/* Warning banner if strikes exist */}
            {warningCount > 0 && (
              <div className="alert alert-warning border-0 p-3 mb-3 d-flex align-items-center justify-content-between rounded-3" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                <div className="d-flex align-items-center gap-2 small fw-semibold">
                  <i className="fa-solid fa-circle-exclamation fs-5"></i>
                  <span>Proctoring Alert: You have {warningCount} of {maxWarnings} allowed warnings. Reaching 3 violations will immediately disqualify and submit your exam.</span>
                </div>
              </div>
            )}

            <div className="card border-0 h-100" style={{ background: '#131b2e', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              
              {/* Question Header */}
              <div className="p-4 border-bottom d-flex justify-content-between align-items-center" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 fw-bold">
                    Question {currentIdx + 1}
                  </span>
                  <span className="text-secondary small">of {questionsTotal}</span>
                </div>

                {currentQ && (
                  <button
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold d-flex align-items-center gap-2 ${isReview(currentQ.id) ? 'btn-warning text-dark' : 'btn-outline-light'}`}
                    onClick={() => toggleReview(currentQ.id)}
                  >
                    <i className="fa-solid fa-flag"></i>
                    <span>{isReview(currentQ.id) ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                )}
              </div>

              {/* Question Content Body */}
              <div className="p-4 p-md-5">
                {currentQ ? (
                  <>
                    <h5 className="fw-medium text-white lh-base mb-4" style={{ fontSize: '1.2rem' }}>
                      {currentQ.question_text}
                    </h5>

                    {/* Radio Options A, B, C, D */}
                    <div className="d-flex flex-column gap-3 mb-4">
                      {['A', 'B', 'C', 'D'].map(optKey => {
                        const optText = currentQ[`option_${optKey.toLowerCase()}`];
                        if (!optText) return null;
                        const isSelected = answers[currentQ.id] === optKey;

                        return (
                          <div
                            key={optKey}
                            onClick={() => handleOptionChange(currentQ.id, optKey)}
                            style={{
                              cursor: 'pointer',
                              padding: '16px 20px',
                              borderRadius: '12px',
                              background: isSelected ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                              border: `1.5px solid ${isSelected ? '#3b82f6' : 'rgba(255, 255, 255, 0.07)'}`,
                              transition: 'all 0.15s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '14px'
                            }}
                          >
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: `2px solid ${isSelected ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: isSelected ? '#3b82f6' : 'transparent',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                flexShrink: 0
                              }}
                            >
                              {isSelected ? <i className="fa-solid fa-check" style={{ fontSize: '0.75rem' }}></i> : optKey}
                            </div>
                            <span className="text-light fs-6" style={{ wordBreak: 'break-word' }}>
                              {optText}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Clear selection option */}
                    {answers[currentQ.id] && (
                      <div className="text-end">
                        <button className="btn btn-link btn-sm text-secondary text-decoration-none" onClick={() => handleClearAnswer(currentQ.id)}>
                          <i className="fa-solid fa-rotate-left me-1"></i> Clear Response
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-5 text-secondary">No questions loaded for this assessment.</div>
                )}
              </div>

              {/* Question Navigation Footer */}
              <div className="p-4 border-top mt-auto d-flex justify-content-between align-items-center" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <button
                  className="btn btn-outline-light rounded-pill px-4 py-2"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                >
                  <i className="fa-solid fa-arrow-left me-2"></i> Previous
                </button>

                <div className="text-secondary small d-none d-sm-block">
                  {answeredTotal} of {questionsTotal} Answered
                </div>

                <button
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold"
                  disabled={currentIdx >= questionsTotal - 1}
                  onClick={() => setCurrentIdx(prev => Math.min(questionsTotal - 1, prev + 1))}
                >
                  Next <i className="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT 4 COLUMNS: WEBCAM PIP & QUESTION PALETTE */}
          <div className="col-lg-4 col-xl-3">
            <div className="d-flex flex-column gap-4">
              
              {/* LIVE WEBCAM PIP FEED */}
              <div className="card border-0 p-3" style={{ background: '#131b2e', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-semibold text-secondary" style={{ fontSize: '0.75rem' }}>Live Camera</span>
                  <span className="badge bg-success bg-opacity-20 text-success small" style={{ fontSize: '0.7rem' }}>
                    <i className="fa-solid fa-circle me-1"></i> Active
                  </span>
                </div>

                {/* Live Webcam Box */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                  <video
                    ref={pipVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', color: '#94a3b8' }}>
                    {sessionData?.registration_id}
                  </div>
                </div>
              </div>

              {/* QUESTION PALETTE GRID */}
              <div className="card border-0 p-3" style={{ background: '#131b2e', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>Question Palette</h6>
                  <span className="text-secondary small">{answeredTotal}/{questionsTotal}</span>
                </div>

                {/* Palette Grid */}
                <div className="d-flex flex-wrap gap-2 mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {sessionData?.questions?.map((item, idx) => {
                    const answered = isAnswered(item.id);
                    const review = isReview(item.id);
                    const isCurrent = currentIdx === idx;

                    let bg = 'rgba(255, 255, 255, 0.05)';
                    let color = '#94a3b8';
                    let border = '1px solid rgba(255, 255, 255, 0.1)';

                    if (isCurrent) {
                      border = '2px solid #3b82f6';
                      color = '#fff';
                    }
                    if (answered && review) {
                      bg = '#8b5cf6';
                      color = '#fff';
                    } else if (answered) {
                      bg = '#10b981';
                      color = '#fff';
                    } else if (review) {
                      bg = '#f59e0b';
                      color = '#000';
                    }

                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIdx(idx)}
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          background: bg,
                          color: color,
                          border: border,
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-2 border-top d-flex flex-column gap-2 small text-secondary" style={{ borderColor: 'rgba(255,255,255,0.08)', fontSize: '0.75rem' }}>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10b981' }}></span>
                    <span>Answered ({answeredTotal})</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b' }}></span>
                    <span>Marked for Review ({Object.values(reviewMarked).filter(Boolean).length})</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)' }}></span>
                    <span>Unanswered ({questionsTotal - answeredTotal})</span>
                  </div>
                </div>

                {/* Bottom Submit Action */}
                <button
                  className="btn btn-success rounded-pill w-100 py-2 mt-3 fw-bold shadow"
                  onClick={() => setShowSubmitConfirm(true)}
                  disabled={submitting}
                >
                  <i className="fa-solid fa-check-circle me-1"></i> Submit Assessment
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── VIOLATION WARNING MODAL (STRIKE 1 & 2) ── */}
      {activeViolationModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="card border-0 p-4 p-md-5 text-center shadow-2xl"
            style={{
              maxWidth: '540px',
              width: '100%',
              borderRadius: '24px',
              background: '#131b2e',
              border: '2px solid #ef4444',
              color: '#fff'
            }}
          >
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                fontSize: '2.5rem'
              }}
            >
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h3 className="fw-bold text-danger mb-2">
              Proctoring Violation Detected
            </h3>
            <div className="badge bg-danger px-3 py-2 rounded-pill fs-6 fw-bold mb-3">
              WARNING {activeViolationModal.number} OF {maxWarnings}
            </div>

            <p className="text-light mb-3">
              <strong>Incident:</strong> {activeViolationModal.message}
            </p>

            <div className="p-3 rounded-3 mb-4 text-start small" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <div className="text-danger fw-bold mb-1">
                <i className="fa-solid fa-circle-exclamation me-1"></i> Strict Policy Warning:
              </div>
              <div className="text-secondary">
                You have <strong>{activeViolationModal.remaining} warning(s)</strong> remaining. Reaching {maxWarnings} warnings will immediately terminate your assessment and record a disqualification on your candidate record.
              </div>
            </div>

            <button
              className="btn btn-danger btn-lg rounded-pill px-5 py-2 fw-bold shadow-lg"
              onClick={acknowledgeWarning}
            >
              <i className="fa-solid fa-expand me-2"></i> Re-enter Fullscreen & Continue
            </button>
          </div>
        </div>
      )}

      {/* ── SUBMIT CONFIRMATION MODAL ── */}
      {showSubmitConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="card border-0 p-4 text-center shadow-2xl"
            style={{ maxWidth: '480px', width: '100%', borderRadius: '20px', background: '#131b2e', color: '#fff' }}
          >
            <div className="mb-3 text-warning" style={{ fontSize: '3rem' }}>
              <i className="fa-solid fa-circle-question"></i>
            </div>
            <h4 className="fw-bold mb-2">Submit Assessment?</h4>
            <p className="text-secondary small mb-3">
              You are about to finalize your answers. Once submitted, you cannot re-attempt or modify responses.
            </p>

            <div className="p-3 rounded-3 mb-4 text-start small" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-secondary">Answered Questions:</span>
                <span className="fw-bold text-success">{answeredTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-secondary">Unanswered Questions:</span>
                <span className="fw-bold text-danger">{questionsTotal - answeredTotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Time Remaining:</span>
                <span className="fw-bold text-warning">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => setShowSubmitConfirm(false)}
                disabled={submitting}
              >
                Continue Exam
              </button>
              <button
                className="btn btn-success rounded-pill px-4 fw-bold"
                onClick={() => performSubmit('Normal Candidate Submission')}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Yes, Submit Final'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CandidateExam;
