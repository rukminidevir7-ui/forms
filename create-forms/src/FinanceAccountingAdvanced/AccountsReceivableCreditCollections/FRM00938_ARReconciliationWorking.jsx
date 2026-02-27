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
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="periodStart" type="date" className="form-input"/>
                  <Field name="periodEnd" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* ================= SUMMARY BALANCES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Summary Balances</h3>
                <div className="form-fields">
                  <Field name="openingBalance" type="number" placeholder="Opening Balance" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="totalInvoices" type="number" placeholder="Total Invoices" className="form-input"/>
                  <Field name="totalReceipts" type="number" placeholder="Total Receipts" className="form-input"/>
                  <Field name="adjustments" type="number" placeholder="Adjustments" className="form-input"/>
                  <Field name="closingBalance" type="number" placeholder="Closing Balance" className="form-input"/>
                </div>
              </div>

              {/* ================= RECONCILIATION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Reconciliation Details</h3>
                <div className="form-fields">
                  <Field name="ledgerBalance" type="number" placeholder="Ledger Balance" className="form-input"/>
                  <Field name="subLedgerBalance" type="number" placeholder="Sub-ledger Balance" className="form-input"/>
                  <Field name="differenceAmount" type="number" placeholder="Difference Amount" className="form-input"/>
                  <Field name="differenceReason" placeholder="Difference Reason" className="form-input"/>
                  <Field name="reconciliationStatus" as="select" className="form-input">
                    <option value="">Select Status</option>
                    <option>Matched</option>
                    <option>Pending Investigation</option>
                    <option>Adjusted</option>
                    <option>Escalated</option>
                  </Field>
                  <Field name="supportingNotes" placeholder="Supporting Notes" className="form-input"/>
                  <Field name="comments" placeholder="Comments" className="form-input"/>
                  <Field name="supportingReference" placeholder="Supporting Reference" className="form-input"/>
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