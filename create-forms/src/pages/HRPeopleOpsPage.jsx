import React, { useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { PrintModeProvider } from '../PrintModeContext';

import SidebarHRPeopleOps from '../components/SidebarHRPeopleOps';
import CustomizationPanel from '../components/CustomizationPanel';

import FRM00611 from '../HR & People Ops/FRM00611';
import FRM00612 from '../HR & People Ops/FRM00612';
import FRM00613 from '../HR & People Ops/FRM00613';
import FRM00614 from '../HR & People Ops/FRM00614';
import FRM00615 from '../HR & People Ops/FRM00615';
import FRM00616 from '../HR & People Ops/FRM00616';
import FRM00617 from '../HR & People Ops/FRM00617';
import FRM00618 from '../HR & People Ops/FRM00618';
import FRM00619 from '../HR & People Ops/FRM00619';
import FRM00620 from '../HR & People Ops/FRM00620';
import FRM00621 from '../HR & People Ops/FRM00621';
import FRM00622 from '../HR & People Ops/FRM00622';
import FRM00623 from '../HR & People Ops/FRM00623';
import FRM00624 from '../HR & People Ops/FRM00624';
import FRM00625 from '../HR & People Ops/FRM00625';
import FRM00626 from '../HR & People Ops/FRM00626';
import FRM00627 from '../HR & People Ops/FRM00627';
import FRM00628 from '../HR & People Ops/FRM00628';
import FRM00629 from '../HR & People Ops/FRM00629';
import FRM00630 from '../HR & People Ops/FRM00630';
import FRM00631 from '../HR & People Ops/FRM00631';
import FRM00632 from '../HR & People Ops/FRM00632';
import FRM00633 from '../HR & People Ops/FRM00633';
import FRM00634 from '../HR & People Ops/FRM00634';
import FRM00635 from '../HR & People Ops/FRM00635';
import FRM00636 from '../HR & People Ops/FRM00636';
import FRM00637 from '../HR & People Ops/FRM00637';
import FRM00638 from '../HR & People Ops/FRM00638';
import FRM00639 from '../HR & People Ops/FRM00639';
import FRM00640 from '../HR & People Ops/FRM00640';
import FRM00641 from '../HR & People Ops/FRM00641';
import FRM00642 from '../HR & People Ops/FRM00642';
import FRM00643 from '../HR & People Ops/FRM00643';
import FRM00644 from '../HR & People Ops/FRM00644';
import FRM00645 from '../HR & People Ops/FRM00645';
import FRM00646 from '../HR & People Ops/FRM00646';
import FRM00647 from '../HR & People Ops/FRM00647';
import FRM00648 from '../HR & People Ops/FRM00648';
import FRM00649 from '../HR & People Ops/FRM00649';
import FRM00650 from '../HR & People Ops/FRM00650';
import FRM00651 from '../HR & People Ops/FRM00651';
import FRM00652 from '../HR & People Ops/FRM00652';
import FRM00653 from '../HR & People Ops/FRM00653';
import FRM00654 from '../HR & People Ops/FRM00654';
import FRM00655 from '../HR & People Ops/FRM00655';
import FRM00656 from '../HR & People Ops/FRM00656';
import FRM00657 from '../HR & People Ops/FRM00657';
import FRM00658 from '../HR & People Ops/FRM00658';
import FRM00659 from '../HR & People Ops/FRM00659';
import FRM00660 from '../HR & People Ops/FRM00660';
import FRM00661 from '../HR & People Ops/FRM00661';
import FRM00662 from '../HR & People Ops/FRM00662';
import FRM00663 from '../HR & People Ops/FRM00663';
import FRM00664 from '../HR & People Ops/FRM00664';

const HRPeopleOpsPage = ({ goHome }) => {

  const [activeForm, setActiveForm] = useState('FRM-00611');

  const renderForm = () => {
    switch (activeForm) {

      case 'FRM-00611': return <FRM00611 />;
      case 'FRM-00612': return <FRM00612 />;
      case 'FRM-00613': return <FRM00613 />;
      case 'FRM-00614': return <FRM00614 />;
      case 'FRM-00615': return <FRM00615 />;
      case 'FRM-00616': return <FRM00616 />;
      case 'FRM-00617': return <FRM00617 />;
      case 'FRM-00618': return <FRM00618 />;
      case 'FRM-00619': return <FRM00619 />;
      case 'FRM-00620': return <FRM00620 />;
      case 'FRM-00621': return <FRM00621 />;
      case 'FRM-00622': return <FRM00622 />;
      case 'FRM-00623': return <FRM00623 />;
      case 'FRM-00624': return <FRM00624 />;
      case 'FRM-00625': return <FRM00625 />;
      case 'FRM-00626': return <FRM00626 />;
      case 'FRM-00627': return <FRM00627 />;
      case 'FRM-00628': return <FRM00628 />;
      case 'FRM-00629': return <FRM00629 />;
      case 'FRM-00630': return <FRM00630 />;
      case 'FRM-00631': return <FRM00631 />;
      case 'FRM-00632': return <FRM00632 />;
      case 'FRM-00633': return <FRM00633 />;
      case 'FRM-00634': return <FRM00634 />;
      case 'FRM-00635': return <FRM00635 />;
      case 'FRM-00636': return <FRM00636 />;
      case 'FRM-00637': return <FRM00637 />;
      case 'FRM-00638': return <FRM00638 />;
      case 'FRM-00639': return <FRM00639 />;
      case 'FRM-00640': return <FRM00640 />;
      case 'FRM-00641': return <FRM00641 />;
      case 'FRM-00642': return <FRM00642 />;
      case 'FRM-00643': return <FRM00643 />;
      case 'FRM-00644': return <FRM00644 />;
      case 'FRM-00645': return <FRM00645 />;
      case 'FRM-00646': return <FRM00646 />;
      case 'FRM-00647': return <FRM00647 />;
      case 'FRM-00648': return <FRM00648 />;
      case 'FRM-00649': return <FRM00649 />;
      case 'FRM-00650': return <FRM00650 />;
      case 'FRM-00651': return <FRM00651 />;
      case 'FRM-00652': return <FRM00652 />;
      case 'FRM-00653': return <FRM00653 />;
      case 'FRM-00654': return <FRM00654 />;
      case 'FRM-00655': return <FRM00655 />;
      case 'FRM-00656': return <FRM00656 />;
      case 'FRM-00657': return <FRM00657 />;
      case 'FRM-00658': return <FRM00658 />;
      case 'FRM-00659': return <FRM00659 />;
      case 'FRM-00660': return <FRM00660 />;
      case 'FRM-00661': return <FRM00661 />;
      case 'FRM-00662': return <FRM00662 />;
      case 'FRM-00663': return <FRM00663 />;
      case 'FRM-00664': return <FRM00664 />;

      default:
        return <FRM00611 />;
    }
  };

  return (
    <ThemeProvider>
      <PrintModeProvider>
        <div style={{ display: 'flex', minHeight: '100vh' }}>

          <SidebarHRPeopleOps
  activeForm={activeForm}
  setActiveForm={setActiveForm}
  goHome={goHome}
/>


          <main style={{
            flex: 1,
            background: '#e0e0e0',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '40px',
            paddingBottom: '40px'
          }}>
            {renderForm()}
          </main>
          <CustomizationPanel />


        </div>
      </PrintModeProvider>
    </ThemeProvider>
  );
};

export default HRPeopleOpsPage;
