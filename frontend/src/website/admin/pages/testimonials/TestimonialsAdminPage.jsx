import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import testimonialsApi from '../../api/testimonialsApi';
import { useToast } from '../../hooks/useToast';

const TestimonialsAdminPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    country: 'United States',
    message: '',
    is_active: true
  });

  const loadTestimonials = async () => {
    setLoading(true);
    const data = await testimonialsApi.getAll();
    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setFormData({ client_name: '', company_name: '', country: 'United States', message: '', is_active: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      client_name: item.client_name || '',
      company_name: item.company_name || '',
      country: item.country || 'United States',
      message: item.message || '',
      is_active: item.is_active ?? true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('client_name', formData.client_name);
    data.append('company_name', formData.company_name);
    data.append('country', formData.country);
    data.append('message', formData.message);
    data.append('is_active', formData.is_active ? 'on' : 'off');

    let res;
    if (selectedItem) {
      res = await testimonialsApi.update(selectedItem.id, data);
    } else {
      res = await testimonialsApi.create(data);
    }

    if (res.success !== false) {
      addToast(selectedItem ? 'Testimonial updated!' : 'Testimonial created!');
      setModalOpen(false);
      loadTestimonials();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleToggleStatus = async (item) => {
    const data = new FormData();
    data.append('client_name', item.client_name || '');
    data.append('company_name', item.company_name || '');
    data.append('country', item.country || '');
    data.append('message', item.message || '');
    data.append('is_active', item.is_active === false ? 'on' : 'off');

    const res = await testimonialsApi.update(item.id, data);
    if (res.success !== false) {
      addToast(`Testimonial status changed to ${item.is_active === false ? 'Active' : 'Inactive'}!`);
      loadTestimonials();
    } else {
      addToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    const res = await testimonialsApi.delete(selectedItem.id);
    if (res.success !== false) {
      addToast('Testimonial deleted!');
      setDeleteModalOpen(false);
      loadTestimonials();
    } else {
      addToast('Failed to delete testimonial', 'error');
    }
  };

  const filteredItems = testimonials.filter((t) =>
    (t.client_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.company_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { label: 'Client Name', key: 'client_name' },
    { label: 'Company Name', key: 'company_name' },
    { label: 'Country', key: 'country' },
    { label: 'Message', key: 'message', render: (row) => row.message?.substring(0, 60) + '...' },
    {
      label: 'Status',
      key: 'is_active',
      render: (row) => (
        <span
          className={`admin-status-pill ${row.is_active !== false ? 'success' : 'danger'}`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleToggleStatus(row)}
          title="Click to toggle Active/Inactive"
        >
          <span className="admin-status-dot" />
          {row.is_active !== false ? 'Active' : 'Inactive'}
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
              setSelectedItem(row);
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
        title="Client Testimonials"
        subtitle="Manage client reviews, testimonials, company designations, and active visibility"
        breadcrumbItems={[{ label: 'Testimonials' }]}
        actionButton={
          <ActionButton icon="➕" onClick={handleOpenAdd}>
            Add Testimonial
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search testimonials..." />
        </div>
      </div>

      <DataTable columns={columns} data={filteredItems} loading={loading} emptyMessage="No testimonials found" />

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedItem ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Feedback Message</label>
                  <textarea
                    className="admin-form-control"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Status</label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      background: '#F8FAFC',
                      cursor: 'pointer'
                    }}
                    onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '22px',
                        borderRadius: '11px',
                        background: formData.is_active ? '#22c55e' : '#CBD5E1',
                        position: 'relative',
                        transition: 'background 0.25s',
                        flexShrink: 0
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          position: 'absolute',
                          top: '2px',
                          left: formData.is_active ? '22px' : '2px',
                          transition: 'left 0.25s',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.18)'
                        }}
                      />
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '14px', color: formData.is_active ? '#16a34a' : '#64748B' }}>
                      {formData.is_active ? '● Active — Visible on Website' : '○ Inactive — Hidden from Website'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedItem?.client_name}
      />
    </div>
  );
};

export default TestimonialsAdminPage;
