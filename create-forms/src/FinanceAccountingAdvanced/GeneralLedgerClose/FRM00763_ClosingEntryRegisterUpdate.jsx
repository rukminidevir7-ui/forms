// FRM00763_ClosingEntryRegisterUpdate.jsx
// FRM-00763 – Closing Entry Register Update Log (Enterprise Grade – Final)

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

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  logId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  logDate: Yup.string().required("Required"),
  closePeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

const initialValues = {
  companyName: "",
  logId: "",
  department: "",
  logDate: "",
  closePeriod: "",

  register: [
    {
      entryId: "",
      journalNumber: "",
      entryDate: "",
      entryType: "",
      description: "",
      debitTotal: "",
      creditTotal: "",
      preparedBy: "",
      reviewedBy: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  exceptions: "",
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeControllerSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00763_ClosingEntryRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ==========================
     Dynamic Column Logic
  ========================== */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");

    if (dynamicColumns.find(col => col.key === key)) {
      alert("Field already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  /* ==========================
     Summary Calculation
  ========================== */

  const calculateSummary = (entries) => {
    const totalEntries = entries.length;

    const openItems = entries.filter(
      (e) => e.status === "Open" || e.status === "Pending"
    ).length;

    const exceptions = entries.filter(
      (e) => e.status === "Exception"
    ).length;

    return { totalEntries, openItems, exceptions };
  };

  const renderField = (values, name, label, type = "text") => (
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
    <ModernFormWrapper
      formId="FRM-00763"
      title="Closing Entry Register Update Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Closing Entry Register Updated Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values.register);

          return (
            <Form>
              <ModernA4Template
                formId="FRM-00763"
                title="CLOSING ENTRY REGISTER UPDATE"
                department="Finance & Accounting – General Ledger & Close"
              >

                {/* CONTROL HEADER */}
                <div className="form-section">
                  <h3 className="form-section-title">Control Header</h3>
                  <div className="form-fields">
                    {renderField(values,"companyName","Company Name")}
                    {renderField(values,"logId","Log ID")}
                    {renderField(values,"department","Department / Process")}
                    {renderField(values,"logDate","Log Date","date")}
                    {renderField(values,"closePeriod","Close Period")}
                  </div>
                </div>

                {/* REGISTER TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Closing Entry Register</h3>

                  <FieldArray name="register">
                    {({ push, remove }) => (
                      <>

                        {/* SAME LINE BUTTONS WITH 10px GAP */}
                        {!isPrintMode && (
                          <div
                            style={{
                              marginBottom: 10,
                              display: "flex",
                              gap: "10px"
                            }}
                          >
                            <button
                              type="button"
                              className="btn-submit"
                              onClick={addColumn}
                            >
                              + Add Custom Column
                            </button>

                            <button
                              type="button"
                              className="btn-submit"
                              onClick={() =>
                                push({
                                  entryId:"",
                                  journalNumber:"",
                                  entryDate:"",
                                  entryType:"",
                                  description:"",
                                  debitTotal:"",
                                  creditTotal:"",
                                  preparedBy:"",
                                  reviewedBy:"",
                                  status:"",
                                  remarks:"",
                                  dynamicFields: {}
                                })
                              }
                            >
                              + Add Entry
                            </button>
                          </div>
                        )}

                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>Entry ID</th>
                              <th>Journal No.</th>
                              <th>Date</th>
                              <th>Type</th>
                              <th>Description</th>
                              <th>Debit</th>
                              <th>Credit</th>
                              <th>Prepared By</th>
                              <th>Reviewed By</th>
                              <th>Status</th>
                              <th>Remarks</th>

                              {dynamicColumns.map(col => (
                                <th key={col.key}>
                                  {col.label}
                                  {!isPrintMode && (
                                    <button
                                      type="button"
                                      style={{ marginLeft: 5 }}
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
                            {values.register.map((row, index) => (
                              <tr key={index}>
                                <td><Field name={`register.${index}.entryId`} className="form-input"/></td>
                                <td><Field name={`register.${index}.journalNumber`} className="form-input"/></td>
                                <td><Field name={`register.${index}.entryDate`} type="date" className="form-input"/></td>
                                <td><Field name={`register.${index}.entryType`} className="form-input"/></td>
                                <td><Field name={`register.${index}.description`} className="form-input"/></td>
                                <td><Field name={`register.${index}.debitTotal`} type="number" className="form-input"/></td>
                                <td><Field name={`register.${index}.creditTotal`} type="number" className="form-input"/></td>
                                <td><Field name={`register.${index}.preparedBy`} className="form-input"/></td>
                                <td><Field name={`register.${index}.reviewedBy`} className="form-input"/></td>

                                <td>
                                  {!isPrintMode ? (
                                    <Field as="select" name={`register.${index}.status`} className="form-input">
                                      <option value="">Select</option>
                                      <option>Open</option>
                                      <option>Posted</option>
                                      <option>Reversed</option>
                                      <option>Exception</option>
                                      <option>Pending</option>
                                    </Field>
                                  ) : (
                                    <div className="print-value">{row.status}</div>
                                  )}
                                </td>

                                <td><Field name={`register.${index}.remarks`} className="form-input"/></td>

                                {dynamicColumns.map(col => (
                                  <td key={col.key}>
                                    <Field
                                      name={`register.${index}.dynamicFields.${col.key}`}
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

                      </>
                    )}
                  </FieldArray>
                </div>

                {/* CONTROL SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Control Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Entries Logged: {summary.totalEntries}</div>
                    <div className="print-value">Open Items: {summary.openItems}</div>
                    <div className="print-value">Exceptions: {summary.exceptions}</div>
                    {renderField(values,"preparedBy","Prepared By")}
                    {renderField(values,"preparedDate","Prepared Date","date")}
                    {renderField(values,"exceptions","Exception Notes")}
                  </div>
                </div>

                <FormAttachments values={values} />
                <FormCustomFields values={values} />

                {/* SIGN-OFF */}
                <div className="form-section">
                  <h3 className="form-section-title">Sign-Off</h3>

                  <div className="three-column-signatures">
                    <ApprovalSignatureBlock
                      label="Reviewed By"
                      value={values.reviewedSignature}
                      onChange={(val) => setFieldValue("reviewedSignature", val)}
                    />

                    <ApprovalSignatureBlock
                      label="Finance Controller"
                      value={values.financeControllerSignature}
                      onChange={(val) => setFieldValue("financeControllerSignature", val)}
                    />
                  </div>

                  {/* Custom Signatures */}
                  <div style={{ marginTop: 10 }}>
                    <FieldArray name="additionalSignatures">
                      {({ push, remove }) => (
                        <>
                          {!isPrintMode && (
                            <button
                              type="button"
                              className="btn-submit"
                              style={{ marginBottom: 10 }}
                              onClick={() => push({ data: {} })}
                            >
                              + Add Custom Signature
                            </button>
                          )}

                          {values.additionalSignatures.map((sig, index) => (
                            <div key={index} style={{ marginBottom: 10 }}>
                              <ApprovalSignatureBlock
                                label={`Custom Signature ${index + 1}`}
                                value={sig.data || {}}
                                onChange={(val) =>
                                  setFieldValue(`additionalSignatures.${index}.data`, val)
                                }
                              />
                              {!isPrintMode && (
                                <button type="button" onClick={() => remove(index)}>
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </div>

                </div>

                {!isPrintMode && (
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      Submit Closing Register
                    </button>
                  </div>
                )}

              </ModernA4Template>
            </Form>
          );
        }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00763_ClosingEntryRegisterUpdate;
