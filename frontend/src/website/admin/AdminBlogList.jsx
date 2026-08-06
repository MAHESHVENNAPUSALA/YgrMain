import React, { useState, useEffect, useMemo } from 'react';
import AdminBlogModal from './AdminBlogModal';
import AdminCategoryAuthorModal from './AdminCategoryAuthorModal';

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals state
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showCatAuthorModal, setShowCatAuthorModal] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);

  const fetchAdminBlogs = async () => {
    setLoading(true);
    try {
      const [bRes, cRes, aRes] = await Promise.all([
        fetch('/api/admin/blogs/'),
        fetch('/api/admin/blog/categories/'),
        fetch('/api/admin/blog/authors/')
      ]);

      if (bRes.ok) {
        const bData = await bRes.json();
        setBlogs(bData);
      }
      if (cRes.ok) {
        const cData = await cRes.json();
        setCategories(cData);
      }
      if (aRes.ok) {
        const aData = await aRes.json();
        setAuthors(aData);
      }
    } catch (err) {
      console.error('Error fetching admin blog data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBlogs();
  }, []);

  const showToast = (msg, isError = false) => {
    setToastMessage({ msg, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        !searchQuery ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.slug && b.slug.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.category_name && b.category_name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCat === 'All' ||
        (b.category_name && b.category_name.toLowerCase() === selectedCat.toLowerCase());

      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Published' && b.is_published) ||
        (selectedStatus === 'Hidden' && !b.is_published);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchQuery, selectedCat, selectedStatus]);

  // Handle Save Blog (Create or Update)
  const handleSaveBlog = async (formData, blogId) => {
    const url = blogId ? `/api/admin/blogs/${blogId}/update/` : '/api/admin/blogs/create/';
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        showToast(blogId ? 'Article updated successfully!' : 'Article created successfully!');
        setShowBlogModal(false);
        setEditingBlog(null);
        fetchAdminBlogs();
      } else {
        showToast(data.error || 'Error saving article', true);
      }
    } catch (err) {
      showToast('Network error saving article', true);
    }
  };

  // Handle Delete Blog
  const handleDeleteBlog = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}/delete/`, { method: 'POST' });
      if (res.ok) {
        showToast('Article deleted successfully!');
        fetchAdminBlogs();
      } else {
        showToast('Failed to delete article', true);
      }
    } catch (err) {
      showToast('Error deleting article', true);
    }
  };

  // Handle Toggle Visibility (Publish / Hide)
  const handleToggleVisibility = async (id) => {
    try {
      const res = await fetch(`/api/admin/blogs/${id}/toggle-visibility/`, { method: 'POST' });
      if (res.ok) {
        showToast('Visibility status updated!');
        fetchAdminBlogs();
      }
    } catch (err) {
      showToast('Failed to update visibility', true);
    }
  };

  // Handle Toggle Featured
  const handleToggleFeatured = async (id) => {
    try {
      const res = await fetch(`/api/admin/blogs/${id}/toggle-featured/`, { method: 'POST' });
      if (res.ok) {
        showToast('Featured status updated!');
        fetchAdminBlogs();
      }
    } catch (err) {
      showToast('Failed to update featured status', true);
    }
  };

  // Stats calculation
  const totalArticles = blogs.length;
  const publishedCount = blogs.filter((b) => b.is_published).length;
  const featuredCount = blogs.filter((b) => b.is_featured).length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views_count || 0), 0);

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          className={`position-fixed bottom-0 end-0 p-3`}
          style={{ zIndex: 2000 }}
        >
          <div className={`alert ${toastMessage.isError ? 'alert-danger' : 'alert-success'} shadow-lg rounded-pill px-4 py-3 fw-bold`}>
            {toastMessage.msg}
          </div>
        </div>
      )}

      {/* ADMIN HEADER */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 bg-white p-4 rounded-4 shadow-sm border">
        <div>
          <span className="badge bg-primary rounded-pill px-3 py-2 fw-bold mb-2">CMS MANAGEMENT</span>
          <h2 className="fw-extrabold m-0 text-dark" style={{ letterSpacing: '-0.02em' }}>
            Blog Management
          </h2>
          <p className="text-muted small m-0 mt-1">Manage articles, rich content, categories, tags, authors, and SEO metadata dynamically.</p>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-dark rounded-pill fw-bold px-3"
            onClick={() => setShowCatAuthorModal(true)}
          >
            <i className="fas fa-layer-group me-1"></i> Manage Categories & Authors
          </button>
          
          <button
            className="btn btn-primary rounded-pill fw-bold px-4 shadow-sm"
            onClick={() => { setEditingBlog(null); setShowBlogModal(true); }}
          >
            <i className="fas fa-plus me-1"></i> Add New Article
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center gap-3">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
              <i className="fas fa-newspaper"></i>
            </div>
            <div>
              <div className="text-muted small fw-semibold">Total Articles</div>
              <div className="h4 fw-bold m-0">{totalArticles}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center gap-3">
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div className="text-muted small fw-semibold">Published (Live)</div>
              <div className="h4 fw-bold m-0">{publishedCount}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center gap-3">
            <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
              <i className="fas fa-star"></i>
            </div>
            <div>
              <div className="text-muted small fw-semibold">Featured Blueprints</div>
              <div className="h4 fw-bold m-0">{featuredCount}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center gap-3">
            <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
              <i className="fas fa-eye"></i>
            </div>
            <div>
              <div className="text-muted small fw-semibold">Total Reads & Views</div>
              <div className="h4 fw-bold m-0">{totalViews}</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-3 rounded-4 border shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 rounded-start-pill">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0 rounded-end-pill"
                placeholder="Filter by title, slug, tag, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select rounded-pill"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select rounded-pill"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published Only</option>
              <option value="Hidden">Hidden / Draft Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* ARTICLES TABLE */}
      <div className="bg-white rounded-4 border shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Loading articles table...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-folder-open display-4 text-muted mb-2"></i>
            <h5 className="fw-bold">No matching articles found</h5>
            <p className="text-muted small">Try adjusting your filters or click "+ Add New Article" to create one.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '80px' }}>Cover</th>
                  <th>Title & Slug</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Views</th>
                  <th>Visibility</th>
                  <th>Featured</th>
                  <th className="text-end" style={{ width: '160px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <img
                        src={b.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'}
                        alt={b.title}
                        className="rounded-3"
                        style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{b.title}</div>
                      <div className="text-muted extra-small" style={{ fontSize: '0.78rem' }}>
                        <code>/blog/{b.slug}</code>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 fw-bold">
                        {b.category_name || 'Technology'}
                      </span>
                    </td>
                    <td>
                      <div className="small fw-semibold">{b.author_name}</div>
                      <div className="text-muted extra-small">{b.reading_time}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border rounded-pill">
                        <i className="far fa-eye me-1"></i> {b.views_count}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`btn btn-sm rounded-pill fw-bold ${b.is_published ? 'btn-success' : 'btn-secondary'}`}
                        onClick={() => handleToggleVisibility(b.id)}
                        title="Click to toggle Hide/Publish"
                      >
                        {b.is_published ? <><i className="fas fa-eye me-1"></i> Published</> : <><i className="fas fa-eye-slash me-1"></i> Hidden</>}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`btn btn-sm rounded-circle ${b.is_featured ? 'btn-warning text-dark' : 'btn-outline-secondary'}`}
                        onClick={() => handleToggleFeatured(b.id)}
                        title="Click to toggle Featured ⭐"
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    </td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-start-pill"
                          onClick={() => { setEditingBlog(b); setShowBlogModal(true); }}
                          title="Edit Article"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-end-pill"
                          onClick={() => handleDeleteBlog(b.id, b.title)}
                          title="Delete Article"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODALS */}
      <AdminBlogModal
        show={showBlogModal}
        onClose={() => { setShowBlogModal(false); setEditingBlog(null); }}
        onSave={handleSaveBlog}
        editingBlog={editingBlog}
        categories={categories}
        authors={authors}
      />

      <AdminCategoryAuthorModal
        show={showCatAuthorModal}
        onClose={() => setShowCatAuthorModal(false)}
        onRefresh={fetchAdminBlogs}
      />

    </div>
  );
};

export default AdminBlogList;
