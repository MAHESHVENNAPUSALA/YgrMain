import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import { offerLettersApi, offerPoliciesApi, candidatesApi } from '../../services/api/documents';
import api from '../../services/api';
import './OfferLetters.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Issued', label: 'Issued' },
  { value: 'Sent', label: 'Sent' },
  { value: 'Accepted', label: 'Accepted' },
  { value: 'Rejected', label: 'Rejected' },
];

const OfferLetters = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const navigate = useNavigate();

  const role = user?.role;
  const isHrOrMd = ['HR', 'MD'].includes(role);

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Dropdown options
  const [candidates, setCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [policyVersions, setPolicyVersions] = useState([]);

  // Create / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [sourceType, setSourceType] = useState('candidate'); // 'candidate', 'employee', 'custom'
  const [form, setForm] = useState({
    candidate: '',
    employee: '',
    candidate_name: '',
    candidate_email: '',
    candidate_phone: '',
    candidate_address: '',
    job_title: '',
    department: 'python_dev',
    employment_type: 'Full-time',
    employment_category: 'General',
    work_location: 'Hyderabad, Telangana',
    reporting_manager: '',
    reporting_manager_name: '',
    offered_ctc: '',
    monthly_gross: '',
    basic_salary: '',
    hra: '',
    special_allowance: '',
    provident_fund: '',
    transport_allowance: '',
    medical_allowance: '',
    other_allowances: '',
    gratuity: '',
    variable_pay: '',
    employee_pf_deduction: '',
    employer_esi: '',
    employee_esi: '',
    professional_tax: '',
    other_deductions: '',
    policy_version: '',
    annexures: [],
    joining_date: '',
    offer_validity_date: '',
    probation_period_months: '',
    notice_period_days: '',
    status: 'Draft',
    terms_and_conditions: '',
  });
  const [saving, setSaving] = useState(false);

  // Preview Modal State
  const [previewPdfUrl, setPreviewPdfUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [auditOffer, setAuditOffer] = useState(null);
  const [auditEvents, setAuditEvents] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);

  // Record Candidate Response Modal
  const [responseModalOffer, setResponseModalOffer] = useState(null);
  const [responseChoice, setResponseChoice] = useState('Accepted');
  const [responseNotes, setResponseNotes] = useState('');
  const [recordingResponse, setRecordingResponse] = useState(false);

  // Send Email Confirmation Modal
  const [emailModalOffer, setEmailModalOffer] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  const loadOffers = async () => {
    setLoading(true);
    try {
      const res = await offerLettersApi.getOfferLetters({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      });
      setOffers(res.data || []);
    } catch (err) {
      console.error('Failed to load offer letters:', err);
      showToast('Failed to load offer letters.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadSelectOptions = async () => {
    if (!isHrOrMd) return;
    try {
      const [candRes, empRes, policyRes] = await Promise.all([
        candidatesApi.getCandidates().catch(() => ({ data: [] })),
        api.get('/api/users/', { params: { scope: 'directory' } }).catch(() => ({ data: [] })),
        offerPoliciesApi.getVersions({ published: true }).catch(() => ({ data: [] })),
      ]);
      setCandidates(candRes.data || []);
      const allEmps = empRes.data || [];
      setEmployees(allEmps);
      setManagers(allEmps.filter((u) => ['Manager', 'TeamLead', 'HR', 'MD'].includes(u.role)));
      setPolicyVersions(policyRes.data || []);
    } catch (err) {
      console.error('Error loading options:', err);
    }
  };

  useEffect(() => {
    loadOffers();
  }, [statusFilter]);

  useEffect(() => {
    if (isHrOrMd) {
      loadSelectOptions();
    }
  }, [isHrOrMd]);

  // CTC Breakup Calculator
  const handleCtcChange = (ctcVal) => {
    setForm((prev) => ({ ...prev, offered_ctc: ctcVal }));
  };

  const handleSalaryComponentChange = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      next.monthly_gross = ['basic_salary', 'hra', 'special_allowance', 'transport_allowance', 'medical_allowance', 'other_allowances']
        .reduce((total, key) => total + (parseFloat(next[key]) || 0), 0)
        .toFixed(2);
      return next;
    });
  };

  // Candidate selection change
  const handleCandidateSelect = (candId) => {
    const cand = candidates.find((c) => String(c.id) === String(candId));
    if (cand) {
      setForm((prev) => ({
        ...prev,
        candidate: cand.id,
        employee: '',
        candidate_name: cand.full_name || `${cand.first_name} ${cand.last_name}`,
        candidate_email: cand.email,
        candidate_phone: cand.phone || '',
        candidate_address: cand.current_address || cand.permanent_address || cand.current_city || '',
        job_title: cand.job_role || prev.job_title,
        department: cand.department || prev.department,
        employment_type: cand.employment_type || 'Full-time',
        work_location: cand.preferred_job_location || prev.work_location,
      }));
    } else {
      setForm((prev) => ({ ...prev, candidate: candId }));
    }
  };

  // Employee selection change
  const handleEmployeeSelect = (empId) => {
    const emp = employees.find((e) => String(e.id) === String(empId));
    if (emp) {
      setForm((prev) => ({
        ...prev,
        employee: emp.id,
        candidate: '',
        candidate_name: emp.name || emp.username,
        candidate_email: emp.email,
        candidate_phone: emp.phone || '',
        candidate_address: emp.address || '',
        job_title: emp.designation || prev.job_title,
        department: emp.department || prev.department,
        work_location: prev.work_location,
      }));
    } else {
      setForm((prev) => ({ ...prev, employee: empId }));
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingOfferId(null);
    setSourceType('custom');
    setForm({
      candidate: '',
      employee: '',
      candidate_name: '',
      candidate_email: '',
      candidate_phone: '',
      candidate_address: '',
      job_title: '',
      department: 'python_dev',
      employment_type: 'Full-time',
      employment_category: 'General',
      work_location: 'Hyderabad, Telangana',
      reporting_manager: '',
      reporting_manager_name: '',
      offered_ctc: '',
      monthly_gross: '',
      basic_salary: '',
      hra: '',
      special_allowance: '',
      provident_fund: '',
      transport_allowance: '',
      medical_allowance: '',
      other_allowances: '',
      gratuity: '',
      variable_pay: '',
      employee_pf_deduction: '',
      employer_esi: '',
      employee_esi: '',
      professional_tax: '',
      other_deductions: '',
      policy_version: '',
      annexures: [],
      joining_date: '',
      offer_validity_date: '',
      probation_period_months: '',
      notice_period_days: '',
      status: 'Draft',
      terms_and_conditions: '',
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (offer) => {
    setEditingOfferId(offer.id);
    setSourceType(offer.candidate ? 'candidate' : offer.employee ? 'employee' : 'custom');
    setForm({
      candidate: offer.candidate || '',
      employee: offer.employee || '',
      candidate_name: offer.candidate_name,
      candidate_email: offer.candidate_email,
      candidate_phone: offer.candidate_phone || '',
      candidate_address: offer.candidate_address || '',
      job_title: offer.job_title,
      department: offer.department,
      employment_type: offer.employment_type || 'Full-time',
      employment_category: offer.employment_category || 'General',
      work_location: offer.work_location,
      reporting_manager: offer.reporting_manager || '',
      reporting_manager_name: offer.reporting_manager_name || '',
      offered_ctc: offer.offered_ctc,
      monthly_gross: offer.monthly_gross,
      basic_salary: offer.basic_salary,
      hra: offer.hra,
      special_allowance: offer.special_allowance,
      provident_fund: offer.provident_fund,
      transport_allowance: offer.transport_allowance || '',
      medical_allowance: offer.medical_allowance || '',
      other_allowances: offer.other_allowances || '',
      gratuity: offer.gratuity || '',
      variable_pay: offer.variable_pay || '',
      employee_pf_deduction: offer.employee_pf_deduction || '',
      employer_esi: offer.employer_esi || '',
      employee_esi: offer.employee_esi || '',
      professional_tax: offer.professional_tax || '',
      other_deductions: offer.other_deductions || '',
      policy_version: offer.policy_version || '',
      annexures: offer.annexures || [],
      joining_date: offer.joining_date,
      offer_validity_date: offer.offer_validity_date || '',
      probation_period_months: offer.probation_period_months,
      notice_period_days: offer.notice_period_days,
      status: offer.status,
      terms_and_conditions: offer.terms_and_conditions || '',
    });
    setShowModal(true);
  };

  // Submit Offer Form (Create or Update)
  const handleSubmitForm = async (e, forcedStatus = null) => {
    if (e) e.preventDefault();
    if (!form.candidate_name || !form.candidate_email || !form.job_title || !form.joining_date) {
      showToast('Please fill all mandatory fields (Name, Email, Role, Joining Date).', 'warning');
      return;
    }
    if (forcedStatus === 'Approved') {
      const grossAnnual = (parseFloat(form.monthly_gross) || 0) * 12;
      const componentAnnual = grossAnnual
        + ((parseFloat(form.provident_fund) || 0) + (parseFloat(form.employer_esi) || 0) + (parseFloat(form.gratuity) || 0)) * 12
        + (parseFloat(form.variable_pay) || 0);
      if (!form.policy_version || !form.candidate_address.trim() || !form.reporting_manager_name.trim() || !form.offer_validity_date || grossAnnual <= 0 || (parseFloat(form.offered_ctc) || 0) <= 0 || Math.abs(componentAnnual - (parseFloat(form.offered_ctc) || 0)) > 0.01) {
        showToast('Complete recipient address, reporting manager, deadline, policy, and reconciled compensation before approval.', 'warning');
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        status: forcedStatus || form.status,
        offered_ctc: parseFloat(form.offered_ctc) || 0,
        monthly_gross: parseFloat(form.monthly_gross) || 0,
        basic_salary: parseFloat(form.basic_salary) || 0,
        hra: parseFloat(form.hra) || 0,
        special_allowance: parseFloat(form.special_allowance) || 0,
        provident_fund: parseFloat(form.provident_fund) || 0,
        transport_allowance: parseFloat(form.transport_allowance) || 0,
        medical_allowance: parseFloat(form.medical_allowance) || 0,
        other_allowances: parseFloat(form.other_allowances) || 0,
        gratuity: parseFloat(form.gratuity) || 0,
        variable_pay: parseFloat(form.variable_pay) || 0,
        employee_pf_deduction: parseFloat(form.employee_pf_deduction) || 0,
        employer_esi: parseFloat(form.employer_esi) || 0,
        employee_esi: parseFloat(form.employee_esi) || 0,
        professional_tax: parseFloat(form.professional_tax) || 0,
        other_deductions: parseFloat(form.other_deductions) || 0,
        probation_period_months: parseInt(form.probation_period_months, 10) || 0,
        notice_period_days: parseInt(form.notice_period_days, 10) || 0,
        candidate: form.candidate || null,
        employee: form.employee || null,
        reporting_manager: form.reporting_manager || null,
        policy_version: form.policy_version || null,
      };

      if (editingOfferId) {
        await offerLettersApi.updateOfferLetter(editingOfferId, payload);
        showToast('Offer letter updated successfully.', 'success');
      } else {
        await offerLettersApi.createOfferLetter(payload);
        showToast('Offer letter created successfully.', 'success');
      }

      setShowModal(false);
      loadOffers();
    } catch (err) {
      console.error('Error saving offer letter:', err);
      showToast(err.response?.data?.detail || 'Failed to save offer letter.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Live Preview existing offer
  const handlePreview = async (offer) => {
    setPreviewLoading(true);
    setPreviewTitle(`Preview: Offer Letter – ${offer.candidate_name}`);
    try {
      const res = await offerLettersApi.getPreviewPdf(offer.id);
      if (previewPdfUrl) URL.revokeObjectURL(previewPdfUrl);
      setPreviewPdfUrl(URL.createObjectURL(res.data));
    } catch (err) {
      showToast('Failed to load letter preview.', 'error');
    } finally {
      setPreviewLoading(false);
    }
  };

  // Live Preview form draft
  const handlePreviewDraft = async () => {
    setPreviewLoading(true);
    setPreviewTitle(`Draft Preview: ${form.candidate_name || 'Candidate'}`);
    try {
      const res = await offerLettersApi.previewDraftPdf(form);
      if (previewPdfUrl) URL.revokeObjectURL(previewPdfUrl);
      setPreviewPdfUrl(URL.createObjectURL(res.data));
    } catch (err) {
      showToast('Failed to generate draft preview.', 'error');
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePdfPreview = () => {
    if (previewPdfUrl) URL.revokeObjectURL(previewPdfUrl);
    setPreviewPdfUrl(null);
  };

  const handleAuditHistory = async (offer) => {
    setAuditOffer(offer);
    setAuditLoading(true);
    try {
      const response = await offerLettersApi.getAuditHistory(offer.id);
      setAuditEvents(response.data || []);
    } catch (error) {
      setAuditOffer(null);
      showToast(error.response?.data?.detail || 'Could not load offer audit history.', 'error');
    } finally {
      setAuditLoading(false);
    }
  };

  // Approve Offer Letter Action
  const handleApprove = async (offer) => {
    const ok = await showConfirm(`Are you sure you want to approve the offer letter for ${offer.candidate_name}? This will generate the official PDF.`);
    if (!ok) return;

    try {
      const res = await offerLettersApi.approveOfferLetter(offer.id);
      showToast(res.data.detail || 'Offer letter approved.', 'success');
      loadOffers();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to approve offer letter.', 'error');
    }
  };

  const handleSubmitForApproval = async (offer) => {
    const ok = await showConfirm(`Submit the offer for ${offer.candidate_name} for approval?`);
    if (!ok) return;
    try {
      const response = await offerLettersApi.submitOfferForApproval(offer.id);
      showToast(response.data.detail || 'Offer submitted for approval.', 'success');
      loadOffers();
    } catch (error) {
      showToast(error.response?.data?.detail || 'Could not submit offer for approval.', 'error');
    }
  };

  // Issue Offer Letter Action
  const handleIssue = async (offer) => {
    const ok = await showConfirm(`Issue official offer letter for ${offer.candidate_name}?`);
    if (!ok) return;

    try {
      const res = await offerLettersApi.issueOfferLetter(offer.id);
      showToast(res.data.detail || 'Offer letter issued.', 'success');
      loadOffers();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to issue offer letter.', 'error');
    }
  };

  // Send Email Action
  const handleSendEmail = async (force = false) => {
    if (!emailModalOffer) return;
    setSendingEmail(true);
    try {
      const res = await offerLettersApi.sendEmail(emailModalOffer.id, { force });
      showToast(res.data.detail || 'Email queued successfully.', 'success');
      setEmailModalOffer(null);
      loadOffers();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to dispatch email.', 'error');
    } finally {
      setSendingEmail(false);
    }
  };

  // Record Candidate Response
  const handleRecordResponseSubmit = async (e) => {
    e.preventDefault();
    if (!responseModalOffer) return;

    setRecordingResponse(true);
    try {
      const res = await offerLettersApi.recordResponse(responseModalOffer.id, {
        response: responseChoice,
        notes: responseNotes,
      });
      showToast(res.data.detail || 'Candidate response recorded.', 'success');
      setResponseModalOffer(null);
      loadOffers();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to record candidate response.', 'error');
    } finally {
      setRecordingResponse(false);
    }
  };

  // Delete Offer
  const handleDelete = async (offer) => {
    const ok = await showConfirm(`Delete offer letter ${offer.reference_number}?`);
    if (!ok) return;

    try {
      await offerLettersApi.deleteOfferLetter(offer.id);
      showToast('Offer letter deleted.', 'success');
      loadOffers();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to delete offer letter.', 'error');
    }
  };

  // Filtered List
  const filteredOffers = offers.filter((o) => {
    const term = search.toLowerCase();
    const matchSearch =
      (o.candidate_name || '').toLowerCase().includes(term) ||
      (o.candidate_email || '').toLowerCase().includes(term) ||
      (o.job_title || '').toLowerCase().includes(term) ||
      (o.reference_number || '').toLowerCase().includes(term);
    return matchSearch;
  });

  // Calculate Statistics
  const stats = {
    total: offers.length,
    draft: offers.filter((o) => o.status === 'Draft').length,
    approved: offers.filter((o) => o.status === 'Approved').length,
    issued: offers.filter((o) => o.status === 'Issued').length,
    sent: offers.filter((o) => o.status === 'Sent' || o.email_status === 'Sent').length,
    accepted: offers.filter((o) => o.status === 'Accepted').length,
    rejected: offers.filter((o) => o.status === 'Rejected').length,
  };

  return (
    <div className="ol-container">
      {/* Header */}
      <div className="ol-header">
        <div>
          <h2 className="ol-title">Offer Letters Management</h2>
          <p className="ol-subtitle">
            Generate, approve, issue, and dispatch official employment offers with professional corporate letterheads via company email.
          </p>
        </div>

        {isHrOrMd && (
          <div className="ol-header-actions">
            <button type="button" className="ol-action-btn" onClick={() => navigate('/offer-policy-templates')}>
              <i className="fa-solid fa-file-shield"></i> Policy Templates
            </button>
            <button type="button" className="ol-btn-primary" onClick={handleOpenCreateModal}>
              <i className="fa-solid fa-file-circle-plus"></i> Create New Offer
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="ol-stats-grid">
        <div className="ol-stat-card">
          <div className="ol-stat-icon total"><i className="fa-solid fa-file-contract"></i></div>
          <div>
            <div className="ol-stat-val">{stats.total}</div>
            <div className="ol-stat-label">Total Offers</div>
          </div>
        </div>
        <div className="ol-stat-card">
          <div className="ol-stat-icon draft"><i className="fa-solid fa-pen-ruler"></i></div>
          <div>
            <div className="ol-stat-val">{stats.draft}</div>
            <div className="ol-stat-label">Drafts</div>
          </div>
        </div>
        <div className="ol-stat-card">
          <div className="ol-stat-icon approved"><i className="fa-solid fa-check-double"></i></div>
          <div>
            <div className="ol-stat-val">{stats.approved}</div>
            <div className="ol-stat-label">Approved</div>
          </div>
        </div>
        <div className="ol-stat-card">
          <div className="ol-stat-icon issued"><i className="fa-solid fa-stamp"></i></div>
          <div>
            <div className="ol-stat-val">{stats.issued}</div>
            <div className="ol-stat-label">Issued</div>
          </div>
        </div>
        <div className="ol-stat-card">
          <div className="ol-stat-icon sent"><i className="fa-solid fa-paper-plane"></i></div>
          <div>
            <div className="ol-stat-val">{stats.sent}</div>
            <div className="ol-stat-label">Emailed</div>
          </div>
        </div>
        <div className="ol-stat-card">
          <div className="ol-stat-icon accepted"><i className="fa-solid fa-user-check"></i></div>
          <div>
            <div className="ol-stat-val">{stats.accepted}</div>
            <div className="ol-stat-label">Accepted</div>
          </div>
        </div>
        <div className="ol-stat-card">
          <div className="ol-stat-icon rejected"><i className="fa-solid fa-user-xmark"></i></div>
          <div>
            <div className="ol-stat-val">{stats.rejected}</div>
            <div className="ol-stat-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="ol-controls-bar">
        <div className="ol-search-box">
          <input
            type="text"
            className="ol-input"
            placeholder="Search candidate name, email, job role, or ref number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="ol-status-filters">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`ol-filter-btn ${statusFilter === opt.value ? 'active' : ''}`}
              onClick={() => setStatusFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="ol-table-container">
        <div className="ol-table-scroll">
          <table className="ol-table">
            <thead>
              <tr>
                <th>Candidate &amp; Role</th>
                <th>Compensation (CTC)</th>
                <th>Joining Date</th>
                <th>Ref Number</th>
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
                    <div>Loading offer letters...</div>
                  </td>
                </tr>
              ) : filteredOffers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    <i className="fa-solid fa-envelope-open-text" style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }}></i>
                    No offer letters found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredOffers.map((offer) => {
                  const isSent = offer.email_status === 'Sent';
                  const isFailed = offer.email_status === 'Failed';
                  const isSending = offer.email_status === 'Sending';
                  const isAccepted = offer.status === 'Accepted';
                  const policyForOffer = policyVersions.find((policy) => String(policy.id) === String(offer.policy_version));
                  const mdApprovalRequired = offer.policy_snapshot?.requires_md_approval ?? policyForOffer?.requires_md_approval ?? true;
                  const canApproveOffer = isHrOrMd && (!mdApprovalRequired || role === 'MD');
                  const canIssueOffer = isHrOrMd && (!mdApprovalRequired || role === 'MD');

                  return (
                    <tr key={offer.id}>
                      {/* Candidate & Role */}
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{offer.candidate_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600 }}>{offer.job_title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{offer.candidate_email}</div>
                      </td>

                      {/* Compensation */}
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          ₹{parseFloat(offer.offered_ctc || 0).toLocaleString('en-IN')} <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 400 }}>/yr</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          ₹{parseFloat(offer.monthly_gross || 0).toLocaleString('en-IN')}/mo
                        </div>
                      </td>

                      {/* Joining Date */}
                      <td>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{offer.joining_date}</div>
                        {offer.offer_validity_date && (
                          <div style={{ fontSize: '0.72rem', color: '#e11d48' }}>
                            Valid till {offer.offer_validity_date}
                          </div>
                        )}
                      </td>

                      {/* Reference Number */}
                      <td style={{ color: '#475569', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        {offer.reference_number}
                      </td>

                      {/* Status Badge */}
                      <td>
                        <span className={`ol-badge ${offer.status.replace(/\s+/g, '')}`}>
                          {offer.status}
                        </span>
                      </td>

                      {/* Email Status */}
                      <td>
                        <span className={`ol-email-badge ${offer.email_status.replace(/\s+/g, '')}`}>
                          {isSent ? '✓ Emailed' : isFailed ? '⚠ Failed' : isSending ? '↻ Sending' : '• Not Sent'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="ol-actions-cell">
                          {/* Live HTML Preview */}
                          <button
                            type="button"
                            className="ol-action-btn"
                            title="Preview Letter"
                            onClick={() => handlePreview(offer)}
                          >
                            <i className="fa-regular fa-eye"></i> Preview
                          </button>

                          <button
                            type="button"
                            className="ol-action-btn"
                            title="View document audit history"
                            onClick={() => handleAuditHistory(offer)}
                          >
                            <i className="fa-solid fa-clock-rotate-left"></i> History
                          </button>

                          {/* PDF Download */}
                          {offer.pdf_url ? (
                            <a
                              href={offerLettersApi.getDownloadUrl(offer.id)}
                              target="_blank"
                              rel="noreferrer"
                              className="ol-action-btn"
                              title="Download PDF"
                            >
                              <i className="fa-regular fa-file-pdf"></i> PDF
                            </a>
                          ) : null}

                          {/* Edit (if Draft/Pending) */}
                          {isHrOrMd && offer.status === 'Draft' && (
                            <button
                              type="button"
                              className="ol-action-btn"
                              title="Edit Offer"
                              onClick={() => handleOpenEditModal(offer)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          )}

                          {isHrOrMd && offer.status === 'Draft' && (
                            <button
                              type="button"
                              className="ol-action-btn"
                              title="Submit offer for approval"
                              onClick={() => handleSubmitForApproval(offer)}
                            >
                              <i className="fa-solid fa-share-from-square"></i> Submit
                            </button>
                          )}

                          {/* Approve submitted offer */}
                          {canApproveOffer && ['Draft', 'Pending Approval'].includes(offer.status) && (
                            <button
                              type="button"
                              className="ol-action-btn primary"
                              title="Approve & Generate PDF"
                              onClick={() => handleApprove(offer)}
                            >
                              <i className="fa-solid fa-check"></i> Approve
                            </button>
                          )}

                          {canIssueOffer && offer.status === 'Approved' && (
                            <button
                              type="button"
                              className="ol-action-btn success"
                              title="Issue the approved offer"
                              onClick={() => handleIssue(offer)}
                            >
                              <i className="fa-solid fa-stamp"></i> Issue
                            </button>
                          )}

                          {/* Send Email */}
                          {isHrOrMd && ['Approved', 'Issued', 'Sent', 'Accepted'].includes(offer.status) && (
                            <button
                              type="button"
                              className={`ol-action-btn ${isSent ? '' : 'primary'}`}
                              title={isSent ? 'Resend Offer Email' : 'Send Official Offer Email'}
                              onClick={() => setEmailModalOffer(offer)}
                            >
                              <i className="fa-solid fa-envelope"></i> {isSent ? 'Resend' : 'Email'}
                            </button>
                          )}

                          {/* Record Candidate Acceptance/Rejection */}
                          {isHrOrMd && ['Issued', 'Sent'].includes(offer.status) && (
                            <button
                              type="button"
                              className="ol-action-btn success"
                              title="Record Candidate Acceptance / Rejection"
                              onClick={() => {
                                setResponseModalOffer(offer);
                                setResponseChoice('Accepted');
                                setResponseNotes('');
                              }}
                            >
                              <i className="fa-solid fa-user-check"></i> Response
                            </button>
                          )}

                          {/* 1-Click Create Joining Letter for Accepted Offers */}
                          {isHrOrMd && isAccepted && (
                            <button
                              type="button"
                              className="ol-action-btn success"
                              title="Create Joining Letter from this Accepted Offer"
                              onClick={() => navigate('/joining-letters', { state: { prefillOffer: offer } })}
                            >
                              <i className="fa-solid fa-file-signature"></i> Joining Letter
                            </button>
                          )}

                          {/* Delete (if Draft) */}
                          {isHrOrMd && offer.status === 'Draft' && (
                            <button
                              type="button"
                              className="ol-action-btn danger"
                              title="Delete Draft"
                              onClick={() => handleDelete(offer)}
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

      {/* CREATE / EDIT OFFER MODAL */}
      {showModal && (
        <div className="ol-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && !saving) setShowModal(false); }}>
          <div className="ol-modal">
            <div className="ol-modal-header">
              <h3 className="ol-modal-title">
                {editingOfferId ? 'Edit Offer Letter' : 'Create Official Offer Letter'}
              </h3>
              <button type="button" className="ol-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmitForm} className="ol-modal-body">
              {/* Candidate Source Selection */}
              {!editingOfferId && (
                <div>
                  <label className="ol-label">Candidate Source</label>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="radio"
                        name="sourceType"
                        value="candidate"
                        checked={sourceType === 'candidate'}
                        onChange={() => setSourceType('candidate')}
                      />
                      Select from Recruitment Candidates
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
                      Enter New Candidate Details
                    </label>
                  </div>

                  {sourceType === 'candidate' && (
                    <select
                      className="ol-select"
                      value={form.candidate}
                      onChange={(e) => handleCandidateSelect(e.target.value)}
                    >
                      <option value="">-- Choose Candidate from Recruitment --</option>
                      {candidates.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.full_name || `${c.first_name} ${c.last_name}`} — {c.job_role || 'No Role'} ({c.email})
                        </option>
                      ))}
                    </select>
                  )}

                  {sourceType === 'employee' && (
                    <select
                      className="ol-select"
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

              {/* Candidate Info */}
              <div className="ol-form-row">
                <div>
                  <label className="ol-label">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    className="ol-input"
                    value={form.candidate_name}
                    onChange={(e) => setForm({ ...form, candidate_name: e.target.value })}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="ol-label">Candidate Email *</label>
                  <input
                    type="email"
                    required
                    className="ol-input"
                    value={form.candidate_email}
                    onChange={(e) => setForm({ ...form, candidate_email: e.target.value })}
                    placeholder="e.g. candidate@example.com"
                  />
                </div>
              </div>

              <div className="ol-form-row">
                <div>
                  <label className="ol-label">Contact Phone</label>
                  <input
                    type="text"
                    className="ol-input"
                    value={form.candidate_phone}
                    onChange={(e) => setForm({ ...form, candidate_phone: e.target.value })}
                    placeholder="e.g. +91 9876543210"
                  />
                </div>
                <div>
                  <label className="ol-label">Candidate Address</label>
                  <input
                    type="text"
                    className="ol-input"
                    value={form.candidate_address}
                    onChange={(e) => setForm({ ...form, candidate_address: e.target.value })}
                    placeholder="e.g. Hyderabad, Telangana"
                  />
                </div>
              </div>

              {/* Position Info */}
              <div className="ol-form-row">
                <div>
                  <label className="ol-label">Job Title / Designation *</label>
                  <input
                    type="text"
                    required
                    className="ol-input"
                    value={form.job_title}
                    onChange={(e) => setForm({ ...form, job_title: e.target.value })}
                    placeholder="e.g. Senior Full Stack Developer"
                  />
                </div>
                <div>
                  <label className="ol-label">Department *</label>
                  <select
                    className="ol-select"
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

              <div className="ol-form-row three">
                <div>
                  <label className="ol-label">Employment Type</label>
                  <select
                    className="ol-select"
                    value={form.employment_type}
                    onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Fixed-term">Fixed-term</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="ol-label">Work Location</label>
                  <input
                    type="text"
                    className="ol-input"
                    value={form.work_location}
                    onChange={(e) => setForm({ ...form, work_location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="ol-label">Reporting Manager</label>
                  <select
                    className="ol-select"
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
              </div>

              <div className="ol-form-row">
                <div>
                  <label className="ol-label">Employee Category</label>
                  <select
                    className="ol-select"
                    value={form.employment_category}
                    onChange={(e) => setForm({ ...form, employment_category: e.target.value, policy_version: '', annexures: [] })}
                  >
                    <option value="General">General</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                    <option value="Senior">Senior</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="ol-label">Approved Policy Version *</label>
                  <select
                    className="ol-select"
                    value={form.policy_version}
                    onChange={(e) => {
                      const selectedPolicy = policyVersions.find((policy) => String(policy.id) === e.target.value);
                      setForm({
                        ...form,
                        policy_version: e.target.value,
                        annexures: (selectedPolicy?.annexures || []).filter((item) => item.enabled !== false).map((item) => item.code),
                      });
                    }}
                  >
                    <option value="">Select a published version</option>
                    {policyVersions.filter((policy) => (policy.employment_category === 'All' || policy.employment_category === form.employment_category) && (policy.employment_type === 'All' || policy.employment_type === form.employment_type)).map((policy) => (
                      <option key={policy.id} value={policy.id}>{policy.name} {policy.version} · {policy.employment_category} · {policy.employment_type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {form.policy_version && (() => {
                const selectedPolicy = policyVersions.find((policy) => String(policy.id) === String(form.policy_version));
                const options = (selectedPolicy?.annexures || []).filter((item) => item.enabled !== false);
                return options.length > 0 && (
                  <fieldset className="ol-annexure-options">
                    <legend className="ol-label">Included Annexures</legend>
                    {options.map((annexure) => (
                      <label key={annexure.code}>
                        <input
                          type="checkbox"
                          checked={form.annexures.includes(annexure.code)}
                          disabled={['B', 'C', 'D'].includes(annexure.code)}
                          onChange={(e) => setForm({
                            ...form,
                            annexures: e.target.checked
                              ? [...form.annexures, annexure.code]
                              : form.annexures.filter((code) => code !== annexure.code),
                          })}
                        />
                        {annexure.code} · {annexure.title}
                      </label>
                    ))}
                  </fieldset>
                );
              })()}

              {/* Compensation Breakdown Box */}
              <div className="ol-salary-calculator-box">
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e3a8a', marginBottom: '10px' }}>
                  <i className="fa-solid fa-calculator"></i> Compensation (INR)
                </div>
                <div className="ol-form-row">
                  <div>
                    <label className="ol-label">Annual CTC (INR) *</label>
                    <input
                      type="number"
                      required
                      className="ol-input"
                      value={form.offered_ctc}
                      onChange={(e) => handleCtcChange(e.target.value)}
                      placeholder="e.g. 600000"
                    />
                  </div>
                  <div>
                    <label className="ol-label">Monthly Gross (Component Total)</label>
                    <input
                      type="number"
                      className="ol-input"
                      value={form.monthly_gross}
                      readOnly
                    />
                  </div>
                </div>

                <div className="ol-form-row" style={{ marginTop: '10px' }}>
                  <div>
                    <label className="ol-label">Basic Salary (Monthly)</label>
                    <input
                      type="number"
                      className="ol-input"
                      value={form.basic_salary}
                      onChange={(e) => handleSalaryComponentChange('basic_salary', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="ol-label">HRA (Monthly)</label>
                    <input
                      type="number"
                      className="ol-input"
                      value={form.hra}
                      onChange={(e) => handleSalaryComponentChange('hra', e.target.value)}
                    />
                  </div>
                </div>

                <div className="ol-form-row" style={{ marginTop: '10px' }}>
                  <div>
                    <label className="ol-label">Special Allowance (Monthly)</label>
                    <input
                      type="number"
                      className="ol-input"
                      value={form.special_allowance}
                      onChange={(e) => handleSalaryComponentChange('special_allowance', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="ol-label">Provident Fund (PF Monthly)</label>
                    <input
                      type="number"
                      className="ol-input"
                      value={form.provident_fund}
                      onChange={(e) => setForm({ ...form, provident_fund: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ol-form-row" style={{ marginTop: '10px' }}>
                  <div>
                    <label className="ol-label">Transport Allowance (Monthly)</label>
                    <input type="number" className="ol-input" value={form.transport_allowance} onChange={(e) => handleSalaryComponentChange('transport_allowance', e.target.value)} />
                  </div>
                  <div>
                    <label className="ol-label">Medical Allowance (Monthly)</label>
                    <input type="number" className="ol-input" value={form.medical_allowance} onChange={(e) => handleSalaryComponentChange('medical_allowance', e.target.value)} />
                  </div>
                </div>

                <div className="ol-form-row" style={{ marginTop: '10px' }}>
                  <div>
                    <label className="ol-label">Other Allowances (Monthly)</label>
                    <input type="number" className="ol-input" value={form.other_allowances} onChange={(e) => handleSalaryComponentChange('other_allowances', e.target.value)} />
                  </div>
                  <div>
                    <label className="ol-label">Gratuity Provision (Monthly)</label>
                    <input type="number" className="ol-input" value={form.gratuity} onChange={(e) => setForm({ ...form, gratuity: e.target.value })} />
                  </div>
                </div>

                <div className="ol-form-row" style={{ marginTop: '10px' }}>
                  <div>
                    <label className="ol-label">Variable Pay / Bonus (Annual)</label>
                    <input type="number" className="ol-input" value={form.variable_pay} onChange={(e) => setForm({ ...form, variable_pay: e.target.value })} />
                  </div>
                  <div>
                    <label className="ol-label">Employer ESI Contribution (Monthly, if applicable)</label>
                    <input type="number" className="ol-input" value={form.employer_esi} onChange={(e) => setForm({ ...form, employer_esi: e.target.value })} />
                  </div>
                </div>

                <div className="ol-form-row" style={{ marginTop: '10px' }}>
                  <div>
                    <label className="ol-label">Employee PF Deduction (Monthly, if applicable)</label>
                    <input type="number" className="ol-input" value={form.employee_pf_deduction} onChange={(e) => setForm({ ...form, employee_pf_deduction: e.target.value })} />
                  </div>
                  <div>
                    <label className="ol-label">Employee ESI Deduction (Monthly, if applicable)</label>
                    <input type="number" className="ol-input" value={form.employee_esi} onChange={(e) => setForm({ ...form, employee_esi: e.target.value })} />
                  </div>
                </div>

                <div className="ol-form-row" style={{ marginTop: '10px' }}>
                  <div>
                    <label className="ol-label">Professional Tax (Monthly, if applicable)</label>
                    <input type="number" className="ol-input" value={form.professional_tax} onChange={(e) => setForm({ ...form, professional_tax: e.target.value })} />
                  </div>
                  <div>
                    <label className="ol-label">Other Known Deductions (Monthly)</label>
                    <input type="number" className="ol-input" value={form.other_deductions} onChange={(e) => setForm({ ...form, other_deductions: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Dates & Periods */}
              <div className="ol-form-row">
                <div>
                  <label className="ol-label">Proposed Joining Date *</label>
                  <input
                    type="date"
                    required
                    className="ol-input"
                    value={form.joining_date}
                    onChange={(e) => setForm({ ...form, joining_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="ol-label">Offer Validity Deadline</label>
                  <input
                    type="date"
                    className="ol-input"
                    value={form.offer_validity_date}
                    onChange={(e) => setForm({ ...form, offer_validity_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="ol-form-row">
                <div>
                  <label className="ol-label">Probation Period (Months)</label>
                  <input
                    type="number"
                    className="ol-input"
                    value={form.probation_period_months}
                    onChange={(e) => setForm({ ...form, probation_period_months: e.target.value })}
                  />
                </div>
                <div>
                  <label className="ol-label">Notice Period (Days)</label>
                  <input
                    type="number"
                    className="ol-input"
                    value={form.notice_period_days}
                    onChange={(e) => setForm({ ...form, notice_period_days: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="ol-label">Special Terms &amp; Conditions (Optional)</label>
                <textarea
                  className="ol-textarea"
                  placeholder="Leave empty to use standard company appointment terms, or enter customized provisions..."
                  value={form.terms_and_conditions}
                  onChange={(e) => setForm({ ...form, terms_and_conditions: e.target.value })}
                />
              </div>

              {/* Modal Footer */}
              <div className="ol-modal-footer">
                <button
                  type="button"
                  className="ol-action-btn"
                  onClick={handlePreviewDraft}
                  disabled={saving || previewLoading}
                >
                  <i className="fa-regular fa-eye"></i> Preview Draft
                </button>
                <button
                  type="button"
                  className="ol-action-btn"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ol-btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : editingOfferId ? 'Update Offer Letter' : 'Save as Draft'}
                </button>
                {!editingOfferId && (!form.policy_version || !policyVersions.find((policy) => String(policy.id) === String(form.policy_version))?.requires_md_approval || role === 'MD') && (
                  <button
                    type="button"
                    className="ol-action-btn success"
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
      {previewPdfUrl && (
        <div className="ol-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closePdfPreview(); }}>
          <div className="ol-modal preview-modal">
            <div className="ol-modal-header">
              <h3 className="ol-modal-title">{previewTitle}</h3>
              <button type="button" className="ol-modal-close" onClick={closePdfPreview}>✕</button>
            </div>
            <div className="ol-modal-body" style={{ padding: '12px' }}>
              <iframe
                title="Letter Preview"
                src={previewPdfUrl}
                className="ol-preview-frame"
              />
            </div>
            <div className="ol-modal-footer">
              <button type="button" className="ol-action-btn primary" onClick={closePdfPreview}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {auditOffer && (
        <div className="ol-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setAuditOffer(null); }}>
          <div className="ol-modal">
            <div className="ol-modal-header">
              <h3 className="ol-modal-title">Audit History · {auditOffer.reference_number}</h3>
              <button type="button" className="ol-modal-close" onClick={() => setAuditOffer(null)}>✕</button>
            </div>
            <div className="ol-modal-body">
              {auditLoading ? <p>Loading audit events...</p> : auditEvents.length === 0 ? <p>No audit events recorded.</p> : (
                <ol className="ol-audit-list">
                  {auditEvents.map((event, index) => (
                    <li key={`${event.action}-${event.created_at}-${index}`}>
                      <strong>{event.action.replaceAll('_', ' ')}</strong>
                      <span>{event.actor || 'System'} · {new Date(event.created_at).toLocaleString()}</span>
                      {event.details?.policy_version && <small>Policy version: {event.details.policy_version}</small>}
                      {event.details?.response && <small>Candidate response: {event.details.response}</small>}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <div className="ol-modal-footer"><button type="button" className="ol-action-btn primary" onClick={() => setAuditOffer(null)}>Close</button></div>
          </div>
        </div>
      )}

      {/* RECORD CANDIDATE RESPONSE MODAL */}
      {responseModalOffer && (
        <div className="ol-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && !recordingResponse) setResponseModalOffer(null); }}>
          <div className="ol-modal" style={{ maxWidth: '480px' }}>
            <div className="ol-modal-header">
              <h3 className="ol-modal-title">Record Candidate Response</h3>
              <button type="button" className="ol-modal-close" onClick={() => setResponseModalOffer(null)}>✕</button>
            </div>

            <form onSubmit={handleRecordResponseSubmit} className="ol-modal-body">
              <div style={{ fontSize: '0.88rem', color: '#334155' }}>
                Record response for <strong>{responseModalOffer.candidate_name}</strong> ({responseModalOffer.job_title}):
              </div>

              <div>
                <label className="ol-label">Response Decision *</label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600, color: '#15803d' }}>
                    <input
                      type="radio"
                      name="responseChoice"
                      value="Accepted"
                      checked={responseChoice === 'Accepted'}
                      onChange={() => setResponseChoice('Accepted')}
                    />
                    Offer Accepted
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600, color: '#b91c1c' }}>
                    <input
                      type="radio"
                      name="responseChoice"
                      value="Rejected"
                      checked={responseChoice === 'Rejected'}
                      onChange={() => setResponseChoice('Rejected')}
                    />
                    Offer Rejected
                  </label>
                </div>
              </div>

              <div>
                <label className="ol-label">Candidate Notes / Feedback</label>
                <textarea
                  className="ol-textarea"
                  placeholder="e.g. Candidate confirmed joining on Nov 15th via email, or reason for declining..."
                  value={responseNotes}
                  onChange={(e) => setResponseNotes(e.target.value)}
                />
              </div>

              <div className="ol-modal-footer">
                <button
                  type="button"
                  className="ol-action-btn"
                  onClick={() => setResponseModalOffer(null)}
                  disabled={recordingResponse}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`ol-action-btn ${responseChoice === 'Accepted' ? 'success' : 'danger'}`}
                  disabled={recordingResponse}
                >
                  {recordingResponse ? 'Saving...' : `Record ${responseChoice}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEND EMAIL CONFIRMATION MODAL */}
      {emailModalOffer && (
        <div className="ol-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && !sendingEmail) setEmailModalOffer(null); }}>
          <div className="ol-modal" style={{ maxWidth: '520px' }}>
            <div className="ol-modal-header">
              <h3 className="ol-modal-title">
                {emailModalOffer.email_status === 'Sent' ? 'Resend Offer Letter Email' : 'Send Official Offer Letter Email'}
              </h3>
              <button type="button" className="ol-modal-close" onClick={() => setEmailModalOffer(null)}>✕</button>
            </div>

            <div className="ol-modal-body">
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{emailModalOffer.candidate_name}</div>
                <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.85rem' }}>{emailModalOffer.job_title}</div>
                <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '4px' }}>
                  Recipient Email: <strong>{emailModalOffer.candidate_email}</strong>
                </div>
                <div style={{ color: '#64748b', fontSize: '0.82rem' }}>
                  Reference No: <strong>{emailModalOffer.reference_number}</strong>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                The official corporate offer letter with compensation schedule will be attached as a PDF to the email and dispatched via the existing company email service.
              </p>

              {emailModalOffer.email_status === 'Sent' && (
                <div style={{ padding: '8px 12px', background: '#fef3c7', borderRadius: '6px', color: '#92400e', fontSize: '0.8rem', border: '1px solid #fde68a' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i> This offer letter was already sent on {emailModalOffer.email_sent_at ? new Date(emailModalOffer.email_sent_at).toLocaleString() : 'a prior date'}. Resending will re-dispatch the PDF.
                </div>
              )}
            </div>

            <div className="ol-modal-footer">
              <button type="button" className="ol-action-btn" onClick={() => setEmailModalOffer(null)} disabled={sendingEmail}>
                Cancel
              </button>
              <button
                type="button"
                className="ol-btn-primary"
                onClick={() => handleSendEmail(emailModalOffer.email_status === 'Sent')}
                disabled={sendingEmail}
              >
                {sendingEmail ? 'Queuing Email...' : emailModalOffer.email_status === 'Sent' ? 'Force Resend Email' : 'Send Offer Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferLetters;
