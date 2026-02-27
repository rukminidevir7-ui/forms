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
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="priority" as="select" className="form-input">
                    <option value="">Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </Field>
                  <Field name="reviewType" placeholder="Review Type" className="form-input"/>
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

              {/* ================= RETURN DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Return Details</h3>
                <div className="form-fields">
                  <Field name="returnRequestNumber" placeholder="Return Request Number" className="form-input"/>
                  <Field name="returnDate" type="date" className="form-input"/>
                  <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
                  <Field name="invoiceDate" type="date" className="form-input"/>
                  <Field name="returnAmount" type="number" placeholder="Return Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="returnReason" placeholder="Return Reason" className="form-input"/>
                </div>
              </div>

              {/* ================= CREDIT ASSESSMENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Credit Assessment</h3>
                <div className="form-fields">
                  <Field name="eligibleCreditAmount" type="number" placeholder="Eligible Credit Amount" className="form-input"/>
                  <Field name="proposedCreditAmount" type="number" placeholder="Proposed Credit Amount" className="form-input"/>
                  <Field name="creditPercentage" type="number" placeholder="Credit Percentage (%)" className="form-input"/>
                  <Field name="impactAmount" type="number" placeholder="Impact Amount" className="form-input"/>
                  <Field name="assessmentNotes" placeholder="Assessment Notes" className="form-input"/>
                </div>
              </div>

              {/* ================= FINANCIAL IMPACT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>
                <div className="form-fields">
                  <Field name="provisionAvailable" placeholder="Provision Available" className="form-input"/>
                  <Field name="netImpact" type="number" placeholder="Net Impact" className="form-input"/>
                  <Field name="impactDescription" placeholder="Impact Description" className="form-input"/>
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