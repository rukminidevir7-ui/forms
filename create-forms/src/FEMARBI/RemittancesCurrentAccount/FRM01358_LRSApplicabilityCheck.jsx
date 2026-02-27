// FRM01358_LRSApplicabilityCheck.jsx
// FRM-01358 – LRS Applicability Check (Universal Form)
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
  pan: Yup.string().required("Required"),
  natureOfRemittance: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "PAN Copy",
  "Remittance Declaration",
  "Bank Statements",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01358",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Applicant Details */
  applicantName: "",
  pan: "",
  address: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  assessmentDate: "",

  /* 2. Transaction Details */
  natureOfRemittance: "",
  purpose: "",
  amount: "",
  currency: "",
  beneficiaryCountry: "",

  /* 3. LRS Eligibility Assessment */
  residentIndividualStatusConfirmed: "",
  annualLimitAvailabilityChecked: "",
  permissibleTransactionCategory: "",
  prohibitedTransactionCheck: "",
  cumulativeUtilization: "",

  /* 4. Compliance Confirmation */
  lrsGuidelinesCompliance: "",
  documentationComplete: "",
  taxComplianceConfirmed: "",
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

const FRM01358_LRSApplicabilityCheck = () => {

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
    <ModernFormWrapper formId="FRM-01358" title="LRS Applicability Check">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("LRS Applicability Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01358"
              title="FRM-01358 — LRS Applicability Check — Universal Form"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Applicant Details */}
              <div className="form-section">
                <h3 className="form-section-title">Applicant Details</h3>
                <div className="form-fields">
                  {field(values,"applicantName","Applicant Name / Individual")}
                  {field(values,"pan","PAN")}
                  {field(values,"address","Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"assessmentDate","Assessment Date","date")}
                </div>
              </div>

              {/* 2. Transaction Details */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfRemittance","Nature of Remittance")}
                  {field(values,"purpose","Purpose")}
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"beneficiaryCountry","Beneficiary Country")}
                </div>
              </div>

              {/* 3. LRS Eligibility Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">LRS Eligibility Assessment</h3>
                <div className="form-fields">
                  {field(values,"residentIndividualStatusConfirmed","Resident Individual Status Confirmed")}
                  {field(values,"annualLimitAvailabilityChecked","Annual Limit Availability Checked")}
                  {field(values,"permissibleTransactionCategory","Permissible Transaction Category")}
                  {field(values,"prohibitedTransactionCheck","Prohibited Transaction Check")}
                  {field(values,"cumulativeUtilization","Cumulative Utilization (Current FY)")}
                </div>
              </div>

              {/* 4. Compliance Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"lrsGuidelinesCompliance","LRS Guidelines Compliance")}
                  {field(values,"documentationComplete","Documentation Complete")}
                  {field(values,"taxComplianceConfirmed","Tax Compliance Confirmed")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* ATTACHMENTS – SAME ENTERPRISE STRUCTURE */}
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
                    Submit LRS Check
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

export default FRM01358_LRSApplicabilityCheck;