import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import careersApi from '../../api/careersApi';
import { useToast } from '../../hooks/useToast';
import { exportToCSV } from '../../utils/exportUtils';
import { formatDate } from '../../utils/formatters';

const CareersAdminPage = () => {
  const [activeTab, setActiveTab] = useState('vacancies'); // 'vacancies' | 'applications'
  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewAppModal, setViewAppModal] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    role: 'Frontend Developer',
    location: 'Hyderabad, India (Hybrid)',
    package: '$15,000 - $25,000 / year',
    description: '',
    requirements: '',
    vacancies: '3',
    is_active: true
  });

  const loadData = async () => {
    setLoading(true);
    const [vData, aData] = await Promise.all([
      careersApi.getVacancies(),
      careersApi.getApplications()
    ]);
    setVacancies(vData);
    setApplications(aData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddVacancy = () => {
    setSelectedItem(null);
    setFormData({
      title: '',
      role: 'Full Stack Engineer',
      location: 'Hyderabad, India (Hybrid)',
      package: '$15,000 - $25,000 / year',
      description: '',
      requirements: '',
      vacancies: '2',
      is_active: true
    });
    setModalOpen(true);
  };

  const handleOpenEditVacancy = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title || '',
      role: item.role || '',
      location: item.location || '',
      package: item.package || '',
      description: item.description || '',
      requirements: item.requirements || '',
      vacancies: item.vacancies || '1',
      is_active: item.is_active ?? true
    });
    setModalOpen(true);
  };

  const handleSubmitVacancy = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('role', formData.role);
    data.append('location', formData.location);
    data.append('package', formData.package);
    data.append('description', formData.description);
    data.append('requirements', formData.requirements);
    data.append('vacancies', formData.vacancies);

    let res;
    if (selectedItem) {
      res = await careersApi.updateVacancy(selectedItem.id, data);
    } else {
      res = await careersApi.createVacancy(data);
    }

    if (res.success !== false) {
      addToast(selectedItem ? 'Vacancy updated!' : 'Vacancy published!');
      setModalOpen(false);
      loadData();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDeleteVacancy = async () => {
    if (!selectedItem) return;
    const res = await careersApi.deleteVacancy(selectedItem.id);
    if (res.success !== false) {
      addToast('Vacancy deleted!');
      setDeleteModalOpen(false);
      loadData();
    } else {
      addToast('Failed to delete vacancy', 'error');
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    const res = await careersApi.updateApplicationStatus(appId, newStatus);
    if (res.success !== false) {
      addToast('Application status updated!');
      loadData();
      if (viewAppModal) setViewAppModal({ ...viewAppModal, status: newStatus });
    } else {
      addToast('Failed to update status', 'error');
    }
  };

  const handleExportCSV = () => {
    const formatted = applications.map((a) => ({
      Applicant_Name: `${a.first_name || ''} ${a.last_name || ''}`,
      Email: a.email,
      Phone: a.phone,
      Role: a.job_role,
      Qualification: a.highest_qualification,
      Status: a.status,
      Submitted_At: formatDate(a.submitted_at)
    }));
    exportToCSV(formatted, 'Job_Applications_Export.csv');
  };

  const filteredVacancies = vacancies.filter((v) =>
    (v.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter((a) =>
    (a.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.job_role || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const vacancyColumns = [
    { label: 'Job Title', key: 'title' },
    { label: 'Location', key: 'location' },
    { label: 'Openings', key: 'vacancies' },
    { label: 'Package / Salary', key: 'package' },
    {
      label: 'Status',
      key: 'is_active',
      render: (row) => (
        <span className={`admin-status-pill ${row.is_active !== false ? 'success' : 'danger'}`}>
          <span className="admin-status-dot" />
          {row.is_active !== false ? 'Active' : 'Closed'}
        </span>
      )
    },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => handleOpenEditVacancy(row)}>✏️ Edit</button>
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

  const appColumns = [
    {
      label: 'Candidate Name',
      key: 'first_name',
      render: (row) => `${row.first_name || ''} ${row.last_name || ''}`
    },
    { label: 'Applied Role', key: 'job_role' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Submitted Date', key: 'submitted_at', render: (row) => formatDate(row.submitted_at) },
    {
      label: 'Status',
      key: 'status',
      render: (row) => (
        <span className={`admin-status-pill ${row.status === 'onboarding' ? 'success' : row.status === 'not_selected' ? 'danger' : 'warning'}`}>
          <span className="admin-status-dot" />
          {row.status || 'Screening'}
        </span>
      )
    },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setViewAppModal(row)}>
          👁️ Review Application
        </button>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Careers & Job Management"
        subtitle="Post vacancies, review applicant profiles, manage recruitment pipelines, and export applications"
        breadcrumbItems={[{ label: 'Careers' }]}
        actionButton={
          activeTab === 'vacancies' ? (
            <ActionButton icon="➕" onClick={handleOpenAddVacancy}>
              Create Job Vacancy
            </ActionButton>
          ) : (
            <ActionButton icon="📥" variant="secondary" onClick={handleExportCSV}>
              Export CSV
            </ActionButton>
          )
        }
      />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          className={`admin-btn ${activeTab === 'vacancies' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
          onClick={() => setActiveTab('vacancies')}
        >
          💼 Job Vacancies ({vacancies.length})
        </button>
        <button
          className={`admin-btn ${activeTab === 'applications' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
          onClick={() => setActiveTab('applications')}
        >
          📥 Candidate Applications ({applications.length})
        </button>
      </div>

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={activeTab === 'vacancies' ? 'Search job vacancies...' : 'Search applicants...'}
          />
        </div>
      </div>

      {activeTab === 'vacancies' ? (
        <DataTable columns={vacancyColumns} data={filteredVacancies} loading={loading} emptyMessage="No job vacancies found" />
      ) : (
        <DataTable columns={appColumns} data={filteredApplications} loading={loading} emptyMessage="No applications received yet" />
      )}

      {/* Vacancy Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedItem ? 'Edit Job Vacancy' : 'Create New Job Vacancy'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmitVacancy}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Salary Package</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Job Description</label>
                  <textarea
                    className="admin-form-control"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Requirements</label>
                  <textarea
                    className="admin-form-control"
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Publish Vacancy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Application Modal */}
      {viewAppModal && (
        <div className="admin-modal-backdrop" onClick={() => setViewAppModal(null)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Applicant Profile: {viewAppModal.first_name} {viewAppModal.last_name}</h3>
              <button className="admin-modal-close-btn" onClick={() => setViewAppModal(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-grid">
                <div><strong>Applied Role:</strong> {viewAppModal.job_role}</div>
                <div><strong>Email:</strong> {viewAppModal.email}</div>
                <div><strong>Phone:</strong> {viewAppModal.phone}</div>
                <div><strong>Current City:</strong> {viewAppModal.current_city || 'N/A'}</div>
                <div><strong>Qualification:</strong> {viewAppModal.highest_qualification}</div>
                <div><strong>College/University:</strong> {viewAppModal.college_university}</div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Pipeline Hiring Status:</label>
                <select
                  className="admin-select-filter"
                  style={{ width: '100%' }}
                  value={viewAppModal.status || 'screening'}
                  onChange={(e) => handleUpdateStatus(viewAppModal.id, e.target.value)}
                >
                  <option value="screening">Screening in Progress</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="assessment">Online Assessment</option>
                  <option value="technical_interview">Technical Interview</option>
                  <option value="hr_interview">HR Interview</option>
                  <option value="onboarding">Onboarding / Hired</option>
                  <option value="not_selected">Not Selected</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteVacancy}
        itemName={selectedItem?.title}
      />
    </div>
  );
};

export default CareersAdminPage;
