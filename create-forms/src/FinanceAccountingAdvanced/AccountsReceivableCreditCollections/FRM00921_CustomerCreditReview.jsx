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

    <div className="form-field">
      <label className="form-label">Form Type</label>
      <Field name="formType" as="select" className="form-input">
        <option value="Review">Review</option>
        <option value="Approval">Approval</option>
        <option value="Record">Record</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Version</label>
      <Field name="version" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Review Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field name="referenceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location / Branch</label>
      <Field name="location" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Review Cycle</label>
      <Field name="reviewCycle" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Next Review Date</label>
      <Field name="nextReviewDate" type="date" className="form-input"/>
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
      <label className="form-label">Business Address</label>
      <Field name="businessAddress" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field name="contactPerson" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Phone Number</label>
      <Field name="phone" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Email Address</label>
      <Field name="email" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Tax ID / GST Number</label>
      <Field name="taxId" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= CREDIT OVERVIEW ================= */}
<div className="form-section">
  <h3 className="form-section-title">Credit Overview</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Current Credit Limit</label>
      <Field name="currentCreditLimit" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Outstanding Balance</label>
      <Field name="outstandingBalance" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Current Exposure</label>
      <Field name="exposureAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Credit Period (Days)</label>
      <Field name="creditPeriodDays" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Payment Terms</label>
      <Field name="paymentTerms" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= PERFORMANCE ASSESSMENT ================= */}
<div className="form-section">
  <h3 className="form-section-title">Performance Assessment</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Payment History Summary</label>
      <Field name="paymentHistorySummary" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Aging Summary</label>
      <Field name="agingSummary" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Average Monthly Sales</label>
      <Field name="averageMonthlySales" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Payment Performance Rating</label>
      <Field name="paymentPerformanceRating" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= RISK EVALUATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Risk Evaluation</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Risk Rating</label>
      <Field name="riskRating" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Internal Credit Score</label>
      <Field name="internalCreditScore" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Compliance Status</label>
      <Field name="complianceStatus" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Risk Comments</label>
      <Field name="riskComments" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= OUTCOME ================= */}
<div className="form-section">
  <h3 className="form-section-title">Outcome</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Decision</label>
      <Field name="decisionStatus" as="select" className="form-input">
        <option value="">Select Decision</option>
        <option value="Continue">Continue</option>
        <option value="Reduce Limit">Reduce Limit</option>
        <option value="Increase Limit">Increase Limit</option>
        <option value="Suspend">Suspend</option>
        <option value="Escalate">Escalate</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Recommended Action</label>
      <Field name="recommendedAction" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Comments</label>
      <Field name="comments" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Conditions / Remarks</label>
      <Field name="conditionsRemarks" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

<div className="form-section">
  {/* <h3 className="form-section-title">Attachments</h3> */}
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Supporting Documents Attached</label>
      <Field name="supportingDocsAttached" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Document Reference</label>
      <Field name="documentReference" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= AUDIT TRAIL ================= */}
<div className="form-section">
  <h3 className="form-section-title">Audit Trail</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Created On</label>
      <Field name="createdOn" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Last Updated On</label>
      <Field name="lastUpdatedOn" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Document Owner</label>
      <Field name="documentOwner" className="form-input"/>
    </div>

  </div>
</div>
              <FormCustomFields values={values}/>

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