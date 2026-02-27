// src/components/layout/TopNavbar.jsx
import React from 'react';
import SearchInput from '../ui/SearchInput';
import SidebarToggleButton from '../ui/SidebarToggleButton';
// Import your logo from the assets folder
import decLogo from '../../assets/dec_logo.png'; 

const TopNavbar = ({ onLogout, searchValue, onSearchChange }) => {
  return (
    <header style={styles.navbar}>
      <div style={styles.leftSection}>
        <SidebarToggleButton onClick={() => console.log("Toggle Sidebar")} />
        
        {/* LOGO CONTAINER */}
        <div style={styles.logoContainer}>
          <img 
            src={decLogo} 
            alt="DEC Logo" 
            style={styles.logoImage} 
          />
          <div style={styles.logoText}>
            D.E.C. INFRA <span style={styles.badge}>Portal</span>
          </div>
        </div>
      </div>

      <div style={styles.middleSection}>
        <SearchInput 
          placeholder="Search modules..." 
          value={searchValue} 
          onChange={onSearchChange} 
        />
      </div>

      <div style={styles.rightSection}>
        {/* <div style={styles.avatar}>A</div> */}
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </header>
  );
};

const styles = {
  navbar: { 
    height: '70px', 
    background: '#ffffff', 
    borderBottom: '1px solid #e2e8f0', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 24px', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100 
  },
  leftSection: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px' 
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px', // space between image and text
  },
  logoImage: {
    height: '35px', // Adjust height to fit navbar
    width: 'auto',
    objectFit: 'contain'
  },
  logoText: { 
    fontSize: '18px', 
    fontWeight: '700', 
    color: '#0f172a', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px',
    whiteSpace: 'nowrap'
  },
  badge: { 
    fontSize: '10px', 
    background: '#e0e7ff', 
    color: '#4f46e5', 
    padding: '2px 8px', 
    borderRadius: '12px', 
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  middleSection: { 
    flex: 1, 
    display: 'flex', 
    justifyContent: 'center' 
  },
  rightSection: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px' 
  },
  avatar: { 
    width: '36px', 
    height: '36px', 
    background: '#4f46e5', 
    color: '#fff', 
    borderRadius: '50%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: '600',
    fontSize: '14px'
  },
  logoutBtn: { 
    background: 'transparent', 
    border: '1px solid #e2e8f0', 
    padding: '8px 16px', 
    borderRadius: '8px', 
    color: '#64748b', 
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  }
};

export default TopNavbar;