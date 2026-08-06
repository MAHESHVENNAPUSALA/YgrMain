import React, { useState, useEffect } from 'react';
import { useToast } from '../../shared/context/ToastContext';

const FALLBACK_TESTIMONIALS = [
  { id: 1, name: 'Sanjay Verma', role: 'CTO, FinEdge Tech', quote: 'YGR Global delivered our multi-tenant application ahead of schedule. Outstanding engineering standard!', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', rating: 5, status: 'Active' },
  { id: 2, name: 'Dr. Meera Nambiar', role: 'Founder, HealthCare Plus', quote: 'Built a HIPAA-compliant telemedicine platform handling 10,000+ daily consultations effortlessly.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', rating: 5, status: 'Active' },
  { id: 3, name: 'Rajesh Kumar', role: 'VP Operations, LogisticsX', quote: 'Real-time fleet engine reduced dispatch latency by 45%. Highly recommended team!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', rating: 5, status: 'Active' }
];

const AdminTestimonialList = () => {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetch('/api/testimonials/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      setTestimonials((prev) => prev.filter((item) => item.id !== deleteId));
      if (showToast) showToast('Testimonial deleted successfully', 'success');
      setDeleteId(null);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    const name = t.name || '';
    const quote = t.quote || t.content || '';
    return name.toLowerCase().includes(search.toLowerCase()) || quote.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">Testimonials Management</h2>
          <p className="text-muted small mb-0">Manage client reviews, enterprise feedback, star ratings, and company logos.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => showToast && showToast('Create testimonial form opened', 'info')}>
          <i className="fas fa-plus me-2"></i> Add Testimonial
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
              placeholder="Search testimonials by client name or feedback..."
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
                <th style={{ width: '60px' }}>Client</th>
                <th>Name & Designation</th>
                <th>Review Quote</th>
                <th>Rating</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">No testimonials found.</td>
                </tr>
              ) : (
                filteredTestimonials.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <img
                        src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'}
                        alt={t.name}
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{t.name}</div>
                      <div className="small text-muted">{t.role || t.designation || 'Client Executive'}</div>
                    </td>
                    <td className="small text-secondary" style={{ maxWidth: '340px' }}>
                      "{t.quote || t.content || t.message}"
                    </td>
                    <td>
                      <div className="text-warning small">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <i key={i} className="fas fa-star me-1"></i>
                        ))}
                      </div>
                    </td>
                    <td><span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill">{t.status || 'Active'}</span></td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2 rounded-pill px-3" onClick={() => showToast && showToast(`Edit testimonial #${t.id}`, 'info')}>
                        <i className="fas fa-edit me-1"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => setDeleteId(t.id)}>
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
                <h5 className="modal-title fw-bold text-danger"><i className="fas fa-exclamation-triangle me-2"></i>Delete Testimonial?</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteId(null)}></button>
              </div>
              <div className="modal-body text-secondary">
                This action cannot be undone. Are you sure you want to permanently remove this client testimonial?
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

export default AdminTestimonialList;
