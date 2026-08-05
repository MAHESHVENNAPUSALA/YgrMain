import React, { useState } from 'react';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const ClientCreate = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('Active');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/clients/', {
        name,
        business_name: businessName,
        gst_number: gstNumber,
        email,
        phone,
        address,
        country,
        state,
        city,
        contact_person: contactPerson,
        website,
        status,
      });
      showToast('Client registered successfully.', 'success');
      handleReset();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to save client profile.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setBusinessName('');
    setGstNumber('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCountry('India');
    setState('');
    setCity('');
    setContactPerson('');
    setWebsite('');
    setStatus('Active');
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
          max-width: 900px;
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
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          text-align: left;
        }
        @media (max-width: 768px) {
          .premium-form {
            grid-template-columns: 1fr;
          }
        }
        .premium-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .premium-form-group.full-width {
          grid-column: span 2;
        }
        @media (max-width: 768px) {
          .premium-form-group.full-width {
            grid-column: span 1;
          }
        }
        .premium-form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #475569;
        }
        .premium-form-group input, 
        .premium-form-group select, 
        .premium-form-group textarea {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.92rem;
          color: #0f172a;
          transition: all 0.2s ease-in-out;
        }
        .premium-form-group input:focus, 
        .premium-form-group select:focus, 
        .premium-form-group textarea:focus {
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
        .premium-btn-secondary {
          padding: 14px 28px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background-color: #ffffff;
          color: #475569;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .premium-btn-secondary:hover {
          background-color: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }
      `}</style>

      <div className="premium-card">
        <h2 className="premium-title">Register New Corporate Client</h2>
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="premium-form-group">
            <label>Client Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. John Doe" />
          </div>
          <div className="premium-form-group">
            <label>Company / Business Name</label>
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Acme Corporation" />
          </div>
          <div className="premium-form-group">
            <label>GST Number</label>
            <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="e.g. 27AAAAA1111A1Z1" />
          </div>
          <div className="premium-form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. client@company.com" />
          </div>
          <div className="premium-form-group">
            <label>Phone Number</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="e.g. +91 98765 43210" />
          </div>
          <div className="premium-form-group">
            <label>Contact Person</label>
            <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="e.g. Project Manager" />
          </div>
          <div className="premium-form-group full-width">
            <label>Address Details</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} required rows="3" placeholder="Enter physical street address..." />
          </div>
          <div className="premium-form-group">
            <label>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Mumbai" />
          </div>
          <div className="premium-form-group">
            <label>State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Maharashtra" />
          </div>
          <div className="premium-form-group">
            <label>Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. India" />
          </div>
          <div className="premium-form-group">
            <label>Website URL</label>
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="e.g. www.clientwebsite.com" />
          </div>
          <div className="premium-form-group full-width">
            <label>Account Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="premium-form-group full-width" style={{ display: 'flex', flexDirection: 'row', gap: '15px', marginTop: '10px' }}>
            <button type="submit" className="premium-btn-primary" disabled={submitting} style={{ flex: 1 }}>
              {submitting ? 'Registering...' : 'Save Client Profile'}
            </button>
            <button type="button" className="premium-btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
              Reset Fields
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientCreate;
