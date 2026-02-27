// FRM01326_ECBRequirementNote.jsx
// FRM-01326 – ECB Requirement Note — Universal Form
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
  purposeOfBorrowing: Yup.string().required("Required"),
  totalRequirementAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Project Note / Business Case",
  "Financial Projections",
  "Draft Term Sheet",
  "Board Resolution",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01326",
  date: "",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  sectorIndustry: "",
  formReferenceNo: "",
  applicationDate: "",

  /* 2 Borrowing Requirement */
  purposeOfBorrowing: "",
  natureOfRequirement: "",
  projectActivity: "",
  totalRequirementAmount: "",
  currency: "",
  proposedDrawdownTimeline: "",

  /* 3 Proposed ECB Structure */
  typeOfECB: "",
  proposedLender: "",
  countryOfLender: "",
  tenure: "",
  interestRatePricing: "",
  repaymentTerms: "",

  /* 4 Regulatory & Compliance */
  eligibilityCriteriaMet: "",
  route: "",
  allInCostCeilingVerified: "",
  endUseCompliance: "",
  approvalsRequired: "",

  /* 5 Financial Impact */
  impactOnLeverage: "",
  debtServiceCoverage: "",
  cashFlowImpact: "",
  hedgingRequirement: "",

  /* 6 Risk */
  riskLevel: "",
  keyRisksIdentified: "",
  mitigationMeasures: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],
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

const FRM01326_ECBRequirementNote = () => {

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
    <ModernFormWrapper formId="FRM-01326" title="ECB Requirement Note — Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Requirement Note Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01326"
              title="FRM-01326 — ECB Requirement Note — Universal Form"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Regulatory Identification</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"sectorIndustry","Sector / Industry")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"applicationDate","Application Date","date")}
                </div>
              </div>

              {/* 2 Borrowing Requirement */}
              <div className="form-section">
                <h3 className="form-section-title">Borrowing Requirement Overview</h3>
                <div className="form-fields">
                  {field(values,"purposeOfBorrowing","Purpose of Borrowing")}
                  {field(values,"natureOfRequirement","Nature of Requirement")}
                  {field(values,"projectActivity","Project / Activity")}
                  {field(values,"totalRequirementAmount","Total Requirement Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"proposedDrawdownTimeline","Proposed Drawdown Timeline")}
                </div>
              </div>

              {/* 3 ECB Structure */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed ECB Structure</h3>
                <div className="form-fields">
                  {field(values,"typeOfECB","Type of ECB (Loan/Bond/Other)")}
                  {field(values,"proposedLender","Proposed Lender")}
                  {field(values,"countryOfLender","Country of Lender")}
                  {field(values,"tenure","Tenure")}
                  {field(values,"interestRatePricing","Interest Rate / Pricing")}
                  {field(values,"repaymentTerms","Repayment Terms")}
                </div>
              </div>

              {/* 4 Regulatory */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory & Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"eligibilityCriteriaMet","ECB Eligibility Criteria Met")}
                  {field(values,"route","Automatic / Approval Route")}
                  {field(values,"allInCostCeilingVerified","All-in-cost Ceiling Verified")}
                  {field(values,"endUseCompliance","End-use Compliance")}
                  {field(values,"approvalsRequired","Approvals Required")}
                </div>
              </div>

              {/* 5 Financial Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"impactOnLeverage","Impact on Leverage")}
                  {field(values,"debtServiceCoverage","Debt Service Coverage")}
                  {field(values,"cashFlowImpact","Cash Flow Impact")}
                  {field(values,"hedgingRequirement","Hedging Requirement")}
                </div>
              </div>

              {/* 6 Risk */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyRisksIdentified","Key Risks Identified")}
                  {field(values,"mitigationMeasures","Mitigation Measures")}
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
                    Submit ECB Requirement Note
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

export default FRM01326_ECBRequirementNote;