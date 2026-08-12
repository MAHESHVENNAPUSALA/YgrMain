import React, { useState, useEffect } from 'react';
import { useToast } from '../../shared/context/ToastContext';

const FALLBACK_CAROUSELS = [
  { id: 1, title: 'Engineering Digital Products & Business Transformation', desc: 'Enterprise software, AI solutions, cloud platforms & mobile apps.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', status: 'Active' },
  { id: 2, title: 'Build Your Career With YGR Gobal IT Services', desc: 'Join our team of elite engineers working on Fortune 500 tech.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80', status: 'Active' }
];

const CarouselDashboard = () => {
  const [carousels, setCarousels] = useState(FALLBACK_CAROUSELS);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetch('/api/public/carousel/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCarousels(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      setCarousels((prev) => prev.filter((item) => item.id !== deleteId));
      if (showToast) showToast('Hero Banner deleted successfully', 'success');
      setDeleteId(null);
    }
  };

  const filteredCarousels = carousels.filter((c) => {
    const title = c.carouseltitle || c.title || '';
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">Hero Banners Management</h2>
          <p className="text-muted small mb-0">Manage homepage hero slides, banners, background images, and headline copy.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => showToast && showToast('Create banner form opened', 'info')}>
          <i className="fas fa-plus me-2"></i> Add Hero Banner
        </button>
      </div>

      {/* Search Input */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-search text-muted"></i></span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search banners by title..."
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
                <th style={{ width: '100px' }}>Banner</th>
                <th>Headline Title</th>
                <th>Subtext Description</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCarousels.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">No hero banners found.</td>
                </tr>
              ) : (
                filteredCarousels.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.carouselImage || item.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&q=80'}
                        alt="Banner"
                        className="rounded-3"
                        style={{ width: '70px', height: '45px', objectFit: 'cover' }}
                      />
                    </td>
                    <td className="fw-bold text-dark">{item.carouseltitle || item.title}</td>
                    <td className="small text-muted">{item.carouselDesc || item.desc || 'No description'}</td>
                    <td><span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill">{item.status || 'Active'}</span></td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2 rounded-pill px-3" onClick={() => showToast && showToast(`Edit banner #${item.id}`, 'info')}>
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
                <h5 className="modal-title fw-bold text-danger"><i className="fas fa-exclamation-triangle me-2"></i>Delete Hero Banner?</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteId(null)}></button>
              </div>
              <div className="modal-body text-secondary">
                This action cannot be undone. Are you sure you want to permanently remove this hero banner?
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

export default CarouselDashboard;
