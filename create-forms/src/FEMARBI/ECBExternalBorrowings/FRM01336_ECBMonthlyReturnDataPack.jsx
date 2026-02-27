// FRM01336_ECBMonthlyReturnDataPack.jsx
// FRM-01336 – ECB Monthly Return Data Pack
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
  returnPeriod: Yup.string().required("Required"),
  lenderName: Yup.string().required("Required"),
});

/* ================= MANDATORY ATTACHMENTS ================= */

const mandatoryDocuments = [
  "Bank Statements",
  "Interest Calculation",
  "Supporting Documents"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01336",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Borrower */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  returnPeriod: "",
  preparationDate: "",

  /* 2 Loan */
  lenderName: "",
  loanReferenceNumber: "",
  currency: "",
  totalFacilityAmount: "",
  outstandingBalance: "",

  /* 3 Activity */
  openingBalance: "",
  drawdownDuringPeriod: "",
  principalRepaid: "",
  interestPaid: "",
  closingBalance: "",

  /* 4 Compliance */
  ecbComplianceMaintained: "",
  regulatoryFilingsUpToDate: "",
  covenantsCompliance: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  /* Sign-off */
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

const FRM01336_ECBMonthlyReturnDataPack = () => {

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
    <ModernFormWrapper formId="FRM-01336" title="ECB Monthly Return Data Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Monthly Return Data Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01336"
              title="FRM-01336 — ECB Monthly Return Data Pack"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Borrower Details */}
              <div className="form-section">
                <h3 className="form-section-title">Borrower Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"returnPeriod","Return Period")}
                  {field(values,"preparationDate","Preparation Date","date")}
                </div>
              </div>

              {/* 2 Loan Details */}
              <div className="form-section">
                <h3 className="form-section-title">Loan Details</h3>
                <div className="form-fields">
                  {field(values,"lenderName","Lender Name")}
                  {field(values,"loanReferenceNumber","Loan Reference Number")}
                  {field(values,"currency","Currency")}
                  {field(values,"totalFacilityAmount","Total Facility Amount")}
                  {field(values,"outstandingBalance","Outstanding Balance")}
                </div>
              </div>

              {/* 3 Activity */}
              <div className="form-section">
                <h3 className="form-section-title">Drawdown & Repayment Activity</h3>
                <div className="form-fields">
                  {field(values,"openingBalance","Opening Balance")}
                  {field(values,"drawdownDuringPeriod","Drawdown During Period")}
                  {field(values,"principalRepaid","Principal Repaid")}
                  {field(values,"interestPaid","Interest Paid")}
                  {field(values,"closingBalance","Closing Balance")}
                </div>
              </div>

              {/* 4 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"ecbComplianceMaintained","ECB Compliance Maintained")}
                  {field(values,"regulatoryFilingsUpToDate","All Regulatory Filings Up to Date")}
                  {field(values,"covenantsCompliance","Covenants Compliance")}
                  {field(values,"remarks","Remarks")}
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

              {/* 6 Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ECB Monthly Return Data Pack
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

export default FRM01336_ECBMonthlyReturnDataPack;