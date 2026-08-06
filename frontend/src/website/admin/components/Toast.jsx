import React from 'react';
import { useToast } from '../hooks/useToast';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="admin-toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`admin-toast ${toast.type || 'info'}`}>
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-muted)', fontSize: '14px' }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
