import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import internshipsApi from '../../api/internshipsApi';
import { useToast } from '../../hooks/useToast';

const InternshipsAdminPage = () => {
  const [activeTab, setActiveTab] = useState('programs'); // 'programs' | 'registrations'
  const [programs, setPrograms] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    duration: '3 Months',
    fee: '$299',
    skills: 'React, Node.js, AWS',
    technologies: 'Full Stack Web Development',
    syllabus: 'HTML, CSS, JS, React, Node, Express, MongoDB',
    description: '',
    status: true
  });

  const loadData = async () => {
    setLoading(true);
    const [pData, rData] = await Promise.all([
      internshipsApi.getAllPrograms(),
      internshipsApi.getRegistrations()
    ]);
    setPrograms(pData);
    setRegistrations(rData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEditProgram = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title || '',
      duration: item.duration || '3 Months',
      fee: item.fee || '$299',
      skills: item.skills || 'React, Python',
      technologies: item.technologies || 'Web Stack',
      syllabus: item.syllabus || '',
      description: item.description || '',
      status: item.status ?? true
    });
    setModalOpen(true);
  };

  const handleSubmitProgram = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('duration', formData.duration);
    data.append('description', formData.description);

    let res;
    if (selectedItem) {
      res = await internshipsApi.updateProgram(selectedItem.id, data);
    } else {
      res = await internshipsApi.updateProgram(0, data);
    }

    if (res.success !== false) {
      addToast('Internship program saved!');
      setModalOpen(false);
      loadData();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDeleteProgram = async () => {
    if (!selectedItem) return;
    const res = await internshipsApi.deleteProgram(selectedItem.id);
    if (res.success !== false) {
      addToast('Program deleted!');
      setDeleteModalOpen(false);
      loadData();
    } else {
      addToast('Failed to delete program', 'error');
    }
  };

  const filteredPrograms = programs.filter((p) =>
    (p.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegistrations = registrations.filter((r) =>
    (r.username || r.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const programColumns = [
    { label: 'Program Title', key: 'title' },
    { label: 'Duration', key: 'duration' },
    { label: 'Syllabus Outline', key: 'syllabus', render: (row) => row.syllabus?.substring(0, 50) + '...' },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => handleOpenEditProgram(row)}>✏️ Edit</button>
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

  const regColumns = [
    { label: 'Student Name', key: 'username', render: (row) => row.username || row.name },
    { label: 'Email', key: 'email' },
    { label: 'College / Address', key: 'clg_name', render: (row) => row.clg_name || row.address },
    {
      label: 'Payment Status',
      key: 'is_paid',
      render: (row) => (
        <span className={`admin-status-pill ${row.is_paid ? 'success' : 'warning'}`}>
          <span className="admin-status-dot" />
          {row.is_paid ? 'Paid' : 'Pending'}
        </span>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Internship Programs"
        subtitle="Manage training programs, course syllabus checklists, fees, skills, and enrolled students"
        breadcrumbItems={[{ label: 'Internships' }]}
      />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          className={`admin-btn ${activeTab === 'programs' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
          onClick={() => setActiveTab('programs')}
        >
          🎓 Programs ({programs.length})
        </button>
        <button
          className={`admin-btn ${activeTab === 'registrations' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
          onClick={() => setActiveTab('registrations')}
        >
          👥 Student Registrations ({registrations.length})
        </button>
      </div>

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search programs or students..." />
        </div>
      </div>

      {activeTab === 'programs' ? (
        <DataTable columns={programColumns} data={filteredPrograms} loading={loading} emptyMessage="No internship programs found" />
      ) : (
        <DataTable columns={regColumns} data={filteredRegistrations} loading={loading} emptyMessage="No student registrations found" />
      )}

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedItem ? 'Edit Internship Program' : 'Add Program'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmitProgram}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Program Title</label>
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
                    <label>Duration</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Registration Fee</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Curriculum & Syllabus Checklist</label>
                  <textarea
                    className="admin-form-control"
                    rows={4}
                    value={formData.syllabus}
                    onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteProgram}
        itemName={selectedItem?.title}
      />
    </div>
  );
};

export default InternshipsAdminPage;
