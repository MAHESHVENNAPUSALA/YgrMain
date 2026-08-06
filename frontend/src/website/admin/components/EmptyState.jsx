import React from 'react';

const EmptyState = ({ title = 'No Data Found', description = 'There are no items matching your request.', action }) => {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-icon">📁</div>
      <h3 className="admin-empty-title">{title}</h3>
      <p className="admin-empty-desc">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
