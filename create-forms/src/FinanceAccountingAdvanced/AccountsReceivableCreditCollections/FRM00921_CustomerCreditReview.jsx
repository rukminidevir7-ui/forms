// FRM00921_CustomerCreditReview.jsx
// FRM-00921 / 00922 / 00923 – Customer Credit Review
// Review / Approval / Record
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
  decisionStatus: Yup.string().required("Decision Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00921 / FRM-00922 / FRM-00923",
  formType: "Review",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  reviewCycle: "",
  nextReviewDate: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",
  email: "",
  taxId: "",

  /* Credit Overview */
  currentCreditLimit: "",
  currency: "",
  outstandingBalance: "",
  exposureAmount: "",
  creditPeriodDays: "",
  paymentTerms: "",

  /* Performance Assessment */
  paymentHistorySummary: "",
  agingSummary: "",
  averageMonthlySales: "",
  paymentPerformanceRating: "",

  /* Risk Evaluation */
  riskRating: "",
  internalCreditScore: "",
  complianceStatus: "",
  riskComments: "",

  /* Outcome */
  decisionStatus: "",
  recommendedAction: "",
  comments: "",
  conditionsRemarks: "",

  /* Supporting */
  supportingDocsAttached: "",
  documentReference: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00921_CustomerCreditReview = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00921"
      title="Customer Credit Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customer Credit Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId={values.formId}
              title="CUSTOMER CREDIT REVIEW"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formType" as="select" className="form-input">
                    <option value="Review">Review</option>
                    <option value="Approval">Approval</option>
                    <option value="Record">Record</option>
                  </Field>
                  <Field name="version" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="reviewCycle" placeholder="Review Cycle" className="form-input"/>
                  <Field name="nextReviewDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= CUSTOMER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" placeholder="Email" className="form-input"/>
                  <Field name="taxId" placeholder="Tax ID / GST" className="form-input"/>
                </div>
              </div>

              {/* ================= CREDIT OVERVIEW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Credit Overview</h3>
                <div className="form-fields">
                  <Field name="currentCreditLimit" type="number" placeholder="Current Credit Limit" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="outstandingBalance" type="number" placeholder="Outstanding Balance" className="form-input"/>
                  <Field name="exposureAmount" type="number" placeholder="Exposure Amount" className="form-input"/>
                  <Field name="creditPeriodDays" type="number" placeholder="Credit Period (Days)" className="form-input"/>
                  <Field name="paymentTerms" placeholder="Payment Terms" className="form-input"/>
                </div>
              </div>

              {/* ================= PERFORMANCE ASSESSMENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Performance Assessment</h3>
                <div className="form-fields">
                  <Field name="paymentHistorySummary" placeholder="Payment History Summary" className="form-input"/>
                  <Field name="agingSummary" placeholder="Aging Summary" className="form-input"/>
                  <Field name="averageMonthlySales" type="number" placeholder="Average Monthly Sales" className="form-input"/>
                  <Field name="paymentPerformanceRating" placeholder="Payment Performance Rating" className="form-input"/>
                </div>
              </div>

              {/* ================= RISK EVALUATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Evaluation</h3>
                <div className="form-fields">
                  <Field name="riskRating" placeholder="Risk Rating" className="form-input"/>
                  <Field name="internalCreditScore" placeholder="Credit Score / Internal Rating" className="form-input"/>
                  <Field name="complianceStatus" placeholder="Compliance Check Status" className="form-input"/>
                  <Field name="riskComments" placeholder="Risk Comments" className="form-input"/>
                </div>
              </div>

              {/* ================= OUTCOME ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Outcome</h3>
                <div className="form-fields">
                  <Field name="decisionStatus" as="select" className="form-input">
                    <option value="">Select Decision</option>
                    <option value="Continue">Continue</option>
                    <option value="Reduce Limit">Reduce Limit</option>
                    <option value="Increase Limit">Increase Limit</option>
                    <option value="Suspend">Suspend</option>
                    <option value="Escalate">Escalate</option>
                  </Field>
                  <Field name="recommendedAction" placeholder="Recommended Action" className="form-input"/>
                  <Field name="comments" placeholder="Comments" className="form-input"/>
                  <Field name="conditionsRemarks" placeholder="Conditions / Remarks" className="form-input"/>
                </div>
              </div>

              {/* ================= SUPPORTING ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  <Field name="supportingDocsAttached" placeholder="Supporting Docs Attached (Y/N)" className="form-input"/>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
                </div>
              </div>

              {/* ================= AUDIT TRAIL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Trail</h3>
                <div className="form-fields">
                  <Field name="createdOn" type="date" className="form-input"/>
                  <Field name="lastUpdatedOn" type="date" className="form-input"/>
                  <Field name="documentOwner" placeholder="Document Owner" className="form-input"/>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />
                  <ApprovalSignatureBlock label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val)=>setFieldValue("approvedSignature",val)}
                  />
                </div>
              </div>

              {/* ================= ADDITIONAL SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove })=>(
                  <>
                    {!isPrintMode && (
                      <button type="button" className="btn-submit"
                        onClick={()=>push({data:{}})}>
                        + Add Additional Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index} style={{marginTop:15}}>
                        <ApprovalSignatureBlock
                          label={`Additional Signature ${index+1}`}
                          value={sig.data || {}}
                          onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
                        />
                        {!isPrintMode && (
                          <button type="button" onClick={()=>remove(index)}>
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Customer Credit Review
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

export default FRM00921_CustomerCreditReview;