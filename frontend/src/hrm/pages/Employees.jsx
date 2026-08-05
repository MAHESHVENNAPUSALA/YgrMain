import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const Employees = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const role = user?.role;

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Determine default role filter from the pathname or state
  const getInitialRoleFilter = () => {
    const path = location.pathname;
    if (path.includes('hr-list')) return 'HR';
    if (path.includes('manager-list')) return 'Manager';
    if (path.includes('tl-list')) return 'TeamLead';
    if (path.includes('employee-list')) return 'Employee';
    return 'All';
  };

  const [roleFilter, setRoleFilter] = useState(getInitialRoleFilter());
  const [deptFilter, setDeptFilter] = useState('All');
  
  // State-driven filters from dashboard cards (e.g. 'NewJoiners', 'DocsPending')
  const [specialFilter, setSpecialFilter] = useState(location.state?.filter || 'All');

  // Detail & Edit modal states
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    designation: '',
    department: '',
    team_name: '',
    role: '',
    salary: '',
    date_of_joining: '',
    status: '',
    experience_years: '',
    address: ''
  });

  // Sync state filters if the location changes
  useEffect(() => {
    setRoleFilter(getInitialRoleFilter());
    setSpecialFilter(location.state?.filter || 'All');
  }, [location.pathname, location.state]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/users/', { params: { scope: 'directory' } });
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employee directory:', err);
      showToast('Failed to load employee directory.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (['HR', 'MD', 'Manager', 'TeamLead'].includes(role)) {
      fetchEmployees();
    }
  }, [role]);

  if (!['HR', 'MD', 'Manager', 'TeamLead'].includes(role)) {
    return (
      <div style={{ color: 'var(--danger)', fontWeight: 700, padding: '30px', textAlign: 'center' }}>
        Access Denied: Only administrators, managers, and team leads can access the directory.
      </div>
    );
  }

  // Get departments present in directory for filter dropdown
  const departments = ['All', ...new Set(employees.map(e => e.department_display || e.department).filter(Boolean))];

  // Filtering Logic
  const filteredEmployees = employees.filter(emp => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (emp.name || '').toLowerCase().includes(term) ||
      (emp.username || '').toLowerCase().includes(term) ||
      (emp.emp_id || '').toLowerCase().includes(term) ||
      (emp.designation || '').toLowerCase().includes(term);

    const matchesRole = roleFilter === 'All' || emp.role === roleFilter;
    const matchesDept = deptFilter === 'All' || (emp.department_display || emp.department) === deptFilter;

    let matchesSpecial = true;
    if (specialFilter === 'NewJoiners') {
      if (!emp.date_of_joining) {
        matchesSpecial = false;
      } else {
        const joinDate = new Date(emp.date_of_joining);
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() - 30);
        matchesSpecial = joinDate >= limitDate;
      }
    } else if (specialFilter === 'DocsPending') {
      matchesSpecial = !!emp.document;
    }

    return matchesSearch && matchesRole && matchesDept && matchesSpecial;
  });

  const getAvatar = (name, bg, color) => (
    <div style={{
      width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
      background: bg || 'var(--accent-blue)', color: color || '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: '1.05rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      {name ? name.charAt(0).toUpperCase() : '?'}
    </div>
  );

  // Edit Handlers
  const handleStartEdit = () => {
    setEditForm({
      fullname: selectedEmp.name || '',
      email: selectedEmp.email || selectedEmp.username || '',
      phone: selectedEmp.phone || '',
      designation: selectedEmp.designation || '',
      department: selectedEmp.department || '',
      team_name: selectedEmp.team_name || '',
      role: selectedEmp.role || '',
      salary: selectedEmp.salary || '',
      date_of_joining: selectedEmp.date_of_joining || '',
      status: selectedEmp.status || 'Fresher',
      experience_years: selectedEmp.experience_years || '',
      address: selectedEmp.address || ''
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api/users/${selectedEmp.id}/`, editForm);
      showToast('Employee details updated successfully.', 'success');
      setSelectedEmp(res.data);
      setIsEditing(false);
      fetchEmployees();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update employee details.', 'error');
    }
  };

  const handleDeleteEmp = async (empId) => {
    if (window.confirm("Are you sure you want to permanently delete this employee? This action cannot be undone.")) {
      try {
        await api.delete(`/api/users/${empId}/`);
        showToast('Employee deleted successfully.', 'success');
        setSelectedEmp(null);
        setIsEditing(false);
        fetchEmployees();
      } catch (err) {
        showToast(err.response?.data?.detail || 'Failed to delete employee.', 'error');
      }
    }
  };

  return (
    <div className="directory-container">
      <style>{`
        .directory-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .dir-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        .dir-filters {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          box-shadow: var(--card-shadow);
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-start;
        }
        .filter-group label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .filter-group select, .filter-group input {
          padding: 8px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #0f172a;
          outline: none;
          background: #f8fafc;
          min-width: 160px;
          transition: border-color 0.15s;
        }
        .filter-group select:focus, .filter-group input:focus {
          border-color: #3b82f6;
          background: #ffffff;
        }
        .role-pill {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .role-pill.MD { background: #fee2e2; color: #991b1b; }
        .role-pill.HR { background: #fce7f3; color: #9d174d; }
        .role-pill.Manager { background: #e0f2fe; color: #0369a1; }
        .role-pill.TeamLead { background: #fef3c7; color: #92400e; }
        .role-pill.Employee { background: #d1fae5; color: #065f46; }

        .dir-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .dir-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--card-shadow);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }
        .dir-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }
        .dir-card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .dir-card-name {
          font-weight: 800;
          color: #0f172a;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dir-card-role {
          align-self: flex-start;
          margin-bottom: 4px;
        }
        .dir-card-sub {
          font-size: 0.78rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dir-card-sub i {
          color: #94a3b8;
          width: 14px;
        }
        .dir-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .dir-modal-grid {
            grid-template-columns: 1fr;
          }
        }
        .dir-modal-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .dir-modal-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
        }

        .dir-edit-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.85rem;
          color: #0f172a;
          outline: none;
          transition: all 0.2s;
        }
        .dir-edit-input:focus {
          border-color: #3b82f6;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>

      {/* Header */}
      <div className="dir-header">
        <h2 style={{ color: 'var(--primary-color)', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800 }}>
          Staff & Member Directory
        </h2>
        {['HR', 'MD'].includes(role) && (
          <button className="btn" style={{ margin: 0 }} onClick={() => navigate('/register')}>
            <i className="fa-solid fa-user-plus"></i> Add New Staff Member
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="dir-filters">
        <div className="filter-group" style={{ flex: 1, minWidth: '220px' }}>
          <label>Search Directory</label>
          <input 
            type="text" 
            placeholder="🔍 Search name, email, designation..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            style={{ width: '100%' }}
          />
        </div>
        <div className="filter-group">
          <label>Filter by Role</label>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="Employee">Employees / Devs</option>
            <option value="TeamLead">Team Leads</option>
            <option value="Manager">Managers</option>
            <option value="HR">HR Specialist</option>
            <option value="MD">Managing Director</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Department</label>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            {departments.map((dept, i) => (
              <option key={i} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
            ))}
          </select>
        </div>
        {specialFilter !== 'All' && (
          <div className="filter-group">
            <label>Dashboard Filter</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '38px' }}>
              <span className="badge-capsule info" style={{ padding: '8px 12px', fontWeight: 700 }}>
                {specialFilter === 'NewJoiners' ? '🆕 New Joiners' : '📑 Pending Docs'}
              </span>
              <button 
                className="view-btn" 
                style={{ padding: '4px 8px', fontSize: '11px' }}
                onClick={() => {
                  setSpecialFilter('All');
                  navigate(location.pathname, { replace: true, state: {} });
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Directory Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px', color: 'var(--muted)' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading Staff Directory...
        </div>
      ) : filteredEmployees.length > 0 ? (
        <div className="dir-grid">
          {filteredEmployees.map(emp => (
            <div key={emp.id} className="dir-card" onClick={() => { setSelectedEmp(emp); setIsEditing(false); }}>
              {emp.profile_pic ? (
                <img 
                  src={emp.profile_pic} 
                  alt={emp.name} 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                getAvatar(emp.name, emp.role === 'MD' ? '#fecaca' : emp.role === 'HR' ? '#fce7f3' : emp.role === 'Manager' ? '#e0f2fe' : '#d1fae5', emp.role === 'MD' ? '#991b1b' : emp.role === 'HR' ? '#9d174d' : emp.role === 'Manager' ? '#0369a1' : '#065f46')
              )}

              <div className="dir-card-info">
                <span className={`role-pill ${emp.role} dir-card-role`}>
                  {emp.role === 'TeamLead' ? 'Team Lead' : emp.role}
                </span>
                <div className="dir-card-name">{emp.name}</div>
                <div className="dir-card-sub">
                  <i className="fa-solid fa-id-badge"></i>
                  <span>{emp.emp_id || 'No ID'}</span>
                </div>
                <div className="dir-card-sub">
                  <i className="fa-solid fa-briefcase"></i>
                  <span>{emp.designation || emp.department_display || 'Staff member'}</span>
                </div>
                <div className="dir-card-sub">
                  <i className="fa-solid fa-envelope"></i>
                  <span>{emp.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '50px 20px', textAlign: 'center', color: '#94a3b8' }}>
          <i className="fa-solid fa-users-slash" style={{ fontSize: '2.5rem', marginBottom: '12px', display: 'block', color: '#cbd5e1' }}></i>
          No staff members match the selected filters.
        </div>
      )}

      {/* DETAIL & EDIT MODAL */}
      {selectedEmp && (
        <div className="modal-overlay" onClick={() => { setSelectedEmp(null); setIsEditing(false); }}>
          <div className="modal-container" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditing ? 'Edit Staff Profile' : 'Staff Member Details'}</h3>
              <button className="modal-close" onClick={() => { setSelectedEmp(null); setIsEditing(false); }}>×</button>
            </div>
            
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Header Meta */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                  {selectedEmp.profile_pic ? (
                    <img 
                      src={selectedEmp.profile_pic} 
                      alt={selectedEmp.name} 
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    getAvatar(selectedEmp.name, null, null)
                  )}
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>FULL NAME</label>
                        <input 
                          type="text" 
                          className="dir-edit-input" 
                          value={editForm.fullname} 
                          onChange={e => setEditForm({...editForm, fullname: e.target.value})} 
                          required
                        />
                      </div>
                    ) : (
                      <>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 800 }}>{selectedEmp.name}</h4>
                        <span className={`role-pill ${selectedEmp.role}`}>
                          {selectedEmp.role === 'TeamLead' ? 'Team Lead' : selectedEmp.role}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Form fields / view fields */}
                <div className="dir-modal-grid">
                  
                  {/* ID */}
                  <div>
                    <div className="dir-modal-label">Employee ID</div>
                    <div className="dir-modal-value">{selectedEmp.emp_id || 'N/A'}</div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="dir-modal-label">Email Address</div>
                    {isEditing ? (
                      <input 
                        type="email" 
                        className="dir-edit-input" 
                        value={editForm.email} 
                        onChange={e => setEditForm({...editForm, email: e.target.value})} 
                        required
                      />
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.email || 'N/A'}</div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="dir-modal-label">Phone Number</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="dir-edit-input" 
                        value={editForm.phone} 
                        onChange={e => setEditForm({...editForm, phone: e.target.value})} 
                      />
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.phone || 'N/A'}</div>
                    )}
                  </div>

                  {/* Designation */}
                  <div>
                    <div className="dir-modal-label">Designation</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="dir-edit-input" 
                        value={editForm.designation} 
                        onChange={e => setEditForm({...editForm, designation: e.target.value})} 
                      />
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.designation || 'N/A'}</div>
                    )}
                  </div>

                  {/* Department */}
                  <div>
                    <div className="dir-modal-label">Department Code</div>
                    {isEditing ? (
                      <select 
                        className="dir-edit-input" 
                        value={editForm.department} 
                        onChange={e => setEditForm({...editForm, department: e.target.value})}
                      >
                        <option value="">No Department</option>
                        <option value="technology">Technology Development</option>
                        <option value="ui_ux">UI/UX Creative Design</option>
                        <option value="digital_marketing">Digital Marketing</option>
                        <option value="sales">Sales & Accounts Strategy</option>
                        <option value="hr">HR Administration</option>
                      </select>
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.department_display || selectedEmp.department || 'N/A'}</div>
                    )}
                  </div>

                  {/* Team Scope */}
                  <div>
                    <div className="dir-modal-label">Team Scope</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="dir-edit-input" 
                        value={editForm.team_name} 
                        onChange={e => setEditForm({...editForm, team_name: e.target.value})} 
                      />
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.team_name || 'N/A'}</div>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <div className="dir-modal-label">Account Role</div>
                    {isEditing ? (
                      <select 
                        className="dir-edit-input" 
                        value={editForm.role} 
                        onChange={e => setEditForm({...editForm, role: e.target.value})}
                      >
                        <option value="Employee">Employee / Developer</option>
                        <option value="TeamLead">Team Lead</option>
                        <option value="Manager">Manager</option>
                        <option value="HR">HR Specialist</option>
                        <option value="MD">Managing Director</option>
                      </select>
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.role || 'N/A'}</div>
                    )}
                  </div>

                  {/* Date of Joining */}
                  <div>
                    <div className="dir-modal-label">Date of Joining</div>
                    {isEditing ? (
                      <input 
                        type="date" 
                        className="dir-edit-input" 
                        value={editForm.date_of_joining} 
                        onChange={e => setEditForm({...editForm, date_of_joining: e.target.value})} 
                      />
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.date_of_joining || 'N/A'}</div>
                    )}
                  </div>

                  {/* Employment Status */}
                  <div>
                    <div className="dir-modal-label">Employment Status</div>
                    {isEditing ? (
                      <select 
                        className="dir-edit-input" 
                        value={editForm.status} 
                        onChange={e => setEditForm({...editForm, status: e.target.value})}
                      >
                        <option value="Fresher">Fresher</option>
                        <option value="Experienced">Experienced</option>
                        <option value="Intern">Intern</option>
                      </select>
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.status || 'N/A'}</div>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="dir-modal-label">Experience (Years)</div>
                    {isEditing ? (
                      <input 
                        type="number" 
                        className="dir-edit-input" 
                        value={editForm.experience_years} 
                        onChange={e => setEditForm({...editForm, experience_years: e.target.value})} 
                      />
                    ) : (
                      <div className="dir-modal-value">{selectedEmp.experience_years ? `${selectedEmp.experience_years} Years` : 'N/A'}</div>
                    )}
                  </div>

                  {/* Salary */}
                  {['HR', 'MD'].includes(role) && (
                    <div>
                      <div className="dir-modal-label">Salary (Monthly Gross)</div>
                      {isEditing ? (
                        <input 
                          type="number" 
                          className="dir-edit-input" 
                          value={editForm.salary} 
                          onChange={e => setEditForm({...editForm, salary: e.target.value})} 
                        />
                      ) : (
                        <div className="dir-modal-value">₹{selectedEmp.salary || 'N/A'}</div>
                      )}
                    </div>
                  )}

                  {/* Reporting Manager */}
                  <div>
                    <div className="dir-modal-label">Reporting Manager</div>
                    <div className="dir-modal-value">{selectedEmp.reporting_manager_name || 'N/A'}</div>
                  </div>
                </div>

                {/* Address */}
                <div style={{ textAlign: 'left' }}>
                  <div className="dir-modal-label">Home Address</div>
                  {isEditing ? (
                    <textarea 
                      rows="2" 
                      className="dir-edit-input" 
                      value={editForm.address} 
                      onChange={e => setEditForm({...editForm, address: e.target.value})} 
                    />
                  ) : (
                    <div className="dir-modal-value" style={{ fontWeight: 400 }}>{selectedEmp.address || 'N/A'}</div>
                  )}
                </div>

                {/* Document verification button */}
                {!isEditing && ['HR', 'MD'].includes(role) && selectedEmp.role === 'Employee' && (
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Verification Document Status:</span>
                    <button type="button" className="btn approve" onClick={() => handleVerifyDoc(selectedEmp.id)} style={{ margin: 0, padding: '8px 16px' }}>
                      <i className="fa-solid fa-file-circle-check"></i> Verify Documents
                    </button>
                  </div>
                )}

                {/* Edit & Delete Action Row */}
                {['HR', 'MD'].includes(role) && (
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    {isEditing ? (
                      <>
                        <button type="button" className="btn" style={{ background: '#64748b', marginTop: 0 }} onClick={() => setIsEditing(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn" style={{ marginTop: 0 }}>
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <>
                        {selectedEmp.id !== user.id && (
                          <button 
                            type="button" 
                            className="btn" 
                            style={{ background: '#ef4444', marginTop: 0 }} 
                            onClick={() => handleDeleteEmp(selectedEmp.id)}
                          >
                            <i className="fa-solid fa-trash-can"></i> Delete Member
                          </button>
                        )}
                        <button type="button" className="btn" style={{ marginTop: 0 }} onClick={handleStartEdit}>
                          <i className="fa-solid fa-user-pen"></i> Edit Profile
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
