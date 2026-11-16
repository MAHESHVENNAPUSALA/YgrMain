import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import { relievingLettersApi } from '../../services/api/documents';
import api from '../../services/api';
import './RelievingLetters.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Pending Approval', label: 'Pending Approval' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Issued', label: 'Issued' },
  { value: 'Revoked', label: 'Revoked' },
];

const RelievingLetters = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();

  const role = user?.role;
  const isHrOrMd = ['HR', 'MD'].includes(role);

  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Dropdown options
  const [employees, setEmployees] = useState([]);

  // Create / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingLetterId, setEditingLetterId] = useState(null);
  const [form, setForm] = useState({
    employee: '',
    employee_name: '',
    employee_email: '',
    employee_phone: '',
    employee_address: '',
    employee_id_number: '',
    designation: '',
    department: '',
    employment_type: 'Full-time',
    reporting_manager: '',
    reporting_manager_name: '',
    date_of_joining: '',
    last_working_day: new Date().toISOString().split('T')[0],
    resignation_submitted_date: '',
    resignation_accepted_date: '',
    notice_period_months: 3,
    notice_period_days: 90,
    notice_period_status: 'Served',
    clearance_status: 'Completed',
    reason_for_leaving: '',
    letter_content: '',
    reissue: false,
  });
  const [saving, setSaving] = useState(false);

  // Preview Modal State
  const [previewHtml, setPreviewHtml] = useState(null);
  const [previewLetter, setPreviewLetter] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Action Loading
  const [actionLoading, setActionLoading] = useState({});

  const loadLetters = async () => {
    setLoading(true);
    try {
      const res = await relievingLettersApi.getRelievingLetters({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      });
      setLetters(res.data || []);
    } catch (err) {
      console.error('Failed to load relieving letters:', err);
      showToast('Failed to load relieving letters.', 'error');
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
      console.error('Failed to load employees:', err);
    }
  };

  useEffect(() => {
    loadLetters();
    loadEmployees();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadLetters();
  };

  // Pre-fill employee details when selected
  const handleEmployeeSelect = (empId) => {
    const selected = employees.find((e) => String(e.id) === String(empId));
    if (!selected) {
      setForm((prev) => ({ ...prev, employee: empId }));
      return;
    }

    const doj = selected.date_of_joining ? selected.date_of_joining.split('T')[0] : '';
    setForm((prev) => ({
      ...prev,
      employee: selected.id,
      employee_name: selected.first_name ? `${selected.first_name} ${selected.last_name || ''}`.trim() : selected.username,
      employee_email: selected.email || '',
      employee_phone: selected.phone || '',
      employee_address: selected.address || '',
      employee_id_number: selected.emp_id || `EMP${selected.id}`,
      designation: selected.designation || 'Software Engineer',
      department: selected.department_display || selected.department || 'Information Technology',
      employment_type: 'Full-time',
      reporting_manager: selected.reporting_manager || '',
      reporting_manager_name: selected.reporting_manager_name || '',
      date_of_joining: doj,
    }));
  };

  const openCreateModal = () => {
    setEditingLetterId(null);
    setForm({
      employee: '',
      employee_name: '',
      employee_email: '',
      employee_phone: '',
      employee_address: '',
      employee_id_number: '',
      designation: '',
      department: '',
      employment_type: 'Full-time',
      reporting_manager: '',
      reporting_manager_name: '',
      date_of_joining: '',
      last_working_day: new Date().toISOString().split('T')[0],
      resignation_submitted_date: '',
      resignation_accepted_date: '',
      notice_period_months: 3,
      notice_period_days: 90,
      notice_period_status: 'Served',
      clearance_status: 'Completed',
      reason_for_leaving: '',
      letter_content: '',
      reissue: false,
    });
    setShowModal(true);
  };

  const openEditModal = (letter) => {
    setEditingLetterId(letter.id);
    setForm({
      employee: letter.employee,
      employee_name: letter.employee_name,
      employee_email: letter.employee_email,
      employee_phone: letter.employee_phone,
      employee_address: letter.employee_address,
      employee_id_number: letter.employee_id_number,
      designation: letter.designation,
      department: letter.department,
      employment_type: letter.employment_type || 'Full-time',
      reporting_manager: letter.reporting_manager || '',
      reporting_manager_name: letter.reporting_manager_name || '',
      date_of_joining: letter.date_of_joining || '',
      last_working_day: letter.last_working_day || '',
      resignation_submitted_date: letter.resignation_submitted_date || '',
      resignation_accepted_date: letter.resignation_accepted_date || '',
      notice_period_months: letter.notice_period_months || 3,
      notice_period_days: letter.notice_period_days || 90,
      notice_period_status: letter.notice_period_status || 'Served',
      clearance_status: letter.clearance_status || 'Completed',
      reason_for_leaving: letter.reason_for_leaving || '',
      letter_content: letter.letter_content || '',
      reissue: false,
    });
    setShowModal(true);
  };

  const handleSaveLetter = async (e) => {
    e.preventDefault();
    if (!form.employee) {
      showToast('Please select an employee.', 'warning');
      return;
    }
    if (!form.last_working_day) {
      showToast('Last working day is mandatory.', 'warning');
      return;
    }

    setSaving(true);
    try {
      if (editingLetterId) {
        await relievingLettersApi.updateRelievingLetter(editingLetterId, form);
        showToast('Relieving letter updated successfully.', 'success');
      } else {
        await relievingLettersApi.createRelievingLetter(form);
        showToast('Relieving letter initiated successfully.', 'success');
      }
      setShowModal(false);
      loadLetters();
    } catch (err) {
      console.error('Failed to save relieving letter:', err);
      const detail = err.response?.data?.detail || 'Failed to save relieving letter.';
      showToast(detail, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Preview Handler
  const handleOpenPreview = async (letter) => {
    setPreviewLetter(letter);
    setPreviewLoading(true);
    try {
      const res = await relievingLettersApi.getPreviewHtml(letter.id);
      setPreviewHtml(res.data);
    } catch (err) {
      console.error('Failed to load preview:', err);
      showToast('Failed to load document preview.', 'error');
    } finally {
      setPreviewLoading(false);
    }
  };

  // Actions
  const handleSubmitForApproval = async (letterId) => {
    const ok = await showConfirm('Submit this relieving letter for HR Manager / MD approval?');
    if (!ok) return;

    setActionLoading((prev) => ({ ...prev, [letterId]: true }));
    try {
      await relievingLettersApi.submitForApproval(letterId);
      showToast('Submitted for approval successfully.', 'success');
      loadLetters();
      if (previewLetter?.id === letterId) setPreviewLetter(null);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to submit for approval.', 'error');
    } finally {
      setActionLoading((prev) => ({ ...prev, [letterId]: false }));
    }
  };

  const handleApprove = async (letterId) => {
    const ok = await showConfirm('Approve this relieving letter and generate the authoritative PDF?');
    if (!ok) return;

    setActionLoading((prev) => ({ ...prev, [letterId]: true }));
    try {
      await relievingLettersApi.approveRelievingLetter(letterId);
      showToast('Relieving letter approved and PDF generated.', 'success');
      loadLetters();
      if (previewLetter?.id === letterId) setPreviewLetter(null);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to approve letter.', 'error');
    } finally {
      setActionLoading((prev) => ({ ...prev, [letterId]: false }));
    }
  };

  const handleIssue = async (letter) => {
    const today = new Date().toISOString().split('T')[0];
    const isEarly = letter.last_working_day && today < letter.last_working_day;

    let authorizedEarly = false;
    if (isEarly) {
      const okEarly = await showConfirm(
        `The employee's official last working day is ${letter.last_working_day}, which is in the future. Has an authorized early release been approved for this employee?`
      );
      if (!okEarly) return;
      authorizedEarly = true;
    } else {
      const ok = await showConfirm('Officially issue this relieving letter? The employee will be able to download it immediately.');
      if (!ok) return;
    }

    setActionLoading((prev) => ({ ...prev, [letter.id]: true }));
    try {
      await relievingLettersApi.issueRelievingLetter(letter.id, {
        authorized_early_release: authorizedEarly,
      });
      showToast('Relieving letter officially issued successfully.', 'success');
      loadLetters();
      if (previewLetter?.id === letter.id) setPreviewLetter(null);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to issue letter.', 'error');
    } finally {
      setActionLoading((prev) => ({ ...prev, [letter.id]: false }));
    }
  };

  const handleSendEmail = async (letterId) => {
    const ok = await showConfirm('Send this relieving letter PDF attachment to the employee via official company email?');
    if (!ok) return;

    setActionLoading((prev) => ({ ...prev, [letterId]: true }));
    try {
      await relievingLettersApi.sendEmail(letterId, { force: true });
      showToast('Relieving letter email queued for delivery.', 'success');
      loadLetters();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to queue email.', 'error');
    } finally {
      setActionLoading((prev) => ({ ...prev, [letterId]: false }));
    }
  };

  const handleDownload = async (letter) => {
    try {
      const res = await api.get(relievingLettersApi.getDownloadUrl(letter.id), { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = (letter.employee_name || 'Employee').replace(/\s+/g, '_');
      const safeRef = (letter.reference_number || 'REF').replace(/[\/\\]/g, '_');
      a.download = `Relieving_Letter_${safeName}_${safeRef}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      showToast('Failed to download relieving letter PDF.', 'error');
    }
  };

  const handleDelete = async (letterId) => {
    const ok = await showConfirm('Are you sure you want to delete this draft relieving letter?');
    if (!ok) return;

    try {
      await relievingLettersApi.deleteRelievingLetter(letterId);
      showToast('Draft letter deleted.', 'info');
      loadLetters();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to delete letter.', 'error');
    }
  };

  // Stats calculation
  const totalCount = letters.length;
  const draftCount = letters.filter((l) => l.status === 'Draft').length;
  const pendingCount = letters.filter((l) => l.status === 'Pending Approval').length;
  const approvedCount = letters.filter((l) => l.status === 'Approved').length;
  const issuedCount = letters.filter((l) => l.status === 'Issued').length;
  const revokedCount = letters.filter((l) => l.status === 'Revoked').length;

  return (
    <div className="rl-container">
      {/* HEADER */}
      <div className="rl-header">
        <div>
          <h1 className="rl-title">Employee Relieving Letters</h1>
          <p className="rl-subtitle">
            Manage employee exit clearances, official service certificates, and relieving letters.
          </p>
        </div>
        {isHrOrMd && (
          <div className="rl-header-actions">
            <button className="rl-btn-primary" onClick={openCreateModal}>
              <i className="fa-solid fa-file-circle-plus"></i> Initiate Relieving Letter
            </button>
          </div>
        )}
      </div>

      {/* STATS CARDS */}
      <div className="rl-stats-grid">
        <div className="rl-stat-card">
          <div className="rl-stat-icon total"><i className="fa-solid fa-file-contract"></i></div>
          <div>
            <div className="rl-stat-value">{totalCount}</div>
            <div className="rl-stat-label">Total Letters</div>
          </div>
        </div>
        <div className="rl-stat-card">
          <div className="rl-stat-icon draft"><i className="fa-solid fa-pen-to-square"></i></div>
          <div>
            <div className="rl-stat-value">{draftCount}</div>
            <div className="rl-stat-label">Drafts</div>
          </div>
        </div>
        <div className="rl-stat-card">
          <div className="rl-stat-icon pending"><i className="fa-solid fa-clock"></i></div>
          <div>
            <div className="rl-stat-value">{pendingCount}</div>
            <div className="rl-stat-label">Pending Approval</div>
          </div>
        </div>
        <div className="rl-stat-card">
          <div className="rl-stat-icon approved"><i className="fa-solid fa-check-double"></i></div>
          <div>
            <div className="rl-stat-value">{approvedCount}</div>
            <div className="rl-stat-label">Approved</div>
          </div>
        </div>
        <div className="rl-stat-card">
          <div className="rl-stat-icon issued"><i className="fa-solid fa-certificate"></i></div>
          <div>
            <div className="rl-stat-value">{issuedCount}</div>
            <div className="rl-stat-label">Issued</div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="rl-toolbar">
        <form onSubmit={handleSearchSubmit} className="rl-search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="rl-search-input"
            placeholder="Search by employee, ID, ref no, or designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="rl-filter-group">
          <select
            className="rl-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button className="rl-btn-secondary" onClick={loadLetters}>
            <i className="fa-solid fa-rotate"></i> Refresh
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="rl-table-card">
        <div className="rl-table-wrapper">
          <table className="rl-table">
            <thead>
              <tr>
                <th>Document Ref</th>
                <th>Employee</th>
                <th>Designation &amp; Dept</th>
                <th>Joining Date</th>
                <th>Last Working Day</th>
                <th>Notice Status</th>
                <th>Clearance</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '36px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Loading relieving letters...
                  </td>
                </tr>
              ) : letters.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <div className="rl-empty-state">
                      <div className="rl-empty-icon"><i className="fa-solid fa-folder-open"></i></div>
                      <h4>No Relieving Letters Found</h4>
                      <p>No relieving letters match the current filter criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                letters.map((letter) => {
                  const statusClass =
                    letter.status === 'Approved' ? 'approved' :
                    letter.status === 'Issued' ? 'issued' :
                    letter.status === 'Pending Approval' ? 'pending' :
                    letter.status === 'Revoked' ? 'revoked' : 'draft';

                  return (
                    <tr key={letter.id}>
                      <td className="rl-ref-cell">{letter.reference_number}</td>
                      <td>
                        <div className="rl-emp-cell">
                          <span className="rl-emp-name">{letter.employee_name}</span>
                          <span className="rl-emp-sub">{letter.employee_id_number}</span>
                        </div>
                      </td>
                      <td>
                        <div><strong>{letter.designation}</strong></div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{letter.department}</div>
                      </td>
                      <td>{letter.date_of_joining || '—'}</td>
                      <td><strong>{letter.last_working_day || '—'}</strong></td>
                      <td>{letter.notice_period_status || 'Served'}</td>
                      <td>{letter.clearance_status || 'Completed'}</td>
                      <td>
                        <span className={`rl-badge ${statusClass}`}>{letter.status}</span>
                      </td>
                      <td>
                        <div className="rl-actions-cell" style={{ justifyContent: 'flex-end' }}>
                          <button
                            className="rl-btn-action"
                            title="Preview Document"
                            onClick={() => handleOpenPreview(letter)}
                          >
                            <i className="fa-solid fa-eye"></i> Preview
                          </button>

                          {isHrOrMd && letter.status === 'Draft' && (
                            <>
                              <button
                                className="rl-btn-action"
                                title="Edit Letter"
                                onClick={() => openEditModal(letter)}
                              >
                                <i className="fa-solid fa-pen"></i> Edit
                              </button>
                              <button
                                className="rl-btn-action primary"
                                title="Submit for Approval"
                                disabled={actionLoading[letter.id]}
                                onClick={() => handleSubmitForApproval(letter.id)}
                              >
                                <i className="fa-solid fa-paper-plane"></i> Submit
                              </button>
                            </>
                          )}

                          {isHrOrMd && letter.status === 'Pending Approval' && (
                            <button
                              className="rl-btn-action success"
                              title="Approve Letter"
                              disabled={actionLoading[letter.id]}
                              onClick={() => handleApprove(letter.id)}
                            >
                              <i className="fa-solid fa-check"></i> Approve
                            </button>
                          )}

                          {isHrOrMd && letter.status === 'Approved' && (
                            <button
                              className="rl-btn-action success"
                              title="Issue Final Letter"
                              disabled={actionLoading[letter.id]}
                              onClick={() => handleIssue(letter)}
                            >
                              <i className="fa-solid fa-certificate"></i> Issue
                            </button>
                          )}

                          {['Approved', 'Issued'].includes(letter.status) && (
                            <button
                              className="rl-btn-action"
                              title="Download PDF"
                              onClick={() => handleDownload(letter)}
                            >
                              <i className="fa-solid fa-download"></i> PDF
                            </button>
                          )}

                          {isHrOrMd && ['Approved', 'Issued'].includes(letter.status) && (
                            <button
                              className="rl-btn-action"
                              title="Email to Employee"
                              disabled={actionLoading[letter.id]}
                              onClick={() => handleSendEmail(letter.id)}
                            >
                              <i className="fa-solid fa-envelope"></i> Email
                            </button>
                          )}

                          {isHrOrMd && letter.status === 'Draft' && (
                            <button
                              className="rl-btn-action danger"
                              title="Delete Draft"
                              onClick={() => handleDelete(letter.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
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

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="rl-modal-overlay">
          <div className="rl-modal-card">
            <div className="rl-modal-header">
              <h2 className="rl-modal-title">
                {editingLetterId ? 'Edit Relieving Letter' : 'Initiate Employee Relieving Letter'}
              </h2>
              <button className="rl-modal-close" onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleSaveLetter}>
              <div className="rl-modal-body">
                <div className="rl-notice-box">
                  <i className="fa-solid fa-circle-info" style={{ marginRight: '6px' }}></i>
                  Employee details are fetched automatically from the database. Enter and confirm the exit and clearance parameters below.
                </div>

                <div className="rl-form-grid">
                  {/* Select Employee */}
                  <div className="rl-form-group full-width">
                    <label className="rl-label">Select Employee *</label>
                    <select
                      className="rl-input"
                      value={form.employee}
                      disabled={!!editingLetterId}
                      onChange={(e) => handleEmployeeSelect(e.target.value)}
                      required
                    >
                      <option value="">-- Choose Employee from Database --</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.first_name ? `${emp.first_name} ${emp.last_name || ''}`.trim() : emp.username} ({emp.emp_id || `ID: ${emp.id}`}) &bull; {emp.designation || emp.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Employee Full Name</label>
                    <input
                      type="text"
                      className="rl-input"
                      value={form.employee_name}
                      readOnly
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Employee ID</label>
                    <input
                      type="text"
                      className="rl-input"
                      value={form.employee_id_number}
                      readOnly
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Designation</label>
                    <input
                      type="text"
                      className="rl-input"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      required
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Department</label>
                    <input
                      type="text"
                      className="rl-input"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      required
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Date of Joining</label>
                    <input
                      type="date"
                      className="rl-input"
                      value={form.date_of_joining}
                      onChange={(e) => setForm({ ...form, date_of_joining: e.target.value })}
                      required
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Last Working Day *</label>
                    <input
                      type="date"
                      className="rl-input"
                      value={form.last_working_day}
                      onChange={(e) => setForm({ ...form, last_working_day: e.target.value })}
                      required
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Resignation Submission Date</label>
                    <input
                      type="date"
                      className="rl-input"
                      value={form.resignation_submitted_date}
                      onChange={(e) => setForm({ ...form, resignation_submitted_date: e.target.value })}
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Resignation Acceptance Date</label>
                    <input
                      type="date"
                      className="rl-input"
                      value={form.resignation_accepted_date}
                      onChange={(e) => setForm({ ...form, resignation_accepted_date: e.target.value })}
                    />
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Notice Period Status</label>
                    <select
                      className="rl-input"
                      value={form.notice_period_status}
                      onChange={(e) => setForm({ ...form, notice_period_status: e.target.value })}
                    >
                      <option value="Served">Notice Period Served</option>
                      <option value="Waived">Notice Period Waived</option>
                      <option value="Shortfall">Notice Period Shortfall</option>
                    </select>
                  </div>

                  <div className="rl-form-group">
                    <label className="rl-label">Clearance &amp; Handover Status</label>
                    <select
                      className="rl-input"
                      value={form.clearance_status}
                      onChange={(e) => setForm({ ...form, clearance_status: e.target.value })}
                    >
                      <option value="Completed">All Clearances Completed</option>
                      <option value="Pending">Clearances Pending</option>
                      <option value="Waived">Clearances Waived</option>
                    </select>
                  </div>

                  <div className="rl-form-group full-width">
                    <label className="rl-label">Reason for Leaving (Optional)</label>
                    <input
                      type="text"
                      className="rl-input"
                      placeholder="e.g. Higher studies, Personal reasons, Relocation"
                      value={form.reason_for_leaving}
                      onChange={(e) => setForm({ ...form, reason_for_leaving: e.target.value })}
                    />
                  </div>

                  <div className="rl-form-group full-width">
                    <label className="rl-label">Custom Remarks / Endorsement Paragraph (Optional)</label>
                    <textarea
                      className="rl-textarea"
                      placeholder="Enter any additional customized text to include in the official letter..."
                      value={form.letter_content}
                      onChange={(e) => setForm({ ...form, letter_content: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="rl-modal-footer">
                <button type="button" className="rl-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="rl-btn-primary" disabled={saving}>
                  {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : 'Save Relieving Letter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewLetter && (
        <div className="rl-modal-overlay">
          <div className="rl-modal-card rl-preview-modal">
            <div className="rl-modal-header">
              <h2 className="rl-modal-title">
                Document Preview &ndash; {previewLetter.reference_number} ({previewLetter.employee_name})
              </h2>
              <button className="rl-modal-close" onClick={() => setPreviewLetter(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="rl-modal-body">
              {previewLoading ? (
                <div style={{ textAlign: 'center', padding: '48px' }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '1.5rem', marginBottom: '8px' }}></i>
                  <div>Rendering live document preview...</div>
                </div>
              ) : (
                <div className="rl-preview-frame-wrap">
                  <iframe
                    title="Relieving Letter Preview"
                    srcDoc={previewHtml}
                    className="rl-preview-frame"
                  />
                </div>
              )}
            </div>
            <div className="rl-modal-footer">
              <button className="rl-btn-secondary" onClick={() => setPreviewLetter(null)}>
                Close Preview
              </button>

              {isHrOrMd && previewLetter.status === 'Draft' && (
                <button
                  className="rl-btn-primary"
                  onClick={() => handleSubmitForApproval(previewLetter.id)}
                >
                  <i className="fa-solid fa-paper-plane"></i> Submit for Approval
                </button>
              )}

              {isHrOrMd && previewLetter.status === 'Pending Approval' && (
                <button
                  className="rl-btn-primary"
                  style={{ background: '#16a34a' }}
                  onClick={() => handleApprove(previewLetter.id)}
                >
                  <i className="fa-solid fa-check"></i> Approve Document
                </button>
              )}

              {isHrOrMd && previewLetter.status === 'Approved' && (
                <button
                  className="rl-btn-primary"
                  style={{ background: '#059669' }}
                  onClick={() => handleIssue(previewLetter)}
                >
                  <i className="fa-solid fa-certificate"></i> Issue Final Letter
                </button>
              )}

              {['Approved', 'Issued'].includes(previewLetter.status) && (
                <button
                  className="rl-btn-secondary"
                  onClick={() => handleDownload(previewLetter)}
                >
                  <i className="fa-solid fa-download"></i> Download PDF
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelievingLetters;

