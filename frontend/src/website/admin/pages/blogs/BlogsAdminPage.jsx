import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import FilterBar from '../../components/FilterBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import ImageUploader from '../../components/ImageUploader';
import RichTextEditor from '../../components/RichTextEditor';
import Pagination from '../../components/Pagination';
import blogsApi from '../../api/blogsApi';
import { useToast } from '../../hooks/useToast';
import { getImageUrl, formatDate } from '../../utils/formatters';

const BlogsAdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    content: '',
    author_name: 'YGR Tech Team',
    category: '',
    tags: 'Technology, Web, AI',
    is_featured: false,
    is_published: true,
    image: null,
    meta_title: '',
    meta_description: ''
  });

  const loadBlogs = async () => {
    setLoading(true);
    const [blogData, catData, authData] = await Promise.all([
      blogsApi.getAll(),
      blogsApi.getCategories(),
      blogsApi.getAuthors()
    ]);
    setBlogs(blogData);
    setCategories(catData);
    setAuthors(authData);
    setLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleOpenAdd = () => {
    setSelectedBlog(null);
    setFormData({
      title: '',
      short_description: '',
      content: '',
      author_name: 'YGR Tech Team',
      category: categories.length > 0 ? categories[0].id : '',
      tags: 'Tech, Innovation',
      is_featured: false,
      is_published: true,
      image: null,
      meta_title: '',
      meta_description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || '',
      short_description: blog.short_description || '',
      content: blog.content || '',
      author_name: blog.author_name || 'YGR Tech Team',
      category: blog.category?.id || blog.category || '',
      tags: 'Tech, Software',
      is_featured: blog.is_featured || false,
      is_published: blog.is_published ?? true,
      image: blog.image || blog.image_url || null,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('short_description', formData.short_description);
    data.append('content', formData.content);
    data.append('author_name', formData.author_name);
    data.append('is_featured', formData.is_featured);
    data.append('is_published', formData.is_published);
    data.append('meta_title', formData.meta_title);
    data.append('meta_description', formData.meta_description);

    if (formData.category) data.append('category', formData.category);
    if (formData.image instanceof File) data.append('image', formData.image);

    let res;
    if (selectedBlog) {
      res = await blogsApi.update(selectedBlog.id, data);
    } else {
      res = await blogsApi.create(data);
    }

    if (res.success !== false) {
      addToast(selectedBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
      setModalOpen(false);
      loadBlogs();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedBlog) return;
    const res = await blogsApi.delete(selectedBlog.id);
    if (res.success !== false) {
      addToast('Blog deleted successfully!');
      setDeleteModalOpen(false);
      loadBlogs();
    } else {
      addToast('Failed to delete blog', 'error');
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = (b.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const columns = [
    {
      label: 'Image',
      key: 'image',
      width: '90px',
      render: (row) => {
        const src = getImageUrl(row.image || row.image_url);
        return src ? (
          <img
            src={src}
            alt="Blog"
            style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
          />
        ) : (
          <span style={{ fontSize: '11px', color: 'var(--admin-text-muted)' }}>No image</span>
        );
      }
    },
    { label: 'Title', key: 'title' },
    { label: 'Author', key: 'author_name', render: (row) => row.author_name || 'YGR Team' },
    { label: 'Date', key: 'created_at', render: (row) => formatDate(row.created_at) },
    {
      label: 'Status',
      key: 'is_published',
      render: (row) => (
        <span className={`admin-status-pill ${row.is_published !== false ? 'success' : 'warning'}`}>
          <span className="admin-status-dot" />
          {row.is_published !== false ? 'Published' : 'Draft'}
        </span>
      )
    },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => handleOpenEdit(row)}>✏️ Edit</button>
          <button
            className="admin-btn admin-btn-sm admin-btn-danger"
            onClick={() => {
              setSelectedBlog(row);
              setDeleteModalOpen(true);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Blog Articles & News"
        subtitle="Create, edit, rich-text format, and publish company blog posts"
        breadcrumbItems={[{ label: 'Blogs' }]}
        actionButton={
          <ActionButton icon="➕" onClick={handleOpenAdd}>
            Create Blog
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search blog articles..." />
        </div>
      </div>

      <DataTable columns={columns} data={filteredBlogs} loading={loading} emptyMessage="No blog articles found" />
      <Pagination currentPage={currentPage} totalPages={1} totalItems={filteredBlogs.length} onPageChange={setCurrentPage} />

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Article Title</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Author Name</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Tags (Comma separated)</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Short Summary / Abstract</label>
                  <textarea
                    className="admin-form-control"
                    rows={2}
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  />
                </div>

                <RichTextEditor
                  label="Full Article Content"
                  value={formData.content}
                  onChange={(val) => setFormData({ ...formData, content: val })}
                />

                <ImageUploader
                  label="Featured Article Image"
                  value={formData.image}
                  onChange={(file) => setFormData({ ...formData, image: file })}
                />

                <div style={{ display: 'flex', gap: '20px', margin: '16px 0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    />
                    <span>Publish Immediately</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <span>Feature on Homepage</span>
                  </label>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedBlog?.title}
      />
    </div>
  );
};

export default BlogsAdminPage;
