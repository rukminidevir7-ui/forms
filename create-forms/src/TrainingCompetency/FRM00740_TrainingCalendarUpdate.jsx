// FRM00740_TrainingCalendarLog.jsx
// FRM-00740 – Training Calendar Log / Register

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import "../styles/FRM00611.css";

const validationSchema = Yup.object({
  updatedBy: Yup.string().required("Required"),
});

const initialValues = {
  calendarEntries: [
    {
      month: "",
      trainingName: "",
      department: "",
      trainer: "",
      plannedDate: "",
      actualDate: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  updatedBy: "",
  hrManagerSignature: {},
  revisionHistory: "",

  additionalSignatures: [],
  attachments: [],
  customFields: []
};

const FRM00740_TrainingCalendarLog = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  // Add Column
  const addColumn = () => {
    const columnName = prompt("Enter New Field Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");

    if (dynamicColumns.find(col => col.key === key)) {
      alert("Field already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  // Remove Column
  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const renderField = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <Field name={name} type={type} className="form-input" />
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00740"
      title="Training Calendar Log / Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Training Calendar Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00740"
              title="TRAINING CALENDAR LOG / REGISTER"
              department="Training & Competency"
              process="Training Planning & Monitoring"
            >

              {/* TABLE SECTION */}
              <div className="form-section">
                <h3 className="form-section-title">Training Calendar Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                      style={{ marginRight: 10 }}
                    >
                      + Add Field
                    </button>
                  </div>
                )}

                <FieldArray name="calendarEntries">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({
                              month: "",
                              trainingName: "",
                              department: "",
                              trainer: "",
                              plannedDate: "",
                              actualDate: "",
                              status: "",
                              remarks: "",
                              dynamicFields: {}
                            })
                          }
                        >
                          + Add Entry
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Training Name</th>
                            <th>Department</th>
                            <th>Trainer</th>
                            <th>Planned Date</th>
                            <th>Actual Date</th>
                            <th>Status</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    style={{ marginLeft: 6 }}
                                    onClick={() => removeColumn(col.key)}
                                  >
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.calendarEntries.map((row, index) => (
                            <tr key={index}>

                              <td>
                                <Field
                                  name={`calendarEntries.${index}.month`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`calendarEntries.${index}.trainingName`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`calendarEntries.${index}.department`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`calendarEntries.${index}.trainer`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  type="date"
                                  name={`calendarEntries.${index}.plannedDate`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  type="date"
                                  name={`calendarEntries.${index}.actualDate`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                {!isPrintMode ? (
                                  <Field
                                    as="select"
                                    name={`calendarEntries.${index}.status`}
                                    className="form-input"
                                  >
                                    <option value="">Select</option>
                                    <option>Planned</option>
                                    <option>Completed</option>
                                    <option>Postponed</option>
                                    <option>Cancelled</option>
                                  </Field>
                                ) : (
                                  <div className="print-value">{row.status}</div>
                                )}
                              </td>

                              <td>
                                <Field
                                  name={`calendarEntries.${index}.remarks`}
                                  className="form-input"
                                />
                              </td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`calendarEntries.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* FOOTER */}
              <div className="form-section">
                <h3 className="form-section-title">Footer</h3>

                <div className="form-fields">
                  {renderField(values,"updatedBy","Updated By")}
                </div>

                <div className="three-column-signatures" style={{ marginTop: 20 }}>
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR Manager Approval"
                      value={values.hrManagerSignature}
                      onChange={(val) =>
                        setFieldValue("hrManagerSignature", val)
                      }
                    />
                  </div>
                </div>

                <Field
                  as="textarea"
                  name="revisionHistory"
                  placeholder="Revision History"
                  className="form-textarea"
                  rows="3"
                  style={{ marginTop: 20 }}
                />
              </div>

              {/* CUSTOM SIGNATURES */}
              <div className="form-section">
                <h3 className="form-section-title">Additional Signatures</h3>

                <FieldArray name="additionalSignatures">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() => push({ data: {} })}
                        >
                          + Add Custom Signature
                        </button>
                      )}

                      {values.additionalSignatures.map((sig, index) => (
                        <div key={index} style={{ marginBottom: 25 }}>
                          <ApprovalSignatureBlock
                            label={`Custom Signature ${index + 1}`}
                            value={sig.data || {}}
                            onChange={(val) =>
                              setFieldValue(
                                `additionalSignatures.${index}.data`,
                                val
                              )
                            }
                          />

                          {!isPrintMode && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Training Calendar Log
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00740_TrainingCalendarLog;
