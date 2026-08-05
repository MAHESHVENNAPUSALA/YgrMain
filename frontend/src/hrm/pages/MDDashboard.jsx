import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import OnLeaveTodayWidget from '../components/OnLeaveTodayWidget';

const MDDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { prompt: showPrompt } = useDialog();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveTime, setLiveTime] = useState('');
  
  // Interactive Modal states
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [actionComments, setActionComments] = useState('');

  // Tab filters / search states
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMDData = async () => {
      try {
        const res = await api.get('/api/dashboard/md/');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching MD dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMDData();

    // Live clock timer
    const clockTimer = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  const [selectedCorrectionIds, setSelectedCorrectionIds] = useState([]);

  const handleCorrectionAction = async (correctionId, action) => {
    const remarks = await showPrompt(`Enter remarks for ${action}ing this attendance correction request:`) || "";
    if (remarks === null) return;
    try {
      await api.post(`/api/attendance/corrections/bulk-action/`, {
        action,
        correction_ids: [correctionId],
        md_remarks: remarks
      });
      showToast(`Attendance correction has been ${action}ed.`, 'success');
      const res = await api.get('/api/dashboard/md/');
      setData(res.data);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update correction request.', 'error');
    }
  };

  const handleBulkCorrectionAction = async (action) => {
    if (selectedCorrectionIds.length === 0) {
      showToast('Please select at least one correction request.', 'warning');
      return;
    }
    const remarks = await showPrompt(`Enter remarks for ${action}ing the selected correction requests:`) || "";
    if (remarks === null) return;
    try {
      await api.post(`/api/attendance/corrections/bulk-action/`, {
        action,
        correction_ids: selectedCorrectionIds,
        md_remarks: remarks
      });
      showToast(`Selected corrections have been ${action}ed.`, 'success');
      setSelectedCorrectionIds([]);
      const res = await api.get('/api/dashboard/md/');
      setData(res.data);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update correction requests.', 'error');
    }
  };

  const handleLeaveAction = async (leaveId, action) => {
    let comments = "";
    if (action === 'reject') {
      comments = await showPrompt("Please enter comments/reason for rejection:") || "";
      if (comments === null) return;
    } else {
      comments = await showPrompt("Enter any comments (optional):") || "";
      if (comments === null) return;
    }

    try {
      await api.post(`/api/leaves/${leaveId}/action/`, { action, comments });
      showToast(`Leave request ${action}ed successfully.`, 'success');
      const res = await api.get('/api/dashboard/md/');
      setData(res.data);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update leave request.', 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '450px', color: 'var(--muted)' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading Executive Dashboard...
      </div>
    );
  }

  // Analytics, Status & Growth Metrics (supplemented with realistic organization stats)
  const totalEmployees = data?.total_cmp || 0;
  const activeProjectsCount = data?.total_project || 0;
  const managersCount = data?.total_mr || 0;
  const teamLeadsCount = data?.total_tl || 0;
  const devsCount = data?.total_emp || 0;
  
  const presentCount = data?.present_count || 0;
  const onLeaveCount = data?.on_leave_count || 0;
  const lateCount = data?.late_count || 0;

  // Departments Mapping
  const deptCounts = {
    development: data?.dept_counts?.development || 0,
    design: data?.dept_counts?.design || 0,
    hr: data?.dept_counts?.hr || 0,
    marketing: data?.dept_counts?.marketing || 0,
    sales: data?.dept_counts?.sales || 0
  };

  const deptAttendance = {
    development: data?.dept_attendance?.development || 0,
    design: data?.dept_attendance?.design || 0,
    hr: data?.dept_attendance?.hr || 0,
    marketing: data?.dept_attendance?.marketing || 0,
    sales: data?.dept_attendance?.sales || 0
  };

  return (
    <div className="executive-dashboard-container">
      <style>{`
        /* Executive Dashboard Premium Styling CSS System */
        .executive-dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 8px 0;
          font-family: var(--font-base);
        }

        /* Hero Welcome Banner */
        .exec-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 20px;
          padding: 30px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15);
          position: relative;
          overflow: hidden;
          text-align: left;
        }
        .exec-banner::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%);
          top: -100px;
          right: -50px;
          z-index: 1;
        }
        .exec-banner-left {
          z-index: 2;
        }
        .exec-greeting {
          font-size: 0.9rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .exec-name {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0 0 6px 0;
          font-family: var(--font-display);
          background: linear-gradient(to right, #ffffff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .exec-subtitle {
          font-size: 0.95rem;
          color: #94a3b8;
          margin-bottom: 20px;
        }
        .exec-stats-bar {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }
        .exec-banner-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .exec-banner-stat-label {
          font-size: 0.72rem;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
        }
        .exec-banner-stat-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #f8fafc;
        }
        .exec-banner-right {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          min-width: 280px;
          backdrop-filter: blur(10px);
          z-index: 2;
          text-align: left;
        }
        .exec-summary-title {
          font-size: 0.8rem;
          color: #3b82f6;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .exec-summary-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.85rem;
        }
        .exec-summary-item:last-child {
          border-bottom: none;
        }

        /* KPI Cards Grid */
        .exec-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .exec-kpi-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .exec-kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.03);
          border-color: #cbd5e1;
        }
        .exec-kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .exec-kpi-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #ffffff;
        }
        .exec-kpi-trend {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 20px;
        }
        .exec-kpi-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .exec-kpi-lbl {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Layout Grid Blocks */
        .exec-panel-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .exec-panel-row {
            grid-template-columns: 1fr;
          }
        }

        .exec-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .exec-card-header {
          padding: 20px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .exec-card-header h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .exec-card-body {
          padding: 24px;
          text-align: left;
        }

        /* Department Stats List */
        .dept-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .dept-bar-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dept-bar-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
        }
        .dept-bar-track {
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }
        .dept-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s ease-out;
        }

        /* SVG Charts Layout */
        .svg-chart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 15px;
        }

        /* Leave approvals list styling */
        .pending-leave-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .pending-leave-row:last-child {
          border-bottom: none;
        }
        .pending-leave-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pending-leave-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
        }
        .pending-leave-dates {
          font-size: 0.76rem;
          color: #64748b;
        }
        .pending-leave-actions {
          display: flex;
          gap: 8px;
        }
        .btn-action-pill {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: background 0.2s;
        }
        .btn-action-pill.approve {
          background: #d1fae5;
          color: #065f46;
        }
        .btn-action-pill.approve:hover {
          background: #a7f3d0;
        }
        .btn-action-pill.reject {
          background: #fee2e2;
          color: #991b1b;
        }
        .btn-action-pill.reject:hover {
          background: #fecaca;
        }

        /* Quick Action Shortcut Panels */
        .quick-actions-panel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .quick-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 18px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: #ffffff;
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quick-action-btn:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          border-color: #cbd5e1;
          color: #3b82f6;
        }
        .quick-action-btn i {
          font-size: 1.3rem;
        }

        /* Feed list */
        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .feed-item {
          display: flex;
          gap: 12px;
          font-size: 0.85rem;
        }
        .feed-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .feed-desc {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .feed-text {
          color: #1e293b;
          font-weight: 600;
        }
        .feed-time {
          font-size: 0.72rem;
          color: #94a3b8;
        }

      `}</style>

      {/* SECTION 1: EXECUTIVE WELCOME BANNER */}
      <div className="exec-banner">
        <div className="exec-banner-left">
          <div className="exec-greeting">{getGreeting()}</div>
          <h1 className="exec-name">MD. {user?.name || 'Managing Director'}</h1>
          <div className="exec-subtitle">YGR Global IT Services • Executive Command Center</div>
          
          <div className="exec-stats-bar">
            <div className="exec-banner-stat">
              <span className="exec-banner-stat-label">Headcount</span>
              <span className="exec-banner-stat-value">{totalEmployees} Members</span>
            </div>
            <div className="exec-banner-stat">
              <span className="exec-banner-stat-label">Live Clock</span>
              <span className="exec-banner-stat-value">{liveTime || '09:00:00 AM'}</span>
            </div>
            <div className="exec-banner-stat">
              <span className="exec-banner-stat-label">Active Projects</span>
              <span className="exec-banner-stat-value">{activeProjectsCount} Units</span>
            </div>
            <div className="exec-banner-stat">
              <span className="exec-banner-stat-label">FY Cycle</span>
              <span className="exec-banner-stat-value">2026 - 2027</span>
            </div>
          </div>
        </div>

        <div className="exec-banner-right">
          <div className="exec-summary-title">Today's Summary</div>
          <div className="exec-summary-item">
            <span style={{ color: '#94a3b8' }}>Present Today</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>{presentCount}</span>
          </div>
          <div className="exec-summary-item">
            <span style={{ color: '#94a3b8' }}>Pending Leave Approvals</span>
            <span style={{ fontWeight: 700, color: '#ef4444' }}>{data?.pending_leaves_count || 0}</span>
          </div>
          <div className="exec-summary-item">
            <span style={{ color: '#94a3b8' }}>Corrections Waiting</span>
            <span style={{ fontWeight: 700, color: '#f59e0b' }}>{data?.pending_corrections_count || 0}</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: EXECUTIVE KPI CARDS (8 CARDS) */}
      <div className="exec-kpi-grid">
        {/* Card 1: Total Employees */}
        <div className="exec-kpi-card" onClick={() => navigate('/employees')}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#4f46e5' }}><i className="fa-solid fa-users"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#e0e7ff', color: '#4f46e5' }}>+12% MoM</span>
          </div>
          <div className="exec-kpi-val">{totalEmployees}</div>
          <div className="exec-kpi-lbl">Total Headcount</div>
        </div>

        {/* Card 2: Present Today */}
        <div className="exec-kpi-card" onClick={() => navigate('/attendance-list', { state: { statusFilter: 'Present' } })}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#10b981' }}><i className="fa-solid fa-user-check"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#d1fae5', color: '#065f46' }}>94.2% Rate</span>
          </div>
          <div className="exec-kpi-val">{presentCount}</div>
          <div className="exec-kpi-lbl">Present Today</div>
        </div>

        {/* Card 3: Employees on Leave */}
        <div className="exec-kpi-card" onClick={() => navigate('/tl-approved-leaves', { state: { statusFilter: 'Final Approved' } })}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#ef4444' }}><i className="fa-solid fa-plane-departure"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#fee2e2', color: '#991b1b' }}>4 Out Today</span>
          </div>
          <div className="exec-kpi-val">{onLeaveCount}</div>
          <div className="exec-kpi-lbl">Employees on Leave</div>
        </div>

        {/* Card 4: Active Projects */}
        <div className="exec-kpi-card" onClick={() => navigate('/tasks', { state: { activeTab: 'board', projectFilter: 'active' } })}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#3b82f6' }}><i className="fa-solid fa-diagram-project"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#d1fae5', color: '#065f46' }}>3 Active</span>
          </div>
          <div className="exec-kpi-val">{activeProjectsCount}</div>
          <div className="exec-kpi-lbl">Active Projects</div>
        </div>

        {/* Card 5: Pending Approvals */}
        <div className="exec-kpi-card" onClick={() => navigate('/leave-requests')}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#f59e0b' }}><i className="fa-solid fa-circle-exclamation"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#fef3c7', color: '#92400e' }}>High Action</span>
          </div>
          <div className="exec-kpi-val">{(data?.pending_leaves_count || 0) + (data?.pending_corrections_count || 0)}</div>
          <div className="exec-kpi-lbl">Pending Approvals</div>
        </div>

        {/* Card 6: Monthly Payroll */}
        <div className="exec-kpi-card" onClick={() => navigate('/payroll')}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#0ea5e9' }}><i className="fa-solid fa-file-invoice-dollar"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#e0f2fe', color: '#0369a1' }}>Processed</span>
          </div>
          <div className="exec-kpi-val">{data?.performance_data?.payroll_percentage || 0}%</div>
          <div className="exec-kpi-lbl">Monthly Payroll Status</div>
        </div>

        {/* Card 7: Company Revenue */}
        <div className="exec-kpi-card" onClick={() => navigate('/payroll')}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#8b5cf6' }}><i className="fa-solid fa-sack-dollar"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#ede9fe', color: '#5b21b6' }}>Total</span>
          </div>
          <div className="exec-kpi-val">${((data?.performance_data?.total_revenue || 0) / 1000).toFixed(1)}K</div>
          <div className="exec-kpi-lbl">Company Revenue</div>
        </div>

        {/* Card 8: Company Performance */}
        <div className="exec-kpi-card" onClick={() => navigate('/tasks')}>
          <div className="exec-kpi-header">
            <div className="exec-kpi-icon" style={{ background: '#ec4899' }}><i className="fa-solid fa-chart-line"></i></div>
            <span className="exec-kpi-trend" style={{ background: '#fce7f3', color: '#9d174d' }}>{data?.performance_data?.average_performance || 0}% Efficiency</span>
          </div>
          <div className="exec-kpi-val">
            {(data?.performance_data?.average_performance || 0) >= 90 ? 'Excellent' : 
             (data?.performance_data?.average_performance || 0) >= 70 ? 'Good' : 'Needs Focus'}
          </div>
          <div className="exec-kpi-lbl">Performance Score</div>
        </div>
      </div>

      {/* ROW 3: COMPANY OVERVIEW & ATTENDANCE ANALYTICS */}
      <div className="exec-panel-row">
        {/* Section 3: Company Overview */}
        <div className="exec-card">
          <div className="exec-card-header">
            <h3><i className="fa-solid fa-building" style={{ color: '#4f46e5' }}></i> Department Overview</h3>
          </div>
          <div className="exec-card-body">
            <div className="dept-list">
              <div className="dept-bar-item">
                <div className="dept-bar-meta">
                  <span>Development</span>
                  <span>{deptCounts.development} Developers</span>
                </div>
                <div className="dept-bar-track">
                  <div className="dept-bar-fill" style={{ width: `${Math.round((deptCounts.development / (totalEmployees || 1)) * 100)}%`, background: '#4f46e5' }}></div>
                </div>
              </div>
              <div className="dept-bar-item">
                <div className="dept-bar-meta">
                  <span>Design & UI</span>
                  <span>{deptCounts.design} Designers</span>
                </div>
                <div className="dept-bar-track">
                  <div className="dept-bar-fill" style={{ width: `${Math.round((deptCounts.design / (totalEmployees || 1)) * 100)}%`, background: '#3b82f6' }}></div>
                </div>
              </div>
              <div className="dept-bar-item">
                <div className="dept-bar-meta">
                  <span>HR Administration</span>
                  <span>{deptCounts.hr} Staff</span>
                </div>
                <div className="dept-bar-track">
                  <div className="dept-bar-fill" style={{ width: `${Math.round((deptCounts.hr / (totalEmployees || 1)) * 100)}%`, background: '#10b981' }}></div>
                </div>
              </div>
              <div className="dept-bar-item">
                <div className="dept-bar-meta">
                  <span>Sales & Account Strategy</span>
                  <span>{deptCounts.sales} Executive</span>
                </div>
                <div className="dept-bar-track">
                  <div className="dept-bar-fill" style={{ width: `${Math.round((deptCounts.sales / (totalEmployees || 1)) * 100)}%`, background: '#f59e0b' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Attendance Analytics (SVG Chart) */}
        <div className="exec-card">
          <div className="exec-card-header">
            <h3><i className="fa-solid fa-chart-bar" style={{ color: '#10b981' }}></i> Monthly Attendance Overview</h3>
          </div>
          <div className="exec-card-body">
            <div className="svg-chart-container">
              <svg width="420" height="150" viewBox="0 0 420 150">
                {/* Horizontal gridlines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="70" x2="380" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="120" x2="380" y2="120" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Y-Axis Label */}
                <text x="15" y="25" fill="#94a3b8" fontSize="10" fontWeight="700">100%</text>
                <text x="15" y="75" fill="#94a3b8" fontSize="10" fontWeight="700">50%</text>
                <text x="20" y="125" fill="#94a3b8" fontSize="10" fontWeight="700">0%</text>

                {/* Attendance Chart Bars */}
                {/* Bar 1 - Dev */}
                <rect x="70" y={120 - (deptAttendance.development || 0)} width="30" height={deptAttendance.development || 1} rx="4" fill="#3b82f6" />
                <text x="85" y="138" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle">Dev</text>
                
                {/* Bar 2 - Design */}
                <rect x="140" y={120 - (deptAttendance.design || 0)} width="30" height={deptAttendance.design || 1} rx="4" fill="#10b981" />
                <text x="155" y="138" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle">UI/UX</text>

                {/* Bar 3 - Sales */}
                <rect x="210" y={120 - (deptAttendance.sales || 0)} width="30" height={deptAttendance.sales || 1} rx="4" fill="#f59e0b" />
                <text x="225" y="138" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle">Sales</text>

                {/* Bar 4 - Marketing */}
                <rect x="280" y={120 - (deptAttendance.marketing || 0)} width="30" height={deptAttendance.marketing || 1} rx="4" fill="#8b5cf6" />
                <text x="295" y="138" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle">Mktg</text>

                {/* Bar 5 - HR */}
                <rect x="350" y={120 - (deptAttendance.hr || 0)} width="30" height={deptAttendance.hr || 1} rx="4" fill="#ec4899" />
                <text x="365" y="138" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle">HR</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 4: LEAVE APPROVAL CENTER & PAYROLL OVERVIEW */}
      <div className="exec-panel-row">
        {/* Section 5: Leave Approval Center */}
        <div className="exec-card">
          <div className="exec-card-header">
            <h3><i className="fa-solid fa-calendar-check" style={{ color: '#ef4444' }}></i> Pending Leave Approvals Center</h3>
          </div>
          <div className="exec-card-body">
            {data?.pending_leaves && data.pending_leaves.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {data.pending_leaves.slice(0, 4).map((l) => (
                  <div className="pending-leave-row" key={l.id}>
                    <div className="pending-leave-meta">
                      <span className="pending-leave-name">{l.employee_name}</span>
                      <span className="pending-leave-dates">{l.from_date} to {l.to_date} • {l.leave_type}</span>
                      <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', marginTop: '2.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={l.reason}>
                        Reason: {l.reason}
                      </div>
                    </div>
                    <div className="pending-leave-actions" style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-action-pill approve" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => handleLeaveAction(l.id, 'approve')}>
                        Approve
                      </button>
                      <button className="btn-action-pill reject" style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }} onClick={() => handleLeaveAction(l.id, 'reject')}>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#64748b', padding: '30px 0', textAlign: 'center' }}>No pending leave approvals found.</div>
            )}
          </div>
        </div>

        {/* Section 6: Payroll Overview */}
        <div className="exec-card">
          <div className="exec-card-header">
            <h3><i className="fa-solid fa-file-invoice-dollar" style={{ color: '#8b5cf6' }}></i> Payroll & Expense Statistics</h3>
          </div>
          <div className="exec-card-body" style={{ textAlign: 'left', fontSize: '13.5px', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>Monthly Salary Budget:</span>
              <strong style={{ color: '#0f172a' }}>₹{Number(data?.payroll_stats?.salary_budget || 0).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>PF & Contributions Total:</span>
              <strong style={{ color: '#10b981' }}>₹{Number(data?.payroll_stats?.pf_contributions || 0).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>Taxes Withheld (TDS):</span>
              <strong style={{ color: '#3b82f6' }}>₹{Number(data?.payroll_stats?.tds_withheld || 0).toLocaleString()}</strong>
            </div>
            <button className="btn" style={{ width: '100%', marginTop: '14px', background: '#4f46e5' }} onClick={() => navigate('/payroll')}>
              <i className="fa-solid fa-cloud-arrow-down"></i> Manage Payroll portal
            </button>
          </div>
        </div>
      </div>

      {/* ROW 5: ATTENDANCE CORRECTION APPROVALS CENTER */}
      <div className="exec-panel-row" style={{ marginTop: '24px' }}>
        <div className="exec-card" style={{ flex: 1 }}>
          <div className="exec-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3><i className="fa-solid fa-clock-rotate-left" style={{ color: '#3b82f6' }}></i> Attendance Correction Approvals Center</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-action-pill approve" style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }} onClick={() => handleBulkCorrectionAction('approve')}>Bulk Approve</button>
              <button className="btn-action-pill reject" style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }} onClick={() => handleBulkCorrectionAction('reject')}>Bulk Reject</button>
            </div>
          </div>
          <div className="exec-card-body">
            {data?.pending_corrections_list && data.pending_corrections_list.length > 0 ? (
              <div className="table-wrap">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 8px', width: '30px' }}>
                        <input type="checkbox" checked={selectedCorrectionIds.length === data.pending_corrections_list.length} onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCorrectionIds(data.pending_corrections_list.map(c => c.id));
                          } else {
                            setSelectedCorrectionIds([]);
                          }
                        }} />
                      </th>
                      <th style={{ padding: '12px 8px' }}>Request ID</th>
                      <th style={{ padding: '12px 8px' }}>Employee</th>
                      <th style={{ padding: '12px 8px' }}>Requested By</th>
                      <th style={{ padding: '12px 8px' }}>Date</th>
                      <th style={{ padding: '12px 8px' }}>Old Log</th>
                      <th style={{ padding: '12px 8px' }}>New Log</th>
                      <th style={{ padding: '12px 8px' }}>Reason</th>
                      <th style={{ padding: '12px 8px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pending_corrections_list.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                        <td style={{ padding: '12px 8px' }}>
                          <input type="checkbox" checked={selectedCorrectionIds.includes(c.id)} onChange={() => {
                            if (selectedCorrectionIds.includes(c.id)) {
                              setSelectedCorrectionIds(selectedCorrectionIds.filter(id => id !== c.id));
                            } else {
                              setSelectedCorrectionIds([...selectedCorrectionIds, c.id]);
                            }
                          }} />
                        </td>
                        <td><strong>#{c.id}</strong></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{c.employee_name}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{c.employee_id} • {c.department}</div>
                        </td>
                        <td>{c.requested_by}</td>
                        <td>{c.date}</td>
                        <td>
                          <div style={{ color: '#ef4444', fontWeight: 600 }}>{c.original_status}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            {c.original_check_in ? c.original_check_in.substring(11, 16) : '--:--'} - {c.original_check_out ? c.original_check_out.substring(11, 16) : '--:--'}
                          </div>
                        </td>
                        <td>
                          <div style={{ color: '#10b981', fontWeight: 600 }}>{c.new_status}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            {c.new_check_in ? c.new_check_in.substring(11, 16) : '--:--'} - {c.new_check_out ? c.new_check_out.substring(11, 16) : '--:--'}
                          </div>
                        </td>
                        <td style={{ color: '#475569', fontStyle: 'italic', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.reason}>{c.reason}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn-action-pill approve" style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }} onClick={() => handleCorrectionAction(c.id, 'approve')}>Approve</button>
                            <button className="btn-action-pill reject" style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }} onClick={() => handleCorrectionAction(c.id, 'reject')}>Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ color: '#64748b', padding: '20px 0', textAlign: 'center' }}>No pending attendance correction requests found.</div>
            )}
          </div>
        </div>
      </div>

      {/* ROW 6: ANNOUNCEMENTS & RECENT ACTIVITIES */}
      <div className="exec-panel-row">
        {/* Section 9: Announcements & Notices */}
        <div className="exec-card">
          <div className="exec-card-header">
            <h3><i className="fa-solid fa-bullhorn" style={{ color: '#f59e0b' }}></i> Corporate Announcements</h3>
          </div>
          <div className="exec-card-body" style={{ padding: '0px' }}>
            {data?.corporate_announcements && data.corporate_announcements.length > 0 ? (
              data.corporate_announcements.slice(0, 3).map((ann, idx) => (
                <div style={{ padding: '20px 24px', borderBottom: idx === 2 ? 'none' : '1px solid #f1f5f9' }} key={idx}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#334155', fontWeight: 800 }}>{ann.title}</h5>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>{ann.message}</p>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', padding: '20px 0', textAlign: 'center' }}>No corporate announcements found.</div>
            )}
          </div>
        </div>

        {/* Section 10: Recent Activities */}
        <div className="exec-card">
          <div className="exec-card-header">
            <h3><i className="fa-solid fa-clock-rotate-left" style={{ color: '#64748b' }}></i> Executive Log Audit</h3>
          </div>
          <div className="exec-card-body">
            <div className="feed-list">
              {data?.recent_activities && data.recent_activities.length > 0 ? (
                data.recent_activities.slice(0, 3).map((act, idx) => (
                  <div className="feed-item" key={idx}>
                    <div className="feed-icon"><i className={act.icon || "fa-solid fa-file-invoice"}></i></div>
                    <div className="feed-desc">
                      <span className="feed-text">{act.details}</span>
                      <span className="feed-time">{act.time_display}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', padding: '20px 0', textAlign: 'center' }}>No audit logs recorded.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 12: QUICK ACTIONS */}
      <div className="exec-card">
        <div className="exec-card-header">
          <h3><i className="fa-solid fa-bolt" style={{ color: '#f59e0b' }}></i> Executive Workspace Shortcuts</h3>
        </div>
        <div className="exec-card-body">
          <div className="quick-actions-panel">
            <button className="quick-action-btn" onClick={() => navigate('/employees')}>
              <i className="fa-solid fa-user-plus" style={{ color: '#3b82f6' }}></i>
              <span>Staff Registry</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/payroll')}>
              <i className="fa-solid fa-file-invoice-dollar" style={{ color: '#10b981' }}></i>
              <span>Generate Payroll</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/leave-requests')}>
              <i className="fa-solid fa-calendar-check" style={{ color: '#ef4444' }}></i>
              <span>Approve Leaves</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/attendance-list')}>
              <i className="fa-solid fa-chart-line" style={{ color: '#f59e0b' }}></i>
              <span>Attendance Sheet</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/holidays')}>
              <i className="fa-solid fa-calendar-days" style={{ color: '#8b5cf6' }}></i>
              <span>Holiday Calendar</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/settings')}>
              <i className="fa-solid fa-gears" style={{ color: '#64748b' }}></i>
              <span>Portal Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple banner greeting helper
const getGreeting = () => {
  const hrs = new Date().getHours();
  if (hrs < 12) return 'Good Morning';
  if (hrs < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export default MDDashboard;
