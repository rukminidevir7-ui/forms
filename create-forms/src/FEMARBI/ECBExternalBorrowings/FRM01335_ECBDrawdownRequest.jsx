// FRM01335_ECBDrawdownRequest.jsx
// FRM-01335 – ECB Drawdown Request
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
  drawdownAmount: Yup.string().required("Required"),
  proposedDrawdownDate: Yup.string().required("Required"),
});

/* ================= MANDATORY ATTACHMENTS ================= */

const mandatoryDocuments = [
  "Loan Agreement Copy",
  "Utilization Plan",
  "Bank Instructions",
  "Supporting Documents"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01335",
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
  totalFacilityAmount: "",
  currencyFacility: "",
  tenure: "",

  /* 3 Drawdown */
  drawdownAmount: "",
  currencyDrawdown: "",
  proposedDrawdownDate: "",
  purposeOfDrawdown: "",
  utilizationTimeline: "",

  /* 4 Compliance */
  ecbComplianceConfirmed: "",
  conditionsPrecedentMet: "",
  endUseCompliance: "",
  regulatoryFilingsRequired: "",

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

const FRM01335_ECBDrawdownRequest = () => {

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
    <ModernFormWrapper formId="FRM-01335" title="ECB Drawdown Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Drawdown Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01335"
              title="FRM-01335 — ECB Drawdown Request"
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
                  {field(values,"totalFacilityAmount","Total Facility Amount")}
                  {field(values,"currencyFacility","Currency")}
                  {field(values,"tenure","Tenure")}
                </div>
              </div>

              {/* 3 Drawdown Details */}
              <div className="form-section">
                <h3 className="form-section-title">Drawdown Details</h3>
                <div className="form-fields">
                  {field(values,"drawdownAmount","Drawdown Amount")}
                  {field(values,"currencyDrawdown","Currency")}
                  {field(values,"proposedDrawdownDate","Proposed Drawdown Date","date")}
                  {field(values,"purposeOfDrawdown","Purpose of Drawdown")}
                  {field(values,"utilizationTimeline","Utilization Timeline")}
                </div>
              </div>

              {/* 4 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"ecbComplianceConfirmed","ECB Compliance Confirmed")}
                  {field(values,"conditionsPrecedentMet","All Conditions Precedent Met")}
                  {field(values,"endUseCompliance","End-use Compliance")}
                  {field(values,"regulatoryFilingsRequired","Regulatory Filings Required")}
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

              {/* 6 Authorization */}
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
                    Submit ECB Drawdown Request
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

export default FRM01335_ECBDrawdownRequest;