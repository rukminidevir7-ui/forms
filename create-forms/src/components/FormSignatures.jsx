import React from 'react';
import { FieldArray, Field } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import '../styles/FormSignatures.css';

const FormSignatures = ({
  name = 'signatures',
  values = {},
  setFieldValue
}) => {

  const { isPrintMode } = usePrintMode();
  const list = values?.[name] || [];

  return (
    <div className="approval-section">

      <h3 className="approval-title">
        APPROVAL
      </h3>

      <FieldArray name={name}>
        {(helpers) => (
          <>

            <div className="approval-grid">

              {list.map((sig, i) => (
                <div key={sig?.id || i} className="approval-card">

                  {!isPrintMode ? (
                    <>
                      {/* ROLE */}
                      <Field
                        name={`${name}[${i}].role`}
                        placeholder="Prepared By / Reviewed By"
                        className="approval-role"
                      />

                      {/* NAME */}
                      <div className="approval-row">
                        <label>Name:</label>
                        <Field
                          name={`${name}[${i}].name`}
                          className="approval-input"
                        />
                      </div>

                      {/* DESIGNATION */}
                      <div className="approval-row">
                        <label>Designation:</label>
                        <Field
                          name={`${name}[${i}].designation`}
                          className="approval-input"
                        />
                      </div>

                      {/* DATE */}
                      <div className="approval-row">
                        <label>Date:</label>
                        <Field
                          type="date"
                          name={`${name}[${i}].date`}
                          className="approval-input"
                        />
                      </div>

                      {/* SIGNATURE */}
                      <div className="approval-signature">
                        Signature
                      </div>

                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => helpers.remove(i)}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="print-role">{sig.role}</div>

                      <div className="print-row">
                        <span>Name:</span>
                        <span>{sig.name}</span>
                      </div>

                      <div className="print-row">
                        <span>Designation:</span>
                        <span>{sig.designation}</span>
                      </div>

                      <div className="print-row">
                        <span>Date:</span>
                        <span>{sig.date}</span>
                      </div>

                      <div className="approval-signature">
                        Signature
                      </div>
                    </>
                  )}

                </div>
              ))}

            </div>

            {!isPrintMode && (
              <button
                type="button"
                className="btn-add-field"
                onClick={() =>
                  helpers.push({
                    id: uuidv4(),
                    role: '',
                    name: '',
                    designation: '',
                    date: ''
                  })
                }
              >
                Add Approval
              </button>
            )}

          </>
        )}
      </FieldArray>
    </div>
  );
};

export default FormSignatures;