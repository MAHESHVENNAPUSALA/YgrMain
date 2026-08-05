import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';

const ServiceCreate = () => {
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [serviceCode, setServiceCode] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [gstPercent, setGstPercent] = useState('18');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Active');
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/services/');
      setServices(res.data);
    } catch (err) {
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name,
      service_code: serviceCode,
      department,
      description,
      gst_percent: parseFloat(gstPercent),
      amount: parseFloat(amount),
      status,
    };
    try {
      if (editingId) {
        await api.put(`/api/services/${editingId}/`, payload);
        showToast('Service updated successfully.', 'success');
      } else {
        await api.post('/api/services/', payload);
        showToast('Service registered successfully.', 'success');
      }
      handleReset();
      loadServices();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to save service.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setName(s.name || '');
    setServiceCode(s.service_code || '');
    setDepartment(s.department || '');
    setDescription(s.description || '');
    setGstPercent(String(s.gst_percent || '18'));
    setAmount(String(s.amount || ''));
    setStatus(s.status || 'Active');
  };

  const handleDelete = async (id) => {
    const isConfirmed = await showConfirm('Are you sure you want to delete this service?');
    if (!isConfirmed) return;
    try {
      await api.delete(`/api/services/${id}/`);
      showToast('Service deleted successfully.', 'success');
      loadServices();
    } catch (err) {
      showToast('Failed to delete service.', 'error');
    }
  };

  const handleReset = () => {
    setEditingId(null);
    setName('');
    setServiceCode('');
    setDepartment('');
    setDescription('');
    setGstPercent('18');
    setAmount('');
    setStatus('Active');
  };

  return (
    <div className="attendance-workspace-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start', padding: '20px', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        .premium-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          padding: 24px;
        }
        .premium-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          color: #0f172a;
          margin-bottom: 20px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 12px;
          text-align: left;
        }
        .premium-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
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
          width: 100%;
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
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
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
          padding: 12px 24px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background-color: #ffffff;
          color: #475569;
          font-weight: 700;
          font-size: 0.95rem;
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
        <h2 className="premium-title">Active Company Services</h2>
        {loading ? <div>Loading services...</div> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Service Name</th>
                  <th>Price</th>
                  <th>GST</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.service_code || 'N/A'}</strong></td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{s.department || 'N/A'}</div>
                    </td>
                    <td>₹{parseFloat(s.amount || 0).toFixed(2)}</td>
                    <td>{s.gst_percent}%</td>
                    <td><span className={`badge-capsule ${s.status?.toLowerCase()}`}>{s.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleEdit(s)}>Edit</button>
                        <button className="btn" style={{ padding: '4px 8px', fontSize: '12px', background: '#ef4444' }} onClick={() => handleDelete(s.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="premium-card" style={{ position: 'sticky', top: '20px' }}>
        <h2 className="premium-title">{editingId ? 'Edit Service Details' : 'Register Company Service'}</h2>
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="premium-form-group">
            <label>Service Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Cloud Consultation" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="premium-form-group">
              <label>Service Code</label>
              <input type="text" value={serviceCode} onChange={(e) => setServiceCode(e.target.value)} placeholder="e.g. SRV-001" />
            </div>
            <div className="premium-form-group">
              <label>Department</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. IT Department" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="premium-form-group">
              <label>Price (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder="e.g. 5000" />
            </div>
            <div className="premium-form-group">
              <label>GST Rate (%)</label>
              <input type="number" value={gstPercent} onChange={(e) => setGstPercent(e.target.value)} required placeholder="18" />
            </div>
          </div>
          <div className="premium-form-group">
            <label>Service Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="Enter brief service deliverables..." />
          </div>
          <div className="premium-form-group">
            <label>Service Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" className="premium-btn-primary" disabled={submitting} style={{ flex: 1 }}>
              {editingId ? 'Update Service' : 'Add Service'}
            </button>
            {editingId && (
              <button type="button" className="premium-btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCreate;
