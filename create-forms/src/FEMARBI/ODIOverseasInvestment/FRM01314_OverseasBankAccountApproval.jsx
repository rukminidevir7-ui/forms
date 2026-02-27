// FRM01314_OverseasBankAccountApproval.jsx
// FRM-01314 – Overseas Bank Account Approval
// Enterprise Grade – FEMA & RBI – ODI / Overseas Investment

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
  nameOfOverseasEntity: Yup.string().required("Required"),
  bankName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Bank Confirmation / Letter",
  "Board Approval Note",
  "KYC Documents",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01314",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  sector: "",
  formReferenceNo: "",
  approvalDate: "",

  /* 2 Bank Account Details */
  nameOfOverseasEntity: "",
  country: "",
  bankName: "",
  branchAddress: "",
  accountType: "",
  currency: "",
  purposeOfAccount: "",

  /* 3 Usage */
  expectedTransactionTypes: "",
  estimatedAnnualTurnover: "",
  sourceOfFunds: "",
  regulatoryRestrictionsConsidered: "",

  /* 4 Compliance */
  odiRegulationsCompliance: "",
  kycRequirementsCompleted: "",
  bankDocumentationVerified: "",
  approvalsRequiredIdentified: "",

  /* 5 Risk */
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

const FRM01314_OverseasBankAccountApproval = () => {

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
    <ModernFormWrapper formId="FRM-01314" title="Overseas Bank Account Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Overseas Bank Account Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01314"
              title="FRM-01314 — Overseas Bank Account Approval"
              department="FEMA & RBI (Foreign Exchange) | ODI / Overseas Investment"
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
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"approvalDate","Approval Date","date")}
                </div>
              </div>

              {/* 2 Bank Account Details */}
              <div className="form-section">
                <h3 className="form-section-title">Overseas Bank Account Details</h3>
                <div className="form-fields">
                  {field(values,"nameOfOverseasEntity","Name of Overseas Entity")}
                  {field(values,"country","Country")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"branchAddress","Branch Address")}
                  {field(values,"accountType","Account Type (Current/FCY/Other)")}
                  {field(values,"currency","Currency")}
                  {field(values,"purposeOfAccount","Purpose of Account")}
                </div>
              </div>

              {/* 3 Usage */}
              <div className="form-section">
                <h3 className="form-section-title">Usage & Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"expectedTransactionTypes","Expected Transaction Types")}
                  {field(values,"estimatedAnnualTurnover","Estimated Annual Turnover")}
                  {field(values,"sourceOfFunds","Source of Funds")}
                  {field(values,"regulatoryRestrictionsConsidered","Regulatory Restrictions Considered")}
                </div>
              </div>

              {/* 4 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"odiRegulationsCompliance","ODI Regulations Compliance")}
                  {field(values,"kycRequirementsCompleted","KYC Requirements Completed")}
                  {field(values,"bankDocumentationVerified","Bank Documentation Verified")}
                  {field(values,"approvalsRequiredIdentified","Approvals Required Identified")}
                </div>
              </div>

              {/* 5 Risk */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyRisksIdentified","Key Risks Identified")}
                  {field(values,"mitigationMeasures","Mitigation Measures")}
                </div>
              </div>

              {/* Custom Fields */}
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

              {/* 7 Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval & Sign-off</h3>

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
                    Submit Overseas Bank Account Approval
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

export default FRM01314_OverseasBankAccountApproval;