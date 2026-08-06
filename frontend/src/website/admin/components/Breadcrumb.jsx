import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="admin-breadcrumb">
      <Link to="/admin/website/dashboard">Admin</Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <span className="admin-breadcrumb-sep">/</span>
            {isLast || !item.link ? (
              <span className="admin-breadcrumb-current">{item.label}</span>
            ) : (
              <Link to={item.link}>{item.label}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
