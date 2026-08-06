import React from 'react';
import Breadcrumb from './Breadcrumb';

const PageHeader = ({ title, subtitle, breadcrumbItems = [], actionButton }) => {
  return (
    <div className="admin-page-header">
      <div>
        {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
        <h1 className="admin-page-header-title">{title}</h1>
        {subtitle && <p className="admin-page-header-subtitle">{subtitle}</p>}
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};

export default PageHeader;
