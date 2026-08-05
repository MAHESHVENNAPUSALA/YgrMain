import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import { useLocation } from 'react-router-dom';

const HolidayCalendar = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const location = useLocation();
  const role = user?.role;

  // If opened from /holiday-approvals sidebar link, default to 'approvals' tab for MD
  const defaultTab = (role === 'MD' && location.pathname === '/holiday-approvals') ? 'approvals' : 'calendar';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [holidays, setHolidays] = useState([]);
  const [pendingHolidays, setPendingHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Holiday creation state
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [holidayDept, setHolidayDept] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const loadHolidays = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/holidays/');
      const all = res.data;
      setHolidays(all.filter(h => h.status === 'Approved'));
      setPendingHolidays(all.filter(h => h.status === 'Pending'));
    } catch (err) {
      console.error('Error loading holidays:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHolidays();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/holidays/', {
        name: holidayName,
        date: holidayDate,
        department: holidayDept,
      });
      showToast('Holiday created successfully.', 'success');
      setHolidayName('');
      setHolidayDate('');
      setHolidayDept('');
      loadHolidays();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to create holiday.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (holidayId) => {
    const isConfirmed = await showConfirm('Are you sure you want to delete this holiday?');
    if (!isConfirmed) return;
    try {
      await api.delete(`/api/holidays/${holidayId}/`);
      showToast('Holiday deleted.', 'success');
      loadHolidays();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to delete holiday.', 'error');
    }
  };

  const handleHolidayAction = async (holidayId, action) => {
    setActionLoading(holidayId + action);
    try {
      const res = await api.post(`/api/holidays/${holidayId}/action/`, { action });
      showToast(res.data.detail, action === 'approve' ? 'success' : 'info');
      loadHolidays();
    } catch (err) {
      showToast(err.response?.data?.detail || `Failed to ${action} holiday.`, 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const statusBadgeStyle = (s) => {
    const map = {
      Approved: { background: '#d1fae5', color: '#065f46' },
      Pending: { background: '#fef3c7', color: '#92400e' },
      Rejected: { background: '#fee2e2', color: '#991b1b' },
      Draft: { background: '#e0e7ff', color: '#3730a3' },
    };
    return map[s] || { background: '#f1f5f9', color: '#475569' };
  };

  return (
    <div>
      <style>{`
        .holiday-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          border-bottom: 2px solid var(--border);
          padding-bottom: 0;
        }
        .holiday-tab-btn {
          padding: 10px 22px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
          font-family: var(--font-base);
        }
        .holiday-tab-btn.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }
        .holiday-tab-btn:hover:not(.active) {
          color: var(--text-main);
        }
        .holiday-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .holiday-grid {
            grid-template-columns: 1fr;
          }
        }
        .holiday-list-card {
          text-align: left;
        }
        .holiday-item {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .holiday-details {
          display: flex;
          flex-direction: column;
        }
        .holiday-title {
          font-weight: 700;
          color: var(--primary-color);
          font-size: 14px;
        }
        .holiday-date {
          font-size: 12.5px;
          color: var(--muted);
          margin-top: 2px;
        }
        .holiday-dept-badge {
          display: inline-block;
          font-size: 10px;
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 4px;
          font-weight: 600;
        }
        .holiday-status-badge {
          display: inline-block;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 700;
          margin-top: 4px;
        }
        .approval-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .btn-approve {
          background: #10b981;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-approve:hover { background: #059669; }
        .btn-approve:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-reject {
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-reject:hover { background: #dc2626; }
        .btn-reject:disabled { opacity: 0.6; cursor: not-allowed; }
        .pending-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f59e0b;
          color: #fff;
          border-radius: 10px;
          min-width: 20px;
          height: 20px;
          font-size: 11px;
          font-weight: 700;
          padding: 0 6px;
          margin-left: 8px;
        }
      `}</style>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
        Holiday Registry
      </h2>

      {/* Tabs — Approvals tab shown only to MD */}
      <div className="holiday-tabs">
        <button
          className={`holiday-tab-btn${activeTab === 'calendar' ? ' active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>
          Corporate Holidays
        </button>
        {role === 'MD' && (
          <button
            className={`holiday-tab-btn${activeTab === 'approvals' ? ' active' : ''}`}
            onClick={() => setActiveTab('approvals')}
          >
            <i className="fa-solid fa-clock" style={{ marginRight: '6px', color: '#f59e0b' }}></i>
            Pending Approvals
            {pendingHolidays.length > 0 && (
              <span className="pending-badge">{pendingHolidays.length}</span>
            )}
          </button>
        )}
        {['HR', 'MD'].includes(role) && (
          <button
            className={`holiday-tab-btn${activeTab === 'create' ? ' active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
            Schedule Holiday
          </button>
        )}
      </div>

      {/* TAB: Corporate Calendar */}
      {activeTab === 'calendar' && (
        <div className="dashboard-panel-card holiday-list-card">
          <div className="panel-header">
            <h2>📅 Corporate Holidays</h2>
          </div>
          <div className="panel-body">
            {loading ? (
              <div>Loading holidays...</div>
            ) : holidays.length > 0 ? (
              holidays.map((h) => (
                <div className="holiday-item" key={h.id}>
                  <div className="holiday-details">
                    <span className="holiday-title">{h.name}</span>
                    <span className="holiday-date">
                      <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>
                      {new Date(h.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    {h.department && (
                      <div>
                        <span className="holiday-dept-badge">{h.department.replace('_', ' ')}</span>
                      </div>
                    )}
                    <span className="holiday-status-badge" style={statusBadgeStyle(h.status)}>{h.status}</span>
                  </div>
                  {['HR', 'MD'].includes(role) && (
                    <button
                      className="view-btn"
                      style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', cursor: 'pointer' }}
                      onClick={() => handleDelete(h.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No corporate holidays scheduled.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB: Pending Approvals (MD only) */}
      {activeTab === 'approvals' && role === 'MD' && (
        <div className="dashboard-panel-card holiday-list-card">
          <div className="panel-header">
            <h2>⏳ Pending Holiday Requests</h2>
          </div>
          <div className="panel-body">
            {loading ? (
              <div>Loading pending holidays...</div>
            ) : pendingHolidays.length > 0 ? (
              pendingHolidays.map((h) => (
                <div className="holiday-item" key={h.id} style={{ background: '#fffbeb', borderColor: '#fcd34d' }}>
                  <div className="holiday-details" style={{ flex: 1 }}>
                    <span className="holiday-title">{h.name}</span>
                    <span className="holiday-date">
                      <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>
                      {new Date(h.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    {h.department && (
                      <div>
                        <span className="holiday-dept-badge">{h.department.replace('_', ' ')}</span>
                      </div>
                    )}
                    {h.submitted_by_name && (
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Submitted by: {h.submitted_by_name}
                      </span>
                    )}
                    {h.description && (
                      <span style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', marginTop: '2px', display: 'block' }}>
                        {h.description}
                      </span>
                    )}
                  </div>
                  <div className="approval-actions">
                    <button
                      className="btn-approve"
                      disabled={actionLoading === h.id + 'approve'}
                      onClick={() => handleHolidayAction(h.id, 'approve')}
                    >
                      {actionLoading === h.id + 'approve' ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Approve'}
                    </button>
                    <button
                      className="btn-reject"
                      disabled={actionLoading === h.id + 'reject'}
                      onClick={() => handleHolidayAction(h.id, 'reject')}
                    >
                      {actionLoading === h.id + 'reject' ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Reject'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', textAlign: 'center', padding: '40px 0', fontSize: '14px' }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '2rem', color: '#10b981', display: 'block', marginBottom: '10px' }}></i>
                No pending holiday requests — all caught up!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: Create Holiday (HR/MD only) */}
      {activeTab === 'create' && ['HR', 'MD'].includes(role) && (
        <div className="dashboard-panel-card">
          <div className="panel-header">
            <h2>✍️ Schedule Holiday</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={handleCreateSubmit} style={{ textAlign: 'left', maxWidth: '480px' }}>
              <div className="form-group">
                <label>Holiday Description / Name</label>
                <input
                  type="text"
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)}
                  required
                  placeholder="e.g. Independence Day"
                />
              </div>
              <div className="form-group">
                <label>Holiday Date</label>
                <input
                  type="date"
                  value={holidayDate}
                  onChange={(e) => setHolidayDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department Scope (Optional)</label>
                <input
                  type="text"
                  value={holidayDept}
                  onChange={(e) => setHolidayDept(e.target.value)}
                  placeholder="e.g. technology (leave blank for all)"
                />
              </div>
              <button type="submit" className="btn" disabled={submitting} style={{ width: '100%' }}>
                {submitting ? 'Scheduling holiday...' : 'Add to Holiday Calendar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayCalendar;
