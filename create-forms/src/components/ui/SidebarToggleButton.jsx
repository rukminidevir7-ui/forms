// src/components/ui/SidebarToggleButton.jsx
import React from 'react';

const SidebarToggleButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
};

const styles = {
  button: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'background 0.2s ease',
  },
  icon: {
    width: '24px',
    height: '24px',
    color: '#475569'
  }
 };

export default SidebarToggleButton;