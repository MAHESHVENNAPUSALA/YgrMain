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
import portfolioApi from '../../api/portfolioApi';
import { useToast } from '../../hooks/useToast';
import { getImageUrl } from '../../utils/formatters';

const PortfolioAdminPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    time_taken: '',
    link: '',
    github_url: '',
    category: 'Web App',
    tech_stack: 'React, Node.js, Python',
    case_study: '',
    is_featured: false,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    meta_title: '',
    meta_description: ''
  });

  const loadPortfolios = async () => {
    setLoading(true);
    const data = await portfolioApi.getAll();
    setPortfolios(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  const handleOpenAdd = () => {
    setSelectedPortfolio(null);
    setFormData({
      name: '',
      time_taken: '2 Months',
      link: 'https://',
      github_url: '',
      category: 'Web App',
      tech_stack: 'React, Django, PostgreSQL',
      case_study: '',
      is_featured: false,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      meta_title: '',
      meta_description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedPortfolio(item);
    setFormData({
      name: item.name || '',
      time_taken: item.time_taken || '',
      link: item.link || '',
      github_url: item.github_url || '',
      category: item.category || 'Web App',
      tech_stack: item.tech_stack || 'React, Python',
      case_study: item.case_study || '',
      is_featured: item.is_featured || false,
      image1: item.image1 || null,
      image2: item.image2 || null,
      image3: item.image3 || null,
      image4: item.image4 || null,
      meta_title: item.meta_title || '',
      meta_description: item.meta_description || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('time_taken', formData.time_taken);
    data.append('link', formData.link);
    data.append('github_url', formData.github_url || '');
    data.append('category', formData.category || 'Web App');
    data.append('tech_stack', formData.tech_stack || '');
    data.append('case_study', formData.case_study || '');
    data.append('is_featured', formData.is_featured ? 'true' : 'false');
    data.append('meta_title', formData.meta_title || '');
    data.append('meta_description', formData.meta_description || '');

    if (formData.image1 instanceof File) data.append('image1', formData.image1);
    if (formData.image2 instanceof File) data.append('image2', formData.image2);
    if (formData.image3 instanceof File) data.append('image3', formData.image3);
    if (formData.image4 instanceof File) data.append('image4', formData.image4);

    let res;
    if (selectedPortfolio) {
      res = await portfolioApi.update(selectedPortfolio.id, data);
    } else {
      res = await portfolioApi.create(data);
    }

    if (res.success !== false) {
      addToast(selectedPortfolio ? 'Portfolio updated successfully!' : 'Portfolio added successfully!');
      setModalOpen(false);
      loadPortfolios();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedPortfolio) return;
    const res = await portfolioApi.delete(selectedPortfolio.id);
    if (res.success !== false) {
      addToast('Portfolio item deleted successfully!');
      setDeleteModalOpen(false);
      loadPortfolios();
    } else {
      addToast('Failed to delete portfolio item', 'error');
    }
  };

  const filteredPortfolios = portfolios.filter((item) => {
    const matchesSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter ? (item.category || '') === categoryFilter : true;
    return matchesSearch && matchesCat;
  });

  const columns = [
    {
      label: 'Thumbnail',
      key: 'image1',
      width: '90px',
      render: (row) => {
        const src = getImageUrl(row.image1);
        return src ? (
          <img
            src={src}
            alt="Thumbnail"
            style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
          />
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}>No image</span>
        );
      }
    },
    { label: 'Portfolio Name', key: 'name' },
    { label: 'Duration', key: 'time_taken' },
    {
      label: 'Live Demo URL',
      key: 'link',
      render: (row) => (
        <a href={row.link} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-secondary)', textDecoration: 'none' }}>
          {row.link ? 'View Demo ↗' : 'N/A'}
        </a>
      )
    },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setPreviewItem(row)}>👁️ Case Study</button>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => handleOpenEdit(row)}>✏️ Edit</button>
          <button
            className="admin-btn admin-btn-sm admin-btn-danger"
            onClick={() => {
              setSelectedPortfolio(row);
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
        title="Portfolio Management"
        subtitle="Manage dynamic portfolio projects, case studies, technology stacks, and multi-image galleries"
        breadcrumbItems={[{ label: 'Portfolio' }]}
        actionButton={
          <ActionButton icon="➕" onClick={handleOpenAdd}>
            Add Portfolio Item
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search portfolio projects..." />
          <FilterBar
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              { label: 'Web App', value: 'Web App' },
              { label: 'Mobile App', value: 'Mobile App' },
              { label: 'Enterprise Software', value: 'Enterprise Software' },
              { label: 'UI/UX Design', value: 'UI/UX Design' }
            ]}
          />
        </div>
      </div>

      <DataTable columns={columns} data={filteredPortfolios} loading={loading} emptyMessage="No portfolio items found" />
      <Pagination currentPage={currentPage} totalPages={1} totalItems={filteredPortfolios.length} onPageChange={setCurrentPage} />

      {/* Modal Form */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedPortfolio ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Portfolio Title / Name</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Duration / Time Taken</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      placeholder="e.g. 3 Months"
                      value={formData.time_taken}
                      onChange={(e) => setFormData({ ...formData, time_taken: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Live Demo URL</label>
                    <input
                      type="url"
                      className="admin-form-control"
                      required
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>GitHub Repository URL</label>
                    <input
                      type="url"
                      className="admin-form-control"
                      value={formData.github_url}
                      onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Technology Stack (Comma separated)</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="React, Django, Python, AWS"
                    value={formData.tech_stack}
                    onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  />
                </div>

                <RichTextEditor
                  label="Case Study / Detailed Description"
                  value={formData.case_study}
                  onChange={(val) => setFormData({ ...formData, case_study: val })}
                />

                <div style={{ borderTop: '1px solid var(--admin-border-color)', paddingTop: '16px', marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: 'var(--admin-primary)' }}>Gallery Manager (Upload Images)</h4>
                  <div className="admin-form-grid">
                    <ImageUploader label="Primary Thumbnail (Image 1)" value={formData.image1} onChange={(f) => setFormData({ ...formData, image1: f })} />
                    <ImageUploader label="Gallery Image 2" value={formData.image2} onChange={(f) => setFormData({ ...formData, image2: f })} />
                    <ImageUploader label="Gallery Image 3" value={formData.image3} onChange={(f) => setFormData({ ...formData, image3: f })} />
                    <ImageUploader label="Gallery Image 4" value={formData.image4} onChange={(f) => setFormData({ ...formData, image4: f })} />
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Portfolio Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Case Study Preview Modal */}
      {previewItem && (
        <div className="admin-modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Portfolio Case Study: {previewItem.name}</h3>
              <button className="admin-modal-close-btn" onClick={() => setPreviewItem(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                {previewItem.image1 && <img src={getImageUrl(previewItem.image1)} alt="Gallery 1" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />}
                {previewItem.image2 && <img src={getImageUrl(previewItem.image2)} alt="Gallery 2" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />}
                {previewItem.image3 && <img src={getImageUrl(previewItem.image3)} alt="Gallery 3" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />}
                {previewItem.image4 && <img src={getImageUrl(previewItem.image4)} alt="Gallery 4" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />}
              </div>
              <p style={{ fontWeight: '600', color: 'var(--admin-secondary)', marginBottom: '8px' }}>Duration: {previewItem.time_taken}</p>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-main)' }}>{previewItem.case_study || 'No detailed case study entered.'}</p>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedPortfolio?.name}
      />
    </div>
  );
};

export default PortfolioAdminPage;
