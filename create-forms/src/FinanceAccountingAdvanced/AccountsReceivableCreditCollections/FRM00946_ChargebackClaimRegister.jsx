// FRM00946_ChargebackClaimRegister.jsx
// FRM-00946 – Chargeback / Claim Register
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
  claimId: Yup.string().required("Required"),
  claimAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00946",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",

  /* Claim Details */
  claimId: "",
  claimDate: "",
  customerName: "",
  customerId: "",
  invoiceNumber: "",
  claimType: "",

  /* Financial Information */
  claimAmount: "",
  currency: "",
  approvedAmount: "",
  recoveredAmount: "",
  outstandingAmount: "",
  agingBucket: "",

  /* Status Tracking */
  status: "",
  priority: "",
  assignedTo: "",
  targetResolutionDate: "",
  resolutionSummary: "",
  actualClosureDate: "",
  notes: "",
  comments: "",
  supportingReference: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Logged By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00946_ChargebackClaimRegister = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00946"
      title="Chargeback / Claim Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Chargeback / Claim Register Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00946"
              title="CHARGEBACK / CLAIM REGISTER"
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
      <label className="form-label">Reference Number</label>
      <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location</label>
      <Field name="location" placeholder="Location" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= CLAIM DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Claim Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Claim ID</label>
      <Field name="claimId" placeholder="Claim ID" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Claim Date</label>
      <Field name="claimDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Customer Name</label>
      <Field name="customerName" placeholder="Customer Name" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Customer ID</label>
      <Field name="customerId" placeholder="Customer ID" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Number</label>
      <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Claim Type</label>
      <Field name="claimType" placeholder="Claim Type" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= FINANCIAL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Financial Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Claim Amount</label>
      <Field name="claimAmount" type="number" placeholder="Claim Amount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" placeholder="Currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Approved Amount</label>
      <Field name="approvedAmount" type="number" placeholder="Approved Amount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Recovered Amount</label>
      <Field name="recoveredAmount" type="number" placeholder="Recovered Amount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Outstanding Amount</label>
      <Field name="outstandingAmount" type="number" placeholder="Outstanding Amount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Aging Bucket</label>
      <Field name="agingBucket" placeholder="Aging Bucket" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= STATUS TRACKING ================= */}
<div className="form-section">
  <h3 className="form-section-title">Status Tracking</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Status</label>
      <Field name="status" placeholder="Status" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Priority</label>
      <Field name="priority" as="select" className="form-input">
        <option value="">Select Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Assigned To</label>
      <Field name="assignedTo" placeholder="Assigned To" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Target Resolution Date</label>
      <Field name="targetResolutionDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Resolution Summary</label>
      <Field name="resolutionSummary" placeholder="Resolution Summary" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Actual Closure Date</label>
      <Field name="actualClosureDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Notes</label>
      <Field name="notes" placeholder="Notes" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Comments</label>
      <Field name="comments" placeholder="Comments" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Supporting Reference</label>
      <Field name="supportingReference" placeholder="Supporting Reference" className="form-input"/>
    </div>

  </div>
</div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* ================= AUTHORIZATION ================= */}
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
                                setFieldValue(`approvalRoles.${index}.roleName`, newName)
                              }
                              onChange={(val) =>
                                setFieldValue(`approvalRoles.${index}.data`, val)
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
                    Submit Chargeback / Claim Register
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

export default FRM00946_ChargebackClaimRegister;