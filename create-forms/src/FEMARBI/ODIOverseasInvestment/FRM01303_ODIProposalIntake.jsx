// FRM01303_ODIProposalIntake.jsx
// FRM-01303 – ODI Proposal Intake
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
  proposedInvestmentAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Business Plan",
  "Financial Statements",
  "Board Note",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01303",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

  /* 1 */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  sector: "",
  formReferenceNo: "",
  requestDate: "",

  /* 2 */
  nameOfOverseasEntity: "",
  countryOfInvestment: "",
  businessActivity: "",
  typeOfInvestment: "",
  proposedInvestmentAmount: "",
  currency: "",
  proposedInvestmentDate: "",

  /* 3 */
  sourceOfFunds: "",
  internalExternalFunding: "",
  financialCommitmentType: "",
  totalFinancialCommitment: "",

  /* 4 */
  purposeObjective: "",
  strategicBenefits: "",
  riskAssessment: "",

  /* 5 */
  odiRegulationsApplicability: "",
  boardApprovalRequired: "",
  valuationRequired: "",
  regulatoryApprovalsRequired: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01303_ODIProposalIntake = () => {

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
    <ModernFormWrapper formId="FRM-01303" title="ODI Proposal Intake">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ODI Proposal Intake Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01303"
              title="FRM-01303 — ODI Proposal Intake"
              department="FEMA & RBI (Foreign Exchange) | ODI / Overseas Investment"
            >

              {/* 1 */}
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
                  {field(values,"requestDate","Request Date","date")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Investment Overview</h3>
                <div className="form-fields">
                  {field(values,"nameOfOverseasEntity","Name of Overseas Entity")}
                  {field(values,"countryOfInvestment","Country of Investment")}
                  {field(values,"businessActivity","Business Activity")}
                  {field(values,"typeOfInvestment","Type of Investment (JV/WOS/Other)")}
                  {field(values,"proposedInvestmentAmount","Proposed Investment Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"proposedInvestmentDate","Proposed Investment Date","date")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Funding Details</h3>
                <div className="form-fields">
                  {field(values,"sourceOfFunds","Source of Funds")}
                  {field(values,"internalExternalFunding","Internal / External Funding")}
                  {field(values,"financialCommitmentType","Financial Commitment Type")}
                  {field(values,"totalFinancialCommitment","Total Financial Commitment")}
                </div>
              </div>

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Business Rationale</h3>
                <div className="form-fields">
                  {field(values,"purposeObjective","Purpose / Objective")}
                  {field(values,"strategicBenefits","Strategic Benefits")}
                  {field(values,"riskAssessment","Risk Assessment")}
                </div>
              </div>

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance & Approvals</h3>
                <div className="form-fields">
                  {field(values,"odiRegulationsApplicability","ODI Regulations Applicability")}
                  {field(values,"boardApprovalRequired","Board Approval Required")}
                  {field(values,"valuationRequired","Valuation Required")}
                  {field(values,"regulatoryApprovalsRequired","Regulatory Approvals Required")}
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
                              <Field name={`mandatoryAttachments.${index}.remarks`} className="form-input"/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 7 Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

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
                    Submit ODI Proposal
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

export default FRM01303_ODIProposalIntake;