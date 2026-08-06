import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const DataTable = ({ columns = [], data = [], loading = false, emptyMessage = 'No records found' }) => {
  if (loading) {
    return <LoadingSpinner message="Loading records..." />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title="No Data Available" description={emptyMessage} />;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={col.key || index} style={{ width: col.width || 'auto' }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={col.key || colIndex}>
                  {col.render ? col.render(row, rowIndex) : row[col.key] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
