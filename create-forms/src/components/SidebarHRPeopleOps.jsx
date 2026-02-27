import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const SidebarHRPeopleOps = ({ activeForm, setActiveForm, goHome }) => {
  const { themeConfig, settings } = useTheme();
  const themeColor = themeConfig.colors[settings.color].primary;
  const [searchQuery, setSearchQuery] = useState('');

  const navStructure = [
    {
      category: "HR & People Ops",
      icon: "",
      items: [
        { id: 'FRM-00611', label: 'Manpower Requirement Form' },
        { id: 'FRM-00612', label: 'Manpower Approval Form' },
        { id: 'FRM-00613', label: 'Manpower Tracking Summary' },
        { id: 'FRM-00614', label: 'Interview Feedback – Request' },
        { id: 'FRM-00615', label: 'Interview Feedback – Approval' },
        { id: 'FRM-00616', label: 'Interview Feedback – Report' },
        { id: 'FRM-00617', label: 'Candidate Consent – Request' },
        { id: 'FRM-00618', label: 'Candidate Consent – Approval' },
        { id: 'FRM-00619', label: 'Candidate Consent – Report' },
        { id: 'FRM-00620', label: 'Reference Check – Request' },
        { id: 'FRM-00621', label: 'Reference Check – Approval' },
        { id: 'FRM-00622', label: 'Reference Check – Report' },
        { id: 'FRM-00623', label: 'Offer Approval – Authorization' },
        { id: 'FRM-00624', label: 'Background Verification – Checklist' },
        { id: 'FRM-00625', label: 'Hiring Deviation – Request' },
        { id: 'FRM-00626', label: 'Hiring Deviation – Approval' },
        { id: 'FRM-00627', label: 'Hiring Deviation – Report' },
        { id: 'FRM-00628', label: 'Vendor Empanelment – Request' },
        { id: 'FRM-00629', label: 'Vendor Empanelment – Approval' },
        { id: 'FRM-00630', label: 'Vendor Empanelment – Report' },
        { id: 'FRM-00631', label: 'Recruitment MIS Update – Request / Initiation' },
        { id: 'FRM-00632', label: 'Recruitment MIS Update – Approval Form' },
        { id: 'FRM-00633', label: 'Recruitment MIS Update – Report / Record' },
        { id: 'FRM-00634', label: 'Candidate Rejection Communication – Request' },
        { id: 'FRM-00635', label: 'Candidate Rejection Communication – Approval' },
        { id: 'FRM-00636', label: 'Candidate Rejection Communication – Report' },
        { id: 'FRM-00637', label: 'New Hire Confirmation – Request' },
        { id: 'FRM-00638', label: 'New Hire Confirmation – Approval' },
        { id: 'FRM-00639', label: 'New Hire Confirmation – Report / Record' },
        { id: 'FRM-00640', label: 'Employee Data Change – Request' },
        { id: 'FRM-00641', label: 'Employee Data Change – Approval' },
        { id: 'FRM-00642', label: 'Employee Data Change – Report / Record' },
        { id: 'FRM-00643', label: 'Probation Review – Request / Initiation' },
        { id: 'FRM-00644', label: 'Probation Review – Approval / Authorization' },
        { id: 'FRM-00645', label: 'Probation Review – Report / Record' },
        { id: 'FRM-00646', label: 'Confirmation – Request / Initiation' },
        { id: 'FRM-00647', label: 'Confirmation – Approval / Authorization' },
        { id: 'FRM-00648', label: 'Confirmation – Report / Record' },
        { id: 'FRM-00649', label: 'Promotion Recommendation – Report/Record' },
        { id: 'FRM-00650', label: 'Transfer/Relocation – Request' },
        { id: 'FRM-00651', label: 'Transfer/Relocation – Approval' },
        { id: 'FRM-00652', label: 'Transfer/Relocation – Report/Record' },
        { id: 'FRM-00653', label: 'Leave Application – Request' },
        { id: 'FRM-00654', label: 'Attendance Regularization – Report' },
        { id: 'FRM-00655', label: 'Disciplinary Action – Request' },
        { id: 'FRM-00656', label: 'Disciplinary Action – Approval' },
        { id: 'FRM-00657', label: 'Disciplinary Action – Report' },
        { id: 'FRM-00658', label: 'Grievance Intake – Request' },
        { id: 'FRM-00659', label: 'Exit Clearance – Request' },
        { id: 'FRM-00660', label: 'Exit Clearance – Approval' },
        { id: 'FRM-00661', label: 'Exit Clearance – Report' },
        { id: 'FRM-00662', label: 'Exit Interview – Request' },
        { id: 'FRM-00663', label: 'Exit Interview – Approval' },
        { id: 'FRM-00664', label: 'Exit Interview – Report' }
      ]
    }
  ];

  const containerStyle = {
    width: '280px',
    backgroundColor: '#1a1a2e',
    color: '#e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 10px rgba(0,0,0,0.2)',
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  const headerStyle = {
    padding: '25px 20px',
    background: 'rgba(255,255,255,0.05)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: 10
  };

  const categoryHeaderStyle = {
    fontSize: 11,
    textTransform: 'uppercase',
    color: '#6c7a89',
    fontWeight: 'bold',
    padding: '15px 20px 5px',
    letterSpacing: 1
  };

  const btnStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 20px',
    background: isActive
      ? `linear-gradient(90deg, ${themeColor}cc 0%, transparent 100%)`
      : 'transparent',
    color: isActive ? '#fff' : '#b0b8c3',
    border: 'none',
    borderLeft: isActive ? `4px solid #fff` : '4px solid transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: 13
  });

  const filteredItems = navStructure.flatMap(cat =>
    cat.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <nav className="no-print" style={containerStyle}>

      <div style={headerStyle}>
        <h2 style={{ margin: 0, fontSize: 20 }}>D.E.C. INFRA</h2>
        <div style={{ fontSize: 11, color: '#aab7c4', marginTop: 5 }}>
          HR & People Ops
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={goHome}
        style={{
          margin: '0 20px 10px',
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.06)',
          color: '#fff',
          cursor: 'pointer',
          fontSize: 12,
          textAlign: 'left'
        }}
      >
        ⬅ Back to Home
      </button>

      <div style={{ padding: '10px 20px 15px' }}>
        <input
          placeholder="Search form..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 6,
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        />
      </div>

      {(searchQuery ? [{ category: '', items: filteredItems }] : navStructure)
        .map((cat, i) => (
          <div key={i}>
            {cat.category && (
              <div style={categoryHeaderStyle}>{cat.category}</div>
            )}
            {cat.items.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveForm(item.id)}
                style={btnStyle(activeForm === item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}

    </nav>
  );
};

export default SidebarHRPeopleOps;
