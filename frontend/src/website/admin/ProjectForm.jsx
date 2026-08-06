import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useToast } from '../../shared/context/ToastContext';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Application',
    industry: 'Technology',
    time_taken: '1 Month',
    description: '',
    tech_stack: 'React, Django, MySQL',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    demo_url: '',
    status: 'Completed'
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      // Fetch portfolio details if editing
      fetch(`/api/public/projects/${id}/`)
        .then((r) => r.json())
        .then((data) => {
          if (data && data.id) {
            setFormData({
              name: data.name || data.title || '',
              category: data.category || 'Web Application',
              industry: data.industry || 'Technology',
              time_taken: data.time_taken || data.duration || '1 Month',
              description: data.description || data.shortDescription || '',
              tech_stack: Array.isArray(data.technologyStack) ? data.technologyStack.join(', ') : (data.tech_stack || ''),
              image: data.image1 || data.thumbnail || data.image || '',
              demo_url: data.projectUrl || data.demo_url || '',
              status: data.status || 'Completed'
            });
          }
        })
        .catch(() => {});
    }
  }, [id, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      if (showToast) showToast('Please enter portfolio item name', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (showToast) showToast(isEditing ? 'Portfolio Project updated successfully!' : 'Add Portfolio Project created successfully!', 'success');
      navigate('/admin/website/projects');
    }, 400);
  };

  return (
    <div className="container py-4" style={{ maxWidth: '820px' }}>
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <div>
          <span className="badge bg-primary rounded-pill px-3 py-1 fw-bold mb-2">WEBSITE CMS PORTFOLIO</span>
          <h2 className="fw-bold text-dark mb-0">
            {isEditing ? 'Edit Portfolio Project' : 'Add Portfolio Project'}
          </h2>
        </div>
        <Link to="/admin/website/projects" className="btn btn-outline-secondary rounded-pill px-4">
          <i className="fas fa-arrow-left me-2"></i> Back to Portfolio
        </Link>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Portfolio Name */}
            <div className="col-md-12">
              <label className="form-label fw-bold text-dark">Portfolio Project Name <span className="text-danger">*</span></label>
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

            {/* Time Taken & Status */}
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

            {/* Description */}
            <div className="col-md-12">
              <label className="form-label fw-bold text-dark">Project Description / Overview</label>
              <textarea
                className="form-control rounded-3"
                rows="4"
                placeholder="Describe the problem, solution, and key deliverables..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            {/* Tech Stack */}
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
              <label className="form-label fw-bold text-dark">Main Image URL</label>
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

          <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
            <Link to="/admin/website/projects" className="btn btn-light rounded-pill px-4">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={submitting}>
              <i className="fas fa-save me-1"></i> {submitting ? 'Saving...' : (isEditing ? 'Update Portfolio Project' : 'Save Portfolio Project')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
