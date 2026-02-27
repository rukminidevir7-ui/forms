// FRM01347_ECBRegisterUpdateLog.jsx
// FRM-01347 – ECB Register Update Log
// Enterprise Grade – FEMA & RBI – ECB / External Borrowings

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormAttachments from "../../components/FormAttachments";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  logPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01347",
  date: "",
  department: "FEMA & RBI (Foreign Exchange)",
  function: "ECB / External Borrowings",

  /* Organization Information */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  logPeriod: "",
  maintainedBy: "",

  /* Register Entries */
  registerEntries: [
    {
      entryDate: "",
      loanRef: "",
      lender: "",
      eventType: "",
      amount: "",
      currency: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* Notes */
  generalNotes: "",

  /* Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01347_ECBRegisterUpdateLog = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01347" title="ECB Register Update Log">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("ECB Register Update Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01347"
              title="ECB REGISTER UPDATE LOG"
              department="FEMA & RBI – ECB / External Borrowings"
            >

              {/* 1. ORGANIZATION INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">1. Organization Information</h3>
                <div className="form-fields">
                  {field(values, "companyName", "Company Name")}
                  {field(values, "cin", "CIN")}
                  {field(values, "pan", "PAN")}
                  {field(values, "authorizedDealerBank", "Authorized Dealer Bank")}
                  {field(values, "logPeriod", "Log Period")}
                  {field(values, "maintainedBy", "Maintained By")}
                </div>
              </div>

              {/* 2. REGISTER ENTRIES */}
              <div className="form-section">
                <h3 className="form-section-title">2. Register Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("registerEntries", [
                          ...values.registerEntries,
                          {
                            entryDate: "",
                            loanRef: "",
                            lender: "",
                            eventType: "",
                            amount: "",
                            currency: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Entry
                    </button>
                  </div>
                )}

                <FieldArray name="registerEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Loan Ref</th>
                          <th>Lender</th>
                          <th>Event Type</th>
                          <th>Amount</th>
                          <th>Currency</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={() => removeColumn(col.key)}
                                  style={{ marginLeft: 5 }}
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
                        {values.registerEntries.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <Field
                                name={`registerEntries.${index}.entryDate`}
                                type="date"
                                className="form-input"
                              />
                            </td>
                            <td>
                              <Field name={`registerEntries.${index}.loanRef`} className="form-input" />
                            </td>
                            <td>
                              <Field name={`registerEntries.${index}.lender`} className="form-input" />
                            </td>
                            <td>
                              <Field name={`registerEntries.${index}.eventType`} className="form-input" />
                            </td>
                            <td>
                              <Field name={`registerEntries.${index}.amount`} className="form-input" />
                            </td>
                            <td>
                              <Field name={`registerEntries.${index}.currency`} className="form-input" />
                            </td>
                            <td>
                              <Field name={`registerEntries.${index}.remarks`} className="form-input" />
                            </td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`registerEntries.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

                            {!isPrintMode && (
                              <td>
                                <button type="button" onClick={() => remove(index)}>
                                  Remove
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 3. NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">3. Notes</h3>
                <div className="form-fields">
                  {field(values, "generalNotes", "General Notes")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 4. SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">4. Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role, index) => (
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val) =>
                                setFieldValue(`approvalRoles.${index}.roleName`, val)
                              }
                              onChange={(val) =>
                                setFieldValue(`approvalRoles.${index}.data`, val)
                              }
                            />
                            {!isPrintMode && (
                              <button type="button" onClick={() => remove(index)}>
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ECB Register Log
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

export default FRM01347_ECBRegisterUpdateLog;