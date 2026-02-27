// FRM01348_ECBRBIQueryResponse.jsx
// FRM-01348 – ECB RBI Query Response — Universal Form
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
  rbiReferenceNumber: Yup.string().required("Required"),
  responseSummary: Yup.string().required("Required"),
});

/* ================= MANDATORY ATTACHMENTS ================= */

const mandatoryDocuments = [
  "Copy of RBI Query",
  "Supporting Documents",
  "Internal Notes"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01348",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  responseDate: "",

  /* 2 Query Details */
  rbiReferenceNumber: "",
  queryReceivedDate: "",
  subject: "",
  briefDescriptionOfQuery: "",

  /* 3 Response Details */
  responseSummary: "",
  supportingExplanation: "",
  complianceConfirmation: "",
  keyPointsAddressed: "",

  /* 4 Compliance Check */
  ecbGuidelinesCompliance: "",
  conditionsFulfilled: "",
  additionalFilingsRequired: "",
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

const FRM01348_ECBRBIQueryResponse = () => {

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
    <ModernFormWrapper formId="FRM-01348" title="ECB RBI Query Response">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB RBI Query Response Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01348"
              title="FRM-01348 — ECB RBI Query Response"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"responseDate","Response Date","date")}
                </div>
              </div>

              {/* 2 Query Details */}
              <div className="form-section">
                <h3 className="form-section-title">Query Details</h3>
                <div className="form-fields">
                  {field(values,"rbiReferenceNumber","RBI Reference Number")}
                  {field(values,"queryReceivedDate","Query Received Date","date")}
                  {field(values,"subject","Subject")}
                  {field(values,"briefDescriptionOfQuery","Brief Description of Query")}
                </div>
              </div>

              {/* 3 Response Details */}
              <div className="form-section">
                <h3 className="form-section-title">Response Details</h3>
                <div className="form-fields">
                  {field(values,"responseSummary","Response Summary")}
                  {field(values,"supportingExplanation","Supporting Explanation")}
                  {field(values,"complianceConfirmation","Compliance Confirmation")}
                  {field(values,"keyPointsAddressed","Key Points Addressed")}
                </div>
              </div>

              {/* 4 Compliance Check */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory & Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"ecbGuidelinesCompliance","ECB Guidelines Compliance")}
                  {field(values,"conditionsFulfilled","Conditions Fulfilled")}
                  {field(values,"additionalFilingsRequired","Additional Filings Required")}
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

              {/* 6 Workflow */}
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
                    Submit ECB RBI Query Response
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

export default FRM01348_ECBRBIQueryResponse;