import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './CandidateDashboard.css';

const getCsrfToken = () => {
  const match = document.cookie.match(/(?:^|; )\s*csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
};

const CandidateLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prefilledId = location.state?.registrationId || localStorage.getItem('candidateToken') || '';
  const [formData, setFormData] = useState({ registration_id: prefilledId, password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const cleanRegId = (formData.registration_id || '').trim();
    const cleanPassword = (formData.password || '').trim();

    if (!cleanRegId || !cleanPassword) {
      setError('Please enter both your Registration ID (or Email) and Password.');
      setIsLoading(false);
      return;
    }

    try {
      const csrfToken = getCsrfToken();
      const headers = { 'Content-Type': 'application/json' };
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
      }

      const response = await fetch('/api/portal/internships/register/candidate_login/', {
        method: 'POST',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify({
          registration_id: cleanRegId,
          password: cleanPassword
        })
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        sessionStorage.setItem('candidateToken', data.registration_id);
        localStorage.setItem('candidateToken', data.registration_id);
        navigate(`/internships/candidate-dashboard/${data.registration_id}`);
      } else {
        setError(data.error || data.detail || data.message || 'Invalid Registration ID or Password.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cd-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="cd-container" style={{ maxWidth: '480px' }}>
        <div className="cd-card" style={{ padding: '40px 36px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="cd-pill-badge" style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#1E3A8A', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
              <span className="dot"></span>
              Candidate Portal
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A', margin: '8px 0 6px 0' }}>
              Candidate Login
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>
              Enter your Registration ID (or registered Email) and Password sent to your email.
            </p>
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '20px', fontWeight: 600 }}>
              <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Registration ID or Email
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  name="registration_id" 
                  placeholder="e.g. YGR-INT-A1B2C3D4 or candidate@email.com"
                  value={formData.registration_id} 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#0F172A',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563EB'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '26px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password from email"
                value={formData.password} 
                onChange={handleChange} 
                required 
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563EB'}
                onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
              />
            </div>

            <button 
              type="submit" 
              className="cd-btn-primary" 
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Authenticating...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i> Access Dashboard
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F1F5F9', textAlign: 'center', fontSize: '0.85rem' }}>
            <span style={{ color: '#64748B' }}>New Candidate? </span>
            <Link to="/register-internship" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
              Register for Internship &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin;
