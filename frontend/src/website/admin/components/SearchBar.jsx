import React from 'react';

const SearchBar = ({ value = '', onChange, placeholder = 'Search...' }) => {
  return (
    <div className="admin-search-input-group">
      <span className="admin-search-icon-inside">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
