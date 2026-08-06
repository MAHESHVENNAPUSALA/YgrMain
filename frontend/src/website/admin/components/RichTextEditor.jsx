import React from 'react';

const RichTextEditor = ({ label = 'Content', value = '', onChange, placeholder = 'Write details here...' }) => {
  return (
    <div className="admin-form-group">
      {label && <label>{label}</label>}
      <div style={{ border: '1px solid var(--admin-border-color)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '6px 12px', background: 'var(--admin-bg)', borderBottom: '1px solid var(--admin-border-color)', display: 'flex', gap: '8px' }}>
          <button type="button" className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => onChange(value + '<b>Bold Text</b>')}><b>B</b></button>
          <button type="button" className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => onChange(value + '<i>Italic Text</i>')}><i>I</i></button>
          <button type="button" className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => onChange(value + '\n• Bullet Point')}>• List</button>
        </div>
        <textarea
          className="admin-form-control"
          rows={6}
          style={{ border: 'none', borderRadius: 0 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
