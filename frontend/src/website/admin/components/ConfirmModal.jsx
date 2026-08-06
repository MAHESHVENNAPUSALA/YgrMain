import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure you want to proceed?', confirmText = 'Confirm', variant = 'primary', loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>{title}</h3>
          <button className="admin-modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body">
          <p style={{ margin: 0, fontSize: '15px', color: 'var(--admin-text-main)' }}>{message}</p>
        </div>
        <div className="admin-modal-footer">
          <button className="admin-btn admin-btn-outline" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className={`admin-btn admin-btn-${variant}`} onClick={onConfirm} disabled={loading}>
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
