import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const DynamicSidebar = ({
  moduleTitle,
  forms,
  activeForm,
  setActiveForm,
  goHome,
  width
}) => {

  const { themeConfig, settings } = useTheme();
  const themeColor = themeConfig.colors[settings.color].primary;
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = forms.filter(
    form =>
      form.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav style={{
      width: width,
      background: '#1a1a2e',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>

      <div style={{ padding: 20 }}>
        <h2 style={{ margin: 0 }}>D.E.C. INFRA</h2>
        <div style={{ fontSize: 12 }}>
          {moduleTitle}
        </div>
      </div>

      <button
        onClick={goHome}
        style={{
          margin: '0 20px 10px',
          padding: 8,
          borderRadius: 6,
          background: '#333',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ⬅ Back to Home
      </button>

      <div style={{ padding: '0 20px 10px' }}>
        <input
          placeholder="Search form..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.map(form => (
          <button
            key={form.id}
            onClick={() => setActiveForm(form.id)}
            style={{
              padding: '10px 20px',
              width: '100%',
              background: activeForm === form.id ? themeColor : 'transparent',
              color: activeForm === form.id ? '#fff' : '#ccc',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            {form.id} – {form.label}
          </button>
        ))}
      </div>

    </nav>
  );
};

export default DynamicSidebar;