import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateLogin = () => {
  const [formData, setFormData] = useState({ registration_id: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/portal/internships/register/candidate_login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem('candidateToken', data.registration_id);
        navigate(`/internships/candidate-dashboard/${data.registration_id}`);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4 text-primary">Candidate Login</h3>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Registration ID</label>
            <input 
              type="text" 
              className="form-control" 
              name="registration_id" 
              placeholder="YGR-INT-..."
              value={formData.registration_id} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 py-2" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateLogin;
