// FRM01333_ECBTermSheetReview.jsx
// FRM-01333 – ECB Term Sheet Review
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
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  lenderName: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Term Sheet Copy",
  "Financial Analysis",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01333",
  date: "",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Borrower */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  reviewDate: "",

  /* 2 Term Sheet Overview */
  lenderName: "",
  countryOfLender: "",
  facilityType: "",
  amount: "",
  currency: "",
  tenure: "",

  /* 3 Commercial Terms */
  interestRatePricing: "",
  fees: "",
  repaymentSchedule: "",
  securityCollateral: "",
  covenants: "",

  /* 4 Regulatory */
  eligibilityConfirmed: "",
  allInCostCompliance: "",
  endUseCompliance: "",
  hedgingRequirement: "",
  approvalsRequired: "",

  /* 5 Risk */
  riskLevel: "",
  keyRisksIdentified: "",
  mitigationMeasures: "",

  /* 6 Observations */
  summaryOfFindings: "",
  recommendations: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",
  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01333_ECBTermSheetReview = () => {

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
    <ModernFormWrapper formId="FRM-01333" title="ECB Term Sheet Review">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Term Sheet Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01333"
              title="FRM-01333 — ECB Term Sheet Review"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Borrower Details */}
              <div className="form-section">
                <h3 className="form-section-title">Borrower Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"reviewDate","Review Date","date")}
                </div>
              </div>

              {/* 2 Term Sheet Overview */}
              <div className="form-section">
                <h3 className="form-section-title">Term Sheet Overview</h3>
                <div className="form-fields">
                  {field(values,"lenderName","Lender Name")}
                  {field(values,"countryOfLender","Country of Lender")}
                  {field(values,"facilityType","Facility Type")}
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"tenure","Tenure")}
                </div>
              </div>

              {/* 3 Key Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">Key Commercial Terms</h3>
                <div className="form-fields">
                  {field(values,"interestRatePricing","Interest Rate / Pricing")}
                  {field(values,"fees","Fees")}
                  {field(values,"repaymentSchedule","Repayment Schedule")}
                  {field(values,"securityCollateral","Security / Collateral")}
                  {field(values,"covenants","Covenants")}
                </div>
              </div>

              {/* 4 Regulatory & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory & Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"eligibilityConfirmed","ECB Eligibility Confirmed")}
                  {field(values,"allInCostCompliance","All-in-cost Compliance")}
                  {field(values,"endUseCompliance","End-use Compliance")}
                  {field(values,"hedgingRequirement","Hedging Requirement")}
                  {field(values,"approvalsRequired","Approvals Required")}
                </div>
              </div>

              {/* 5 Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyRisksIdentified","Key Risks Identified")}
                  {field(values,"mitigationMeasures","Mitigation Measures")}
                </div>
              </div>

              {/* 6 Observations */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>
                <div className="form-fields">
                  {field(values,"summaryOfFindings","Summary of Findings")}
                  {field(values,"recommendations","Recommendations")}
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

              {/* 8 Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>
                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ECB Term Sheet Review
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

export default FRM01333_ECBTermSheetReview;