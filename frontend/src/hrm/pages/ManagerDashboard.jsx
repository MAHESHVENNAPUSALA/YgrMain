import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import OnLeaveTodayWidget from '../components/OnLeaveTodayWidget';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');
  const [devSearch, setDevSearch] = useState('');
  const [tlSearch, setTlSearch] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editSelectedMembers, setEditSelectedMembers] = useState([]);

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const res = await api.get('/api/dashboard/manager/');
        setData(res.data);
        const teamsRes = await api.get('/api/teams/');
        setTeams(teamsRes.data || []);
      } catch (err) {
        console.error('Error fetching Manager dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchManagerData();
  }, []);
  
  const fetchTeams = async () => {
    try {
        const teamsRes = await api.get('/api/teams/');
        setTeams(teamsRes.data || []);
    } catch (err) {
        console.error('Error fetching teams', err);
    }
  };

  // Sync tab from sidebar navigation state (e.g. "Developers List" click)
  useEffect(() => {
    setActiveTab(location.state?.tab || 'overview');
  }, [location.state?.tab]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--muted)' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading console...
      </div>
    );
  }

  const filteredDevs = (data?.developers_list || []).filter(d =>
    d.name?.toLowerCase().includes(devSearch.toLowerCase()) ||
    d.email?.toLowerCase().includes(devSearch.toLowerCase()) ||
    (d.emp_id || '').toLowerCase().includes(devSearch.toLowerCase())
  );

  const filteredLeads = (data?.team_leads_list || []).filter(l =>
    l.name?.toLowerCase().includes(tlSearch.toLowerCase()) ||
    l.email?.toLowerCase().includes(tlSearch.toLowerCase()) ||
    (l.emp_id || '').toLowerCase().includes(tlSearch.toLowerCase())
  );

  const getAvatar = (name, bg, color) => (
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
      background: bg, color: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: '1rem'
    }}>
      {name ? name.charAt(0).toUpperCase() : '?'}
    </div>
  );

  return (
    <div>
      <style>{`
        .m-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .m-stat-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 20px;
          box-shadow: var(--card-shadow);
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .m-stat-card:hover, .m-stat-card.active {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -3px rgba(59,130,246,0.15);
          border-color: #3b82f6;
        }
        .m-stat-card.active .m-stat-label {
          color: #3b82f6;
        }
        .m-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: #ffffff;
        }
        .m-stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-color);
          line-height: 1.2;
        }
        .m-stat-label {
          font-size: 0.8rem;
          color: var(--muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .m-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .m-grid { grid-template-columns: 1fr; }
        }
        .m-member-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          transition: background 0.15s;
        }
        .m-member-row:hover {
          background: #f1f5f9;
        }
        .m-member-info { flex: 1; min-width: 0; }
        .m-member-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.92rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .m-member-sub {
          font-size: 0.76rem;
          color: #64748b;
          margin-top: 1px;
        }
        .m-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.84rem;
          cursor: pointer;
          border: none;
          transition: all 0.15s;
        }
        .m-add-btn-green {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          box-shadow: 0 2px 8px rgba(34,197,94,0.25);
        }
        .m-add-btn-green:hover { background: linear-gradient(135deg, #16a34a, #15803d); transform: translateY(-1px); }
        .m-add-btn-amber {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #fff;
          box-shadow: 0 2px 8px rgba(245,158,11,0.25);
        }
        .m-add-btn-amber:hover { background: linear-gradient(135deg, #d97706, #b45309); transform: translateY(-1px); }
        .m-search-input {
          padding: 8px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #0f172a;
          outline: none;
          width: 220px;
          transition: border-color 0.15s;
        }
        .m-search-input:focus { border-color: #3b82f6; }
        .m-empty {
          text-align: center;
          color: #94a3b8;
          padding: 40px 20px;
          font-size: 0.9rem;
        }
      `}</style>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Manager Console</h2>

      {/* Stats row — clicking Developers/Teams switches the tab */}
      <div className="m-stats-grid">
        <div className="m-stat-card" onClick={() => navigate('/projects')}>
          <div className="m-stat-icon" style={{ background: 'linear-gradient(135deg, var(--accent-blue), #1e40af)' }}>
            <i className="fa-solid fa-folder-open"></i>
          </div>
          <div>
            <div className="m-stat-value">{(data?.projects_received || 0) + (data?.projects_assigned || 0)}</div>
            <div className="m-stat-label">Total Projects</div>
          </div>
        </div>

        <div className={`m-stat-card ${activeTab === 'developers' ? 'active' : ''}`} onClick={() => setActiveTab('developers')}>
          <div className="m-stat-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #047857)' }}>
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <div className="m-stat-value">{data?.employees_count || 0}</div>
            <div className="m-stat-label">Total Developers</div>
          </div>
        </div>

        <div className={`m-stat-card ${activeTab === 'teamleads' ? 'active' : ''}`} onClick={() => setActiveTab('teamleads')}>
          <div className="m-stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)' }}>
            <i className="fa-solid fa-users-gear"></i>
          </div>
          <div>
            <div className="m-stat-value">{data?.team_leads_count || 0}</div>
            <div className="m-stat-label">Team Leads</div>
          </div>
        </div>

        <div className={`m-stat-card ${activeTab === 'teams' ? 'active' : ''}`} onClick={() => setActiveTab('teams')}>
          <div className="m-stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
            <i className="fa-solid fa-network-wired"></i>
          </div>
          <div>
            <div className="m-stat-value">Manage</div>
            <div className="m-stat-label">Teams</div>
          </div>
        </div>
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="m-grid">
          {/* Reports Registry */}
          <div className="dashboard-panel-card">
            <div className="panel-header">
              <h2><i className="fa-solid fa-file-invoice" style={{ color: 'var(--accent-blue)', marginRight: '8px' }}></i> Developer Activity Reports (Recent)</h2>
            </div>
            <div className="panel-body">
              <div className="table-wrap">
                <table className="dense-table">
                  <thead>
                    <tr>
                      <th>Developer</th>
                      <th>Project</th>
                      <th>Date</th>
                      <th>Tasks Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.daily_reports && data.daily_reports.length > 0 ? (
                      data.daily_reports.map((r) => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 600 }}>{r.user_name}</td>
                          <td>{r.project_name}</td>
                          <td>{r.report_date}</td>
                          <td>{r.tasks_completed}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)' }}>No reports received recently.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Leaves summary */}
          <div className="dashboard-panel-card">
            <div className="panel-header">
              <h2><i className="fa-solid fa-clipboard-check" style={{ color: 'var(--accent-blue)', marginRight: '8px' }}></i> Leaves Pending Approval</h2>
            </div>
            <div className="panel-body" style={{ textAlign: 'left', fontSize: '13.5px', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px' }}>
                <span>Developer Leaves Pending:</span>
                <strong style={{ color: 'var(--danger)' }}>{data?.employee_leave_count || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '16px' }}>
                <span>Team Lead Leaves Pending:</span>
                <strong style={{ color: 'var(--danger)' }}>{data?.teamlead_leave_count || 0}</strong>
              </div>
              <button
                className="m-add-btn m-add-btn-green"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => navigate('/leave-requests')}
              >
                <i className="fa-solid fa-arrow-right"></i> View & Approve Leave Requests
              </button>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '12px' }}>
                * Managers must approve or reject pending leave requests before they proceed to HR.
              </p>
            </div>
          </div>
          
          <div className="dashboard-panel-card" style={{ gridColumn: 'span 2' }}>
            <OnLeaveTodayWidget onLeaveList={data?.on_leave_today || []} />
          </div>
        </div>
      )}

      {/* ── DEVELOPERS TAB ── */}
      {activeTab === 'developers' && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2>
              <i className="fa-solid fa-users" style={{ color: '#22c55e', marginRight: '8px' }}></i>
              Total Developers
              <span style={{ marginLeft: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>({filteredDevs.length})</span>
            </h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                className="m-search-input"
                type="text"
                placeholder="🔍 Search by name / email / ID..."
                value={devSearch}
                onChange={e => setDevSearch(e.target.value)}
              />
              <button
                className="m-add-btn m-add-btn-green"
                onClick={() => navigate('/register', { state: { defaultRole: 'Employee' } })}
              >
                <i className="fa-solid fa-user-plus"></i> Add New Developer
              </button>
            </div>
          </div>
          <div className="panel-body">
            {filteredDevs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredDevs.map((dev, idx) => (
                  <div key={dev.id} className="m-member-row">
                    <div style={{
                      width: '32px', textAlign: 'center', fontWeight: 700,
                      color: '#94a3b8', fontSize: '0.8rem'
                    }}>{idx + 1}</div>
                    {getAvatar(dev.name, '#dcfce7', '#16a34a')}
                    <div className="m-member-info">
                      <div className="m-member-name">{dev.name}</div>
                      <div className="m-member-sub">
                        {dev.emp_id && <span style={{ background: '#f0fdf4', color: '#15803d', padding: '1px 7px', borderRadius: '20px', fontWeight: 700, marginRight: '8px' }}>{dev.emp_id}</span>}
                        {dev.email}
                      </div>
                    </div>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                      Developer
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="m-empty">
                <i className="fa-solid fa-users" style={{ fontSize: '2rem', marginBottom: '10px', display: 'block', color: '#cbd5e1' }}></i>
                {devSearch ? 'No developers match your search.' : 'No developers added yet.'}
                <br />
                <button
                  className="m-add-btn m-add-btn-green"
                  style={{ marginTop: '16px' }}
                  onClick={() => navigate('/register', { state: { defaultRole: 'Employee' } })}
                >
                  <i className="fa-solid fa-user-plus"></i> Add First Developer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TEAM LEADS TAB ── */}
      {activeTab === 'teamleads' && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2>
              <i className="fa-solid fa-users-gear" style={{ color: '#f59e0b', marginRight: '8px' }}></i>
              Team Leads
              <span style={{ marginLeft: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>({filteredLeads.length})</span>
            </h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                className="m-search-input"
                type="text"
                placeholder="🔍 Search by name / email / ID..."
                value={tlSearch}
                onChange={e => setTlSearch(e.target.value)}
              />
              <button
                className="m-add-btn m-add-btn-amber"
                onClick={() => navigate('/register', { state: { defaultRole: 'TeamLead' } })}
              >
                <i className="fa-solid fa-user-plus"></i> Add New Team Lead
              </button>
            </div>
          </div>
          <div className="panel-body">
            {filteredLeads.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredLeads.map((lead, idx) => (
                  <div key={lead.id} className="m-member-row">
                    <div style={{
                      width: '32px', textAlign: 'center', fontWeight: 700,
                      color: '#94a3b8', fontSize: '0.8rem'
                    }}>{idx + 1}</div>
                    {getAvatar(lead.name, '#fef3c7', '#d97706')}
                    <div className="m-member-info">
                      <div className="m-member-name">{lead.name}</div>
                      <div className="m-member-sub">
                        {lead.emp_id && <span style={{ background: '#fffbeb', color: '#b45309', padding: '1px 7px', borderRadius: '20px', fontWeight: 700, marginRight: '8px' }}>{lead.emp_id}</span>}
                        {lead.email}
                      </div>
                    </div>
                    <span style={{ background: '#fef3c7', color: '#b45309', padding: '3px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                      Team Lead
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="m-empty">
                <i className="fa-solid fa-users-gear" style={{ fontSize: '2rem', marginBottom: '10px', display: 'block', color: '#cbd5e1' }}></i>
                {tlSearch ? 'No team leads match your search.' : 'No team leads added yet.'}
                <br />
                <button
                  className="m-add-btn m-add-btn-amber"
                  style={{ marginTop: '16px' }}
                  onClick={() => navigate('/register', { state: { defaultRole: 'TeamLead' } })}
                >
                  <i className="fa-solid fa-user-plus"></i> Add First Team Lead
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ── TEAMS TAB ── */}
      {activeTab === 'teams' && (
        <div className="dashboard-panel-card">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2>
              <i className="fa-solid fa-network-wired" style={{ color: '#8b5cf6', marginRight: '8px' }}></i>
              Manage Teams
            </h2>
          </div>
          <div className="panel-body">
            <div className="assign-task-card" style={{ boxShadow: 'none', border: '1px solid #e2e8f0' }}>
              <div className="panel-header" style={{ background: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Create New Team</h3>
              </div>
              <div className="panel-body">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const payload = Object.fromEntries(formData);
                  payload.members = selectedMembers;
                  try {
                    await api.post('/api/teams/', payload);
                    alert('Team created successfully!');
                    e.target.reset();
                    setSelectedMembers([]);
                    fetchTeams();
                  } catch (err) {
                    alert(err.response?.data?.detail || 'Failed to create team.');
                  }
                }} style={{ textAlign: 'left' }}>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Team Name</label>
                    <input name="name" required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Select Team Lead</label>
                    <select name="lead" required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <option value="">-- Choose a Team Lead --</option>
                      {filteredLeads.map(lead => (
                        <option key={lead.id} value={lead.id}>{lead.name} ({lead.email})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Select Employees (Members)</label>
                    <div style={{
                      maxHeight: '180px',
                      overflowY: 'auto',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      {filteredDevs.filter(dev => !dev.is_assigned).length > 0 ? (
                        filteredDevs.filter(dev => !dev.is_assigned).map(dev => {
                          const isChecked = selectedMembers.includes(dev.id);
                          return (
                            <label key={dev.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#334155', margin: 0 }}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedMembers([...selectedMembers, dev.id]);
                                  } else {
                                    setSelectedMembers(selectedMembers.filter(id => id !== dev.id));
                                  }
                                }}
                                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }}
                              />
                              <span>{dev.name} ({dev.email})</span>
                            </label>
                          );
                        })
                      ) : (
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No employees available.</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Department</label>
                    <input name="department" defaultValue="python_dev" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <button type="submit" className="m-add-btn m-add-btn-green" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
                    Create Team & Assign Lead
                  </button>
                </form>
              </div>
            </div>
            
            {/* Manage Existing Teams List */}
            <div className="assign-task-card" style={{ boxShadow: 'none', border: '1px solid #e2e8f0', marginTop: '24px' }}>
              <div className="panel-header" style={{ background: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Manage Existing Teams</h3>
              </div>
              <div className="panel-body">
                {teams.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {teams.map(team => (
                      <div key={team.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff' }}>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '1.05rem' }}>{team.name}</h4>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Lead: {team.lead_detail ? (team.lead_detail.first_name + ' ' + team.lead_detail.last_name).trim() || team.lead_detail.username : (team.lead_name || 'Unassigned')} | Dept: {team.department_display || team.department}</p>
                          {team.members_detail && team.members_detail.length > 0 && (
                            <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#475569' }}>
                              <strong>Members: </strong>
                              {team.members_detail.map(m => (m.first_name + ' ' + m.last_name).trim() || m.username).join(', ')}
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => {
                            setEditingTeam(team);
                            setEditSelectedMembers(team.members || []);
                          }} style={{ padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </button>
                          <button onClick={async () => {
                            if (window.confirm(`Are you sure you want to delete team ${team.name}?`)) {
                              try {
                                await api.delete(`/api/teams/${team.id}/`);
                                alert('Team deleted successfully!');
                                fetchTeams();
                              } catch(err) {
                                alert(err.response?.data?.detail || 'Failed to delete team.');
                              }
                            }
                          }} style={{ padding: '6px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                    No teams found. Create a new team above.
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ marginTop: '30px' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Teams you create will be available to assign to Projects in the Projects workspace.</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {editingTeam && (
        <div className="modal-overlay" onClick={() => setEditingTeam(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Team: {editingTeam.name}</h3>
              <button className="modal-close-btn" onClick={() => setEditingTeam(null)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const payload = Object.fromEntries(formData);
                payload.members = editSelectedMembers;
                try {
                  await api.put(`/api/teams/${editingTeam.id}/`, payload);
                  alert('Team updated successfully!');
                  setEditingTeam(null);
                  fetchTeams();
                } catch(err) {
                  alert(err.response?.data?.detail || 'Failed to update team.');
                }
              }} style={{ textAlign: 'left' }}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Team Name</label>
                  <input name="name" defaultValue={editingTeam.name} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Department</label>
                  <input name="department" defaultValue={editingTeam.department} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Select Team Lead</label>
                  <select name="lead" defaultValue={editingTeam.lead || ''} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <option value="">-- Choose a Team Lead --</option>
                    {filteredLeads.map(lead => (
                      <option key={lead.id} value={lead.id}>{lead.name} ({lead.email})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Select Employees (Members)</label>
                  <div style={{
                    maxHeight: '180px',
                    overflowY: 'auto',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {filteredDevs.filter(dev => !dev.is_assigned || editSelectedMembers.includes(dev.id)).length > 0 ? (
                      filteredDevs.filter(dev => !dev.is_assigned || editSelectedMembers.includes(dev.id)).map(dev => {
                        const isChecked = editSelectedMembers.includes(dev.id);
                        return (
                          <label key={dev.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#334155', margin: 0 }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditSelectedMembers([...editSelectedMembers, dev.id]);
                                } else {
                                  setEditSelectedMembers(editSelectedMembers.filter(id => id !== dev.id));
                                }
                              }}
                              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }}
                            />
                            <span>{dev.name} ({dev.email})</span>
                          </label>
                        );
                      })
                    ) : (
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No employees available.</div>
                    )}
                  </div>
                </div>
                <button type="submit" className="m-add-btn m-add-btn-green" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
