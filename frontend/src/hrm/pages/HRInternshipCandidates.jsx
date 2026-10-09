import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const HRInternshipCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      // using the DRF endpoint we created
      const res = await api.get('/api/portal/admin/internships/candidates/');
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.post(`/api/portal/admin/internships/candidates/${id}/update_status/`, { status: newStatus });
      fetchCandidates(); // refresh
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom py-3">
          <h4 className="mb-0 text-primary"><i className="fa-solid fa-user-graduate me-2"></i> Internship Candidates</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c) => (
                    <tr key={c.id}>
                      <td>{c.registration_id}</td>
                      <td className="fw-bold">{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.course}</td>
                      <td>
                        <span className={`badge ${c.status === 'Registered' ? 'bg-secondary' : 'bg-success'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            Update Status
                          </button>
                          <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => updateStatus(c.id, 'Exam Scheduled')}>Schedule Exam</button></li>
                            <li><button className="dropdown-item" onClick={() => updateStatus(c.id, 'Interview Scheduled')}>Schedule Interview</button></li>
                            <li><button className="dropdown-item text-success" onClick={() => updateStatus(c.id, 'Selected')}>Selected</button></li>
                            <li><button className="dropdown-item text-danger" onClick={() => updateStatus(c.id, 'Rejected')}>Rejected</button></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {candidates.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">No candidates found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRInternshipCandidates;
