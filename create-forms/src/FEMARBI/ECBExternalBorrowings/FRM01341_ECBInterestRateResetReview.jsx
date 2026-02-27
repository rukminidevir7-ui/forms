// FRM01341_ECBInterestRateResetReview.jsx
// FRM-01341 – ECB Interest Rate Reset Review — Universal Form
// Enterprise Grade – FEMA & RBI – ECB / External Borrowings

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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
  companyName: Yup.string().required("Required"),
  lenderName: Yup.string().required("Required"),
  revisedInterestRate: Yup.string().required("Required"),
});

/* ================= MANDATORY ATTACHMENTS ================= */

const mandatoryDocuments = [
  "Loan Agreement Extract",
  "Benchmark Rate Evidence",
  "Approval Notes",
  "Supporting Documents"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01341",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  reviewDate: "",

  /* 2 Loan */
  lenderName: "",
  loanReference: "",
  currency: "",
  totalFacilityAmount: "",
  outstandingBalance: "",
  interestResetFrequency: "",

  /* 3 Current Terms */
  currentInterestRate: "",
  benchmarkRate: "",
  spreadMargin: "",
  lastResetDate: "",
  nextResetDate: "",

  /* 4 Proposed Reset */
  proposedBenchmark: "",
  proposedSpread: "",
  revisedInterestRate: "",
  effectiveDate: "",
  reasonForReset: "",

  /* 5 Compliance */
  allInCostCompliance: "",
  ecbGuidelinesCompliance: "",
  lenderAgreementCompliance: "",
  approvalsRequired: "",

  /* 6 Impact */
  financialImpact: "",
  cashFlowImpact: "",
  riskImpact: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  /* Workflow */
  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",
  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01341_ECBInterestRateResetReview = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01341" title="ECB Interest Rate Reset Review">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Interest Rate Reset Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01341"
              title="FRM-01341 — ECB Interest Rate Reset Review"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"reviewDate","Review Date","date")}
                </div>
              </div>

              {/* 2 Loan Details */}
              <div className="form-section">
                <h3 className="form-section-title">Loan / Facility Details</h3>
                <div className="form-fields">
                  {field(values,"lenderName","Lender Name")}
                  {field(values,"loanReference","Loan Reference")}
                  {field(values,"currency","Currency")}
                  {field(values,"totalFacilityAmount","Total Facility Amount")}
                  {field(values,"outstandingBalance","Outstanding Balance")}
                  {field(values,"interestResetFrequency","Interest Reset Frequency")}
                </div>
              </div>

              {/* 3 Current Interest Terms */}
              <div className="form-section">
                <h3 className="form-section-title">Current Interest Terms</h3>
                <div className="form-fields">
                  {field(values,"currentInterestRate","Current Interest Rate")}
                  {field(values,"benchmarkRate","Benchmark Rate")}
                  {field(values,"spreadMargin","Spread / Margin")}
                  {field(values,"lastResetDate","Last Reset Date","date")}
                  {field(values,"nextResetDate","Next Reset Date","date")}
                </div>
              </div>

              {/* 4 Proposed Reset */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed Reset Details</h3>
                <div className="form-fields">
                  {field(values,"proposedBenchmark","Proposed Benchmark")}
                  {field(values,"proposedSpread","Proposed Spread")}
                  {field(values,"revisedInterestRate","Revised Interest Rate")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"reasonForReset","Reason for Reset")}
                </div>
              </div>

              {/* 5 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory & Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"allInCostCompliance","All-in-cost Compliance")}
                  {field(values,"ecbGuidelinesCompliance","ECB Guidelines Compliance")}
                  {field(values,"lenderAgreementCompliance","Lender Agreement Compliance")}
                  {field(values,"approvalsRequired","Approvals Required")}
                </div>
              </div>

              {/* 6 Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"cashFlowImpact","Cash Flow Impact")}
                  {field(values,"riskImpact","Risk Impact")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormCustomFields values={values} />

              {/* 7 Attachments */}
              <div className="form-section">
                <FormAttachments values={values} />
                <FieldArray name="mandatoryAttachments">
                  {() => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Document</th>
                          <th>Status</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.mandatoryAttachments.map((doc,index)=>(
                          <tr key={index}>
                            <td>{doc.documentName}</td>
                            <td>
                              <Field as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>YES</option>
                                <option>NO</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field
                                name={`mandatoryAttachments.${index}.remarks`}
                                className="form-input"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 8 Workflow */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {!isPrintMode &&
                  <div className="form-field">
                    <label className="form-label">Comments</label>
                    <Field name="comments" className="form-input"/>
                  </div>
                }
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ECB Interest Rate Reset Review
                  </button>
                </div>
              }

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01341_ECBInterestRateResetReview;