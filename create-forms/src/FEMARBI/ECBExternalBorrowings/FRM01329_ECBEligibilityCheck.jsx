// FRM01329_ECBEligibilityCheck.jsx
// FRM-01329 – ECB Eligibility Check — Universal Form
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
  proposedAmount: Yup.string().required("Required"),
  proposedLender: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Term Sheet",
  "Financial Statements",
  "Board Note",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01329",
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
  assessmentDate: "",

  /* 2 Borrowing Overview */
  purposeOfBorrowing: "",
  proposedAmount: "",
  currency: "",
  proposedTenure: "",
  proposedLender: "",
  countryOfLender: "",

  /* 3 Eligibility */
  eligibleBorrowerCriteria: "",
  recognizedLenderCriteria: "",
  endUseCompliance: "",
  allInCostCompliance: "",
  minimumMaturityCompliance: "",

  /* 4 Regulatory */
  route: "",
  ecbLimitsVerified: "",
  hedgingRequirements: "",
  otherConditions: "",

  /* 5 Risk */
  riskLevel: "",
  keyObservations: "",
  complianceGaps: "",
  recommendations: "",

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

const FRM01329_ECBEligibilityCheck = () => {

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
    <ModernFormWrapper formId="FRM-01329" title="ECB Eligibility Check — Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Eligibility Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01329"
              title="FRM-01329 — ECB Eligibility Check — Universal Form"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"sectorIndustry","Sector / Industry")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"assessmentDate","Assessment Date","date")}
                </div>
              </div>

              {/* 2 Borrowing Overview */}
              <div className="form-section">
                <h3 className="form-section-title">Borrowing Overview</h3>
                <div className="form-fields">
                  {field(values,"purposeOfBorrowing","Purpose of Borrowing")}
                  {field(values,"proposedAmount","Proposed Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"proposedTenure","Proposed Tenure")}
                  {field(values,"proposedLender","Proposed Lender")}
                  {field(values,"countryOfLender","Country of Lender")}
                </div>
              </div>

              {/* 3 Eligibility Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Eligibility Assessment</h3>
                <div className="form-fields">
                  {field(values,"eligibleBorrowerCriteria","Eligible Borrower Criteria Met")}
                  {field(values,"recognizedLenderCriteria","Recognized Lender Criteria Met")}
                  {field(values,"endUseCompliance","End-use Compliance")}
                  {field(values,"allInCostCompliance","All-in-cost Compliance")}
                  {field(values,"minimumMaturityCompliance","Minimum Average Maturity Compliance")}
                </div>
              </div>

              {/* 4 Regulatory Evaluation */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory Evaluation</h3>
                <div className="form-fields">
                  {field(values,"route","Automatic / Approval Route")}
                  {field(values,"ecbLimitsVerified","ECB Limits Verified")}
                  {field(values,"hedgingRequirements","Hedging Requirements")}
                  {field(values,"otherConditions","Other Conditions")}
                </div>
              </div>

              {/* 5 Risk & Observations */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Observations</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"complianceGaps","Compliance Gaps")}
                  {field(values,"recommendations","Recommendations")}
                </div>
              </div>

              <FormCustomFields values={values} />

              {/* 6 Attachments */}
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

              {/* 7 Workflow */}
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
                    Submit ECB Eligibility Check
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

export default FRM01329_ECBEligibilityCheck;