import React from 'react';
import FRM00611 from './HR & People Ops/FRM00611';
import FRM00612 from './HR & People Ops/FRM00612';
import FRM00613 from './HR & People Ops/FRM00613';
import { PrintModeProvider } from './PrintModeContext';
import { sampleData, placeholderData } from './data';

// If you have real data, update sampleData in data.js
// When `sampleData` is `null`, placeholderData is used as fallback

function App() {
  return (
    <PrintModeProvider>
      <div className="App">
        {/* This renders your form on the screen. It uses real `sampleData` when
          available, otherwise falls back to `placeholderData`. */}
        <FRM00611 data={sampleData || placeholderData} />
        <div style={{ height: 30 }} />
        <FRM00612 data={sampleData || placeholderData} />
        <div style={{ height: 30 }} />
        <FRM00613 data={sampleData || placeholderData} />
      </div>
    </PrintModeProvider>
  );
}

export default App;