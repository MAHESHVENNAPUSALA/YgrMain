import React, { useState, useEffect } from 'react';
import { useToast } from '../../shared/context/ToastContext';

const FALLBACK_TEAM = [
  { id: 1, name: 'Mahesh Vennapusala', role: 'Managing Director & Founder', department: 'Executive', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', status: 'Active' },
  { id: 2, name: 'Priya Sharma', role: 'Chief Technology Officer', department: 'Engineering', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', status: 'Active' },
  { id: 3, name: 'Rahul Verma', role: 'Lead Cloud Architect', department: 'DevOps', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', status: 'Active' }
];

const TeamDashboard = () => {
  const [teamList, setTeamList] = useState(FALLBACK_TEAM);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetch('/api/public/team/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeamList(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      setTeamList((prev) => prev.filter((item) => item.id !== deleteId));
      if (showToast) showToast('Team member deleted successfully', 'success');
      setDeleteId(null);
    }
  };

  const filteredTeam = teamList.filter((t) => {
    const name = t.name || t.full_name || '';
    const role = t.role || t.designation || '';
    return name.toLowerCase().includes(search.toLowerCase()) || role.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">Team Members Management</h2>
          <p className="text-muted small mb-0">Manage leadership team, executive profiles, engineering leads, and bios.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => showToast && showToast('Create team member form opened', 'info')}>
          <i className="fas fa-user-plus me-2"></i> Add Team Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-search text-muted"></i></span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search team members by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-dark fw-bold">
              <tr>
                <th style={{ width: '70px' }}>Photo</th>
                <th>Member Name</th>
                <th>Designation / Role</th>
                <th>Department</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">No team members found.</td>
                </tr>
              ) : (
                filteredTeam.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image || item.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'}
                        alt={item.name}
                        className="rounded-circle"
                        style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                      />
                    </td>
                    <td className="fw-bold text-dark">{item.name || item.full_name}</td>
                    <td className="small text-muted">{item.role || item.designation}</td>
                    <td><span className="badge bg-info-subtle text-info border border-info-subtle px-3 py-1 rounded-pill">{item.department || 'Engineering'}</span></td>
                    <td><span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill">{item.status || 'Active'}</span></td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2 rounded-pill px-3" onClick={() => showToast && showToast(`Edit member #${item.id}`, 'info')}>
                        <i className="fas fa-edit me-1"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => setDeleteId(item.id)}>
                        <i className="fas fa-trash-alt me-1"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-danger"><i className="fas fa-exclamation-triangle me-2"></i>Delete Team Member?</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteId(null)}></button>
              </div>
              <div className="modal-body text-secondary">
                This action cannot be undone. Are you sure you want to permanently remove this team member profile?
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setDeleteId(null)}>Cancel</button>
                <button type="button" className="btn btn-danger rounded-pill px-4" onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;
