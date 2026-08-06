import React, { useState } from 'react';

const AdminCategoryAuthorModal = ({ show, onClose, onRefresh }) => {
  const [type, setType] = useState('category'); // 'category' or 'author'
  
  const [catName, setCatName] = useState('');
  const [catIcon, setCatIcon] = useState('fa-layer-group');
  const [catDesc, setCatDesc] = useState('');

  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Tech Lead');
  const [authorBio, setAuthorBio] = useState('');

  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const endpoint = type === 'category' ? '/api/admin/blog/categories/' : '/api/admin/blog/authors/';
    const body = type === 'category'
      ? { name: catName, icon: catIcon, description: catDesc }
      : { name: authorName, role: authorRole, bio: authorBio };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: `${type === 'category' ? 'Category' : 'Author'} created!` });
        setCatName('');
        setCatDesc('');
        setAuthorName('');
        setAuthorBio('');
        onRefresh();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to create.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error.' });
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 shadow-lg">
          <div className="modal-header bg-dark text-white rounded-top-4 p-4">
            <h5 className="modal-title fw-bold">Manage Categories & Authors</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="d-flex gap-2 mb-4">
              <button
                className={`btn flex-grow-1 rounded-pill fw-bold ${type === 'category' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setType('category')}
              >
                + New Category
              </button>
              <button
                className={`btn flex-grow-1 rounded-pill fw-bold ${type === 'author' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setType('author')}
              >
                + New Author
              </button>
            </div>

            {status && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} rounded-3 py-2 small mb-3`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {type === 'category' ? (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category Name *</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      placeholder="e.g. AI & Automation"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">FontAwesome Icon Class</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      value={catIcon}
                      onChange={(e) => setCatIcon(e.target.value)}
                      placeholder="fa-brain"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="2"
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Author Name *</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Dr. Aris Thorne"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Role / Title</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="Chief Architect"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Short Bio</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="2"
                      value={authorBio}
                      onChange={(e) => setAuthorBio(e.target.value)}
                    ></textarea>
                  </div>
                </>
              )}

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={onClose}>
                  Close
                </button>
                <button type="submit" className="btn btn-success rounded-pill px-4 fw-bold">
                  Save {type === 'category' ? 'Category' : 'Author'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryAuthorModal;
