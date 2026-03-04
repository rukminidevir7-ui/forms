// FRM00938_ARReconciliationWorking.jsx
// FRM-00938 – AR Reconciliation Working
// Enterprise Grade – Accounts Receivable, Credit & Collections

import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  referenceNumber: Yup.string().required("Required"),
  periodStart: Yup.date().required("Required"),
  periodEnd: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00938",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  periodStart: "",
  periodEnd: "",
  referenceNumber: "",
  location: "",

  /* Summary Balances */
  openingBalance: "",
  currency: "",
  totalInvoices: "",
  totalReceipts: "",
  adjustments: "",
  closingBalance: "",

  /* Reconciliation Details */
  ledgerBalance: "",
  subLedgerBalance: "",
  differenceAmount: "",
  differenceReason: "",
  reconciliationStatus: "",
  supportingNotes: "",
  comments: "",
  supportingReference: "",

  /* Approval Roles */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00938_ARReconciliationWorking = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00938"
      title="AR Reconciliation Working"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("AR Reconciliation Working Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00938"
              title="AR RECONCILIATION WORKING"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >
{/* ================= GENERAL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">General Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Form ID</label>
      <Field name="formId" disabled className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Department</label>
      <Field name="department" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Function</label>
      <Field name="function" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Period Start</label>
      <Field name="periodStart" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Period End</label>
      <Field name="periodEnd" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field name="referenceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location</label>
      <Field name="location" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= SUMMARY BALANCES ================= */}
<div className="form-section">
  <h3 className="form-section-title">Summary Balances</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Opening Balance</label>
      <Field name="openingBalance" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Total Invoices</label>
      <Field name="totalInvoices" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Total Receipts</label>
      <Field name="totalReceipts" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Adjustments</label>
      <Field name="adjustments" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Closing Balance</label>
      <Field name="closingBalance" type="number" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= RECONCILIATION DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Reconciliation Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Ledger Balance</label>
      <Field name="ledgerBalance" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Sub-ledger Balance</label>
      <Field name="subLedgerBalance" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Difference Amount</label>
      <Field name="differenceAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Difference Reason</label>
      <Field name="differenceReason" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reconciliation Status</label>
      <Field name="reconciliationStatus" as="select" className="form-input">
        <option value="">Select Status</option>
        <option>Matched</option>
        <option>Pending Investigation</option>
        <option>Adjusted</option>
        <option>Escalated</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Supporting Notes</label>
      <Field name="supportingNotes" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Comments</label>
      <Field name="comments" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Supporting Reference</label>
      <Field name="supportingReference" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* ================= AUTHORIZATION WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() =>
                            push({ roleName: "New Role", data: {} })
                          }
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
                              onRoleNameChange={(newName) =>
                                setFieldValue(
                                  `approvalRoles.${index}.roleName`,
                                  newName
                                )
                              }
                              onChange={(val) =>
                                setFieldValue(
                                  `approvalRoles.${index}.data`,
                                  val
                                )
                              }
                            />

                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={() => remove(index)}
                              >
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
                    Submit AR Reconciliation
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

export default FRM00938_ARReconciliationWorking;