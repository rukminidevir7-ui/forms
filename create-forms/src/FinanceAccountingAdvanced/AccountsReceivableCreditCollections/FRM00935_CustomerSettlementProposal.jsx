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
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="proposalType" placeholder="Proposal Type" className="form-input"/>
                  <Field name="priority" as="select" className="form-input">
                    <option value="">Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </Field>
                </div>
              </div>

              {/* ================= CUSTOMER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                </div>
              </div>

              {/* ================= SETTLEMENT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Settlement Details</h3>
                <div className="form-fields">
                  <Field name="outstandingAmount" type="number" placeholder="Outstanding Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="proposedSettlementAmount" type="number" placeholder="Proposed Settlement Amount" className="form-input"/>
                  <Field name="settlementPercentage" type="number" placeholder="Settlement Percentage (%)" className="form-input"/>
                  <Field name="proposedPaymentDate" type="date" className="form-input"/>
                  <Field name="paymentTerms" placeholder="Payment Terms" className="form-input"/>
                  <Field name="settlementReason" placeholder="Settlement Reason" className="form-input"/>
                </div>
              </div>

              {/* ================= FINANCIAL IMPACT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>
                <div className="form-fields">
                  <Field name="provisionAvailable" placeholder="Provision Available" className="form-input"/>
                  <Field name="impactAmount" type="number" placeholder="Impact Amount" className="form-input"/>
                  <Field name="impactDescription" placeholder="Impact Description" className="form-input"/>
                </div>
              </div>

              {/* ================= RISK ASSESSMENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  <Field name="riskLevel" as="select" className="form-input">
                    <option value="">Select Risk Level</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Severe</option>
                  </Field>
                  <Field name="riskComments" placeholder="Risk Comments" className="form-input"/>
                </div>
              </div>

              {/* ================= JUSTIFICATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Justification</h3>
                <div className="form-fields">
                  <Field name="businessJustification" placeholder="Business Justification" className="form-input"/>
                  <Field name="supportingNotes" placeholder="Supporting Notes" className="form-input"/>
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