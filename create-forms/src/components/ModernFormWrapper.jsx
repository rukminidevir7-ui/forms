import React, { useRef } from 'react';
import { usePrintMode } from '../PrintModeContext';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import '../styles/ModernFormWrapper.css';

const ModernFormWrapper = ({ children, formId }) => {
  const printRef = useRef(null);
  const { isPrintMode, setIsPrintMode } = usePrintMode();

  // ✅ REAL PDF (Browser Engine)
 const handlePrintPDF = async () => {
  if (!printRef.current) return alert("Print area not found!");

  try {
    const html2pdf = (await import("html2pdf.js")).default;

    // 🔥 Clone instead of modifying original
    const element = printRef.current.cloneNode(true);

    // 🔥 Convert all inputs/selects/textarea to text
    const fields = element.querySelectorAll("input, select, textarea");

    fields.forEach(field => {
      const span = document.createElement("div");
      span.textContent = field.value || "";
      span.style.whiteSpace = "normal";
      span.style.wordBreak = "break-all";
      span.style.overflowWrap = "break-word";
      span.style.minHeight = "16px";
      span.style.fontSize = "11px";

      field.parentNode.replaceChild(span, field);
    });

    // 🔥 Hide footer temporarily if needed
    const footer = element.querySelector(".footer-container");
    if (footer) footer.style.visibility = "hidden";

    const opt = {
      margin: [15, 10, 25, 10],
      filename: `${formId || "Enterprise-Form"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, useCORS: true, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    const worker = html2pdf().set(opt).from(element).toPdf();
    const pdf = await worker.get("pdf");

    const totalPages = pdf.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);

      pdf.line(10, 285, 200, 285);

      pdf.text(
        "Regd.Office: #2-1-434/1, Street No.4, Nallakunta, Hyderabad-500044, Telangana",
        10,
        290
      );

      pdf.text(
        `Page ${i} of ${totalPages}`,
        200,
        290,
        { align: "right" }
      );
    }

    pdf.save(`${formId || "Enterprise-Form"}.pdf`);

  } catch (err) {
    console.error("PDF export failed:", err);
  }
};
// ✅ WORD EXPORT (FINAL CLEAN + SAFE VERSION)
const handleDownloadWord = async () => {
  if (!printRef.current) return alert('Document area not found!');

  try {
    const clone = printRef.current.cloneNode(true);

    // =========================
    // 1️⃣ Convert Image to Base64
    // =========================
    const convertImageToBase64 = (imgElement) => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "anonymous";

        image.onload = function () {
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          ctx.drawImage(image, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        };

        image.onerror = function () {
          resolve("");
        };

        image.src = imgElement.src;
      });
    };

    // =========================
    // 2️⃣ FIX HEADER FOR WORD
    // =========================
    const headerElement = clone.querySelector('.header-container');

    if (headerElement) {
      const logoElement = headerElement.querySelector('img');
      let logoBase64 = '';

      if (logoElement) {
        logoBase64 = await convertImageToBase64(logoElement);
      }

      const headerTable = `
        <table width="100%" style="border-collapse: collapse; border-bottom: 1.5px solid #1a3c5e; margin-bottom: 8px;">
          <tr>
            <td width="15%" style="vertical-align: middle; text-align: left; padding: 2px;">
              ${logoBase64 ? `<img src="${logoBase64}" height="50" width="40" style="display:block;" />` : ''}
            </td>
            <td width="85%" style="vertical-align: middle; text-align: center; padding: 2px;">
              <div style="font-size:15pt; font-weight:bold; color:#d32f2f; line-height:1.1;">
                D.E.C. INFRASTRUCTURE AND PROJECTS
              </div>
              <div style="font-size:12pt; font-weight:bold; color:#d32f2f; line-height:1.1;">
                (INDIA) PRIVATE LIMITED
              </div>
              <div style="font-size:9pt; margin-top:1px; line-height:1.1;">
                (FORMERLY KNOWN AS M/s. DAS ENGINEERING CO.)
              </div>
              <div style="font-size:9pt; margin-top:1px; line-height:1.1;">
                CIN: U45209TG2008PTC060557
              </div>
            </td>
          </tr>
        </table>
      `;

      headerElement.outerHTML = headerTable;
    }

    // =========================
    // 3️⃣ CONVERT GRID FIELDS TO TABLE
    // =========================
    const fieldContainers = clone.querySelectorAll('.form-fields');

    fieldContainers.forEach(container => {
      const fields = Array.from(container.querySelectorAll('.form-field'));
      let tableHtml = '<table width="100%" style="border-collapse: collapse; margin-bottom: 15px;">';

      for (let i = 0; i < fields.length; i += 2) {
        tableHtml += `
          <tr>
            <td width="50%" style="padding: 8px; vertical-align: top; border: 1px solid #f0f0f0;">
              ${fields[i].innerHTML}
            </td>
            <td width="50%" style="padding: 8px; vertical-align: top; border: 1px solid #f0f0f0;">
              ${fields[i + 1] ? fields[i + 1].innerHTML : ''}
            </td>
          </tr>
        `;
      }

      tableHtml += '</table>';
      container.outerHTML = tableHtml;
    });

    // =========================
    // 4️⃣ FIX APPROVAL SECTION (SAFE INSERT)
    // =========================
    const approvalTitle = Array.from(clone.querySelectorAll('*'))
      .find(el => el.textContent.trim() === 'APPROVAL');

    if (approvalTitle) {

      const signatureContainer = document.createElement('div');

      signatureContainer.innerHTML = `
        <table width="100%" style="border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td width="50%" style="padding: 10px;">
              <table width="100%" style="border:1px solid #ccc; padding:15px;">
                <tr><td style="padding-bottom:6px;">Name:</td></tr>
                <tr><td style="padding-bottom:6px;">Designation:</td></tr>
                <tr><td style="padding-bottom:6px;">Date:</td></tr>
                <tr>
                  <td style="padding-top:30px; text-align:center;">
                    <div style="border-top:1px solid #000;"></div>
                    <div style="margin-top:4px;">Signature</div>
                  </td>
                </tr>
              </table>
            </td>

            <td width="50%" style="padding: 10px;">
              <table width="100%" style="border:1px solid #ccc; padding:15px;">
                <tr><td style="padding-bottom:6px;">Name:</td></tr>
                <tr><td style="padding-bottom:6px;">Designation:</td></tr>
                <tr><td style="padding-bottom:6px;">Date:</td></tr>
                <tr>
                  <td style="padding-top:30px; text-align:center;">
                    <div style="border-top:1px solid #000;"></div>
                    <div style="margin-top:4px;">Signature</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;

      approvalTitle.insertAdjacentElement('afterend', signatureContainer);
    }

    const content = clone.innerHTML;

    // =========================
    // 5️⃣ FINAL WORD TEMPLATE
    // =========================
    const htmlTemplate = `
      <!DOCTYPE html>
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; }
          .form-section-title {
            background-color: #2D3E50 !important;
            color: #ffffff !important;
            padding: 8px !important;
            font-size: 12pt !important;
            font-weight: bold !important;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;

    const data = await asBlob(htmlTemplate, {
      orientation: 'portrait',
      margins: { top: 720, right: 720, bottom: 720, left: 720 },
    });

    saveAs(data, `${formId || 'Document'}.docx`);

  } catch (err) {
    console.error('Word export failed:', err);
  }
};
  return (
    <div className="modern-form-wrapper">

      <div className="form-action-bar no-print">
        <button
          className={`action-btn ${isPrintMode ? 'active' : ''}`}
          onClick={() => setIsPrintMode(!isPrintMode)}
        >
          {isPrintMode ? '✎ Edit Form' : '👁 Print Preview'}
        </button>

        {isPrintMode && (
          <>
            <button className="action-btn" onClick={handlePrintPDF}>
              Download PDF
            </button>
            <button className="action-btn" onClick={handleDownloadWord}>
              Download Word
            </button>
          </>
        )}
      </div>

      <div
        ref={printRef}
        className={`a4-container ${isPrintMode ? 'mode-a4' : 'mode-web'}`}
      >
        {children}
      </div>

    </div>
  );
};

export default ModernFormWrapper;