import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const Tasks = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const role = user?.role;
  const location = useLocation();
  const navState = location.state;

  const [activeTab, setActiveTab] = useState(navState?.activeTab || 'board'); // 'board' or 'daily-reports' or 'assign'
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState(navState?.statusFilter || '');
  const [projectFilter, setProjectFilter] = useState(navState?.projectFilter || '');

  useEffect(() => {
    if (navState) {
      if (navState.activeTab) setActiveTab(navState.activeTab);
      if (navState.statusFilter) setStatusFilter(navState.statusFilter);
      if (navState.projectFilter) setProjectFilter(navState.projectFilter);
    }
  }, [navState]);

  // Task assignment form state (TL/Manager/HR/MD only)
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [assigning, setAssigning] = useState(false);

  // Daily report form state
  const [reportProject, setReportProject] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState('');
  const [tasksInProgress, setTasksInProgress] = useState('');
  const [reportIssues, setReportIssues] = useState('');
  const [planTomorrow, setPlanTomorrow] = useState('');
  const [reporting, setReporting] = useState(false);

  // Task submit details state
  const [selectedTaskToSubmit, setSelectedTaskToSubmit] = useState(null);
  const [taskDetailModal, setTaskDetailModal] = useState(null);
  const [submissionRemarks, setSubmissionRemarks] = useState('');
  const [submissionFile, setSubmissionFile] = useState(null);
  
  const [extensionModalTask, setExtensionModalTask] = useState(null);
  const [extensionReason, setExtensionReason] = useState('');
  const [extensionHours, setExtensionHours] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const tasksRes = await api.get('/api/tasks/');
      setTasks(tasksRes.data);

      const projectsRes = await api.get('/api/projects/');
      setProjects(projectsRes.data);

      const reportsRes = await api.get('/api/daily-reports/');
      setReports(reportsRes.data);

      if (['TeamLead', 'Manager', 'HR', 'MD'].includes(role)) {
        const params = {};
        if (['TeamLead', 'Manager'].includes(role)) {
          params.scope = 'team';
        }
        const usersRes = await api.get('/api/users/', { params });
        setAllUsers(usersRes.data || []);
      }
    } catch (err) {
      console.error('Error loading task management data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    setAssigning(true);
    try {
      await api.post('/api/tasks/', {
        task_name: newTaskName,
        description: newTaskDesc,
        project: selectedProject,
        start_date: startDate,
        end_date: endDate,
        members: assignedMembers,
      });
      showToast('Task assigned successfully.', 'success');
      setNewTaskName('');
      setNewTaskDesc('');
      setSelectedProject('');
      setStartDate('');
      setEndDate('');
      setAssignedMembers([]);
      setActiveTab('board');
      loadData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to assign task.', 'error');
    } finally {
      setAssigning(false);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setReporting(true);
    try {
      await api.post('/api/daily-reports/', {
        project: reportProject,
        tasks_completed: tasksCompleted,
        tasks_in_progress: tasksInProgress,
        issues: reportIssues,
        plan_for_tomorrow: planTomorrow,
      });
      showToast('Daily report submitted.', 'success');
      setReportProject('');
      setTasksCompleted('');
      setTasksInProgress('');
      setReportIssues('');
      setPlanTomorrow('');
      loadData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to submit report.', 'error');
    } finally {
      setReporting(false);
    }
  };

  const handleTaskSubmitAction = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('status', 'Submitted');
      formData.append('remarks', submissionRemarks);
      if (submissionFile) {
        formData.append('file', submissionFile);
      }
      await api.put(`/api/tasks/${selectedTaskToSubmit.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToast('Task submitted successfully.', 'success');
      setSelectedTaskToSubmit(null);
      loadData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to submit task.', 'error');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/api/tasks/${taskId}/`, { status: newStatus });
      showToast(`Task status updated to ${newStatus}.`, 'success');
      loadData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update task status.', 'error');
    }
  };

  const handleTLTaskReview = async (taskId, action) => {
    try {
      await api.post(`/api/tasks/${taskId}/review/`, { action, score: 100, remarks: 'Reviewed from task board.' });
      showToast(`Task ${action === 'submit_to_manager' ? 'approved' : 'returned'}.`, 'success');
      loadData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to process task review.', 'error');
    }
  };

  const handleExtensionSubmit = async (e) => {
    e.preventDefault();
    if (!extensionModalTask) return;
    try {
      await api.post(`/api/tasks/${extensionModalTask.id}/extension/`, {
        reason: extensionReason,
        requested_hours: extensionHours
      });
      showToast('Extension requested successfully.', 'success');
      setExtensionModalTask(null);
      setExtensionReason('');
      setExtensionHours('');
      loadData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to request extension.', 'error');
    }
  };

  const handleMemberSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setAssignedMembers(values);
  };

  const filteredTasks = tasks.filter(t => {
    if (projectFilter === 'active' && t.project && t.project.status !== 'Active') {
      return false;
    }
    if (statusFilter && t.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <style>{`
        .task-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid var(--border);
          margin-bottom: 20px;
        }
        .task-tab {
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 700;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: var(--transition-base);
        }
        .task-tab.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }
        .task-grid-panel {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .task-grid-panel {
            grid-template-columns: 1fr;
          }
        }
        .report-item {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 15px;
          text-align: left;
        }
        .report-meta {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
          margin-bottom: 8px;
          font-size: 12px;
          color: var(--muted);
          font-weight: 600;
        }

        .task-cards-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .task-square-card {
          width: calc(33.333% - 14px);
          min-width: 280px;
          min-height: 250px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        @media (max-width: 1024px) {
          .task-square-card {
            width: calc(50% - 10px);
          }
        }
        @media (max-width: 640px) {
          .task-square-card {
            width: 100%;
          }
        }
        .task-square-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .task-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .task-card-title {
          font-weight: 700;
          font-size: 1.15rem;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .task-card-project {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
        }
        .task-card-dates {
          background: #f8fafc;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 0.85rem;
          color: #475569;
          border: 1px solid #f1f5f9;
        }
        .task-card-dates div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .task-card-dates div:last-child {
          margin-bottom: 0;
        }
        .task-card-actions {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #f1f5f9;
          padding-top: 15px;
        }

        .assign-task-card {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .assign-task-card .panel-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 24px;
        }
        .assign-task-card .panel-header h2 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .assign-task-card .panel-body {
          padding: 28px;
        }
        .assign-task-card .form-group {
          margin-bottom: 20px;
        }
        .assign-task-card .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }
        .assign-task-card .form-group input, 
        .assign-task-card .form-group select, 
        .assign-task-card .form-group textarea {
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
        .assign-task-card .form-group input:focus, 
        .assign-task-card .form-group select:focus, 
        .assign-task-card .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .assign-task-card .btn-submit-premium {
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
        .assign-task-card .btn-submit-premium:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .assign-task-card .btn-submit-premium:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}</style>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Workspace Tasks & Reports</h2>

      {/* Tabs */}
      <div className="task-tabs">
        <div className={`task-tab ${activeTab === 'board' ? 'active' : ''}`} onClick={() => setActiveTab('board')}>
          📋 Tasks Board
        </div>
        <div className={`task-tab ${activeTab === 'daily-reports' ? 'active' : ''}`} onClick={() => setActiveTab('daily-reports')}>
          ✍️ Daily Progress Reports
        </div>
        {['TeamLead', 'Manager', 'HR', 'MD'].includes(role) && (
          <div className={`task-tab ${activeTab === 'assign' ? 'active' : ''}`} onClick={() => setActiveTab('assign')}>
            Assign Tasks
          </div>
        )}
      </div>

      {loading ? (
        <div>Loading workspace registry...</div>
      ) : (
        <div>
          {/* 1. TASKS BOARD VIEW */}
          {activeTab === 'board' && (
            <div className="dashboard-panel-card">
              <div className="panel-header">
                <h2>Assigned Workspace Tasks</h2>
              </div>
              <div className="panel-body">
                <div style={{ padding: '10px 0' }}>
                  <h3 style={{ marginBottom: '20px', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', fontSize: '1.2rem', fontWeight: 700 }}>Pending & Assigned Tasks</h3>
                  <div className="task-cards-row">
                    {filteredTasks.filter(t => t.status !== 'Completed').length > 0 ? (
                      filteredTasks.filter(t => t.status !== 'Completed').map(t => {
                        const todayStr = new Date().toISOString().split('T')[0];
                        const canStart = !t.start_date || todayStr >= t.start_date;
                        return (
                        <div key={t.id} className="task-square-card" onClick={() => setTaskDetailModal(t)} style={{ cursor: 'pointer' }}>
                          <div>
                            <div className="task-card-header">
                              <div>
                                <div className="task-card-title">{t.task_name}</div>
                                <div className="task-card-project">📂 {t.project?.project_name || 'General'}</div>
                              </div>
                              <span className={`badge-capsule ${t.status === 'Submitted' ? 'info' : 'warning'}`}>
                                {t.status}
                              </span>
                            </div>
                            <div className="task-card-dates">
                              <div><span>Start Date:</span> <strong>{t.start_date || 'N/A'}</strong></div>
                              <div><span>End Date:</span> <strong>{t.end_date || 'N/A'}</strong></div>
                            </div>
                            {t.description && (
                              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {t.description}
                              </div>
                            )}
                          </div>
                          
                          <div className="task-card-actions">
                            {t.status === 'Pending' ? (
                              (t.members?.some(m => m.id === user.id) || ['TeamLead', 'Manager', 'HR', 'MD'].includes(role)) ? (
                                canStart ? (
                                  <button className="view-btn" style={{ width: '100%', textAlign: 'center', background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }} onClick={(e) => { e.stopPropagation(); handleUpdateTaskStatus(t.id, 'In Progress'); }}>
                                    Start Task
                                  </button>
                                ) : (
                                  <span style={{ fontSize: '12px', color: 'var(--muted)', background: '#f8fafc', padding: '8px', borderRadius: '6px', width: '100%', textAlign: 'center', display: 'block' }}>Starts on {t.start_date}</span>
                                )
                              ) : (
                                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Pending</span>
                              )
                            ) : t.status === 'In Progress' ? (
                              (t.members?.some(m => m.id === user.id) || ['TeamLead', 'Manager', 'HR', 'MD'].includes(role)) ? (
                                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                  <button className="view-btn" style={{ flex: 1, textAlign: 'center', background: '#f59e0b', color: '#fff', borderColor: '#f59e0b', padding: '8px', fontSize: '12px', borderRadius: '6px' }} onClick={(e) => { e.stopPropagation(); setExtensionModalTask(t); }}>
                                    Extend
                                  </button>
                                  <button className="view-btn" style={{ flex: 1, textAlign: 'center', background: '#10b981', color: '#fff', borderColor: '#10b981', padding: '8px', fontSize: '12px', borderRadius: '6px' }} onClick={(e) => { e.stopPropagation(); setSelectedTaskToSubmit(t); }}>
                                    Submit
                                  </button>
                                </div>
                              ) : (
                                <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>In Progress</span>
                              )
                            ) : t.status === 'Submitted' ? (
                              ['TeamLead', 'Manager', 'HR', 'MD'].includes(role) ? (
                                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                  <button 
                                    className="view-btn" 
                                    style={{ flex: 1, background: '#10b981', borderColor: '#10b981', color: '#fff', padding: '8px 10px', fontSize: '12px', borderRadius: '6px' }}
                                    onClick={(e) => { e.stopPropagation(); handleTLTaskReview(t.id, 'submit_to_manager'); }}
                                  >
                                    Approve
                                  </button>
                                  <button 
                                    className="view-btn" 
                                    style={{ flex: 1, background: '#ef4444', borderColor: '#ef4444', color: '#fff', padding: '8px 10px', fontSize: '12px', borderRadius: '6px' }}
                                    onClick={(e) => { e.stopPropagation(); handleTLTaskReview(t.id, 'return_to_employee'); }}
                                  >
                                    Return
                                  </button>
                                </div>
                              ) : (
                                <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600 }}>Awaiting Approval</span>
                              )
                            ) : null}
                          </div>
                        </div>
                      )})
                    ) : (
                      <p style={{ color: 'var(--muted)', width: '100%', padding: '20px 0' }}>No pending tasks assigned in this scope.</p>
                    )}
                  </div>

                  <h3 style={{ marginTop: '40px', marginBottom: '20px', color: '#10b981', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', fontSize: '1.2rem', fontWeight: 700 }}>Completed Tasks</h3>
                  <div className="task-cards-row">
                    {filteredTasks.filter(t => t.status === 'Completed').length > 0 ? (
                      filteredTasks.filter(t => t.status === 'Completed').map(t => (
                        <div key={t.id} className="task-square-card" style={{ opacity: 0.85, borderLeft: '4px solid #10b981', cursor: 'pointer' }} onClick={() => setTaskDetailModal(t)}>
                          <div>
                            <div className="task-card-header">
                              <div>
                                <div className="task-card-title" style={{ textDecoration: 'line-through', color: '#64748b' }}>{t.task_name}</div>
                                <div className="task-card-project">📂 {t.project?.project_name || 'General'}</div>
                              </div>
                              <span className="badge-capsule success">
                                Completed
                              </span>
                            </div>
                            <div className="task-card-dates">
                              <div><span>Start Date:</span> <strong>{t.start_date || 'N/A'}</strong></div>
                              <div><span>End Date:</span> <strong>{t.end_date || 'N/A'}</strong></div>
                            </div>
                          </div>
                          <div className="task-card-actions">
                            <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 700, width: '100%', textAlign: 'center', background: '#d1fae5', padding: '8px', borderRadius: '6px' }}>
                              ✓ Task Completed
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--muted)', width: '100%', padding: '20px 0' }}>No completed tasks.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. DAILY PROGRESS REPORTS VIEW */}
          {activeTab === 'daily-reports' && (
            <div className="task-grid-panel">
              {/* Daily Reports feed list */}
              <div className="dashboard-panel-card">
                <div className="panel-header">
                  <h2>Recent Reports List</h2>
                </div>
                <div className="panel-body">
                  {reports.length > 0 ? (
                    reports.map((r) => (
                      <div className="report-item" key={r.id}>
                        <div className="report-meta">
                          <span>👤 {r.user_full_name} ({r.user_name})</span>
                          <span>📅 {r.report_date}</span>
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                          <p><b>Project Scope:</b> {r.project_name || 'General'}</p>
                          <p><b>Tasks Completed:</b> {r.tasks_completed}</p>
                          {r.tasks_in_progress && <p><b>Tasks in Progress:</b> {r.tasks_in_progress}</p>}
                          {r.issues && <p style={{ color: 'var(--danger)' }}><b>Issues / Bottlenecks:</b> {r.issues}</p>}
                          {r.plan_for_tomorrow && <p><b>Tomorrow's Alignment:</b> {r.plan_for_tomorrow}</p>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--muted)' }}>No daily status reports submitted.</p>
                  )}
                </div>
              </div>

              {/* Submit Daily Report Form */}
              <div className="dashboard-panel-card" style={{ height: 'fit-content' }}>
                <div className="panel-header">
                  <h2>Submit Daily report status</h2>
                </div>
                <div className="panel-body">
                  <form onSubmit={handleReportSubmit} style={{ textAlign: 'left' }}>
                    <div className="form-group">
                      <label>Project Scope</label>
                      <select value={reportProject} onChange={(e) => setReportProject(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                        <option value="">General / None</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>{p.project_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tasks Completed Details</label>
                      <textarea rows="3" value={tasksCompleted} onChange={(e) => setTasksCompleted(e.target.value)} required placeholder="Description of completed tasks..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                    </div>
                    <div className="form-group">
                      <label>Tasks in Progress</label>
                      <textarea rows="2" value={tasksInProgress} onChange={(e) => setTasksInProgress(e.target.value)} placeholder="Pending modules description..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                    </div>
                    <div className="form-group">
                      <label>Issues / Blockers</label>
                      <textarea rows="2" value={reportIssues} onChange={(e) => setReportIssues(e.target.value)} placeholder="State blockers if any..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                    </div>
                    <div className="form-group">
                      <label>Plan for Tomorrow</label>
                      <textarea rows="2" value={planTomorrow} onChange={(e) => setPlanTomorrow(e.target.value)} placeholder="Next steps alignment..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                    </div>
                    <button type="submit" className="btn" disabled={reporting} style={{ width: '100%' }}>
                      {reporting ? 'Uploading report...' : 'Submit Daily Status'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* 3. ASSIGN TASK VIEW */}
          {activeTab === 'assign' && (
            <div className="assign-task-card">
              <div className="panel-header">
                <h2>Assign a new Task</h2>
              </div>
              <div className="panel-body">
                <form onSubmit={handleAssignSubmit} style={{ textAlign: 'left' }}>
                  <div className="form-group">
                    <label>Task Description Name</label>
                    <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} required placeholder="e.g. Design Dashboard Login layout" />
                  </div>
                  <div className="form-group">
                    <label>Description Details</label>
                    <textarea rows="3" value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} placeholder="Detailed parameters..." />
                  </div>
                  <div className="form-group">
                    <label>Project Alignment</label>
                    <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} required>
                      <option value="">Select Project...</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>{p.project_name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className="form-group">
                      <label>Start Date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  </div>
                   <div className="form-group">
                    <label style={{ marginBottom: '10px', display: 'block' }}>Select Team Members</label>
                    <div style={{
                      maxHeight: '180px',
                      overflowY: 'auto',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      {allUsers.filter((u) => {
                        if (role === 'HR') return u.role === 'Manager';
                        if (role === 'Manager') return u.role === 'TeamLead';
                        if (role === 'TeamLead') {
                          if (u.role !== 'Employee') return false;
                          if (selectedProject) {
                            const p = projects.find(proj => String(proj.id) === String(selectedProject));
                            if (p && p.assigned_team_member_ids && p.assigned_team_member_ids.length > 0) {
                              return p.assigned_team_member_ids.includes(u.id);
                            }
                          }
                          return true;
                        }
                        return true;
                      }).length > 0 ? (
                        allUsers.filter((u) => {
                          if (role === 'HR') return u.role === 'Manager';
                          if (role === 'Manager') return u.role === 'TeamLead';
                          if (role === 'TeamLead') {
                            if (u.role !== 'Employee') return false;
                            if (selectedProject) {
                              const p = projects.find(proj => String(proj.id) === String(selectedProject));
                              if (p && p.assigned_team_member_ids && p.assigned_team_member_ids.length > 0) {
                                return p.assigned_team_member_ids.includes(u.id);
                              }
                            }
                            return true;
                          }
                          return true;
                        }).map((u) => {
                          const isChecked = assignedMembers.includes(u.id) || assignedMembers.includes(String(u.id));
                          return (
                            <label key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', fontWeight: 600, color: '#334155', margin: 0 }}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAssignedMembers([...assignedMembers, u.id]);
                                  } else {
                                    setAssignedMembers(assignedMembers.filter(id => id !== u.id && String(id) !== String(u.id)));
                                  }
                                }}
                                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#3b82f6' }}
                              />
                              <span>{u.name} ({u.role})</span>
                            </label>
                          );
                        })
                      ) : (
                        <div style={{ color: '#94a3b8', fontSize: '13px' }}>No team members available.</div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn-submit-premium" disabled={assigning}>
                    {assigning ? 'Assigning tasks...' : 'Assign Task'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TASK SUBMIT MODAL */}
      {selectedTaskToSubmit && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Submit Task Completion</h3>
              <button className="modal-close" onClick={() => setSelectedTaskToSubmit(null)}>×</button>
            </div>
            <form onSubmit={handleTaskSubmitAction} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label>Task</label>
                <input type="text" value={selectedTaskToSubmit.task_name} disabled style={{ background: '#f1f5f9' }} />
              </div>
              <div className="form-group">
                <label>Remarks</label>
                <textarea rows="3" value={submissionRemarks} onChange={(e) => setSubmissionRemarks(e.target.value)} required placeholder="Provide status completion remarks details..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
              </div>
              <div className="form-group">
                <label>Upload Document Proof (Optional)</label>
                <input type="file" onChange={(e) => setSubmissionFile(e.target.files[0])} style={{ padding: '6px 0' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn" style={{ background: '#64748b', marginTop: 0 }} onClick={() => setSelectedTaskToSubmit(null)}>Cancel</button>
                <button type="submit" className="btn" style={{ marginTop: 0 }}>Submit Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TASK DETAIL MODAL */}
      {taskDetailModal && (
        <div className="modal-overlay" onClick={() => setTaskDetailModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', animation: 'slideUp 0.3s ease' }}>
            <div className="modal-header">
              <h3>Task Overview</h3>
              <button className="modal-close" onClick={() => setTaskDetailModal(null)}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'left', padding: '24px' }}>
              <h4 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '10px' }}>{taskDetailModal.task_name}</h4>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <span className={`badge-capsule ${taskDetailModal.status === 'Completed' ? 'success' : taskDetailModal.status === 'Submitted' ? 'info' : 'warning'}`}>
                  {taskDetailModal.status}
                </span>
                <span className="badge-capsule" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                  📂 {taskDetailModal.project?.project_name || 'General'}
                </span>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <h5 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Description</h5>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                  {taskDetailModal.description || 'No description provided.'}
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Start Date</span>
                  <span style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: 600 }}>{taskDetailModal.start_date || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Deadline</span>
                  <span style={{ fontSize: '0.95rem', color: '#ef4444', fontWeight: 600 }}>{taskDetailModal.end_date || 'N/A'}</span>
                </div>
                {taskDetailModal.members && taskDetailModal.members.length > 0 && (
                   <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '10px' }}>Assigned Members</span>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {taskDetailModal.members.map(m => (
                           <span key={m.id} style={{ background: '#f1f5f9', color: '#334155', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #e2e8f0' }}>
                              👤 {m.name || m.username || 'Member'}
                           </span>
                        ))}
                      </div>
                   </div>
                )}
                {taskDetailModal.file_url && (
                  <div style={{ gridColumn: 'span 2', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Submitted Document</span>
                    <a
                      href={taskDetailModal.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', color: '#3b82f6', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #bfdbfe', textDecoration: 'none' }}
                    >
                      📄 View / Download Document
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXTENSION MODAL */}
      {extensionModalTask && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Request Deadline Extension</h3>
              <button className="modal-close" onClick={() => setExtensionModalTask(null)}>×</button>
            </div>
            <form onSubmit={handleExtensionSubmit} style={{ textAlign: 'left', padding: '20px' }}>
              <div className="form-group">
                <label>Task</label>
                <input type="text" value={extensionModalTask.task_name} disabled style={{ background: '#f1f5f9', width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
              </div>
              <div className="form-group">
                <label>Reason for Extension</label>
                <textarea rows="3" value={extensionReason} onChange={(e) => setExtensionReason(e.target.value)} required placeholder="State why you need more time..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
              </div>
              <div className="form-group">
                <label>Requested Additional Time (in hours)</label>
                <input type="number" value={extensionHours} onChange={(e) => setExtensionHours(e.target.value)} required placeholder="e.g. 24" min="1" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn" style={{ background: '#64748b', marginTop: 0 }} onClick={() => setExtensionModalTask(null)}>Cancel</button>
                <button type="submit" className="btn" style={{ marginTop: 0 }}>Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
