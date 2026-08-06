import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--admin-text-muted)' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid var(--admin-border-color)',
          borderTopColor: 'var(--admin-secondary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 12px auto'
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
