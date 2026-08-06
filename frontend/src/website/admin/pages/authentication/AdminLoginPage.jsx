import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import authApi from '../../api/authApi';
import '../../styles/adminTheme.css';

const AdminLoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authApi.login(usernameOrEmail, password);

      if (res.success === true) {
        // Genuine backend success — store user and navigate
        const userData = (res.data && res.data.user) ? res.data.user : { name: usernameOrEmail.split('@')[0] || 'Administrator', email: usernameOrEmail, role: 'Super Admin' };
        localStorage.setItem('website_admin_user', JSON.stringify(userData));
        loginAdmin(userData);
        navigate('/admin/website/dashboard');
      } else {
        // Wrong credentials — show error, do NOT login
        setError(res.error || 'Invalid email/username or password. Please try again.');
      }
    } catch (err) {
      // Network / server error — show error, do NOT login
      setError('Unable to connect to the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F6F8FC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '36px',
          boxShadow: '0 12px 32px rgba(15, 43, 70, 0.1)',
          border: '1px solid #E2E8F0'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #0F2B46, #1E88E5)',
              borderRadius: '16px',
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 6px 16px rgba(30, 136, 229, 0.3)'
            }}
          >
            Y
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F2B46', margin: '0 0 6px 0' }}>
            Website Admin Portal
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Sign in to manage company CMS & dynamic content
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#EF4444',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '16px'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Email or Username</label>
            <input
              type="text"
              className="admin-form-control"
              required
              placeholder="admin@ygr.com or admin"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              className="admin-form-control"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: '100%', marginTop: '8px', padding: '12px' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to CMS'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
