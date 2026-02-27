import React from 'react';
import { FieldArray } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';

const FormAttachments = ({
  name = 'attachments',
  values = {},
  onFileChange
}) => {

  const { isPrintMode } = usePrintMode();
  const list = values?.[name] || [];

  return (
    <div className="form-section">
      <h3 className="form-section-title">
        Supporting Documents / Attachments
      </h3>

      {/* ---------------- NORMAL MODE ---------------- */}
      {!isPrintMode && (
        <FieldArray name={name}>
          {(helpers) => (
            <div className="full-width">

              {list.length > 0 && list.map((att, i) => (
                <div key={att?.id || i} className="custom-field-row">

                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter Attachment Name"
                    value={att?.attachmentName || ''}
                    onChange={(e) =>
                      helpers.replace(i, {
                        ...att,
                        attachmentName: e.target.value
                      })
                    }
                  />

                  <input
                    type="file"
                    className="form-input"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];

                      if (file) {
                        helpers.replace(i, {
                          ...att,
                          id: att?.id || uuidv4(),
                          attachmentName:
                            att?.attachmentName || file.name,
                          fileName: file.name,
                          fileType: file.type,
                          fileData: file
                        });

                        if (onFileChange) {
                          onFileChange(file, i);
                        }
                      }
                    }}
                  />

                  <span className="file-name">
                    {att?.fileName || 'No file selected'}
                  </span>

                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => helpers.remove(i)}
                  >
                    Remove
                  </button>

                </div>
              ))}

              <button
                type="button"
                className="btn-add-field"
                onClick={() =>
                  helpers.push({
                    id: uuidv4(),
                    attachmentName: '',
                    fileName: '',
                    fileType: '',
                    fileData: null
                  })
                }
              >
                Add Attachment
              </button>

            </div>
          )}
        </FieldArray>
      )}

      {/* ---------------- PRINT MODE ---------------- */}
      {isPrintMode && list?.length > 0 && (
        <div className="modern-print-grid">
          {list.map((a, i) => (
            <div key={i} className="modern-print-row">
              <div className="print-label">
                {a?.attachmentName || 'Attachment'}
              </div>
              <div className="print-colon">:</div>
              <div className="print-value">
                {a?.fileName}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default FormAttachments;