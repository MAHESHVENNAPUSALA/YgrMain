import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import './Attendance.css';

const DEPARTMENT_OPTIONS = [
  { value: 'All', label: 'All Departments' },
  { value: 'python_dev', label: 'Python Developer' },
  { value: 'java_dev', label: 'Java Developer' },
  { value: 'frontend_dev', label: 'Front-End Developer' },
  { value: 'backend_dev', label: 'Back-End Developer' },
  { value: 'fullstack_dev', label: 'Full Stack Developer' },
  { value: 'testing', label: 'Testing / QA' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'data_analyst', label: 'Data Analyst' },
  { value: 'data_scientist', label: 'Data Scientist' },
  { value: 'ai_ml', label: 'AI / ML Engineer' },
  { value: 'cyber_security', label: 'Cyber Security' },
  { value: 'cloud_engineer', label: 'Cloud Engineer' },
  { value: 'digital_marketing', label: 'Digital Marketing' },
  { value: 'ui_ux', label: 'UI / UX Designer' },
  { value: 'mobile_dev', label: 'Mobile App Developer' },
];

const Attendance = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const userRole = user?.role;
  const isHrOrMd = ['HR', 'MD'].includes(userRole);

  // Tab State: 'daily' vs 'monthly'
  const initialTab = location.pathname.includes('monthly') ? 'monthly' : 'daily';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filters
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Data State
  const [dailyRecords, setDailyRecords] = useState([]);
  const [monthlyRecords, setMonthlyRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Mark/Correction
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [newStatus, setNewStatus] = useState('Present');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [correctionReason, setCorrectionReason] = useState('');
  const [correctionRemarks, setCorrectionRemarks] = useState('');
  const [overrideLeave, setOverrideLeave] = useState(false);
  const [conflictError, setConflictError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Daily Attendance
  const fetchDaily = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/attendance/daily/', { params: { date: filterDate } });
      setDailyRecords(res.data || []);
    } catch (err) {
      console.error('Error fetching daily attendance:', err);
      showToast('Failed to load daily attendance records.', 'error');
    } finally {
      setLoading(false);
    }
  }, [filterDate]);

  // Fetch Monthly Summary
  const fetchMonthly = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/attendance/monthly/', {
        params: { year: selectedYear, month: selectedMonth }
      });
      setMonthlyRecords(res.data || []);
    } catch (err) {
      console.error('Error fetching monthly attendance:', err);
      showToast('Failed to load monthly attendance summary.', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (activeTab === 'daily') {
      fetchDaily();
    } else {
      fetchMonthly();
    }
  }, [activeTab, fetchDaily, fetchMonthly]);

  // Daily Metrics
  const dailyMetrics = useMemo(() => {
    let present = 0;
    let absent = 0;
    let halfDay = 0;
    let leave = 0;
    let late = 0;

    dailyRecords.forEach(r => {
      const s = (r.status || '').toLowerCase();
      if (s.includes('present') || s === 'on duty' || s === 'wfh') present++;
      else if (s.includes('absent')) absent++;
      else if (s.includes('half day')) halfDay++;
      else if (s.includes('leave') || s === 'holiday') leave++;
      if (r.is_late) late++;
    });

    return { present, absent, halfDay, leave, late, total: dailyRecords.length };
  }, [dailyRecords]);

  // Filtered Daily Records
  const filteredDaily = useMemo(() => {
    return dailyRecords.filter(r => {
      const term = searchTerm.toLowerCase();
      const empName = (r.user?.name || `${r.user?.first_name || ''} ${r.user?.last_name || ''}` || r.user?.username || '').toLowerCase();
      const empId = (r.user?.emp_id || '').toLowerCase();
      const matchesSearch = !term || empName.includes(term) || empId.includes(term);

      const matchesDept = deptFilter === 'All' || r.user?.department === deptFilter || r.user?.department_display === deptFilter;
      const s = (r.status || '').toLowerCase();
      let matchesStatus = true;
      if (statusFilter === 'Present') matchesStatus = s.includes('present');
      else if (statusFilter === 'Absent') matchesStatus = s.includes('absent');
      else if (statusFilter === 'Half Day') matchesStatus = s.includes('half day');
      else if (statusFilter === 'Leave') matchesStatus = s.includes('leave');

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [dailyRecords, searchTerm, deptFilter, statusFilter]);

  // Filtered Monthly Records
  const filteredMonthly = useMemo(() => {
    return monthlyRecords.filter(r => {
      const term = searchTerm.toLowerCase();
      const empName = (r.user?.name || `${r.user?.first_name || ''} ${r.user?.last_name || ''}` || r.user?.username || '').toLowerCase();
      const empId = (r.user?.emp_id || '').toLowerCase();
      const matchesSearch = !term || empName.includes(term) || empId.includes(term);
      const matchesDept = deptFilter === 'All' || r.user?.department === deptFilter || r.user?.department_display === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [monthlyRecords, searchTerm, deptFilter]);

  // Open Correction Modal
  const handleOpenCorrection = (record) => {
    setSelectedRecord(record);
    setNewStatus(record.status && record.status !== 'Not Marked' ? record.status : 'Present');
    
    // Extract HH:MM
    let inTime = '';
    let outTime = '';
    if (record.check_in_time) {
      try {
        inTime = new Date(record.check_in_time).toTimeString().substring(0, 5);
      } catch {
        inTime = String(record.check_in_time).substring(11, 16);
      }
    }
    if (record.check_out_time) {
      try {
        outTime = new Date(record.check_out_time).toTimeString().substring(0, 5);
      } catch {
        outTime = String(record.check_out_time).substring(11, 16);
      }
    }

    setCheckInTime(inTime || '09:30');
    setCheckOutTime(outTime || '18:30');
    setCorrectionReason('');
    setCorrectionRemarks(record.remarks || '');
    setOverrideLeave(false);
    setConflictError(null);
    setShowCorrectionModal(true);
  };

  // Submit Correction / Mark
  const handleSaveCorrection = async (e) => {
    e.preventDefault();
    if (!correctionReason.trim()) {
      showToast('Correction reason is mandatory for audit compliance.', 'warning');
      return;
    }

    setSubmitting(true);
    setConflictError(null);

    const payload = {
      attendance_id: selectedRecord.id,
      user_id: selectedRecord.user?.id,
      date: selectedRecord.date || filterDate,
      status: newStatus,
      check_in_time: ['Present', 'Half Day'].includes(newStatus) ? checkInTime : null,
      check_out_time: ['Present', 'Half Day'].includes(newStatus) ? checkOutTime : null,
      remarks: correctionRemarks,
      reason: correctionReason,
      override_leave: overrideLeave,
    };

    try {
      await api.post('/api/attendance/correction/', payload);
      showToast('Attendance successfully updated and correction audit logged.', 'success');
      setShowCorrectionModal(false);
      if (activeTab === 'daily') fetchDaily();
      else fetchMonthly();
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.has_leave_conflict) {
        setConflictError(err.response.data.detail);
      } else {
        showToast(err.response?.data?.detail || 'Failed to update attendance.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Status Badge Helper
  const renderBadge = (status, isLate) => {
    const s = String(status || '').toLowerCase();
    let badgeClass = 'badge-unmarked';
    if (s.includes('present') || s === 'on duty' || s === 'wfh') badgeClass = 'badge-present';
    else if (s.includes('absent')) badgeClass = 'badge-absent';
    else if (s.includes('half day')) badgeClass = 'badge-halfday';
    else if (s.includes('leave')) badgeClass = 'badge-leave';
    else if (s === 'holiday') badgeClass = 'badge-holiday';
    else if (s === 'week off') badgeClass = 'badge-weekoff';

    return (
      <>
        <span className={`badge-status ${badgeClass}`}>
          {status || 'Not Marked'}
        </span>
        {isLate && <span className="badge-late">LATE</span>}
      </>
    );
  };

  // Format Time Helper
  const fmtTime = (dt) => {
    if (!dt) return '—';
    try {
      return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return dt.substring(11, 16) || '—';
    }
  };

  return (
    <div className="att-mgmt-container">
      {/* Header & Tab Switcher */}
      <div className="att-mgmt-header">
        <div className="att-title-group">
          <h1>Attendance Management</h1>
          <p className="att-subtitle">
            Inspect daily registry logs, mark corrections with audit reasons, and review monthly payroll summaries.
          </p>
        </div>
        <div className="att-view-switcher">
          <button
            type="button"
            className={`att-tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            <i className="fa-solid fa-calendar-day"></i> Daily Registry
          </button>
          <button
            type="button"
            className={`att-tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            <i className="fa-solid fa-calendar-days"></i> Monthly Summary (Payroll)
          </button>
        </div>
      </div>

      {/* Daily Metrics */}
      {activeTab === 'daily' && (
        <div className="att-stats-grid">
          <div className="att-stat-card">
            <div className="att-stat-info">
              <span>Present Today</span>
              <h3>{dailyMetrics.present}</h3>
            </div>
            <div className="att-stat-icon icon-present">
              <i className="fa-solid fa-user-check"></i>
            </div>
          </div>
          <div className="att-stat-card">
            <div className="att-stat-info">
              <span>Absent</span>
              <h3>{dailyMetrics.absent}</h3>
            </div>
            <div className="att-stat-icon icon-absent">
              <i className="fa-solid fa-user-xmark"></i>
            </div>
          </div>
          <div className="att-stat-card">
            <div className="att-stat-info">
              <span>Half Day</span>
              <h3>{dailyMetrics.halfDay}</h3>
            </div>
            <div className="att-stat-icon icon-half">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </div>
          </div>
          <div className="att-stat-card">
            <div className="att-stat-info">
              <span>On Leave</span>
              <h3>{dailyMetrics.leave}</h3>
            </div>
            <div className="att-stat-icon icon-leave">
              <i className="fa-solid fa-umbrella-beach"></i>
            </div>
          </div>
          <div className="att-stat-card">
            <div className="att-stat-info">
              <span>Late Arrivals</span>
              <h3>{dailyMetrics.late}</h3>
            </div>
            <div className="att-stat-icon icon-late">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Date Bar */}
      <div className="att-filter-card">
        <div className="att-search-box">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            className="att-search-input"
            placeholder="Search by staff name or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {activeTab === 'daily' ? (
          <input
            type="date"
            className="att-date-picker"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              className="filter-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((m, idx) => (
                <option key={idx + 1} value={idx + 1}>{m}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {[2025, 2026, 2027].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        <select
          className="filter-select"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          {DEPARTMENT_OPTIONS.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>

        {activeTab === 'daily' && (
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present Only</option>
            <option value="Absent">Absent Only</option>
            <option value="Half Day">Half Day Only</option>
            <option value="Leave">On Leave</option>
          </select>
        )}
      </div>

      {/* Main Data Table */}
      <div className="att-table-card">
        <div className="att-table-wrapper">
          {activeTab === 'daily' ? (
            <table className="att-corporate-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Staff ID</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Working Hours</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="emp-loading-state">
                      <div className="emp-spinner"></div>
                      <div>Loading daily attendance...</div>
                    </td>
                  </tr>
                ) : filteredDaily.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="emp-empty-state">
                      <i className="fa-solid fa-clipboard-user"></i>
                      <div>No attendance entries found for the selected date and filters.</div>
                    </td>
                  </tr>
                ) : (
                  filteredDaily.map((row) => {
                    const empName = row.user?.name || `${row.user?.first_name || ''} ${row.user?.last_name || ''}`.trim() || row.user?.username || 'Staff';
                    return (
                      <tr key={row.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{empName}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {row.user?.department_display || row.user?.department || 'General'}
                          </div>
                        </td>
                        <td>
                          <span className="emp-id-badge">{row.user?.emp_id || '—'}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{fmtTime(row.check_in_time)}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{fmtTime(row.check_out_time)}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: '#1e293b' }}>
                            {row.total_hours ? `${row.total_hours} hrs` : '0.0 hrs'}
                          </span>
                        </td>
                        <td>
                          {renderBadge(row.status, row.is_late)}
                        </td>
                        <td>
                          <div className="action-buttons-group">
                            {isHrOrMd && (
                              <button
                                type="button"
                                className="btn-icon-action btn-edit"
                                title="Mark / Correct Attendance"
                                onClick={() => handleOpenCorrection(row)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
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
          ) : (
            <table className="att-corporate-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Staff ID</th>
                  <th>Working Days</th>
                  <th>Days Present</th>
                  <th>Half Days</th>
                  <th>Paid Leaves</th>
                  <th>Loss of Pay (Unpaid)</th>
                  <th>Total Hours</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="emp-loading-state">
                      <div className="emp-spinner"></div>
                      <div>Computing monthly summaries for payroll...</div>
                    </td>
                  </tr>
                ) : filteredMonthly.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="emp-empty-state">
                      <i className="fa-solid fa-calendar-check"></i>
                      <div>No attendance records found for this period.</div>
                    </td>
                  </tr>
                ) : (
                  filteredMonthly.map((m) => {
                    const empName = m.user?.name || `${m.user?.first_name || ''} ${m.user?.last_name || ''}`.trim() || m.user?.username || 'Staff';
                    return (
                      <tr key={m.user?.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{empName}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {m.user?.department_display || m.user?.department || 'General'}
                          </div>
                        </td>
                        <td>
                          <span className="emp-id-badge">{m.user?.emp_id || '—'}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{m.working_days}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: '#166534' }}>{m.present}</span>
                        </td>
                        <td>
                          <span>{m.half_day}</span>
                        </td>
                        <td>
                          <span>{m.paid_leave}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: m.unpaid_leave > 0 ? '#dc2626' : '#64748b' }}>
                            {m.unpaid_leave + (m.absent || 0)}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700 }}>{m.working_hours} hrs</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 800, color: m.attendance_percentage >= 80 ? '#166534' : '#d97706' }}>
                            {m.attendance_percentage}%
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Mark / Correct Attendance Modal */}
      {showCorrectionModal && selectedRecord && (
        <div className="corp-modal-overlay" onClick={() => !submitting && setShowCorrectionModal(false)}>
          <div className="corp-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="corp-modal-header">
              <h2>
                <i className="fa-solid fa-user-check"></i>
                Mark / Correct Attendance: {selectedRecord.user?.name || selectedRecord.user?.first_name || selectedRecord.user?.username}
              </h2>
              <button type="button" className="corp-modal-close" onClick={() => setShowCorrectionModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveCorrection}>
              <div className="corp-modal-body">
                {conflictError && (
                  <div className="conflict-alert">
                    <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '1.2rem', marginTop: '2px' }}></i>
                    <div>
                      <strong>Leave Conflict Detected</strong>
                      <p style={{ margin: '4px 0 8px 0' }}>{conflictError}</p>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700 }}>
                        <input
                          type="checkbox"
                          checked={overrideLeave}
                          onChange={(e) => setOverrideLeave(e.target.checked)}
                        />
                        Acknowledge and override approved leave record
                      </label>
                    </div>
                  </div>
                )}

                <div className="corp-form-grid">
                  <div className="corp-form-group">
                    <label className="corp-form-label">Attendance Date</label>
                    <input
                      type="date"
                      disabled
                      className="corp-form-input"
                      value={selectedRecord.date || filterDate}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Attendance Status *</label>
                    <select
                      className="corp-form-select"
                      required
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Half Day">Half Day</option>
                      <option value="Paid Leave">Paid Leave</option>
                      <option value="Unpaid Leave">Unpaid Leave (Loss of Pay)</option>
                      <option value="Holiday">Company Holiday</option>
                    </select>
                  </div>

                  {['Present', 'Half Day'].includes(newStatus) && (
                    <>
                      <div className="corp-form-group">
                        <label className="corp-form-label">Check-In Time</label>
                        <input
                          type="time"
                          className="corp-form-input"
                          value={checkInTime}
                          onChange={(e) => setCheckInTime(e.target.value)}
                        />
                      </div>

                      <div className="corp-form-group">
                        <label className="corp-form-label">Check-Out Time</label>
                        <input
                          type="time"
                          className="corp-form-input"
                          value={checkOutTime}
                          onChange={(e) => setCheckOutTime(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  <div className="corp-form-group full-width">
                    <label className="corp-form-label">Correction Reason (Mandatory Audit Trail) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Employee forgot biometric punch, client meeting on duty, HR adjustment"
                      className="corp-form-input"
                      value={correctionReason}
                      onChange={(e) => setCorrectionReason(e.target.value)}
                    />
                  </div>

                  <div className="corp-form-group full-width">
                    <label className="corp-form-label">Internal Remarks</label>
                    <textarea
                      className="corp-form-textarea"
                      placeholder="Optional notes or details..."
                      value={correctionRemarks}
                      onChange={(e) => setCorrectionRemarks(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="corp-modal-footer">
                <button type="button" className="btn-secondary-corp" onClick={() => setShowCorrectionModal(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-corp" disabled={submitting}>
                  {submitting ? 'Updating...' : 'Save & Audit Correction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
