import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';
import payrollApi from '../../services/api/payroll';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import SendDocumentEmailModal from '../components/SendDocumentEmailModal';
import './Payslips.css';

const Payslips = () => {
  const { user } = useAuth();
  const { id: routeSlipId } = useParams();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const role = user?.role;

  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'create'
  const [emailModalSlip, setEmailModalSlip] = useState(null);

  // Filter state (for admin/managers)
  const [search, setSearch] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Manual Creation / Edit state (HR/MD only)
  const [editingSlipId, setEditingSlipId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [basicSalary, setBasicSalary] = useState('');
  const [hra, setHra] = useState('');
  const [transportAllowance, setTransportAllowance] = useState('');
  const [medicalAllowance, setMedicalAllowance] = useState('');
  const [specialAllowance, setSpecialAllowance] = useState('');
  const [bonus, setBonus] = useState('');
  const [pfDeduction, setPfDeduction] = useState('');
  const [esiDeduction, setEsiDeduction] = useState('');
  const [profTax, setProfTax] = useState('');
  const [tds, setTds] = useState('');
  const [loanDeduction, setLoanDeduction] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  const [lossOfPay, setLossOfPay] = useState('0.00');

  // Attendance metrics
  const [workingDays, setWorkingDays] = useState('26');
  const [daysPresent, setDaysPresent] = useState('26');
  const [daysAbsent, setDaysAbsent] = useState('0');
  const [leavesTaken, setLeavesTaken] = useState('0');
  const [unpaidLeaveDays, setUnpaidLeaveDays] = useState('0');
  const [halfDays, setHalfDays] = useState('0');
  const [holidaysCount, setHolidaysCount] = useState('0');
  const [weekOffsCount, setWeekOffsCount] = useState('0');
  const [sandwichLeaveDays, setSandwichLeaveDays] = useState('0');

  const [payslipStatus, setPayslipStatus] = useState('Pending Approval');
  const [isPublished, setIsPublished] = useState(false);
  const [paymentDate, setPaymentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [calculating, setCalculating] = useState(false);

  // Detail Modal state
  const [selectedSlipDetail, setSelectedSlipDetail] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const loadPayslips = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (monthFilter) params.month = monthFilter;
      if (yearFilter) params.year = yearFilter;
      if (statusFilter) params.status = statusFilter;
      const res = await payrollApi.getPayslips(params);
      setPayslips(res.data);
    } catch (err) {
      console.error('Error loading payslips:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await api.get('/api/users/', { params: { scope: 'directory' } });
      setEmployees(res.data || []);
    } catch (err) {
      console.error('Error loading employees list:', err);
    }
  };

  useEffect(() => {
    loadPayslips();
    if (['HR', 'MD'].includes(role)) {
      loadEmployees();
    }
  }, [search, monthFilter, yearFilter, statusFilter]);

  // Load single payslip if URL parameter :id is present
  useEffect(() => {
    if (routeSlipId) {
      payrollApi.getPayslip(routeSlipId)
        .then((res) => {
          setSelectedSlipDetail(res.data);
        })
        .catch(() => {
          showToast('Requested payslip could not be loaded or access denied.', 'error');
        });
    }
  }, [routeSlipId]);

  const resetForm = () => {
    setEditingSlipId(null);
    setSelectedEmp('');
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
    setBasicSalary('');
    setHra('');
    setTransportAllowance('');
    setMedicalAllowance('');
    setSpecialAllowance('');
    setBonus('');
    setPfDeduction('');
    setEsiDeduction('');
    setProfTax('');
    setTds('');
    setLoanDeduction('');
    setOtherDeductions('');
    setLossOfPay('0.00');
    setWorkingDays('26');
    setDaysPresent('26');
    setDaysAbsent('0');
    setLeavesTaken('0');
    setUnpaidLeaveDays('0');
    setHalfDays('0');
    setHolidaysCount('0');
    setWeekOffsCount('0');
    setSandwichLeaveDays('0');
    setPayslipStatus('Pending Approval');
    setIsPublished(false);
    setPaymentDate('');
    setNotes('');
  };

  const handleEditPayslip = (slip) => {
    setEditingSlipId(slip.id);
    setSelectedEmp(slip.employee);
    setMonth(slip.month);
    setYear(slip.year);
    setBasicSalary(slip.basic_salary || '0.00');
    setHra(slip.hra || '0.00');
    setTransportAllowance(slip.transport_allowance || '0.00');
    setMedicalAllowance(slip.medical_allowance || '0.00');
    setSpecialAllowance(slip.special_allowance || '0.00');
    setBonus(slip.bonus || '0.00');
    setPfDeduction(slip.pf_deduction || '0.00');
    setEsiDeduction(slip.esi_deduction || '0.00');
    setProfTax(slip.professional_tax || '0.00');
    setTds(slip.tds || '0.00');
    setLoanDeduction(slip.loan_deduction || '0.00');
    setOtherDeductions(slip.other_deductions || '0.00');
    setLossOfPay(slip.loss_of_pay || '0.00');
    setWorkingDays(String(slip.working_days || 26));
    setDaysPresent(String(slip.days_present || 26));
    setDaysAbsent(String(slip.days_absent || 0));
    setLeavesTaken(String(slip.leaves_taken || 0));
    setUnpaidLeaveDays(String(slip.unpaid_leave_days || 0));
    setHalfDays(String(slip.half_days || 0));
    setHolidaysCount(String(slip.holidays || 0));
    setWeekOffsCount(String(slip.week_offs || 0));
    setSandwichLeaveDays(String(slip.sandwich_leave_days || 0));
    setPayslipStatus(slip.status === 'Rejected' ? 'Pending Approval' : slip.status);
    setIsPublished(slip.is_published || false);
    setPaymentDate(slip.payment_date || '');
    setNotes(slip.notes || '');
    setActiveTab('create');
  };

  const handleAutoCalculate = async () => {
    if (!selectedEmp) {
      showToast('Please select an employee first.', 'warning');
      return;
    }
    setCalculating(true);
    try {
      const res = await payrollApi.calculatePayroll({ employee_id: selectedEmp, month, year });
      const d = res.data;
      setBasicSalary(d.basic_salary || '0.00');
      setHra(d.hra || '0.00');
      setTransportAllowance(d.transport_allowance || '0.00');
      setMedicalAllowance(d.medical_allowance || '0.00');
      setSpecialAllowance(d.special_allowance || '0.00');
      setBonus(d.bonus || '0.00');
      setPfDeduction(d.pf_deduction || '0.00');
      setEsiDeduction(d.esi_deduction || '0.00');
      setProfTax(d.professional_tax || '0.00');
      setTds(d.tds || '0.00');
      setOtherDeductions(d.other_deductions || '0.00');
      setLossOfPay(String(d.loss_of_pay || '0.00'));

      setWorkingDays(String(d.working_days || 26));
      setDaysPresent(String(d.present_days || 26));
      setDaysAbsent(String(d.absent_days || 0));
      setLeavesTaken(String(d.paid_leaves || 0));
      setUnpaidLeaveDays(String(d.unpaid_leaves || 0));
      setHalfDays(String(d.half_days || 0));
      setHolidaysCount(String(d.holidays || 0));
      setWeekOffsCount(String(d.week_offs || 0));
      setSandwichLeaveDays(String(d.sandwich_leave_days || 0));

      showToast('Attendance and structure-based calculations loaded.', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to auto-calculate payroll metrics.', 'error');
    } finally {
      setCalculating(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        employee: selectedEmp,
        month,
        year,
        basic_salary: basicSalary,
        hra,
        transport_allowance: transportAllowance,
        medical_allowance: medicalAllowance,
        special_allowance: specialAllowance,
        bonus,
        pf_deduction: pfDeduction,
        esi_deduction: esiDeduction,
        professional_tax: profTax,
        tds,
        loan_deduction: loanDeduction,
        other_deductions: otherDeductions,
        loss_of_pay: lossOfPay,
        working_days: workingDays,
        days_present: daysPresent,
        days_absent: daysAbsent,
        leaves_taken: leavesTaken,
        unpaid_leave_days: unpaidLeaveDays,
        half_days: halfDays,
        holidays: holidaysCount,
        week_offs: weekOffsCount,
        sandwich_leave_days: sandwichLeaveDays,
        status: payslipStatus,
        is_published: isPublished && (payslipStatus === 'Approved' || payslipStatus === 'Paid'),
        payment_date: paymentDate,
        notes,
      };

      if (editingSlipId) {
        await payrollApi.updatePayslip(editingSlipId, payload);
        showToast('Payslip updated and regenerated successfully.', 'success');
      } else {
        await payrollApi.createPayslip(payload);
        showToast('Payslip generated successfully.', 'success');
      }

      resetForm();
      setActiveTab('list');
      loadPayslips();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to save payslip.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async (slipId) => {
    const isConfirmed = await showConfirm('Approve this payslip? It will become visible in the employee portal and the PDF will be queued for email delivery.');
    if (!isConfirmed) return;
    try {
      const res = await payrollApi.approvePayslip(slipId);
      showToast(res.data?.detail || 'Payslip approved and queued for email delivery.', 'success');
      loadPayslips();
      if (selectedSlipDetail?.id === slipId) {
        setSelectedSlipDetail(prev => prev ? { ...prev, status: 'Approved', is_published: true, email_status: 'Sending' } : null);
      }
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to approve payslip.', 'error');
    }
  };

  const handleReject = async (slipId) => {
    const reason = window.prompt('Enter reason for rejecting this payslip:');
    if (reason === null) return;
    try {
      const res = await payrollApi.rejectPayslip(slipId, reason || 'Rejected by HR');
      showToast(res.data?.detail || 'Payslip rejected.', 'success');
      loadPayslips();
      if (selectedSlipDetail?.id === slipId) {
        setSelectedSlipDetail(prev => prev ? { ...prev, status: 'Rejected', is_published: false, rejection_reason: reason } : null);
      }
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to reject payslip.', 'error');
    }
  };

  const handleOpenSendEmail = (slip) => {
    setEmailModalSlip({
      id: slip.id,
      title: `Salary Statement — ${slip.month_name} ${slip.year}`,
      documentType: 'payslip',
      recipientName: slip.employee_name || slip.employee_emp_id || 'Staff Member',
      recipientEmail: slip.employee_email || '',
      empId: slip.employee_emp_id || '',
      emailStatus: slip.email_status || 'Not Sent',
      emailSentAt: slip.email_sent_at,
      emailError: slip.email_error,
      sendFn: (id, opts) => payrollApi.sendEmail(id, opts),
    });
  };

  const handleEmailSuccess = (res) => {
    showToast(res.detail || 'Payslip email queued for delivery.', 'success');
    loadPayslips();
    if (selectedSlipDetail?.id === emailModalSlip?.id) {
      setSelectedSlipDetail((prev) => (prev ? { ...prev, email_status: 'Sending' } : null));
    }
  };

  const handleDownloadPdf = async (slip) => {
    setDownloadingId(slip.id);
    try {
      showToast('Generating and downloading payslip PDF...', 'info');
      const res = await payrollApi.downloadPayslipPdf(slip.id);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const empName = (slip.employee_name || slip.employee_emp_id || 'Staff').replace(/\s+/g, '_');
      a.download = `Payslip_${empName}_${slip.month_name}_${slip.year}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      showToast('Failed to download payslip PDF.', 'error');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await showConfirm('Are you sure you want to delete this payslip record?');
    if (!isConfirmed) return;
    try {
      await payrollApi.deletePayslip(id);
      showToast('Payslip deleted.', 'success');
      loadPayslips();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to delete payslip.', 'error');
    }
  };

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Salary Registry</h2>

      {/* Tabs */}
      {['HR', 'MD'].includes(role) && (
        <div className="payslip-tabs">
          <div
            className={`payslip-tab ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('list');
              if (editingSlipId) resetForm();
            }}
          >
            📋 Payslips Registry
          </div>
          <div
            className={`payslip-tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            {editingSlipId ? '✍️ Correct / Edit Payslip' : '✍️ Manual Payslip Generation'}
          </div>
        </div>
      )}

      {/* 1. LIST VIEW */}
      {activeTab === 'list' && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h2>Published Slips</h2>
            {role !== 'Employee' && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search staff name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px' }}
                />
                <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px' }}>
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px' }}>
                  <option value="">Year</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px' }}>
                  <option value="">Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Paid">Paid</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            )}
          </div>
          <div className="panel-body">
            {loading ? (
              <div>Loading salary records...</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Staff</th>
                      <th>Period</th>
                      <th>Gross earnings</th>
                      <th>Deductions</th>
                      <th>Net Salary</th>
                      <th>Status</th>
                      {['HR', 'MD'].includes(role) && <th>Email Delivery</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payslips.length > 0 ? (
                      payslips.map((p) => {
                        const grossVal = p.gross_salary != null ? parseFloat(p.gross_salary) : (
                          parseFloat(p.basic_salary || 0) + parseFloat(p.hra || 0) + parseFloat(p.transport_allowance || 0) + parseFloat(p.medical_allowance || 0) + parseFloat(p.special_allowance || 0) + parseFloat(p.bonus || 0)
                        );
                        const dedVal = p.total_deductions != null ? parseFloat(p.total_deductions) : (
                          parseFloat(p.pf_deduction || 0) + parseFloat(p.esi_deduction || 0) + parseFloat(p.professional_tax || 0) + parseFloat(p.tds || 0) + parseFloat(p.loan_deduction || 0) + parseFloat(p.other_deductions || 0)
                        );
                        return (
                          <tr key={p.id}>
                            <td style={{ fontWeight: 600 }}>
                              {p.employee_name || p.employee_emp_id || 'Employee'}
                              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'normal' }}>
                                {p.designation} {p.employee_emp_id ? `• ${p.employee_emp_id}` : ''}
                              </div>
                            </td>
                            <td>{p.month_name} {p.year}</td>
                            <td>₹{grossVal.toFixed(2)}</td>
                            <td>₹{dedVal.toFixed(2)}</td>
                            <td style={{ fontWeight: 700, color: 'var(--success)' }}>₹{p.net_salary}</td>
                            <td>
                              <span className={`badge-capsule ${p.status === 'Paid' || p.status === 'Approved' ? 'success' : p.status === 'Rejected' ? 'danger' : 'warning'}`}>
                                {p.status}
                              </span>
                            </td>
                            {['HR', 'MD'].includes(role) && (
                              <td>
                                <span className={`email-status-pill ${p.email_status === 'Sent' ? 'sent' : p.email_status === 'Failed' ? 'failed' : p.email_status === 'Sending' ? 'sending' : 'notsent'}`} title={p.email_error || p.email_sent_at || ''}>
                                  {p.email_status === 'Sent' ? '✓ Emailed' : p.email_status === 'Failed' ? '⚠ Failed' : p.email_status === 'Sending' ? '↻ Sending' : '• Not Sent'}
                                </span>
                              </td>
                            )}
                            <td>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <button className="btn-action-icon" onClick={() => setSelectedSlipDetail(p)} title="View Summary">
                                  👁 Details
                                </button>
                                
                                <button
                                  className="btn-action-icon download"
                                  onClick={() => handleDownloadPdf(p)}
                                  disabled={downloadingId === p.id}
                                  title="Download Official PDF"
                                >
                                  {downloadingId === p.id ? '⌛' : '⬇ PDF'}
                                </button>

                                {['HR', 'MD'].includes(role) && (
                                  <>
                                    {(p.status === 'Pending Approval' || p.status === 'Draft' || p.status === 'Generated' || p.status === 'Rejected') && (
                                      <>
                                        <button className="btn-action-icon approve" onClick={() => handleApprove(p.id)} title="Approve & Publish to Employee">
                                          ✓ Approve
                                        </button>
                                        {p.status !== 'Rejected' && (
                                          <button className="btn-action-icon reject" onClick={() => handleReject(p.id)} title="Reject with remarks">
                                            ✕ Reject
                                          </button>
                                        )}
                                        <button className="btn-action-icon edit" onClick={() => handleEditPayslip(p)} title="Edit and Recalculate">
                                          ✎ Edit
                                        </button>
                                      </>
                                    )}

                                    {(p.status === 'Approved' || p.status === 'Paid') && (
                                      <button
                                        className={`btn-action-icon email ${p.email_status === 'Failed' ? 'failed' : p.email_status === 'Sent' ? 'resend' : ''}`}
                                        onClick={() => handleOpenSendEmail(p)}
                                        disabled={p.email_status === 'Sending'}
                                        title={
                                          p.email_status === 'Sending'
                                            ? 'Delivery in progress...'
                                            : p.email_status === 'Sent'
                                            ? 'Resend payslip PDF to employee email'
                                            : p.email_status === 'Failed'
                                            ? 'Retry sending payslip PDF'
                                            : 'Send payslip PDF via official email'
                                        }
                                        style={{
                                          background: p.email_status === 'Failed' ? '#fee2e2' : p.email_status === 'Sent' ? '#fef3c7' : '#eff6ff',
                                          color: p.email_status === 'Failed' ? '#991b1b' : p.email_status === 'Sent' ? '#92400e' : '#1d4ed8',
                                          borderColor: p.email_status === 'Failed' ? '#fca5a5' : p.email_status === 'Sent' ? '#fde68a' : '#bfdbfe',
                                          fontWeight: 600,
                                        }}
                                      >
                                        {p.email_status === 'Sending' ? '↻ Sending...' : p.email_status === 'Failed' ? '⚠ Retry Email' : p.email_status === 'Sent' ? '↻ Resend Email' : '✉ Send Email'}
                                      </button>
                                    )}

                                    {p.status !== 'Paid' && (
                                      <button className="btn-action-icon reject" onClick={() => handleDelete(p.id)} title="Delete record">
                                        Delete
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={['HR', 'MD'].includes(role) ? 8 : 7} style={{ textAlign: 'center', color: 'var(--muted)' }}>
                          No payslips found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. MANUAL GENERATE / EDIT FORM */}
      {activeTab === 'create' && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h2>{editingSlipId ? 'Correct / Edit Salary Record' : 'Generate Salary Record'}</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              {editingSlipId && (
                <button
                  type="button"
                  className="btn"
                  onClick={resetForm}
                  style={{ marginTop: 0, padding: '8px 16px', fontSize: '13px', background: 'var(--muted)' }}
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="button"
                className="btn"
                onClick={handleAutoCalculate}
                disabled={calculating || !selectedEmp}
                style={{ marginTop: 0, padding: '8px 16px', fontSize: '13px' }}
              >
                {calculating ? '⚡ Calculating...' : '⚡ Auto-Calculate from Payroll Structure'}
              </button>
            </div>
          </div>
          <div className="panel-body">
            <form onSubmit={handleCreateSubmit} style={{ textAlign: 'left' }}>
              <div className="create-payslip-grid">
                <div className="form-group">
                  <label>Employee Selection</label>
                  <select
                    value={selectedEmp}
                    onChange={(e) => setSelectedEmp(e.target.value)}
                    required
                    disabled={Boolean(editingSlipId)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
                  >
                    <option value="">Select Staff...</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.first_name || e.name || e.username} {e.last_name || ''} ({e.emp_id ? `${e.emp_id} - ` : ''}{e.role})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    required
                    disabled={Boolean(editingSlipId)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
                  >
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    required
                    disabled={Boolean(editingSlipId)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>

              <h4 style={{ margin: '20px 0 10px 0', borderBottom: '1px solid var(--border)', paddingBottom: '6px', color: 'var(--primary-color)' }}>Earnings Settings</h4>
              <div className="create-payslip-grid">
                <div className="form-group">
                  <label>Basic Salary</label>
                  <input type="number" step="0.01" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} placeholder="0.00" required />
                </div>
                <div className="form-group">
                  <label>HRA</label>
                  <input type="number" step="0.01" value={hra} onChange={(e) => setHra(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Transport Allowance</label>
                  <input type="number" step="0.01" value={transportAllowance} onChange={(e) => setTransportAllowance(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Medical Allowance</label>
                  <input type="number" step="0.01" value={medicalAllowance} onChange={(e) => setMedicalAllowance(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Special Allowance</label>
                  <input type="number" step="0.01" value={specialAllowance} onChange={(e) => setSpecialAllowance(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Bonus</label>
                  <input type="number" step="0.01" value={bonus} onChange={(e) => setBonus(e.target.value)} placeholder="0.00" />
                </div>
              </div>

              <h4 style={{ margin: '20px 0 10px 0', borderBottom: '1px solid var(--border)', paddingBottom: '6px', color: 'var(--primary-color)' }}>Deductions Settings</h4>
              <div className="create-payslip-grid">
                <div className="form-group">
                  <label>PF Deduction</label>
                  <input type="number" step="0.01" value={pfDeduction} onChange={(e) => setPfDeduction(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>ESI Deduction</label>
                  <input type="number" step="0.01" value={esiDeduction} onChange={(e) => setEsiDeduction(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Professional Tax</label>
                  <input type="number" step="0.01" value={profTax} onChange={(e) => setProfTax(e.target.value)} placeholder="200.00" />
                </div>
                <div className="form-group">
                  <label>TDS</label>
                  <input type="number" step="0.01" value={tds} onChange={(e) => setTds(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Loan Deductions</label>
                  <input type="number" step="0.01" value={loanDeduction} onChange={(e) => setLoanDeduction(e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Other Deductions</label>
                  <input type="number" step="0.01" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)} placeholder="0.00" />
                </div>
              </div>

              <h4 style={{ margin: '20px 0 10px 0', borderBottom: '1px solid var(--border)', paddingBottom: '6px', color: 'var(--primary-color)' }}>Attendance & Leave Breakdown</h4>
              <div className="create-payslip-grid">
                <div className="form-group">
                  <label>Working Days</label>
                  <input type="number" value={workingDays} onChange={(e) => setWorkingDays(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Days Present</label>
                  <input type="number" value={daysPresent} onChange={(e) => setDaysPresent(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Days Absent (Unexcused)</label>
                  <input type="number" value={daysAbsent} onChange={(e) => setDaysAbsent(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Paid Leaves Taken</label>
                  <input type="number" value={leavesTaken} onChange={(e) => setLeavesTaken(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Unpaid / LOP Leaves</label>
                  <input type="number" value={unpaidLeaveDays} onChange={(e) => setUnpaidLeaveDays(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Half Days</label>
                  <input type="number" value={halfDays} onChange={(e) => setHalfDays(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Week Offs</label>
                  <input type="number" value={weekOffsCount} onChange={(e) => setWeekOffsCount(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Holidays</label>
                  <input type="number" value={holidaysCount} onChange={(e) => setHolidaysCount(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Sandwich Days</label>
                  <input type="number" value={sandwichLeaveDays} onChange={(e) => setSandwichLeaveDays(e.target.value)} />
                </div>
              </div>

              <h4 style={{ margin: '20px 0 10px 0', borderBottom: '1px solid var(--border)', paddingBottom: '6px', color: 'var(--primary-color)' }}>Review & Approval Status</h4>
              <div className="create-payslip-grid">
                <div className="form-group">
                  <label>Status</label>
                  <select value={payslipStatus} onChange={(e) => setPayslipStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Approved">Approved</option>
                    <option value="Paid">Paid</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Date</label>
                  <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '30px' }}>
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      disabled={payslipStatus !== 'Approved' && payslipStatus !== 'Paid'}
                      style={{ width: 'auto' }}
                    />
                    Publish to employee portal (Requires Approved/Paid status)
                  </label>
                </div>
              </div>

              <button type="submit" className="btn" disabled={submitting} style={{ width: '100%', marginTop: '20px' }}>
                {submitting ? (editingSlipId ? 'Updating Record...' : 'Generating Record...') : (editingSlipId ? 'Update & Regenerate Slip' : 'Generate Record')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL — Full A4 Payslip Preview */}
      {selectedSlipDetail && (() => {
        const s = selectedSlipDetail;
        const grossVal = s.gross_salary != null ? parseFloat(s.gross_salary) : (
          parseFloat(s.basic_salary||0)+parseFloat(s.hra||0)+parseFloat(s.transport_allowance||0)+parseFloat(s.medical_allowance||0)+parseFloat(s.special_allowance||0)+parseFloat(s.bonus||0)
        );
        const dedVal = s.total_deductions != null ? parseFloat(s.total_deductions) : (
          parseFloat(s.pf_deduction||0)+parseFloat(s.esi_deduction||0)+parseFloat(s.professional_tax||0)+parseFloat(s.tds||0)+parseFloat(s.loan_deduction||0)+parseFloat(s.other_deductions||0)
        );
        const netVal = s.net_salary != null ? parseFloat(s.net_salary) : (grossVal - dedVal);
        const fmt = (v) => parseFloat(v||0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return (
          <div className="modal-overlay" onClick={() => setSelectedSlipDetail(null)}>
            <div className="modal-container payslip-modal-wide" onClick={(e) => e.stopPropagation()}>

              {/* Modal header row */}
              <div className="modal-header">
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                  Payslip — {s.month_name} {s.year}
                </h3>
                <button className="modal-close" onClick={() => setSelectedSlipDetail(null)}>×</button>
              </div>

              {/* Status bar */}
              <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap', padding:'8px 0 12px 0', borderBottom:'1px solid var(--border)', marginBottom:'14px', fontSize:'12.5px' }}>
                <span style={{ fontWeight:700, color: s.status==='Approved'||s.status==='Paid' ? '#16a34a' : s.status==='Rejected' ? '#dc2626' : '#d97706' }}>
                  {s.status}
                </span>
                <span style={{ color:'var(--muted)' }}>•</span>
                <span style={{ color:'var(--muted)' }}>{s.is_published ? 'Published' : 'Not Published'}</span>
                <span style={{ color:'var(--muted)' }}>•</span>
                <span className={`email-status-pill ${ s.email_status==='Sent'?'sent':s.email_status==='Failed'?'failed':s.email_status==='Sending'?'sending':'notsent' }`}>
                  {s.email_status==='Sent'?'✓ Emailed':s.email_status==='Failed'?'⚠ Failed':s.email_status==='Sending'?'↻ Sending':'• Not Sent'}
                </span>
                {s.email_sent_at && <span style={{ color:'var(--muted)', fontSize:'11px' }}>on {new Date(s.email_sent_at).toLocaleString()}</span>}
                {s.email_error && <span style={{ color:'#b91c1c', background:'#fee2e2', padding:'2px 7px', borderRadius:'4px', fontSize:'11px' }}>{s.email_error}</span>}
                {s.approved_by_name && <span style={{ color:'var(--muted)' }}>• Approved by <strong>{s.approved_by_name}</strong></span>}
                {s.rejection_reason && <span style={{ color:'#b91c1c', background:'#fee2e2', padding:'2px 7px', borderRadius:'4px', fontSize:'11px' }}>Rejected: {s.rejection_reason}</span>}
              </div>

              {/* ═══ A4 PAYSLIP PREVIEW ═══ */}
              <div className="payslip-preview-wrapper">
                <div className="payslip-a4">

                  {/* ── HEADER ── */}
                  <div className="ps-header">
                    <div className="ps-header-logo">
                      <img src="/logo.png" alt="YGR Logo" onError={(e)=>{e.target.style.display='none';}} />
                    </div>
                    <div className="ps-header-center">
                      <div className="ps-company-name">YGR Global IT Services</div>
                      <div className="ps-company-sub">Human Resources &amp; Payroll Department &nbsp;|&nbsp; Confidential Salary Statement</div>
                    </div>
                    <div className="ps-header-right">
                      <div className="ps-badge">Payslip</div>
                      <span className="ps-period-label">Pay Period</span>
                      <span className="ps-period-value">{s.month_name} {s.year}</span>
                    </div>
                  </div>

                  {/* ── EMPLOYEE INFORMATION ── */}
                  <div className="ps-section-head">Employee Information</div>
                  <table className="ps-info-table">
                    <tbody>
                      <tr>
                        <td className="lbl">Full Name</td>
                        <td className="val">{s.employee_name || '—'}</td>
                        <td className="lbl">Employee ID</td>
                        <td className="val">{s.employee_emp_id || '—'}</td>
                      </tr>
                      <tr>
                        <td className="lbl">Designation</td>
                        <td className="val">{s.designation || '—'}</td>
                        <td className="lbl">Department</td>
                        <td className="val">{s.department || 'Information Technology'}</td>
                      </tr>
                      <tr>
                        <td className="lbl">Pay Period</td>
                        <td className="val">{s.month_name} {s.year}</td>
                        <td className="lbl">Payment Status</td>
                        <td className="val">{s.status}</td>
                      </tr>
                      {s.bank_name && (
                        <tr>
                          <td className="lbl">Bank Name</td>
                          <td className="val">{s.bank_name || '—'}</td>
                          <td className="lbl">Account No.</td>
                          <td className="val">{s.account_number || '—'}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* ── ATTENDANCE ── */}
                  <div className="ps-section-head">Attendance &amp; Leave Record</div>
                  <table className="ps-att-table">
                    <thead>
                      <tr>
                        <th>Working Days</th>
                        <th>Days Present</th>
                        <th>Paid Leaves</th>
                        <th>Unpaid / LOP</th>
                        <th>Half Days</th>
                        <th>Week Offs</th>
                        <th>Holidays</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{s.working_days ?? '—'}</td>
                        <td>{s.days_present ?? '—'}</td>
                        <td>{s.leaves_taken ?? '0'}</td>
                        <td>{s.days_absent ?? '0'}</td>
                        <td>{s.half_days ?? '0'}</td>
                        <td>{s.week_offs ?? '0'}</td>
                        <td>{s.holidays ?? '0'}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* ── SALARY BREAKDOWN ── */}
                  <div className="ps-section-head">Salary Breakdown</div>
                  <div className="ps-salary-cols">
                    {/* EARNINGS */}
                    <div className="ps-sal-col">
                      <table className="ps-sal-table">
                        <thead>
                          <tr>
                            <th>Earnings Component</th>
                            <th className="amt-th">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Basic Salary</td><td className="amt">{fmt(s.basic_salary)}</td></tr>
                          <tr><td>House Rent Allowance (HRA)</td><td className="amt">{fmt(s.hra)}</td></tr>
                          <tr><td>Transport Allowance</td><td className="amt">{fmt(s.transport_allowance)}</td></tr>
                          <tr><td>Medical Allowance</td><td className="amt">{fmt(s.medical_allowance)}</td></tr>
                          <tr><td>Special Allowance</td><td className="amt">{fmt(s.special_allowance)}</td></tr>
                          <tr><td>Bonus / Incentives</td><td className="amt">{fmt(s.bonus)}</td></tr>
                          <tr className="total-row">
                            <td>Gross Earnings</td>
                            <td className="amt">{fmt(grossVal)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* DEDUCTIONS */}
                    <div className="ps-sal-col">
                      <table className="ps-sal-table">
                        <thead>
                          <tr>
                            <th>Deductions Component</th>
                            <th className="amt-th">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Provident Fund (PF)</td><td className="amt">{fmt(s.pf_deduction)}</td></tr>
                          <tr><td>Employee State Insurance (ESI)</td><td className="amt">{fmt(s.esi_deduction)}</td></tr>
                          <tr><td>Professional Tax (PT)</td><td className="amt">{fmt(s.professional_tax)}</td></tr>
                          <tr><td>Tax Deducted at Source (TDS)</td><td className="amt">{fmt(s.tds)}</td></tr>
                          <tr><td>Loan / Advance Recovery</td><td className="amt">{fmt(s.loan_deduction)}</td></tr>
                          <tr><td>Other Deductions / LOP</td><td className="amt">{fmt(s.other_deductions)}</td></tr>
                          <tr className="total-row">
                            <td>Total Deductions</td>
                            <td className="amt">{fmt(dedVal)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ── NET SALARY ── */}
                  <div className="ps-net-box">
                    <div className="ps-net-left">
                      <span className="ps-net-label">Net Salary Payable</span>
                      <div className="ps-net-words">Gross ₹{fmt(grossVal)} &minus; Deductions ₹{fmt(dedVal)}</div>
                    </div>
                    <div className="ps-net-amount">₹{fmt(netVal)}</div>
                  </div>

                  {/* ── FOOTER ── */}
                  <div className="ps-footer">
                    <div className="ps-footer-meta">
                      Generated on: {new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}<br/>
                      Payment Status: <strong>{s.status}</strong><br/>
                      {s.approved_by_name && <>Approved by: <strong>{s.approved_by_name}</strong></>}
                    </div>
                    <div className="ps-sign-block">
                      <div className="ps-sign-line">
                        Authorized Signatory
                        <span className="ps-sign-sub">YGR Global IT Services</span>
                      </div>
                    </div>
                  </div>

                  <div className="ps-disclaimer">
                    This is a system-generated salary statement and does not require a physical signature. &nbsp;|&nbsp;
                    Confidential — For the exclusive use of the named recipient only.
                  </div>

                </div>{/* /payslip-a4 */}
              </div>{/* /payslip-preview-wrapper */}

              {/* ── Audit Trail ── */}
              {s.audit_logs && s.audit_logs.length > 0 && (
                <div style={{ marginTop:'16px' }}>
                  <h4 style={{ color:'#475569', fontSize:'13px', marginBottom:'6px', fontWeight:700 }}>Approval &amp; Revision Audit Trail</h4>
                  <div className="payslip-timeline">
                    {s.audit_logs.map((log) => (
                      <div key={log.id} className="payslip-timeline-item">
                        <span className={`payslip-timeline-badge ${log.action ? log.action.toLowerCase() : ''}`}>{log.action}</span>
                        <div style={{ flex:1 }}>
                          <div>{log.details || log.action}</div>
                          <div style={{ fontSize:'10.5px', color:'#94a3b8', marginTop:'2px' }}>By {log.performed_by_name} • {new Date(log.timestamp).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Action Buttons ── */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px', marginTop:'16px', paddingTop:'12px', borderTop:'1px solid var(--border)' }}>
                <div style={{ fontSize:'11px', color:'var(--muted)' }}>
                  Employee: <strong>{s.employee_name}</strong> &nbsp;|&nbsp; Email: <strong>{s.employee_email || 'Not configured'}</strong>
                </div>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  <button type="button" className="btn" onClick={() => handleDownloadPdf(s)} disabled={downloadingId===s.id} style={{ marginTop:0 }}>
                    {downloadingId===s.id ? '⌛ Generating...' : '⬇ Download PDF'}
                  </button>

                  {['HR','MD'].includes(role) && (s.status==='Pending Approval'||s.status==='Draft'||s.status==='Rejected') && (
                    <>
                      <button type="button" className="btn" onClick={() => handleApprove(s.id)} style={{ marginTop:0, background:'#166534' }}>✓ Approve</button>
                      {s.status !== 'Rejected' && <button type="button" className="btn" onClick={() => handleReject(s.id)} style={{ marginTop:0, background:'#dc2626' }}>✕ Reject</button>}
                    </>
                  )}

                  {['HR','MD'].includes(role) && (s.status==='Approved'||s.status==='Paid') && (
                    <button
                      type="button" className="btn"
                      onClick={() => handleOpenSendEmail(s)}
                      disabled={s.email_status==='Sending'}
                      style={{ marginTop:0, background: s.email_status==='Failed'?'#dc2626':s.email_status==='Sent'?'#d97706':'#2563eb' }}
                    >
                      {s.email_status==='Sending'?'↻ Sending...':s.email_status==='Failed'?'⚠ Retry Email':s.email_status==='Sent'?'↻ Resend':'✉ Send Email'}
                    </button>
                  )}
                </div>
              </div>

            </div>{/* /modal-container */}
          </div>
        );
      })()}

      {/* Confirmation Modal: Send Email */}
      <SendDocumentEmailModal
        isOpen={Boolean(emailModalSlip)}
        onClose={() => setEmailModalSlip(null)}
        onSuccess={handleEmailSuccess}
        documentData={emailModalSlip}
      />
    </div>
  );
};

export default Payslips;
