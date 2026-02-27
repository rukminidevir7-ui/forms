// FRM01315_OverseasGuaranteeApproval.jsx
// FRM-01315 – Overseas Guarantee Approval
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
  guaranteeAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Guarantee Draft / Agreement",
  "Board Approval Note",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01315",
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

  /* 2 Guarantee Details */
  nameOfOverseasEntity: "",
  country: "",
  typeOfGuarantee: "",
  guaranteeAmount: "",
  currency: "",
  effectiveDate: "",
  expiryDate: "",

  /* 3 Beneficiary */
  beneficiaryName: "",
  beneficiaryCountry: "",
  beneficiaryAddress: "",
  beneficiaryEntityType: "",
  beneficiaryContactDetails: "",

  /* 4 Purpose */
  purposeOfGuarantee: "",
  businessJustification: "",
  expectedBenefits: "",

  /* 5 Compliance */
  odiRegulationsCompliance: "",
  financialCommitmentLimitsVerified: "",
  boardApprovalObtained: "",
  approvalsRequired: "",

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

const FRM01315_OverseasGuaranteeApproval = () => {

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
    <ModernFormWrapper formId="FRM-01315" title="Overseas Guarantee Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Overseas Guarantee Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01315"
              title="FRM-01315 — Overseas Guarantee Approval"
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

              {/* 2 Guarantee Details */}
              <div className="form-section">
                <h3 className="form-section-title">Guarantee Details</h3>
                <div className="form-fields">
                  {field(values,"nameOfOverseasEntity","Name of Overseas Entity")}
                  {field(values,"country","Country")}
                  {field(values,"typeOfGuarantee","Type of Guarantee (Corporate/Performance/Financial)")}
                  {field(values,"guaranteeAmount","Guarantee Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"expiryDate","Expiry Date","date")}
                </div>
              </div>

              {/* 3 Beneficiary */}
              <div className="form-section">
                <h3 className="form-section-title">Beneficiary Details</h3>
                <div className="form-fields">
                  {field(values,"beneficiaryName","Beneficiary Name")}
                  {field(values,"beneficiaryCountry","Country")}
                  {field(values,"beneficiaryAddress","Address")}
                  {field(values,"beneficiaryEntityType","Entity Type")}
                  {field(values,"beneficiaryContactDetails","Contact Details")}
                </div>
              </div>

              {/* 4 Purpose */}
              <div className="form-section">
                <h3 className="form-section-title">Purpose & Rationale</h3>
                <div className="form-fields">
                  {field(values,"purposeOfGuarantee","Purpose of Guarantee")}
                  {field(values,"businessJustification","Business Justification")}
                  {field(values,"expectedBenefits","Expected Benefits")}
                </div>
              </div>

              {/* 5 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory & Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"odiRegulationsCompliance","ODI Regulations Compliance")}
                  {field(values,"financialCommitmentLimitsVerified","Financial Commitment Limits Verified")}
                  {field(values,"boardApprovalObtained","Board Approval Obtained")}
                  {field(values,"approvalsRequired","Approvals Required")}
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

              {/* Custom Fields */}
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

              {/* 8 Approval */}
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
                    Submit Overseas Guarantee Approval
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

export default FRM01315_OverseasGuaranteeApproval;