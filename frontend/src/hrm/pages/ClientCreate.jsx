import React, { useState } from 'react';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const ClientCreate = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/clients/', {
        name,
        email,
        phone,
        password: password || undefined,
        // Send default values for required backend fields to prevent errors
        business_name: '',
        gst_number: '',
        address: 'N/A', // Address is strictly required by the backend serializer
        country: 'India',
        state: '',
        city: '',
        contact_person: '',
        website: '',
        status: 'Active',
      });
      showToast('Client registered successfully.', 'success');
      handleReset();
    } catch (err) {
      console.error("Client Registration Error:", err.response?.data);
      const errorMsg = err.response?.data?.detail || 
                       (err.response?.data ? JSON.stringify(err.response.data) : 'Failed to save client profile.');
      showToast(errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

  return (
    <div className="attendance-workspace-container" style={{ padding: '20px', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        .premium-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          padding: 30px;
          max-width: 600px;
          margin: 0 auto;
        }
        .premium-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: #0f172a;
          margin-bottom: 25px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 12px;
          text-align: left;
        }
        .premium-form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          text-align: left;
        }
        .premium-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .premium-form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #475569;
        }
        .premium-form-group input {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.92rem;
          color: #0f172a;
          transition: all 0.2s ease-in-out;
        }
        .premium-form-group input:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .premium-btn-primary {
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
        }
        .premium-btn-primary:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      <div className="premium-card">
        <h2 className="premium-title">Register New Client</h2>
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="premium-form-group">
            <label>Client Name (Username)</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. John Doe" />
          </div>
          
          <div className="premium-form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="e.g. client@company.com" />
          </div>
          
          <div className="premium-form-group">
            <label>Phone Number</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="e.g. +91 98765 43210" />
          </div>

          <div className="premium-form-group">
            <label>Portal Login Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter a secure password for the client" />
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <button type="submit" className="premium-btn-primary" disabled={submitting} style={{ width: '100%' }}>
              {submitting ? 'Registering...' : 'Create Client Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientCreate;
