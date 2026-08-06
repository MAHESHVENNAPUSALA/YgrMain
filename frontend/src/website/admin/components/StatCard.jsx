import React from 'react';

const StatCard = ({ label, value, trend, icon }) => {
  return (
    <div className="admin-stat-card">
      <div>
        <div className="admin-stat-label">{label}</div>
        <div className="admin-stat-value">{value}</div>
        {trend && (
          <div className={`admin-stat-trend ${trend.type || 'neutral'}`}>
            <span>{trend.type === 'positive' ? '↑' : trend.type === 'negative' ? '↓' : '•'}</span>
            <span>{trend.text}</span>
          </div>
        )}
      </div>
      {icon && <div className="admin-stat-icon-wrapper">{icon}</div>}
    </div>
  );
};

export default StatCard;
