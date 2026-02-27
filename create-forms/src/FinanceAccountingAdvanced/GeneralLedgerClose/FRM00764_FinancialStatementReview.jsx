// FRM00764_FinancialStatementReview.jsx
// FRM-00764 – Financial Statement Review (Enterprise Grade – Dynamic + Custom Signatures)

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
  reviewId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  reviewDate: Yup.string().required("Required"),
  reportingPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  versionNumber: Yup.string().required("Required"),
  materialityThreshold: Yup.number().required("Required"),
  overallConclusion: Yup.string().required("Required")
});

const initialChecklist = [
  {
    reviewArea: "Balance Sheet Checks",
    keyChecks: "Assets = Liabilities + Equity validation",
    status: "",
    comments: "",
    dynamicFields: {}
  }
];

const initialValues = {
  companyName: "",
  reviewId: "",
  department: "",
  reviewDate: "",
  reportingPeriod: "",

  statementsReviewed: {
    balanceSheet: false,
    pnl: false,
    cashFlow: false,
    notes: false
  },

  preparedBy: "",
  versionNumber: "",
  materialityThreshold: "",

  checklist: initialChecklist,

  issuesIdentified: "",
  managementAdjustments: "",
  overallConclusion: "",

  preparedSignature: {},
  reviewedSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00764_FinancialStatementReview = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ==========================
     Dynamic Column Logic
  ========================== */

  const addColumn = () => {
    const columnName = prompt("Enter New Checklist Column Name");
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
    <ModernFormWrapper formId="FRM-00764" title="Financial Statement Review">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Financial Statement Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00764"
              title="FINANCIAL STATEMENT REVIEW"
              department="Finance & Accounting – Financial Reporting"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"reviewId","Review ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"reviewDate","Review Date","date")}
                  {renderField(values,"reportingPeriod","Reporting Period")}
                </div>
              </div>

              {/* STATEMENT SCOPE */}
              <div className="form-section">
                <h3 className="form-section-title">Statement Scope</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Statements Reviewed</label>
                    {!isPrintMode ? (
                      <>
                        <label><Field type="checkbox" name="statementsReviewed.balanceSheet" /> Balance Sheet</label><br/>
                        <label><Field type="checkbox" name="statementsReviewed.pnl" /> P&L</label><br/>
                        <label><Field type="checkbox" name="statementsReviewed.cashFlow" /> Cash Flow</label><br/>
                        <label><Field type="checkbox" name="statementsReviewed.notes" /> Notes</label>
                      </>
                    ) : (
                      <div className="print-value">
                        {Object.entries(values.statementsReviewed)
                          .filter(([_, v]) => v)
                          .map(([k]) => k)
                          .join(", ")}
                      </div>
                    )}
                  </div>

                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"versionNumber","Version / Draft Number")}
                  {renderField(values,"materialityThreshold","Materiality Threshold","number")}

                </div>
              </div>

              {/* REVIEW CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">Review Checklist</h3>

                <FieldArray name="checklist">
                  {({ push, remove }) => (
                    <>

                      {/* SAME LINE BUTTONS */}
                      {!isPrintMode && (
                        <div style={{ display: "flex", gap: "10px", marginBottom: 10 }}>
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
                                reviewArea:"",
                                keyChecks:"",
                                status:"",
                                comments:"",
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Checklist Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Review Area</th>
                            <th>Key Checks Performed</th>
                            <th>Status</th>
                            <th>Comments</th>

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
                          {values.checklist.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`checklist.${index}.reviewArea`} className="form-input"/></td>
                              <td><Field name={`checklist.${index}.keyChecks`} className="form-input"/></td>

                              <td>
                                {!isPrintMode ? (
                                  <Field as="select" name={`checklist.${index}.status`} className="form-input">
                                    <option value="">Select</option>
                                    <option>Completed</option>
                                    <option>Pending</option>
                                    <option>Exception</option>
                                  </Field>
                                ) : (
                                  <div className="print-value">{row.status}</div>
                                )}
                              </td>

                              <td>
                                <Field name={`checklist.${index}.comments`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`checklist.${index}.dynamicFields.${col.key}`}
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

              {/* FINDINGS */}
              <div className="form-section">
                <h3 className="form-section-title">Findings</h3>
                <div className="form-fields">
                  {renderField(values,"issuesIdentified","Issues Identified")}
                  {renderField(values,"managementAdjustments","Management Adjustments Required")}
                  {renderField(values,"overallConclusion","Overall Conclusion")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val) => setFieldValue("preparedSignature", val)}
                  />
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
                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val) => setFieldValue("cfoSignature", val)}
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
                    Submit Financial Statement Review
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

export default FRM00764_FinancialStatementReview;
