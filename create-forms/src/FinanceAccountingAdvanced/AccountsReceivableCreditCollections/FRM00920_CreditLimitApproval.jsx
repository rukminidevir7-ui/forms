// FRM00920_CreditLimitApproval.jsx
// FRM-00920 – Credit Limit Approval – Approval / Authorization
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
  decisionStatus: Yup.string().required("Decision Required"),
  approvedCreditLimit: Yup.string().required("Approved Limit Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00920",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  relatedProposalReference: "",
  approvalStage: "Final Approval",

  /* Customer Details */
  customerName: "",
  customerId: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",
  email: "",
  taxId: "",

  /* Credit Limit Information */
  currentCreditLimit: "",
  currency: "",
  requestedCreditLimit: "",
  recommendedCreditLimit: "",
  approvedCreditLimit: "",
  effectiveDate: "",
  creditPeriodDays: "",
  paymentTerms: "",

  /* Exposure & Financial Position */
  outstandingBalance: "",
  exposureAmount: "",
  agingSummary: "",
  averageMonthlySales: "",
  paymentPerformanceRating: "",

  /* Risk Evaluation */
  riskRating: "",
  riskComments: "",
  complianceStatus: "",
  internalCreditScore: "",

  /* Decision Details */
  decisionStatus: "",
  decisionComments: "",
  conditionsRemarks: "",
  validityPeriod: "",
  reviewDate: "",

  /* ERP / System */
  workflowId: "",
  status: "",
  lastUpdatedBy: "",
  lastUpdatedDate: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00920_CreditLimitApproval = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00920"
      title="Credit Limit Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Credit Limit Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00920"
              title="CREDIT LIMIT APPROVAL"
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
      <label className="form-label">Document Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Department</label>
      <Field name="department" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Function</label>
      <Field name="functionName" className="form-input"/>
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
      <label className="form-label">Related Proposal Reference</label>
      <Field name="relatedProposalReference" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Approval Stage</label>
      <Field name="approvalStage" className="form-input"/>
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


{/* ================= CREDIT LIMIT INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Credit Limit Information</h3>
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
      <label className="form-label">Requested Credit Limit</label>
      <Field name="requestedCreditLimit" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Recommended Credit Limit</label>
      <Field name="recommendedCreditLimit" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Approved Credit Limit</label>
      <Field name="approvedCreditLimit" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Effective Date</label>
      <Field name="effectiveDate" type="date" className="form-input"/>
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


{/* ================= EXPOSURE & FINANCIAL POSITION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Exposure & Financial Position</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Outstanding Balance</label>
      <Field name="outstandingBalance" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Current Exposure Amount</label>
      <Field name="exposureAmount" type="number" className="form-input"/>
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
      <label className="form-label">Risk Comments</label>
      <Field name="riskComments" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Compliance Check Status</label>
      <Field name="complianceStatus" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Internal Credit Score</label>
      <Field name="internalCreditScore" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= DECISION DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Decision Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Decision Status</label>
      <Field name="decisionStatus" as="select" className="form-input">
        <option value="">Select Decision</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
        <option value="Conditional">Conditional</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Decision Comments</label>
      <Field name="decisionComments" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Conditions / Remarks</label>
      <Field name="conditionsRemarks" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Validity Period</label>
      <Field name="validityPeriod" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Review Date</label>
      <Field name="reviewDate" type="date" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= SYSTEM / AUDIT INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">System / Audit Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Workflow ID</label>
      <Field name="workflowId" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Version Number</label>
      <Field name="version" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Current Status</label>
      <Field name="status" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Last Updated By</label>
      <Field name="lastUpdatedBy" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Last Updated Date</label>
      <Field name="lastUpdatedDate" type="date" className="form-input"/>
    </div>

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
                    Submit Credit Limit Approval
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

export default FRM00920_CreditLimitApproval;