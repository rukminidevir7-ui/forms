import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CustomizationPanel = () => {
  const { settings, updateSetting, resetSettings, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('appearance');

  const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--theme-primary, #333)',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    zIndex: 2000,
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  };

  const panelStyle = {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    backgroundColor: settings.darkMode ? '#2a2a2a' : 'white',
    color: settings.darkMode ? '#e0e0e0' : '#333',
    padding: '0',
    zIndex: 2000,
    width: '380px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    fontFamily: 'var(--dynamic-font, Arial, sans-serif)',
    fontSize: '13px',
    border: `1px solid ${settings.darkMode ? '#444' : '#ddd'}`,
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    maxHeight: '600px',
    overflow: 'hidden',
  };

  const tabsStyle = {
    display: 'flex',
    borderBottom: `1px solid ${settings.darkMode ? '#444' : '#eee'}`,
    backgroundColor: settings.darkMode ? '#1a1a1a' : '#f9f9f9',
  };

  const tabButtonStyle = (isActive) => ({
    flex: 1,
    padding: '12px 8px',
    border: 'none',
    backgroundColor: isActive ? 'var(--theme-primary, #333)' : 'transparent',
    color: isActive ? 'white' : (settings.darkMode ? '#999' : '#666'),
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.2s ease',
  });

  const contentStyle = {
    flex: 1,
    overflow: 'auto',
    padding: '16px',
  };

  const sectionStyle = {
    marginBottom: '18px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: settings.darkMode ? '#aaa' : '#666',
    letterSpacing: '0.5px',
  };

  const selectStyle = {
    width: '100%',
    padding: '8px 10px',
    border: `1px solid ${settings.darkMode ? '#444' : '#ccc'}`,
    borderRadius: 'var(--border-radius, 4px)',
    backgroundColor: settings.darkMode ? '#333' : '#fff',
    color: settings.darkMode ? '#e0e0e0' : '#333',
    fontSize: '12px',
    fontFamily: 'inherit',
    marginTop: '4px',
    cursor: 'pointer',
  };

  const colorGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginTop: '8px',
  };

  const colorSwatchStyle = (isSelected, bgColor) => ({
    width: '100%',
    aspectRatio: '1',
    borderRadius: 'var(--border-radius, 4px)',
    backgroundColor: bgColor,
    border: isSelected ? '3px solid var(--theme-accent)' : '2px solid rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: isSelected ? '0 0 8px rgba(0,0,0,0.3)' : 'none',
  });

  const toggleButtonStyle = (isActive) => ({
    padding: '8px 12px',
    margin: '4px 4px 4px 0',
    border: `2px solid ${isActive ? 'var(--theme-primary)' : (settings.darkMode ? '#444' : '#ddd')}`,
    borderRadius: 'var(--border-radius, 4px)',
    backgroundColor: isActive ? 'var(--theme-primary)' : 'transparent',
    color: isActive ? 'white' : (settings.darkMode ? '#999' : '#666'),
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.2s ease',
  });

  const footerStyle = {
    borderTop: `1px solid ${settings.darkMode ? '#444' : '#eee'}`,
    padding: '12px 16px',
    display: 'flex',
    gap: '8px',
    backgroundColor: settings.darkMode ? '#1a1a1a' : '#f9f9f9',
  };

  const buttonStyle = {
    flex: 1,
    padding: '8px',
    border: 'none',
    borderRadius: 'var(--border-radius, 4px)',
    backgroundColor: 'var(--theme-primary)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  };

  return (
    <>
      <button
        className="no-print"
        style={fabStyle}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Close Settings' : 'Format Settings'}
      >
        {isOpen ? '✕' : '⚙️'}
      </button>

      <div className="no-print" style={panelStyle}>
        {/* Tabs */}
        <div style={tabsStyle}>
          <button style={tabButtonStyle(activeTab === 'appearance')} onClick={() => setActiveTab('appearance')}>
            🎨 Appearance
          </button>
          <button style={tabButtonStyle(activeTab === 'layout')} onClick={() => setActiveTab('layout')}>
            📄 Layout
          </button>
          <button style={tabButtonStyle(activeTab === 'advanced')} onClick={() => setActiveTab('advanced')}>
            ⚡ Advanced
          </button>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          {/* ===== APPEARANCE TAB ===== */}
          {activeTab === 'appearance' && (
            <>
              <div style={sectionStyle}>
                <label style={labelStyle}>Typography</label>
                <select
                  value={settings.font}
                  onChange={(e) => updateSetting('font', e.target.value)}
                  style={selectStyle}
                >
                  {Object.keys(themeConfig.fonts).map((key) => (
                    <option key={key} value={key}>
                      {themeConfig.fonts[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>🎨 Color Theme</label>
                <div style={colorGridStyle}>
                  {Object.keys(themeConfig.colors).map((key) => (
                    <button
                      key={key}
                      style={colorSwatchStyle(settings.color === key, themeConfig.colors[key].primary)}
                      onClick={() => updateSetting('color', key)}
                      title={themeConfig.colors[key].name}
                    />
                  ))}
                </div>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>Font Size</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', e.target.value)}
                  style={selectStyle}
                >
                  {Object.keys(themeConfig.fontSizes).map((key) => (
                    <option key={key} value={key}>
                      {themeConfig.fontSizes[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>Border Style</label>
                <select
                  value={settings.borderRadius}
                  onChange={(e) => updateSetting('borderRadius', e.target.value)}
                  style={selectStyle}
                >
                  {Object.keys(themeConfig.borderRadius).map((key) => (
                    <option key={key} value={key}>
                      {themeConfig.borderRadius[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>Data Density</label>
                <select
                  value={settings.density}
                  onChange={(e) => updateSetting('density', e.target.value)}
                  style={selectStyle}
                >
                  {Object.keys(themeConfig.densities).map((key) => (
                    <option key={key} value={key}>
                      {themeConfig.densities[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>Contrast Mode</label>
                <select
                  value={settings.contrastMode}
                  onChange={(e) => updateSetting('contrastMode', e.target.value)}
                  style={selectStyle}
                >
                  {Object.keys(themeConfig.contrastModes).map((key) => (
                    <option key={key} value={key}>
                      {themeConfig.contrastModes[key].name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* ===== LAYOUT TAB ===== */}
          {activeTab === 'layout' && (
            <>
              <div style={sectionStyle}>
                <label style={labelStyle}>📐 Page Format</label>
                <select
                  value={settings.pageLayout}
                  onChange={(e) => updateSetting('pageLayout', e.target.value)}
                  style={selectStyle}
                >
                  {Object.keys(themeConfig.pageLayouts).map((key) => (
                    <option key={key} value={key}>
                      {themeConfig.pageLayouts[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>🌐 Language / Direction</label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                  style={selectStyle}
                >
                  {Object.keys(themeConfig.languages).map((key) => (
                    <option key={key} value={key}>
                      {themeConfig.languages[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>Layout Options</label>
                <div style={{ marginTop: '8px' }}>
                  <button
                    style={toggleButtonStyle(settings.compactHeaders)}
                    onClick={() => updateSetting('compactHeaders', !settings.compactHeaders)}
                  >
                    {settings.compactHeaders ? '✓ ' : ''}Compact Headers
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ===== ADVANCED TAB ===== */}
          {activeTab === 'advanced' && (
            <>
              <div style={sectionStyle}>
                <label style={labelStyle}>Display Options</label>
                <div style={{ marginTop: '8px' }}>
                  <button
                    style={toggleButtonStyle(settings.darkMode)}
                    onClick={() => updateSetting('darkMode', !settings.darkMode)}
                  >
                    {settings.darkMode ? '✓ ' : ''}Dark Mode
                  </button>
                  <button
                    style={toggleButtonStyle(settings.showGridlines)}
                    onClick={() => updateSetting('showGridlines', !settings.showGridlines)}
                  >
                    {settings.showGridlines ? '✓ ' : ''}Show Grid
                  </button>
                </div>
              </div>

              <div style={sectionStyle}>
                <label style={labelStyle}>📊 Current Settings</label>
                <div
                  style={{
                    fontSize: '11px',
                    backgroundColor: settings.darkMode ? '#333' : '#f5f5f5',
                    padding: '8px',
                    borderRadius: 'var(--border-radius, 4px)',
                    marginTop: '8px',
                    maxHeight: '120px',
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                  }}
                >
                  <div>Font: {settings.font}</div>
                  <div>Color: {settings.color}</div>
                  <div>Density: {settings.density}</div>
                  <div>Page: {settings.pageLayout}</div>
                  <div>Font Size: {settings.fontSize}</div>
                  <div>Language: {settings.language}</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <button style={buttonStyle} onClick={resetSettings}>
            🔄 Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomizationPanel;
