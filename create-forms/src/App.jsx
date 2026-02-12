import React from 'react';
import FRM00611 from './HR & People Ops/FRM00611';
import FRM00612 from './HR & People Ops/FRM00612';
import FRM00613 from './HR & People Ops/FRM00613';
import FRM00614 from './HR & People Ops/FRM00614';
import FRM00615 from './HR & People Ops/FRM00615';
import FRM00616 from './HR & People Ops/FRM00616';
import FRM00617 from './HR & People Ops/FRM00617';
import FRM00618 from './HR & People Ops/FRM00618';
import FRM00619 from './HR & People Ops/FRM00619';
import FRM00620 from './HR & People Ops/FRM00620';
import FRM00621 from './HR & People Ops/FRM00621';
import FRM00622 from './HR & People Ops/FRM00622';
import FRM00623 from './HR & People Ops/FRM00623';
import FRM00624 from './HR & People Ops/FRM00624';
import { PrintModeProvider } from './PrintModeContext';
import { sampleData, placeholderData } from './data';

// Section title component
const SectionTitle = ({ title }) => (
  <div style={{
    marginTop: 50,
    marginBottom: 25,
    padding: '15px 20px',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 4,
    textAlign: 'center'
  }}>
    {title}
  </div>
);

// If you have real data, update sampleData in data.js
// When `sampleData` is `null`, placeholderData is used as fallback

function App() {
  return (
    <PrintModeProvider>
      <div className="App">
        {/* This renders your form on the screen. It uses real `sampleData` when
          available, otherwise falls back to `placeholderData`. */}
          <SectionTitle title="Manpower Requisition (FRM-00611 to 00613)" />
        <FRM00611 data={sampleData || placeholderData} />
        <div style={{ height: 30 }} />
        <FRM00612 data={sampleData || placeholderData} />
        <div style={{ height: 30 }} />
        <FRM00613 data={sampleData || placeholderData} />
        <SectionTitle title="Interview Feedback (FRM-00614 to 00616)" />
        <FRM00614 />
        <div style={{ height: 20 }} />
        <FRM00615 />
        <div style={{ height: 20 }} />
        <FRM00616 />
        <SectionTitle title="Candidate Consent (FRM-00617 to 00619)" />
        <FRM00617 />
        <div style={{ height: 20 }} />
        <FRM00618 />
        <div style={{ height: 20 }} />
        <FRM00619 />
        <SectionTitle title="Reference Checks & Offer Approval (FRM-00620 to 00624)" />
        <FRM00620 />
        <div style={{ height: 20 }} />
        <FRM00621 />
        <div style={{ height: 20 }} />
        <FRM00622 />
        <div style={{ height: 20 }} />
        <FRM00623 />
        <div style={{ height: 20 }} />
        <FRM00624 />
      </div>
    </PrintModeProvider>
  );
}

export default App;