// FRM00765_BalanceSheetScheduleUpdate.jsx
// FRM-00765 – Balance Sheet Schedule Update (Request / Initiation – Enterprise Grade)

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
  requestId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  reportingPeriod: Yup.string().required("Required"),
  accountName: Yup.string().required("Required"),
  accountCode: Yup.string().required("Required"),
  scheduleOwner: Yup.string().required("Required"),
  openingBalance: Yup.number().required("Required"),
  closingBalance: Yup.number().required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

const initialValues = {
  companyName: "",
  requestId: "",
  department: "",
  requestDate: "",
  reportingPeriod: "",

  accountName: "",
  accountCode: "",
  scheduleOwner: "",

  openingBalance: "",
  adjustments: [
    {
      description: "",
      amount: "",
      dynamicFields: {}
    }
  ],

  closingBalance: "",
  supportingReference: "",

  differenceIdentified: "",
  explanation: "",
  adjustmentsRequired: "",
  status: "",

  supportingDocuments: false,
  policyReference: "",
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00765_BalanceSheetScheduleUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ==========================
     Dynamic Column Logic
  ========================== */

  const addColumn = () => {
    const columnName = prompt("Enter New Adjustment Column Name");
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

  const calculateTotalAdjustments = (items) =>
    items.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);

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
      formId="FRM-00765"
      title="Balance Sheet Schedule Update – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Balance Sheet Schedule Update Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totalAdjustments = calculateTotalAdjustments(values.adjustments);
          const calculatedClosing =
            (Number(values.openingBalance) || 0) + totalAdjustments;

          return (
            <Form>
              <ModernA4Template
                formId="FRM-00765"
                title="BALANCE SHEET SCHEDULE UPDATE"
                department="Finance & Accounting – General Ledger & Close"
              >

                {/* CONTROL HEADER */}
                <div className="form-section">
                  <h3 className="form-section-title">Control Header</h3>
                  <div className="form-fields">
                    {renderField(values,"companyName","Company Name")}
                    {renderField(values,"requestId","Request ID")}
                    {renderField(values,"department","Department / Process")}
                    {renderField(values,"requestDate","Request Date","date")}
                    {renderField(values,"reportingPeriod","Reporting Period")}
                  </div>
                </div>

                {/* SCHEDULE DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Schedule Details</h3>
                  <div className="form-fields">
                    {renderField(values,"accountName","Account Name")}
                    {renderField(values,"accountCode","Account Code")}
                    {renderField(values,"scheduleOwner","Schedule Owner")}
                    {renderField(values,"openingBalance","Opening Balance","number")}
                  </div>

                  <FieldArray name="adjustments">
                    {({ push, remove }) => (
                      <>

                        {/* SAME LINE BUTTONS WITH 10px GAP */}
                        {!isPrintMode && (
                          <div
                            style={{
                              marginTop: 10,
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
                                  description: "",
                                  amount: "",
                                  dynamicFields: {}
                                })
                              }
                            >
                              + Add Adjustment
                            </button>
                          </div>
                        )}

                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Amount</th>

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
                            {values.adjustments.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Field
                                    name={`adjustments.${index}.description`}
                                    className="form-input"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`adjustments.${index}.amount`}
                                    type="number"
                                    className="form-input"
                                  />
                                </td>

                                {dynamicColumns.map(col => (
                                  <td key={col.key}>
                                    <Field
                                      name={`adjustments.${index}.dynamicFields.${col.key}`}
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

                  <div className="form-fields" style={{ marginTop: 10 }}>
                    <div className="print-value">
                      Total Adjustments: {totalAdjustments}
                    </div>
                    <div className="print-value">
                      Calculated Closing Balance: {calculatedClosing}
                    </div>
                    {renderField(values,"closingBalance","Closing Balance","number")}
                    {renderField(values,"supportingReference","Supporting Reference")}
                  </div>
                </div>

                {/* RECONCILIATION SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Reconciliation Summary</h3>
                  <div className="form-fields">
                    {renderField(values,"differenceIdentified","Difference Identified")}
                    {renderField(values,"explanation","Explanation")}
                    {renderField(values,"adjustmentsRequired","Adjustments Required")}

                    {!isPrintMode ? (
                      <Field as="select" name="status" className="form-input">
                        <option value="">Status</option>
                        <option>Balanced</option>
                        <option>Difference Identified</option>
                        <option>Pending Review</option>
                      </Field>
                    ) : (
                      <div className="print-value">{values.status}</div>
                    )}
                  </div>
                </div>

                {/* CONTROL & COMPLIANCE */}
                <div className="form-section">
                  <h3 className="form-section-title">Control & Compliance</h3>
                  <div className="form-fields">
                    {renderField(values,"policyReference","Policy Reference")}
                    {renderField(values,"preparedBy","Prepared By")}
                    {renderField(values,"preparedDate","Prepared Date","date")}
                  </div>
                </div>

                <FormAttachments values={values} />
                <FormCustomFields values={values} />

                {/* APPROVAL WORKFLOW */}
                <div className="form-section">
                  <h3 className="form-section-title">Approval Workflow</h3>

                  <div className="three-column-signatures">
                    <ApprovalSignatureBlock
                      label="Reviewed By"
                      value={values.reviewedSignature}
                      onChange={(val) => setFieldValue("reviewedSignature", val)}
                    />
                    <ApprovalSignatureBlock
                      label="Finance Manager Approval"
                      value={values.financeManagerSignature}
                      onChange={(val) => setFieldValue("financeManagerSignature", val)}
                    />
                    <ApprovalSignatureBlock
                      label="Finance Controller Approval"
                      value={values.financeControllerSignature}
                      onChange={(val) => setFieldValue("financeControllerSignature", val)}
                    />
                  </div>
                </div>

                {!isPrintMode && (
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      Submit Schedule Update
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

export default FRM00765_BalanceSheetScheduleUpdate;
