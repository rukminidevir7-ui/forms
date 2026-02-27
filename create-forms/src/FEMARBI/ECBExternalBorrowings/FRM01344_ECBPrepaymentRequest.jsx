// FRM01344_ECBPrepaymentRequest.jsx
// FRM-01344 – ECB Prepayment Request
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
  prepaymentAmount: Yup.string().required("Required"),
  proposedPrepaymentDate: Yup.string().required("Required"),
});

/* ================= MANDATORY ATTACHMENTS ================= */

const mandatoryDocuments = [
  "Loan Agreement Copy",
  "Bank Confirmation",
  "Approval Notes",
  "Supporting Documents"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01344",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  requestDate: "",

  /* 2 Facility */
  lenderName: "",
  loanAgreementReference: "",
  currencyFacility: "",
  totalFacilityAmount: "",
  outstandingBalance: "",
  originalTenure: "",

  /* 3 Prepayment */
  prepaymentAmount: "",
  currencyPrepayment: "",
  proposedPrepaymentDate: "",
  sourceOfFunds: "",
  reasonForPrepayment: "",

  /* 4 Compliance */
  ecbComplianceConfirmed: "",
  prepaymentConditionsVerified: "",
  regulatoryFilingsRequired: "",
  approvalsRequired: "",

  /* 5 Impact */
  interestSavings: "",
  financialImpact: "",
  covenantImpact: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  /* Authorization */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  comments: "",
  workflowStatus: "",
  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01344_ECBPrepaymentRequest = () => {

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
    <ModernFormWrapper formId="FRM-01344" title="ECB Prepayment Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Prepayment Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01344"
              title="FRM-01344 — ECB Prepayment Request"
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
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"requestDate","Request Date","date")}
                </div>
              </div>

              {/* 2 Facility Details */}
              <div className="form-section">
                <h3 className="form-section-title">Facility Details</h3>
                <div className="form-fields">
                  {field(values,"lenderName","Lender Name")}
                  {field(values,"loanAgreementReference","Loan Agreement Reference")}
                  {field(values,"currencyFacility","Currency")}
                  {field(values,"totalFacilityAmount","Total Facility Amount")}
                  {field(values,"outstandingBalance","Outstanding Balance")}
                  {field(values,"originalTenure","Original Tenure")}
                </div>
              </div>

              {/* 3 Prepayment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Prepayment Details</h3>
                <div className="form-fields">
                  {field(values,"prepaymentAmount","Prepayment Amount")}
                  {field(values,"currencyPrepayment","Currency")}
                  {field(values,"proposedPrepaymentDate","Proposed Prepayment Date","date")}
                  {field(values,"sourceOfFunds","Source of Funds")}
                  {field(values,"reasonForPrepayment","Reason for Prepayment")}
                </div>
              </div>

              {/* 4 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"ecbComplianceConfirmed","ECB Compliance Confirmed")}
                  {field(values,"prepaymentConditionsVerified","Prepayment Conditions Verified")}
                  {field(values,"regulatoryFilingsRequired","Regulatory Filings Required")}
                  {field(values,"approvalsRequired","Approvals Required")}
                </div>
              </div>

              {/* 5 Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"interestSavings","Interest Savings")}
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"covenantImpact","Covenant Impact")}
                  {field(values,"remarks","Remarks")}
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

              {/* 7 Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

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

                {!isPrintMode &&
                  <div className="form-field">
                    <label className="form-label">Comments</label>
                    <Field name="comments" className="form-input" />
                  </div>
                }
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ECB Prepayment Request
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

export default FRM01344_ECBPrepaymentRequest;