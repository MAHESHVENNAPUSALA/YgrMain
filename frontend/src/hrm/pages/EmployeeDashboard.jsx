import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [leaveData, setLeaveData] = useState(null);
  const [holidayData, setHolidayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('Good day');
  const [liveTime, setLiveTime] = useState('');
  
  // Accordion active menu keys
  const [teamAccordionOpen, setTeamAccordionOpen] = useState(false);
  const [openMemberAccordion, setOpenMemberAccordion] = useState({});

  // Fetch data safely
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const safeFetch = async (url) => {
          try {
            return await api.get(url);
          } catch (e) {
            console.warn(`Failed to fetch ${url}:`, e);
            return { data: null };
          }
        };

        const [dashRes, attendanceRes, leavesRes, holidaysRes] = await Promise.all([
          safeFetch('/api/dashboard/employee/'),
          safeFetch(`/api/attendance/monthly/?month=${month}&year=${year}`),
          safeFetch('/api/leaves/'),
          safeFetch('/api/holidays/')
        ]);

        if (dashRes.data) setDashboardData(dashRes.data);
        if (attendanceRes.data) setCalendarData(attendanceRes.data);
        if (leavesRes.data) setLeaveData(leavesRes.data);
        if (holidaysRes.data) setHolidayData(holidaysRes.data);
      } catch (err) {
        console.error('Error loading employee dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Update clock & greeting
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Clock
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setLiveTime(now.toLocaleTimeString('en-US', timeOptions));
      
      // Greeting
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMemberAccordion = (memberId) => {
    setOpenMemberAccordion((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const getAvatarGradient = (name) => {
    const colors = [
      'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
      'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    ];
    let hash = 0;
    if (name) {
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--muted)' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading dashboard...
      </div>
    );
  }

  // Calculate work metrics
  const totalTasks = dashboardData?.tasks?.length || 0;
  const pendingTasks = dashboardData?.tasks?.filter(t => t.status === 'Pending').length || 0;
  const inProgressTasks = dashboardData?.tasks?.filter(t => t.status === 'In Progress').length || 0;
  const completedTasks = dashboardData?.tasks?.filter(t => t.status === 'Completed').length || 0;
  const overdueTasks = dashboardData?.tasks?.filter(t => {
    if (t.status === 'Completed') return false;
    return new Date(t.end_date) < new Date();
  }).length || 0;
  const highPriorityTasks = dashboardData?.tasks?.filter(t => t.priority === 'High').length || 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = calendarData?.days_data?.find(day => day.date === todayStr);
  const attendancePercentage = calendarData?.stats?.percentage || 100;
  const taskCompletionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100;

  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);
  const isOnLeaveToday = leaveData?.leaves?.some(l => {
    if (l.status !== 'Final Approved') return false;
    const from = new Date(l.from_date);
    from.setHours(0, 0, 0, 0);
    const to = new Date(l.to_date);
    to.setHours(0, 0, 0, 0);
    return todayObj >= from && todayObj <= to;
  });

  return (
    <div className="employee-dashboard-content">
      <style>{`
        /* HERO GREETING BANNER */
        .dashboard-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            border-radius: 12px;
            padding: 24px 32px;
            color: #ffffff;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03);
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.08);
            min-height: 120px;
        }
        .dashboard-hero::before {
            content: '';
            position: absolute;
            top: -40px;
            right: -40px;
            width: 180px;
            height: 180px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
            filter: blur(10px);
        }
        .hero-left {
            position: relative;
            z-index: 2;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
        }
        .greeting-prefix {
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #818cf8;
            margin-bottom: 2px;
            display: block;
        }
        .welcome-title {
            font-size: 1.6rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            line-height: 1.2;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            margin: 0;
            color: #ffffff;
        }
        .hero-role-badge {
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 3px 8px;
            border-radius: 4px;
            background: rgba(99, 102, 241, 0.15);
            color: #a5b4fc;
            border: 1px solid rgba(99, 102, 241, 0.2);
            margin-left: 6px;
            display: inline-flex;
            align-items: center;
        }
        .wave-emoji {
            display: inline-block;
            animation: wave-animation 2.5s infinite;
            transform-origin: 70% 70%;
        }
        @keyframes wave-animation {
            0% { transform: rotate( 0.0deg) }
            10% { transform: rotate(14.0deg) }
            20% { transform: rotate(-8.0deg) }
            30% { transform: rotate(14.0deg) }
            40% { transform: rotate(-4.0deg) }
            50% { transform: rotate(10.0deg) }
            60% { transform: rotate( 0.0deg) }
            100% { transform: rotate( 0.0deg) }
        }
        .hero-subtext {
            font-size: 0.88rem;
            color: #94a3b8;
            margin: 4px 0 0 0;
            font-weight: 400;
            line-height: 1.4;
            display: flex;
            align-items: center;
        }
        .hero-task-highlight {
            color: #818cf8;
            font-weight: 700;
            background: rgba(99, 102, 241, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            margin: 0 5px;
            font-size: 0.83rem;
        }
        .hero-date-widget {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 8px 16px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            position: relative;
            z-index: 2;
        }
        .hero-date-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.82rem;
            font-weight: 500;
            color: #94a3b8;
        }
        .hero-date-item i {
            color: #818cf8;
        }
        .hero-date-divider {
            width: 1px;
            height: 12px;
            background: rgba(255, 255, 255, 0.15);
        }
        .hero-time-val {
            font-weight: 700;
            color: #ffffff;
            font-family: monospace;
        }

        /* ===== SECTION TITLE ===== */
        .section-header-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          text-align: left;
          margin: 24px 0 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-header-title i {
          color: #4f46e5;
        }

        /* ===== CARDS & GRID ===== */
        .card {
            background: #ffffff;
            padding: 0;
            margin-bottom: 0;
            border-radius: 12px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
            border: 1px solid #e8edf2;
            text-align: left;
            overflow: hidden;
            transition: box-shadow 0.25s ease, transform 0.2s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .card:hover {
            box-shadow: 0 4px 20px rgba(0,0,0,0.07);
            transform: translateY(-2px);
        }
        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid #f1f5f9;
        }
        .card-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 9px;
            margin: 0;
        }
        .card-title-icon {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
        }
        .card-title-icon.blue { background: #eff6ff; color: #2563eb; }
        .card-title-icon.indigo { background: #eef2ff; color: #4f46e5; }
        .card-title-icon.emerald { background: #ecfdf5; color: #10b981; }
        .card-title-icon.amber { background: #fffbeb; color: #f59e0b; }
        .card-title-icon.rose { background: #fff1f2; color: #f43f5e; }
        .card-title-icon.purple { background: #faf5ff; color: #a855f7; }

        .card-link {
            font-size: 0.82rem;
            color: #4f46e5;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 5px 10px;
            border-radius: 6px;
            transition: background 0.2s ease;
        }
        .card-link:hover {
            background: #eef2ff;
        }
        .card-body {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 12px;
        }

        /* ===== GRIDS ===== */
        .todays-work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .bottom-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        /* ===== WORK CARD DETAILS ===== */
        .work-details-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .work-detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          padding-bottom: 6px;
          border-bottom: 1px solid #f1f5f9;
        }
        .work-detail-row:last-child {
          border-bottom: none;
        }
        .work-detail-label {
          color: #64748b;
          font-weight: 500;
        }
        .work-detail-val {
          color: #1e293b;
          font-weight: 700;
        }

        /* ===== QUICK ACTION BUTTONS ===== */
        .action-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }
        .action-btn-shortcut {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 0.82rem;
          font-weight: 700;
          color: #475569;
          text-decoration: none;
          background: #f8fafc;
          transition: all 0.2s;
        }
        .action-btn-shortcut:hover {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #2563eb;
        }
        .action-btn-shortcut.checkin {
          background: #2563eb;
          color: #ffffff;
          border-color: transparent;
        }
        .action-btn-shortcut.checkin:hover {
          background: #1d4ed8;
          color: #ffffff;
        }

        /* ===== PAYSLIP STATS ===== */
        .payslip-stats-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            border: 1px solid #eef0f4;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 16px;
            background: #fafbfc;
        }
        .payslip-stat-cell {
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: center;
        }
        .payslip-stat-cell + .payslip-stat-cell {
            border-left: 1px solid #eef0f4;
        }
        .payslip-stat-label {
            font-size: 0.65rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
        }
        .payslip-stat-value {
            font-size: 0.95rem;
            color: #0f172a;
            font-weight: 700;
        }
        .payslip-stat-value.emerald {
            color: #059669;
        }
        .payslip-status-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 20px;
        }
        .payslip-status-pill.paid { background: #d1fae5; color: #065f46; }
        .payslip-status-pill.pending { background: #fef3c7; color: #92400e; }
        .payslip-status-pill.other { background: #e0f2fe; color: #075985; }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.83rem;
            font-weight: 600;
            text-decoration: none;
            border: none;
            cursor: pointer;
            background: #4f46e5;
            color: #ffffff;
            transition: all 0.2s ease;
        }
        .btn-primary:hover {
            background: #4338ca;
        }
        .btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.83rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            background: #ffffff;
            color: #374151;
            border: 1px solid #d1d5db;
            transition: all 0.2s ease;
        }
        .btn-secondary:hover {
            background: #f9fafb;
            border-color: #9ca3af;
        }

        /* ===== TEAM CARD ===== */
        .team-lead-strip {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px 20px;
            background: #fafbfc;
            border-bottom: 1px solid #eef0f6;
            text-align: left;
        }
        .team-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            color: #fff;
            font-weight: 700;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .team-lead-meta {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
        }
        .team-lead-role-tag {
            font-size: 0.6rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #4f46e5;
            background: #eef2ff;
            padding: 2px 6px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .team-lead-fullname {
            font-size: 0.85rem;
            font-weight: 700;
            color: #1e293b;
        }
        .team-emp-id {
            font-size: 0.75rem;
            color: #94a3b8;
            font-weight: 600;
        }
        .team-members-toggle {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background: #fafbfc;
            border: none;
            border-top: 1px solid #eef0f6;
            border-bottom: 1px solid #eef0f6;
            cursor: pointer;
            font-weight: 700;
            font-size: 0.82rem;
            color: #475569;
        }
        .members-badge {
            background: #3b82f6;
            color: #fff;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 10px;
            margin-left: 6px;
        }
        .member-list {
            display: flex;
            flex-direction: column;
            padding: 8px 20px;
            background: #ffffff;
            max-height: 200px;
            overflow-y: auto;
        }
        .member-item {
            border-bottom: 1px solid #f1f5f9;
            padding: 6px 0;
        }
        .member-item:last-child {
            border-bottom: none;
        }
        .member-item-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
        }
        .member-summary {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .member-small-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            color: #fff;
            font-size: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        .member-item-name {
            font-size: 0.8rem;
            font-weight: 600;
            color: #334155;
        }
        .member-expand-chevron {
            font-size: 0.7rem;
            color: #94a3b8;
            transition: transform 0.2s;
        }
        .member-expand-chevron.open {
            transform: rotate(90deg);
        }
        .member-item-details {
            padding: 4px 0 4px 32px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            font-size: 0.75rem;
            text-align: left;
        }
        .member-detail-row {
            display: flex;
            gap: 6px;
        }
        .chevron-icon {
            transition: transform 0.2s;
        }
        .chevron-icon.open {
            transform: rotate(180deg);
        }

        /* ===== BOTTOM LIST ITEMS ===== */
        .bottom-list-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }
        .bottom-list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .bottom-list-item:last-child {
          border-bottom: none;
        }
        .bottom-list-item-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.75rem;
        }
        .bottom-list-item-content {
          flex: 1;
        }
        .bottom-list-item-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .bottom-list-item-sub {
          font-size: 0.72rem;
          color: #64748b;
          margin: 2px 0 0 0;
        }

        /* ===== RESPONSIVENESS ===== */
        @media (max-width: 1200px) {
          .todays-work-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bottom-dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .dashboard-hero {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          .hero-left {
            align-items: center;
          }
          .todays-work-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .bottom-dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* SECTION 1: Welcome Banner */}
      <section className="dashboard-hero">
        <div className="hero-left">
          <span className="greeting-prefix">{greeting}</span>
          <h1 className="welcome-title">
            Welcome back, {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.username} 
            <span className="hero-role-badge">{user?.role}</span> 
            <span className="wave-emoji">👋</span>
          </h1>
          <p className="hero-subtext">
            You have <span className="hero-task-highlight">{dashboardData?.active_tasks_count || 0}</span> active tasks assigned to you today.
          </p>
        </div>
        <div className="hero-date-widget">
          <div className="hero-date-item">
            <i className="fa-regular fa-calendar-days"></i>
            <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="hero-date-divider"></div>
          <div className="hero-date-item">
            <i className="fa-regular fa-clock"></i>
            <span className="hero-time-val">{liveTime || 'Loading...'}</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Today's Work Section */}
      <div className="section-header-title">
        <i className="fa-solid fa-briefcase"></i> Today's Work
      </div>
      <div className="todays-work-grid">
        
        {/* Card 1: My Tasks */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon blue">
                <i className="fa-solid fa-list-check"></i>
              </span>
              My Tasks
            </h3>
          </div>
          <div className="card-body">
            <div className="work-details-list">
              <div className="work-detail-row">
                <span className="work-detail-label">Total Tasks</span>
                <span className="work-detail-val">{totalTasks}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Pending</span>
                <span className="work-detail-val">{pendingTasks}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">In Progress</span>
                <span className="work-detail-val">{inProgressTasks}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Completed</span>
                <span className="work-detail-val">{completedTasks}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Overdue</span>
                <span className="work-detail-val" style={{ color: overdueTasks > 0 ? '#ef4444' : '#1e293b' }}>{overdueTasks}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">High Priority</span>
                <span className="work-detail-val" style={{ color: highPriorityTasks > 0 ? '#f43f5e' : '#1e293b' }}>{highPriorityTasks}</span>
              </div>
            </div>
            <Link to="/tasks" className="card-link" style={{ marginTop: 'auto', alignSelf: 'center' }}>
              View All Tasks <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }}></i>
            </Link>
          </div>
        </div>

        {/* Card 2: Today's Deadlines */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon rose">
                <i className="fa-solid fa-hourglass-half"></i>
              </span>
              Deadlines & Events
            </h3>
          </div>
          <div className="card-body">
            <div className="work-details-list">
              <div className="work-detail-row">
                <span className="work-detail-label">Due Today</span>
                <span className="work-detail-val">{overdueTasks}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Upcoming Deadlines</span>
                <span className="work-detail-val">{pendingTasks}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Upcoming Meetings</span>
                <span className="work-detail-val">1 Scheduled</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Training Sessions</span>
                <span className="work-detail-val">0 Assigned</span>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
              No critical issues detected for today.
            </div>
          </div>
        </div>

        {/* Card 3: Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon amber">
                <i className="fa-solid fa-bolt"></i>
              </span>
              Quick Actions
            </h3>
          </div>
          <div className="card-body" style={{ justifyContent: 'center' }}>
            <div className="action-buttons-grid">
              {isOnLeaveToday ? (
                <div style={{ gridColumn: 'span 2', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                  <i className="fa-solid fa-umbrella-beach"></i> You are on approved leave today.
                </div>
              ) : (
                <>
                  <Link to="/attendance" className="action-btn-shortcut checkin">Check In</Link>
                  <Link to="/attendance" className="action-btn-shortcut">Check Out</Link>
                </>
              )}
              <Link to="/leaves" className="action-btn-shortcut">Apply Leave</Link>
              <Link to="/tasks" className="action-btn-shortcut">Update Work</Link>
              <Link to="/messages" className="action-btn-shortcut">Messages</Link>
              <Link to="/attendance" className="action-btn-shortcut">My Reports</Link>
            </div>
          </div>
        </div>

        {/* Card 4: Productivity */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon emerald">
                <i className="fa-solid fa-chart-line"></i>
              </span>
              Productivity
            </h3>
          </div>
          <div className="card-body">
            <div className="work-details-list">
              <div className="work-detail-row">
                <span className="work-detail-label">Task Completion</span>
                <span className="work-detail-val">{taskCompletionPercentage}%</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Attendance Rate</span>
                <span className="work-detail-val">{attendancePercentage}%</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Working Days (Month)</span>
                <span className="work-detail-val">{calendarData?.stats?.present || 0} Days</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Sandwich Leaves</span>
                <span className="work-detail-val">{calendarData?.stats?.sandwich_leave || 0}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Weekly Offs</span>
                <span className="work-detail-val">{calendarData?.stats?.weekly_off || 0}</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Current Project</span>
                <span className="work-detail-val" style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Enterprise CRM System">Enterprise CRM</span>
              </div>
              <div className="work-detail-row">
                <span className="work-detail-label">Manager</span>
                <span className="work-detail-val" style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.reporting_manager_name || 'Karan Johar'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3: Latest Payslip & Team Alignment */}
      <div className="dashboard-grid">
        
        {/* Latest Payslip Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon blue">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </span>
              Latest Payslip
            </h3>
            <Link to="/payslips" className="card-link">
              View All <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }}></i>
            </Link>
          </div>

          {dashboardData?.latest_payslip ? (
            <div className="card-body">
              <div className="payslip-stats-row">
                <div className="payslip-stat-cell">
                  <span className="payslip-stat-label">Period</span>
                  <span className="payslip-stat-value">
                    {dashboardData.latest_payslip.month_name} {dashboardData.latest_payslip.year}
                  </span>
                </div>
                <div className="payslip-stat-cell">
                  <span className="payslip-stat-label">Net Salary</span>
                  <span className="payslip-stat-value emerald">₹{dashboardData.latest_payslip.net_salary}</span>
                </div>
                <div className="payslip-stat-cell">
                  <span className="payslip-stat-label">Status</span>
                  <span className={`payslip-status-pill ${
                    dashboardData.latest_payslip.status === 'Paid' ? 'paid'
                    : dashboardData.latest_payslip.status === 'Pending Approval' ? 'pending'
                    : 'other'
                  }`}>
                    <span className="status-dot"></span>
                    {dashboardData.latest_payslip.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/payslips/${dashboardData.latest_payslip.id}`} className="btn-primary">
                  <i className="fa-solid fa-eye"></i> View Slip
                </Link>
                {dashboardData.latest_payslip.payslip_pdf && (
                  <a
                    href={dashboardData.latest_payslip.payslip_pdf.startsWith('http') ? dashboardData.latest_payslip.payslip_pdf : `${(import.meta.env.VITE_API_URL || api.defaults.baseURL || 'http://127.0.0.1:8000').replace(/\/$/, '')}${dashboardData.latest_payslip.payslip_pdf}`}
                    download
                    className="btn-secondary"
                  >
                    <i className="fa-solid fa-download"></i> Download PDF
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="card-body">
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>No payslips published yet.</p>
            </div>
          )}
        </div>

        {/* Team Alignment Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon indigo">
                <i className="fa-solid fa-people-group"></i>
              </span>
              Team Alignment
            </h3>
          </div>

          {dashboardData?.team_lead ? (
            <div className="team-lead-strip">
              <div
                className="team-avatar"
                style={{ background: getAvatarGradient(dashboardData.team_lead.name) }}
              >
                {getInitials(dashboardData.team_lead.name)}
              </div>
              <div className="team-lead-meta">
                <span className="team-lead-role-tag">
                  <i className="fa-solid fa-star" style={{ color: '#f59e0b', fontSize: '0.6rem' }}></i>
                  Team Lead
                </span>
                <span className="team-lead-fullname">{dashboardData.team_lead.name}</span>
              </div>
              <span className="team-emp-id">{dashboardData.team_lead.emp_id}</span>
            </div>
          ) : (
            <div className="team-lead-strip" style={{ justifyContent: 'center', color: '#94a3b8' }}>
              <i className="fa-solid fa-user-slash" style={{ marginRight: '8px' }}></i>
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>No Team Assigned</span>
            </div>
          )}

          {dashboardData?.team_members && dashboardData.team_members.length > 0 ? (
            <>
              <button
                className="team-members-toggle"
                onClick={() => setTeamAccordionOpen(!teamAccordionOpen)}
              >
                <span className="toggle-label">
                  <i className="fa-solid fa-users" style={{ color: '#a5b4fc', fontSize: '0.85rem' }}></i>
                  Team Members
                  <span className="members-badge">{dashboardData.team_members.length}</span>
                </span>
                <i className={`fa-solid fa-chevron-down chevron-icon ${teamAccordionOpen ? 'open' : ''}`}></i>
              </button>

              {teamAccordionOpen && (
                <div className="member-list">
                  {dashboardData.team_members.map((member) => {
                    const isExpanded = !!openMemberAccordion[member.id];
                    return (
                      <div className="member-item" key={member.id}>
                        <button
                          className="member-item-header"
                          onClick={() => toggleMemberAccordion(member.id)}
                        >
                          <div className="member-summary">
                            <div
                              className="member-small-avatar"
                              style={{ background: getAvatarGradient(member.name) }}
                            >
                              {getInitials(member.name)}
                            </div>
                            <span className="member-item-name">{member.name}</span>
                          </div>
                          <i className={`fa-solid fa-chevron-right member-expand-chevron ${isExpanded ? 'open' : ''}`}></i>
                        </button>

                        {isExpanded && (
                          <div className="member-item-details">
                            <div className="member-detail-row">
                              <i className="fa-solid fa-id-badge"></i>
                              <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>ID</span>
                              <span style={{ fontWeight: 600, color: '#374151' }}>{member.emp_id || 'N/A'}</span>
                            </div>
                            <div className="member-detail-row">
                              <i className="fa-solid fa-envelope"></i>
                              <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</span>
                              <a href={`mailto:${member.email}`}>{member.email || 'N/A'}</a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: '16px 24px', color: '#94a3b8', fontSize: '0.88rem' }}>
              No other team members assigned.
            </div>
          )}
        </div>

      </div>

      {/* SECTION 4: Your Tasks (Latest) Table */}
      <div className="card" style={{ marginTop: '0', marginBottom: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-title-icon blue">
              <i className="fa-solid fa-list-check"></i>
            </span>
            Your Tasks (Latest)
          </h3>
          <Link to="/tasks" className="card-link">
            View All Tasks <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }}></i>
          </Link>
        </div>
        <div className="card-body" style={{ padding: '0 20px 20px 20px' }}>
          <div className="table-wrap">
            <table style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.tasks && dashboardData.tasks.length > 0 ? (
                  dashboardData.tasks.slice(0, 4).map((task) => (
                    <tr key={task.id}>
                      <td style={{ fontWeight: '600' }}>{task.task_name}</td>
                      <td>{task.project?.project_name || 'General'}</td>
                      <td>{task.start_date}</td>
                      <td>{task.end_date}</td>
                      <td>
                        <span className={`badge-capsule ${task.status === 'Completed' ? 'success' : task.status === 'Submitted' ? 'info' : 'warning'}`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#64748b' }}>No tasks assigned</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 5: Messages, Notifications, Holidays, Announcements */}
      <div className="bottom-dashboard-grid">
        
        {/* Recent Messages */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon purple">
                <i className="fa-solid fa-comments"></i>
              </span>
              Recent Messages
            </h3>
            <Link to="/messages" className="card-link">Chat</Link>
          </div>
          <div className="card-body">
            <div className="bottom-list-container">
              {dashboardData?.recent_messages && dashboardData.recent_messages.length > 0 ? (
                dashboardData.recent_messages.map((msg, index) => (
                  <div className="bottom-list-item" key={index}>
                    <div className="bottom-list-item-avatar" style={{ background: getAvatarGradient(msg.sender_name) }}>
                      {getInitials(msg.sender_name)}
                    </div>
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
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon rose">
                <i className="fa-solid fa-bell"></i>
              </span>
              Notifications
            </h3>
          </div>
          <div className="card-body">
            <div className="bottom-list-container">
              {dashboardData?.notifications && dashboardData.notifications.length > 0 ? (
                dashboardData.notifications.map((notif, index) => (
                  <div className="bottom-list-item" key={index}>
                    <div className="bottom-list-item-avatar" style={{ background: '#f59e0b', fontSize: '10px' }}>
                      <i className="fa-solid fa-bell"></i>
                    </div>
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
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon emerald">
                <i className="fa-solid fa-umbrella-beach"></i>
              </span>
              Upcoming Holidays
            </h3>
            <Link to="/attendance" className="card-link">All</Link>
          </div>
          <div className="card-body">
            <div className="bottom-list-container">
              {holidayData && holidayData.length > 0 ? (
                holidayData.slice(0, 2).map((h) => (
                  <div className="bottom-list-item" key={h.id}>
                    <div className="bottom-list-item-avatar" style={{ background: '#f59e0b', fontSize: '10px' }}><i className="fa-solid fa-calendar"></i></div>
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
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-title-icon amber">
                <i className="fa-solid fa-bullhorn"></i>
              </span>
              Announcements
            </h3>
          </div>
          <div className="card-body">
            <div className="bottom-list-container">
              {dashboardData?.announcements && dashboardData.announcements.length > 0 ? (
                dashboardData.announcements.map((ann, index) => (
                  <div className="bottom-list-item" key={index} style={{ alignItems: 'flex-start' }}>
                    <div className="bottom-list-item-content">
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

    </div>
  );
};

export default EmployeeDashboard;
