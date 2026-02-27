// FRM01337_ECBEndUseMonitoring.jsx
// FRM-01337 – ECB End-Use Monitoring — Universal Form
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
  monitoringPeriod: Yup.string().required("Required"),
  lenderName: Yup.string().required("Required"),
});

/* ================= MANDATORY ATTACHMENTS ================= */

const mandatoryDocuments = [
  "Utilization Certificates",
  "Bank Statements",
  "Supporting Documents"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01337",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  monitoringPeriod: "",

  /* 2 Loan Details */
  lenderName: "",
  loanReference: "",
  currency: "",
  totalFacilityAmount: "",
  outstandingBalance: "",

  /* 3 Utilization */
  approvedEndUsePurpose: "",
  amountUtilizedDuringPeriod: "",
  cumulativeUtilization: "",
  unutilizedBalance: "",
  utilizationSummary: "",

  /* 4 Compliance */
  endUseComplianceConfirmed: "",
  deviationIdentified: "",
  regulatoryConditionsMet: "",
  correctiveActionsRequired: "",

  /* 5 Risk */
  riskLevel: "",
  keyObservations: "",
  complianceGaps: "",
  recommendations: "",

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

const FRM01337_ECBEndUseMonitoring = () => {

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
    <ModernFormWrapper formId="FRM-01337" title="ECB End-Use Monitoring — Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB End-Use Monitoring Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01337"
              title="FRM-01337 — ECB End-Use Monitoring"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"monitoringPeriod","Monitoring Period")}
                </div>
              </div>

              {/* 2 Loan Details */}
              <div className="form-section">
                <h3 className="form-section-title">Loan / Facility Details</h3>
                <div className="form-fields">
                  {field(values,"lenderName","Lender Name")}
                  {field(values,"loanReference","Loan Reference")}
                  {field(values,"currency","Currency")}
                  {field(values,"totalFacilityAmount","Total Facility Amount")}
                  {field(values,"outstandingBalance","Outstanding Balance")}
                </div>
              </div>

              {/* 3 Utilization */}
              <div className="form-section">
                <h3 className="form-section-title">Utilization Details</h3>
                <div className="form-fields">
                  {field(values,"approvedEndUsePurpose","Approved End-use Purpose")}
                  {field(values,"amountUtilizedDuringPeriod","Amount Utilized During Period")}
                  {field(values,"cumulativeUtilization","Cumulative Utilization")}
                  {field(values,"unutilizedBalance","Unutilized Balance")}
                  {field(values,"utilizationSummary","Utilization Summary")}
                </div>
              </div>

              {/* 4 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"endUseComplianceConfirmed","End-use Compliance Confirmed")}
                  {field(values,"deviationIdentified","Deviation Identified")}
                  {field(values,"regulatoryConditionsMet","Regulatory Conditions Met")}
                  {field(values,"correctiveActionsRequired","Corrective Actions Required")}
                </div>
              </div>

              {/* 5 Risk */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Observations</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"complianceGaps","Compliance Gaps")}
                  {field(values,"recommendations","Recommendations")}
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

              {/* 7 Workflow */}
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

                {!isPrintMode &&
                  <div className="form-field">
                    <label className="form-label">Comments</label>
                    <Field name="comments" className="form-input"/>
                  </div>
                }
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ECB End-Use Monitoring
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

export default FRM01337_ECBEndUseMonitoring;