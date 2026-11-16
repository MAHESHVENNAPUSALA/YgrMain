import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import { joiningLettersApi, offerLettersApi } from '../../services/api/documents';
import api from '../../services/api';
import './JoiningLetters.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Issued', label: 'Issued' },
  { value: 'Sent', label: 'Sent' },
];

const JoiningLetters = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const location = useLocation();

  const role = user?.role;
  const isHrOrMd = ['HR', 'MD'].includes(role);

  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Dropdown options
  const [acceptedOffers, setAcceptedOffers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);

  // Create / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingLetterId, setEditingLetterId] = useState(null);
  const [sourceType, setSourceType] = useState('offer'); // 'offer', 'employee', 'custom'
  const [form, setForm] = useState({
    offer_letter: '',
    employee: '',
    candidate: '',
    employee_name: '',
    employee_email: '',
    employee_phone: '',
    employee_address: '',
    employee_id_number: '',
    designation: '',
    department: 'python_dev',
    employment_type: 'Full-time',
    work_location: 'Hyderabad, Telangana',
    reporting_manager: '',
    reporting_manager_name: '',
    actual_joining_date: new Date().toISOString().split('T')[0],
    probation_period_months: 3,
    working_hours: '9:30 AM to 6:30 PM (Mon - Fri)',
    status: 'Draft',
    special_terms: '',
  });
  const [saving, setSaving] = useState(false);

  // Preview Modal State
  const [previewHtml, setPreviewHtml] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);

  // Send Email Modal State
  const [emailModalLetter, setEmailModalLetter] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  const loadLetters = async () => {
    setLoading(true);
    try {
      const res = await joiningLettersApi.getJoiningLetters({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      });
      setLetters(res.data || []);
    } catch (err) {
      console.error('Failed to load joining letters:', err);
      showToast('Failed to load joining letters.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadSelectOptions = async () => {
    if (!isHrOrMd) return;
    try {
      const [offerRes, empRes] = await Promise.all([
        offerLettersApi.getOfferLetters().catch(() => ({ data: [] })),
        api.get('/api/users/', { params: { scope: 'directory' } }).catch(() => ({ data: [] })),
      ]);
      const allOffers = offerRes.data || [];
      setAcceptedOffers(allOffers.filter((o) => ['Accepted', 'Issued', 'Sent'].includes(o.status)));
      const allEmps = empRes.data || [];
      setEmployees(allEmps);
      setManagers(allEmps.filter((u) => ['Manager', 'TeamLead', 'HR', 'MD'].includes(u.role)));
    } catch (err) {
      console.error('Error loading select options:', err);
    }
  };

  useEffect(() => {
    loadLetters();
  }, [statusFilter]);

  useEffect(() => {
    if (isHrOrMd) {
      loadSelectOptions();
    }
  }, [isHrOrMd]);

  // Handle prefill from navigation state (e.g. from OfferLetters "Create Joining Letter" button)
  useEffect(() => {
    if (location.state?.prefillOffer) {
      const off = location.state.prefillOffer;
      setSourceType('offer');
      setForm({
        offer_letter: off.id,
        employee: off.employee || '',
        candidate: off.candidate || '',
        employee_name: off.candidate_name,
        employee_email: off.candidate_email,
        employee_phone: off.candidate_phone || '',
        employee_address: off.candidate_address || '',
        employee_id_number: off.employee_emp_id || '',
        designation: off.job_title,
        department: off.department,
        employment_type: off.employment_type || 'Full-time',
        work_location: off.work_location || 'Hyderabad, Telangana',
        reporting_manager: off.reporting_manager || '',
        reporting_manager_name: off.reporting_manager_name || '',
        actual_joining_date: off.joining_date || new Date().toISOString().split('T')[0],
        probation_period_months: off.probation_period_months || 3,
        working_hours: '9:30 AM to 6:30 PM (Mon - Fri)',
        status: 'Draft',
        special_terms: '',
      });
      setShowModal(true);
    }
  }, [location.state]);

  // Handle Offer Selection
  const handleOfferSelect = (offerId) => {
    const off = acceptedOffers.find((o) => String(o.id) === String(offerId));
    if (off) {
      setForm((prev) => ({
        ...prev,
        offer_letter: off.id,
        candidate: off.candidate || '',
        employee: off.employee || '',
        employee_name: off.candidate_name,
        employee_email: off.candidate_email,
        employee_phone: off.candidate_phone || '',
        employee_address: off.candidate_address || '',
        designation: off.job_title,
        department: off.department,
        employment_type: off.employment_type || 'Full-time',
        work_location: off.work_location || 'Hyderabad, Telangana',
        reporting_manager: off.reporting_manager || '',
        reporting_manager_name: off.reporting_manager_name || '',
        actual_joining_date: off.joining_date || prev.actual_joining_date,
        probation_period_months: off.probation_period_months || 3,
      }));
    } else {
      setForm((prev) => ({ ...prev, offer_letter: offerId }));
    }
  };

  // Handle Employee Selection
  const handleEmployeeSelect = (empId) => {
    const emp = employees.find((e) => String(e.id) === String(empId));
    if (emp) {
      setForm((prev) => ({
        ...prev,
        employee: emp.id,
        offer_letter: '',
        candidate: '',
        employee_name: emp.name || emp.username,
        employee_email: emp.email,
        employee_phone: emp.phone || '',
        employee_id_number: emp.emp_id || '',
        designation: emp.designation || prev.designation,
        department: emp.department || prev.department,
      }));
    } else {
      setForm((prev) => ({ ...prev, employee: empId }));
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingLetterId(null);
    setSourceType(acceptedOffers.length > 0 ? 'offer' : 'custom');
    setForm({
      offer_letter: '',
      employee: '',
      candidate: '',
      employee_name: '',
      employee_email: '',
      employee_phone: '',
      employee_address: '',
      employee_id_number: '',
      designation: '',
      department: 'python_dev',
      employment_type: 'Full-time',
      work_location: 'Hyderabad, Telangana',
      reporting_manager: '',
      reporting_manager_name: '',
      actual_joining_date: new Date().toISOString().split('T')[0],
      probation_period_months: 3,
      working_hours: '9:30 AM to 6:30 PM (Mon - Fri)',
      status: 'Draft',
      special_terms: '',
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (letter) => {
    setEditingLetterId(letter.id);
    setSourceType(letter.offer_letter ? 'offer' : letter.employee ? 'employee' : 'custom');
    setForm({
      offer_letter: letter.offer_letter || '',
      employee: letter.employee || '',
      candidate: letter.candidate || '',
      employee_name: letter.employee_name,
      employee_email: letter.employee_email,
      employee_phone: letter.employee_phone || '',
      employee_address: letter.employee_address || '',
      employee_id_number: letter.employee_id_number || '',
      designation: letter.designation,
      department: letter.department,
      employment_type: letter.employment_type || 'Full-time',
      work_location: letter.work_location,
      reporting_manager: letter.reporting_manager || '',
      reporting_manager_name: letter.reporting_manager_name || '',
      actual_joining_date: letter.actual_joining_date,
      probation_period_months: letter.probation_period_months,
      working_hours: letter.working_hours,
      status: letter.status,
      special_terms: letter.special_terms || '',
    });
    setShowModal(true);
  };

  // Submit Form
  const handleSubmitForm = async (e, forcedStatus = null) => {
    if (e) e.preventDefault();
    if (!form.employee_name || !form.employee_email || !form.designation || !form.actual_joining_date) {
      showToast('Please fill all mandatory fields (Name, Email, Designation, Joining Date).', 'warning');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        status: forcedStatus || form.status,
        probation_period_months: parseInt(form.probation_period_months, 10) || 3,
        offer_letter: form.offer_letter || null,
        employee: form.employee || null,
        candidate: form.candidate || null,
        reporting_manager: form.reporting_manager || null,
      };

      if (editingLetterId) {
        await joiningLettersApi.updateJoiningLetter(editingLetterId, payload);
        showToast('Joining letter updated successfully.', 'success');
      } else {
        await joiningLettersApi.createJoiningLetter(payload);
        showToast('Joining letter created successfully.', 'success');
      }

      setShowModal(false);
      loadLetters();
    } catch (err) {
      console.error('Error saving joining letter:', err);
      showToast(err.response?.data?.detail || 'Failed to save joining letter.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Live Preview
  const handlePreview = async (letter) => {
    setPreviewLoading(true);
    setPreviewTitle(`Preview: Joining Letter – ${letter.employee_name}`);
    try {
      const res = await joiningLettersApi.getPreviewHtml(letter.id);
      setPreviewHtml(res.data);
    } catch (err) {
      showToast('Failed to load letter preview.', 'error');
    } finally {
      setPreviewLoading(false);
    }
  };

  // Approve Letter Action
  const handleApprove = async (letter) => {
    const ok = await showConfirm(`Approve and generate official PDF for ${letter.employee_name}?`);
    if (!ok) return;

    try {
      const res = await joiningLettersApi.approveJoiningLetter(letter.id);
      showToast(res.data.detail || 'Joining letter approved.', 'success');
      loadLetters();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to approve joining letter.', 'error');
    }
  };

  // Send Email Action
  const handleSendEmail = async (force = false) => {
    if (!emailModalLetter) return;
    setSendingEmail(true);
    try {
      const res = await joiningLettersApi.sendEmail(emailModalLetter.id, { force });
      showToast(res.data.detail || 'Email queued successfully.', 'success');
      setEmailModalLetter(null);
      loadLetters();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to dispatch email.', 'error');
    } finally {
      setSendingEmail(false);
    }
  };

  // Delete Letter Action
  const handleDelete = async (letter) => {
    const ok = await showConfirm(`Delete joining letter ${letter.reference_number}?`);
    if (!ok) return;

    try {
      await joiningLettersApi.deleteJoiningLetter(letter.id);
      showToast('Joining letter deleted.', 'success');
      loadLetters();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to delete joining letter.', 'error');
    }
  };

  // Filtered List
  const filteredLetters = letters.filter((l) => {
    const term = search.toLowerCase();
    const matchSearch =
      (l.employee_name || '').toLowerCase().includes(term) ||
      (l.employee_email || '').toLowerCase().includes(term) ||
      (l.designation || '').toLowerCase().includes(term) ||
      (l.reference_number || '').toLowerCase().includes(term);
    return matchSearch;
  });

  // Calculate Statistics
  const stats = {
    total: letters.length,
    draft: letters.filter((l) => l.status === 'Draft').length,
    approved: letters.filter((l) => l.status === 'Approved').length,
    issued: letters.filter((l) => l.status === 'Issued').length,
    sent: letters.filter((l) => l.status === 'Sent' || l.email_status === 'Sent').length,
  };

  return (
    <div className="jl-container">
      {/* Header */}
      <div className="jl-header">
        <div>
          <h2 className="jl-title">Joining &amp; Appointment Letters</h2>
          <p className="jl-subtitle">
            Issue official joining confirmations, appointment records, and onboarding documentation with corporate letterheads.
          </p>
        </div>

        {isHrOrMd && (
          <div className="jl-header-actions">
            <button type="button" className="jl-btn-primary" onClick={handleOpenCreateModal}>
              <i className="fa-solid fa-file-circle-plus"></i> Issue Joining Letter
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="jl-stats-grid">
        <div className="jl-stat-card">
          <div className="jl-stat-icon total"><i className="fa-solid fa-file-signature"></i></div>
          <div>
            <div className="jl-stat-val">{stats.total}</div>
            <div className="jl-stat-label">Total Letters</div>
          </div>
        </div>
        <div className="jl-stat-card">
          <div className="jl-stat-icon draft"><i className="fa-solid fa-pen-ruler"></i></div>
          <div>
            <div className="jl-stat-val">{stats.draft}</div>
            <div className="jl-stat-label">Drafts</div>
          </div>
        </div>
        <div className="jl-stat-card">
          <div className="jl-stat-icon approved"><i className="fa-solid fa-check-double"></i></div>
          <div>
            <div className="jl-stat-val">{stats.approved}</div>
            <div className="jl-stat-label">Approved</div>
          </div>
        </div>
        <div className="jl-stat-card">
          <div className="jl-stat-icon issued"><i className="fa-solid fa-stamp"></i></div>
          <div>
            <div className="jl-stat-val">{stats.issued}</div>
            <div className="jl-stat-label">Issued</div>
          </div>
        </div>
        <div className="jl-stat-card">
          <div className="jl-stat-icon sent"><i className="fa-solid fa-paper-plane"></i></div>
          <div>
            <div className="jl-stat-val">{stats.sent}</div>
            <div className="jl-stat-label">Emailed</div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="jl-controls-bar">
        <div className="jl-search-box">
          <input
            type="text"
            className="jl-input"
            placeholder="Search employee name, email, designation, or ref number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="jl-status-filters">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`jl-filter-btn ${statusFilter === opt.value ? 'active' : ''}`}
              onClick={() => setStatusFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="jl-table-container">
        <div className="jl-table-scroll">
          <table className="jl-table">
            <thead>
              <tr>
                <th>Employee &amp; Role</th>
                <th>Effective Joining Date</th>
                <th>Employee ID</th>
                <th>Reference Number</th>
                <th>Status</th>
                <th>Email Delivery</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '24px', marginBottom: '8px' }}></i>
                    <div>Loading joining letters...</div>
                  </td>
                </tr>
              ) : filteredLetters.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    <i className="fa-solid fa-folder-open" style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }}></i>
                    No joining letters found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredLetters.map((letter) => {
                  const isSent = letter.email_status === 'Sent';
                  const isFailed = letter.email_status === 'Failed';
                  const isSending = letter.email_status === 'Sending';

                  return (
                    <tr key={letter.id}>
                      {/* Employee & Role */}
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{letter.employee_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 600 }}>{letter.designation}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{letter.employee_email}</div>
                      </td>

                      {/* Actual Joining Date */}
                      <td>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{letter.actual_joining_date}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{letter.department}</div>
                      </td>

                      {/* Employee ID */}
                      <td>
                        <span style={{ fontWeight: 600, color: '#334155', fontFamily: 'monospace' }}>
                          {letter.employee_id_number || '—'}
                        </span>
                      </td>

                      {/* Ref Number */}
                      <td style={{ color: '#475569', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        {letter.reference_number}
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`jl-badge ${letter.status.replace(/\s+/g, '')}`}>
                          {letter.status}
                        </span>
                      </td>

                      {/* Email Status */}
                      <td>
                        <span className={`jl-email-badge ${letter.email_status.replace(/\s+/g, '')}`}>
                          {isSent ? '✓ Emailed' : isFailed ? '⚠ Failed' : isSending ? '↻ Sending' : '• Not Sent'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="jl-actions-cell">
                          {/* Live Preview */}
                          <button
                            type="button"
                            className="jl-action-btn"
                            title="Preview Letter"
                            onClick={() => handlePreview(letter)}
                          >
                            <i className="fa-regular fa-eye"></i> Preview
                          </button>

                          {/* PDF Download */}
                          {letter.pdf_url ? (
                            <a
                              href={joiningLettersApi.getDownloadUrl(letter.id)}
                              target="_blank"
                              rel="noreferrer"
                              className="jl-action-btn"
                              title="Download PDF"
                            >
                              <i className="fa-regular fa-file-pdf"></i> PDF
                            </a>
                          ) : null}

                          {/* Edit (if Draft) */}
                          {isHrOrMd && letter.status === 'Draft' && (
                            <button
                              type="button"
                              className="jl-action-btn"
                              title="Edit Joining Letter"
                              onClick={() => handleOpenEditModal(letter)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          )}

                          {/* Approve (if Draft) */}
                          {isHrOrMd && letter.status === 'Draft' && (
                            <button
                              type="button"
                              className="jl-action-btn primary"
                              title="Approve & Generate PDF"
                              onClick={() => handleApprove(letter)}
                            >
                              <i className="fa-solid fa-check"></i> Approve
                            </button>
                          )}

                          {/* Send Email */}
                          {isHrOrMd && ['Approved', 'Issued', 'Sent'].includes(letter.status) && (
                            <button
                              type="button"
                              className={`jl-action-btn ${isSent ? '' : 'primary'}`}
                              title={isSent ? 'Resend Joining Letter Email' : 'Send Joining Letter Email'}
                              onClick={() => setEmailModalLetter(letter)}
                            >
                              <i className="fa-solid fa-envelope"></i> {isSent ? 'Resend' : 'Email'}
                            </button>
                          )}

                          {/* Delete (if Draft) */}
                          {isHrOrMd && letter.status === 'Draft' && (
                            <button
                              type="button"
                              className="jl-action-btn danger"
                              title="Delete Draft"
                              onClick={() => handleDelete(letter)}
                            >
                              <i className="fa-solid fa-trash-can"></i>
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

      {/* CREATE / EDIT JOINING LETTER MODAL */}
      {showModal && (
        <div className="jl-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && !saving) setShowModal(false); }}>
          <div className="jl-modal">
            <div className="jl-modal-header">
              <h3 className="jl-modal-title">
                {editingLetterId ? 'Edit Joining Letter' : 'Issue Official Joining Letter'}
              </h3>
              <button type="button" className="jl-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmitForm} className="jl-modal-body">
              {/* Source Selection */}
              {!editingLetterId && (
                <div>
                  <label className="jl-label">Document Source</label>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="radio"
                        name="sourceType"
                        value="offer"
                        checked={sourceType === 'offer'}
                        onChange={() => setSourceType('offer')}
                      />
                      Select from Accepted Offer Letters
                    </label>
                    <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="radio"
                        name="sourceType"
                        value="employee"
                        checked={sourceType === 'employee'}
                        onChange={() => setSourceType('employee')}
                      />
                      Select Existing Employee
                    </label>
                    <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="radio"
                        name="sourceType"
                        value="custom"
                        checked={sourceType === 'custom'}
                        onChange={() => setSourceType('custom')}
                      />
                      Direct Entry
                    </label>
                  </div>

                  {sourceType === 'offer' && (
                    <select
                      className="jl-select"
                      value={form.offer_letter}
                      onChange={(e) => handleOfferSelect(e.target.value)}
                    >
                      <option value="">-- Choose Accepted Offer Letter --</option>
                      {acceptedOffers.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.candidate_name} — {o.job_title} ({o.reference_number}) - Status: {o.status}
                        </option>
                      ))}
                    </select>
                  )}

                  {sourceType === 'employee' && (
                    <select
                      className="jl-select"
                      value={form.employee}
                      onChange={(e) => handleEmployeeSelect(e.target.value)}
                    >
                      <option value="">-- Choose Existing Employee --</option>
                      {employees.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.name || e.username} ({e.emp_id || 'ID N/A'}) — {e.email}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* Employee Particulars */}
              <div className="jl-form-row">
                <div>
                  <label className="jl-label">Employee Full Name *</label>
                  <input
                    type="text"
                    required
                    className="jl-input"
                    value={form.employee_name}
                    onChange={(e) => setForm({ ...form, employee_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="jl-label">Registered Email Address *</label>
                  <input
                    type="email"
                    required
                    className="jl-input"
                    value={form.employee_email}
                    onChange={(e) => setForm({ ...form, employee_email: e.target.value })}
                  />
                </div>
              </div>

              <div className="jl-form-row three">
                <div>
                  <label className="jl-label">Contact Phone</label>
                  <input
                    type="text"
                    className="jl-input"
                    value={form.employee_phone}
                    onChange={(e) => setForm({ ...form, employee_phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="jl-label">Employee ID (if assigned)</label>
                  <input
                    type="text"
                    className="jl-input"
                    placeholder="e.g. YGREMP1008"
                    value={form.employee_id_number}
                    onChange={(e) => setForm({ ...form, employee_id_number: e.target.value })}
                  />
                </div>
                <div>
                  <label className="jl-label">Employment Type</label>
                  <select
                    className="jl-select"
                    value={form.employment_type}
                    onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Position & Location */}
              <div className="jl-form-row">
                <div>
                  <label className="jl-label">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    className="jl-input"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  />
                </div>
                <div>
                  <label className="jl-label">Department *</label>
                  <select
                    className="jl-select"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="python_dev">Python Developer</option>
                    <option value="frontend_dev">Frontend Developer</option>
                    <option value="backend_dev">Backend Developer</option>
                    <option value="fullstack_dev">Full Stack Developer</option>
                    <option value="testing">Testing / QA</option>
                    <option value="devops">DevOps Engineer</option>
                    <option value="data_analyst">Data Analyst</option>
                    <option value="ui_ux">UI / UX Designer</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
              </div>

              <div className="jl-form-row">
                <div>
                  <label className="jl-label">Actual Joining Date *</label>
                  <input
                    type="date"
                    required
                    className="jl-input"
                    value={form.actual_joining_date}
                    onChange={(e) => setForm({ ...form, actual_joining_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="jl-label">Work Location</label>
                  <input
                    type="text"
                    className="jl-input"
                    value={form.work_location}
                    onChange={(e) => setForm({ ...form, work_location: e.target.value })}
                  />
                </div>
              </div>

              <div className="jl-form-row">
                <div>
                  <label className="jl-label">Reporting Manager</label>
                  <select
                    className="jl-select"
                    value={form.reporting_manager}
                    onChange={(e) => {
                      const mgr = managers.find((m) => String(m.id) === e.target.value);
                      setForm({
                        ...form,
                        reporting_manager: e.target.value,
                        reporting_manager_name: mgr ? (mgr.name || mgr.username) : '',
                      });
                    }}
                  >
                    <option value="">-- Choose Manager --</option>
                    {managers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name || m.username} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="jl-label">Standard Working Hours</label>
                  <input
                    type="text"
                    className="jl-input"
                    value={form.working_hours}
                    onChange={(e) => setForm({ ...form, working_hours: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="jl-label">Special Terms &amp; Provisions (Optional)</label>
                <textarea
                  className="jl-textarea"
                  placeholder="Leave empty to use standard company appointment terms, or specify custom appointment conditions..."
                  value={form.special_terms}
                  onChange={(e) => setForm({ ...form, special_terms: e.target.value })}
                />
              </div>

              {/* Modal Footer */}
              <div className="jl-modal-footer">
                <button
                  type="button"
                  className="jl-action-btn"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="jl-btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : editingLetterId ? 'Update Joining Letter' : 'Save as Draft'}
                </button>
                {!editingLetterId && (
                  <button
                    type="button"
                    className="jl-action-btn primary"
                    disabled={saving}
                    onClick={() => handleSubmitForm(null, 'Approved')}
                  >
                    <i className="fa-solid fa-check"></i> Save &amp; Approve
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIVE PREVIEW MODAL */}
      {previewHtml && (
        <div className="jl-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setPreviewHtml(null); }}>
          <div className="jl-modal preview-modal">
            <div className="jl-modal-header">
              <h3 className="jl-modal-title">{previewTitle}</h3>
              <button type="button" className="jl-modal-close" onClick={() => setPreviewHtml(null)}>✕</button>
            </div>
            <div className="jl-modal-body" style={{ padding: '12px' }}>
              <iframe
                title="Letter Preview"
                srcDoc={previewHtml}
                className="jl-preview-frame"
              />
            </div>
            <div className="jl-modal-footer">
              <button type="button" className="jl-action-btn primary" onClick={() => setPreviewHtml(null)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEND EMAIL CONFIRMATION MODAL */}
      {emailModalLetter && (
        <div className="jl-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && !sendingEmail) setEmailModalLetter(null); }}>
          <div className="jl-modal" style={{ maxWidth: '520px' }}>
            <div className="jl-modal-header">
              <h3 className="jl-modal-title">
                {emailModalLetter.email_status === 'Sent' ? 'Resend Joining Letter Email' : 'Send Official Joining Letter Email'}
              </h3>
              <button type="button" className="jl-modal-close" onClick={() => setEmailModalLetter(null)}>✕</button>
            </div>

            <div className="jl-modal-body">
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{emailModalLetter.employee_name}</div>
                <div style={{ color: '#0f766e', fontWeight: 600, fontSize: '0.85rem' }}>{emailModalLetter.designation}</div>
                <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '4px' }}>
                  Recipient Email: <strong>{emailModalLetter.employee_email}</strong>
                </div>
                <div style={{ color: '#64748b', fontSize: '0.82rem' }}>
                  Reference No: <strong>{emailModalLetter.reference_number}</strong>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                The official Joining &amp; Appointment Letter PDF will be attached to the email and dispatched to the employee's registered email address.
              </p>

              {emailModalLetter.email_status === 'Sent' && (
                <div style={{ padding: '8px 12px', background: '#fef3c7', borderRadius: '6px', color: '#92400e', fontSize: '0.8rem', border: '1px solid #fde68a' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i> This joining letter was already sent on {emailModalLetter.email_sent_at ? new Date(emailModalLetter.email_sent_at).toLocaleString() : 'a prior date'}. Resending will re-dispatch the PDF.
                </div>
              )}
            </div>

            <div className="jl-modal-footer">
              <button type="button" className="jl-action-btn" onClick={() => setEmailModalLetter(null)} disabled={sendingEmail}>
                Cancel
              </button>
              <button
                type="button"
                className="jl-btn-primary"
                onClick={() => handleSendEmail(emailModalLetter.email_status === 'Sent')}
                disabled={sendingEmail}
              >
                {sendingEmail ? 'Queuing Email...' : emailModalLetter.email_status === 'Sent' ? 'Force Resend Email' : 'Send Joining Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoiningLetters;
