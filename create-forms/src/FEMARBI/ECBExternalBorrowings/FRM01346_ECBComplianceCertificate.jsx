// FRM01346_ECBComplianceCertificate.jsx
// FRM-01346 – ECB Compliance Certificate
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
  lenderName: Yup.string().required("Required"),
  certifiedBy: Yup.string().required("Required"),
});

/* ================= MANDATORY ATTACHMENTS ================= */

const mandatoryDocuments = [
  "Supporting Compliance Documents",
  "Bank Confirmations",
  "Regulatory Acknowledgements"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01346",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Borrower Information */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  certificationPeriod: "",

  /* 2 Facility Details */
  lenderName: "",
  loanReferenceNumber: "",
  currency: "",
  totalFacilityAmount: "",
  outstandingBalance: "",
  tenure: "",

  /* 3 Compliance Confirmation */
  ecbGuidelinesComplianceConfirmed: "",
  regulatoryConditionsMet: "",
  endUseCompliance: "",
  allFilingsCompleted: "",
  covenantsCompliance: "",

  /* 4 Certification */
  certifiedBy: "",
  designation: "",
  certificationDate: "",
  signature: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  /* 5 Workflow & Approval */
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

const FRM01346_ECBComplianceCertificate = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01346" title="ECB Compliance Certificate">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("ECB Compliance Certificate Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01346"
              title="FRM-01346 — ECB Compliance Certificate"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Borrower Information */}
              <div className="form-section">
                <h3 className="form-section-title">Borrower Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"certificationPeriod","Certification Period")}
                </div>
              </div>

              {/* 2 Facility Details */}
              <div className="form-section">
                <h3 className="form-section-title">Facility Details</h3>
                <div className="form-fields">
                  {field(values,"lenderName","Lender Name")}
                  {field(values,"loanReferenceNumber","Loan Reference Number")}
                  {field(values,"currency","Currency")}
                  {field(values,"totalFacilityAmount","Total Facility Amount")}
                  {field(values,"outstandingBalance","Outstanding Balance")}
                  {field(values,"tenure","Tenure")}
                </div>
              </div>

              {/* 3 Compliance Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"ecbGuidelinesComplianceConfirmed","ECB Guidelines Compliance Confirmed")}
                  {field(values,"regulatoryConditionsMet","All Regulatory Conditions Met")}
                  {field(values,"endUseCompliance","End-use Compliance")}
                  {field(values,"allFilingsCompleted","All Filings Completed")}
                  {field(values,"covenantsCompliance","Covenants Compliance")}
                </div>
              </div>

              {/* 4 Certification Statement */}
              <div className="form-section">
                <h3 className="form-section-title">Certification Statement</h3>

                {!isPrintMode && (
                  <div className="form-field">
                    <p>
                      I hereby certify that the above information is true and correct
                      and that the External Commercial Borrowing complies with
                      applicable FEMA and RBI regulations.
                    </p>
                  </div>
                )}

                <div className="form-fields">
                  {field(values,"certifiedBy","Certified By")}
                  {field(values,"designation","Designation")}
                  {field(values,"certificationDate","Date","date")}
                  {field(values,"signature","Signature")}
                </div>
              </div>

              <FormCustomFields values={values} />

              {/* 5 Attachments */}
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

              {/* 6 Workflow & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role, index) => (
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={true}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode && (
                              <button type="button" onClick={() => remove(index)}>
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {!isPrintMode && (
                  <div className="form-field">
                    <label className="form-label">Comments</label>
                    <Field name="comments" className="form-input" />
                  </div>
                )}
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ECB Compliance Certificate
                  </button>
                </div>
              )}

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01346_ECBComplianceCertificate;