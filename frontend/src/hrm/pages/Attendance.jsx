import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const DEPT_OPTIONS = [
  { value: '', label: 'All Departments' },
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

const getStatusBadge = (status) => {
  if (!status) return null;
  let style = {
    display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
    fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
  };
  const s = String(status).toLowerCase();
  if (s.includes('present') || s === 'wfh' || s === 'on duty') {
    style = { ...style, background: '#dcfce7', color: '#16a34a' };
  } else if (s.includes('absent')) {
    style = { ...style, background: '#fee2e2', color: '#dc2626' };
  } else if (s.includes('sandwich')) {
    style = { ...style, background: '#fde8e8', color: '#991b1b' };
  } else if (s.includes('leave')) {
    style = { ...style, background: '#ffedd5', color: '#ea580c' };
  } else if (s === 'week off') {
    style = { ...style, background: '#dbeafe', color: '#1d4ed8' };
  } else if (s === 'holiday') {
    style = { ...style, background: '#f3e8ff', color: '#7e22ce' };
  } else if (s.includes('half day')) {
    style = { ...style, background: '#fef9c3', color: '#a16207' };
  } else if (s === 'not marked') {
    style = { ...style, background: '#f1f5f9', color: '#94a3b8' };
  } else {
    style = { ...style, background: '#f1f5f9', color: '#475569' };
  }
  return <span style={style}>{status}</span>;
};

const fmtTime = (dt) => {
  if (!dt) return '--:--';
  try {
    return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch { return dt.substring(11, 16) || '--:--'; }
};

const Attendance = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const role = user?.role;
  const location = useLocation();
  const navState = location.state;

  const path = window.location.pathname;
  const isMyAttendance = path === '/attendance';
  const isDailyRegistry = path === '/attendance-list';
  const isMonthlySummary = path === '/monthly-attendance';
  const isCorrectionSingle = path === '/attendance-correct';
  const isCorrectionBulk = path === '/attendance-correct-bulk';
  const isAttendanceApprovals = path === '/attendance-approvals';

  // Filters & State
  const [filterDate, setFilterDate] = useState(navState?.dateFilter || new Date().toISOString().substring(0, 10));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [statusFilter, setStatusFilter] = useState(navState?.statusFilter || '');
  const [deptFilter, setDeptFilter] = useState('');

  // Enterprise daily registry filters
  const [filterLate, setFilterLate] = useState(false);
  const [filterMissingOut, setFilterMissingOut] = useState(false);
  const [filterMissingSelfie, setFilterMissingSelfie] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');

  // Modals
  const [lightboxUrl, setLightboxUrl] = useState(null);
  const [detailRecord, setDetailRecord] = useState(null);


  // Daily Registry state
  const [dailyRecords, setDailyRecords] = useState([]);
  const [loadingDaily, setLoadingDaily] = useState(false);

  // Monthly Summary state
  const [monthlyRecords, setMonthlyRecords] = useState([]);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  // My Attendance state
  const [calendarData, setCalendarData] = useState(null);
  const [loadingMy, setLoadingMy] = useState(false);
  const [myHistory, setMyHistory] = useState([]);

  // Corrections Single state
  const [correctionList, setCorrectionList] = useState([]);
  const [loadingCorrections, setLoadingCorrections] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Pending Corrections Approvals state (for /attendance-approvals)
  const [pendingCorrections, setPendingCorrections] = useState([]);
  const [loadingPendingCorrections, setLoadingPendingCorrections] = useState(false);
  const [approvalActionLoading, setApprovalActionLoading] = useState(null);
  const [editCheckIn, setEditCheckIn] = useState('');
  const [editCheckOut, setEditCheckOut] = useState('');
  const [editStatus, setEditStatus] = useState('Present');
  const [editRemarks, setEditRemarks] = useState('');

  // Bulk state
  const [bulkRecords, setBulkRecords] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loadingBulk, setLoadingBulk] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('Present');
  const [bulkCheckIn, setBulkCheckIn] = useState('09:00');
  const [bulkCheckOut, setBulkCheckOut] = useState('18:00');
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().substring(0, 10));
  const [dateTo, setDateTo] = useState(new Date().toISOString().substring(0, 10));
  const [bulkReason, setBulkReason] = useState('');
  const [bulkRemarks, setBulkRemarks] = useState('');

  // Load Daily Registry
  const loadDailyRegistry = async () => {
    setLoadingDaily(true);
    try {
      const params = {};
      if (filterDate) params.date = filterDate;
      if (searchQuery) params.q = searchQuery;
      const res = await api.get('/api/attendance/daily/', { params });
      setDailyRecords(res.data);
    } catch (err) {
      console.error('Error loading daily registry:', err);
    } finally {
      setLoadingDaily(false);
    }
  };

  // Load Monthly Summary
  const loadMonthlySummary = async () => {
    setLoadingMonthly(true);
    try {
      const params = {
        month: selectedMonth,
        year: selectedYear,
      };
      const res = await api.get('/api/attendance/monthly/', { params });
      setMonthlyRecords(res.data);
    } catch (err) {
      console.error('Error loading monthly summary:', err);
    } finally {
      setLoadingMonthly(false);
    }
  };

  // Load My Attendance
  const loadMyAttendance = async () => {
    setLoadingMy(true);
    try {
      const params = {
        month: selectedMonth,
        year: selectedYear,
      };
      const res = await api.get('/api/my-attendance/', { params });
      setCalendarData(res.data);
      setMyHistory(res.data?.history || []);
    } catch (err) {
      console.error('Error loading my attendance:', err);
    } finally {
      setLoadingMy(false);
    }
  };

  // Load Corrections Single
  const loadCorrections = async () => {
    setLoadingCorrections(true);
    try {
      const res = await api.get('/api/attendance/daily/', { params: { date: filterDate } });
      setCorrectionList(res.data);
    } catch (err) {
      console.error('Error loading corrections list:', err);
    } finally {
      setLoadingCorrections(false);
    }
  };

  // Load Bulk Records
  const loadBulkRecords = async () => {
    setLoadingBulk(true);
    try {
      const params = {
        date_from: dateFrom,
        date_to: dateTo,
      };
      if (searchQuery) params.q = searchQuery;
      if (deptFilter) params.dept = deptFilter;
      const res = await api.get('/api/attendance/daily/', { params });
      setBulkRecords(res.data);
      setSelectedIds([]);
    } catch (err) {
      console.error('Error loading bulk records:', err);
    } finally {
      setLoadingBulk(false);
    }
  };

  // Load Pending Corrections (for MD Attendance Approvals page)
  const loadPendingCorrections = async () => {
    setLoadingPendingCorrections(true);
    try {
      const res = await api.get('/api/attendance/corrections/');
      // Filter only pending ones
      const allCorrections = Array.isArray(res.data) ? res.data : [];
      setPendingCorrections(allCorrections.filter(c => c.status === 'Pending'));
    } catch (err) {
      console.error('Error loading pending corrections:', err);
    } finally {
      setLoadingPendingCorrections(false);
    }
  };

  // Handle Correction Approve/Reject (MD)
  const handleCorrectionApproval = async (correctionId, action) => {
    setApprovalActionLoading(correctionId + action);
    try {
      await api.post(`/api/attendance/corrections/${correctionId}/action/`, { action });
      showToast(`Correction request ${action}d successfully.`, 'success');
      loadPendingCorrections();
    } catch (err) {
      showToast(err.response?.data?.detail || `Failed to ${action} correction.`, 'error');
    } finally {
      setApprovalActionLoading(null);
    }
  };

  // Trigger loads based on active view path
  useEffect(() => {
    if (isDailyRegistry) loadDailyRegistry();
    if (isMonthlySummary) loadMonthlySummary();
    if (isMyAttendance) loadMyAttendance();
    if (isCorrectionSingle) loadCorrections();
    if (isCorrectionBulk) loadBulkRecords();
    if (isAttendanceApprovals) loadPendingCorrections();
  }, [path, filterDate, selectedMonth, selectedYear]);

  // Handle Single Correction Save
  const handleSaveSingleCorrection = async (e) => {
    e.preventDefault();
    if (!selectedRecord) return;
    try {
      const attendanceId = String(selectedRecord.id); // keep full id, including virtual_ prefix
      const recordDate = selectedRecord.date || filterDate;
      await api.post('/api/attendance/correction/', {
        attendance_id: attendanceId,
        date: recordDate,
        status: editStatus,
        check_in_time: editCheckIn ? `${recordDate}T${editCheckIn}:00` : null,
        check_out_time: editCheckOut ? `${recordDate}T${editCheckOut}:00` : null,
        remarks: editRemarks,
      });
      showToast('Attendance record updated successfully.', 'success');
      setSelectedRecord(null);
      loadCorrections();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update record.', 'error');
    }
  };

  // Handle Bulk Request Submission (For MD Approval)
  const handleSubmitBulkCorrection = async (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      showToast('Please select at least one attendance log.', 'warning');
      return;
    }
    if (!bulkReason.trim()) {
      showToast('Reason for Correction is mandatory.', 'warning');
      return;
    }
    try {
      const selections = bulkRecords
        .filter(r => selectedIds.includes(r.id))
        .map(r => ({
          attendance_id: r.id,
          date: r.date,
          status: bulkStatus,
          check_in_time: bulkCheckIn,
          check_out_time: bulkCheckOut,
          remarks: bulkRemarks
        }));

      await api.post('/api/attendance/bulk/', {
        selections,
        reason: bulkReason
      });
      showToast('Bulk correction request submitted successfully. It is pending MD approval.', 'success');
      setBulkReason('');
      setSelectedIds([]);
      loadBulkRecords();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to submit bulk request.', 'error');
    }
  };

  // Row selection helper for bulk
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredDaily = dailyRecords.filter(r => {
    const name = `${r.user?.first_name || ''} ${r.user?.last_name || ''}`.toLowerCase();
    const empId = (r.user?.emp_id || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesQuery = !q || name.includes(q) || empId.includes(q);
    const matchesDept = !deptFilter || (r.user?.department || '').toLowerCase() === deptFilter.toLowerCase();
    const matchesStatus = !statusFilter || (r.status || '').toLowerCase().includes(statusFilter.toLowerCase());
    const matchesLate = !filterLate || r.is_late;
    const matchesMissingOut = !filterMissingOut || (!r.check_out_time && r.check_in_time);
    const matchesMissingSelfie = !filterMissingSelfie || (!r.check_in_image_url && !r.check_in_photo_url);
    const matchesLoc = !locationSearch || (
      (r.check_in_address || r.check_in_location || '').toLowerCase().includes(locationSearch.toLowerCase())
    );
    return matchesQuery && matchesDept && matchesStatus && matchesLate && matchesMissingOut && matchesMissingSelfie && matchesLoc;
  });

  const handleExportCSV = () => {
    const a = document.createElement('a');
    a.href = `/api/attendance/export/?date=${filterDate}&fmt=csv`;
    a.download = `attendance_${filterDate}.csv`;
    a.click();
  };

  const handleExportPDF = () => window.print();

  return (
    <div className="attendance-workspace-container">
      <style>{`
        .att-grid-filters {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 20px;
          align-items: center;
        }
        .att-grid-filters input, .att-grid-filters select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 13.5px;
        }
        .tbl-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        .bulk-actions-bar {
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
          margin-bottom: 20px;
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }

        /* Premium Form Controls */
        .attendance-form-card input, 
        .attendance-form-card select, 
        .attendance-form-card textarea {
          width: 100%;
          padding: 12px 16px !important;
          border-radius: 10px !important;
          border: 1.5px solid #e2e8f0 !important;
          background-color: #f8fafc !important;
          font-size: 0.9rem !important;
          color: #0f172a !important;
          transition: all 0.2s ease-in-out !important;
        }
        .attendance-form-card input:focus, 
        .attendance-form-card select:focus, 
        .attendance-form-card textarea:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
        }
        .attendance-form-card label {
          font-size: 0.76rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }
        .btn-submit-premium {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
          margin-top: 10px;
        }
        .btn-submit-premium:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .clickable-day {
          transition: all 0.2s ease-in-out;
        }
        .clickable-day:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.12) !important;
          border-color: #3b82f6 !important;
        }
      `}</style>

      {/* ── IMAGE LIGHTBOX ── */}
      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16
          }}
        >
          <img src={lightboxUrl} alt="Attendance selfie" style={{ maxWidth: '85vw', maxHeight: '78vh', borderRadius: 12, boxShadow: '0 0 60px rgba(0,0,0,0.8)' }} />
          <div style={{ display: 'flex', gap: 12 }}>
            <a href={lightboxUrl} download target="_blank" rel="noreferrer"
              style={{ background: '#1d4ed8', color: '#fff', padding: '10px 22px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
              onClick={e => e.stopPropagation()}>
              ⬇ Download
            </a>
            <button onClick={() => setLightboxUrl(null)}
              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {detailRecord && (
        <div
          onClick={() => setDetailRecord(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 18, width: '100%', maxWidth: 780, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}
          >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)', padding: '22px 28px', borderRadius: '18px 18px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Attendance Detail</div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>
                  {detailRecord.user?.first_name} {detailRecord.user?.last_name}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 }}>
                  {detailRecord.user?.emp_id} · {detailRecord.user?.designation || detailRecord.user?.role} · {detailRecord.date}
                </div>
              </div>
              <button onClick={() => setDetailRecord(null)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>

            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Status row */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 120, background: '#f8fafc', borderRadius: 12, padding: '14px 18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Status</div>
                  {getStatusBadge(detailRecord.status)}
                </div>
                <div style={{ flex: 1, minWidth: 120, background: '#f8fafc', borderRadius: 12, padding: '14px 18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Working Hours</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#1e293b' }}>{detailRecord.total_hours || '0'} hrs</div>
                </div>
                <div style={{ flex: 1, minWidth: 120, background: detailRecord.is_late ? '#fef2f2' : '#f0fdf4', borderRadius: 12, padding: '14px 18px', border: `1px solid ${detailRecord.is_late ? '#fecaca' : '#bbf7d0'}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Punctuality</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: detailRecord.is_late ? '#dc2626' : '#16a34a' }}>
                    {detailRecord.is_late ? '⚠ Late Arrival' : '✓ On Time'}
                  </div>
                </div>
              </div>

              {/* Check-In / Check-Out panels */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['Check-In', 'check_in', '#dbeafe', '#1d4ed8'], ['Check-Out', 'check_out', '#dcfce7', '#16a34a']].map(([label, prefix, bg, color]) => (
                  <div key={prefix} style={{ background: bg, borderRadius: 14, padding: '18px 20px', border: `1px solid ${color}30` }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>{label}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>
                      {fmtTime(detailRecord[`${prefix}_time`])}
                    </div>
                    {/* Selfie */}
                    {detailRecord[`${prefix}_image_url`] ? (
                      <img
                        src={detailRecord[`${prefix}_image_url`]}
                        alt={`${label} selfie`}
                        onClick={() => setLightboxUrl(detailRecord[`${prefix}_image_url`])}
                        style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 10, cursor: 'zoom-in', border: '2px solid rgba(255,255,255,0.8)' }}
                      />
                    ) : (
                      <div style={{ height: 80, background: 'rgba(255,255,255,0.5)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 12 }}>No selfie</div>
                    )}
                    {/* Location */}
                    {(detailRecord[`${prefix}_address`] || detailRecord[`${prefix}_location`]) && (
                      <div style={{ marginTop: 10, fontSize: 12, color: '#334155' }}>
                        📍 {detailRecord[`${prefix}_address`] || detailRecord[`${prefix}_location`]}
                      </div>
                    )}
                    {detailRecord[`${prefix}_map_url`] && (
                      <a href={detailRecord[`${prefix}_map_url`]} target="_blank" rel="noreferrer"
                        style={{ display: 'inline-block', marginTop: 6, fontSize: 11, color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
                        🗺 View on Google Maps
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Device info */}
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: '16px 20px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 0.5 }}>Device & Network</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[['🌐 IP Address', detailRecord.check_in_ip], ['🖥 Browser', detailRecord.check_in_browser], ['📱 Device', detailRecord.check_in_device]].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3 }}>{k}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{v || 'N/A'}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              {detailRecord.remarks && detailRecord.remarks !== 'No record' && (
                <div style={{ background: '#fefce8', borderRadius: 12, padding: '14px 18px', border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>Remarks</div>
                  <div style={{ fontSize: 13, color: '#1e293b' }}>{detailRecord.remarks}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1. DAILY REGISTRY */}
      {isDailyRegistry && (
        <div className="dashboard-panel-card" style={{ overflow: 'hidden' }}>
          <style>{`
            .ent-att-table { width: 100%; border-collapse: collapse; font-size: 13px; }
            .ent-att-table thead th { background: #0f172a; color: #94a3b8; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding: 12px 14px; white-space: nowrap; position: sticky; top: 0; z-index: 2; }
            .ent-att-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.12s; }
            .ent-att-table tbody tr:hover { background: #f8fafc; }
            .ent-att-table td { padding: 11px 14px; vertical-align: middle; }
            .selfie-thumb { width: 40px; height: 40px; object-fit: cover; border-radius: 8px; cursor: zoom-in; border: 2px solid #e2e8f0; transition: transform 0.15s; }
            .selfie-thumb:hover { transform: scale(1.1); border-color: #3b82f6; }
            .no-selfie-badge { width: 40px; height: 40px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 18px; border: 2px dashed #e2e8f0; }
            .maps-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #1d4ed8; text-decoration: none; background: #eff6ff; padding: 3px 8px; border-radius: 6px; white-space: nowrap; transition: background 0.12s; margin-top: 4px; }
            .maps-btn:hover { background: #dbeafe; }
            .detail-btn { background: none; border: 1px solid #e2e8f0; color: #64748b; padding: 5px 10px; border-radius: 7px; cursor: pointer; font-size: 16px; transition: all 0.12s; }
            .detail-btn:hover { background: #f1f5f9; color: #1d4ed8; border-color: #3b82f6; }
            .late-chip { background: #fee2e2; color: #dc2626; font-size: 9px; font-weight: 800; padding: 1px 6px; border-radius: 4px; margin-left: 4px; text-transform: uppercase; }
            .filter-chip { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 20px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; color: #475569; }
            .filter-chip.active { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
            .filter-chip:hover:not(.active) { border-color: #3b82f6; color: #1d4ed8; }
            @media print { .no-print { display: none !important; } }
          `}</style>

          {/* ── Header ── */}
          <div className="panel-header" style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Daily Attendance Registry</h2>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>
                  {filteredDaily.length} records · {filterDate}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }} className="no-print">
                <button onClick={handleExportCSV} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                  📊 Export CSV
                </button>
                <button onClick={handleExportPDF} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                  🖨 Print / PDF
                </button>
              </div>
            </div>

            {/* ── Filter Bar ── */}
            <div className="no-print" style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                style={{ padding: '7px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontWeight: 600, color: '#1e293b' }} />
              <input type="text" placeholder="🔍 Employee name or ID..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, minWidth: 180 }} />
              <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                style={{ padding: '7px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13 }}>
                {DEPT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                style={{ padding: '7px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13 }}>
                <option value="">All Statuses</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="half day">Half Day</option>
                <option value="leave">On Leave</option>
                <option value="week off">Week Off</option>
                <option value="holiday">Holiday</option>
                <option value="not marked">Not Marked</option>
              </select>
              <input type="text" placeholder="📍 Filter by location..."
                value={locationSearch} onChange={e => setLocationSearch(e.target.value)}
                style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, minWidth: 160 }} />

              {/* Toggle chips */}
              <button className={`filter-chip ${filterLate ? 'active' : ''}`} onClick={() => setFilterLate(v => !v)}>⏰ Late Only</button>
              <button className={`filter-chip ${filterMissingOut ? 'active' : ''}`} onClick={() => setFilterMissingOut(v => !v)}>🚪 Missing Checkout</button>
              <button className={`filter-chip ${filterMissingSelfie ? 'active' : ''}`} onClick={() => setFilterMissingSelfie(v => !v)}>📷 No Selfie</button>
            </div>
          </div>

          {/* ── Table ── */}
          <div className="panel-body" style={{ padding: 0 }}>
            {loadingDaily ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
                <div>Loading attendance data...</div>
              </div>
            ) : filteredDaily.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>📋</div>
                <div style={{ fontWeight: 700, color: '#475569', fontSize: 16 }}>No records found</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', maxHeight: '62vh' }}>
                <table className="ent-att-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Employee</th>
                      <th>Dept / Role</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Selfie In</th>
                      <th>Selfie Out</th>
                      <th>Check-In Location</th>
                      <th>Check-Out Location</th>
                      <th>Hours</th>
                      <th>Status</th>
                      <th>Remarks</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDaily.map((r, idx) => {
                      const inImg = r.check_in_image_url || r.check_in_photo_url;
                      const outImg = r.check_out_image_url || r.check_out_photo_url;
                      const inAddr = r.check_in_address || r.check_in_location;
                      const outAddr = r.check_out_address || r.check_out_location;
                      return (
                        <tr key={r.id}>
                          <td style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700 }}>{idx + 1}</td>

                          {/* Employee */}
                          <td>
                            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>
                              {r.user?.first_name} {r.user?.last_name}
                            </div>
                            <div style={{ fontSize: 11, color: '#64748b' }}>{r.user?.emp_id}</div>
                          </td>

                          {/* Dept/Role */}
                          <td>
                            <div style={{ fontSize: 12, color: '#374151' }}>{r.user?.department_display || r.user?.department || '—'}</div>
                            <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.user?.designation || r.user?.role}</div>
                          </td>

                          {/* Check In */}
                          <td>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>{fmtTime(r.check_in_time)}</div>
                            {r.is_late && <span className="late-chip">Late</span>}
                          </td>

                          {/* Check Out */}
                          <td style={{ fontWeight: 700, fontSize: 14, color: r.check_out_time ? '#1e293b' : '#94a3b8' }}>
                            {fmtTime(r.check_out_time)}
                          </td>

                          {/* Selfie In */}
                          <td>
                            {inImg ? (
                              <img src={inImg} alt="check-in selfie" className="selfie-thumb" onClick={() => setLightboxUrl(inImg)} />
                            ) : (
                              <div className="no-selfie-badge" title="No selfie captured">📷</div>
                            )}
                          </td>

                          {/* Selfie Out */}
                          <td>
                            {outImg ? (
                              <img src={outImg} alt="check-out selfie" className="selfie-thumb" onClick={() => setLightboxUrl(outImg)} />
                            ) : (
                              <div className="no-selfie-badge" title="No selfie captured">📷</div>
                            )}
                          </td>

                          {/* Check-In Location */}
                          <td style={{ maxWidth: 180 }}>
                            {inAddr ? (
                              <>
                                <div style={{ fontSize: 11.5, color: '#374151', lineHeight: 1.4 }}>{inAddr.length > 50 ? inAddr.slice(0, 50) + '...' : inAddr}</div>
                                {r.check_in_map_url && (
                                  <a href={r.check_in_map_url} target="_blank" rel="noreferrer" className="maps-btn">🗺 Maps</a>
                                )}
                              </>
                            ) : <span style={{ color: '#d1d5db', fontSize: 12 }}>—</span>}
                          </td>

                          {/* Check-Out Location */}
                          <td style={{ maxWidth: 180 }}>
                            {outAddr ? (
                              <>
                                <div style={{ fontSize: 11.5, color: '#374151', lineHeight: 1.4 }}>{outAddr.length > 50 ? outAddr.slice(0, 50) + '...' : outAddr}</div>
                                {r.check_out_map_url && (
                                  <a href={r.check_out_map_url} target="_blank" rel="noreferrer" className="maps-btn">🗺 Maps</a>
                                )}
                              </>
                            ) : <span style={{ color: '#d1d5db', fontSize: 12 }}>—</span>}
                          </td>

                          {/* Hours */}
                          <td style={{ fontWeight: 700, color: r.total_hours >= 9 ? '#16a34a' : r.total_hours > 0 ? '#d97706' : '#94a3b8' }}>
                            {r.total_hours > 0 ? `${r.total_hours}h` : '—'}
                          </td>

                          {/* Status */}
                          <td>{getStatusBadge(r.status)}</td>

                          {/* Remarks */}
                          <td style={{ fontSize: 12, color: '#64748b', maxWidth: 120 }}>
                            {(r.remarks && r.remarks !== 'No record') ? r.remarks : '—'}
                          </td>

                          {/* Detail */}
                          <td>
                            <button className="detail-btn" title="View full detail" onClick={() => setDetailRecord(r)}>👁</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. MONTHLY SUMMARY */}
      {isMonthlySummary && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Monthly Attendance Summary</h2>
            <div className="att-grid-filters">
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>
          <div className="panel-body">
            {loadingMonthly ? <div>Aggregating monthly summary...</div> : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Present</th>
                      <th>Absent</th>
                      <th>Half Day</th>
                      <th>Paid Leave</th>
                      <th>Unpaid Leave</th>
                      <th>Sandwich Leave</th>
                      <th>Late Count</th>
                      <th>Working Days</th>
                      <th>Attendance %</th>
                      <th>Total Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyRecords.map(m => (
                      <tr key={m.user?.id}>
                        <td><strong>{m.user?.first_name} {m.user?.last_name}</strong> ({m.user?.emp_id})</td>
                        <td>{m.present}</td>
                        <td>{m.absent}</td>
                        <td>{m.half_day}</td>
                        <td>{m.paid_leave}</td>
                        <td>{m.unpaid_leave}</td>
                        <td>{m.sandwich_leave}</td>
                        <td>{m.late_count}</td>
                        <td>{m.working_days}</td>
                        <td style={{ fontWeight: 700 }}>{m.attendance_percentage}%</td>
                        <td>{m.working_hours} hrs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. CORRECTION (SINGLE) */}
      {isCorrectionSingle && (
        <div className="hr-panel-row" style={{ display: 'grid', gridTemplateColumns: selectedRecord ? '1fr 1.2fr' : '1fr', gap: '24px', alignItems: 'start' }}>
          <div className="dashboard-panel-card">
            <div className="panel-header">
              <h2>Select Attendance Log</h2>
            </div>
            <div className="panel-body" style={{ maxHeight: '560px', overflowY: 'auto' }}>
              <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} max={new Date().toISOString().split('T')[0]} style={{ padding: '8px 12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid var(--border)', width: '100%' }} />
              {loadingCorrections ? <div>Loading logs...</div> : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {correctionList.map(r => (
                        <tr key={r.id}>
                          <td>{r.user?.first_name} {r.user?.last_name}</td>
                          <td><span className={`badge-capsule ${r.status?.toLowerCase()}`}>{r.status}</span></td>
                          <td>
                            <button className="btn" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => {
                              setSelectedRecord(r);
                              setEditStatus(r.status || 'Present');
                              setEditCheckIn(r.check_in_time ? r.check_in_time.substring(11, 16) : '09:00');
                              setEditCheckOut(r.check_out_time ? r.check_out_time.substring(11, 16) : '18:00');
                              setEditRemarks(r.remarks || '');
                            }}>Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {selectedRecord && (
            <div className="dashboard-panel-card attendance-form-card" style={{ position: 'sticky', top: '20px' }}>
              <div className="panel-header">
                <h2>Correction Form</h2>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSaveSingleCorrection} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                  <div>
                    <label>Employee</label>
                    <input type="text" value={`${selectedRecord.user?.first_name} ${selectedRecord.user?.last_name} (${selectedRecord.user?.emp_id})`} readOnly style={{ background: '#f1f5f9' }} />
                  </div>
                  <div>
                    <label>Selected Date</label>
                    <input type="text" value={filterDate} readOnly style={{ background: '#f1f5f9' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label>Check In</label>
                      <input type="time" value={editCheckIn} onChange={(e) => setEditCheckIn(e.target.value)} />
                    </div>
                    <div>
                      <label>Check Out</label>
                      <input type="time" value={editCheckOut} onChange={(e) => setEditCheckOut(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label>Status Override</label>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Half Day">Half Day</option>
                      <option value="Paid Leave">Paid Leave</option>
                    </select>
                  </div>
                  <div>
                    <label>Remarks</label>
                    <textarea value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)} rows="3" />
                  </div>
                  <button type="submit" className="btn-submit-premium">Apply Correction</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. CORRECTION (BULK) */}
      {isCorrectionBulk && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }}>
          <div className="dashboard-panel-card">
            <div className="panel-header" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h2>Bulk Attendance Logs Registry</h2>
              <div className="att-grid-filters" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label>Date From</label>
                  <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} max={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label>Date To</label>
                  <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} max={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label>Search Employee</label>
                  <input type="text" placeholder="Name or Emp ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div>
                  <label>Department</label>
                  <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                    <option value="">All Departments</option>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <button className="btn" onClick={loadBulkRecords} style={{ width: '100%', marginTop: '5px' }}>Search Logs</button>
            </div>
            <div className="panel-body" style={{ maxHeight: '550px', overflowY: 'auto' }}>
              {loadingBulk ? <div>Loading logs...</div> : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>
                          <input type="checkbox" className="tbl-checkbox" checked={selectedIds.length > 0 && selectedIds.length === bulkRecords.length} onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds(bulkRecords.map(item => item.id));
                            } else {
                              setSelectedIds([]);
                            }
                          }} />
                        </th>
                        <th>Date</th>
                        <th>Employee</th>
                        <th>Status</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkRecords.map(r => (
                        <tr key={r.id}>
                          <td>
                            <input type="checkbox" className="tbl-checkbox" checked={selectedIds.includes(r.id)} onChange={() => toggleSelect(r.id)} />
                          </td>
                          <td><strong>{r.date}</strong></td>
                          <td>{r.user?.first_name} {r.user?.last_name} ({r.user?.emp_id})</td>
                          <td><span className={`badge-capsule ${r.status?.toLowerCase()}`}>{r.status}</span></td>
                          <td>{r.check_in_time ? r.check_in_time.substring(11, 16) : '--:--'}</td>
                          <td>{r.check_out_time ? r.check_out_time.substring(11, 16) : '--:--'}</td>
                          <td>{r.total_hours || '0'} hrs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-panel-card attendance-form-card" style={{ position: 'sticky', top: '20px' }}>
            <div className="panel-header">
              <h2>Bulk Correction Form</h2>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmitBulkCorrection} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                <div>
                  <label>Selected Records Count</label>
                  <input type="text" value={`${selectedIds.length} logs selected`} readOnly style={{ background: '#f1f5f9' }} />
                </div>
                <div>
                  <label>New Status Override</label>
                  <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Paid Leave">Paid Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Week Off">Week Off</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label>New Check In</label>
                    <input type="time" value={bulkCheckIn} onChange={(e) => setBulkCheckIn(e.target.value)} />
                  </div>
                  <div>
                    <label>New Check Out</label>
                    <input type="time" value={bulkCheckOut} onChange={(e) => setBulkCheckOut(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label>New Remarks</label>
                  <input type="text" placeholder="e.g. Work verified" value={bulkRemarks} onChange={(e) => setBulkRemarks(e.target.value)} />
                </div>
                <div>
                  <label style={{ color: 'var(--accent-red)' }}>Reason for Correction (MANDATORY)</label>
                  <textarea placeholder="Please specify the reason for bulk correction..." value={bulkReason} onChange={(e) => setBulkReason(e.target.value)} rows="3" required />
                </div>
                <div>
                  <label>Attachment (Optional)</label>
                  <input type="file" style={{ border: 'none', background: 'transparent', padding: 0 }} />
                </div>
                <button type="submit" className="btn-submit-premium">Submit Correction Request</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 5. MY ATTENDANCE */}
      {isMyAttendance && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="dashboard-panel-card">
            <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>My Attendance Calendar</h2>
              <div className="att-grid-filters">
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </div>
            <div className="panel-body">
              {loadingMy ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '24px', marginBottom: '10px', display: 'block', color: 'var(--primary)' }}></i>
                  Loading calendar...
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center' }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} style={{ fontWeight: 800, fontSize: '0.85rem', padding: '10px', background: 'rgba(59, 130, 246, 0.08)', color: 'var(--primary)', borderRadius: '6px' }}>{d}</div>
                  ))}
                  
                  {/* Padding cells */}
                  {Array.from({ length: calendarData?.padding || 0 }).map((_, i) => (
                    <div key={`pad-${i}`} style={{
                      padding: '12px',
                      border: '1px dashed #e2e8f0',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      minHeight: '80px',
                      opacity: 0.4
                    }} />
                  ))}
                  
                  {/* Actual days */}
                  {calendarData?.days_data?.map((day) => {
                    const today = new Date();
                    const yyyy = today.getFullYear();
                    const mm = String(today.getMonth() + 1).padStart(2, '0');
                    const dd = String(today.getDate()).padStart(2, '0');
                    const todayStr = `${yyyy}-${mm}-${dd}`;
                    const isToday = day.date === todayStr;
                    const matchingHistory = myHistory.find(h => h.date === day.date);
                    
                    return (
                      <div key={day.date} 
                        onClick={() => matchingHistory && setDetailRecord(matchingHistory)}
                        style={{
                          padding: '12px',
                          border: isToday ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                          borderRadius: '8px',
                          background: '#fff',
                          minHeight: '80px',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: isToday ? '0 0 12px rgba(59, 130, 246, 0.15)' : 'none',
                          position: 'relative',
                          cursor: matchingHistory ? 'pointer' : 'default',
                        }}
                        className={matchingHistory ? "clickable-day" : ""}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ 
                            fontWeight: 700, 
                            fontSize: '1rem',
                            color: isToday ? 'var(--primary)' : '#1e293b'
                          }}>{day.day_num}</span>
                          {isToday && (
                            <span style={{ 
                              fontSize: '8px', 
                              fontWeight: 800, 
                              color: 'var(--primary)', 
                              background: '#eff6ff', 
                              padding: '2px 6px', 
                              borderRadius: '4px',
                              letterSpacing: '0.05em'
                            }}>TODAY</span>
                          )}
                        </div>
                        <div style={{ marginTop: '8px' }}>
                          {day.status && day.status !== 'Future' && getStatusBadge(day.status)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-panel-card">
            <div className="panel-header">
              <h2>My Month History</h2>
            </div>
            <div className="panel-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table className="ent-att-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Selfies</th>
                      <th>Status</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myHistory.map(h => {
                      const inImg = h.check_in_image_url || h.check_in_photo_url;
                      const outImg = h.check_out_image_url || h.check_out_photo_url;
                      return (
                        <tr key={h.id} className="clickable-row" onClick={() => setDetailRecord(h)}>
                          <td><strong>{h.date}</strong></td>
                          <td>
                            <div style={{ fontWeight: 700, fontSize: '13.5px' }}>{fmtTime(h.check_in_time)}</div>
                            {h.is_late && <span className="late-chip">Late</span>}
                          </td>
                          <td style={{ fontWeight: 700, fontSize: '13.5px' }}>{fmtTime(h.check_out_time)}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {inImg ? (
                                <img src={inImg} alt="check-in selfie" className="selfie-thumb" style={{ width: '32px', height: '32px' }} onClick={(e) => { e.stopPropagation(); setLightboxUrl(inImg); }} />
                              ) : (
                                <div className="no-selfie-badge" style={{ width: '32px', height: '32px', fontSize: '11px' }}>📷</div>
                              )}
                              {outImg ? (
                                <img src={outImg} alt="check-out selfie" className="selfie-thumb" style={{ width: '32px', height: '32px' }} onClick={(e) => { e.stopPropagation(); setLightboxUrl(outImg); }} />
                              ) : (
                                <div className="no-selfie-badge" style={{ width: '32px', height: '32px', fontSize: '11px' }}>📷</div>
                              )}
                            </div>
                          </td>
                          <td>{getStatusBadge(h.status)}</td>
                          <td>
                            <button className="detail-btn" title="View details" onClick={(e) => { e.stopPropagation(); setDetailRecord(h); }}>👁</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATTENDANCE APPROVALS VIEW — MD ONLY */}
      {isAttendanceApprovals && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0 }}>Attendance Correction Approvals</h2>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>
                {pendingCorrections.length} pending request{pendingCorrections.length !== 1 ? 's' : ''}
              </div>
            </div>
            <button onClick={loadPendingCorrections} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              <i className="fa-solid fa-rotate-right"></i> Refresh
            </button>
          </div>
          <div className="panel-body" style={{ padding: 0 }}>
            {loadingPendingCorrections ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, display: 'block', marginBottom: 10 }}></i>
                Loading pending correction requests...
              </div>
            ) : pendingCorrections.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: 40, color: '#10b981', display: 'block', marginBottom: 10 }}></i>
                <div style={{ fontWeight: 700, color: '#475569', fontSize: 16 }}>All caught up!</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>No pending attendance correction requests.</div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#0f172a' }}>
                      {['Employee', 'Dept', 'Date', 'Original Status', 'Original In/Out', 'Requested Status', 'Requested In/Out', 'Reason', 'Submitted By', 'Actions'].map(h => (
                        <th key={h} style={{ color: '#94a3b8', fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, padding: '12px 14px', whiteSpace: 'nowrap', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pendingCorrections.map((c, idx) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>
                            {c.attendance?.user?.first_name || ''} {c.attendance?.user?.last_name || ''}
                          </div>
                          <div style={{ fontSize: 11, color: '#64748b' }}>{c.attendance?.user?.emp_id || '—'}</div>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: 12, color: '#374151' }}>
                          {c.attendance?.user?.department || '—'}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>
                          {c.attendance?.date || '—'}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {getStatusBadge(c.original_status)}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>
                          {c.original_check_in ? fmtTime(c.original_check_in) : '--:--'} → {c.original_check_out ? fmtTime(c.original_check_out) : '--:--'}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {getStatusBadge(c.new_status)}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: 12, color: '#374151', whiteSpace: 'nowrap' }}>
                          {c.new_check_in ? fmtTime(c.new_check_in) : '--:--'} → {c.new_check_out ? fmtTime(c.new_check_out) : '--:--'}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.reason}>
                          {c.reason || '—'}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b' }}>
                          {c.edited_by?.username || c.edited_by?.first_name || '—'}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              disabled={approvalActionLoading === c.id + 'approve'}
                              onClick={() => handleCorrectionApproval(c.id, 'approve')}
                              style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', opacity: approvalActionLoading === c.id + 'approve' ? 0.6 : 1 }}
                            >
                              {approvalActionLoading === c.id + 'approve' ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Approve'}
                            </button>
                            <button
                              disabled={approvalActionLoading === c.id + 'reject'}
                              onClick={() => handleCorrectionApproval(c.id, 'reject')}
                              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', opacity: approvalActionLoading === c.id + 'reject' ? 0.6 : 1 }}
                            >
                              {approvalActionLoading === c.id + 'reject' ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Reject'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
