import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import OnLeaveTodayWidget from '../components/OnLeaveTodayWidget';

const TLDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { prompt: showPrompt } = useDialog();
  const [data, setData] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveTime, setLiveTime] = useState('');
  
  // Search & Filter state for Attendance Table
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showDevsModal, setShowDevsModal] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  const fetchAllData = async () => {
    try {
      const [tlRes, leavesRes, tasksRes, holidaysRes] = await Promise.all([
        api.get('/api/dashboard/teamlead/'),
        api.get('/api/leaves/', { params: { scope: 'team-all' } }),
        api.get('/api/tasks/'),
        api.get('/api/holidays/')
      ]);
      setData(tlRes.data);
      setLeaves(leavesRes.data.leaves || []);
      setTasks(tasksRes.data || []);
      setHolidays(holidaysRes.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mainEl = document.querySelector('.main');
    if (mainEl) {
      // Force padding to 0 when this dashboard mounts
      mainEl.style.setProperty('padding', '0', 'important');
    }
    return () => {
      if (mainEl) {
        // Restore standard padding on unmount
        mainEl.style.setProperty('padding', '24px', 'important');
      }
    };
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchAllData();
    
    // Live Clock Interval
    const timer = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAction = async (leaveId, action) => {
    let comments = "";
    if (action === 'reject') {
      comments = await showPrompt("Please enter comments/reason for rejection:");
      if (comments === null) return;
    } else {
      comments = await showPrompt("Enter any comments (optional):", "");
      if (comments === null) return;
    }

    try {
      await api.post(`/api/leaves/${leaveId}/action/`, { action, comments });
      showToast(`Leave request successfully updated.`, 'success');
      fetchAllData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update leave request.', 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', color: 'var(--muted)' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading Premium Workspace...
      </div>
    );
  }

  // Live Calculations
  const memberStatusList = data?.member_status_list || [];
  const presentCount = memberStatusList.filter(m => m.attendance_status && m.attendance_status.includes('Present')).length;
  const onLeaveCount = leaves.filter(l => {
    const todayStr = new Date().toISOString().split('T')[0];
    return l.status === 'Final Approved' && l.from_date <= todayStr && l.to_date >= todayStr;
  }).length;
  const pendingLeavesCount = leaves.filter(l => l.status === 'Pending Team Leader Approval').length;
  const pendingTaskReviewsCount = tasks.filter(t => t.status === 'Submitted').length;
  const activeProjectsCount = data?.projects_count || 0;
  const assignedDevsCount = data?.members_count || 0;

  // Filtered Attendance List
  const filteredAttendance = memberStatusList.filter(m => {
    const nameStr = m.name || '';
    const empIdStr = m.emp_id || '';
    const matchesSearch = nameStr.toLowerCase().includes(searchTerm.toLowerCase()) || empIdStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || m.attendance_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportAttendanceCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Employee,Employee ID,Check In,Status,Active Task,Task Status\r\n";
    filteredAttendance.forEach(row => {
      csvContent += `"${row.name}","${row.emp_id}","${row.check_in}","${row.attendance_status}","${row.current_task}","${row.task_status}"\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `team_attendance_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good Morning';
    if (hrs < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Task summary counts
  const taskSummary = {
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    overdue: tasks.filter(t => {
      const todayStr = new Date().toISOString().split('T')[0];
      return t.status !== 'Completed' && t.end_date < todayStr;
    }).length,
    blocked: tasks.filter(t => t.status === 'Blocked').length
  };
  const totalTasks = tasks.length || 1;

  const avgAttendanceRate = data?.attendance_rate ?? (
    memberStatusList.length > 0
      ? Math.round(memberStatusList.reduce((acc, m) => acc + (m.attendance_pct || 0), 0) / memberStatusList.length)
      : 0
  );

  const avgProductivity = data?.team_performance ?? (
    memberStatusList.length > 0
      ? Math.round(memberStatusList.reduce((acc, m) => acc + (m.productivity_pct || 0), 0) / memberStatusList.length)
      : 0
  );

  const completedTasksPct = totalTasks > 0 ? Math.round((taskSummary.completed / totalTasks) * 100) : 0;
  const presentPct = assignedDevsCount > 0 ? Math.round((presentCount / assignedDevsCount) * 100) : 0;

  // Leaves summary
  const approvedPaidLeaves = leaves.filter(l => l.leave_type === 'Paid' && l.status === 'Final Approved').length;
  const approvedUnpaidLeaves = leaves.filter(l => l.leave_type === 'Unpaid' && l.status === 'Final Approved').length;

  // Pending leaves for this TL
  const tlPendingLeaves = leaves.filter(l => l.status === 'Pending Team Leader Approval' && l.user !== user?.id);

  return (
    <div className="premium-tl-dashboard">
      <style>{`
        /* Override .main padding to allow full-width banner */
        .main {
          padding: 0 !important;
        }

        /* --- Styles --- */
        .premium-tl-dashboard {
          color: #1e293b;
          font-family: var(--font-sans, 'Inter', sans-serif);
        }
        
        /* Banner Card */
        .tl-welcome-banner {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
          color: #ffffff;
          border-radius: 0 !important;
          padding: 32px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 24px;
          text-align: left;
        }
        .banner-left {
          flex: 1;
          min-width: 280px;
        }
        .banner-greeting {
          font-size: 1.4rem;
          font-weight: 500;
          color: #a5f3fc;
          margin-bottom: 4px;
        }
        .banner-name {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
        }
        .banner-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          font-size: 0.88rem;
          color: #cbd5e1;
        }
        .banner-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .banner-detail-item i {
          color: #22d3ee;
          margin-top: 3px;
          flex-shrink: 0;
        }
        .banner-right {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          min-width: 320px;
        }
        .banner-metric-card {
          text-align: center;
        }
        .banner-metric-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #22d3ee;
        }
        .banner-metric-label {
          font-size: 0.72rem;
          color: #94a3b8;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }

        /* Stats Row */
        .tl-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
          padding: 0 24px;
        }
        .kpi-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          text-align: left;
        }
        .kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .kpi-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #fff;
        }
        .kpi-trend {
          font-size: 0.74rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .kpi-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .kpi-label {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Grid Layouts */
        .grid-70-30 {
          display: grid;
          grid-template-columns: 2.2fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
          padding: 0 24px;
        }
        .grid-50-50 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
          padding: 0 24px;
        }
        @media (max-width: 1024px) {
          .grid-70-30, .grid-50-50 {
            grid-template-columns: 1fr;
          }
        }

        /* Cards & Panels */
        .premium-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .card-header-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .card-header-action h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-header-action h3 i {
          color: #4f46e5;
        }
        .card-body-padding {
          padding: 20px;
        }

        /* Quick Action Buttons */
        .quick-actions-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .quick-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.8rem;
          color: #475569;
          transition: all 0.2s;
          cursor: pointer;
        }
        .quick-btn i {
          font-size: 1.4rem;
          margin-bottom: 8px;
          color: #4f46e5;
        }
        .quick-btn:hover {
          background: #e0e7ff;
          border-color: #c7d2fe;
          color: #4f46e5;
          transform: translateY(-2px);
        }

        /* Progress Widgets */
        .progress-widget-row {
          margin-bottom: 14px;
          text-align: left;
        }
        .progress-widget-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 4px;
        }
        .progress-bar-bg {
          height: 8px;
          background: #cbd5e1;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
        }

        /* Recent Activity Feed */
        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .activity-item {
          display: flex;
          gap: 12px;
        }
        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.88rem;
          color: #fff;
          flex-shrink: 0;
        }
        .activity-details {
          flex: 1;
        }
        .activity-text {
          font-size: 0.84rem;
          font-weight: 600;
          color: #334155;
        }
        .activity-time {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        /* Charts Row Grid */
        .charts-section-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
          padding: 0 24px;
        }

        /* Modal overlay and animations */
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
          max-height: 400px;
          overflow-y: auto;
        }
        .dev-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .dev-list-item:last-child {
          border-bottom: none;
        }
        .dev-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dev-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e0e7ff;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .dev-name-id {
          text-align: left;
        }
        .dev-name {
          font-weight: 700;
          color: #1e293b;
          font-size: 0.9rem;
        }
        .dev-id {
          font-size: 0.76rem;
          color: #64748b;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* ===== BOTTOM LIST ITEMS ===== */
        .bottom-list-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }
        .bottom-list-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .bottom-list-item:last-child {
          border-bottom: none;
        }
        .bottom-list-item-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .bottom-list-item-content, .bottom-list-content {
          flex: 1;
          min-width: 0;
        }
        .bottom-list-item-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bottom-list-item-sub {
          font-size: 0.75rem;
          color: #64748b;
          margin: 3px 0 0 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      {/* --- TOP WELCOME BANNER --- */}
      <div className="tl-welcome-banner">
        <div className="banner-left">
          <div className="banner-greeting">{getGreeting()}, Team Leader</div>
          <div className="banner-name">{user?.first_name || 'TL'} {user?.last_name || 'Workspace'}</div>
          <div className="banner-details-grid">
            <div className="banner-detail-item"><i className="fa-solid fa-id-card"></i> <span><strong>ID:</strong> {user?.emp_id || 'YGRTL001'}</span></div>
            <div className="banner-detail-item"><i className="fa-solid fa-sitemap"></i> <span><strong>Dept:</strong> {user?.department || 'Software Dev'}</span></div>
            <div className="banner-detail-item"><i className="fa-solid fa-users-viewfinder"></i> <span><strong>Team:</strong> {user?.team_name || 'Core Dev Team'}</span></div>
            <div className="banner-detail-item"><i className="fa-solid fa-user-tie"></i> <span><strong>Manager:</strong> {user?.reporting_manager_name || 'Managing Director'}</span></div>
            <div className="banner-detail-item"><i className="fa-solid fa-calendar-day"></i> <span><strong>Date:</strong> {new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span></div>
            <div className="banner-detail-item"><i className="fa-solid fa-clock"></i> <span><strong>Live:</strong> {liveTime || '04:26 PM'}</span></div>
            <div className="banner-detail-item"><i className="fa-solid fa-business-time"></i> <span><strong>Shift:</strong> General (09:30 AM - 06:30 PM)</span></div>
          </div>
        </div>
        <div className="banner-right">
          <div className="banner-metric-card">
            <div className="banner-metric-value">{avgProductivity}%</div>
            <div className="banner-metric-label">Team Performance</div>
          </div>
          <div className="banner-metric-card">
            <div className="banner-metric-value">{avgAttendanceRate}%</div>
            <div className="banner-metric-label">Attendance Rate</div>
          </div>
          <div className="banner-metric-card" style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
            <div className="banner-metric-value" style={{ fontSize: '1rem', color: '#cbd5e1' }}>{data?.projects?.[0]?.project_name || 'YGR CRM System'}</div>
            <div className="banner-metric-label">Active Sprint / Project</div>
          </div>
        </div>
      </div>

      {/* --- SECOND ROW: 6 KPI CARDS --- */}
      <div className="dashboard-content-wrapper" style={{ padding: '0 24px' }}>
        <div className="tl-kpi-grid" style={{ padding: '0' }}>
        <div className="kpi-card" onClick={() => navigate('/tasks', { state: { activeTab: 'board', projectFilter: 'active' } })}>
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#4f46e5' }}><i className="fa-solid fa-diagram-project"></i></div>
            <span className="kpi-trend" style={{ background: '#d1fae5', color: '#065f46' }}>+2 New</span>
          </div>
          <div className="kpi-value">{activeProjectsCount}</div>
          <div className="kpi-label">Active Projects</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/attendance-list')}>
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#10b981' }}><i className="fa-solid fa-users"></i></div>
            <span className="kpi-trend" style={{ background: '#fef3c7', color: '#92400e' }}>Active</span>
          </div>
          <div className="kpi-value">{assignedDevsCount}</div>
          <div className="kpi-label">Assigned Developers</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/attendance-list', { state: { statusFilter: 'Present' } })}>
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#3b82f6' }}><i className="fa-solid fa-user-check"></i></div>
            <span className="kpi-trend" style={{ background: '#d1fae5', color: '#065f46' }}>{presentPct}% Present</span>
          </div>
          <div className="kpi-value">{presentCount}</div>
          <div className="kpi-label">Present Today</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/tl-approved-leaves', { state: { statusFilter: 'Final Approved' } })}>
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#ef4444' }}><i className="fa-solid fa-house-laptop"></i></div>
            <span className="kpi-trend" style={{ background: '#f1f5f9', color: '#475569' }}>Today</span>
          </div>
          <div className="kpi-value">{onLeaveCount}</div>
          <div className="kpi-label">Employees on Leave</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/tasks', { state: { activeTab: 'board', statusFilter: 'Submitted' } })}>
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#f59e0b' }}><i className="fa-solid fa-code-pull-request"></i></div>
            <span className="kpi-trend" style={{ background: '#fee2e2', color: '#991b1b' }}>High</span>
          </div>
          <div className="kpi-value">{pendingTaskReviewsCount}</div>
          <div className="kpi-label">Pending Task Reviews</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/leave-requests', { state: { statusFilter: 'Pending Team Leader Approval' } })}>
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#ec4899' }}><i className="fa-solid fa-envelope-open-text"></i></div>
            <span className="kpi-trend" style={{ background: '#e0e7ff', color: '#3730a3' }}>TL Action</span>
          </div>
          <div className="kpi-value">{pendingLeavesCount}</div>
          <div className="kpi-label">Pending Leave Approvals</div>
        </div>
      </div>

      {/* --- THIRD ROW: ATTENDANCE & QUICK ACTIONS --- */}
      <div className="grid-70-30">
        {/* Attendance panel */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-users-line"></i> Today's Team Attendance</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Search Developer..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem' }}
              />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)} 
                style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}
              >
                <option value="">All Statuses</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="On Leave">Leave</option>
              </select>
              <button className="download-btn" onClick={exportAttendanceCSV} style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <i className="fa-solid fa-file-export"></i> Export
              </button>
            </div>
          </div>
          <div className="card-body-padding" style={{ padding: '0px' }}>
            <div className="table-wrap">
              <table className="dense-table" style={{ margin: '0px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th>Employee</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hours</th>
                    <th>Status</th>
                    <th>Active Task</th>
                    <th>Task Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.length > 0 ? (
                    filteredAttendance.map((m) => (
                      <tr key={m.id}>
                        <td style={{ fontWeight: 600 }}>{m.name} ({m.emp_id})</td>
                        <td>{m.check_in}</td>
                        <td>{m.check_out || '—'}</td>
                        <td>{m.working_hours || '8.0'} Hrs</td>
                        <td>
                          <span className={`badge-capsule ${m.attendance_status === 'Present' ? 'success' : m.attendance_status === 'Absent' ? 'danger' : 'warning'}`}>
                            {m.attendance_status}
                          </span>
                        </td>
                        <td>{m.current_task}</td>
                        <td>
                          {m.task_status !== '—' ? (
                            <span className={`badge-capsule ${m.task_status === 'Completed' ? 'success' : m.task_status === 'Submitted' ? 'info' : 'warning'}`}>
                              {m.task_status}
                            </span>
                          ) : '—'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>No matches found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-bolt"></i> Quick Actions</h3>
          </div>
          <div className="card-body-padding">
            <div className="quick-actions-list">
              <Link to="/tasks" className="quick-btn"><i className="fa-solid fa-plus-circle"></i>Assign Task</Link>
              <Link to="/leave-requests" className="quick-btn"><i className="fa-solid fa-calendar-check"></i>Approve Leave</Link>
              <Link to="/projects" className="quick-btn"><i className="fa-solid fa-folder-plus"></i>Create Project</Link>
              <Link to="/attendance-list" className="quick-btn"><i className="fa-solid fa-user-clock"></i>Team Attendance</Link>
              <Link to="/tasks" className="quick-btn"><i className="fa-solid fa-chart-line"></i>Reports</Link>
              <button className="quick-btn" onClick={() => setShowCreateTeamModal(true)}><i className="fa-solid fa-network-wired"></i>Create Team</button>
              <Link to="/messages" className="quick-btn" style={{ gridColumn: 'span 2' }}><i className="fa-solid fa-bullhorn"></i>Announcements</Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOURTH ROW: TASK PROGRESS & PROJECT OVERVIEW --- */}
      <div className="grid-50-50">
        {/* Task Progress */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-list-check"></i> Task Progress</h3>
          </div>
          <div className="card-body-padding">
            <div className="progress-widget-row">
              <div className="progress-widget-label">
                <span>Completed Tasks</span>
                <span>{taskSummary.completed} / {totalTasks} ({Math.round(taskSummary.completed/totalTasks * 100)}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${taskSummary.completed/totalTasks * 100}%`, background: 'var(--success)' }}></div>
              </div>
            </div>
            <div className="progress-widget-row">
              <div className="progress-widget-label">
                <span>In Progress</span>
                <span>{taskSummary.inProgress} / {totalTasks} ({Math.round(taskSummary.inProgress/totalTasks * 100)}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${taskSummary.inProgress/totalTasks * 100}%`, background: 'var(--accent-blue)' }}></div>
              </div>
            </div>
            <div className="progress-widget-row">
              <div className="progress-widget-label">
                <span>Pending Review</span>
                <span>{taskSummary.pending} / {totalTasks} ({Math.round(taskSummary.pending/totalTasks * 100)}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${taskSummary.pending/totalTasks * 100}%`, background: 'var(--warning)' }}></div>
              </div>
            </div>
            <div className="progress-widget-row">
              <div className="progress-widget-label">
                <span>Overdue Tasks</span>
                <span>{taskSummary.overdue} / {totalTasks} ({Math.round(taskSummary.overdue/totalTasks * 100)}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${taskSummary.overdue/totalTasks * 100}%`, background: '#ef4444' }}></div>
              </div>
            </div>
            <div className="progress-widget-row" style={{ marginBottom: '0px' }}>
              <div className="progress-widget-label">
                <span>Blocked Tasks</span>
                <span>{taskSummary.blocked} / {totalTasks} ({Math.round(taskSummary.blocked/totalTasks * 100)}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${taskSummary.blocked/totalTasks * 100}%`, background: '#64748b' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-folder-tree"></i> Project Overview</h3>
          </div>
          <div className="card-body-padding" style={{ padding: '0px' }}>
            <div className="table-wrap">
              <table className="dense-table" style={{ margin: '0px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th>Project Name</th>
                    <th>Progress</th>
                    <th>Deadline</th>
                    <th>Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.projects && data.projects.length > 0 ? (
                    data.projects.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{p.project_name}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="progress-bar-bg" style={{ width: '60px', height: '6px' }}>
                              <div className="progress-bar-fill" style={{ width: `${p.progress || 0}%`, background: '#4f46e5' }}></div>
                            </div>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{p.progress || 0}%</span>
                          </div>
                        </td>
                        <td>{p.deadline || '—'}</td>
                        <td>
                          <span className={`badge-capsule ${p.risk_level === 'High' ? 'danger' : p.risk_level === 'Medium' ? 'warning' : 'success'}`}>
                            {p.risk_level || 'Low Risk'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>No active projects.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- FIFTH ROW: LEAVE REQUESTS & RECENT ACTIVITIES --- */}
      <div className="grid-50-50">
        {/* Pending Leave Requests */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-envelope-open-text"></i> Pending Leave Requests</h3>
          </div>
          <div className="card-body-padding" style={{ padding: '0px' }}>
            <div className="table-wrap">
              <table className="dense-table" style={{ margin: '0px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Dates</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tlPendingLeaves.length > 0 ? (
                    tlPendingLeaves.map((l) => (
                      <tr key={l.id}>
                        <td style={{ fontWeight: 600 }}>{l.user_full_name}</td>
                        <td>{l.leave_type} Leave</td>
                        <td>{l.from_date} to {l.to_date}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button className="download-btn" onClick={() => handleAction(l.id, 'approve')} style={{ padding: '4px 8px', fontSize: '0.74rem' }}>Approve</button>
                            <button className="view-btn" onClick={() => handleAction(l.id, 'reject')} style={{ padding: '4px 8px', fontSize: '0.74rem', color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}>Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>No pending leave approvals.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent activities */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-list-ul"></i> Recent Team Activities</h3>
          </div>
          <div className="card-body-padding">
            <div className="activity-feed">
              {data?.team_activities && data.team_activities.length > 0 ? (
                data.team_activities.map((act, idx) => (
                  <div className="activity-item" key={idx}>
                    <div className="activity-icon" style={{ background: act.color || 'var(--success)' }}>
                      <i className={act.icon || "fa-solid fa-file-invoice"}></i>
                    </div>
                    <div className="activity-details">
                      <div className="activity-text">{act.details}</div>
                      <div className="activity-time">{act.time_display}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: '20px 0' }}>No recent activities logged.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- FIFTH ROW: ON LEAVE TODAY WIDGET --- */}
      <div className="grid-100" style={{ marginTop: '24px', marginBottom: '24px' }}>
        <OnLeaveTodayWidget onLeaveList={data?.on_leave_today || []} />
      </div>

      {/* --- SIXTH ROW: DEVELOPER PERFORMANCE & UPCOMING DEADLINES --- */}
      <div className="grid-50-50">
        {/* Developer Performance */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-chart-line"></i> Developer Performance</h3>
          </div>
          <div className="card-body-padding" style={{ padding: '0px' }}>
            <div className="table-wrap">
              <table className="dense-table" style={{ margin: '0px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th>Employee</th>
                    <th>Tasks Completed</th>
                    <th>Attendance %</th>
                    <th>Productivity</th>
                  </tr>
                </thead>
                <tbody>
                  {memberStatusList.slice(0, 5).map((m) => {
                    const attPct = m.attendance_pct ?? 0;
                    const prodPct = m.productivity_pct ?? 0;
                    return (
                      <tr key={m.id}>
                        <td style={{ fontWeight: 600 }}>{m.name}</td>
                        <td>{m.tasks_completed || 0} Tasks</td>
                        <td>{attPct}%</td>
                        <td>
                          <span className="badge-capsule success" style={{
                            background: prodPct >= 75 ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
                            color: prodPct >= 75 ? '#10b981' : '#3b82f6'
                          }}>
                            {prodPct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-calendar-times"></i> Upcoming Deadlines</h3>
          </div>
          <div className="card-body-padding" style={{ padding: '0px' }}>
            <div className="table-wrap">
              <table className="dense-table" style={{ margin: '0px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th>Task / Project</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.upcoming_tasks && data.upcoming_tasks.length > 0 ? (
                    data.upcoming_tasks.slice(0, 4).map((t) => (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 600 }}>{t.task_name}</td>
                        <td>{t.end_date}</td>
                        <td>
                          <span className="badge-capsule danger" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>High</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>No upcoming deadlines.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEVENTH ROW: SVG CHARTS --- */}
      <div className="charts-section-grid">
        {/* Chart 1: Attendance Trend — dynamic line chart */}
        {(() => {
          const trend = data?.attendance_trend || [0,0,0,0,0,0,0];
          const labels = data?.day_labels || ['','','','','','',''];
          const W = 220, H = 80, pad = 8;
          const maxVal = Math.max(...trend, 1);
          const pts = trend.map((v, i) => {
            const x = pad + (i / 6) * (W - 2 * pad);
            const y = H - pad - (v / 100) * (H - 2 * pad);
            return `${x},${y}`;
          });
          const polyline = pts.join(' ');
          const area = `${pad},${H - pad} ${polyline} ${W - pad},${H - pad}`;
          return (
            <div className="premium-card" style={{ overflow: 'hidden' }}>
              <div className="card-header-action">
                <h3 style={{ fontSize: '0.85rem' }}><i className="fa-solid fa-chart-area"></i> Attendance Trend</h3>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b82f6', background: 'rgba(59,130,246,0.08)', padding: '2px 8px', borderRadius: '999px' }}>{avgAttendanceRate}%</span>
              </div>
              <div style={{ padding: '4px 12px 0' }}>
                <svg width="100%" height="80" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[25,50,75,100].map(g => {
                    const gy = H - pad - (g / 100) * (H - 2 * pad);
                    return <line key={g} x1={pad} y1={gy} x2={W - pad} y2={gy} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3,3" />;
                  })}
                  <polygon points={area} fill="url(#attGrad)" />
                  <polyline points={polyline} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                  {trend.map((v, i) => {
                    const x = pad + (i / 6) * (W - 2 * pad);
                    const y = H - pad - (v / 100) * (H - 2 * pad);
                    return (
                      <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    );
                  })}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px', padding: '0 4px 8px' }}>
                  {labels.map((l, i) => (
                    <span key={i} style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600 }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Chart 2: Weekly Productivity — dynamic bar chart */}
        {(() => {
          const trend = data?.productivity_trend || [0,0,0,0,0,0,0];
          const labels = data?.day_labels || ['','','','','','',''];
          const W = 220, H = 72, pad = 6;
          const maxVal = Math.max(...trend, 1);
          const barW = 22, gap = (W - 2 * pad - 7 * barW) / 6;
          const colors = ['#60a5fa','#60a5fa','#60a5fa','#60a5fa','#60a5fa','#60a5fa','#10b981'];
          return (
            <div className="premium-card" style={{ overflow: 'hidden' }}>
              <div className="card-header-action">
                <h3 style={{ fontSize: '0.85rem' }}><i className="fa-solid fa-chart-bar"></i> Weekly Productivity</h3>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.08)', padding: '2px 8px', borderRadius: '999px' }}>{avgProductivity}%</span>
              </div>
              <div style={{ padding: '4px 12px 0' }}>
                <svg width="100%" height="72" viewBox={`0 0 ${W} ${H}`}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <linearGradient id="barGradGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  {/* Baseline */}
                  <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#e2e8f0" strokeWidth="1" />
                  {trend.map((v, i) => {
                    const barH = Math.max((v / 100) * (H - 2 * pad), 2);
                    const x = pad + i * (barW + gap);
                    const y = H - pad - barH;
                    const isLast = i === trend.length - 1;
                    return (
                      <g key={i}>
                        {/* Shadow bar (always show min height) */}
                        <rect x={x} y={H - pad - (H - 2*pad)} width={barW} height={H - 2*pad} rx="4" fill="#f1f5f9" />
                        {/* Value bar */}
                        <rect x={x} y={y} width={barW} height={barH} rx="4" fill={isLast ? 'url(#barGradGreen)' : 'url(#barGrad)'} opacity={v === 0 ? 0.3 : 1} />
                        {/* Value label */}
                        {v > 0 && <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize="6" fontWeight="700" fill={isLast ? '#10b981' : '#3b82f6'}>{v}%</text>}
                      </g>
                    );
                  })}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px', padding: '0 4px 8px' }}>
                  {labels.map((l, i) => (
                    <span key={i} style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600, width: '22px', textAlign: 'center' }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Chart 3: Task Completion */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3 style={{ fontSize: '0.85rem' }}><i className="fa-solid fa-chart-pie"></i> Task Completion</h3>
          </div>
          <div className="card-body-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ position: 'relative', width: 72, height: 72 }}>
              <svg width="72" height="72" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15.91" fill="none" stroke={completedTasksPct > 0 ? '#10b981' : '#e2e8f0'} strokeWidth="3.5"
                  strokeDasharray={`${completedTasksPct} ${100 - completedTasksPct}`} strokeDashoffset="25"
                  style={{ transition: 'stroke-dasharray 0.6s ease' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: completedTasksPct > 0 ? '#10b981' : '#94a3b8' }}>
                {completedTasksPct}%
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: completedTasksPct > 0 ? '#0f172a' : '#94a3b8' }}>{taskSummary.completed}</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Completed</div>
              <div style={{ fontSize: '0.68rem', color: '#f59e0b', fontWeight: 700, marginTop: 3 }}>{taskSummary.inProgress} In Progress</div>
              <div style={{ fontSize: '0.68rem', color: '#ef4444', fontWeight: 700 }}>{taskSummary.overdue} Overdue</div>
            </div>
          </div>
        </div>

        {/* Chart 4: Leave Statistics */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3 style={{ fontSize: '0.85rem' }}><i className="fa-solid fa-calendar-minus"></i> Leave Statistics</h3>
          </div>
          <div className="card-body-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            {approvedPaidLeaves === 0 && approvedUnpaidLeaves === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <svg width="72" height="72" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <text x="18" y="22" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="700">0</text>
                </svg>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>No leaves</span>
              </div>
            ) : (
              <svg width="72" height="72" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10b981" strokeWidth="4"
                  strokeDasharray={`${Math.min(approvedPaidLeaves * 10, 100)} ${Math.max(100 - approvedPaidLeaves * 10, 0)}`} strokeDashoffset="25" />
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f59e0b" strokeWidth="4"
                  strokeDasharray={`${Math.min(approvedUnpaidLeaves * 10, 100)} ${Math.max(100 - approvedUnpaidLeaves * 10, 0)}`}
                  strokeDashoffset={`${25 - approvedPaidLeaves * 10}`} />
              </svg>
            )}
            <div style={{ textAlign: 'left', fontSize: '0.74rem', fontWeight: 600, color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                <span><b>{approvedPaidLeaves}</b> Paid</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
                <span><b>{approvedUnpaidLeaves}</b> Unpaid</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                <span><b>{onLeaveCount}</b> On Leave Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 5: Project Progress */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3 style={{ fontSize: '0.85rem' }}><i className="fa-solid fa-tasks"></i> Project Progress</h3>
          </div>
          <div className="card-body-padding" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data?.projects && data.projects.length > 0 ? (
              data.projects.slice(0, 3).map((p, idx) => {
                const colors = ['#3b82f6','#10b981','#f59e0b'];
                const pct = p.progress || 0;
                return (
                  <div key={p.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, marginBottom: 5 }}>
                      <span style={{ color: '#334155', maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.project_name}</span>
                      <span style={{ color: colors[idx % colors.length] }}>{pct}%</span>
                    </div>
                    <div style={{ background: '#f1f5f9', borderRadius: 999, height: 7, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${colors[idx % colors.length]}, ${colors[idx % colors.length]}cc)`, borderRadius: 999, transition: 'width 0.6s ease', minWidth: pct > 0 ? '8px' : '0' }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center', padding: '16px 0' }}>
                <i className="fa-solid fa-folder-open" style={{ fontSize: '1.5rem', marginBottom: 6 }}></i><br/>No projects in scope.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: MESSAGES, NOTIFICATIONS, HOLIDAYS, ANNOUNCEMENTS --- */}
      <div className="bottom-dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {/* Recent Messages */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-comments"></i> Recent Messages</h3>
            <Link to="/messages" className="card-link" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4f46e5' }}>Chat</Link>
          </div>
          <div className="card-body-padding" style={{ padding: '10px 20px' }}>
            <div className="bottom-list-container">
              {data?.recent_messages && data.recent_messages.length > 0 ? (
                data.recent_messages.map((msg, index) => (
                  <div className="bottom-list-item" key={index} style={{ borderBottom: index === data.recent_messages.length - 1 ? 'none' : '1px solid #f1f5f9', padding: '10px 0' }}>
                    <div className="bottom-list-item-avatar" style={{ background: '#3b82f6' }}>{msg.sender_name.substring(0, 2).toUpperCase()}</div>
                    <div className="bottom-list-item-content">
                      <h5 className="bottom-list-item-title">{msg.sender_name}</h5>
                      <p className="bottom-list-item-sub">{msg.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: '20px 0' }}>No recent messages</div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-bell"></i> Notifications</h3>
          </div>
          <div className="card-body-padding" style={{ padding: '10px 20px' }}>
            <div className="bottom-list-container">
              {data?.notifications && data.notifications.length > 0 ? (
                data.notifications.map((notif, index) => (
                  <div className="bottom-list-item" key={index} style={{ borderBottom: index === data.notifications.length - 1 ? 'none' : '1px solid #f1f5f9', padding: '10px 0' }}>
                    <div className="bottom-list-item-avatar" style={{ background: '#f59e0b', fontSize: '10px' }}><i className="fa-solid fa-bell"></i></div>
                    <div className="bottom-list-item-content">
                      <h5 className="bottom-list-item-title">{notif.title}</h5>
                      <p className="bottom-list-item-sub">{notif.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: '20px 0' }}>No new notifications</div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-umbrella-beach"></i> Upcoming Holidays</h3>
            <Link to="/holidays" className="card-link" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4f46e5' }}>Calendar</Link>
          </div>
          <div className="card-body-padding" style={{ padding: '10px 20px' }}>
            <div className="bottom-list-container">
              {holidays && holidays.length > 0 ? (
                holidays.slice(0, 2).map((h, index) => (
                  <div className="bottom-list-item" key={h.id} style={{ borderBottom: index === 0 ? '1px solid #f1f5f9' : 'none', padding: '10px 0' }}>
                    <div className="bottom-list-item-avatar" style={{ background: '#10b981', fontSize: '10px' }}><i className="fa-solid fa-umbrella-beach"></i></div>
                    <div className="bottom-list-item-content">
                      <h5 className="bottom-list-item-title">{h.name}</h5>
                      <p className="bottom-list-item-sub">{h.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: '20px 0' }}>No upcoming holidays</div>
              )}
            </div>
          </div>
        </div>

        {/* Company Announcements */}
        <div className="premium-card">
          <div className="card-header-action">
            <h3><i className="fa-solid fa-bullhorn"></i> Announcements</h3>
          </div>
          <div className="card-body-padding" style={{ padding: '10px 20px' }}>
            <div className="bottom-list-container">
              {data?.announcements && data.announcements.length > 0 ? (
                data.announcements.map((ann, index) => (
                  <div className="bottom-list-item" key={index} style={{ borderBottom: index === data.announcements.length - 1 ? 'none' : '1px solid #f1f5f9', padding: '10px 0' }}>
                    <div className="bottom-list-content">
                      <h5 className="bottom-list-item-title" style={{ fontSize: '0.8rem', color: '#4f46e5' }}>{ann.title}</h5>
                      <p className="bottom-list-item-sub" style={{ fontSize: '0.7rem' }}>{ann.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: '20px 0' }}>No announcements</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDevsModal && (
        <div className="modal-overlay" onClick={() => setShowDevsModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Assigned Developers ({memberStatusList.length})</h3>
              <button className="modal-close-btn" onClick={() => setShowDevsModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {memberStatusList.length > 0 ? (
                memberStatusList.map((m) => {
                  const initial = m.name ? m.name.substring(0, 2).toUpperCase() : 'DV';
                  return (
                    <div className="dev-list-item" key={m.id}>
                      <div className="dev-info">
                        <div className="dev-avatar">{initial}</div>
                        <div className="dev-name-id">
                          <div className="dev-name">{m.name}</div>
                          <div className="dev-id">ID: {m.emp_id}</div>
                        </div>
                      </div>
                      <span className={`badge-capsule ${m.attendance_status === 'Present' ? 'success' : m.attendance_status === 'Absent' ? 'danger' : 'warning'}`}>
                        {m.attendance_status}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div style={{ color: '#64748b', textAlign: 'center', padding: '20px 0' }}>No developers assigned in this team.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateTeamModal && (
        <div className="modal-overlay" onClick={() => setShowCreateTeamModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Team</h3>
              <button className="modal-close-btn" onClick={() => setShowCreateTeamModal(false)}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'left' }}>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const payload = Object.fromEntries(formData);
                try {
                  await api.post('/api/teams/', payload);
                  showToast('Team created successfully!', 'success');
                  setShowCreateTeamModal(false);
                } catch (err) {
                  showToast(err.response?.data?.detail || 'Failed to create team.', 'error');
                }
              }}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Team Name</label>
                  <input name="name" required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Department</label>
                  <input name="department" defaultValue="python_dev" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <button type="submit" className="download-btn" style={{ width: '100%', padding: '12px', fontSize: '0.95rem', borderRadius: '8px', background: '#10b981', color: 'white', border: 'none', fontWeight: 'bold' }}>
                  Create Team
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      </div> {/* Close dashboard-content-wrapper */}
    </div>
  );
};

export default TLDashboard;
