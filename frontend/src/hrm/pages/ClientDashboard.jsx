import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';

const STATUS_COLORS = {
  Completed:      { bg: '#dcfce7', color: '#166534', dot: '#22c55e' },
  'In Progress':  { bg: '#dbeafe', color: '#1e40af', dot: '#3b82f6' },
  Submitted:      { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  Pending:        { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444' },
  'Needs Revision': { bg: '#fce7f3', color: '#9d174d', dot: '#ec4899' },
  Approved:       { bg: '#dcfce7', color: '#166534', dot: '#22c55e' },
};

const ROLE_COLORS = {
  Employee:  { bg: '#ede9fe', color: '#6d28d9' },
  TeamLead:  { bg: '#dbeafe', color: '#1e40af' },
  Manager:   { bg: '#d1fae5', color: '#065f46' },
  HR:        { bg: '#fce7f3', color: '#9d174d' },
  default:   { bg: '#f1f5f9', color: '#475569' },
};

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function avatarColor(name) {
  const colors = ['#4f46e5','#0891b2','#16a34a','#dc2626','#d97706','#7c3aed','#db2777'];
  let h = 0;
  for (let i = 0; i < (name||'').length; i++) h = (name.charCodeAt(i) + h * 31) % colors.length;
  return colors[Math.abs(h)];
}

// ─── Task Review Panel ───────────────────────────────────────────────────────
const TaskReviewPanel = ({ task, onReviewSubmitted }) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ status: 'Approved', feedback: '' });
  const [clientDoc, setClientDoc] = useState(null);
  const [error, setError] = useState('');

  const cr = task.client_review;
  const hasReview = cr && cr.status;

  const statusStyle = hasReview
    ? (STATUS_COLORS[cr.status] || STATUS_COLORS.Pending)
    : STATUS_COLORS.Pending;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('status', form.status);
      fd.append('feedback', form.feedback);
      if (clientDoc) fd.append('client_document', clientDoc);

      await api.post(`/api/tasks/${task.id}/client-review/`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOpen(false);
      onReviewSubmitted();
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  const s = STATUS_COLORS[task.status] || STATUS_COLORS.Pending;

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 14px', marginBottom: '8px' }}>
      {/* Task Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', marginBottom: '4px' }}>{task.task_name}</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: s.bg, color: s.color }}>{task.status}</span>
            {task.end_date && <span style={{ fontSize: '0.72rem', color: '#64748b' }}>📅 {task.end_date}</span>}
            {task.priority && <span style={{ fontSize: '0.72rem', color: '#64748b' }}>⚡ {task.priority}</span>}
          </div>
        </div>

        {/* Employee submitted document */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
          {task.file_url ? (
            <a
              href={task.file_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#eff6ff', color: '#3b82f6', padding: '5px 10px', borderRadius: '7px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid #bfdbfe', textDecoration: 'none' }}
            >
              📄 Employee Doc
            </a>
          ) : (
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>No doc submitted</span>
          )}

          {/* Client review status badge */}
          {hasReview && (
            <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 9px', borderRadius: '999px', background: statusStyle.bg, color: statusStyle.color }}>
              {cr.status === 'Approved' ? '✅' : '🔄'} {cr.status}
            </span>
          )}

          {/* Review button — only if employee submitted a file */}
          {task.file_url && (
            <button
              onClick={() => setOpen(v => !v)}
              style={{ padding: '5px 12px', background: open ? '#f1f5f9' : '#4f46e5', color: open ? '#334155' : '#fff', border: '1px solid #4f46e5', borderRadius: '7px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {open ? 'Cancel' : hasReview ? 'Update Review' : '🔍 Review'}
            </button>
          )}
        </div>
      </div>

      {/* Client doc download */}
      {hasReview && cr.client_document_url && (
        <div style={{ marginTop: '8px' }}>
          <a
            href={cr.client_document_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '7px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid #bbf7d0', textDecoration: 'none' }}
          >
            📎 Client Review Doc
          </a>
        </div>
      )}

      {/* Existing feedback */}
      {hasReview && cr.feedback && (
        <div style={{ marginTop: '8px', padding: '8px 12px', background: '#fff7ed', borderRadius: '6px', border: '1px solid #fed7aa', fontSize: '0.82rem', color: '#92400e' }}>
          <strong>Feedback: </strong>{cr.feedback}
        </div>
      )}

      {/* Review Form */}
      {open && (
        <form onSubmit={handleSubmit} style={{ marginTop: '12px', padding: '14px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>DECISION</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 600, background: '#fff', color: '#1e293b', outline: 'none' }}
              >
                <option value="Approved">✅ Approve</option>
                <option value="Needs Revision">🔄 Send Back for Revision</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>ATTACH DOCUMENT (Optional)</label>
              <input
                type="file"
                onChange={e => setClientDoc(e.target.files[0])}
                style={{ fontSize: '0.8rem', color: '#475569' }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>FEEDBACK / INSTRUCTIONS</label>
            <textarea
              value={form.feedback}
              onChange={e => setForm(f => ({ ...f, feedback: e.target.value }))}
              placeholder={form.status === 'Needs Revision' ? 'Describe what needs to be changed...' : 'Optional approval note...'}
              rows={3}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #e2e8f0', fontSize: '0.85rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>
          {error && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '8px' }}>⚠️ {error}</div>}
          <button
            type="submit"
            disabled={submitting}
            style={{ padding: '8px 20px', background: form.status === 'Approved' ? '#16a34a' : '#dc2626', color: '#fff', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? '⏳ Submitting...' : form.status === 'Approved' ? '✅ Submit Approval' : '🔄 Send Back'}
          </button>
        </form>
      )}
    </div>
  );
};

// ─── Employee Work Card ──────────────────────────────────────────────────────
const EmployeeWorkCard = ({ emp, onReviewSubmitted }) => {
  const [expanded, setExpanded] = useState(false);
  const roleStyle = ROLE_COLORS[emp.role] || ROLE_COLORS.default;
  const bg = avatarColor(emp.name);
  const pct = emp.completion_pct;
  const barColor = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';

  const submittedTasks = (emp.tasks || []).filter(t => t.file_url);

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }} onClick={() => setExpanded(v => !v)}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
          {getInitials(emp.name)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.name}</div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '2px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 7px', borderRadius: '999px', background: roleStyle.bg, color: roleStyle.color }}>{emp.role}</span>
            {emp.emp_id && <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{emp.emp_id}</span>}
            {submittedTasks.length > 0 && (
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 7px', borderRadius: '999px', background: '#fef3c7', color: '#92400e' }}>
                📤 {submittedTasks.length} doc{submittedTasks.length > 1 ? 's' : ''} submitted
              </span>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: barColor }}>{pct}%</div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Done</div>
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: '3px', transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: '#22c55e', fontWeight: 700 }}>✓ {emp.completed} Done</span>
            <span style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 700 }}>⟳ {emp.in_progress} Active</span>
            <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700 }}>↑ {emp.submitted} Submitted</span>
            <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 700 }}>○ {emp.pending} Pending</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>{emp.total_tasks} Tasks</span>
        </div>
      </div>

      {/* Task Review List */}
      {expanded && (
        <div style={{ borderTop: '1px solid #f1f5f9', padding: '12px 16px', background: '#fafafa' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.05em' }}>
            Tasks ({emp.tasks?.length || 0})
          </div>
          {(emp.tasks || []).length === 0 ? (
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', textAlign: 'center', margin: '8px 0' }}>No tasks assigned.</p>
          ) : (
            (emp.tasks || []).map(task => (
              <TaskReviewPanel key={task.id} task={task} onReviewSubmitted={onReviewSubmitted} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main ClientDashboard ────────────────────────────────────────────────────
const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({ client: {}, projects: [] });
  const [loading, setLoading] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const timerRef = useRef(null);

  const fetchDashboard = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await api.get('/api/dashboard/client/');
      setData(res.data);
      setLastRefresh(new Date());
      if (!silent) {
        const expanded = {};
        (res.data.projects || []).forEach(p => { expanded[p.id] = true; });
        setExpandedProjects(expanded);
      }
    } catch (err) {
      console.error('Failed to load client dashboard', err);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard(false);
    // Auto-refresh every 30 seconds
    timerRef.current = setInterval(() => fetchDashboard(true), 30000);
    return () => clearInterval(timerRef.current);
  }, [fetchDashboard]);

  const toggleProject = (id) => setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));

  const handleStartChat = async (project) => {
    const userIds = [];
    if (project.manager_id) userIds.push(project.manager_id);
    project.teams.forEach(t => {
      if (t.lead_id) userIds.push(t.lead_id);
      t.members.forEach(m => userIds.push(m.id));
    });
    try {
      const res = await api.post('/api/chatrooms/', {
        name: `Project: ${project.name}`, room_type: 'team',
        description: `Chat room for ${project.name}`,
        users: [...new Set(userIds)]
      });
      navigate('/messages', { state: { openChatId: res.data.id, chatType: 'team', chatName: res.data.name } });
    } catch {
      navigate('/messages');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: '#64748b' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }} /> Loading dashboard...
      </div>
    );
  }

  return (
    <div className="employee-dashboard-content" style={{ padding: '24px' }}>
      <style>{`
        .dashboard-hero { background: linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%); border-radius:12px; padding:24px 32px; color:#fff; display:flex; flex-direction:row; justify-content:space-between; align-items:center; box-shadow:0 4px 12px rgba(0,0,0,.1); margin-bottom:24px; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.08); min-height:120px; }
        .dashboard-hero::before { content:''; position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:radial-gradient(circle,rgba(99,102,241,.15) 0%,rgba(99,102,241,0) 70%); border-radius:50%; pointer-events:none; filter:blur(10px); }
        .hero-left { position:relative; z-index:2; }
        .greeting-prefix { font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:#818cf8; display:block; margin-bottom:2px; }
        .welcome-title { font-size:1.6rem; font-weight:700; letter-spacing:-.5px; line-height:1.2; display:inline-flex; align-items:center; gap:8px; flex-wrap:wrap; margin:0; color:#fff !important; }
        .wave-emoji { display:inline-block; animation:wave-animation 2.5s infinite; transform-origin:70% 70%; }
        @keyframes wave-animation { 0%{transform:rotate(0)} 10%{transform:rotate(14deg)} 20%{transform:rotate(-8deg)} 30%{transform:rotate(14deg)} 40%{transform:rotate(-4deg)} 50%{transform:rotate(10deg)} 60%{transform:rotate(0)} 100%{transform:rotate(0)} }
        .hero-subtext { font-size:.88rem; color:#94a3b8; margin:4px 0 0; font-weight:400; line-height:1.4; }
        .project-card { background:#fff; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,.06); margin-bottom:24px; overflow:hidden; transition:box-shadow .2s ease; }
        .project-card:hover { box-shadow:0 8px 24px rgba(0,0,0,.10); }
        .project-card-header { padding:20px 24px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f5f9; cursor:pointer; }
        .project-title { font-size:1.15rem; font-weight:800; margin:0; color:#1e293b; }
        .status-badge { font-size:.75rem; padding:4px 10px; border-radius:999px; font-weight:700; }
        .status-Completed { background:#dcfce7; color:#166534; }
        .status-Active { background:#dbeafe; color:#1e40af; }
        .message-btn { padding:10px 20px; background:#4f46e5; color:#fff; border:none; border-radius:8px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:8px; font-size:.88rem; transition:background .2s; }
        .message-btn:hover { background:#4338ca; }
        .emp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:12px; }
        @media(max-width:640px){ .emp-grid{grid-template-columns:1fr;} }
        .refresh-indicator { display:inline-flex; align-items:center; gap:6px; font-size:.72rem; color:#94a3b8; }
      `}</style>

      {/* Hero */}
      <section className="dashboard-hero">
        <div className="hero-left">
          <span className="greeting-prefix">Client Portal</span>
          <h1 className="welcome-title">
            Welcome back, {data.client?.name || user?.first_name} <span className="wave-emoji">👋</span>
          </h1>
          {data.client?.business_name && <p className="hero-subtext">Representing {data.client.business_name}</p>}
          <div className="refresh-indicator" style={{ marginTop: '8px' }}>
            <span>🔄 Auto-refreshes every 30s · Last: {lastRefresh.toLocaleTimeString()}</span>
            <button onClick={() => fetchDashboard(true)} style={{ background: 'none', border: '1px solid rgba(255,255,255,.2)', borderRadius: '6px', color: '#94a3b8', padding: '2px 8px', cursor: 'pointer', fontSize: '0.72rem' }}>
              Refresh Now
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          {[
            { label: 'Total Projects', value: data.projects.length, color: '#818cf8' },
            { label: 'Completed', value: data.projects.filter(p => p.status === 'Completed').length, color: '#4ade80' },
            { label: 'In Progress', value: data.projects.filter(p => p.status !== 'Completed').length, color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '10px', padding: '12px 18px', textAlign: 'center', minWidth: '80px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', color: '#1e293b' }}>Your Projects</h2>

      {data.projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📁</div>No projects assigned to you yet.
        </div>
      ) : (
        data.projects.map(project => {
          const isOpen = expandedProjects[project.id];
          const progressColor = project.progress >= 80 ? '#22c55e' : project.progress >= 50 ? '#f59e0b' : '#3b82f6';
          const statusClass = project.status === 'Completed' ? 'status-Completed' : 'status-Active';

          return (
            <div key={project.id} className="project-card">
              {/* Project Header */}
              <div className="project-card-header" onClick={() => toggleProject(project.id)}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h3 className="project-title">{project.name}</h3>
                    <span className={`status-badge ${statusClass}`}>{project.status}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>#{project.project_code}</span>
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${project.progress}%`, background: progressColor, borderRadius: '5px', transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: progressColor, flexShrink: 0 }}>{project.progress}%</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 700 }}>✓ {project.completed_tasks || 0} Completed</span>
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>○ {project.pending_tasks || 0} Pending</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>📋 {project.total_tasks || 0} Total</span>
                    {project.deadline && <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>📅 Due: {project.deadline}</span>}
                  </div>
                </div>
                <div style={{ flexShrink: 0, marginLeft: '16px', color: '#94a3b8', fontSize: '0.8rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</div>
              </div>

              {/* Expanded Content */}
              {isOpen && (
                <div style={{ padding: '20px 24px' }}>
                  {/* Project Meta */}
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '20px', padding: '14px 18px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <div><span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Manager</span><span style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 700 }}>👤 {project.manager || 'N/A'}</span></div>
                    {project.startdate && <div><span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Start</span><span style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 700 }}>📅 {project.startdate}</span></div>}
                    {project.deadline && <div><span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Deadline</span><span style={{ fontSize: '0.88rem', color: '#ef4444', fontWeight: 700 }}>⏰ {project.deadline}</span></div>}
                  </div>

                  {/* Employee Work + Review Breakdown */}
                  {project.employee_work && project.employee_work.length > 0 ? (
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>👥 Team Work & Review</h4>
                        <span style={{ fontSize: '0.73rem', background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>{project.employee_work.length} employees</span>
                        <span style={{ fontSize: '0.73rem', color: '#94a3b8' }}>↓ Click employee to review submitted documents</span>
                      </div>
                      <div className="emp-grid">
                        {project.employee_work.map(emp => (
                          <EmployeeWorkCard key={emp.id} emp={emp} onReviewSubmitted={() => fetchDashboard(true)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '20px', padding: '20px', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #e2e8f0', textAlign: 'center', color: '#94a3b8', fontSize: '0.88rem' }}>No tasks assigned to team members yet.</div>
                  )}

                  {/* Teams */}
                  {project.teams && project.teams.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: '0 0 10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Teams</h4>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {project.teams.map((t, idx) => (
                          <div key={idx} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem', color: '#475569' }}>
                            <strong style={{ color: '#1e293b' }}>{t.name}</strong>
                            {t.lead && <span> · Lead: {t.lead}</span>}
                            {t.members && t.members.length > 0 && <div style={{ marginTop: '4px', color: '#94a3b8' }}>{t.members.map(m => m.name).join(', ')}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleStartChat(project)} className="message-btn">
                      <i className="fa-solid fa-comments" /> Message Team
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ClientDashboard;
