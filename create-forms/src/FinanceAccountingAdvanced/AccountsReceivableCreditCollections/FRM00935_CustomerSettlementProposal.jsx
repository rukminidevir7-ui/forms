// FRM00935_CustomerSettlementProposal.jsx
// FRM-00935 / 00936 / 00937 – Customer Settlement Proposal
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
  proposedSettlementAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00935 / 00936 / 00937",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  proposalType: "",
  priority: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",

  /* Settlement Details */
  outstandingAmount: "",
  currency: "",
  proposedSettlementAmount: "",
  settlementPercentage: "",
  proposedPaymentDate: "",
  paymentTerms: "",
  settlementReason: "",

  /* Financial Impact */
  provisionAvailable: "",
  impactAmount: "",
  impactDescription: "",

  /* Risk Assessment */
  riskLevel: "",
  riskComments: "",

  /* Justification */
  businessJustification: "",
  supportingNotes: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  /* Dynamic Approval Roles */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00935_CustomerSettlementProposal = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00935"
      title="Customer Settlement Proposal"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customer Settlement Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00935 / 00936 / 00937"
              title="CUSTOMER SETTLEMENT PROPOSAL"
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
      <label className="form-label">Proposal Type</label>
      <Field name="proposalType" className="form-input"/>
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


{/* ================= SETTLEMENT DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Settlement Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Outstanding Amount</label>
      <Field name="outstandingAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Proposed Settlement Amount</label>
      <Field name="proposedSettlementAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Settlement Percentage (%)</label>
      <Field name="settlementPercentage" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Proposed Payment Date</label>
      <Field name="proposedPaymentDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Payment Terms</label>
      <Field name="paymentTerms" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Settlement Reason</label>
      <Field name="settlementReason" className="form-input"/>
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
      <label className="form-label">Impact Amount</label>
      <Field name="impactAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Impact Description</label>
      <Field name="impactDescription" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= RISK ASSESSMENT ================= */}
<div className="form-section">
  <h3 className="form-section-title">Risk Assessment</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Risk Level</label>
      <Field name="riskLevel" as="select" className="form-input">
        <option value="">Select Risk Level</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Severe</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Risk Comments</label>
      <Field name="riskComments" className="form-input"/>
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
              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization Workflow</h3>

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
                    Submit Settlement Proposal
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

export default FRM00935_CustomerSettlementProposal;