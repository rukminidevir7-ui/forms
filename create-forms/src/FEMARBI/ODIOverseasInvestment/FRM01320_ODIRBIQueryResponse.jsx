// FRM01320_ODIRBIQueryResponse.jsx
// FRM-01320 – ODI RBI Query Response — Universal Form
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
  rbiReferenceNumber: Yup.string().required("Required"),
  summaryOfQuery: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "RBI Communication Copy",
  "Supporting Documents",
  "Working Papers",
  "Internal Notes",
  "Correspondence"
];

const initialValues = {
  formId: "FRM-01320",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  responseDate: "",

  /* 2 Query Reference */
  rbiReferenceNumber: "",
  dateOfQuery: "",
  subject: "",
  relatedFilingTransaction: "",
  dueDate: "",

  /* 3 Query Summary */
  summaryOfQuery: "",
  keyIssuesIdentified: "",

  /* 4 Response */
  responseSummary: "",
  supportingExplanation: "",
  correctiveActions: "",

  /* 5 Compliance Confirmation */
  regulatoryRequirementsAddressed: "",
  additionalApprovalsRequired: "",
  followUpActions: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],
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

const FRM01320_ODIRBIQueryResponse = () => {

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
    <ModernFormWrapper formId="FRM-01320" title="ODI RBI Query Response — Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ODI RBI Query Response Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01320"
              title="FRM-01320 — ODI RBI Query Response — Universal Form"
              department="FEMA & RBI (Foreign Exchange) | ODI / Overseas Investment"
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
                  {field(values,"responseDate","Response Date","date")}
                </div>
              </div>

              {/* 2 Query Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Query Reference Details</h3>
                <div className="form-fields">
                  {field(values,"rbiReferenceNumber","RBI Reference Number")}
                  {field(values,"dateOfQuery","Date of Query","date")}
                  {field(values,"subject","Subject")}
                  {field(values,"relatedFilingTransaction","Related Filing / Transaction")}
                  {field(values,"dueDate","Due Date","date")}
                </div>
              </div>

              {/* 3 Query Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Query Summary</h3>
                <div className="form-fields">
                  {field(values,"summaryOfQuery","Summary of Query")}
                  {field(values,"keyIssuesIdentified","Key Issues Identified")}
                </div>
              </div>

              {/* 4 Response Details */}
              <div className="form-section">
                <h3 className="form-section-title">Response Details</h3>
                <div className="form-fields">
                  {field(values,"responseSummary","Response Summary")}
                  {field(values,"supportingExplanation","Supporting Explanation")}
                  {field(values,"correctiveActions","Corrective Actions (if any)")}
                </div>
              </div>

              {/* 5 Compliance Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"regulatoryRequirementsAddressed","Regulatory Requirements Addressed")}
                  {field(values,"additionalApprovalsRequired","Additional Approvals Required")}
                  {field(values,"followUpActions","Follow-up Actions")}
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
                    Submit ODI RBI Query Response
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

export default FRM01320_ODIRBIQueryResponse;