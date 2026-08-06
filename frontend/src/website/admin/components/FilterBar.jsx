import React from 'react';

const FilterBar = ({ options = [], value = '', onChange, label = 'Filter by' }) => {
  return (
    <select
      className="admin-select-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{label} (All)</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default FilterBar;
