import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';

const Leave = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { prompt: showPrompt } = useDialog();
  const role = user?.role;
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state;

  const path = window.location.pathname;
  const isLeavePortal = path.includes('leave-status') || path.includes('apply-leave') || (!path.includes('approved-leaves') && !path.includes('leave-requests') && !path.includes('all-leaves') && !path.includes('leave-dashboard'));
  const isApprovedTracking = path.includes('approved-leaves') || path.includes('tl-approved-leaves') || path.includes('hr-approved-leaves') || path.includes('manager-approved-leaves');
  const isEmployeeLeaves = path.includes('leave-requests') || path.includes('leave-dashboard');
  const isAllLeaves = path.includes('all-leaves');

  const [activeTab, setActiveTab] = useState(path.includes('apply-leave') ? 'apply' : isLeavePortal ? 'list' : 'approvals'); // 'list' or 'apply' or 'approvals'
  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(24);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  // Modal Detail State
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Sorting & Pagination state
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveType, setLeaveType] = useState('Paid');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(navState?.statusFilter || '');

  useEffect(() => {
    if (navState && navState.statusFilter) {
      setStatusFilter(navState.statusFilter);
    }
  }, [navState]);

  const loadLeaves = async () => {
    setLoading(true);
    try {
      let scope = 'personal';
      if (isApprovedTracking) {
        scope = 'approved-tracking';
      } else if (isAllLeaves) {
        scope = 'team-all';
      } else if (isEmployeeLeaves) {
        scope = 'team-pending';
      }
      const params = { scope };
      if (statusFilter) params.status = statusFilter;
      const res = await api.get('/api/leaves/', { params });
      setLeaves(res.data.leaves || []);
      setLeaveBalance(res.data.leave_balance ?? 24);
      setApprovedCount(res.data.approved_count ?? 0);
      setStats(res.data);
      // Reset page
      setCurrentPage(1);
    } catch (err) {
      console.error('Error loading leaves:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset filters when changing views
    setStatusFilter('');
    setSearchTerm('');
    setCurrentPage(1);
    loadLeaves();
  }, [path]);

  useEffect(() => {
    // Only reload leaves when status filter changes explicitly within the same view
    loadLeaves();
  }, [statusFilter]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/leaves/', {
        from_date: fromDate,
        to_date: toDate,
        leave_type: leaveType,
        reason,
      });
      showToast('Leave application submitted successfully.', 'success');
      setFromDate('');
      setToDate('');
      setReason('');
      if (path.includes('apply-leave')) {
        navigate('/leave-status');
      } else {
        setActiveTab('list');
        loadLeaves();
      }
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to submit leave request.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAction = async (leaveId, action) => {
    let comments = "";
    if (action === 'reject') {
      comments = await showPrompt("Please enter comments/reason for rejection:");
      if (comments === null) return;
    } else if (action === 'return') {
      comments = await showPrompt("Please enter comments/remarks for returning this request:");
      if (comments === null) return;
    } else {
      comments = await showPrompt("Enter any comments (optional):", "");
      if (comments === null) return;
    }

    try {
      await api.post(`/api/leaves/${leaveId}/action/`, { action, comments });
      showToast(`Leave request successfully updated.`, 'success');
      loadLeaves();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update leave request.', 'error');
    }
  };

  // Filter lists based on search term
  const filteredLeaves = leaves.filter((l) => {
    const nameStr = l.user_full_name || '';
    const empIdStr = l.emp_id || '';
    return nameStr.toLowerCase().includes(searchTerm.toLowerCase()) || empIdStr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedLeaves = [...filteredLeaves].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';

    if (sortField === 'total_days') {
      valA = Math.ceil((new Date(a.to_date) - new Date(a.from_date)) / (1000 * 60 * 60 * 24)) + 1;
      valB = Math.ceil((new Date(b.to_date) - new Date(b.from_date)) / (1000 * 60 * 60 * 24)) + 1;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination bounds
  const totalPages = Math.ceil(sortedLeaves.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedLeaves.slice(indexOfFirstItem, indexOfLastItem);

  const exportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Employee,Employee ID,From Date,To Date,Leave Type,Reason,Status\r\n";
    filteredLeaves.forEach(l => {
      csvContent += `"${l.user_full_name}","${l.emp_id || ''}","${l.from_date}","${l.to_date}","${l.leave_type}","${l.reason}","${l.status}"\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leaves_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPageTitle = () => {
    if (isLeavePortal) return "Personal Leave Portal";
    if (isAllLeaves) return "All Leaves";
    if (isEmployeeLeaves) return "Employee Leave Approvals";
    if (isApprovedTracking) return "Approved Leaves Tracking Registry";
    return "Leaves Portal";
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', padding: '0 20px 20px 20px', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedLeaves.length)} of {sortedLeaves.length} entries
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            className="btn" 
            style={{ padding: '6px 12px', background: currentPage === 1 ? '#cbd5e1' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '12px' }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button 
              key={idx}
              className="btn" 
              style={{ padding: '6px 12px', background: currentPage === idx + 1 ? '#0f172a' : '#f1f5f9', color: currentPage === idx + 1 ? '#fff' : '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button 
            className="btn" 
            style={{ padding: '6px 12px', background: currentPage === totalPages ? '#cbd5e1' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '12px' }}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const handleOpenDetailModal = (leave) => {
    setSelectedLeave(leave);
    setShowDetailModal(true);
  };

  return (
    <div>
      <style>{`
        .leave-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .leave-stat-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease-in-out;
          position: relative;
        }
        .leave-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }
        .leave-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .leave-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #ffffff;
        }
        .leave-stat-title {
          font-size: 0.78rem;
          color: var(--muted);
          text-transform: uppercase;
          font-weight: 700;
          margin-top: 4px;
        }
        .leave-stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-top: 4px;
        }

        .leave-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid var(--border);
          margin-bottom: 20px;
        }
        .leave-tab {
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 700;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: var(--transition-base);
        }
        .leave-tab.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }
        
        .leave-form-card {
          max-width: 550px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        
        /* Modal details window */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-in-out;
        }
        .modal-container {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 90%;
          max-width: 550px;
          overflow: hidden;
          animation: slideUp 0.3s ease-in-out;
          border: 1px solid #e2e8f0;
        }
        .modal-header {
          padding: 18px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
          transition: color 0.2s;
        }
        .modal-close-btn:hover {
          color: #ef4444;
        }
        .modal-body {
          padding: 24px;
          max-height: 500px;
          overflow-y: auto;
        }
        
        .clickable-row {
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .clickable-row:hover {
          background-color: #f8fafc !important;
        }
        
        .sort-header {
          cursor: pointer;
          user-select: none;
        }
        .sort-header:hover {
          color: #0f172a;
        }
        
        .leave-form-card .panel-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 24px;
        }
        .leave-form-card .panel-header h2 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .leave-form-card .panel-body {
          padding: 28px;
        }
        .leave-form-card .form-group {
          margin-bottom: 20px;
        }
        .leave-form-card .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }
        .leave-form-card .form-group input, 
        .leave-form-card .form-group select, 
        .leave-form-card .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.2s ease-in-out;
          font-family: inherit;
        }
        .leave-form-card .form-group input:focus, 
        .leave-form-card .form-group select:focus, 
        .leave-form-card .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }
        .leave-form-card .btn-submit-premium {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
          margin-top: 10px;
        }
        .leave-form-card .btn-submit-premium:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .leave-form-card .btn-submit-premium:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}</style>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800, textAlign: 'left' }}>
        {getPageTitle()}
      </h2>

      {/* Stats Cards Row */}
      {(isLeavePortal || isApprovedTracking) && (
        <div className="leave-stats-row">
          {isLeavePortal ? (
            <>
              <div className="leave-stat-card">
                <div className="leave-stat-header">
                  <div className="leave-stat-icon" style={{ background: '#3b82f6' }}>
                    <i className="fa-solid fa-plane"></i>
                  </div>
                  <span className="badge-capsule info" style={{ background: '#eff6ff', color: '#3b82f6' }}>Allowance</span>
                </div>
                <div className="leave-stat-value">24 Days</div>
                <div className="leave-stat-title">Leave Allowance</div>
              </div>
              <div className="leave-stat-card">
                <div className="leave-stat-header">
                  <div className="leave-stat-icon" style={{ background: '#10b981' }}>
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <span className="badge-capsule success" style={{ background: '#ecfdf5', color: '#10b981' }}>Consumed</span>
                </div>
                <div className="leave-stat-value">{approvedCount} Days</div>
                <div className="leave-stat-title">Approved Leaves</div>
              </div>
              <div className="leave-stat-card">
                <div className="leave-stat-header">
                  <div className="leave-stat-icon" style={{ background: '#f59e0b' }}>
                    <i className="fa-solid fa-hourglass-half"></i>
                  </div>
                  <span className="badge-capsule warning" style={{ background: '#fffbeb', color: '#f59e0b' }}>Available</span>
                </div>
                <div className="leave-stat-value">{leaveBalance} Days</div>
                <div className="leave-stat-title">Remaining Balance</div>
              </div>
            </>
          ) : (
            <>
              <div className="leave-stat-card">
                <div className="leave-stat-header">
                  <div className="leave-stat-icon" style={{ background: '#10b981' }}>
                    <i className="fa-solid fa-clipboard-check"></i>
                  </div>
                  <span className="badge-capsule success" style={{ background: '#ecfdf5', color: '#10b981' }}>Registry</span>
                </div>
                <div className="leave-stat-value">{leaves.length} Requests</div>
                <div className="leave-stat-title">Approved Leave Records</div>
              </div>
              <div className="leave-stat-card">
                <div className="leave-stat-header">
                  <div className="leave-stat-icon" style={{ background: '#3b82f6' }}>
                    <i className="fa-solid fa-calendar-days"></i>
                  </div>
                  <span className="badge-capsule info" style={{ background: '#eff6ff', color: '#3b82f6' }}>Total Days</span>
                </div>
                <div className="leave-stat-value">{approvedCount} Days</div>
                <div className="leave-stat-title">Total Approved Days</div>
              </div>
              <div className="leave-stat-card" style={{ cursor: isEmployeeLeaves ? 'default' : 'pointer' }} onClick={() => navigate('/leave-requests')}>
                <div className="leave-stat-header">
                  <div className="leave-stat-icon" style={{ background: '#ec4899' }}>
                    <i className="fa-solid fa-envelope-open-text"></i>
                  </div>
                  <span className="badge-capsule warning" style={{ background: '#fdf2f8', color: '#ec4899' }}>Approvals</span>
                </div>
                <div className="leave-stat-value">{stats?.pending_count || 0} Requests</div>
                <div className="leave-stat-title">Pending Review Queue</div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab Menu - Only show on Leave Portal */}
      {isLeavePortal && (
        <div className="leave-tabs">
          <div className={`leave-tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
            📋 My Leaves History
          </div>
          <div className={`leave-tab ${activeTab === 'apply' ? 'active' : ''}`} onClick={() => setActiveTab('apply')}>
            ✍️ Apply Leave
          </div>
        </div>
      )}

      {/* 1. LEAVE LOGS TABLE - PERSONAL PORTAL VIEW */}
      {isLeavePortal && activeTab === 'list' && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>My Leaves History</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px', fontWeight: 600 }}
            >
              <option value="">All Statuses</option>
              <option value="Final Approved">Final Approved</option>
              <option value="Pending TeamLead Approval">Pending TeamLead Approval</option>
              <option value="Pending Manager Approval">Pending Manager Approval</option>
              <option value="Pending HR Approval">Pending HR Approval</option>
              <option value="Pending MD Approval">Pending MD Approval</option>
              <option value="Rejected by TeamLead">Rejected by TeamLead</option>
              <option value="Rejected by Manager">Rejected by Manager</option>
              <option value="Rejected by HR">Rejected by HR</option>
              <option value="Rejected by MD">Rejected by MD</option>
            </select>
          </div>
          <div className="panel-body" style={{ padding: '0' }}>
            {loading ? (
              <div style={{ padding: '24px', color: '#64748b' }}>Loading leave records...</div>
            ) : (
              <>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th className="sort-header" onClick={() => handleSort('from_date')}>From Date {sortField === 'from_date' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th className="sort-header" onClick={() => handleSort('to_date')}>To Date {sortField === 'to_date' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Leave Type</th>
                        <th>Reason</th>
                        <th className="sort-header" onClick={() => handleSort('status')}>Status {sortField === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((l) => (
                          <tr key={l.id} className="clickable-row" onClick={() => handleOpenDetailModal(l)}>
                            <td>{l.from_date}</td>
                            <td>{l.to_date}</td>
                            <td>
                              <span className="badge-capsule info">{l.leave_type} Leave</span>
                            </td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.reason}</td>
                            <td>
                              <span className={`badge-capsule ${l.status === 'Final Approved' || l.status === 'Approved' ? 'success' : l.status.startsWith('Rejected') ? 'danger' : 'warning'}`}>
                                {l.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>No leaves requests submitted.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. APPLY LEAVE FORM - PERSONAL PORTAL VIEW */}
      {isLeavePortal && activeTab === 'apply' && (
        <div className="dashboard-panel-card leave-form-card">
          <div className="panel-header">
            <h2>Apply Leave Request</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={handleApplySubmit} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label>From Date</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Leave Category</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                  <option value="Paid">Paid Leave</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label>Reason for Leave</label>
                <textarea rows="4" value={reason} onChange={(e) => setReason(e.target.value)} required placeholder="Provide reason details..." />
              </div>
              <button type="submit" className="btn-submit-premium" disabled={submitting}>
                {submitting ? 'Submitting request...' : 'Submit Leave Application'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. PENDING APPROVALS OR ALL LEAVES LIST */}
      {(isEmployeeLeaves || isAllLeaves) && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h2>{isAllLeaves ? "All Leaves" : "Pending Leaves Queue"}</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Search Employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px' }}
              />
              <button className="download-btn" onClick={exportCSV}>
                <i className="fa-solid fa-file-export"></i> Export
              </button>
            </div>
          </div>
          <div className="panel-body" style={{ padding: '0' }}>
            {loading ? (
              <div style={{ padding: '24px', color: '#64748b' }}>Loading approvals...</div>
            ) : (
              <>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th className="sort-header" onClick={() => handleSort('user_full_name')}>Employee Name {sortField === 'user_full_name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Employee ID</th>
                        <th>Dept & Designation</th>
                        <th>Leave Type</th>
                        <th>Reason</th>
                        <th className="sort-header" onClick={() => handleSort('created_at')}>Applied Date {sortField === 'created_at' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th className="sort-header" onClick={() => handleSort('total_days')}>Total Days {sortField === 'total_days' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Current Status</th>
                        {!isAllLeaves && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((l) => {
                          const totalDays = Math.ceil((new Date(l.to_date) - new Date(l.from_date)) / (1000 * 60 * 60 * 24)) + 1;
                          const appliedDate = new Date(l.created_at).toLocaleDateString();
                          return (
                            <tr key={l.id} className="clickable-row" onClick={() => handleOpenDetailModal(l)}>
                              <td style={{ fontWeight: 600 }}>{l.user_full_name}</td>
                              <td>{l.emp_id || '--'}</td>
                              <td>{l.department || '--'} / {l.designation || '--'}</td>
                              <td>{l.leave_type}</td>
                              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.reason}</td>
                              <td>{appliedDate}</td>
                              <td>{l.from_date}</td>
                              <td>{l.to_date}</td>
                              <td>{totalDays}</td>
                              <td>
                                <span className="badge-capsule warning" style={{ background: '#fffbeb', color: '#ea580c' }}>{l.status}</span>
                              </td>
                              {!isAllLeaves && (
                                <td onClick={(e) => e.stopPropagation()}>
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    {l.can_act ? (
                                      <>
                                        <button className="download-btn" onClick={() => handleAction(l.id, 'approve')} style={{ padding: '6px 12px', fontSize: '11px' }}>
                                          Approve
                                        </button>
                                        {(role === 'Manager' || role === 'HR') && (
                                          <button className="view-btn" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 12px', fontSize: '11px' }} onClick={() => handleAction(l.id, 'return')}>
                                            {role === 'HR' ? 'Request Clarification' : 'Return to TL'}
                                          </button>
                                        )}
                                        <button className="view-btn" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '6px 12px', fontSize: '11px' }} onClick={() => handleAction(l.id, 'reject')}>
                                          Reject
                                        </button>
                                      </>
                                    ) : (
                                      <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>Pending {l.current_approver_role}</span>
                                    )}
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={isAllLeaves ? "10" : "11"} style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>No leave requests pending action.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      )}

      {/* 4. TRACKING TABLE - APPROVED LEAVES VIEW */}
      {isApprovedTracking && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h2>Approved Leaves Registry</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Search Employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '13px' }}
              />
              <button className="download-btn" onClick={exportCSV}>
                <i className="fa-solid fa-file-export"></i> Export
              </button>
            </div>
          </div>
          <div className="panel-body" style={{ padding: '0' }}>
            {loading ? (
              <div style={{ padding: '24px', color: '#64748b' }}>Loading approved list...</div>
            ) : (
              <>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th className="sort-header" onClick={() => handleSort('user_full_name')}>Employee {sortField === 'user_full_name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Leave Type</th>
                        <th className="sort-header" onClick={() => handleSort('from_date')}>Dates {sortField === 'from_date' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Reason</th>
                        <th>TL Approved</th>
                        <th>Manager Approved</th>
                        {!isApprovedTracking && <th>HR Approved</th>}
                        {!isApprovedTracking && <th>MD Approved</th>}
                        <th className="sort-header" onClick={() => handleSort('status')}>Final Status {sortField === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((l) => (
                          <tr key={l.id} className="clickable-row" onClick={() => handleOpenDetailModal(l)}>
                            <td style={{ fontWeight: 600 }}>{l.user_full_name}</td>
                            <td>{l.leave_type} Leave</td>
                            <td>{l.from_date} to {l.to_date}</td>
                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.reason}</td>
                            <td>
                              <span className={`badge-capsule ${l.approved_tl || l.status === 'Final Approved' || l.status === 'Approved' ? 'success' : 'warning'}`}>
                                {l.approved_tl || l.status === 'Final Approved' || l.status === 'Approved' ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge-capsule ${l.approved_manager || l.status === 'Final Approved' || l.status === 'Approved' ? 'success' : 'warning'}`}>
                                {l.approved_manager || l.status === 'Final Approved' || l.status === 'Approved' ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            {!isApprovedTracking && (
                              <td>
                                <span className={`badge-capsule ${l.approved_hr || l.status === 'Final Approved' || l.status === 'Approved' ? 'success' : 'warning'}`}>
                                  {l.approved_hr || l.status === 'Final Approved' || l.status === 'Approved' ? 'Approved' : 'Pending'}
                                </span>
                              </td>
                            )}
                            {!isApprovedTracking && (
                              <td>
                                <span className={`badge-capsule ${l.approved_md || l.status === 'Final Approved' || l.status === 'Approved' ? 'success' : 'warning'}`}>
                                  {l.approved_md || l.status === 'Final Approved' || l.status === 'Approved' ? 'Approved' : 'Pending'}
                                </span>
                              </td>
                            )}
                            <td>
                              <span className={`badge-capsule ${l.status === 'Final Approved' || l.status === 'Approved' ? 'success' : l.status.startsWith('Rejected') ? 'danger' : 'warning'}`}>
                                {l.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={isApprovedTracking ? "7" : "9"} style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>No leaves requests tracked here.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Audit Trail Details Modal */}
      {showDetailModal && selectedLeave && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>Leave Request Audit Log</h3>
              <button className="modal-close-btn" onClick={() => setShowDetailModal(false)}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'left', padding: '24px', fontSize: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                <div>
                  <label style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Employee Name</label>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{selectedLeave.user_full_name}</div>
                </div>
                <div>
                  <label style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Employee ID / Dept</label>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{selectedLeave.emp_id || '--'} • {selectedLeave.department || '--'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                <div>
                  <label style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Leave Category</label>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0ea5e9', marginTop: '2px' }}>{selectedLeave.leave_type} Leave</div>
                </div>
                <div>
                  <label style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Duration / Dates</label>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {selectedLeave.from_date} to {selectedLeave.to_date}
                    <span style={{ marginLeft: '8px', color: '#10b981', fontWeight: 800 }}>
                      ({Math.ceil((new Date(selectedLeave.to_date) - new Date(selectedLeave.from_date)) / (1000 * 60 * 60 * 24)) + 1} Days)
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Reason for Application</label>
                <div style={{ fontSize: '14px', color: '#334155', marginTop: '4px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontStyle: 'italic' }}>
                  "{selectedLeave.reason}"
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Workflow Approval Audit Trail</label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  {selectedLeave.approval_steps && selectedLeave.approval_steps.length > 0 ? (
                    selectedLeave.approval_steps.map((step, idx) => (
                      <div key={step.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step.decision === 'Approved' || step.decision === 'Submitted' ? '#dcfce7' : step.decision === 'Rejected' ? '#fee2e2' : '#f1f5f9', color: step.decision === 'Approved' || step.decision === 'Submitted' ? '#16a34a' : step.decision === 'Rejected' ? '#dc2626' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                            {step.decision === 'Approved' || step.decision === 'Submitted' ? '✓' : step.decision === 'Rejected' ? '✗' : '·'}
                          </div>
                          <strong style={{ color: '#334155' }}>Stage {idx + 1}: {step.approver_role} ({step.approver_name})</strong>
                        </div>
                        <span className={`badge-capsule ${step.decision === 'Approved' || step.decision === 'Submitted' ? 'success' : step.decision === 'Rejected' ? 'danger' : 'warning'}`}>
                          {step.decision}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
                      No approval steps recorded yet.
                    </div>
                  )}
                </div>
              </div>

              {selectedLeave.comments && (
                <div style={{ marginTop: '20px' }}>
                  <label style={{ fontWeight: 700, color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Remarks & Audit Comments</label>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px', background: '#fffbeb', padding: '10px 12px', borderRadius: '6px', border: '1px solid #fef3c7' }}>
                    {selectedLeave.comments}
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: '18px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn" style={{ background: '#64748b' }} onClick={() => setShowDetailModal(false)}>Close View</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
