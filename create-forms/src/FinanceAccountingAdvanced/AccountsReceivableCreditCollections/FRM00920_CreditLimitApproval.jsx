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
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="functionName" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="relatedProposalReference" placeholder="Related Proposal Reference" className="form-input"/>
                  <Field name="approvalStage" className="form-input"/>
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

              {/* ================= CREDIT LIMIT INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Credit Limit Information</h3>
                <div className="form-fields">
                  <Field name="currentCreditLimit" type="number" placeholder="Current Credit Limit" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="requestedCreditLimit" type="number" placeholder="Requested Credit Limit" className="form-input"/>
                  <Field name="recommendedCreditLimit" type="number" placeholder="Recommended Credit Limit" className="form-input"/>
                  <Field name="approvedCreditLimit" type="number" placeholder="Approved Credit Limit" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                  <Field name="creditPeriodDays" type="number" placeholder="Credit Period (Days)" className="form-input"/>
                  <Field name="paymentTerms" placeholder="Payment Terms" className="form-input"/>
                </div>
              </div>

              {/* ================= EXPOSURE & FINANCIAL POSITION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Exposure & Financial Position</h3>
                <div className="form-fields">
                  <Field name="outstandingBalance" type="number" placeholder="Outstanding Balance" className="form-input"/>
                  <Field name="exposureAmount" type="number" placeholder="Exposure Amount" className="form-input"/>
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
                  <Field name="riskComments" placeholder="Risk Comments" className="form-input"/>
                  <Field name="complianceStatus" placeholder="Compliance Check Status" className="form-input"/>
                  <Field name="internalCreditScore" placeholder="Credit Score / Internal Rating" className="form-input"/>
                </div>
              </div>

              {/* ================= DECISION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Decision Details</h3>
                <div className="form-fields">
                  <Field name="decisionStatus" as="select" className="form-input">
                    <option value="">Select Decision</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Conditional">Conditional</option>
                  </Field>
                  <Field name="decisionComments" placeholder="Decision Comments" className="form-input"/>
                  <Field name="conditionsRemarks" placeholder="Conditions / Remarks" className="form-input"/>
                  <Field name="validityPeriod" placeholder="Validity Period" className="form-input"/>
                  <Field name="reviewDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= SYSTEM / ERP INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">System / Audit Information</h3>
                <div className="form-fields">
                  <Field name="workflowId" placeholder="Workflow ID" className="form-input"/>
                  <Field name="version" placeholder="Version Number" className="form-input"/>
                  <Field name="status" placeholder="Status" className="form-input"/>
                  <Field name="lastUpdatedBy" placeholder="Last Updated By" className="form-input"/>
                  <Field name="lastUpdatedDate" type="date" className="form-input"/>
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