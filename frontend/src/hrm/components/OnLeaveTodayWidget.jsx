import React from 'react';

const OnLeaveTodayWidget = ({ onLeaveList }) => {
  if (!onLeaveList || onLeaveList.length === 0) {
    return (
      <div className="card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e8edf2', overflow: 'hidden' }}>
        <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-umbrella-beach" style={{ color: '#f59e0b', fontSize: '18px' }}></i>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>On Leave Today</h3>
        </div>
        <div className="card-body" style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          No employees are on leave today.
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e8edf2', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="fa-solid fa-umbrella-beach" style={{ color: '#f59e0b', fontSize: '18px' }}></i>
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>On Leave Today</h3>
      </div>
      <div className="card-body" style={{ padding: '0', maxHeight: '250px', overflowY: 'auto' }}>
        {onLeaveList.map((emp, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{emp.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{emp.emp_id}</div>
            </div>
            <span style={{ fontSize: '0.7rem', padding: '4px 8px', background: '#fef3c7', color: '#d97706', borderRadius: '12px', fontWeight: 700 }}>{emp.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnLeaveTodayWidget;
