import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import ImageUploader from '../../components/ImageUploader';
import clientsApi from '../../api/clientsApi';
import { useToast } from '../../hooks/useToast';
import { getImageUrl } from '../../utils/formatters';

const ClientsAdminPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Enterprise Development',
    logo: null,
    website: 'https://',
    priority: 1,
    visibility: true
  });

  const loadClients = async () => {
    setLoading(true);
    const data = await clientsApi.getAll();
    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleOpenAdd = () => {
    setSelectedClient(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Enterprise Development',
      logo: null,
      website: 'https://',
      priority: 1,
      visibility: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedClient(item);
    setFormData({
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      service: item.service || 'Enterprise Development',
      logo: item.logo || null,
      website: item.website || 'https://',
      priority: item.priority || 1,
      visibility: item.visibility ?? true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('service', formData.service);

    let res;
    if (selectedClient) {
      res = await clientsApi.update(selectedClient.id, data);
    } else {
      res = await clientsApi.create(data);
    }

    if (res.success !== false) {
      addToast(selectedClient ? 'Client updated!' : 'Client added!');
      setModalOpen(false);
      loadClients();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedClient) return;
    const res = await clientsApi.delete(selectedClient.id);
    if (res.success !== false) {
      addToast('Client deleted!');
      setDeleteModalOpen(false);
      loadClients();
    } else {
      addToast('Failed to delete client', 'error');
    }
  };

  const filteredClients = clients.filter((c) =>
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { label: 'Client Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Subscribed Service', key: 'service' },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => handleOpenEdit(row)}>✏️ Edit</button>
          <button
            className="admin-btn admin-btn-sm admin-btn-danger"
            onClick={() => {
              setSelectedClient(row);
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
        title="Clients & Corporate Partners"
        subtitle="Manage client portfolios, logos, contact info, priority placement, and active visibility"
        breadcrumbItems={[{ label: 'Clients' }]}
        actionButton={
          <ActionButton icon="➕" onClick={handleOpenAdd}>
            Add Client
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search clients..." />
        </div>
      </div>

      <DataTable columns={columns} data={filteredClients} loading={loading} emptyMessage="No client records found" />

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedClient ? 'Edit Client Record' : 'Add Client Record'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Client / Company Name</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      className="admin-form-control"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Contact Phone</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Subscribed Service</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Client</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedClient?.name}
      />
    </div>
  );
};

export default ClientsAdminPage;
