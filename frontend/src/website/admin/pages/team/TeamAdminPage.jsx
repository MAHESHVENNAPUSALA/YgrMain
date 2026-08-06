import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import ImageUploader from '../../components/ImageUploader';
import teamApi from '../../api/teamApi';
import { useToast } from '../../hooks/useToast';
import { getImageUrl } from '../../utils/formatters';

const TeamAdminPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '5+ Years',
    is_active: true,
    image: null
  });

  const loadTeam = async () => {
    setLoading(true);
    const data = await teamApi.getAll();
    setTeamMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleOpenAdd = () => {
    setSelectedMember(null);
    setFormData({ name: '', role: 'Senior Software Engineer', experience: '5+ Years', is_active: true, image: null });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedMember(item);
    setFormData({
      name: item.name || '',
      role: item.role || '',
      experience: item.experience || '5+ Years',
      is_active: item.is_active ?? true,
      image: item.image || null
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    let res;
    if (selectedMember) {
      res = await teamApi.update(selectedMember.id, data);
    } else {
      res = await teamApi.create(data);
    }

    if (res.success !== false) {
      addToast(selectedMember ? 'Team member updated!' : 'Team member created!');
      setModalOpen(false);
      loadTeam();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedMember) return;
    const res = await teamApi.delete(selectedMember.id);
    if (res.success !== false) {
      addToast('Team member deleted!');
      setDeleteModalOpen(false);
      loadTeam();
    } else {
      addToast('Failed to delete member', 'error');
    }
  };

  const filteredMembers = teamMembers.filter((m) =>
    (m.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      label: 'Photo',
      key: 'image',
      width: '80px',
      render: (row) => {
        const src = getImageUrl(row.image);
        return src ? (
          <img
            src={src}
            alt="Avatar"
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: '20px' }}>👤</span>
        );
      }
    },
    { label: 'Name', key: 'name' },
    { label: 'Designation / Role', key: 'role' },
    {
      label: 'Visibility',
      key: 'is_active',
      render: (row) => (
        <span className={`admin-status-pill ${row.is_active !== false ? 'success' : 'danger'}`}>
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
              setSelectedMember(row);
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
        title="Team Members"
        subtitle="Manage company leadership, team roster, designations, and profiles"
        breadcrumbItems={[{ label: 'Team' }]}
        actionButton={
          <ActionButton icon="➕" onClick={handleOpenAdd}>
            Add Member
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search team members..." />
        </div>
      </div>

      <DataTable columns={columns} data={filteredMembers} loading={loading} emptyMessage="No team members found" />

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedMember ? 'Edit Team Member' : 'Add Team Member'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Designation / Role</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>

                <ImageUploader
                  label="Profile Photo"
                  value={formData.image}
                  onChange={(file) => setFormData({ ...formData, image: file })}
                />
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedMember?.name}
      />
    </div>
  );
};

export default TeamAdminPage;
