import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CandidateExam = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [sessionData, setSessionData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const candidateToken = sessionStorage.getItem('candidateToken');
    if (!candidateToken) {
      navigate('/internships/candidate-login');
      return;
    }
    fetchExamData();
  }, [token, navigate]);

  const fetchExamData = async () => {
    try {
      const response = await fetch(`/api/portal/admin/internships/exams/${token}/details/`);
      if (!response.ok) {
        throw new Error('Failed to load exam data. Invalid token or exam already completed.');
      }
      const data = await response.json();
      
      const candidateToken = sessionStorage.getItem('candidateToken');
      if (data.registration_id && data.registration_id !== candidateToken) {
        throw new Error('Unauthorized access. This exam belongs to another candidate.');
      }
      
      setSessionData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to submit? You cannot change your answers after submission.')) return;
    
    setSubmitting(true);
    try {
      const response = await fetch(`/api/portal/admin/internships/exams/${token}/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming CSRF token is handled or not strictly required for this DRF action if AllowAny, but let's include standard headers if needed
        },
        body: JSON.stringify({ answers })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit exam');
      }
      
      const result = await response.json();
      alert(`Exam submitted successfully! Score: ${result.score}`);
      // Navigate back to some dashboard or success page. Registration ID isn't directly available here, so redirect to home or login
      navigate('/internships'); 
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  
  if (sessionData?.status === 'Completed') {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-success"><i className="fa-solid fa-check-circle"></i> Exam Completed</h2>
        <p>You have already submitted this exam.</p>
        <button className="btn btn-primary" onClick={() => navigate('/internships')}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Internship Technical Assessment</h4>
          <span><i className="fa-regular fa-clock me-2"></i> Duration: {sessionData.duration_minutes} mins</span>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {sessionData.questions.map((q, index) => (
              <div key={q.id} className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-dark mb-3">
                    {index + 1}. {q.question_text}
                  </h5>
                  <div className="d-flex flex-column gap-2">
                    {['a', 'b', 'c', 'd'].map(opt => (
                      <div className="form-check" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question_${q.id}`}
                          id={`q_${q.id}_${opt}`}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleOptionChange(q.id, opt)}
                        />
                        <label className="form-check-label" htmlFor={`q_${q.id}_${opt}`}>
                          {q[`option_${opt}`]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success btn-lg px-5" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateExam;
