import React from 'react';
import FormWrapper from '../FormWrapper';

const FRM00619 = () => {
  // Mock data for the report
  const reportData = [
    { id: 'CON-101', candidate: 'John Doe', type: 'BGV, Reference', req_date: '2023-10-01', status: 'Verified', verifier: 'Alice (HR)' },
    { id: 'CON-102', candidate: 'Jane Smith', type: 'Data Privacy', req_date: '2023-10-05', status: 'Pending', verifier: '-' },
    { id: 'CON-103', candidate: 'Mike Ross', type: 'BGV', req_date: '2023-10-06', status: 'Rejected', verifier: 'Bob (HR)' },
  ];

  return (
    <FormWrapper formId="FRM-00619" version="1.0" title="Candidate Consent Tracking Log">
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 15, display: 'flex', justifyContent: 'flex-end' }}>
          <input type="text" placeholder="Search Candidate..." style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#333', color: '#fff' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>Req ID</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Candidate Name</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Consent Types</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Req. Date</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Verified By</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>{row.id}</td>
                <td style={{ padding: 10, fontWeight: 'bold' }}>{row.candidate}</td>
                <td style={{ padding: 10 }}>{row.type}</td>
                <td style={{ padding: 10 }}>{row.req_date}</td>
                <td style={{ padding: 10 }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px',
                    fontSize: 12,
                    backgroundColor: row.status === 'Verified' ? '#d4edda' : row.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                    color: row.status === 'Verified' ? '#155724' : row.status === 'Rejected' ? '#721c24' : '#856404'
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: 10 }}>{row.verifier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FormWrapper>
  );
};

export default FRM00619;