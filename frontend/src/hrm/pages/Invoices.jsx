import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';

const Invoices = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const role = user?.role;

  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Modal detail state
  const [selectedInvoiceDetail, setSelectedInvoiceDetail] = useState(null);

  const loadInvoiceData = async () => {
    setLoading(true);
    try {
      const invoicesRes = await api.get('/api/invoices/');
      setInvoices(invoicesRes.data || []);
      
      const resourceRes = await api.get('/api/invoicing-resources/');
      setClients(resourceRes.data.clients || []);
    } catch (err) {
      console.error('Error loading invoicing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoiceData();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = await showConfirm('Are you sure you want to delete this invoice?');
    if (!isConfirmed) return;
    try {
      await api.delete(`/api/invoices/${id}/`);
      showToast('Invoice deleted successfully.', 'success');
      loadInvoiceData();
    } catch (err) {
      showToast('Failed to delete invoice.', 'error');
    }
  };

  const handleSendEmail = (inv) => {
    showToast(`Invoice email notification queued for client: ${inv.client_name}`, 'info');
  };

  const handleDownloadPDF = (inv) => {
    showToast(`Downloading PDF for invoice: ${inv.invoice_number}`, 'info');
    window.print();
  };

  // Filter calculation
  const filteredInvoices = invoices.filter(inv => {
    const matchesClient = selectedClient ? String(inv.client) === selectedClient : true;
    const matchesStatus = selectedStatus ? inv.status?.toLowerCase() === selectedStatus.toLowerCase() : true;
    
    const createdDateObj = new Date(inv.created_at);
    const matchesMonth = selectedMonth ? (createdDateObj.getMonth() + 1) === Number(selectedMonth) : true;
    const matchesYear = selectedYear ? createdDateObj.getFullYear() === Number(selectedYear) : true;

    return matchesClient && matchesStatus && matchesMonth && matchesYear;
  });

  return (
    <div className="attendance-workspace-container">
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Invoices Portal</h2>

      <div className="dashboard-panel-card">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <h2>Generated Corporate Invoices</h2>
          <div className="att-grid-filters">
            <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
              <option value="">All Clients</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
            </select>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">Month</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">Year</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
        <div className="panel-body">
          {loading ? <div>Loading invoicing records...</div> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Client</th>
                    <th>Project</th>
                    <th>Amount</th>
                    <th>GST</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Due Date</th>
                    <th>Paid Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((inv) => (
                      <tr key={inv.id}>
                        <td style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{inv.invoice_number}</td>
                        <td style={{ fontWeight: 600 }}>{inv.client_name}</td>
                        <td>{inv.project || 'N/A'}</td>
                        <td style={{ fontWeight: 700, color: 'var(--success)' }}>₹{parseFloat(inv.grand_total || 0).toFixed(2)}</td>
                        <td>₹{parseFloat(inv.gst || 0).toFixed(2)} ({inv.gst_percent}%)</td>
                        <td><span className={`badge-capsule ${inv.status?.toLowerCase()}`}>{inv.status}</span></td>
                        <td>{new Date(inv.created_at).toLocaleDateString()}</td>
                        <td>{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : 'N/A'}</td>
                        <td>{inv.paid_date ? new Date(inv.paid_date).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => setSelectedInvoiceDetail(inv)}>View</button>
                            <button className="btn" style={{ padding: '4px 8px', fontSize: '11px', background: '#3b82f6' }} onClick={() => handleDownloadPDF(inv)}>PDF</button>
                            <button className="btn" style={{ padding: '4px 8px', fontSize: '11px', background: '#10b981' }} onClick={() => handleSendEmail(inv)}>Email</button>
                            {['HR', 'MD'].includes(role) && (
                              <button className="btn" style={{ padding: '4px 8px', fontSize: '11px', background: '#ef4444' }} onClick={() => handleDelete(inv.id)}>Delete</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', color: 'var(--muted)' }}>No invoices found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedInvoiceDetail && (
        <div className="modal-overlay" onClick={() => setSelectedInvoiceDetail(null)}>
          <div className="modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Invoice Summary ( #{selectedInvoiceDetail.invoice_number} )</h3>
              <button className="modal-close" onClick={() => setSelectedInvoiceDetail(null)}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'left', fontSize: '13px' }}>
              <p><b>Client:</b> {selectedInvoiceDetail.client_name}</p>
              <p><b>Project:</b> {selectedInvoiceDetail.project || 'N/A'}</p>
              <p><b>Status:</b> {selectedInvoiceDetail.status}</p>
              <p><b>Date Generated:</b> {new Date(selectedInvoiceDetail.created_at).toLocaleDateString()}</p>
              <p><b>Due Date:</b> {selectedInvoiceDetail.due_date ? new Date(selectedInvoiceDetail.due_date).toLocaleDateString() : 'N/A'}</p>
              
              <h4 style={{ color: 'var(--accent-blue)', margin: '15px 0 8px 0' }}>Line Items</h4>
              <div style={{ maxHeight: '150px', overflowY: 'auto', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                {selectedInvoiceDetail.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #f1f5f9' }}>
                    <span>{item.service_name} (Disc: {item.discount_percent}%)</span>
                    <strong>₹{parseFloat(item.amount || 0).toFixed(2)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
                  <span>Subtotal</span><span>₹{parseFloat(selectedInvoiceDetail.subtotal || 0).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
                  <span>Discount ({selectedInvoiceDetail.discount_percent}%)</span><span>- ₹{parseFloat(selectedInvoiceDetail.discount_amount || 0).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
                  <span>GST ({selectedInvoiceDetail.gst_percent}%)</span><span>₹{parseFloat(selectedInvoiceDetail.gst || 0).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px', color: 'var(--success)', fontSize: '15px' }}>
                  <span>Grand Total</span><span>₹{parseFloat(selectedInvoiceDetail.grand_total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
