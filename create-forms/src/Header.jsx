import React from 'react';
import './Header.css'; // Make sure to create/update this CSS file below

const Header = () => {
  return (
    <header className="header-container">
      {/* Left Section: Logo */}
      <div className="header-left">
        {/* Replace with your actual logo URL or import */}
        <img 
          src="https://via.placeholder.com/80x80.png?text=Logo" 
          alt="Company Logo" 
          className="header-logo" 
        />
      </div>

      {/* Center Section: Main Text */}
      <div className="header-center">
        <h1 className="header-title-red">D.E.C. INFRASTRUCTURE AND PROJECTS</h1>
        <h2 className="header-subtitle-red">(INDIA) PRIVATE LIMITED</h2>
        
        <p className="header-text-blue">
          (FORMERLY KNOWN AS M/s. DAS ENGINEERING CO.)
        </p>
        
        <p className="header-cin">
          CIN: U45209TG2008PTC060557
        </p>

        {/* Decorative Lines + Role */}
        <div className="header-role-row">
          <div className="header-double-line"></div>
          <div className="header-double-line"></div>
        </div>

        <p className="header-iso">
          (Certified by ISO 9001:2015)
        </p>
      </div>

      {/* Right Section: ISO Logos */}
      <div className="header-right">
        {/* Replace with your actual logo URL or import */}
        <img 
          src="https://via.placeholder.com/100x50.png?text=ISO+Cert" 
          alt="ISO Certification" 
          className="header-logo-right" 
        />
      </div>
    </header>
  );
};

export default Header;