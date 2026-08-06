import React, { useRef } from 'react';

const FileUploader = ({ label = 'Upload Document', value, onChange, accept = '.pdf,.doc,.docx', name = 'file' }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onChange(file);
  };

  return (
    <div className="admin-form-group">
      {label && <label>{label}</label>}
      <div
        className="admin-uploader-dropzone"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>📄</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--admin-primary)' }}>
          {value ? (value.name || 'File Selected') : 'Click to select document file'}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--admin-text-muted)', display: 'block' }}>
          Allowed types: {accept}
        </span>
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept={accept}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;
