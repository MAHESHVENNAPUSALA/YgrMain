import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import FilterBar from '../../components/FilterBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import ImageUploader from '../../components/ImageUploader';
import servicesApi from '../../api/servicesApi';
import { useToast } from '../../hooks/useToast';

const ServicesAdminPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Software Development',
    icon: '⚡',
    description: '',
    bannerImage: null,
    visibility: true,
    metaTitle: '',
    metaDescription: ''
  });

  const loadServices = async () => {
    setLoading(true);
    const data = await servicesApi.getAll();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setSelectedService(null);
    setFormData({
      title: '',
      category: 'Software Development',
      icon: '⚡',
      description: '',
      bannerImage: null,
      visibility: true,
      metaTitle: '',
      metaDescription: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title || service.name || '',
      category: service.category || 'Software Development',
      icon: service.icon || '⚡',
      description: service.description || '',
      bannerImage: service.bannerImage || null,
      visibility: service.visibility ?? true,
      metaTitle: service.metaTitle || '',
      metaDescription: service.metaDescription || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (selectedService) {
      res = await servicesApi.update(selectedService.id, formData);
    } else {
      res = await servicesApi.create(formData);
    }

    if (res.success !== false) {
      addToast(selectedService ? 'Service updated successfully!' : 'Service created successfully!');
      setModalOpen(false);
      loadServices();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;
    const res = await servicesApi.delete(selectedService.id);
    if (res.success !== false) {
      addToast('Service deleted successfully!');
      setDeleteModalOpen(false);
      loadServices();
    } else {
      addToast('Failed to delete service', 'error');
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch = (s.title || s.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter ? (s.category || '') === categoryFilter : true;
    return matchesSearch && matchesCat;
  });

  const columns = [
    {
      label: 'Icon',
      key: 'icon',
      width: '60px',
      render: (row) => <span style={{ fontSize: '20px' }}>{row.icon || '⚡'}</span>
    },
    { label: 'Service Name', key: 'title', render: (row) => row.title || row.name },
    { label: 'Category', key: 'category' },
    {
      label: 'Visibility',
      key: 'visibility',
      render: (row) => (
        <span className={`admin-status-pill ${row.visibility !== false ? 'success' : 'danger'}`}>
          <span className="admin-status-dot" />
          {row.visibility !== false ? 'Visible' : 'Hidden'}
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
              setSelectedService(row);
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
        title="Services & Offerings"
        subtitle="Manage dynamic company services, icons, banners, and SEO settings"
        breadcrumbItems={[{ label: 'Services' }]}
        actionButton={
          <ActionButton icon="➕" onClick={handleOpenAdd}>
            Add Service
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search services..." />
          <FilterBar
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              { label: 'Software Development', value: 'Software Development' },
              { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
              { label: 'Mobile Apps', value: 'Mobile Apps' },
              { label: 'Cybersecurity', value: 'Cybersecurity' }
            ]}
          />
        </div>
      </div>

      <DataTable columns={columns} data={filteredServices} loading={loading} emptyMessage="No services found" />

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedService ? 'Edit Service' : 'Add New Service'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Service Title</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Icon Emoji or Class Name</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Service Description</label>
                  <textarea
                    className="admin-form-control"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <ImageUploader
                  label="Service Banner Image"
                  value={formData.bannerImage}
                  onChange={(file) => setFormData({ ...formData, bannerImage: file })}
                />

                <div className="admin-form-group">
                  <label>SEO Meta Title</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>SEO Meta Description</label>
                  <textarea
                    className="admin-form-control"
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedService?.title || selectedService?.name}
      />
    </div>
  );
};

export default ServicesAdminPage;
