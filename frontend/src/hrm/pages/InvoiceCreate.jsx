import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const InvoiceCreate = () => {
  const { showToast } = useToast();
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [selectedClient, setSelectedClient] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');
  const [paidDate, setPaidDate] = useState('');
  const [discountPercent, setDiscountPercent] = useState('0');
  const [gstPercent, setGstPercent] = useState('18');
  const [invoiceNote, setInvoiceNote] = useState('');
  const [selectedItems, setSelectedItems] = useState([{ service: '', amount: '', discount_percent: '0' }]);
  const [submitting, setSubmitting] = useState(false);

  const loadResources = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/invoicing-resources/');
      setClients(res.data.clients || []);
      setServices(res.data.services || []);
    } catch (err) {
      console.error('Error loading invoicing resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleAddField = () => {
    setSelectedItems([...selectedItems, { service: '', amount: '', discount_percent: '0' }]);
  };

  const handleRemoveField = (index) => {
    const values = [...selectedItems];
    values.splice(index, 1);
    setSelectedItems(values);
  };

  const handleItemChange = (index, field, value) => {
    const values = [...selectedItems];
    values[index][field] = value;
    
    if (field === 'service') {
      const s = services.find(x => x.id === Number(value));
      if (s) {
        values[index]['amount'] = s.amount;
      }
    }
    setSelectedItems(values);
  };

  const handleAction = async (actionType) => {
    if (!selectedClient) {
      showToast('Please choose a client.', 'warning');
      return;
    }
    const validItems = selectedItems.filter(item => item.service !== '');
    if (validItems.length === 0) {
      showToast('Please add at least one valid service item.', 'warning');
      return;
    }

    if (actionType === 'preview') {
      showToast('Generating preview calculations. Verify Grand Total in table below.', 'info');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        client: selectedClient,
        project,
        discount_percent: discountPercent,
        gst_percent: gstPercent,
        note: invoiceNote,
        status: actionType === 'draft' ? 'Pending' : status,
        due_date: dueDate || null,
        paid_date: paidDate || null,
        items: validItems,
      };

      await api.post('/api/invoices/', payload);
      showToast(actionType === 'draft' ? 'Invoice draft saved successfully.' : 'Invoice generated successfully.', 'success');
      
      if (actionType === 'pdf') {
        window.print();
      }

      // Reset Form
      setSelectedClient('');
      setProject('');
      setStatus('Pending');
      setDueDate('');
      setPaidDate('');
      setDiscountPercent('0');
      setGstPercent('18');
      setInvoiceNote('');
      setSelectedItems([{ service: '', amount: '', discount_percent: '0' }]);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to process invoice.', 'error');
    } finally {
      setSubmitting(false);
    }
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
          display: flex;
          flex-direction: column;
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
      `}</style>

      <div className="premium-card">
        <h2 className="premium-title">Compile Client Invoice</h2>
        {loading ? <div>Loading resources...</div> : (
          <form onSubmit={(e) => e.preventDefault()} className="premium-form">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div className="premium-form-group">
                <label>Client Profile</label>
                <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required>
                  <option value="">Choose Client...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.business_name || 'N/A'})</option>
                  ))}
                </select>
              </div>
              <div className="premium-form-group">
                <label>Project Name</label>
                <input type="text" value={project} onChange={(e) => setProject(e.target.value)} placeholder="e.g. Website Redesign" />
              </div>
              <div className="premium-form-group">
                <label>GST Rate (%)</label>
                <input type="number" value={gstPercent} onChange={(e) => setGstPercent(e.target.value)} min="0" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div className="premium-form-group">
                <label>Due Date</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div className="premium-form-group">
                <label>Paid Date</label>
                <input type="date" value={paidDate} onChange={(e) => setPaidDate(e.target.value)} />
              </div>
              <div className="premium-form-group">
                <label>Invoice Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="premium-form-group">
                <label>Discount (%)</label>
                <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} min="0" max="100" />
              </div>
            </div>

            <h4 style={{ margin: '20px 0 10px 0', borderBottom: '1px solid var(--border)', paddingBottom: '6px', color: 'var(--primary-color)' }}>Line Items Settings</h4>
            {selectedItems.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '15px', alignItems: 'center' }}>
                <div className="premium-form-group" style={{ marginBottom: 0 }}>
                  <select value={item.service} onChange={(e) => handleItemChange(idx, 'service', e.target.value)} required>
                    <option value="">Choose Service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} (Base: ₹{s.amount})</option>
                    ))}
                  </select>
                </div>
                <div className="premium-form-group" style={{ marginBottom: 0 }}>
                  <input type="number" value={item.amount} onChange={(e) => handleItemChange(idx, 'amount', e.target.value)} placeholder="Price Override" required />
                </div>
                <div className="premium-form-group" style={{ marginBottom: 0 }}>
                  <input type="number" value={item.discount_percent} onChange={(e) => handleItemChange(idx, 'discount_percent', e.target.value)} placeholder="Disc %" />
                </div>
                <button type="button" className="btn" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '12px 14px', borderRadius: '10px', border: 'none' }} onClick={() => handleRemoveField(idx)}>
                  Remove
                </button>
              </div>
            ))}
            
            <button type="button" className="btn" style={{ background: '#3b82f6', color: '#fff', width: '200px', padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 'bold' }} onClick={handleAddField}>
              + Add Item Row
            </button>

            <div className="premium-form-group">
              <label>Additional Notes / Payment Terms</label>
              <textarea rows="3" value={invoiceNote} onChange={(e) => setInvoiceNote(e.target.value)} placeholder="Terms of payment details..." />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button type="button" className="premium-btn-primary" onClick={() => handleAction('generate')} disabled={submitting} style={{ flex: 1 }}>
                Generate Invoice
              </button>
              <button type="button" className="premium-btn-primary" onClick={() => handleAction('preview')} style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                Preview
              </button>
              <button type="button" className="premium-btn-primary" onClick={() => handleAction('draft')} style={{ flex: 1, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                Save Draft
              </button>
              <button type="button" className="premium-btn-primary" onClick={() => handleAction('pdf')} style={{ flex: 1, background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' }}>
                Download PDF
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InvoiceCreate;
