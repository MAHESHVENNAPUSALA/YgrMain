import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../shared/context/ToastContext';

const INITIAL_PORTFOLIOS = [
  {
    id: 1,
    name: 'AMMA ORGANICS (Web Application)',
    category: 'Web Application',
    industry: 'Agriculture',
    time_taken: '1 Month',
    description: 'E-commerce platform for organic food products with payment gateway integration and order tracking.',
    tech_stack: 'React, Django, PostgreSQL, Bootstrap',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    demo_url: 'https://demo.ygrgobalitservices.com/amma-organics',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Enterprise Healthcare Telehealth Platform',
    category: 'Enterprise Software',
    industry: 'Healthcare',
    time_taken: '6 Months',
    description: 'HIPAA-compliant telemedicine portal connecting 50,000+ patients with specialist doctors.',
    tech_stack: 'React, Python, FastAPI, WebRTC, AWS',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    demo_url: 'https://demo.ygrgobalitservices.com/telehealth',
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Global Logistics & Fleet Telemetry',
    category: 'Cloud Platform',
    industry: 'Logistics',
    time_taken: '8 Months',
    description: 'Real-time GPS tracking system monitoring 2,500+ commercial vehicles across 12 countries.',
    tech_stack: 'Node.js, React, MongoDB, Docker, AWS',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    demo_url: 'https://demo.ygrgobalitservices.com/fleet',
    status: 'Completed'
  }
];

const AdminProjectList = () => {
  const [portfolios, setPortfolios] = useState(INITIAL_PORTFOLIOS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal & Form States
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Application',
    industry: 'Technology',
    time_taken: '1 Month',
    description: '',
    tech_stack: '',
    image: '',
    demo_url: '',
    status: 'Completed'
  });

  useEffect(() => {
    fetch('/api/public/projects/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPortfolios(data);
        }
      })
      .catch(() => {});
  }, []);

  // Open modal for ADD
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Web Application',
      industry: 'Technology',
      time_taken: '1 Month',
      description: '',
      tech_stack: 'React, Django, MySQL',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      demo_url: '',
      status: 'Completed'
    });
    setShowModal(true);
  };

  // Open modal for EDIT
  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || item.title || '',
      category: item.category || 'Web Application',
      industry: item.industry || 'Technology',
      time_taken: item.time_taken || item.duration || '1 Month',
      description: item.description || item.shortDescription || '',
      tech_stack: Array.isArray(item.technologyStack) ? item.technologyStack.join(', ') : (item.tech_stack || ''),
      image: item.image1 || item.thumbnail || item.image || '',
      demo_url: item.projectUrl || item.demo_url || '',
      status: item.status || 'Completed'
    });
    setShowModal(true);
  };

  // Save (Create or Update)
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      if (showToast) showToast('Please enter portfolio item name', 'error');
      return;
    }

    if (editingItem) {
      // Update existing item
      setPortfolios((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
      if (showToast) showToast(`Portfolio item "${formData.name}" updated successfully!`, 'success');
    } else {
      // Create new item
      const newItem = {
        id: Date.now(),
        ...formData
      };
      setPortfolios((prev) => [newItem, ...prev]);
      if (showToast) showToast(`New portfolio item "${formData.name}" added successfully!`, 'success');
    }

    setShowModal(false);
  };

  // Delete Confirm
  const handleDeleteConfirm = () => {
    if (deleteId) {
      setPortfolios((prev) => prev.filter((p) => p.id !== deleteId));
      if (showToast) showToast('Portfolio item deleted successfully', 'success');
      setDeleteId(null);
    }
  };

  const filteredPortfolios = portfolios.filter((p) => {
    const title = p.name || p.title || '';
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">Website Portfolio Management</h2>
          <p className="text-muted small mb-0">Manage company showcase portfolio items, web applications, and case studies.</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/website/projects/add" className="btn btn-primary rounded-pill px-4">
            <i className="fas fa-plus me-2"></i> Add Portfolio Project
          </Link>
          <button className="btn btn-outline-primary rounded-pill px-3" onClick={handleOpenAddModal}>
            <i className="fas fa-window-restore me-1"></i> Quick Add Modal
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><i className="fas fa-search text-muted"></i></span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search portfolio items by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Web Application">Web Applications</option>
            <option value="Enterprise Software">Enterprise Software</option>
            <option value="Mobile Application">Mobile Applications</option>
            <option value="Cloud Platform">Cloud Platforms</option>
            <option value="AI Solution">AI Solutions</option>
          </select>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-dark fw-bold">
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th>Portfolio Name</th>
                <th>Category</th>
                <th>Time Taken</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPortfolios.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">No portfolio items found.</td>
                </tr>
              ) : (
                filteredPortfolios.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image || item.image1 || item.thumbnail || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80'}
                        alt={item.name}
                        className="rounded-3"
                        style={{ width: '54px', height: '40px', objectFit: 'cover' }}
                      />
                    </td>
                    <td className="fw-bold text-dark">{item.name || item.title}</td>
                    <td><span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill">{item.category || 'Web Application'}</span></td>
                    <td className="small text-muted"><i className="far fa-clock me-1"></i>{item.time_taken || item.duration || '1 Month'}</td>
                    <td><span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill">{item.status || 'Completed'}</span></td>
                    <td className="text-end">
                      <Link to={`/admin/website/projects/edit/${item.id}`} className="btn btn-sm btn-outline-primary me-2 rounded-pill px-3">
                        <i className="fas fa-edit me-1"></i> Edit
                      </Link>
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

      {/* ── CREATE / EDIT PORTFOLIO MODAL FORM ── */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h4 className="modal-title fw-bold text-dark">
                  <i className={`fas fa-${editingItem ? 'edit text-primary' : 'plus-circle text-success'} me-2`}></i>
                  {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                </h4>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <form onSubmit={handleSave}>
                <div className="modal-body py-4">
                  <div className="row g-3">
                    {/* Name / Title */}
                    <div className="col-md-12">
                      <label className="form-label fw-bold text-dark">Portfolio Item Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="e.g. AMMA ORGANICS (Web Application)"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    {/* Category & Industry */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Category</label>
                      <select
                        className="form-select rounded-3"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Web Application">Web Application</option>
                        <option value="Enterprise Software">Enterprise Software</option>
                        <option value="Mobile Application">Mobile Application</option>
                        <option value="Cloud Platform">Cloud Platform</option>
                        <option value="AI Solution">AI Solution</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Industry</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="e.g. Agriculture, Healthcare, Finance"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      />
                    </div>

                    {/* Time Taken / Duration & Status */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Time Taken / Duration</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="e.g. 1 Month, 6 Months"
                        value={formData.time_taken}
                        onChange={(e) => setFormData({ ...formData, time_taken: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Status</label>
                      <select
                        className="form-select rounded-3"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>

                    {/* Short Description */}
                    <div className="col-md-12">
                      <label className="form-label fw-bold text-dark">Overview / Description</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="3"
                        placeholder="Brief summary of the portfolio solution..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      ></textarea>
                    </div>

                    {/* Technology Stack Tags */}
                    <div className="col-md-12">
                      <label className="form-label fw-bold text-dark">Technology Stack (Comma-separated)</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="e.g. React, Django, PostgreSQL, AWS"
                        value={formData.tech_stack}
                        onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                      />
                    </div>

                    {/* Image URL & Demo Link */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Thumbnail Image URL</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="https://..."
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Live Demo Link (URL)</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="https://demo.ygrgobalitservices.com/..."
                        value={formData.demo_url}
                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4">
                    <i className="fas fa-save me-1"></i> {editingItem ? 'Save Changes' : 'Create Portfolio Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-danger"><i className="fas fa-exclamation-triangle me-2"></i>Delete Portfolio Item?</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteId(null)}></button>
              </div>
              <div className="modal-body text-secondary">
                This action cannot be undone. Are you sure you want to permanently remove this portfolio item?
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

export default AdminProjectList;
