import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';

const Exams = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const role = user?.role;

  const [activeTab, setActiveTab] = useState('scores'); // 'scores' or 'questions' or 'take-exam' or 'candidates'
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Question Form state
  const [newLanguage, setNewLanguage] = useState('python');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOpt, setCorrectOpt] = useState('A');
  const [savingQuestion, setSavingQuestion] = useState(false);

  // Candidate Exam flow state
  const [candEmail, setCandEmail] = useState('');
  const [candPassword, setCandPassword] = useState('');
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [candidateAnswers, setCandidateAnswers] = useState({});
  const [examResultInfo, setExamResultInfo] = useState(null);
  const [submittingExam, setSubmittingExam] = useState(false);

  // New Candidate Form state
  const [newCandidate, setNewCandidate] = useState({
    username: '',
    email: '',
    phone_no: '',
    language: 'python',
    password: ''
  });
  const [savingCandidate, setSavingCandidate] = useState(false);

  const fetchScoresOnly = async () => {
    try {
      const resultsRes = await api.get('/api/exams/');
      setResults(resultsRes.data || []);
    } catch (err) {
      console.error('Error fetching scores:', err);
    }
  };

  const loadExamData = async () => {
    setLoading(true);
    try {
      const resultsRes = await api.get('/api/exams/');
      setResults(resultsRes.data || []);

      const questionsRes = await api.get('/api/questions/');
      setQuestions(questionsRes.data || []);

      const langsRes = await api.get('/api/exams/languages/');
      setLanguages(langsRes.data || []);
      if (langsRes.data?.length > 0) {
        setNewLanguage(langsRes.data[0].value);
        setNewCandidate(prev => ({ ...prev, language: langsRes.data[0].value }));
      }

      if (['HR', 'MD'].includes(role)) {
        const candsRes = await api.get('/api/exams/users/');
        setCandidates(candsRes.data || []);
      }
    } catch (err) {
      console.error('Error loading exam module data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExamData();

    // Auto refresh score log every 8 seconds
    const interval = setInterval(() => {
      fetchScoresOnly();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    setSavingQuestion(true);
    try {
      await api.post('/api/questions/', {
        language: newLanguage,
        question_text: newQuestionText,
        option_a: optA,
        option_b: optB,
        option_c: optC,
        option_d: optD,
        correct_option: correctOpt,
      });
      showToast('Question added to exam pool.', 'success');
      setNewQuestionText('');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
      loadExamData();
    } catch (err) {
      showToast('Failed to save question.', 'error');
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleCreateCandidate = async (e) => {
    e.preventDefault();
    setSavingCandidate(true);
    try {
      await api.post('/api/exams/users/', newCandidate);
      showToast('Candidate user account created successfully.', 'success');
      setNewCandidate({
        username: '',
        email: '',
        phone_no: '',
        language: languages[0]?.value || 'python',
        password: ''
      });
      const candsRes = await api.get('/api/exams/users/');
      setCandidates(candsRes.data || []);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to create candidate.', 'error');
    } finally {
      setSavingCandidate(false);
    }
  };

  const handleStartCandidateExam = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get('/api/questions/', {
        params: { language: newLanguage }
      });
      if (res.data.length === 0) {
        showToast('No questions configured in database for this language module.', 'warning');
        return;
      }
      setExamQuestions(res.data);
      setExamStarted(true);
    } catch (err) {
      showToast('Could not start candidate exam.', 'error');
    }
  };

  const handleSelectOption = (questionId, option) => {
    setCandidateAnswers({
      ...candidateAnswers,
      [questionId]: option
    });
  };

  const handleSubmitExam = async () => {
    const isConfirmed = await showConfirm('Are you sure you want to finalize and submit your exam responses?');
    if (!isConfirmed) return;
    setSubmittingExam(true);
    try {
      const res = await api.post('/api/exams/', {
        email: candEmail,
        password: candPassword,
        answers: candidateAnswers,
      });
      setExamResultInfo(res.data);
      showToast('Exam submitted successfully.', 'success');
      loadExamData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to submit candidate answers.', 'error');
    } finally {
      setSubmittingExam(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    const isConfirmed = await showConfirm('Are you sure you want to remove this question?');
    if (!isConfirmed) return;
    try {
      await api.delete(`/api/questions/${id}/`);
      showToast('Question deleted.', 'success');
      loadExamData();
    } catch (err) {
      showToast('Failed to delete question.', 'error');
    }
  };

  // Candidate Exam copy credentials helper
  const handleCopyCandidateCredentials = (cand) => {
    const examUrl = `${window.location.origin}/candidate-exam`;
    const text = `Candidate Online Exam Portal Details:
Exam Link: ${examUrl}
Candidate Email: ${cand.email}
Access Passcode: ${cand.password}
Evaluation Subject: ${(cand.role || '').toUpperCase()}`;

    navigator.clipboard.writeText(text);
    showToast(`Exam link & login details for ${cand.username} copied to clipboard!`, 'success');
  };

  return (
    <div>
      <style>{`
        .exam-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid var(--border);
          margin-bottom: 20px;
        }
        .exam-tab {
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 700;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: var(--transition-base);
        }
        .exam-tab.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }
        .exam-question-card {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 15px;
          text-align: left;
        }
        .exam-option-btn {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 14px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 6px;
          margin-top: 8px;
          cursor: pointer;
          font-size: 13px;
          transition: var(--transition-base);
        }
        .exam-option-btn.active {
          background: rgba(37, 99, 235, 0.1);
          border-color: var(--accent-blue);
          color: #2563eb;
          font-weight: 700;
        }
      `}</style>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontFamily: 'var(--font-display)', fontWeight: 800, textAlign: 'left' }}>Exams & Evaluations Portal</h2>

      {/* HR Guidance Banner */}
      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '14px 18px',
        marginBottom: '20px',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#1e40af',
        fontSize: '13.5px'
      }}>
        <div>
          <strong>💡 Candidate Online Exam Instructions:</strong> HR creates candidate accounts under the <i>"Create Exam User"</i> tab. Candidates complete their examination on the dedicated candidate portal (<code>/candidate-exam</code>). Scores update automatically in the <i>"Candidate Score Log"</i>.
        </div>
        <a
          href="/candidate-exam"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#2563eb',
            color: '#ffffff',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '12.5px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            marginLeft: '15px'
          }}
        >
          Open Candidate Exam Link ↗
        </a>
      </div>

      {/* Tabs */}
      <div className="exam-tabs">
        <div className={`exam-tab ${activeTab === 'scores' ? 'active' : ''}`} onClick={() => setActiveTab('scores')}>
          📋 Candidate Score Log
        </div>
        {['HR', 'MD'].includes(role) && (
          <div className={`exam-tab ${activeTab === 'questions' ? 'active' : ''}`} onClick={() => setActiveTab('questions')}>
            ❓ Question Bank Pool
          </div>
        )}
        {['HR', 'MD'].includes(role) && (
          <div className={`exam-tab ${activeTab === 'candidates' ? 'active' : ''}`} onClick={() => setActiveTab('candidates')}>
            👤 Create Exam User
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ padding: '40px 0', color: 'var(--muted)', textAlign: 'center' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading evaluations data...
        </div>
      ) : (
        <div>
          {/* 1. CANDIDATE SCORES VIEW */}
          {activeTab === 'scores' && (
            <div className="dashboard-panel-card">
              <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Completed Exam Sessions</h2>
                <button
                  type="button"
                  className="btn"
                  style={{ background: '#2563eb', padding: '6px 14px', fontSize: '12.5px', borderRadius: '6px' }}
                  onClick={fetchScoresOnly}
                >
                  🔄 Refresh Score Log
                </button>
              </div>
              <div className="panel-body">
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Candidate Profile</th>
                        <th>Language taken</th>
                        <th>Assigned score</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.length > 0 ? (
                        results.map((r) => {
                          const scoreVal = r.score ?? r.score_percentage ?? 0;
                          const isPass = scoreVal >= 60;
                          return (
                            <tr key={r.id}>
                              <td style={{ fontWeight: 600 }}>{r.exam_user_name || 'Candidate User'}</td>
                              <td><span className="badge-capsule info">{(r.exam_language || '').toUpperCase()}</span></td>
                              <td style={{ fontWeight: 700, color: isPass ? 'var(--success)' : 'var(--danger)' }}>
                                {parseFloat(scoreVal).toFixed(1)}%
                              </td>
                              <td>
                                <span className={`badge-capsule ${isPass ? 'success' : 'danger'}`}>
                                  {isPass ? 'Passed' : 'Failed'}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)' }}>No completed evaluations yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. QUESTION BANK VIEW (HR ONLY) */}
          {activeTab === 'questions' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px' }}>
              <div className="dashboard-panel-card" style={{ textAlign: 'left' }}>
                <div className="panel-header">
                  <h2>Exam Questions Feed</h2>
                </div>
                <div className="panel-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {questions.length > 0 ? (
                    questions.map((q) => (
                      <div className="exam-question-card" key={q.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span className="badge-capsule info" style={{ marginBottom: '8px' }}>{(q.language || '').toUpperCase()}</span>
                          <button className="view-btn" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }} onClick={() => handleDeleteQuestion(q.id)}>
                            Delete
                          </button>
                        </div>
                        <p style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{q.question_text}</p>
                        <div style={{ fontSize: '12.5px', marginTop: '6px', color: 'var(--text-secondary)' }}>
                          <div>A. {q.option_a}</div>
                          <div>B. {q.option_b}</div>
                          <div>C. {q.option_c}</div>
                          <div>D. {q.option_d}</div>
                          <div style={{ color: 'var(--success)', fontWeight: '700', marginTop: '4px' }}>Correct Option: {q.correct_option}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--muted)' }}>No questions configured in database.</p>
                  )}
                </div>
              </div>

              <div className="dashboard-panel-card" style={{ height: 'fit-content' }}>
                <div className="panel-header">
                  <h2>Create Question</h2>
                </div>
                <div className="panel-body">
                  <form onSubmit={handleCreateQuestion} style={{ textAlign: 'left' }}>
                    <div className="form-group">
                      <label>Language Module</label>
                      <select value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                        {languages.map((l, i) => (
                          <option key={i} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Question Description</label>
                      <textarea rows="3" value={newQuestionText} onChange={(e) => setNewQuestionText(e.target.value)} required placeholder="Provide query question description..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                    </div>
                    <div className="form-group"><label>Option A</label><input type="text" value={optA} onChange={(e) => setOptA(e.target.value)} required /></div>
                    <div className="form-group"><label>Option B</label><input type="text" value={optB} onChange={(e) => setOptB(e.target.value)} required /></div>
                    <div className="form-group"><label>Option C</label><input type="text" value={optC} onChange={(e) => setOptC(e.target.value)} required /></div>
                    <div className="form-group"><label>Option D</label><input type="text" value={optD} onChange={(e) => setOptD(e.target.value)} required /></div>
                    <div className="form-group">
                      <label>Correct Choice</label>
                      <select value={correctOpt} onChange={(e) => setCorrectOpt(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                        <option value="A">Option A</option>
                        <option value="B">Option B</option>
                        <option value="C">Option C</option>
                        <option value="D">Option D</option>
                      </select>
                    </div>
                    <button type="submit" className="btn" disabled={savingQuestion} style={{ width: '100%', marginTop: '10px' }}>
                      {savingQuestion ? 'Saving question...' : 'Add to Question Bank'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* 3. CREATE CANDIDATE VIEW (HR ONLY) */}
          {activeTab === 'candidates' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px' }}>
              <div className="dashboard-panel-card" style={{ textAlign: 'left' }}>
                <div className="panel-header">
                  <h2>Active Candidate Accounts</h2>
                </div>
                <div className="panel-body">
                  <div className="table-wrap" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Email / Username</th>
                          <th>Phone</th>
                          <th>Language Module</th>
                          <th>Password Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidates.length > 0 ? (
                          candidates.map((c) => (
                            <tr key={c.id}>
                              <td style={{ fontWeight: 600 }}>{c.username}</td>
                              <td>{c.email}</td>
                              <td>{c.phone_no || '--'}</td>
                              <td><span className="badge-capsule info">{(c.role || '').toUpperCase()}</span></td>
                              <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{c.password}</td>
                              <td>
                                <button
                                  type="button"
                                  className="view-btn"
                                  style={{ color: '#2563eb', background: 'rgba(37, 99, 235, 0.1)', fontSize: '12px', padding: '4px 10px', whiteSpace: 'nowrap' }}
                                  onClick={() => handleCopyCandidateCredentials(c)}
                                  title="Copy Candidate Portal Link & Credentials"
                                >
                                  📋 Copy Link & Login Info
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', color: 'var(--muted)' }}>No candidate user accounts registered.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="dashboard-panel-card" style={{ height: 'fit-content' }}>
                <div className="panel-header">
                  <h2>Create Exam User</h2>
                </div>
                <div className="panel-body">
                  <form onSubmit={handleCreateCandidate} style={{ textAlign: 'left' }}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={newCandidate.username} 
                        onChange={(e) => setNewCandidate({ ...newCandidate, username: e.target.value })} 
                        required 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={newCandidate.email} 
                        onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })} 
                        required 
                        placeholder="candidate@domain.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="text" 
                        value={newCandidate.phone_no} 
                        onChange={(e) => setNewCandidate({ ...newCandidate, phone_no: e.target.value })} 
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                    <div className="form-group">
                      <label>Evaluation Language</label>
                      <select 
                        value={newCandidate.language} 
                        onChange={(e) => setNewCandidate({ ...newCandidate, language: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
                      >
                        {languages.map((l, i) => (
                          <option key={i} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Gateway Password / Access Code</label>
                      <input 
                        type="text" 
                        value={newCandidate.password} 
                        onChange={(e) => setNewCandidate({ ...newCandidate, password: e.target.value })} 
                        required 
                        placeholder="e.g. passcode123"
                      />
                    </div>
                    <button type="submit" className="btn" disabled={savingCandidate} style={{ width: '100%', marginTop: '10px' }}>
                      {savingCandidate ? 'Creating account...' : 'Create Candidate Account'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exams;
