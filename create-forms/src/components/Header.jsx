import React from 'react';
import './Header.css';
import logo from '../assets/dec_logo.png';   // ✅ correct way

const Header = () => {
  return (
    <header className="header-container">
      
      {/* Left Logo */}
      <div className="header-left">
        <img 
          src={logo}
          alt="Company Logo"
          className="header-logo"
        />
      </div>

      {/* Center Content */}
      <div className="header-center">
        <h1 className="header-title">
          D.E.C. INFRASTRUCTURE AND PROJECTS
        </h1>

        <h2 className="header-subtitle">
          (INDIA) PRIVATE LIMITED
        </h2>

        <p className="header-text">
          (FORMERLY KNOWN AS M/s. DAS ENGINEERING CO.)
        </p>

        <p className="header-cin">
          CIN: U45209TG2008PTC060557
        </p>
      </div>

    </header>
  );
};

export default Header;
