import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// --- CONFIGURATION: Enterprise-grade Theme System ---
export const themeConfig = {
  fonts: {
    serif: { name: 'Official (Serif)', value: '"Times New Roman", Times, serif' },
    sans:  { name: 'Clean (Arial)', value: 'Arial, Helvetica, sans-serif' },
    mono:  { name: 'Draft (Mono)', value: '"Courier New", Courier, monospace' },
    modern: { name: 'Modern (Segoe UI)', value: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
    open: { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  },
  colors: {
    black: { name: 'Standard Black', primary: '#000000', secondary: '#f3f3f3', text: '#ffffff', accent: '#333333' },
    darkBlue:  { name: 'Dark Blue (IBM)', primary: '#003d7a', secondary: '#e8f0ff', text: '#ffffff', accent: '#0052cc' },
    blue:  { name: 'Corporate Blue', primary: '#2c3e50', secondary: '#eef2f5', text: '#ffffff', accent: '#3498db' },
    teal:  { name: 'Construction Teal', primary: '#006d77', secondary: '#edf6f9', text: '#ffffff', accent: '#00b4d8' },
    green: { name: 'Federal Green', primary: '#1b6f3d', secondary: '#e8f5e9', text: '#ffffff', accent: '#43a047' },
    navy: { name: 'Government Navy', primary: '#001f3f', secondary: '#f0f2f5', text: '#ffffff', accent: '#003d82' },
    slate: { name: 'Professional Slate', primary: '#34495e', secondary: '#ecf0f1', text: '#ffffff', accent: '#5d6d7b' },
    burgundy: { name: 'Corporate Burgundy', primary: '#6b2c2c', secondary: '#faf0f0', text: '#ffffff', accent: '#9d3b3b' },
    purple: { name: 'Executive Purple', primary: '#4a3f83', secondary: '#f3f1ff', text: '#ffffff', accent: '#7c3aed' },
    orange: { name: 'Operations Orange', primary: '#d97706', secondary: '#fffbf0', text: '#ffffff', accent: '#f97316' },
  },
  densities: {
    normal: { name: 'Standard', padding: '8px', fontSize: '11px', lineHeight: '1.5' },
    compact: { name: 'Compact (High Data)', padding: '4px', fontSize: '10px', lineHeight: '1.4' },
    spacious: { name: 'Spacious (Print Ready)', padding: '12px', fontSize: '12px', lineHeight: '1.6' },
  },
  pageLayouts: {
    a4: { name: 'A4 (210mm × 297mm)', width: '210mm', height: '297mm' },
    letter: { name: 'Letter (8.5" × 11")', width: '8.5in', height: '11in' },
    legal: { name: 'Legal (8.5" × 14")', width: '8.5in', height: '14in' },
    a3: { name: 'A3 (297mm × 420mm)', width: '297mm', height: '420mm' },
  },
  languages: {
    en: { name: '🇺🇸 English', dir: 'ltr' },
    es: { name: '🇪🇸 Español', dir: 'ltr' },
    de: { name: '🇩🇪 Deutsch', dir: 'ltr' },
    ar: { name: '🇸🇦 العربية', dir: 'rtl' },
    hi: { name: '🇮🇳 हिन्दी', dir: 'ltr' },
  },
  fontSizes: {
    small: { name: 'Small (10px base)', base: '10px', label: '9px', heading: '14px' },
    normal: { name: 'Normal (11px base)', base: '11px', label: '10px', heading: '16px' },
    large: { name: 'Large (12px base)', base: '12px', label: '11px', heading: '18px' },
  },
  borderRadius: {
    sharp: { name: 'Sharp (0px)', value: '0px' },
    slight: { name: 'Slight (2px)', value: '2px' },
    normal: { name: 'Normal (4px)', value: '4px' },
    rounded: { name: 'Rounded (8px)', value: '8px' },
  },
  contrastModes: {
    standard: { name: 'Standard', opacity: 1, filter: 'none' },
    highContrast: { name: 'High Contrast', opacity: 1, filter: 'contrast(1.2)' },
    highContrast2: { name: 'High Contrast 2', opacity: 1, filter: 'contrast(1.5)' },
  },
};

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    font: 'serif',
    color: 'blue',
    density: 'normal',
    pageLayout: 'a4',
    language: 'en',
    fontSize: 'normal',
    borderRadius: 'normal',
    contrastMode: 'standard',
    darkMode: false,
    showGridlines: false,
    compactHeaders: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    const fontVal = themeConfig.fonts[settings.font].value;
    const colorVal = themeConfig.colors[settings.color];
    const densityVal = themeConfig.densities[settings.density];
    const pageLayout = themeConfig.pageLayouts[settings.pageLayout];
    const fontSizeVal = themeConfig.fontSizes[settings.fontSize];
    const borderRadiusVal = themeConfig.borderRadius[settings.borderRadius].value;
    const contrastVal = themeConfig.contrastModes[settings.contrastMode];
    const langDir = themeConfig.languages[settings.language].dir;

    // Inject CSS Variables for the entire app to use
    root.style.setProperty('--dynamic-font', fontVal);
    root.style.setProperty('--theme-primary', colorVal.primary);
    root.style.setProperty('--theme-secondary', colorVal.secondary);
    root.style.setProperty('--theme-text-contrast', colorVal.text);
    root.style.setProperty('--theme-accent', colorVal.accent);
    root.style.setProperty('--table-padding', densityVal.padding);
    root.style.setProperty('--table-font-size', densityVal.fontSize);
    root.style.setProperty('--table-line-height', densityVal.lineHeight);
    root.style.setProperty('--table-border-color', settings.color === 'black' ? '#000' : '#ccc');
    root.style.setProperty('--page-width', pageLayout.width);
    root.style.setProperty('--page-height', pageLayout.height);
    root.style.setProperty('--base-font-size', fontSizeVal.base);
    root.style.setProperty('--label-font-size', fontSizeVal.label);
    root.style.setProperty('--heading-font-size', fontSizeVal.heading);
    root.style.setProperty('--border-radius', borderRadiusVal);
    root.style.setProperty('--contrast-filter', contrastVal.filter);
    root.setAttribute('dir', langDir);

    // Apply dark mode if enabled
    if (settings.darkMode) {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#e0e0e0';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#333333';
    }

    // Apply gridlines for development if enabled
    if (settings.showGridlines) {
      root.style.backgroundImage = 'linear-gradient(0deg, transparent 24%, rgba(255,0,0,.05) 25%, rgba(255,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,0,0,.05) 75%, rgba(255,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,0,0,.05) 25%, rgba(255,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,0,0,.05) 75%, rgba(255,0,0,.05) 76%, transparent 77%, transparent)';
      root.style.backgroundSize = '50px 50px';
    }
  }, [settings]);

  const updateSetting = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));
  const resetSettings = () => setSettings({
    font: 'serif',
    color: 'blue',
    density: 'normal',
    pageLayout: 'a4',
    language: 'en',
    fontSize: 'normal',
    borderRadius: 'normal',
    contrastMode: 'standard',
    darkMode: false,
    showGridlines: false,
    compactHeaders: false,
  });

  return (
    <ThemeContext.Provider value={{ settings, updateSetting, resetSettings, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
