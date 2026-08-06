import React, { useState, useEffect } from 'react';

const AdminBlogModal = ({ show, onClose, onSave, editingBlog, categories, authors }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    category_id: '',
    category_name: '',
    author_id: '',
    author_name: 'YGR Tech Team',
    author_role: 'Engineering Team',
    reading_time: '5 min read',
    is_featured: false,
    is_trending: false,
    is_published: true,
    meta_title: '',
    meta_description: '',
    youtube_url: '',
    pdf_url: '',
    image_url: '',
    tags: '',
    content: ''
  });

  const [coverFile, setCoverFile] = useState(null);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'content', 'seo', 'media'

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        slug: editingBlog.slug || '',
        short_description: editingBlog.short_description || '',
        category_id: editingBlog.category_id || '',
        category_name: editingBlog.category_name || '',
        author_id: editingBlog.author_id || '',
        author_name: editingBlog.author_name || 'YGR Tech Team',
        author_role: editingBlog.author_role || 'Engineering Team',
        reading_time: editingBlog.reading_time || '5 min read',
        is_featured: editingBlog.is_featured || false,
        is_trending: editingBlog.is_trending || false,
        is_published: editingBlog.is_published !== undefined ? editingBlog.is_published : true,
        meta_title: editingBlog.meta_title || '',
        meta_description: editingBlog.meta_description || '',
        youtube_url: editingBlog.youtube_url || '',
        pdf_url: editingBlog.pdf_url || '',
        image_url: editingBlog.image || '',
        tags: Array.isArray(editingBlog.tags) ? editingBlog.tags.join(', ') : (editingBlog.tags || ''),
        content: editingBlog.content || ''
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        short_description: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        category_name: '',
        author_id: authors.length > 0 ? authors[0].id : '',
        author_name: 'YGR Tech Team',
        author_role: 'Engineering Team',
        reading_time: '5 min read',
        is_featured: false,
        is_trending: false,
        is_published: true,
        meta_title: '',
        meta_description: '',
        youtube_url: '',
        pdf_url: '',
        image_url: '',
        tags: '',
        content: ''
      });
    }
    setCoverFile(null);
  }, [editingBlog, categories, authors, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (coverFile) {
      data.append('image', coverFile);
    }
    onSave(data, editingBlog ? editingBlog.id : null);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 1050 }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content rounded-4 border-0 shadow-lg">
          
          <div className="modal-header bg-dark text-white rounded-top-4 p-4">
            <h5 className="modal-title fw-bold">
              <i className="fas fa-edit me-2 text-primary"></i>
              {editingBlog ? 'Edit Enterprise Article' : 'Create New Article'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            {/* TABS HEADER */}
            <ul className="nav nav-pills mb-4 gap-2">
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold ${activeTab === 'basic' ? 'active' : 'bg-light text-dark'}`}
                  onClick={() => setActiveTab('basic')}
                >
                  <i className="fas fa-info-circle me-1"></i> Basic Info
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold ${activeTab === 'content' ? 'active' : 'bg-light text-dark'}`}
                  onClick={() => setActiveTab('content')}
                >
                  <i className="fas fa-file-alt me-1"></i> Rich Content
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold ${activeTab === 'media' ? 'active' : 'bg-light text-dark'}`}
                  onClick={() => setActiveTab('media')}
                >
                  <i className="fas fa-photo-video me-1"></i> Media & Files
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold ${activeTab === 'seo' ? 'active' : 'bg-light text-dark'}`}
                  onClick={() => setActiveTab('seo')}
                >
                  <i className="fas fa-search-dollar me-1"></i> SEO & Metadata
                </button>
              </li>
            </ul>

            <form onSubmit={handleSubmit} id="admin-blog-form">
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">Article Title *</label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Architecting Enterprise AI Agents with Spring Boot"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">URL Slug</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="auto-generated-if-empty"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Category *</label>
                    <select
                      className="form-select rounded-3"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Author</label>
                    <select
                      className="form-select rounded-3"
                      name="author_id"
                      value={formData.author_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Author</option>
                      {authors.map((a) => (
                        <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Reading Time</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="reading_time"
                      value={formData.reading_time}
                      onChange={handleChange}
                      placeholder="e.g. 5 min read"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Short Description / Excerpt</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      name="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      placeholder="Summary snippet displayed on blog cards..."
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Tags (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="AI, Java, Spring Boot, React, DevOps"
                    />
                  </div>

                  <div className="col-12 mt-4 p-3 bg-light rounded-3 d-flex gap-4">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is_published"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-bold" htmlFor="is_published">
                        Published (Visible)
                      </label>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is_featured"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-bold" htmlFor="is_featured">
                        Featured ⭐
                      </label>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is_trending"
                        name="is_trending"
                        checked={formData.is_trending}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-bold" htmlFor="is_trending">
                        Trending 🔥
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: RICH CONTENT */}
              {activeTab === 'content' && (
                <div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Rich Article Body / JSON</label>
                    <textarea
                      className="form-control rounded-3 font-monospace"
                      rows="12"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Enter raw text/paragraphs or structured JSON array with code blocks, headings, quotes, tables..."
                    ></textarea>
                    <div className="form-text small text-muted mt-2">
                      <i className="fas fa-info-circle me-1"></i> You can enter standard formatted text or structured JSON blocks like:
                      <code>[{"{"}"type": "heading", "value": "Section Title"{"}"}, {"{"}"type": "code", "language": "python", "code": "print('hello')"{"}"}]</code>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MEDIA & FILES */}
              {activeTab === 'media' && (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">Cover Image File Upload</label>
                    <input type="file" className="form-control rounded-3" accept="image/*" onChange={handleFileChange} />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Or Cover Image URL</label>
                    <input
                      type="url"
                      className="form-control rounded-3"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">YouTube Video Embed Link</label>
                    <input
                      type="url"
                      className="form-control rounded-3"
                      name="youtube_url"
                      value={formData.youtube_url}
                      onChange={handleChange}
                      placeholder="https://www.youtube.com/embed/..."
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">PDF Document URL</label>
                    <input
                      type="url"
                      className="form-control rounded-3"
                      name="pdf_url"
                      value={formData.pdf_url}
                      onChange={handleChange}
                      placeholder="https://example.com/whitepaper.pdf"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: SEO & METADATA */}
              {activeTab === 'seo' && (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">SEO Meta Title</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleChange}
                      placeholder="Meta Title for search engines..."
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">SEO Meta Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleChange}
                      placeholder="Meta Description snippet..."
                    ></textarea>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="modal-footer bg-light rounded-bottom-4 p-3">
            <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" form="admin-blog-form" className="btn btn-primary rounded-pill px-4 fw-bold">
              <i className="fas fa-save me-1"></i> Save Article
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminBlogModal;
