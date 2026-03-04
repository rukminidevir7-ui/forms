// FRM00939_00940_00941_UnappliedCashReview.jsx
// FRM-00939 / 00940 / 00941 – Unapplied Cash Review
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
  customerName: Yup.string().required("Required"),
  unappliedAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00939 / 00940 / 00941",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  reviewPeriod: "",
  priority: "",

  /* Customer / Payer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",

  /* Cash Details */
  receiptNumber: "",
  receiptDate: "",
  unappliedAmount: "",
  currency: "",
  paymentMethod: "",
  bankReference: "",

  /* Review Details */
  reasonForUnappliedCash: "",
  investigationSummary: "",
  recommendedAction: "",
  targetResolutionDate: "",

  /* Financial Impact */
  impactAmount: "",
  impactDescription: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00939_UnappliedCashReview = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00939"
      title="Unapplied Cash Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Unapplied Cash Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00939 / 00940 / 00941"
              title="UNAPPLIED CASH REVIEW"
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
      <Field name="referenceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location</label>
      <Field name="location" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Review Period</label>
      <Field name="reviewPeriod" className="form-input"/>
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

  </div>
</div>


{/* ================= CUSTOMER / PAYER DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Customer / Payer Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Customer Name</label>
      <Field name="customerName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Customer ID</label>
      <Field name="customerId" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Account Number</label>
      <Field name="accountNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Business Address</label>
      <Field name="businessAddress" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field name="contactPerson" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Phone</label>
      <Field name="phone" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= CASH DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Cash Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Receipt Number</label>
      <Field name="receiptNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Receipt Date</label>
      <Field name="receiptDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Unapplied Amount</label>
      <Field name="unappliedAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Payment Method</label>
      <Field name="paymentMethod" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Bank Reference</label>
      <Field name="bankReference" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= REVIEW DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Review Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Reason for Unapplied Cash</label>
      <Field name="reasonForUnappliedCash" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Investigation Summary</label>
      <Field name="investigationSummary" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Recommended Action</label>
      <Field name="recommendedAction" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Target Resolution Date</label>
      <Field name="targetResolutionDate" type="date" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= FINANCIAL IMPACT ================= */}
<div className="form-section">
  <h3 className="form-section-title">Financial Impact</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Impact Amount</label>
      <Field name="impactAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Impact Description</label>
      <Field name="impactDescription" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= ATTACHMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  <Field name="supportingDocumentsAttached" as="select" className="form-input">
                    <option value="">Supporting Documents Attached?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
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
                    Submit Unapplied Cash Review
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

export default FRM00939_UnappliedCashReview;