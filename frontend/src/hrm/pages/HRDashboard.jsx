import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import OnLeaveTodayWidget from '../components/OnLeaveTodayWidget';

const HRDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { prompt: showPrompt } = useDialog();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveTime, setLiveTime] = useState('');

  // Leaves action state
  const [pendingLeaves, setPendingLeaves] = useState([]);

  useEffect(() => {
    const fetchHRStats = async () => {
      try {
        const res = await api.get('/api/dashboard/hr/');
        setStats(res.data);
        
        // Fetch leaves queue
        const leavesRes = await api.get('/api/leaves/', { params: { scope: 'team-pending' } });
        setPendingLeaves(leavesRes.data.leaves || []);
      } catch (err) {
        console.error('Error fetching HR dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHRStats();

    // Clock
    const timer = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLeaveAction = async (leaveId, action) => {
    const comments = await showPrompt(`Enter remarks for ${action}ing this leave request:`) || "";
    if (comments === null) return;
    try {
      await api.post(`/api/leaves/${leaveId}/action/`, { action, comments });
      showToast(`Leave request has been successfully ${action}ed.`, 'success');
      // Reload
      const leavesRes = await api.get('/api/leaves/', { params: { scope: 'team-pending' } });
      setPendingLeaves(leavesRes.data.leaves || []);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update leave request.', 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', color: 'var(--muted)' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading HR Portal Deck...
      </div>
    );
  }

  // Operation Metrics - all pulled from backend stats directly
  const totalEmployees = stats?.total_users || 0;
  const presentCount = stats?.present_count || 0;
  const onLeaveCount = stats?.on_leave_count || 0;
  const absentCount = stats?.absent_count || 0;

  return (
    <div className="hr-workspace-container">
      <style>{`
        /* HR premium dashboard styles */
        .hr-workspace-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 8px 0;
          font-family: var(--font-base);
        }

        /* Banner styling */
        .hr-banner {
          background: linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%);
          border-radius: 20px;
          padding: 30px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.15);
          text-align: left;
        }
        .hr-banner-left {
          z-index: 2;
        }
        .hr-greeting {
          font-size: 0.9rem;
          color: #ccfbf1;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .hr-name-title {
          font-size: 2.1rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0 0 6px 0;
          font-family: var(--font-display);
        }
        .hr-subtitle {
          font-size: 0.95rem;
          color: #99f6e4;
          margin-bottom: 20px;
        }
        .hr-meta-row {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }
        .hr-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hr-meta-label {
          font-size: 0.72rem;
          color: #99f6e4;
          text-transform: uppercase;
          font-weight: 700;
        }
        .hr-meta-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
        }
        .hr-banner-right {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          min-width: 280px;
          backdrop-filter: blur(8px);
          z-index: 2;
          text-align: left;
        }
        .hr-banner-right-title {
          font-size: 0.8rem;
          color: #ccfbf1;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        /* 8 Cards grid */
        .hr-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .hr-kpi-card {
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
        .hr-kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }
        .hr-kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .hr-kpi-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #ffffff;
        }
        .hr-kpi-trend {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 20px;
        }
        .hr-kpi-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .hr-kpi-lbl {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Blocks */
        .hr-panel-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .hr-panel-row {
            grid-template-columns: 1fr;
          }
        }

        .hr-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .hr-card-header {
          padding: 20px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hr-card-header h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hr-card-body {
          padding: 24px;
          text-align: left;
        }

        /* Lists */
        .hr-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .hr-list-item:last-child {
          border-bottom: none;
        }
        .hr-list-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }
        .hr-list-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
        }
        .hr-list-sub {
          font-size: 0.76rem;
          color: #64748b;
        }
        .hr-list-actions {
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

        /* Shortcuts */
        .hr-shortcuts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .hr-shortcut-btn {
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
        .hr-shortcut-btn:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          border-color: #cbd5e1;
          color: #0d9488;
        }
        .hr-shortcut-btn i {
          font-size: 1.3rem;
        }

        /* Feeds */
        .hr-feed-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hr-feed-item {
          display: flex;
          gap: 12px;
          font-size: 0.85rem;
        }
        .hr-feed-icon {
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
        .hr-feed-desc {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .hr-feed-text {
          color: #1e293b;
          font-weight: 600;
        }
        .hr-feed-time {
          font-size: 0.72rem;
          color: #94a3b8;
        }

      `}</style>

      {/* SECTION 1: HR WELCOME BANNER */}
      <div className="hr-banner">
        <div className="hr-banner-left">
          <div className="hr-greeting">{getGreeting()}</div>
          <h1 className="hr-name-title">{user?.name || 'HR Specialist'}</h1>
          <div className="hr-subtitle">YGR Gobal IT Services • Human Resources Portal</div>
          
          <div className="hr-meta-row">
            <div className="hr-meta-item">
              <span className="hr-meta-label">Employee ID</span>
              <span className="hr-meta-value">{user?.emp_id || 'YGRHR001'}</span>
            </div>
            <div className="hr-meta-item">
              <span className="hr-meta-label">Live Clock</span>
              <span className="hr-meta-value">{liveTime || '09:00:00 AM'}</span>
            </div>
            <div className="hr-meta-item">
              <span className="hr-meta-label">Verification Queue</span>
              <span className="hr-meta-value">{stats?.pending_documents?.length || 0} Pending</span>
            </div>
            <div className="hr-meta-item">
              <span className="hr-meta-label">Dept Scope</span>
              <span className="hr-meta-value">Human Resources</span>
            </div>
          </div>
        </div>

        <div className="hr-banner-right">
          <div className="hr-banner-right-title">Today's Summary</div>
          <div className="hr-list-item" style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#ccfbf1', fontSize: '0.82rem' }}>Staff Present</span>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>{stats?.present_count || 0}</span>
          </div>
          <div className="hr-list-item" style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#ccfbf1', fontSize: '0.82rem' }}>Pending Leave Approvals</span>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>{pendingLeaves.length}</span>
          </div>
          <div className="hr-list-item" style={{ padding: '4px 0', borderBottom: 'none' }}>
            <span style={{ color: '#ccfbf1', fontSize: '0.82rem' }}>Active Tasks</span>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>{stats?.today_reports_count || 0}</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: HR KPI CARDS (8 CARDS) */}
      <div className="hr-kpi-grid">
        {/* Card 1: Total Employees */}
        <div className="hr-kpi-card" onClick={() => navigate('/employees')}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#3b82f6' }}><i className="fa-solid fa-users"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#eff6ff', color: '#3b82f6' }}>Operational</span>
          </div>
          <div className="hr-kpi-val">{totalEmployees}</div>
          <div className="hr-kpi-lbl">Total Headcount</div>
        </div>

        {/* Card 2: Present Today */}
        <div className="hr-kpi-card" onClick={() => navigate('/attendance-list', { state: { statusFilter: 'Present' } })}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#10b981' }}><i className="fa-solid fa-user-check"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#ecfdf5', color: '#10b981' }}>Active</span>
          </div>
          <div className="hr-kpi-val">{stats?.present_count || 0}</div>
          <div className="hr-kpi-lbl">Present Today</div>
        </div>

        {/* Card 3: Employees on Leave */}
        <div className="hr-kpi-card" onClick={() => navigate('/tl-approved-leaves', { state: { statusFilter: 'Final Approved' } })}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#ef4444' }}><i className="fa-solid fa-plane-departure"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#fef2f2', color: '#ef4444' }}>Leave Log</span>
          </div>
          <div className="hr-kpi-val">{stats?.on_leave_count || 0}</div>
          <div className="hr-kpi-lbl">Employees on Leave</div>
        </div>

        {/* Card 4: Pending Leave Approvals */}
        <div className="hr-kpi-card" onClick={() => navigate('/leave-requests', { state: { statusFilter: 'Pending HR Approval' } })}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#ec4899' }}><i className="fa-solid fa-envelope-open-text"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#fdf2f8', color: '#ec4899' }}>Action Queue</span>
          </div>
          <div className="hr-kpi-val">{pendingLeaves.length}</div>
          <div className="hr-kpi-lbl">Pending Approvals</div>
        </div>

        {/* Card 5: Pending Attendance Corrections */}
        <div className="hr-kpi-card" onClick={() => navigate('/holidays')}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#f59e0b' }}><i className="fa-solid fa-calendar-minus"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#fffbeb', color: '#f59e0b' }}>Correction</span>
          </div>
          <div className="hr-kpi-val">{stats?.holiday_stats?.pending || 0}</div>
          <div className="hr-kpi-lbl">Pending Holidays</div>
        </div>

        {/* Card 6: Payroll Pending */}
        <div className="hr-kpi-card" onClick={() => navigate('/payroll')}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#06b6d4' }}><i className="fa-solid fa-file-invoice-dollar"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#ecfeff', color: '#06b6d4' }}>Month-end</span>
          </div>
          <div className="hr-kpi-val">{stats?.payroll_stats?.pending_runs || 0}</div>
          <div className="hr-kpi-lbl">Payroll Pending</div>
        </div>

        {/* Card 7: New Joiners */}
        <div className="hr-kpi-card" onClick={() => navigate('/employees', { state: { filter: 'NewJoiners' } })}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#8b5cf6' }}><i className="fa-solid fa-user-plus"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>Joining Today</span>
          </div>
          <div className="hr-kpi-val">{stats?.recruitment_stats?.new_joiners || 0}</div>
          <div className="hr-kpi-lbl">New Joiners</div>
        </div>

        {/* Card 8: Documents Pending Verification */}
        <div className="hr-kpi-card" onClick={() => navigate('/employees', { state: { filter: 'DocsPending' } })}>
          <div className="hr-kpi-header">
            <div className="hr-kpi-icon" style={{ background: '#64748b' }}><i className="fa-solid fa-file-shield"></i></div>
            <span className="hr-kpi-trend" style={{ background: '#f8fafc', color: '#64748b' }}>Audit Verify</span>
          </div>
          <div className="hr-kpi-val">{stats?.pending_documents?.length || 0}</div>
          <div className="hr-kpi-lbl">Docs Pending</div>
        </div>
      </div>

      {/* ROW 3: LEAVE MANAGEMENT & PAYROLL OVERVIEW */}
      <div className="hr-panel-row">
        {/* Section 5: Leave Management pending approvals list */}
        <div className="hr-card">
          <div className="hr-card-header">
            <h3><i className="fa-solid fa-calendar-check" style={{ color: '#ec4899' }}></i> Leaves Pending Review</h3>
          </div>
          <div className="hr-card-body">
            {pendingLeaves.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {pendingLeaves.slice(0, 4).map((l) => (
                  <div className="hr-list-item" key={l.id}>
                    <div className="hr-list-meta">
                      <span className="hr-list-name">{l.user_full_name || 'Staff Employee'}</span>
                      <span className="hr-list-sub">{l.from_date} to {l.to_date} • {l.leave_type}</span>
                    </div>
                    <div className="hr-list-actions">
                      <button className="btn-action-pill approve" onClick={() => handleLeaveAction(l.id, 'approve')}>Approve</button>
                      <button className="btn-action-pill reject" onClick={() => handleLeaveAction(l.id, 'reject')}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#64748b', padding: '30px 0', textAlign: 'center' }}>No pending leave requests.</div>
            )}
          </div>
        </div>

        {/* Section 6: Payroll Management */}
        <div className="hr-card">
          <div className="hr-card-header">
            <h3><i className="fa-solid fa-receipt" style={{ color: '#0d9488' }}></i> Monthly Payroll Overview</h3>
          </div>
          <div className="hr-card-body" style={{ textAlign: 'left', fontSize: '13.5px', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>Monthly Salary Budget:</span>
              <strong style={{ marginLeft: 'auto' }}>₹{Number(stats?.payroll_stats?.salary_budget || 0).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>Provident Fund Contributions:</span>
              <strong style={{ marginLeft: 'auto', color: '#10b981' }}>₹{Number(stats?.payroll_stats?.pf_contributions || 0).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>TDS Taxes Withheld:</span>
              <strong style={{ marginLeft: 'auto', color: '#3b82f6' }}>₹{Number(stats?.payroll_stats?.tds_withheld || 0).toLocaleString()}</strong>
            </div>
            <button className="btn" style={{ width: '100%', marginTop: '14px', background: '#0d9488' }} onClick={() => navigate('/payroll')}>
              <i className="fa-solid fa-cloud-arrow-down"></i> Manage Payslips portal
            </button>
          </div>
        </div>
      </div>

      {/* NEW ROW: ON LEAVE TODAY WIDGET */}
      <div className="hr-panel-row" style={{ marginTop: '24px' }}>
        <OnLeaveTodayWidget onLeaveList={stats?.on_leave_today || []} />
      </div>

      {/* ROW 4: RECRUITMENT PIPELINE & EMPLOYEE DOCUMENTS */}
      <div className="hr-panel-row">
        {/* Section 7: Recruitment */}
        <div className="hr-card">
          <div className="hr-card-header">
            <h3><i className="fa-solid fa-user-graduate" style={{ color: '#8b5cf6' }}></i> Recruitment Pipeline</h3>
          </div>
          <div className="hr-card-body" style={{ textAlign: 'left', fontSize: '13.5px', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>Active Job Openings:</span>
              <strong style={{ color: '#8b5cf6' }}>{stats?.recruitment_stats?.active_job_openings || 0} Positions</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
              <span>Interviews Scheduled Today:</span>
              <strong style={{ color: '#10b981' }}>{stats?.recruitment_stats?.interviews_scheduled || 0} Candidates</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'none' }}>
              <span>Offer Letters Released:</span>
              <strong style={{ color: '#f59e0b' }}>{stats?.recruitment_stats?.pending_offers || 0} Pending Join</strong>
            </div>
          </div>
        </div>

        {/* Section 8: Employee Documents */}
        <div className="hr-card">
          <div className="hr-card-header">
            <h3><i className="fa-solid fa-file-circle-check" style={{ color: '#4b5563' }}></i> Document Verification Queue</h3>
          </div>
          <div className="hr-card-body">
            {stats?.pending_documents && stats.pending_documents.length > 0 ? (
              stats.pending_documents.slice(0, 3).map((doc, idx) => (
                <div className="hr-list-item" key={doc.id || idx}>
                  <div className="hr-list-meta">
                    <span className="hr-list-name">{doc.doc_name || 'Verification Document'}</span>
                    <span className="hr-list-sub">Pending verification for {doc.name}</span>
                  </div>
                  {doc.document_url ? (
                    <a href={doc.document_url} target="_blank" rel="noreferrer" className="btn-action-pill approve" style={{ textDecoration: 'none', textAlign: 'center' }}>View & Verify</a>
                  ) : (
                    <button className="btn-action-pill approve" onClick={() => alert('Document verified.')}>Verify</button>
                  )}
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', padding: '20px 0', textAlign: 'center' }}>No pending documents to verify.</div>
            )}
          </div>
        </div>
      </div>

      {/* ROW 5: ANNOUNCEMENTS & RECENT ACTIVITIES */}
      <div className="hr-panel-row">
        {/* Section 9: Announcements & Events */}
        <div className="hr-card">
          <div className="hr-card-header">
            <h3><i className="fa-solid fa-bullhorn" style={{ color: '#f59e0b' }}></i> Corporate Announcements</h3>
          </div>
          <div className="hr-card-body" style={{ padding: '0px' }}>
            {stats?.corporate_announcements && stats.corporate_announcements.length > 0 ? (
              stats.corporate_announcements.slice(0, 3).map((ann, idx) => (
                <div style={{ padding: '20px 24px', borderBottom: idx === 2 ? 'none' : '1px solid #f1f5f9' }} key={idx}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#334155', fontWeight: 800 }}>{ann.title}</h5>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>{ann.message}</p>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', padding: '20px 0', textAlign: 'center' }}>No announcements.</div>
            )}
          </div>
        </div>

        {/* Section 10: Recent Activities */}
        <div className="hr-card">
          <div className="hr-card-header">
            <h3><i className="fa-solid fa-clock-rotate-left" style={{ color: '#64748b' }}></i> Operational Audit Logs</h3>
          </div>
          <div className="hr-card-body">
            <div className="hr-feed-list">
              {stats?.recent_activities && stats.recent_activities.length > 0 ? (
                stats.recent_activities.slice(0, 3).map((act, idx) => (
                  <div className="hr-feed-item" key={idx}>
                    <div className="hr-feed-icon">
                      <i className={act.icon || "fa-solid fa-file-invoice"}></i>
                    </div>
                    <div className="hr-feed-desc">
                      <span className="feed-text">{act.details}</span>
                      <span className="feed-time">{act.time_display}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', padding: '20px 0', textAlign: 'center' }}>No activities logged.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 12: QUICK ACTIONS */}
      <div className="hr-card">
        <div className="hr-card-header">
          <h3><i className="fa-solid fa-bolt" style={{ color: '#f59e0b' }}></i> HR Quick Actions Panel</h3>
        </div>
        <div className="hr-card-body">
          <div className="hr-shortcuts">
            <button className="hr-shortcut-btn" onClick={() => navigate('/register')}>
              <i className="fa-solid fa-user-plus" style={{ color: '#3b82f6' }}></i>
              <span>Register Employee</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/attendance-list')}>
              <i className="fa-solid fa-chart-line" style={{ color: '#10b981' }}></i>
              <span>Attendance</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/payroll')}>
              <i className="fa-solid fa-wallet" style={{ color: '#0d9488' }}></i>
              <span>Payroll</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/payroll')}>
              <i className="fa-solid fa-file-invoice-dollar" style={{ color: '#ec4899' }}></i>
              <span>Generate Payslips</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/holidays')}>
              <i className="fa-solid fa-calendar-days" style={{ color: '#8b5cf6' }}></i>
              <span>Holiday Calendar</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/tasks')}>
              <i className="fa-solid fa-briefcase" style={{ color: '#f59e0b' }}></i>
              <span>Recruitment</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/employees')}>
              <i className="fa-solid fa-file-shield" style={{ color: '#64748b' }}></i>
              <span>Documents</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/employees')}>
              <i className="fa-solid fa-chart-bar" style={{ color: '#6366f1' }}></i>
              <span>Reports</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/holidays')}>
              <i className="fa-solid fa-bullhorn" style={{ color: '#e11d48' }}></i>
              <span>Announcements</span>
            </button>
            <button className="hr-shortcut-btn" onClick={() => navigate('/settings')}>
              <i className="fa-solid fa-gears" style={{ color: '#475569' }}></i>
              <span>Settings</span>
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

export default HRDashboard;
