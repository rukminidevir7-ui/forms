// FRM00943_00944_00945_SalesReturnCreditReview.jsx
// FRM-00943 / 00944 / 00945 – Sales Return Credit Review
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
  returnAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00943 / 00944 / 00945",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  priority: "",
  reviewType: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",

  /* Return Details */
  returnRequestNumber: "",
  returnDate: "",
  invoiceNumber: "",
  invoiceDate: "",
  returnAmount: "",
  currency: "",
  returnReason: "",

  /* Credit Assessment */
  eligibleCreditAmount: "",
  proposedCreditAmount: "",
  creditPercentage: "",
  impactAmount: "",
  assessmentNotes: "",

  /* Financial Impact */
  provisionAvailable: "",
  netImpact: "",
  impactDescription: "",

  /* Justification */
  businessJustification: "",
  supportingNotes: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00943_SalesReturnCreditReview = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00943"
      title="Sales Return Credit Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Sales Return Credit Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00943 / 00944 / 00945"
              title="SALES RETURN CREDIT REVIEW"
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
      <label className="form-label">Review Type</label>
      <Field name="reviewType" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= CUSTOMER DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Customer Details</h3>
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


{/* ================= RETURN DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Return Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Return Request Number</label>
      <Field name="returnRequestNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Return Date</label>
      <Field name="returnDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Number</label>
      <Field name="invoiceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Date</label>
      <Field name="invoiceDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Return Amount</label>
      <Field name="returnAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Return Reason</label>
      <Field name="returnReason" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= CREDIT ASSESSMENT ================= */}
<div className="form-section">
  <h3 className="form-section-title">Credit Assessment</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Eligible Credit Amount</label>
      <Field name="eligibleCreditAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Proposed Credit Amount</label>
      <Field name="proposedCreditAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Credit Percentage (%)</label>
      <Field name="creditPercentage" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Impact Amount</label>
      <Field name="impactAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Assessment Notes</label>
      <Field name="assessmentNotes" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= FINANCIAL IMPACT ================= */}
<div className="form-section">
  <h3 className="form-section-title">Financial Impact</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Provision Available</label>
      <Field name="provisionAvailable" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Net Impact</label>
      <Field name="netImpact" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Impact Description</label>
      <Field name="impactDescription" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= JUSTIFICATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Justification</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Business Justification</label>
      <Field name="businessJustification" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Supporting Notes</label>
      <Field name="supportingNotes" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= ATTACHMENTS ================= */}
<div className="form-section">
              <FormAttachments values={values}/>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Supporting Documents Attached?</label>
      <Field name="supportingDocumentsAttached" as="select" className="form-input">
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Document Reference</label>
      <Field name="documentReference" className="form-input"/>
    </div>

  </div>
</div>

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
                    Submit Sales Return Credit Review
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

export default FRM00943_SalesReturnCreditReview;