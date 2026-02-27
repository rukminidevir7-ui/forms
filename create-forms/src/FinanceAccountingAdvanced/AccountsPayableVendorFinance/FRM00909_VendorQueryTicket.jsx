// FRM00909_VendorQueryTicket.jsx
// FRM-00909 / FRM-00910 – Vendor Query Ticket – Initiation / Approval
// Enterprise Grade – Accounts Payable & Vendor Finance

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  ticketNo: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  queryDescription: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00909 / FRM-00910",
  version: "1.0",
  date: "",
  formType: "Initiation",

  department: "Finance & Accounting (Advanced)",
  process: "Accounts Payable & Vendor Finance",

  ticketNo: "",

  /* Vendor Details */
  vendorName: "",
  vendorId: "",
  contactPerson: "",
  contactNumber: "",
  email: "",

  /* Related References */
  relatedReferences: [
    {
      referenceType: "",
      referenceNumber: "",
      dynamicFields: {}
    }
  ],

  /* Query Details */
  queryCategory: "",
  priority: "",
  queryDescription: "",
  supportingDocsAttached: "",
  expectedResolutionDate: "",

  /* Internal Review */
  assignedTo: "",
  assignedDepartment: "",
  rootCause: "",
  actionTaken: "",
  closureDate: "",
  status: "Open",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00909_VendorQueryTicket = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns,{ key, label:name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00909"
      title="Vendor Query Ticket"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Vendor Query Ticket Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00909 / FRM-00910"
              title="VENDOR QUERY TICKET"
              department="Finance & Accounting (Advanced) – Accounts Payable & Vendor Finance"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Control</h3>
                <div className="form-fields">
                  <Field name="formType" as="select" className="form-input">
                    <option value="Initiation">Initiation</option>
                    <option value="Approval">Approval</option>
                  </Field>
                  <Field name="ticketNo" placeholder="Ticket No." className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="version" className="form-input"/>
                </div>
              </div>

              {/* ================= VENDOR DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorId" placeholder="Vendor ID" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="contactNumber" placeholder="Contact Number" className="form-input"/>
                  <Field name="email" placeholder="Email" className="form-input"/>
                </div>
              </div>

              {/* ================= RELATED REFERENCES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Related References</h3>

                <FieldArray name="relatedReferences">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              referenceType:"",
                              referenceNumber:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Reference
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Reference Type</th>
                            <th>Reference Number</th>
                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                                )}
                              </th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.relatedReferences.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>
                                <Field name={`relatedReferences.${index}.referenceType`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`relatedReferences.${index}.referenceNumber`} className="form-input"/>
                              </td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`relatedReferences.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}
                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= QUERY DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Query Details</h3>
                <div className="form-fields">
                  <Field name="queryCategory" placeholder="Query Category" className="form-input"/>
                  <Field name="priority" as="select" className="form-input">
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </Field>
                  <Field name="queryDescription" placeholder="Query Description" className="form-input"/>
                  <Field name="supportingDocsAttached" placeholder="Supporting Docs (Y/N)" className="form-input"/>
                  <Field name="expectedResolutionDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= INTERNAL REVIEW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Internal Review & Action</h3>
                <div className="form-fields">
                  <Field name="assignedTo" placeholder="Assigned To" className="form-input"/>
                  <Field name="assignedDepartment" placeholder="Department" className="form-input"/>
                  <Field name="rootCause" placeholder="Root Cause" className="form-input"/>
                  <Field name="actionTaken" placeholder="Action Taken" className="form-input"/>
                  <Field name="closureDate" type="date" className="form-input"/>
                  <Field name="status" as="select" className="form-input">
                    <option value="Open">Open</option>
                    <option value="In Review">In Review</option>
                    <option value="Closed">Closed</option>
                    <option value="Escalated">Escalated</option>
                  </Field>
                </div>
              </div>

              {/* ================= AUDIT TRAIL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Trail</h3>
                <div className="form-fields">
                  <Field name="createdOn" type="date" className="form-input"/>
                  <Field name="lastUpdatedOn" type="date" className="form-input"/>
                  <Field name="documentOwner" placeholder="Document Owner" className="form-input"/>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Approvals</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val)=>setFieldValue("approvedSignature",val)}
                  />
                </div>
              </div>

              {/* ================= ADDITIONAL SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove })=>(
                  <>
                    {!isPrintMode && (
                      <button
                        type="button"
                        className="btn-submit"
                        onClick={()=>push({data:{}})}
                      >
                        + Add Additional Signature
                      </button>
                    )}

                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index} style={{marginTop:15}}>
                        <ApprovalSignatureBlock
                          label={`Additional Signature ${index+1}`}
                          value={sig.data || {}}
                          onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
                        />
                        {!isPrintMode && (
                          <button
                            type="button"
                            onClick={()=>remove(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Vendor Query Ticket
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

export default FRM00909_VendorQueryTicket;
