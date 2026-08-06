import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import FilterBar from '../../components/FilterBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import contactApi from '../../api/contactApi';
import { useToast } from '../../hooks/useToast';
import { exportToCSV } from '../../utils/exportUtils';
import { formatDate } from '../../utils/formatters';

const ContactAdminPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewModal, setViewModal] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const { addToast } = useToast();

  const loadEnquiries = async () => {
    setLoading(true);
    const data = await contactApi.getAll();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!viewModal || !replyMessage.trim()) return;

    const res = await contactApi.reply(viewModal.id, replyMessage);
    if (res.success !== false) {
      addToast('Reply sent successfully!');
      setViewModal(null);
      setReplyMessage('');
      loadEnquiries();
    } else {
      addToast('Failed to send reply', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedEnquiry) return;
    const res = await contactApi.delete(selectedEnquiry.id);
    if (res.success !== false) {
      addToast('Enquiry deleted!');
      setDeleteModalOpen(false);
      loadEnquiries();
    } else {
      addToast('Failed to delete enquiry', 'error');
    }
  };

  const handleExportCSV = () => {
    const formatted = enquiries.map((e) => ({
      Name: e.name,
      Company: e.company || 'N/A',
      Email: e.email,
      Phone: e.phone || 'N/A',
      Service: e.service || 'General',
      Message: e.message,
      Status: e.status || 'New',
      Date: formatDate(e.created_at)
    }));
    exportToCSV(formatted, 'Contact_Enquiries_Export.csv');
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = (e.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? (e.status || 'New') === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { label: 'Sender Name', key: 'name' },
    { label: 'Company', key: 'company', render: (row) => row.company || '-' },
    { label: 'Email', key: 'email' },
    { label: 'Requested Service', key: 'service', render: (row) => row.service || 'General Enquiry' },
    { label: 'Date', key: 'created_at', render: (row) => formatDate(row.created_at) },
    {
      label: 'Status',
      key: 'status',
      render: (row) => (
        <span className={`admin-status-pill ${row.status === 'Replied' ? 'success' : row.status === 'Archived' ? 'danger' : 'warning'}`}>
          <span className="admin-status-dot" />
          {row.status || 'New'}
        </span>
      )
    },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setViewModal(row)}>👁️ View & Reply</button>
          <button
            className="admin-btn admin-btn-sm admin-btn-danger"
            onClick={() => {
              setSelectedEnquiry(row);
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
        title="Contact Enquiries"
        subtitle="Review prospective client messages, respond, archive leads, and export enquiry data"
        breadcrumbItems={[{ label: 'Contact Enquiries' }]}
        actionButton={
          <ActionButton icon="📥" variant="secondary" onClick={handleExportCSV}>
            Export Enquiries CSV
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search messages or email..." />
          <FilterBar
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'New', value: 'New' },
              { label: 'Read', value: 'Read' },
              { label: 'Replied', value: 'Replied' },
              { label: 'Archived', value: 'Archived' }
            ]}
          />
        </div>
      </div>

      <DataTable columns={columns} data={filteredEnquiries} loading={loading} emptyMessage="No contact enquiries received" />

      {/* Detail & Reply Modal */}
      {viewModal && (
        <div className="admin-modal-backdrop" onClick={() => setViewModal(null)}>
          <div className="admin-modal-box lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Enquiry from: {viewModal.name}</h3>
              <button className="admin-modal-close-btn" onClick={() => setViewModal(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-grid" style={{ marginBottom: '16px' }}>
                <div><strong>Email:</strong> {viewModal.email}</div>
                <div><strong>Phone:</strong> {viewModal.phone || 'N/A'}</div>
                <div><strong>Company:</strong> {viewModal.company || 'N/A'}</div>
                <div><strong>Requested Service:</strong> {viewModal.service || 'General'}</div>
              </div>

              <div style={{ background: 'var(--admin-bg)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--admin-primary)' }}>Message Content:</strong>
                <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-wrap' }}>{viewModal.message}</p>
              </div>

              <form onSubmit={handleSendReply}>
                <div className="admin-form-group">
                  <label>Send Direct Email Reply</label>
                  <textarea
                    className="admin-form-control"
                    rows={4}
                    required
                    placeholder="Type response to send to applicant/client email..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" className="admin-btn admin-btn-outline" onClick={() => setViewModal(null)}>Close</button>
                  <button type="submit" className="admin-btn admin-btn-primary">Send Email Reply</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedEnquiry?.name}
      />
    </div>
  );
};

export default ContactAdminPage;
