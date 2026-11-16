import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import documentsApi from '../../services/api/documents';
import api from '../../services/api';
import SendDocumentEmailModal from '../components/SendDocumentEmailModal';

const DOCUMENT_TYPES = [
  { value: 'all', label: 'All Document Types' },
  { value: 'offer_letter', label: 'Offer Letter' },
  { value: 'joining_letter', label: 'Joining Letter' },
  { value: 'appointment_letter', label: 'Appointment Letter' },
  { value: 'relieving_letter', label: 'Relieving Letter' },
  { value: 'other', label: 'Other Document' },
];

const EmployeeDocuments = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const navigate = useNavigate();
  const role = user?.role;
  const isHrOrMd = ['HR', 'MD'].includes(role);

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Issue New Document Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [createForm, setCreateForm] = useState({
    employee: '',
    document_type: 'offer_letter',
    title: '',
    reference_number: '',
    issue_date: new Date().toISOString().split('T')[0],
    status: 'Approved',
    file: null,
  });
  const [creating, setCreating] = useState(false);

  // Email Confirmation Modal State
  const [emailModalData, setEmailModalData] = useState(null);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const res = await documentsApi.getDocuments();
      setDocuments(res.data || []);
    } catch (err) {
      console.error('Error loading documents:', err);
      showToast('Failed to load employee documents.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    if (!isHrOrMd) return;
    try {
      const res = await api.get('/api/users/', { params: { scope: 'directory' } });
      setEmployees(res.data || []);
    } catch (err) {
      console.error('Error loading employees:', err);
    }
  };

  useEffect(() => {
    loadDocuments();
    if (isHrOrMd) {
      loadEmployees();
    }
  }, [isHrOrMd]);

  // Open the Send Email Confirmation Modal
  const handleOpenEmailModal = (doc) => {
    setEmailModalData({
      id: doc.id,
      title: doc.title,
      documentType: doc.document_type,
      recipientName: doc.employee_name || 'Staff Member',
      recipientEmail: doc.employee_email,
      empId: doc.employee_emp_id,
      emailStatus: doc.email_status,
      emailSentAt: doc.email_sent_at,
      emailError: doc.email_error,
      sendFn: (id, opts) => documentsApi.sendDocumentEmail(id, opts),
    });
  };

  const handleEmailSuccess = (res) => {
    showToast(res.detail || 'Document email queued for delivery.', 'success');
    loadDocuments();
  };

  const handleDelete = async (docId) => {
    const ok = await showConfirm('Are you sure you want to delete this document record?');
    if (!ok) return;
    try {
      await documentsApi.deleteDocument(docId);
      showToast('Document deleted.', 'success');
      loadDocuments();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to delete document.', 'error');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.employee) {
      showToast('Please select an employee.', 'warning');
      return;
    }
    setCreating(true);
    try {
      const fd = new FormData();
      fd.append('employee', createForm.employee);
      fd.append('document_type', createForm.document_type);
      fd.append('title', createForm.title || `${createForm.document_type.replace('_', ' ').toUpperCase()}`);
      fd.append('reference_number', createForm.reference_number);
      fd.append('issue_date', createForm.issue_date);
      fd.append('status', createForm.status);
      if (createForm.file) {
        fd.append('file', createForm.file);
      }

      await documentsApi.createDocument(fd);
      showToast('Document record created successfully.', 'success');
      setShowCreateModal(false);
      setCreateForm({
        employee: '',
        document_type: 'offer_letter',
        title: '',
        reference_number: '',
        issue_date: new Date().toISOString().split('T')[0],
        status: 'Approved',
        file: null,
      });
      loadDocuments();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to create document record.', 'error');
    } finally {
      setCreating(false);
    }
  };

  // Filtered list
  const filteredDocs = documents.filter((doc) => {
    const matchesType = typeFilter === 'all' || doc.document_type === typeFilter;
    const term = search.toLowerCase();
    const matchesSearch =
      (doc.title || '').toLowerCase().includes(term) ||
      (doc.employee_name || '').toLowerCase().includes(term) ||
      (doc.employee_emp_id || '').toLowerCase().includes(term) ||
      (doc.reference_number || '').toLowerCase().includes(term);
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: 'var(--primary-color)', fontWeight: 800, fontSize: '1.6rem' }}>
            {isHrOrMd ? 'Employee Documents & Letters' : 'My Official Documents'}
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            {isHrOrMd
              ? 'Manage and dispatch official Offer Letters, Joining Letters, Relieving Letters & Certificates via company email.'
              : 'View and download your official company letters and certificates.'}
          </p>
        </div>

        {isHrOrMd && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => navigate('/offer-letters')}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                border: '1.5px solid #2563eb',
                background: '#eff6ff',
                color: '#1d4ed8',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fa-solid fa-envelope-open-text"></i> Offer Letters
            </button>
            <button
              type="button"
              onClick={() => navigate('/joining-letters')}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                border: '1.5px solid #0f766e',
                background: '#f0fdfa',
                color: '#0f766e',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fa-solid fa-file-signature"></i> Joining Letters
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.25)',
              }}
            >
              <i className="fa-solid fa-file-circle-plus"></i> Upload Document
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid #e2e8f0',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            placeholder="Search by title, employee name, ID, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {DOCUMENT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTypeFilter(t.value)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: typeFilter === t.value ? '#2563eb' : '#cbd5e1',
                background: typeFilter === t.value ? '#eff6ff' : '#ffffff',
                color: typeFilter === t.value ? '#1d4ed8' : '#64748b',
                fontWeight: typeFilter === t.value ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 18px' }}>Staff Member</th>
                <th style={{ padding: '14px 18px' }}>Document Type</th>
                <th style={{ padding: '14px 18px' }}>Document Title</th>
                <th style={{ padding: '14px 18px' }}>Reference & Date</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                {isHrOrMd && <th style={{ padding: '14px 18px' }}>Email Delivery</th>}
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={isHrOrMd ? 7 : 6} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid #cbd5e1', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '8px' }} />
                    <div>Loading documents...</div>
                  </td>
                </tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={isHrOrMd ? 7 : 6} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <i className="fa-solid fa-folder-open" style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }}></i>
                    No documents found.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  const isSent = doc.email_status === 'Sent';
                  const isFailed = doc.email_status === 'Failed';
                  const isSending = doc.email_status === 'Sending';

                  return (
                    <tr
                      key={doc.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background 0.1s',
                      }}
                    >
                      {/* Employee */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{doc.employee_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {doc.employee_emp_id ? `${doc.employee_emp_id} • ` : ''}
                          <span style={{ color: doc.employee_email ? '#166534' : '#dc2626' }}>
                            {doc.employee_email || 'No email on record'}
                          </span>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td style={{ padding: '14px 18px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background:
                              doc.document_type === 'offer_letter' ? '#e0e7ff' :
                              doc.document_type === 'joining_letter' ? '#dcfce7' :
                              doc.document_type === 'relieving_letter' ? '#fee2e2' : '#f1f5f9',
                            color:
                              doc.document_type === 'offer_letter' ? '#3730a3' :
                              doc.document_type === 'joining_letter' ? '#166534' :
                              doc.document_type === 'relieving_letter' ? '#991b1b' : '#334155',
                          }}
                        >
                          {doc.document_type_display}
                        </span>
                      </td>

                      {/* Title */}
                      <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1e293b' }}>
                        {doc.title}
                      </td>

                      {/* Reference & Date */}
                      <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.8rem' }}>
                        <div>{doc.reference_number || '—'}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{doc.issue_date || 'No date'}</div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 18px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: doc.status === 'Approved' || doc.status === 'Issued' ? '#dcfce7' : '#fef3c7',
                            color: doc.status === 'Approved' || doc.status === 'Issued' ? '#166534' : '#92400e',
                          }}
                        >
                          {doc.status}
                        </span>
                      </td>

                      {/* Email Delivery */}
                      {isHrOrMd && (
                        <td style={{ padding: '14px 18px' }}>
                          <span
                            title={doc.email_error || (doc.email_sent_at ? `Sent on ${new Date(doc.email_sent_at).toLocaleString()}` : '')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              background: isSent ? '#dcfce7' : isFailed ? '#fee2e2' : isSending ? '#fef3c7' : '#f1f5f9',
                              color: isSent ? '#166534' : isFailed ? '#991b1b' : isSending ? '#92400e' : '#64748b',
                            }}
                          >
                            {isSent ? '✓ Emailed' : isFailed ? '⚠ Failed' : isSending ? '↻ Sending' : '• Not Sent'}
                          </span>
                        </td>
                      )}

                      {/* Actions */}
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                          {/* Download PDF button */}
                          {doc.file_url ? (
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                background: '#f1f5f9',
                                color: '#334155',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: '0.78rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              ⬇ View PDF
                            </a>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No PDF</span>
                          )}

                          {/* Send / Resend Email Button for HR/MD */}
                          {isHrOrMd && (
                            <button
                              type="button"
                              onClick={() => handleOpenEmailModal(doc)}
                              disabled={isSending}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: isFailed
                                  ? '#dc2626'
                                  : isSent
                                  ? '#f59e0b'
                                  : '#2563eb',
                                color: '#ffffff',
                                fontWeight: 600,
                                fontSize: '0.78rem',
                                cursor: isSending ? 'not-allowed' : 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.15s',
                              }}
                              title={
                                isSent
                                  ? 'Click to resend to employee email'
                                  : isFailed
                                  ? 'Click to retry email delivery'
                                  : 'Send official document email'
                              }
                            >
                              {isSending ? (
                                <>↻ Sending...</>
                              ) : isFailed ? (
                                <>⚠ Retry Email</>
                              ) : isSent ? (
                                <>↻ Resend Email</>
                              ) : (
                                <>✉ Send Email</>
                              )}
                            </button>
                          )}

                          {/* Delete Document for HR/MD */}
                          {isHrOrMd && (
                            <button
                              type="button"
                              onClick={() => handleDelete(doc.id)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #fee2e2',
                                background: '#fff',
                                color: '#ef4444',
                                fontWeight: 600,
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                              }}
                              title="Delete record"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Issue New Document */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !creating) setShowCreateModal(false);
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '560px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Issue New Employee Document</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Employee Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Select Employee *
                </label>
                <select
                  required
                  value={createForm.employee}
                  onChange={(e) => {
                    const emp = employees.find((x) => String(x.id) === e.target.value);
                    const docLabel = DOCUMENT_TYPES.find((d) => d.value === createForm.document_type)?.label || 'Document';
                    setCreateForm({
                      ...createForm,
                      employee: e.target.value,
                      title: emp ? `${docLabel} — ${emp.name || emp.username}` : createForm.title,
                    });
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name || emp.username} ({emp.emp_id || 'ID N/A'}) — {emp.email || 'No Email'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Document Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Document Type *
                  </label>
                  <select
                    value={createForm.document_type}
                    onChange={(e) => {
                      const emp = employees.find((x) => String(x.id) === createForm.employee);
                      const docLabel = DOCUMENT_TYPES.find((d) => d.value === e.target.value)?.label || 'Document';
                      setCreateForm({
                        ...createForm,
                        document_type: e.target.value,
                        title: emp ? `${docLabel} — ${emp.name || emp.username}` : createForm.title,
                      });
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  >
                    <option value="offer_letter">Offer Letter</option>
                    <option value="joining_letter">Joining Letter</option>
                    <option value="appointment_letter">Appointment Letter</option>
                    <option value="relieving_letter">Relieving Letter</option>
                    <option value="other">Other Document</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Issue Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={createForm.issue_date}
                    onChange={(e) => setCreateForm({ ...createForm, issue_date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Title & Ref */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Offer Letter — John Doe"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Reference Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. YGR/HR/OL/2026/042"
                  value={createForm.reference_number}
                  onChange={(e) => setCreateForm({ ...createForm, reference_number: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* File Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Upload Document PDF *
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={(e) => setCreateForm({ ...createForm, file: e.target.files[0] })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px dashed #cbd5e1',
                    fontSize: '0.85rem',
                    background: '#f8fafc',
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  PDF format is required so it can be automatically attached to emails dispatched to the employee.
                </span>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  disabled={creating}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontWeight: 600,
                    cursor: creating ? 'not-allowed' : 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  style={{
                    padding: '9px 22px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#2563eb',
                    color: '#ffffff',
                    fontWeight: 700,
                    cursor: creating ? 'not-allowed' : 'pointer',
                  }}
                >
                  {creating ? 'Creating...' : 'Save & Issue Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Send Email */}
      <SendDocumentEmailModal
        isOpen={Boolean(emailModalData)}
        onClose={() => setEmailModalData(null)}
        onSuccess={handleEmailSuccess}
        documentData={emailModalData}
      />
    </div>
  );
};

export default EmployeeDocuments;
