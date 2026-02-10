import React, { useRef } from 'react';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { usePrintMode } from './PrintModeContext';

const FormWrapper = ({ children, formId, version, title, companyLogo }) => {
  const printRef = useRef(null);
  const { isPrintMode, setIsPrintMode } = usePrintMode();

  // Download as PDF using html2canvas + jsPDF
  const handlePrintPDF = async () => {
    if (!printRef.current) {
      alert('Print area not found!');
      return;
    }

    try {
      // Dynamically import to avoid build issues
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = await import('jspdf');

      console.log('Converting form to PDF...');
      
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${formId || 'form'}.pdf`);
      console.log('PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF download failed:', err);
      alert('Error: Make sure html2canvas and jspdf are installed.\n\nRun: npm install html2canvas jspdf');
    }
  };

  // Download as Word (.docx)
  const handleDownloadWord = async () => {
    if (!printRef.current) {
      alert('Word export area not found!');
      return;
    }

    try {
      const text = printRef.current.innerText;
      const lines = text.split('\n').filter(Boolean);

      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({
              text: title,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph(`Form ID: ${formId} | Version: ${version}`),
            new Paragraph(''), // Empty line
            ...lines.map(line => new Paragraph(line)),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${formId}.docx`);
      console.log('Word document downloaded successfully!');
    } catch (err) {
      console.error('Word download failed:', err);
      alert('Error downloading Word file');
    }
  };

  return (
    <div style={{ padding: 20, background: '#f5f5f5' }}>
      {/* Action buttons (NOT printed) */}
      <div style={{ textAlign: 'center', marginBottom: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button 
          onClick={() => setIsPrintMode(!isPrintMode)}
          style={{
            padding: '10px 16px',
            backgroundColor: isPrintMode ? '#d9534f' : '#5cb85c',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {isPrintMode ? '✎ Back to Edit' : '👁 Print Preview'}
        </button>

        {isPrintMode && (
          <>
            <button 
              onClick={handlePrintPDF}
              style={{
                padding: '10px 16px',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🖨 Print / Save PDF
            </button>
            <button 
              onClick={handleDownloadWord}
              style={{
                padding: '10px 16px',
                backgroundColor: '#007acc',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              📄 Download Word
            </button>
          </>
        )}
      </div>

      {/* Printable Area */}
      <div
        ref={printRef}
        style={{
          background: '#fff',
          width: 800,
          margin: 'auto',
          padding: 40,
          border: '1px solid #ddd',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {companyLogo ? <img src={companyLogo} height={50} /> : <div>LOGO</div>}
          <div>
            <div>Form ID: {formId}</div>
            <div>Version: {version}</div>
          </div>
        </div>

        <h3 style={{ textAlign: 'center', margin: '30px 0' }}>{title}</h3>

        {children}

        <footer style={{ marginTop: 40, fontSize: 12 }}>
          © Confidential Document
        </footer>
      </div>
    </div>
  );
};

export default FormWrapper;
