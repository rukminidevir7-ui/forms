// FRM00756_IntercompanyJournal.jsx
// FRM-00756 – Intercompany Journal (Request / Initiation Form – Enterprise Grade – Updated)

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
  icJournalId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  journalDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),
  fromEntity: Yup.string().required("Required"),
  toEntity: Yup.string().required("Required"),
  transactionType: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

const initialValues = {
  companyName: "",
  icJournalId: "",
  department: "",
  journalDate: "",
  accountingPeriod: "",

  fromEntity: "",
  toEntity: "",
  transactionType: "",
  referenceDocument: "",
  currency: "",
  exchangeRate: "",
  description: "",

  lineItems: [
    {
      entity: "",
      accountCode: "",
      accountDescription: "",
      costCenter: "",
      debit: "",
      credit: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  supportingDocuments: false,
  transferPricingConsidered: false,
  policyReference: "",
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},

  attachments: [],
  customFields: []
};

const FRM00756_IntercompanyJournal = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ============================
     Dynamic Column Logic
  ============================ */

  const addColumn = () => {
    const columnName = prompt("Enter New Line Item Field Name");
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

  /* ============================
     Totals Calculation
  ============================ */

  const calculateTotals = (items) => {
    const totalDebit = items.reduce((sum, row) => sum + (Number(row.debit) || 0), 0);
    const totalCredit = items.reduce((sum, row) => sum + (Number(row.credit) || 0), 0);
    return {
      totalDebit,
      totalCredit,
      difference: totalDebit - totalCredit
    };
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
      formId="FRM-00756"
      title="Intercompany Journal – Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const totals = calculateTotals(values.lineItems);
          if (totals.difference !== 0) {
            alert("Debit and Credit must be equal before submission.");
            return;
          }
          console.log(values);
          alert("Intercompany Journal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totals = calculateTotals(values.lineItems);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-00756"
                title="INTERCOMPANY JOURNAL"
                department="Finance & Accounting – General Ledger & Close"
              >

                {/* CONTROL HEADER */}
                <div className="form-section">
                  <h3 className="form-section-title">Control Header</h3>
                  <div className="form-fields">
                    {renderField(values,"companyName","Company Name")}
                    {renderField(values,"icJournalId","IC Journal ID")}
                    {renderField(values,"department","Department / Process")}
                    {renderField(values,"journalDate","Journal Date","date")}
                    {renderField(values,"accountingPeriod","Accounting Period")}
                  </div>
                </div>

                {/* INTERCOMPANY DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Intercompany Details</h3>
                  <div className="form-fields">
                    {renderField(values,"fromEntity","From Entity / Company Code")}
                    {renderField(values,"toEntity","To Entity / Company Code")}

                    {!isPrintMode ? (
                      <div className="form-field">
                        <label className="form-label">Transaction Type</label>
                        <Field as="select" name="transactionType" className="form-input">
                          <option value="">Select</option>
                          <option>Intercompany Revenue</option>
                          <option>Intercompany Expense</option>
                          <option>Loan / Advance</option>
                          <option>Cost Allocation</option>
                          <option>Transfer Pricing Adjustment</option>
                        </Field>
                      </div>
                    ) : (
                      <div className="print-value">{values.transactionType}</div>
                    )}

                    {renderField(values,"referenceDocument","Reference Document")}
                    {renderField(values,"currency","Currency")}
                    {renderField(values,"exchangeRate","Exchange Rate","number")}
                    {renderField(values,"description","Description / Narration")}
                  </div>
                </div>

                {/* LINE ITEMS */}
                <div className="form-section">
                  <h3 className="form-section-title">Line Items</h3>

                  {!isPrintMode && (
                    <div style={{ marginBottom: 15 }}>
                      <button
                        type="button"
                        className="btn-submit"
                        onClick={addColumn}
                        style={{ marginRight: 15 }}
                      >
                        + Add Custom Column
                      </button>
                    </div>
                  )}

                  <FieldArray name="lineItems">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 20 }}
                            onClick={() =>
                              push({
                                entity:"",
                                accountCode:"",
                                accountDescription:"",
                                costCenter:"",
                                debit:"",
                                credit:"",
                                remarks:"",
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Line Item
                          </button>
                        )}

                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>Entity</th>
                              <th>Account Code</th>
                              <th>Description</th>
                              <th>Cost Center</th>
                              <th>Debit</th>
                              <th>Credit</th>
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
                            {values.lineItems.map((row, index) => (
                              <tr key={index}>
                                <td><Field name={`lineItems.${index}.entity`} className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.accountCode`} className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.accountDescription`} className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.costCenter`} className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.debit`} type="number" className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.credit`} type="number" className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.remarks`} className="form-input"/></td>

                                {dynamicColumns.map(col => (
                                  <td key={col.key}>
                                    <Field
                                      name={`lineItems.${index}.dynamicFields.${col.key}`}
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

                {/* TOTALS */}
                <div className="form-section">
                  <h3 className="form-section-title">Totals</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Debit: {totals.totalDebit}</div>
                    <div className="print-value">Total Credit: {totals.totalCredit}</div>
                    <div className="print-value">Difference: {totals.difference}</div>
                  </div>
                </div>

                {/* COMPLIANCE & CONTROL */}
                <div className="form-section">
                  <h3 className="form-section-title">Compliance & Control</h3>
                  <div className="form-fields">

                    <div className="form-field">
                      <label className="form-label">Supporting Documents Attached</label>
                      {!isPrintMode ? (
                        <Field type="checkbox" name="supportingDocuments" />
                      ) : (
                        <div className="print-value">
                          {values.supportingDocuments ? "Yes" : "No"}
                        </div>
                      )}
                    </div>

                    <div className="form-field">
                      <label className="form-label">Transfer Pricing Considered</label>
                      {!isPrintMode ? (
                        <Field type="checkbox" name="transferPricingConsidered" />
                      ) : (
                        <div className="print-value">
                          {values.transferPricingConsidered ? "Yes" : "No"}
                        </div>
                      )}
                    </div>

                    {renderField(values,"policyReference","Policy Reference")}
                    {renderField(values,"preparedBy","Prepared By")}
                    {renderField(values,"preparedDate","Prepared Date","date")}
                  </div>
                </div>

                {/* ATTACHMENTS & CUSTOM FIELDS */}
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
                      Submit Intercompany Journal
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

export default FRM00756_IntercompanyJournal;
