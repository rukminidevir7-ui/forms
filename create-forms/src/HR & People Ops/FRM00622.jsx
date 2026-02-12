import React from 'react';
import FormWrapper from '../FormWrapper';

const FRM00622 = () => {
  // Mock tracking data
  const reportData = [
    { id: 'REF-001', candidate: 'John Doe', referee: 'Mr. Smith (Ex-Mgr)', status: 'Completed', result: 'Positive' },
    { id: 'REF-002', candidate: 'Jane Doe', referee: 'Ms. Johnson (Peer)', status: 'In Progress', result: '-' },
    { id: 'REF-003', candidate: 'Mike Ross', referee: 'Mr. Harvey (Director)', status: 'Completed', result: 'Negative' },
  ];

  return (
    <FormWrapper formId="FRM-00622" version="1.0" title="Reference Check Log">
      <div style={{ padding: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#333', color: '#fff' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>Ref ID</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Candidate</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Referee</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Result</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>{row.id}</td>
                <td style={{ padding: 10 }}>{row.candidate}</td>
                <td style={{ padding: 10 }}>{row.referee}</td>
                <td style={{ padding: 10 }}>{row.status}</td>
                <td style={{ padding: 10, fontWeight: 'bold', color: row.result === 'Negative' ? 'red' : row.result === 'Positive' ? 'green' : '#333' }}>
                  {row.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FormWrapper>
  );
};

export default FRM00622;