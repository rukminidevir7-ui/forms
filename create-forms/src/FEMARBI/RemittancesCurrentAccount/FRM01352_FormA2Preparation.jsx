// FRM01352_FormA2Preparation.jsx
// FRM-01352 – Form A2 Preparation (Universal Form)
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
  amount: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  purposeCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Invoice / Agreement",
  "KYC Documents",
  "Bank Instructions",
  "Regulatory Approvals"
];

const initialValues = {
  formId: "FRM-01352",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Applicant Details */
  applicantName: "",
  cinPan: "",
  registeredAddress: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  preparationDate: "",

  /* 2. Beneficiary Details */
  beneficiaryName: "",
  country: "",
  bankName: "",
  bankAccount: "",
  swiftCode: "",
  beneficiaryAddress: "",

  /* 3. Remittance Details */
  amount: "",
  currency: "",
  purposeOfRemittance: "",
  purposeCode: "",
  proposedRemittanceDate: "",

  /* 4. Regulatory Declarations */
  applicableFEMARegulation: "",
  natureOfTransaction: "",
  declarationByApplicant: "",
  taxComplianceConfirmed: "",

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

const FRM01352_FormA2Preparation = () => {

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
    <ModernFormWrapper formId="FRM-01352" title="Form A2 Preparation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Form A2 Prepared Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01352"
              title="FRM-01352 — Form A2 Preparation — Universal Form"
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
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"preparationDate","Preparation Date","date")}
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
                  {field(values,"beneficiaryAddress","Beneficiary Address")}
                </div>
              </div>

              {/* 3. Remittance Details */}
              <div className="form-section">
                <h3 className="form-section-title">Remittance Details</h3>
                <div className="form-fields">
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"purposeOfRemittance","Purpose of Remittance")}
                  {field(values,"purposeCode","Purpose Code")}
                  {field(values,"proposedRemittanceDate","Proposed Remittance Date","date")}
                </div>
              </div>

              {/* 4. Regulatory Declarations */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory Declarations</h3>
                <div className="form-fields">
                  {field(values,"applicableFEMARegulation","Applicable FEMA Regulation")}
                  {field(values,"natureOfTransaction","Nature of Transaction")}
                  {field(values,"declarationByApplicant","Declaration by Applicant")}
                  {field(values,"taxComplianceConfirmed","Tax Compliance Confirmed")}
                </div>
              </div>

              {/* ATTACHMENTS – SAME STRUCTURE AS REFERENCE */}
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

              {/* WORKFLOW & APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

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

                {field(values,"workflowStatus","Workflow Status")}
                {field(values,"comments","Comments")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form A2
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

export default FRM01352_FormA2Preparation;