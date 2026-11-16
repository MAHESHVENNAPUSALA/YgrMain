import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import './Employees.css';

const DEPARTMENT_CHOICES = [
  { value: 'python_dev', label: 'Python Developer' },
  { value: 'java_dev', label: 'Java Developer' },
  { value: 'frontend_dev', label: 'Front-End Developer' },
  { value: 'backend_dev', label: 'Back-End Developer' },
  { value: 'fullstack_dev', label: 'Full Stack Developer' },
  { value: 'testing', label: 'Testing / QA' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'data_analyst', label: 'Data Analyst' },
  { value: 'data_scientist', label: 'Data Scientist' },
  { value: 'ai_ml', label: 'AI / ML Engineer' },
  { value: 'cyber_security', label: 'Cyber Security' },
  { value: 'cloud_engineer', label: 'Cloud Engineer' },
  { value: 'digital_marketing', label: 'Digital Marketing' },
  { value: 'ui_ux', label: 'UI / UX Designer' },
  { value: 'mobile_dev', label: 'Mobile App Developer' },
];

const ROLE_CHOICES = [
  { value: 'Employee', label: 'Employee' },
  { value: 'TeamLead', label: 'Team Lead' },
  { value: 'Manager', label: 'Manager' },
  { value: 'HR', label: 'HR' },
];

const Employees = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = user?.role;
  const isHrOrMd = ['HR', 'MD'].includes(userRole);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search, Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const initialForm = {
    fullname: '',
    email: '',
    phone: '',
    emp_id: '',
    role: 'Employee',
    department: '',
    designation: '',
    reporting_manager: '',
    date_of_joining: new Date().toISOString().split('T')[0],
    date_of_birth: '',
    gender: 'Male',
    status: 'Fresher',
    salary: '',
    address: '',
    is_active: true,
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // HR/MD can request status=all to include inactive records
      const params = { scope: 'directory' };
      if (isHrOrMd) {
        params.status = 'all';
      }
      const res = await api.get('/api/users/', { params });
      setEmployees(res.data || []);
    } catch (err) {
      console.error('Error fetching employee directory:', err);
      showToast('Failed to load employee records.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (['HR', 'MD', 'Manager', 'TeamLead'].includes(userRole)) {
      fetchEmployees();
    }
  }, [userRole]);

  // List of potential managers for dropdown
  const managerOptions = useMemo(() => {
    return employees.filter(e => ['Manager', 'TeamLead', 'MD', 'HR'].includes(e.role) && e.is_active);
  }, [employees]);

  // Filter and search computation
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        (emp.first_name || '').toLowerCase().includes(term) ||
        (emp.last_name || '').toLowerCase().includes(term) ||
        (emp.username || '').toLowerCase().includes(term) ||
        (emp.email || '').toLowerCase().includes(term) ||
        (emp.emp_id || '').toLowerCase().includes(term) ||
        (emp.designation || '').toLowerCase().includes(term);

      const matchesRole = roleFilter === 'All' || emp.role === roleFilter;
      const matchesDept = deptFilter === 'All' || emp.department === deptFilter || emp.department_display === deptFilter;
      
      let matchesStatus = true;
      if (statusFilter === 'active') matchesStatus = emp.is_active === true;
      if (statusFilter === 'inactive') matchesStatus = emp.is_active === false;

      return matchesSearch && matchesRole && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, roleFilter, deptFilter, statusFilter]);

  // Metrics computation
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.is_active).length;
    const inactive = total - active;
    const depts = new Set(employees.map(e => e.department).filter(Boolean)).size;
    return { total, active, inactive, depts };
  }, [employees]);

  // Pagination slice
  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  // Add Employee Form Handler
  const handleOpenAdd = () => {
    setFormData(initialForm);
    setShowAddModal(true);
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.fullname) {
      showToast('Name and email are required.', 'warning');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/api/users/', formData);
      showToast('Employee successfully onboarded!', 'success');
      setShowAddModal(false);
      fetchEmployees();
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to create employee record.';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Employee Form Handler
  const handleOpenEdit = (emp) => {
    setSelectedEmp(emp);
    const fullName = `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || emp.username;
    setFormData({
      fullname: fullName,
      email: emp.email || emp.username || '',
      phone: emp.phone || '',
      emp_id: emp.emp_id || '',
      role: emp.role || 'Employee',
      department: emp.department || '',
      designation: emp.designation || '',
      reporting_manager: emp.reporting_manager || '',
      date_of_joining: emp.date_of_joining || '',
      date_of_birth: emp.date_of_birth || '',
      gender: emp.gender || 'Male',
      status: emp.status || 'Fresher',
      salary: emp.salary || '',
      address: emp.address || '',
      is_active: emp.is_active ?? true,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!selectedEmp) return;
    setSubmitting(true);
    try {
      await api.put(`/api/users/${selectedEmp.id}/`, formData);
      showToast('Employee details updated successfully.', 'success');
      setShowEditModal(false);
      fetchEmployees();
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to update employee details.';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Activation
  const handleToggleActive = async (emp) => {
    const nextState = !emp.is_active;
    const actionText = nextState ? 'activate' : 'deactivate';
    if (!window.confirm(`Are you sure you want to ${actionText} employee ${emp.first_name || emp.username} (${emp.emp_id || 'ID N/A'})?`)) {
      return;
    }
    try {
      await api.put(`/api/users/${emp.id}/`, { is_active: nextState });
      showToast(`Employee ${actionText}d successfully.`, 'success');
      fetchEmployees();
    } catch (err) {
      showToast(err.response?.data?.detail || `Failed to ${actionText} employee.`, 'error');
    }
  };

  // View Profile Handler
  const handleOpenProfile = (emp) => {
    setSelectedEmp(emp);
    setShowProfileModal(true);
  };

  if (!['HR', 'MD', 'Manager', 'TeamLead'].includes(userRole)) {
    return (
      <div className="emp-mgmt-container">
        <div className="emp-empty-state">
          <i className="fa-solid fa-lock"></i>
          <h3>Access Restricted</h3>
          <p>Only HR, MD, Managers, and Team Leads can view the employee directory.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="emp-mgmt-container">
      {/* Header */}
      <div className="emp-mgmt-header">
        <div className="emp-mgmt-title-group">
          <h1>Employee Management</h1>
          <p className="emp-mgmt-subtitle">
            Manage company personnel records, designations, departments, reporting structures, and employment status.
          </p>
        </div>
        {isHrOrMd && (
          <div className="emp-mgmt-actions">
            <button type="button" className="btn-primary-corp" onClick={handleOpenAdd}>
              <i className="fa-solid fa-user-plus"></i> Add New Employee
            </button>
          </div>
        )}
      </div>

      {/* Overview Metric Cards */}
      <div className="emp-stats-grid">
        <div className="emp-stat-card">
          <div className="emp-stat-info">
            <span>Total Staff</span>
            <h3>{stats.total}</h3>
          </div>
          <div className="emp-stat-icon icon-blue">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>
        <div className="emp-stat-card">
          <div className="emp-stat-info">
            <span>Active Members</span>
            <h3>{stats.active}</h3>
          </div>
          <div className="emp-stat-icon icon-emerald">
            <i className="fa-solid fa-user-check"></i>
          </div>
        </div>
        <div className="emp-stat-card">
          <div className="emp-stat-info">
            <span>Deactivated</span>
            <h3>{stats.inactive}</h3>
          </div>
          <div className="emp-stat-icon icon-rose">
            <i className="fa-solid fa-user-xmark"></i>
          </div>
        </div>
        <div className="emp-stat-card">
          <div className="emp-stat-info">
            <span>Departments</span>
            <h3>{stats.depts}</h3>
          </div>
          <div className="emp-stat-icon icon-amber">
            <i className="fa-solid fa-sitemap"></i>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="emp-filters-card">
        <div className="search-box-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, emp ID, email, designation..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <select
          className="filter-select"
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="All">All Roles</option>
          {ROLE_CHOICES.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={deptFilter}
          onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="All">All Departments</option>
          {DEPARTMENT_CHOICES.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>

        {isHrOrMd && (
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        )}
      </div>

      {/* Employee Data Table */}
      <div className="emp-table-card">
        <div className="emp-table-wrapper">
          <table className="emp-corporate-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Role & Department</th>
                <th>Designation</th>
                <th>Manager</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="emp-loading-state">
                    <div className="emp-spinner"></div>
                    <div>Loading employee directory...</div>
                  </td>
                </tr>
              ) : paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="emp-empty-state">
                    <i className="fa-solid fa-folder-open"></i>
                    <div>No employee records match the selected criteria.</div>
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((emp) => {
                  const displayName = `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || emp.username;
                  const initial = (displayName.charAt(0) || 'E').toUpperCase();
                  return (
                    <tr key={emp.id}>
                      <td>
                        <div className="emp-cell-user">
                          <div className="emp-avatar-circle">{initial}</div>
                          <div className="emp-user-meta">
                            <span className="emp-name-text">{displayName}</span>
                            <span className="emp-email-text">{emp.email || emp.username}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="emp-id-badge">{emp.emp_id || '—'}</span>
                      </td>
                      <td>
                        <div>
                          <span className="role-pill">{emp.role}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                          {emp.department_display || emp.department || 'General'}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{emp.designation || 'Not Assigned'}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: emp.reporting_manager_name ? '#1e293b' : '#94a3b8' }}>
                          {emp.reporting_manager_name || 'None'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill ${emp.is_active ? 'status-active' : 'status-inactive'}`}>
                          <i className={`fa-solid ${emp.is_active ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
                          {emp.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-group">
                          <button
                            type="button"
                            className="btn-icon-action"
                            title="View Employee Profile"
                            onClick={() => handleOpenProfile(emp)}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          {isHrOrMd && (
                            <>
                              <button
                                type="button"
                                className="btn-icon-action btn-edit"
                                title="Edit Employee Details"
                                onClick={() => handleOpenEdit(emp)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                type="button"
                                className={`btn-icon-action ${emp.is_active ? 'btn-toggle-deactive' : 'btn-toggle-activate'}`}
                                title={emp.is_active ? 'Deactivate Employee' : 'Activate Employee'}
                                onClick={() => handleToggleActive(emp)}
                              >
                                <i className={`fa-solid ${emp.is_active ? 'fa-user-slash' : 'fa-user-check'}`}></i>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {!loading && filteredEmployees.length > 0 && (
          <div className="emp-pagination-bar">
            <span className="pagination-info">
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, filteredEmployees.length)} of {filteredEmployees.length} records
            </span>
            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  className={`pagination-btn ${currentPage === page ? 'pagination-page-active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="corp-modal-overlay" onClick={() => !submitting && setShowAddModal(false)}>
          <div className="corp-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="corp-modal-header">
              <h2><i className="fa-solid fa-user-plus"></i> Onboard New Employee</h2>
              <button type="button" className="corp-modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveAdd}>
              <div className="corp-modal-body">
                <div className="corp-form-grid">
                  <div className="corp-form-group">
                    <label className="corp-form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="corp-form-input"
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john.doe@ygr.com"
                      className="corp-form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Employee ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="Auto-generated if left blank"
                      className="corp-form-input"
                      value={formData.emp_id}
                      onChange={(e) => setFormData({ ...formData, emp_id: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      className="corp-form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Role *</label>
                    <select
                      className="corp-form-select"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      {ROLE_CHOICES.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Department *</label>
                    <select
                      className="corp-form-select"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENT_CHOICES.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Software Engineer"
                      className="corp-form-input"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Reporting Manager</label>
                    <select
                      className="corp-form-select"
                      value={formData.reporting_manager}
                      onChange={(e) => setFormData({ ...formData, reporting_manager: e.target.value })}
                    >
                      <option value="">None / Direct to MD</option>
                      {managerOptions.map(m => (
                        <option key={m.id} value={m.id}>
                          {m.first_name || m.username} ({m.emp_id || 'ID N/A'}) — {m.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Date of Joining</label>
                    <input
                      type="date"
                      className="corp-form-input"
                      value={formData.date_of_joining}
                      onChange={(e) => setFormData({ ...formData, date_of_joining: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Initial Monthly Gross Salary (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 50000"
                      className="corp-form-input"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group full-width">
                    <label className="corp-form-label">Permanent / Residential Address</label>
                    <textarea
                      className="corp-form-textarea"
                      placeholder="Full street address..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="corp-modal-footer">
                <button type="button" className="btn-secondary-corp" onClick={() => setShowAddModal(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-corp" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Onboard Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmp && (
        <div className="corp-modal-overlay" onClick={() => !submitting && setShowEditModal(false)}>
          <div className="corp-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="corp-modal-header">
              <h2><i className="fa-solid fa-user-pen"></i> Edit Employee Details</h2>
              <button type="button" className="corp-modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="corp-modal-body">
                <div className="corp-form-grid">
                  <div className="corp-form-group">
                    <label className="corp-form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="corp-form-input"
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      className="corp-form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Employee ID</label>
                    <input
                      type="text"
                      className="corp-form-input"
                      value={formData.emp_id}
                      onChange={(e) => setFormData({ ...formData, emp_id: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Contact Phone</label>
                    <input
                      type="tel"
                      className="corp-form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Role</label>
                    <select
                      className="corp-form-select"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      {ROLE_CHOICES.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Department</label>
                    <select
                      className="corp-form-select"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENT_CHOICES.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Designation</label>
                    <input
                      type="text"
                      className="corp-form-input"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Reporting Manager</label>
                    <select
                      className="corp-form-select"
                      value={formData.reporting_manager}
                      onChange={(e) => setFormData({ ...formData, reporting_manager: e.target.value })}
                    >
                      <option value="">None / Direct to MD</option>
                      {managerOptions.filter(m => m.id !== selectedEmp.id).map(m => (
                        <option key={m.id} value={m.id}>
                          {m.first_name || m.username} ({m.emp_id || 'ID N/A'}) — {m.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Employment Status</label>
                    <select
                      className="corp-form-select"
                      value={formData.is_active ? 'Active' : 'Inactive'}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'Active' })}
                    >
                      <option value="Active">Active Employee</option>
                      <option value="Inactive">Deactivated</option>
                    </select>
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Date of Joining</label>
                    <input
                      type="date"
                      className="corp-form-input"
                      value={formData.date_of_joining}
                      onChange={(e) => setFormData({ ...formData, date_of_joining: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group">
                    <label className="corp-form-label">Monthly Gross Salary (₹)</label>
                    <input
                      type="number"
                      className="corp-form-input"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                  </div>

                  <div className="corp-form-group full-width">
                    <label className="corp-form-label">Residential Address</label>
                    <textarea
                      className="corp-form-textarea"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="corp-modal-footer">
                <button type="button" className="btn-secondary-corp" onClick={() => setShowEditModal(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-corp" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Profile View Modal */}
      {showProfileModal && selectedEmp && (
        <div className="corp-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="corp-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="corp-modal-header">
              <h2><i className="fa-solid fa-id-card"></i> Employee Profile</h2>
              <button type="button" className="corp-modal-close" onClick={() => setShowProfileModal(false)}>✕</button>
            </div>
            <div className="corp-modal-body">
              <div className="profile-overview-header">
                <div className="profile-avatar-large">
                  {(selectedEmp.first_name?.charAt(0) || selectedEmp.username?.charAt(0) || 'E').toUpperCase()}
                </div>
                <div className="profile-title-text">
                  <h3>{selectedEmp.first_name ? `${selectedEmp.first_name} ${selectedEmp.last_name || ''}` : selectedEmp.username}</h3>
                  <p>{selectedEmp.designation || 'Staff Member'} • {selectedEmp.department_display || selectedEmp.department || 'General'}</p>
                  <div style={{ marginTop: '6px' }}>
                    <span className={`status-pill ${selectedEmp.is_active ? 'status-active' : 'status-inactive'}`}>
                      {selectedEmp.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-details-grid">
                <div className="profile-field-item">
                  <span className="profile-field-label">Employee ID</span>
                  <span className="profile-field-value">{selectedEmp.emp_id || 'Not Assigned'}</span>
                </div>

                <div className="profile-field-item">
                  <span className="profile-field-label">System Role</span>
                  <span className="profile-field-value">{selectedEmp.role}</span>
                </div>

                <div className="profile-field-item">
                  <span className="profile-field-label">Email Address</span>
                  <span className="profile-field-value">{selectedEmp.email || selectedEmp.username}</span>
                </div>

                <div className="profile-field-item">
                  <span className="profile-field-label">Contact Phone</span>
                  <span className="profile-field-value">{selectedEmp.phone || 'Not Provided'}</span>
                </div>

                <div className="profile-field-item">
                  <span className="profile-field-label">Reporting Manager</span>
                  <span className="profile-field-value">{selectedEmp.reporting_manager_name || 'Direct / None'}</span>
                </div>

                <div className="profile-field-item">
                  <span className="profile-field-label">Date of Joining</span>
                  <span className="profile-field-value">{selectedEmp.date_of_joining || 'Not Recorded'}</span>
                </div>

                <div className="profile-field-item">
                  <span className="profile-field-label">Monthly Gross Salary</span>
                  <span className="profile-field-value">
                    {selectedEmp.salary ? `₹${Number(selectedEmp.salary).toLocaleString('en-IN')}` : 'Not Specified'}
                  </span>
                </div>

                <div className="profile-field-item">
                  <span className="profile-field-label">Gender / DOB</span>
                  <span className="profile-field-value">{selectedEmp.gender || '—'} {selectedEmp.date_of_birth ? `(${selectedEmp.date_of_birth})` : ''}</span>
                </div>

                <div className="profile-field-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="profile-field-label">Residential Address</span>
                  <span className="profile-field-value">{selectedEmp.address || 'No residential address on file.'}</span>
                </div>
              </div>
            </div>
            <div className="corp-modal-footer">
              <button type="button" className="btn-secondary-corp" onClick={() => setShowProfileModal(false)}>
                Close
              </button>
              {isHrOrMd && (
                <button
                  type="button"
                  className="btn-primary-corp"
                  onClick={() => {
                    setShowProfileModal(false);
                    handleOpenEdit(selectedEmp);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
