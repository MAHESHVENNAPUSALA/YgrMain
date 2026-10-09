import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CandidateDashboard = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('candidateToken');
    if (token !== registrationId) {
      navigate('/internships/candidate-login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/portal/internships/register/${registrationId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (registrationId) {
      fetchData();
    }
  }, [registrationId]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Candidate Dashboard - {data.name}</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Registration ID:</strong> {data.registration_id}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Phone:</strong> {data.phone}</p>
              <p><strong>Course:</strong> {data.course}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Status:</strong> <span className={`badge ${data.status === 'Registered' ? 'bg-warning' : 'bg-success'}`}>{data.status}</span></p>
              <p><strong>Total Amount:</strong> ₹{data.total_amount}</p>
              <p><strong>Amount Paid:</strong> ₹{data.amount_paid}</p>
              <p><strong>Payment Status:</strong> {data.amount_paid >= data.total_amount ? 'Completed' : 'Pending'}</p>
            </div>
          </div>
          
          {data.exam_token && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h5 className="text-primary"><i className="fa-solid fa-laptop-code me-2"></i> Examination</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1"><strong>Status:</strong> {data.exam_status}</p>
                  {data.exam_status === 'Completed' && (
                    <p className="mb-0"><strong>Score:</strong> {data.exam_score} - {data.is_qualified ? <span className="text-success fw-bold">Qualified</span> : <span className="text-danger fw-bold">Not Qualified</span>}</p>
                  )}
                </div>
                {data.exam_status === 'Scheduled' && (
                  <button className="btn btn-primary" onClick={() => navigate(`/internships/exam/${data.exam_token}`)}>
                    Start Exam
                  </button>
                )}
              </div>
            </div>
          )}
          
          {data.interview_status && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h5 className="text-primary"><i className="fa-solid fa-comments me-2"></i> Technical Interview</h5>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-1"><strong>Status:</strong> {data.interview_status}</p>
                  <p className="mb-1"><strong>Mode:</strong> {data.interview_mode}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1"><strong>Date & Time:</strong> {new Date(data.interview_scheduled_date).toLocaleString()}</p>
                  {data.interview_link && (
                    <p className="mb-0"><strong>Meeting Link:</strong> <a href={data.interview_link} target="_blank" rel="noreferrer">Join Meeting</a></p>
                  )}
                </div>
              </div>
            </div>
          )}

          {data.offer_status && (
            <div className="mt-4 p-3 border rounded bg-success text-white">
              <h5 className="mb-3"><i className="fa-solid fa-handshake me-2"></i> Internship Offer</h5>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-1"><strong>Offer Status:</strong> {data.offer_status}</p>
                  <p className="mb-1"><strong>Start Date:</strong> {data.offer_start_date}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1"><strong>Acceptance Deadline:</strong> {new Date(data.offer_deadline).toLocaleDateString()}</p>
                  {data.offer_status === 'Issued' && (
                    <button className="btn btn-light text-success fw-bold mt-2" onClick={() => alert('Feature to download & accept offer letter coming soon!')}>
                      Review & Accept Offer
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
