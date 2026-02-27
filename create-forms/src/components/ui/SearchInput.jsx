// src/components/ui/SearchInput.jsx
import React from 'react';

const SearchInput = ({ placeholder = "Search...", value, onChange }) => {
  return (
    <div style={styles.wrapper}>
      <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '280px',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    width: '18px',
    height: '18px',
    color: '#94a3b8'
  },
  input: {
    width: '100%',
    padding: '10px 10px 10px 38px',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease'
  }
};

export default SearchInput;