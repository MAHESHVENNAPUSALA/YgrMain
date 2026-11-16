import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const HRInternshipCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal State
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Scheduling Modal State
  const [schedulingCandidate, setSchedulingCandidate] = useState(null);
  const [scheduleData, setScheduleData] = useState({
     date: '',
     reporting_time: '09:30',
     interview_time: '10:00',
     mode: 'Offline',
     venue_name: 'YGR Global HQ',
     office_address: 'Madhapur, Hyderabad',
     interviewer: ''
  });
  
  // Evaluation Modal State
  const [evaluationCandidate, setEvaluationCandidate] = useState(null);
  const [evalData, setEvalData] = useState({
     communication: 0,
     technical: 0,
     problem_solving: 0,
     project_understanding: 0,
     learning_ability: 0,
     feedback: '',
     recommendation: 'Selected'
  });
  
  // Offer Modal State
  const [offerCandidate, setOfferCandidate] = useState(null);
  const [offerData, setOfferData] = useState({
     start_date: '',
     duration: '3 Months',
     work_mode: 'Remote',
     mentor_name: '',
     stipend_terms: 'Unpaid Internship',
     acceptance_deadline: ''
  });
  
  // Email Logs State
  const [emailLogsCandidate, setEmailLogsCandidate] = useState(null);
  const [emailLogs, setEmailLogs] = useState([]);

  // AI Proctoring Audit State
  const [proctoringCandidate, setProctoringCandidate] = useState(null);
  const [proctoringReport, setProctoringReport] = useState(null);
  const [loadingProctoring, setLoadingProctoring] = useState(false);

  const fetchProctoringReport = async (candidate) => {
    setProctoringCandidate(candidate);
    setLoadingProctoring(true);
    setProctoringReport(null);
    try {
      const response = await api.get(`/api/portal/admin/internships/candidates/${candidate.id}/proctoring_report/`);
      setProctoringReport(response.data);
    } catch (err) {
      alert(err.response?.data?.error || 'No proctoring session found for this candidate.');
      setProctoringCandidate(null);
    } finally {
      setLoadingProctoring(false);
    }
  };

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

  const sendExamLink = async (id) => {
    if (!window.confirm("Are you sure you want to send the Exam Link to this candidate?")) return;
    try {
      const response = await api.post(`/api/portal/admin/internships/candidates/${id}/send_exam_link/`);
      if (response.data?.email_sent === false) {
        alert("Exam link generated, but the invitation email could not be sent. Please check email logs.");
      } else {
        alert("Exam link sent successfully!");
      }
      fetchCandidates();
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.response?.data?.detail || 'Failed to send exam link';
      alert(`Failed to send exam link: ${errorMsg}`);
    }
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.registration_id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return 'bg-info text-dark';
      case 'Exam Scheduled': return 'bg-warning text-dark';
      case 'Exam Completed': return 'bg-info text-white';
      case 'Qualified': return 'bg-success';
      case 'Not Qualified': return 'bg-danger';
      case 'Interview 1 Scheduled': return 'bg-primary';
      case 'Selected': return 'bg-success';
      case 'Not Selected': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid mt-4 px-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-header bg-white border-bottom p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h4 className="mb-0 text-primary fw-bold"><i className="fa-solid fa-users-gear me-2"></i> Internship Candidates</h4>
          <div className="d-flex gap-2">
            <input 
              type="text" 
              className="form-control form-control-sm border-secondary" 
              placeholder="Search ID, Name, Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '200px' }}
            />
            <select 
              className="form-select form-select-sm border-secondary" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Exam Scheduled">Exam Scheduled</option>
              <option value="Exam Completed">Exam Completed</option>
              <option value="Qualified">Qualified</option>
              <option value="Not Qualified">Not Qualified</option>
              <option value="Interview 1 Scheduled">Interview 1 Scheduled</option>
              <option value="Selected">Selected</option>
              <option value="Not Selected">Not Selected</option>
            </select>
          </div>
        </div>
        <div className="card-body p-0">
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
                    <th>Score</th>
                    <th>Proctoring</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((c) => (
                    <tr key={c.id}>
                      <td className="text-muted fw-medium">{c.registration_id}</td>
                      <td>
                        <button className="btn btn-link p-0 fw-bold text-decoration-none text-dark" onClick={() => setSelectedCandidate(c)}>
                          {c.name}
                        </button>
                      </td>
                      <td className="text-muted">{c.email}</td>
                      <td>{c.course}</td>
                      <td>
                        <span className={`badge ${getStatusBadge(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        {c.latest_exam_score !== null && c.latest_exam_score !== undefined ? (
                          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary fs-6 px-3 py-1 fw-bold">
                            {c.latest_exam_score} Marks
                          </span>
                        ) : (
                          <span className="text-muted small fst-italic">Not Taken</span>
                        )}
                      </td>
                      <td>
                        {c.exam_proctoring_status ? (
                          c.exam_proctoring_status.status === 'Disqualified' ? (
                            <span className="badge bg-danger d-inline-flex align-items-center gap-1" title={c.exam_proctoring_status.submission_reason}>
                              <i className="fa-solid fa-ban"></i> Disqualified ({c.exam_proctoring_status.warning_count}/3)
                            </span>
                          ) : c.exam_proctoring_status.status === 'Warnings Issued' ? (
                            <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
                              <i className="fa-solid fa-triangle-exclamation"></i> {c.exam_proctoring_status.warning_count} Warning(s)
                            </span>
                          ) : (
                            <span className="badge bg-success d-inline-flex align-items-center gap-1">
                              <i className="fa-solid fa-shield-halved"></i> Clean
                            </span>
                          )
                        ) : (
                          <span className="text-muted small">-</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-1 flex-wrap">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelectedCandidate(c)} title="View Profile">
                             <i className="fas fa-eye"></i>
                          </button>
                          {c.exam_proctoring_status && (
                            <button className="btn btn-sm btn-outline-info" onClick={() => fetchProctoringReport(c)} title="View AI Proctoring Report">
                              <i className="fa-solid fa-shield-halved"></i>
                            </button>
                          )}
                          {['Paid', 'Exam Scheduled'].includes(c.status) && (
                            <button className="btn btn-sm btn-primary" onClick={() => sendExamLink(c.id)}>
                              <i className="fa-solid fa-envelope me-1"></i> {c.status === 'Exam Scheduled' ? 'Resend Link' : 'Send Link'}
                            </button>
                          )}
                          {c.status === 'Exam Completed' && (
                            <>
                              <button 
                                className="btn btn-sm btn-success" 
                                onClick={() => {
                                  if (window.confirm(`Mark ${c.name} as Qualified? This will update the candidate and send the qualification email.`)) {
                                    updateStatus(c.id, 'Qualified');
                                  }
                                }} 
                                title="Mark as Qualified"
                              >
                                <i className="fa-solid fa-check me-1"></i> Qualify
                              </button>
                              <button 
                                className="btn btn-sm btn-danger" 
                                onClick={() => {
                                  if (window.confirm(`Mark ${c.name} as Not Qualified? This will update the candidate and send the notification.`)) {
                                    updateStatus(c.id, 'Not Qualified');
                                  }
                                }} 
                                title="Mark as Not Qualified"
                              >
                                <i className="fa-solid fa-xmark me-1"></i> Disqualify
                              </button>
                            </>
                          )}
                          {['Qualified', 'Not Qualified'].includes(c.status) && (
                            <button className="btn btn-sm btn-dark" onClick={() => setSchedulingCandidate(c)}>
                               <i className="fas fa-video me-1"></i> Schedule Interview
                            </button>
                          )}
                          {c.status === 'Interview 1 Scheduled' && (
                            <button 
                              className="btn btn-sm text-white fw-bold shadow-sm" 
                              style={{ backgroundColor: '#0284c7', borderColor: '#0369a1' }}
                              onClick={() => setEvaluationCandidate(c)}
                              title="Evaluate Interview"
                            >
                              <i className="fa-solid fa-clipboard-user me-1"></i> Evaluate
                            </button>
                          )}
                          {c.status === 'Selected' && (
                             <button className="btn btn-sm btn-success" onClick={() => setOfferCandidate(c)}>
                               <i className="fa-solid fa-file-contract me-1"></i> Generate Offer
                             </button>
                          )}
                          {c.status === 'Offer Issued' && (
                             <span className="badge bg-success"><i className="fas fa-check-circle me-1"></i> Offer Issued</span>
                          )}
                          {['Qualified', 'Not Qualified'].includes(c.status) && (
                            <button className="btn btn-sm btn-outline-danger" onClick={() => {
                                if (window.confirm("Are you sure you want to reject this candidate?")) {
                                    updateStatus(c.id, 'Not Selected')
                                }
                            }}>
                              <i className="fas fa-times"></i> Reject
                            </button>
                          )}
                          <button className="btn btn-sm btn-outline-primary" onClick={async () => {
                             try {
                                const response = await api.get(`/api/portal/admin/internships/candidates/${c.id}/email_history/`);
                                setEmailLogs(response.data.logs || []);
                                setEmailLogsCandidate(c);
                             } catch (err) { alert('Failed to load logs'); }
                          }}>
                             <i className="fa-solid fa-clock-rotate-left"></i> Emails
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-5">
                        <i className="fa-solid fa-folder-open fs-3 mb-2 d-block text-secondary"></i>
                        No candidates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-light border-0 py-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: '50px', height: '50px' }}>
                    {selectedCandidate.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold text-dark mb-0">{selectedCandidate.name}</h5>
                    <small className="text-muted">{selectedCandidate.registration_id}</small>
                  </div>
                </div>
                <button type="button" className="btn-close" onClick={() => setSelectedCandidate(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                   <div className="col-md-6">
                      <div className="card h-100 border-0 bg-light rounded-4">
                         <div className="card-body">
                            <h6 className="fw-bold text-secondary mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Personal Details</h6>
                            <p className="mb-2"><i className="fa-solid fa-envelope text-muted me-2 w-15px"></i> {selectedCandidate.email}</p>
                            <p className="mb-2"><i className="fa-solid fa-phone text-muted me-2 w-15px"></i> {selectedCandidate.phone || 'N/A'}</p>
                            <p className="mb-0"><i className="fa-solid fa-graduation-cap text-muted me-2 w-15px"></i> {selectedCandidate.college || 'N/A'}</p>
                         </div>
                      </div>
                   </div>
                   <div className="col-md-6">
                      <div className="card h-100 border-0 bg-light rounded-4">
                         <div className="card-body">
                            <h6 className="fw-bold text-secondary mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Application Status</h6>
                            <p className="mb-2"><span className="text-muted me-2">Domain:</span> <span className="fw-medium">{selectedCandidate.course}</span></p>
                            <p className="mb-2"><span className="text-muted me-2">Status:</span> <span className={`badge ${getStatusBadge(selectedCandidate.status)}`}>{selectedCandidate.status}</span></p>
                            <p className="mb-0"><span className="text-muted me-2">Exam Score:</span> <span className="fw-bold text-primary">{selectedCandidate.latest_exam_score !== null ? `${selectedCandidate.latest_exam_score} Marks` : 'Not Taken'}</span></p>
                         </div>
                      </div>
                   </div>
                </div>
                
                <hr className="my-4 text-muted opacity-25" />
                
                <h6 className="fw-bold text-dark mb-3">Interview Information</h6>
                {selectedCandidate.status.includes('Interview') || selectedCandidate.status === 'Selected' ? (
                   <div className="alert alert-info border-0 rounded-4">
                      <i className="fa-solid fa-calendar-check me-2"></i> Interview is scheduled. Advanced scheduling and evaluation scorecards will be integrated in upcoming updates.
                   </div>
                ) : (
                   <p className="text-muted fst-italic">No interview scheduled yet.</p>
                )}
              </div>
              <div className="modal-footer bg-light border-0 py-3">
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setSelectedCandidate(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Modal */}
      {schedulingCandidate && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white border-0 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-calendar-plus me-2"></i> Schedule Interview
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSchedulingCandidate(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="alert alert-info border-0 rounded-4">
                  <strong>Candidate:</strong> {schedulingCandidate.name} ({schedulingCandidate.registration_id})<br/>
                  <strong>Domain:</strong> {schedulingCandidate.course}
                </div>
                
                <div className="row g-3 mt-2">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Interview Date</label>
                    <input type="date" className="form-control" value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Reporting Time</label>
                    <input type="time" className="form-control" value={scheduleData.reporting_time} onChange={e => setScheduleData({...scheduleData, reporting_time: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Interview Time</label>
                    <input type="time" className="form-control" value={scheduleData.interview_time} onChange={e => setScheduleData({...scheduleData, interview_time: e.target.value})} />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Interview Mode</label>
                    <select className="form-select" value={scheduleData.mode} onChange={e => setScheduleData({...scheduleData, mode: e.target.value})}>
                      <option value="Offline">Offline (In-Person)</option>
                      <option value="Online">Online (Virtual)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Interviewer (Optional)</label>
                    <input type="text" className="form-control" placeholder="Name of Interviewer" value={scheduleData.interviewer} onChange={e => setScheduleData({...scheduleData, interviewer: e.target.value})} />
                  </div>

                  {scheduleData.mode === 'Offline' ? (
                    <>
                      <div className="col-md-12">
                        <label className="form-label fw-bold">Venue Name</label>
                        <input type="text" className="form-control" value={scheduleData.venue_name} onChange={e => setScheduleData({...scheduleData, venue_name: e.target.value})} />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold">Complete Office Address</label>
                        <textarea className="form-control" rows="2" value={scheduleData.office_address} onChange={e => setScheduleData({...scheduleData, office_address: e.target.value})}></textarea>
                      </div>
                    </>
                  ) : (
                    <div className="col-md-12">
                      <label className="form-label fw-bold">Meeting Link (Zoom/Meet)</label>
                      <input type="text" className="form-control" placeholder="https://zoom.us/j/..." value={scheduleData.venue_name} onChange={e => setScheduleData({...scheduleData, venue_name: e.target.value})} />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer bg-light border-0 py-3">
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setSchedulingCandidate(null)}>Cancel</button>
                <button type="button" className="btn btn-primary px-4 rounded-pill" onClick={async () => {
                  try {
                    await api.post(`/api/portal/admin/internships/candidates/${schedulingCandidate.id}/schedule_interview/`, scheduleData);
                    setSchedulingCandidate(null);
                    fetchCandidates();
                    alert('Interview successfully scheduled and invitation emailed!');
                  } catch (err) {
                     alert('Failed to schedule interview');
                  }
                }}>
                  <i className="fa-solid fa-paper-plane me-2"></i> Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Scorecard Modal */}
      {evaluationCandidate && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white border-0 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-clipboard-user me-2"></i> Interview Evaluation Scorecard
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setEvaluationCandidate(null)}></button>
              </div>
              <div className="modal-body p-4 bg-light">
                <div className="card border-0 rounded-4 shadow-sm mb-4">
                   <div className="card-body">
                      <h6 className="fw-bold text-dark mb-0">{evaluationCandidate.name} ({evaluationCandidate.registration_id})</h6>
                      <small className="text-muted">{evaluationCandidate.course}</small>
                   </div>
                </div>
                
                <h6 className="fw-bold text-secondary mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Assessment Criteria (1-10)</h6>
                <div className="row g-3 mb-4">
                  {['communication', 'technical', 'problem_solving', 'project_understanding', 'learning_ability'].map((metric) => (
                     <div className="col-md-6" key={metric}>
                       <label className="form-label text-capitalize fw-medium mb-1">{metric.replace('_', ' ')}</label>
                       <input 
                         type="number" 
                         className="form-control form-control-sm" 
                         min="0" max="10"
                         value={evalData[metric]}
                         onChange={(e) => setEvalData({...evalData, [metric]: parseInt(e.target.value) || 0})}
                       />
                     </div>
                  ))}
                </div>
                
                <h6 className="fw-bold text-secondary mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Interviewer Remarks</h6>
                <textarea 
                   className="form-control mb-4" 
                   rows="3" 
                   placeholder="Strengths, weaknesses, overall notes..."
                   value={evalData.feedback}
                   onChange={(e) => setEvalData({...evalData, feedback: e.target.value})}
                ></textarea>
                
                <h6 className="fw-bold text-secondary mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Final Decision</h6>
                <select className="form-select fw-bold" value={evalData.recommendation} onChange={(e) => setEvalData({...evalData, recommendation: e.target.value})}>
                   <option value="Selected" className="text-success">Select Candidate (Pass)</option>
                   <option value="Not Selected" className="text-danger">Reject Candidate (Fail)</option>
                </select>
              </div>
              <div className="modal-footer bg-white border-top py-3">
                <div className="me-auto text-primary fw-bold">
                   Total Score: {evalData.communication + evalData.technical + evalData.problem_solving + evalData.project_understanding + evalData.learning_ability} / 50
                </div>
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setEvaluationCandidate(null)}>Cancel</button>
                <button type="button" className="btn btn-primary px-4 rounded-pill fw-bold shadow-sm" onClick={async () => {
                  try {
                    const totalScore = evalData.communication + evalData.technical + evalData.problem_solving + evalData.project_understanding + evalData.learning_ability;
                    const payload = {
                       scorecard: {
                          communication: evalData.communication,
                          technical: evalData.technical,
                          problem_solving: evalData.problem_solving,
                          project_understanding: evalData.project_understanding,
                          learning_ability: evalData.learning_ability
                       },
                       overall_score: totalScore,
                       feedback: evalData.feedback,
                       recommendation: evalData.recommendation
                    };
                    await api.post(`/api/portal/admin/internships/candidates/${evaluationCandidate.id}/submit_interview_evaluation/`, payload);
                    setEvaluationCandidate(null);
                    fetchCandidates();
                    alert('Evaluation successfully saved!');
                  } catch (err) {
                     alert('Failed to save evaluation');
                  }
                }}>
                  <i className="fa-solid fa-save me-2"></i> Submit Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Offer Modal */}
      {offerCandidate && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-success text-white border-0 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-file-signature me-2"></i> Generate Offer Letter
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setOfferCandidate(null)}></button>
              </div>
              <div className="modal-body p-4 bg-light">
                <div className="alert alert-success border-0 rounded-4">
                  <strong>Candidate:</strong> {offerCandidate.name} ({offerCandidate.registration_id})<br/>
                  <strong>Domain:</strong> {offerCandidate.course}
                </div>
                
                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Internship Start Date</label>
                    <input type="date" className="form-control" value={offerData.start_date} onChange={e => setOfferData({...offerData, start_date: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Acceptance Deadline</label>
                    <input type="date" className="form-control" value={offerData.acceptance_deadline} onChange={e => setOfferData({...offerData, acceptance_deadline: e.target.value})} />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Duration</label>
                    <select className="form-select" value={offerData.duration} onChange={e => setOfferData({...offerData, duration: e.target.value})}>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Work Mode</label>
                    <select className="form-select" value={offerData.work_mode} onChange={e => setOfferData({...offerData, work_mode: e.target.value})}>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Mentor Name</label>
                    <input type="text" className="form-control" placeholder="Optional" value={offerData.mentor_name} onChange={e => setOfferData({...offerData, mentor_name: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Stipend Terms</label>
                    <input type="text" className="form-control" value={offerData.stipend_terms} onChange={e => setOfferData({...offerData, stipend_terms: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-white border-top py-3">
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setOfferCandidate(null)}>Cancel</button>
                <button type="button" className="btn btn-success px-4 rounded-pill fw-bold shadow-sm" onClick={async () => {
                  try {
                    await api.post(`/api/portal/admin/internships/candidates/${offerCandidate.id}/generate_offer/`, offerData);
                    setOfferCandidate(null);
                    fetchCandidates();
                    alert('Offer Letter successfully generated and sent via email!');
                  } catch (err) {
                     alert('Failed to generate offer');
                  }
                }}>
                  <i className="fa-solid fa-paper-plane me-2"></i> Issue Offer Letter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Logs Modal */}
      {emailLogsCandidate && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white border-0 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-envelope-open-text me-2"></i> Email History
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setEmailLogsCandidate(null)}></button>
              </div>
              <div className="modal-body p-4 bg-light">
                <div className="card border-0 rounded-4 shadow-sm mb-4">
                   <div className="card-body">
                      <h6 className="fw-bold text-dark mb-0">{emailLogsCandidate.name} ({emailLogsCandidate.registration_id})</h6>
                   </div>
                </div>
                
                {emailLogs.length === 0 ? (
                   <div className="text-center py-5 text-muted">
                      <i className="fa-solid fa-inbox fs-1 mb-2 d-block opacity-50"></i>
                      No emails have been sent to this candidate yet.
                   </div>
                ) : (
                   <div className="table-responsive">
                     <table className="table table-hover bg-white rounded shadow-sm">
                       <thead className="table-light">
                         <tr>
                           <th>Type</th>
                           <th>Subject</th>
                           <th>Sent At</th>
                           <th>Status</th>
                         </tr>
                       </thead>
                       <tbody>
                         {emailLogs.map((log) => (
                           <tr key={log.id}>
                             <td className="fw-bold text-primary">{log.email_type}</td>
                             <td className="text-muted small">{log.subject}</td>
                             <td>{new Date(log.sent_at).toLocaleString()}</td>
                             <td>
                               <span className={`badge ${log.status === 'Sent' ? 'bg-success' : 'bg-danger'}`}>
                                  {log.status}
                               </span>
                               {log.error_message && <div className="small text-danger mt-1" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.error_message}>{log.error_message}</div>}
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                )}
              </div>
              <div className="modal-footer bg-white border-top py-3">
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setEmailLogsCandidate(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Proctoring Audit Report Modal */}
      {proctoringCandidate && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden">
              <div className="modal-header bg-dark text-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center">
                    <i className="fa-solid fa-shield-halved fs-5"></i>
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold mb-0">AI Proctoring & Anti-Cheat Audit Report</h5>
                    <small className="text-secondary">{proctoringCandidate.name} ({proctoringCandidate.registration_id})</small>
                  </div>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setProctoringCandidate(null)}></button>
              </div>

              <div className="modal-body p-4 bg-light">
                {loadingProctoring ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary mb-3"></div>
                    <div className="text-muted fw-semibold">Loading Proctoring Logs & Snapshots...</div>
                  </div>
                ) : proctoringReport ? (
                  <div className="d-flex flex-column gap-4">
                    {/* Summary Metric Cards */}
                    <div className="row g-3">
                      <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-3 p-3 h-100 bg-white border-start border-4 border-primary">
                          <small className="text-muted fw-bold text-uppercase">Proctoring Status</small>
                          <h5 className="fw-bold mt-1 mb-0">
                            {proctoringReport.proctoring_status === 'Disqualified' ? (
                              <span className="text-danger"><i className="fa-solid fa-ban me-1"></i> Disqualified</span>
                            ) : proctoringReport.proctoring_status === 'Warnings Issued' ? (
                              <span className="text-warning"><i className="fa-solid fa-triangle-exclamation me-1"></i> Warnings Issued</span>
                            ) : (
                              <span className="text-success"><i className="fa-solid fa-circle-check me-1"></i> Clean</span>
                            )}
                          </h5>
                          <small className="text-secondary mt-1">{proctoringReport.submission_reason}</small>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-3 p-3 h-100 bg-white">
                          <small className="text-muted fw-bold text-uppercase">Warning Count</small>
                          <h4 className="fw-bold mt-1 mb-0 text-dark">
                            {proctoringReport.warning_count} / {proctoringReport.max_warnings}
                          </h4>
                          <small className="text-muted">Total strikes registered</small>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-3 p-3 h-100 bg-white">
                          <small className="text-muted fw-bold text-uppercase">Violations Breakdown</small>
                          <div className="d-flex flex-column gap-1 mt-1 small">
                            <span>Tab Switches: <strong>{proctoringReport.total_tab_switches}</strong></span>
                            <span>Fullscreen Exits: <strong>{proctoringReport.total_fullscreen_exits}</strong></span>
                            <span>Window Blurs: <strong>{proctoringReport.total_blur_events}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-3 p-3 h-100 bg-white">
                          <small className="text-muted fw-bold text-uppercase">Assessment Score</small>
                          <h4 className="fw-bold mt-1 mb-0 text-primary">
                            {proctoringReport.score !== null ? `${proctoringReport.score} Marks` : 'In Progress'}
                          </h4>
                          <small className="text-muted">Passing threshold: {proctoringReport.passing_score} Marks</small>
                        </div>
                      </div>
                    </div>

                    {/* Snapshot Preview Card (if available) */}
                    {proctoringReport.proctoring_snapshot && (
                      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
                        <div className="card-header bg-white py-3 border-bottom d-flex align-items-center gap-2">
                          <i className="fa-solid fa-camera text-primary"></i>
                          <h6 className="fw-bold mb-0">Captured Proctoring Webcam Snapshot</h6>
                        </div>
                        <div className="card-body p-3 text-center bg-dark">
                          <img
                            src={proctoringReport.proctoring_snapshot}
                            alt="Proctoring Snapshot"
                            className="img-fluid rounded-3 border shadow-sm"
                            style={{ maxHeight: '320px', objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Chronological Violations Table */}
                    <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
                      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="fa-solid fa-timeline text-danger"></i>
                          <h6 className="fw-bold mb-0">Audit Trail: Recorded Violation Events</h6>
                        </div>
                        <span className="badge bg-secondary">
                          {proctoringReport.violations?.length || 0} Events
                        </span>
                      </div>
                      <div className="card-body p-0">
                        {(!proctoringReport.violations || proctoringReport.violations.length === 0) ? (
                          <div className="text-center py-5 text-muted">
                            <i className="fa-solid fa-shield-halved text-success fs-1 mb-2 d-block"></i>
                            No violations were detected during this exam session. Complete compliance observed.
                          </div>
                        ) : (
                          <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                              <thead className="table-light">
                                <tr>
                                  <th>#</th>
                                  <th>Warning Level</th>
                                  <th>Violation Type</th>
                                  <th>Timestamp</th>
                                  <th>Incident Details</th>
                                  <th>Evidence Snapshot</th>
                                </tr>
                              </thead>
                              <tbody>
                                {proctoringReport.violations.map((v, i) => (
                                  <tr key={v.id || i}>
                                    <td className="text-muted fw-bold">{i + 1}</td>
                                    <td>
                                      <span className={`badge ${v.warning_number >= 3 ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                        Warning #{v.warning_number}
                                      </span>
                                    </td>
                                    <td className="fw-semibold text-dark">
                                      {v.violation_type.replace('_', ' ').toUpperCase()}
                                    </td>
                                    <td className="text-muted small">
                                      {new Date(v.timestamp).toLocaleString()}
                                    </td>
                                    <td className="small text-muted" style={{ maxWidth: '300px' }}>
                                      {v.details || 'Detected anti-cheat rule violation'}
                                    </td>
                                    <td>
                                      {v.snapshot ? (
                                        <a href={v.snapshot} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                                          <i className="fa-solid fa-image me-1"></i> View
                                        </a>
                                      ) : (
                                        <span className="text-muted small">-</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="modal-footer bg-white border-top py-3">
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setProctoringCandidate(null)}>
                  Close Audit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HRInternshipCandidates;
