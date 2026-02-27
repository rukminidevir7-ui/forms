// FRM00741_JournalVoucherPreparation.jsx
// FRM-00741 – Journal Voucher Preparation (Enterprise Grade – Updated)

import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../../PrintModeContext';
import ModernFormWrapper from '../../components/ModernFormWrapper';
import ModernA4Template from '../../components/ModernA4Template';
import FormAttachments from '../../components/FormAttachments';
import FormCustomFields from '../../components/FormCustomFields';
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import '../../styles/FRM00611.css';

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  jvNumber: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  jvDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),
  jvType: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  narration: Yup.string().required("Required"),
  lineItems: Yup.array().of(
    Yup.object().shape({
      accountCode: Yup.string().required("Required")
    })
  ).min(1, "At least one line required")
});

const initialValues = {
  companyName: '',
  jvNumber: '',
  department: '',
  jvDate: '',
  accountingPeriod: '',
  jvType: '',
  referenceDocument: '',
  businessUnit: '',
  currency: '',
  exchangeRate: '',
  narration: '',
  lineItems: [
    {
      accountCode: '',
      accountDescription: '',
      costCenter: '',
      debit: '',
      credit: '',
      taxCode: '',
      remarks: '',
      dynamicFields: {}
    }
  ],
  supportingDocs: '',
  policyReference: '',
  preparedByDate: '',
  reviewedSignature: {},
  financeApprovalSignature: {},
  authorizedSignature: {},
  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00741_JournalVoucherPreparation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

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

  const calculateTotals = (items) => {
    const totalDebit = items.reduce((sum, row) => sum + (Number(row.debit) || 0), 0);
    const totalCredit = items.reduce((sum, row) => sum + (Number(row.credit) || 0), 0);
    return { totalDebit, totalCredit, difference: totalDebit - totalCredit };
  };

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '_________'}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00741" title="Journal Voucher Preparation">

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
          alert("Journal Voucher Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totals = calculateTotals(values.lineItems);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-00741"
                title="JOURNAL VOUCHER PREPARATION"
                department="Finance & Accounting – General Ledger Close"
              >

                {/* CONTROL HEADER */}
                <div className="form-section">
                  <h3 className="form-section-title">Control Header</h3>
                  <div className="form-fields">
                    {field(values,'companyName','Company Name')}
                    {field(values,'jvNumber','JV Number')}
                    {field(values,'department','Department / Process')}
                    {field(values,'jvDate','JV Date','date')}
                    {field(values,'accountingPeriod','Accounting Period')}
                  </div>
                </div>

                {/* VOUCHER DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Voucher Details</h3>
                  <div className="form-fields">
                    {field(values,'jvType','JV Type')}
                    {field(values,'referenceDocument','Reference Document')}
                    {field(values,'businessUnit','Business Unit')}
                    {field(values,'currency','Currency')}
                    {field(values,'exchangeRate','Exchange Rate')}
                    {field(values,'narration','Description / Narration')}
                  </div>
                </div>

                {/* LINE ITEMS */}
                <div className="form-section">
                  <h3 className="form-section-title">Line Items</h3>

                  {!isPrintMode && (
                    <button type="button" className="btn-submit" onClick={addColumn} style={{ marginBottom: 15 }}>
                      + Add Custom Column
                    </button>
                  )}

                  <FieldArray name="lineItems">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 15 }}
                            onClick={() =>
                              push({
                                accountCode: '',
                                accountDescription: '',
                                costCenter: '',
                                debit: '',
                                credit: '',
                                taxCode: '',
                                remarks: '',
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
                              <th>Account Code</th>
                              <th>Description</th>
                              <th>Cost Center</th>
                              <th>Debit</th>
                              <th>Credit</th>
                              <th>Tax Code</th>
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
                            {values.lineItems.map((row, index) => (
                              <tr key={index}>
                                <td><Field name={`lineItems.${index}.accountCode`} className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.accountDescription`} className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.costCenter`} className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.debit`} type="number" className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.credit`} type="number" className="form-input"/></td>
                                <td><Field name={`lineItems.${index}.taxCode`} className="form-input"/></td>
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

                {/* COMPLIANCE */}
                <div className="form-section">
                  <h3 className="form-section-title">Compliance</h3>
                  <div className="form-fields">
                    {field(values,'supportingDocs','Supporting Documents')}
                    {field(values,'policyReference','Policy Reference')}
                    {field(values,'preparedByDate','Prepared By / Date')}
                  </div>
                </div>

                {/* ATTACHMENTS & CUSTOM FIELDS BEFORE SIGNATURES */}
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
                      label="Finance Approval"
                      value={values.financeApprovalSignature}
                      onChange={(val) => setFieldValue("financeApprovalSignature", val)}
                    />

                    <ApprovalSignatureBlock
                      label="Authorized Signatory"
                      value={values.authorizedSignature}
                      onChange={(val) => setFieldValue("authorizedSignature", val)}
                    />

                  </div>

                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginTop: 20 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginTop: 20 }}>
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

                {!isPrintMode && (
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      Submit Journal Voucher
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

export default FRM00741_JournalVoucherPreparation;
