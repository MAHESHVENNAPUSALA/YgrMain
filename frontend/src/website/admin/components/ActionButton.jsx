import React from 'react';

const ActionButton = ({ children, variant = 'primary', size = 'md', onClick, disabled = false, icon, type = 'button' }) => {
  const variantClass = `admin-btn-${variant}`;
  const sizeClass = size !== 'md' ? `admin-btn-${size}` : '';

  return (
    <button
      type={type}
      className={`admin-btn ${variantClass} ${sizeClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default ActionButton;
