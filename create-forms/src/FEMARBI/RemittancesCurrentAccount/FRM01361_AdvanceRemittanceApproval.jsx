// FRM01361_AdvanceRemittanceApproval.jsx
// FRM-01361 – Advance Remittance Approval
// Enterprise Grade – FEMA & RBI – Remittances & Current Account

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
  applicantName: Yup.string().required("Required"),
  cinPan: Yup.string().required("Required"),
  beneficiaryName: Yup.string().required("Required"),
  advanceAmount: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  purposeCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Contract / Agreement",
  "Proforma Invoice",
  "Bank Instructions",
  "Regulatory Approvals (if any)"
];

const initialValues = {
  formId: "FRM-01361",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Applicant Details */
  applicantName: "",
  cinPan: "",
  registeredAddress: "",
  authorizedDealerBank: "",
  approvalReferenceNo: "",
  approvalDate: "",

  /* 2. Beneficiary Details */
  beneficiaryName: "",
  country: "",
  bankName: "",
  bankAccount: "",
  swiftCode: "",

  /* 3. Advance Remittance Details */
  advanceAmount: "",
  currency: "",
  purposeOfAdvance: "",
  underlyingContractRef: "",
  expectedSettlementDate: "",

  /* 4. Regulatory & Risk Assessment */
  applicableFEMARegulation: "",
  purposeCode: "",
  documentationVerified: "",
  advanceJustificationReviewed: "",
  riskLevel: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* Approval */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01361_AdvanceRemittanceApproval = () => {

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
    <ModernFormWrapper formId="FRM-01361" title="Advance Remittance Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Advance Remittance Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01361"
              title="FRM-01361 — Advance Remittance Approval"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Applicant Details */}
              <div className="form-section">
                <h3 className="form-section-title">Applicant Details</h3>
                <div className="form-fields">
                  {field(values,"applicantName","Applicant Name / Company")}
                  {field(values,"cinPan","CIN / PAN")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"approvalReferenceNo","Approval Reference No")}
                  {field(values,"approvalDate","Approval Date","date")}
                </div>
              </div>

              {/* 2. Beneficiary Details */}
              <div className="form-section">
                <h3 className="form-section-title">Beneficiary Details</h3>
                <div className="form-fields">
                  {field(values,"beneficiaryName","Beneficiary Name")}
                  {field(values,"country","Country")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"bankAccount","Bank Account / IBAN")}
                  {field(values,"swiftCode","SWIFT Code")}
                </div>
              </div>

              {/* 3. Advance Remittance Details */}
              <div className="form-section">
                <h3 className="form-section-title">Advance Remittance Details</h3>
                <div className="form-fields">
                  {field(values,"advanceAmount","Advance Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"purposeOfAdvance","Purpose of Advance")}
                  {field(values,"underlyingContractRef","Underlying Contract / Invoice Ref")}
                  {field(values,"expectedSettlementDate","Expected Settlement Date","date")}
                </div>
              </div>

              {/* 4. Regulatory & Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory & Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"applicableFEMARegulation","Applicable FEMA Regulation")}
                  {field(values,"purposeCode","Purpose Code")}
                  {field(values,"documentationVerified","Documentation Verified")}
                  {field(values,"advanceJustificationReviewed","Advance Justification Reviewed")}
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                </div>
              </div>

              {/* ATTACHMENTS – STANDARD STRUCTURE */}
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
                              <Field
                                as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input"
                              >
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

              <FormCustomFields values={values} />

              {/* APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
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

                {field(values,"approvalStatus","Approval Status")}
                {field(values,"comments","Comments")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Advance Remittance Approval
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

export default FRM01361_AdvanceRemittanceApproval;