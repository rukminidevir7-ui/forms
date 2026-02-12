import React from 'react';
import FormWrapper from '../FormWrapper';

// Reports are often read-only views of data, but here is a simple manual entry version
// consistent with your requested tempo.

const FRM00616 = ({ data }) => {
  // Mock data for report preview
  const reportData = [
    { id: 'INT-001', name: 'Alice Smith', position: 'Civil Engineer', result: 'Selected', date: '2023-10-01' },
    { id: 'INT-002', name: 'Bob Jones', position: 'Safety Officer', result: 'Rejected', date: '2023-10-02' },
    { id: 'INT-003', name: 'Charlie Day', position: 'Civil Engineer', result: 'Hold', date: '2023-10-03' },
  ];

  return (
    <FormWrapper formId="FRM-00616" version="1.0" title="Interview Feedback Report Log">
      <div style={{ padding: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#333', color: '#fff' }}>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Candidate</th>
              <th style={{ padding: 10 }}>Position</th>
              <th style={{ padding: 10 }}>Date</th>
              <th style={{ padding: 10 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: 10 }}>{row.id}</td>
                <td style={{ padding: 10 }}>{row.name}</td>
                <td style={{ padding: 10 }}>{row.position}</td>
                <td style={{ padding: 10 }}>{row.date}</td>
                <td style={{ padding: 10, fontWeight: 'bold', color: row.result === 'Rejected' ? 'red' : 'green' }}>
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

export default FRM00616;