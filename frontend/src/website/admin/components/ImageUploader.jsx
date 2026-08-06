import React, { useRef } from 'react';

const ImageUploader = ({ label = 'Upload Image', value, onChange, multiple = false, name = 'image' }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (multiple) {
      onChange(files);
    } else {
      onChange(files[0]);
    }
  };

  const renderPreview = () => {
    if (!value) return null;

    const items = Array.isArray(value) ? value : [value];

    return (
      <div className="admin-uploader-preview-grid">
        {items.map((item, idx) => {
          let src = '';
          if (typeof item === 'string') src = item;
          else if (item instanceof File) src = URL.createObjectURL(item);

          return (
            <div key={idx} className="admin-uploader-preview-item">
              <img src={src} alt="Preview" />
              <button
                type="button"
                className="admin-uploader-remove-btn"
                onClick={() => {
                  if (multiple) {
                    onChange(value.filter((_, i) => i !== idx));
                  } else {
                    onChange(null);
                  }
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="admin-form-group">
      {label && <label>{label}</label>}
      <div
        className="admin-uploader-dropzone"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>🖼️</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--admin-primary)' }}>
          Click or Drag image file to upload
        </span>
        <span style={{ fontSize: '11px', color: 'var(--admin-text-muted)', display: 'block' }}>
          Supports PNG, JPG, WEBP, SVG
        </span>
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept="image/*"
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {renderPreview()}
    </div>
  );
};

export default ImageUploader;
