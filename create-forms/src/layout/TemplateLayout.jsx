import React, { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './TemplateLayout.css';

const TemplateLayout = ({ children, title = '', formId = '', status = 'Draft', department = '' }) => {
  const printableRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!printableRef.current) return alert('Printable area missing');

    try {
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = await import('jspdf');

      const element = printableRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#fff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`${formId || 'document'}.pdf`);
    } catch (err) {
      console.error(err);
      alert('PDF export failed — ensure html2canvas and jspdf are installed');
    }
  };

  return (
    <div className="template-font-wrapper">
      <div id="printable-form" ref={printableRef} className="template-wrapper">
        <Header />

        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 0' }} className="no-print">
          <button onClick={handleDownloadPDF} className="btn-download">Download PDF</button>
        </div>

        <div className="form-heading-section" style={{ marginTop: '8px', marginBottom: '12px', textAlign: 'center' }}>
          <h1 style={{fontSize: '18px', textTransform: 'uppercase', textDecoration: 'underline', marginBottom: '5px'}}>{title}</h1>
          <p style={{fontSize: '12px', color: '#666'}}>
            {department} • {formId} • {status}
          </p>
        </div>

        <div className="form-body" style={{ minHeight: '200px' }}>
          {children}
        </div>

        <div className="doc-control-footer" style={{marginTop: '20px', borderTop: '1px solid #ccc', fontSize: '10px', display: 'flex', justifyContent: 'space-between'}}>
          <span>Template ID: {formId}</span>
          <span>Generated via D.E.C. Digital</span>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default TemplateLayout;
