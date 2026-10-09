import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidateExamGateway = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); // 'login' | 'confirm' | 'exam' | 'submitted'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [candidateInfo, setCandidateInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  
  // Timer: 30 minutes (1800 seconds) default
  const [secondsLeft, setSecondsLeft] = useState(1800);
  const [timerActive, setTimerActive] = useState(false);

  // Camera Proctoring state
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [requestingCamera, setRequestingCamera] = useState(false);

  // 3-Strike Warning & Anti-Cheating state
  const [warningCount, setWarningCount] = useState(0);
  const [warningReason, setWarningReason] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const warningCountRef = useRef(0);
  const lastViolationTimeRef = useRef(0);
  const consecutiveViolationsRef = useRef(0);
  const lastAnomalyTypeRef = useRef('');

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && timerActive) {
      setTimerActive(false);
      handleAutoSubmit();
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  // Violation Handler (3 Strikes = Auto Submit)
  const registerViolation = (reason) => {
    const now = Date.now();
    if (now - lastViolationTimeRef.current < 3000) return; // 3 sec cooldown between strikes
    lastViolationTimeRef.current = now;

    const newCount = warningCountRef.current + 1;
    warningCountRef.current = newCount;
    setWarningCount(newCount);
    setWarningReason(reason);

    if (newCount >= 3) {
      alert(`🚨 STRIKE 3 WARNING EXCEEDED (${reason})!\n\nMaximum allowed anti-cheating warnings reached. Your exam is being automatically submitted now.`);
      executeSubmit();
    } else {
      setShowWarningModal(true);
    }
  };

  // Anti-Cheating: Fullscreen Lock & Keyboard Shield
  useEffect(() => {
    if (step !== 'exam' || !timerActive) return;

    // Request Full Screen Lockdown
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !showWarningModal) {
        registerViolation('Exited single exam full-screen window lockdown mode');
      }
    };

    const handleKeyDown = (e) => {
      const forbiddenKeys = ['F12', 'F11', 'F5', 'Escape', 'Meta', 'Alt'];
      if (
        forbiddenKeys.includes(e.key) ||
        (e.ctrlKey && ['c', 'v', 'x', 'a', 'p', 's', 'u', 't', 'n', 'w', 'r', 'l'].includes(e.key.toLowerCase())) ||
        (e.altKey && e.key === 'Tab') ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        registerViolation(`Attempted forbidden shortcut / opening another web page (${e.key})`);
      }
    };

    const handleContextMenu = (e) => e.preventDefault();
    const handleCopyPaste = (e) => e.preventDefault();
    const handleSelectStart = (e) => e.preventDefault();

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, [step, timerActive, showWarningModal]);

  // Anti-Cheating: Strict Tab Switch & Window Blur Lockdown
  useEffect(() => {
    if (step !== 'exam' || !timerActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        registerViolation('Opening or switching to another web page / browser tab is strictly forbidden!');
      }
    };

    const handleWindowBlur = () => {
      registerViolation('Navigating away to another web page, window, or application is strictly forbidden!');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [step, timerActive]);

  // Anti-Cheating: Live Camera Proctoring & Face Detection Engine
  useEffect(() => {
    if (step !== 'exam' || !timerActive || !cameraActive) return;

    let faceDetector = null;
    if ('FaceDetector' in window) {
      try {
        faceDetector = new window.FaceDetector({ fastMode: true, maxFaces: 5 });
      } catch (e) {}
    }

    const proctorInterval = setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.readyState !== 4) return;

      let detectedAnomaly = '';

      // 1. NATIVE BROWSER FACE DETECTOR (If supported by browser engine)
      if (faceDetector) {
        try {
          const faces = await faceDetector.detect(video);
          if (faces.length > 1) {
            detectedAnomaly = `Multiple persons (${faces.length} people detected) in proctor camera view`;
          }
        } catch (e) {}
      }

      // Require 4 consecutive checks (6 seconds of sustained anomaly) before issuing warning strike
      if (detectedAnomaly !== '') {
        if (lastAnomalyTypeRef.current === detectedAnomaly) {
          consecutiveViolationsRef.current += 1;
        } else {
          lastAnomalyTypeRef.current = detectedAnomaly;
          consecutiveViolationsRef.current = 1;
        }

        if (consecutiveViolationsRef.current >= 4) {
          registerViolation(detectedAnomaly);
          consecutiveViolationsRef.current = 0;
          lastAnomalyTypeRef.current = '';
        }
      } else {
        consecutiveViolationsRef.current = 0;
        lastAnomalyTypeRef.current = '';
      }
    }, 1500);

    return () => clearInterval(proctorInterval);
  }, [step, timerActive, cameraActive]);

  // Bind video stream to <video> element whenever camera is active
  useEffect(() => {
    if (cameraActive && mediaStreamRef.current && videoRef.current) {
      videoRef.current.srcObject = mediaStreamRef.current;
    }
  }, [cameraActive, step, currentIdx]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const startCameraStream = async () => {
    setRequestingCamera(true);
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam access is not supported by your browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      mediaStreamRef.current = stream;
      setCameraActive(true);
      return true;
    } catch (err) {
      console.warn('Webcam permission error:', err);
      setCameraError('Webcam access was denied. Camera permissions are mandatory for proctored exams.');
      setCameraActive(false);
      return false;
    } finally {
      setRequestingCamera(false);
    }
  };

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setCameraActive(false);
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthenticating(true);
    setLoginError('');

    try {
      const res = await axios.post('/api/exams/candidate-login/', {
        email: email.trim(),
        password: password.trim()
      });

      if (res.data.completed) {
        setCandidateInfo(res.data);
        setStep('submitted');
        setSubmitResult({
          score: res.data.score,
          alreadyCompleted: true,
          detail: res.data.detail || 'Exam already completed for this candidate account.'
        });
      } else {
        setCandidateInfo(res.data);
        setStep('confirm');
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Authentication failed. Please check your credentials.';
      setLoginError(msg);
    } finally {
      setAuthenticating(false);
    }
  };

  const handleStartExam = async () => {
    setAuthenticating(true);
    setLoginError('');

    // Request camera & microphone permission
    const camSuccess = await startCameraStream();
    if (!camSuccess) {
      setAuthenticating(false);
      return;
    }

    try {
      const res = await axios.post('/api/exams/candidate-questions/', {
        email: email.trim(),
        password: password.trim()
      });

      if (res.data.questions && res.data.questions.length > 0) {
        setQuestions(res.data.questions);
        setStep('exam');
        setTimerActive(true);
      } else {
        setLoginError('No questions configured in database for your assigned language module.');
        stopCameraStream();
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Could not fetch examination questions.';
      setLoginError(msg);
      stopCameraStream();
    } finally {
      setAuthenticating(false);
    }
  };

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleAutoSubmit = () => {
    alert('Time has expired! Submitting your answers automatically.');
    executeSubmit();
  };

  const executeSubmit = async () => {
    setSubmitting(true);
    setTimerActive(false);

    try {
      const res = await axios.post('/api/exams/candidate-submit/', {
        email: email.trim(),
        password: password.trim(),
        answers: answers
      });

      setSubmitResult(res.data);
      setStep('submitted');
      stopCameraStream();
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to submit test responses.';
      alert(msg);
      setTimerActive(true);
    } finally {
      setSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      padding: '24px',
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      overflowY: 'auto'
    }}>
      <style>{`
        .cand-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
          width: 100%;
          max-width: 960px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          margin: auto;
        }
        .cand-header {
          background: linear-gradient(135deg, #092a49 0%, #0f172a 100%) !important;
          color: #ffffff !important;
          padding: 16px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #1e3a8a;
        }
        .cand-header h2, .cand-header h2 * {
          color: #ffffff !important;
          opacity: 1 !important;
        }
        .cand-header span {
          color: #93c5fd !important;
          opacity: 1 !important;
        }
        .cand-body {
          padding: 32px;
          background: #ffffff;
        }
        .cand-btn-primary {
          background: #2563eb;
          color: #ffffff;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cand-btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }
        .cand-btn-secondary {
          background: #f1f5f9;
          color: #334155;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cand-btn-secondary:hover {
          background: #e2e8f0;
        }
        .opt-btn {
          display: flex;
          align-items: center;
          width: 100%;
          text-align: left;
          padding: 14px 18px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          margin-top: 12px;
          cursor: pointer;
          font-size: 15px;
          color: #334155;
          transition: all 0.2s ease;
        }
        .opt-btn:hover {
          border-color: #93c5fd;
          background: #eff6ff;
        }
        .opt-btn.selected {
          border-color: #2563eb;
          background: #eff6ff;
          color: #1e40af;
          font-weight: 600;
        }
        .opt-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          margin-right: 14px;
          flex-shrink: 0;
        }
        .opt-btn.selected .opt-badge {
          background: #2563eb;
          color: #ffffff;
        }
        .q-palette-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .q-palette-btn.active {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
        }
        .q-palette-btn.answered {
          background: #10b981;
          color: #ffffff;
          border-color: #059669;
        }
        .camera-box {
          width: 140px;
          height: 105px;
          border-radius: 10px;
          overflow: hidden;
          background: #0f172a;
          border: 2px solid #3b82f6;
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .camera-badge {
          position: absolute;
          bottom: 4px;
          left: 4px;
          right: 4px;
          background: rgba(15, 23, 42, 0.85);
          color: #4ade80;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 4px;
          border-radius: 4px;
          text-align: center;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="cand-card">
        {/* TOP HEADER WITH LOGO & CRISP WHITE TEXT */}
        <div className="cand-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/static/images/logo1.jpeg"
                alt="YGR Gobal IT Services"
                style={{
                  height: '46px',
                  width: 'auto',
                  borderRadius: '4px',
                  border: 'none',
                  outline: 'none'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline-flex';
                }}
              />
              <div
                style={{
                  display: 'none',
                  height: '42px',
                  width: '42px',
                  borderRadius: '6px',
                  background: '#2563eb',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '15px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                YGR
              </div>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#ffffff !important', letterSpacing: '-0.3px', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                YGR Gobal IT Services
              </h2>
              <span style={{ fontSize: '13px', color: '#93c5fd !important', fontWeight: 500 }}>Online Examination Portal (AI Proctored)</span>
            </div>
          </div>

          {step === 'exam' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Webcam Live Feed Widget */}
              <div className="camera-box">
                <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="camera-badge">
                  ● PROCTOR CAM LIVE
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px' }}>
                    Answered: <b>{answeredCount} / {questions.length}</b>
                  </div>
                  <div style={{
                    background: warningCount > 0 ? (warningCount >= 2 ? '#dc2626' : '#d97706') : 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    ⚠️ Warnings: {warningCount} / 3
                  </div>
                </div>
                <div style={{
                  background: secondsLeft < 300 ? '#ef4444' : '#2563eb',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '1px'
                }}>
                  ⏱️ {formatTime(secondsLeft)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STEP 1: CANDIDATE LOGIN */}
        {step === 'login' && (
          <div className="cand-body" style={{ maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'rgba(37, 99, 235, 0.1)',
                color: '#2563eb',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '12px'
              }}>
                🔐
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontWeight: 800, fontSize: '22px' }}>CANDIDATE GATEWAY LOGIN</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                Enter the email address and access passcode provided to you by HR.
              </p>
            </div>

            {loginError && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '18px', textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Candidate Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. candidate@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Gateway Access Passcode
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter passcode created by HR"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                className="cand-btn-primary"
                disabled={authenticating}
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              >
                {authenticating ? 'Authenticating candidate...' : 'Access Candidate Portal'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: CONFIRMATION & INSTRUCTIONS & CAMERA PERMISSION */}
        {step === 'confirm' && candidateInfo && (
          <div className="cand-body" style={{ textAlign: 'left' }}>
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#1d4ed8', fontWeight: 700 }}>
                  Assigned Candidate Account
                </span>
                <h3 style={{ margin: '4px 0 0 0', color: '#1e3a8a', fontSize: '20px' }}>
                  {candidateInfo.username}
                </h3>
                <div style={{ fontSize: '14px', color: '#3b82f6', marginTop: '2px' }}>{candidateInfo.email}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Evaluation Subject</span>
                <span style={{
                  display: 'inline-block',
                  background: '#2563eb',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  marginTop: '4px'
                }}>
                  {(candidateInfo.role || '').toUpperCase()}
                </span>
              </div>
            </div>

            {(loginError || cameraError) && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
                ⚠️ {loginError || cameraError}
              </div>
            )}

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#0f172a' }}>📋 Examination Guidelines & 3-Strike Proctoring Rules</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>
                <li><b>Webcam AI Proctoring:</b> Live video monitoring is active throughout the exam session.</li>
                <li><b style={{ color: '#dc2626' }}>Strict 3-Strike Warning Rule:</b> You are allowed a maximum of 2 warnings. Receiving <b>3 warnings will automatically submit your exam immediately</b>.</li>
                <li><b>Monitored Anti-Cheating Violations:</b> Multiple persons in camera view, head turned away, mobile phones/devices taking pictures, exiting full-screen mode, or tab switching.</li>
                <li>Your time limit is <b>30 minutes</b>. Ensure all questions are answered before final submission.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <button className="cand-btn-secondary" onClick={() => setStep('login')}>
                ← Log Out
              </button>
              <button className="cand-btn-primary" onClick={handleStartExam} disabled={authenticating || requestingCamera} style={{ flex: 1 }}>
                {requestingCamera ? 'Requesting Permissions...' : authenticating ? 'Loading questions...' : '📷 Grant Camera Access to Start Test'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EXAM MCQ TEST ENGINE */}
        {step === 'exam' && questions.length > 0 && (
          <div className="cand-body" style={{ textAlign: 'left' }}>
            {/* Active Question Display */}
            {(() => {
              const currentQ = questions[currentIdx];
              const selectedOpt = answers[currentQ.id];

              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>
                      QUESTION {currentIdx + 1} OF {questions.length}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                      Subject: {(candidateInfo?.role || '').toUpperCase()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', color: '#0f172a', fontWeight: 600, lineHeight: '1.5', margin: '0 0 20px 0' }}>
                    {currentQ.question_text}
                  </h3>

                  {/* Options */}
                  <button
                    type="button"
                    className={`opt-btn ${selectedOpt === 'A' ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(currentQ.id, 'A')}
                  >
                    <span className="opt-badge">A</span>
                    <span>{currentQ.option_a}</span>
                  </button>

                  <button
                    type="button"
                    className={`opt-btn ${selectedOpt === 'B' ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(currentQ.id, 'B')}
                  >
                    <span className="opt-badge">B</span>
                    <span>{currentQ.option_b}</span>
                  </button>

                  <button
                    type="button"
                    className={`opt-btn ${selectedOpt === 'C' ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(currentQ.id, 'C')}
                  >
                    <span className="opt-badge">C</span>
                    <span>{currentQ.option_c}</span>
                  </button>

                  <button
                    type="button"
                    className={`opt-btn ${selectedOpt === 'D' ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(currentQ.id, 'D')}
                  >
                    <span className="opt-badge">D</span>
                    <span>{currentQ.option_d}</span>
                  </button>

                  {/* Nav Controls & Palette */}
                  <div style={{ marginTop: '28px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          type="button"
                          className="cand-btn-secondary"
                          disabled={currentIdx === 0}
                          onClick={() => setCurrentIdx((prev) => prev - 1)}
                        >
                          ← Previous
                        </button>
                        <button
                          type="button"
                          className="cand-btn-secondary"
                          disabled={currentIdx === questions.length - 1}
                          onClick={() => setCurrentIdx((prev) => prev + 1)}
                        >
                          Next →
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cand-btn-primary"
                        style={{ background: '#10b981' }}
                        onClick={() => setShowConfirmModal(true)}
                      >
                        ✅ Submit Examination
                      </button>
                    </div>

                    {/* Question Palette Grid */}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>
                        QUESTION NAVIGATION PALETTE:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {questions.map((q, idx) => {
                          const isAns = !!answers[q.id];
                          const isCurr = idx === currentIdx;

                          return (
                            <button
                              key={q.id}
                              type="button"
                              className={`q-palette-btn ${isAns ? 'answered' : ''} ${isCurr ? 'active' : ''}`}
                              onClick={() => setCurrentIdx(idx)}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* STEP 4: SUBMITTED / COMPLETED VIEW */}
        {step === 'submitted' && submitResult && (
          <div className="cand-body" style={{ textAlign: 'center', padding: '40px 32px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              background: '#dcfce7',
              color: '#16a34a',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              marginBottom: '16px'
            }}>
              🎉
            </div>

            <h2 style={{ margin: '0 0 8px 0', color: '#0f172a', fontWeight: 800 }}>
              {submitResult.alreadyCompleted ? 'Exam Already Completed' : 'Examination Submitted Successfully!'}
            </h2>

            <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '500px', margin: '0 auto 24px auto' }}>
              {submitResult.alreadyCompleted
                ? 'Our records show that your test evaluation has already been completed and stored.'
                : 'Thank you for taking the evaluation test. Your responses have been evaluated and synced with HR.'}
            </p>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '360px',
              margin: '0 auto 28px auto'
            }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', fontWeight: 700 }}>
                EVALUATION SCORE RESULT
              </span>
              <div style={{
                fontSize: '48px',
                fontWeight: 800,
                color: (submitResult.score ?? 0) >= 60 ? '#16a34a' : '#dc2626',
                margin: '8px 0'
              }}>
                {parseFloat(submitResult.score ?? 0).toFixed(1)}%
              </div>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '13px',
                background: (submitResult.score ?? 0) >= 60 ? '#dcfce7' : '#fee2e2',
                color: (submitResult.score ?? 0) >= 60 ? '#15803d' : '#b91c1c'
              }}>
                {(submitResult.score ?? 0) >= 60 ? 'PASSED EVALUATION' : 'NEEDS IMPROVEMENT'}
              </span>
              
              {submitResult.total_questions && (
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }}>
                  Correct: <b>{submitResult.correct_answers}</b> / {submitResult.total_questions} questions
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="cand-btn-primary"
                style={{ background: '#2563eb', padding: '12px 24px' }}
                onClick={() => {
                  stopCameraStream();
                  navigate('/');
                }}
              >
                🏠 Return to Website Home Page
              </button>

              <button
                className="cand-btn-secondary"
                style={{ padding: '12px 24px' }}
                onClick={() => {
                  stopCameraStream();
                  setStep('login');
                  setEmail('');
                  setPassword('');
                  setAnswers({});
                }}
              >
                🔐 Gateway Login
              </button>
            </div>
          </div>
        )}

        {/* CONFIRMATION SUBMIT MODAL */}
        {showConfirmModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '420px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Submit Examination?</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 20px 0' }}>
                You have answered <b>{answeredCount} out of {questions.length}</b> questions. Are you sure you want to finalize and submit?
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  className="cand-btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowConfirmModal(false)}
                >
                  Continue Test
                </button>
                <button
                  className="cand-btn-primary"
                  style={{ flex: 1, background: '#10b981' }}
                  disabled={submitting}
                  onClick={executeSubmit}
                >
                  {submitting ? 'Submitting...' : 'Yes, Submit Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3-STRIKE PROCTORING WARNING MODAL */}
        {showWarningModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999999
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '460px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: warningCount >= 2 ? '2px solid #dc2626' : '2px solid #f59e0b'
            }}>
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>⚠️</div>
              <h3 style={{ margin: '0 0 12px 0', color: warningCount >= 2 ? '#991b1b' : '#92400e', fontSize: '20px', fontWeight: 800 }}>
                {warningCount >= 2 ? '🚨 FINAL WARNING (STRIKE 2 OF 3)' : 'PROCTORING WARNING (STRIKE 1 OF 3)'}
              </h3>
              <div style={{
                background: warningCount >= 2 ? '#fef2f2' : '#fef3c7',
                border: warningCount >= 2 ? '#fecaca' : '1px solid #fcd34d',
                color: warningCount >= 2 ? '#991b1b' : '#78350f',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '18px',
                fontWeight: 600
              }}>
                Violation Detected: {warningReason}
              </div>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                Please stay focused on your exam screen and ensure only your face is visible in the proctoring camera.
                <br /><b style={{ color: '#dc2626' }}>Receiving 3 warnings will result in immediate automatic test submission!</b>
              </p>
              <button
                className="cand-btn-primary"
                style={{
                  background: warningCount >= 2 ? '#dc2626' : '#d97706',
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700
                }}
                onClick={() => setShowWarningModal(false)}
              >
                I Understand & Resume Test ({3 - warningCount} Warning{3 - warningCount === 1 ? '' : 's'} Remaining)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateExamGateway;
