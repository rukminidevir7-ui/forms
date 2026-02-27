import React, { useState } from "react";
import ModuleLayout from "./components/layout/ModuleLayout";
import TopNavbar from "./components/layout/TopNavbar";
import { modulesConfig } from "./config/modulesConfig";

const HomePage = ({ onLogout }) => {
  const [activeModule, setActiveModule] = useState(null);
  // 1. Add Search State
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Filter modules based on search
  const moduleCards = Object.entries(modulesConfig)
    .filter(([key, module]) => 
      module.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(([key, module]) => ({
      key,
      title: module.title,
      desc: `${module.forms?.length || 0} Forms Available`
    }));

  if (activeModule) {
    return <ModuleLayout moduleKey={activeModule} goHome={() => setActiveModule(null)} />;
  }

  return (
    <div style={styles.pageContainer}>
      {/* 3. Pass search state and setter to Navbar */}
      <TopNavbar 
        onLogout={onLogout} 
        searchValue={searchQuery} 
        onSearchChange={(e) => setSearchQuery(e.target.value)} 
      />

      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.greeting}>D.E.C. Infrastructure</h1>
          <p style={styles.subtitle}>Enterprise Forms & Formats Portal</p>
        </div>

        <div style={styles.grid}>
          {moduleCards.length > 0 ? (
            moduleCards.map((module) => (
              <div
                key={module.key}
                className="modern-card"
                onClick={() => setActiveModule(module.key)}
                style={styles.card}
              >
                <div style={styles.cardIcon}>
                  <div style={styles.circle}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="22" height="22">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{module.title}</h2>
                  <p style={styles.cardDesc}>{module.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#64748b' }}>No modules found matches "{searchQuery}"</p>
          )}
        </div>
      </main>
    </div>
  );
};

// ... include styles from previous message here ...
const styles = {
  pageContainer: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f4f7f6' },
  mainContent: { padding: '50px 40px', maxWidth: '1400px', margin: '0 auto', width: '100%' },
  header: { marginBottom: '50px', textAlign: 'center' },
  greeting: { margin: '0 0 10px 0', fontSize: '36px', fontWeight: '700', color: '#0f172a' },
  subtitle: { margin: 0, fontSize: '16px', color: '#64748b', fontWeight: '500' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  card: { cursor: 'pointer', padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '18px', background: '#fff', borderRadius: '16px' },
  circle: { width: '50px', height: '50px', borderRadius: '14px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardContent: { flex: 1, marginTop: '4px' },
  cardTitle: { margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#1e293b' },
  cardDesc: { margin: 0, fontSize: '14px', color: '#64748b' }
};

export default HomePage;