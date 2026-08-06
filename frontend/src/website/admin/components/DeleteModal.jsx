import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName = 'item', loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>Confirm Deletion</h3>
          <button className="admin-modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body">
          <p style={{ margin: 0, fontSize: '15px', color: 'var(--admin-text-main)' }}>
            Are you sure you want to delete <strong>"{itemName}"</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="admin-modal-footer">
          <button className="admin-btn admin-btn-outline" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
