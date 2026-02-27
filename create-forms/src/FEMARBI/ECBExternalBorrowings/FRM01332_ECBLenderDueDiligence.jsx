// FRM01332_ECBLenderDueDiligence.jsx
// FRM-01332 – ECB Lender Due Diligence
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
  countryOfIncorporation: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "KYC Documents",
  "Financial Statements",
  "Credit Rating Letter",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01332",
  date: "",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Borrower */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  assessmentDate: "",

  /* 2 Lender Identification */
  lenderName: "",
  countryOfIncorporation: "",
  entityType: "",
  registrationNumber: "",
  lenderRegisteredAddress: "",

  /* 3 Financial Standing */
  creditRating: "",
  netWorth: "",
  totalAssets: "",
  regulatoryStatus: "",
  keyFinancialIndicators: "",

  /* 4 Compliance */
  recognizedLenderCriteria: "",
  kycCompleted: "",
  sanctionsScreening: "",
  pepCheck: "",
  adverseMediaCheck: "",

  /* 5 Risk */
  riskLevel: "",
  keyRisksIdentified: "",
  mitigationMeasures: "",

  /* 6 Observations */
  summaryOfFindings: "",
  additionalRemarks: "",

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

const FRM01332_ECBLenderDueDiligence = () => {

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
    <ModernFormWrapper formId="FRM-01332" title="ECB Lender Due Diligence">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Lender Due Diligence Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01332"
              title="FRM-01332 — ECB Lender Due Diligence"
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
                  {field(values,"assessmentDate","Assessment Date","date")}
                </div>
              </div>

              {/* 2 Lender Identification */}
              <div className="form-section">
                <h3 className="form-section-title">Lender Identification</h3>
                <div className="form-fields">
                  {field(values,"lenderName","Lender Name")}
                  {field(values,"countryOfIncorporation","Country of Incorporation")}
                  {field(values,"entityType","Entity Type (Bank/Financial Institution/Other)")}
                  {field(values,"registrationNumber","Registration Number")}
                  {field(values,"lenderRegisteredAddress","Registered Address")}
                </div>
              </div>

              {/* 3 Financial Standing */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Standing</h3>
                <div className="form-fields">
                  {field(values,"creditRating","Credit Rating")}
                  {field(values,"netWorth","Net Worth")}
                  {field(values,"totalAssets","Total Assets")}
                  {field(values,"regulatoryStatus","Regulatory Status")}
                  {field(values,"keyFinancialIndicators","Key Financial Indicators")}
                </div>
              </div>

              {/* 4 Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Checks</h3>
                <div className="form-fields">
                  {field(values,"recognizedLenderCriteria","Recognized Lender Criteria Met")}
                  {field(values,"kycCompleted","KYC Completed")}
                  {field(values,"sanctionsScreening","Sanctions Screening")}
                  {field(values,"pepCheck","PEP Check")}
                  {field(values,"adverseMediaCheck","Adverse Media Check")}
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
                  {field(values,"additionalRemarks","Additional Remarks")}
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
                    Submit ECB Lender Due Diligence
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

export default FRM01332_ECBLenderDueDiligence;