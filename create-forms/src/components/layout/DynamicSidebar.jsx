import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const DynamicSidebar = ({
  moduleTitle,
  forms,
  activeForm,
  setActiveForm,
  goHome,
  children
}) => {
  const { themeConfig, settings } = useTheme();
  const themeColor = themeConfig.colors[settings.color].primary;

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const SIDEBAR_WIDTH = 280;
  const COLLAPSED_WIDTH = 60;

  const filtered = forms.filter(
    (form) =>
      form.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: isOpen ? SIDEBAR_WIDTH : COLLAPSED_WIDTH,
          background: "#1a1a2e",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          overflow: "hidden"
        }}
      >
        {/* Top Section */}
        <div style={{ padding: 15, display: "flex", alignItems: "center", justifyContent: isOpen ? "space-between" : "center" }}>
          
          {isOpen && (
            <div>
              <h2 style={{ margin: 0, color: "#ffffff" }}>
  D.E.C. INFRA
</h2>
<div style={{ fontSize: 12, color: "#ccc" }}>
  {moduleTitle}
</div>            </div>
          )}

          {/* ☰ Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 20,
              cursor: "pointer"
            }}
          >
            ☰
          </button>
        </div>

        {/* Only show full content when open */}
        {isOpen && (
          <>
            <button
              onClick={goHome}
              style={{
                margin: "0 20px 10px",
                padding: 8,
                borderRadius: 6,
                background: "#333",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              ⬅ Back to Home
            </button>

            <div style={{ padding: "0 20px 10px" }}>
              <input
                placeholder="Search form..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {filtered.map((form) => (
                <button
                  key={form.id}
                  onClick={() => setActiveForm(form.id)}
                  style={{
                    padding: "10px 20px",
                    width: "100%",
                    background:
                      activeForm === form.id ? themeColor : "transparent",
                    color: activeForm === form.id ? "#fff" : "#ccc",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  {form.id} – {form.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div
        style={{
          flex: 1,
          transition: "all 0.3s ease",
          background: "#f4f6f9",
          overflowY: "auto"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DynamicSidebar;