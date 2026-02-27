// FRM00929_DisputeResolutionTracker.jsx
// FRM-00929 – Dispute Resolution Tracker
// Enterprise Grade – Accounts Receivable, Credit & Collections

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
  referenceNumber: Yup.string().required("Required"),
  disputeId: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  disputeAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00929",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",

  /* Dispute Details */
  disputeId: "",
  disputeDate: "",
  customerName: "",
  customerId: "",
  invoiceNumber: "",
  invoiceDate: "",

  /* Financial Information */
  disputeAmount: "",
  currency: "",
  outstandingAmount: "",
  agingBucket: "",
  disputeReason: "",
  disputeDescription: "",
  supportingEvidence: "",

  /* Resolution Tracking */
  assignedTo: "",
  priority: "",
  status: "",
  targetResolutionDate: "",
  resolutionSummary: "",
  actualResolutionDate: "",

  /* Closure */
  closureStatus: "",
  closureComments: "",

  /* Resolution Actions Table */
  resolutionActions: [
    {
      actionDate: "",
      actionTaken: "",
      responsiblePerson: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  loggedSignature: {},
  reviewedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00929_DisputeResolutionTracker = () => {

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
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00929"
      title="Dispute Resolution Tracker"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Dispute Resolution Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00929"
              title="DISPUTE RESOLUTION TRACKER"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* ================= DISPUTE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Dispute Details</h3>
                <div className="form-fields">
                  <Field name="disputeId" placeholder="Dispute ID" className="form-input"/>
                  <Field name="disputeDate" type="date" className="form-input"/>
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
                  <Field name="invoiceDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= FINANCIAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Information</h3>
                <div className="form-fields">
                  <Field name="disputeAmount" type="number" placeholder="Dispute Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="outstandingAmount" type="number" placeholder="Outstanding Amount" className="form-input"/>
                  <Field name="agingBucket" placeholder="Aging Bucket" className="form-input"/>
                  <Field name="disputeReason" placeholder="Dispute Reason" className="form-input"/>
                  <Field name="disputeDescription" placeholder="Description / Details" className="form-input"/>
                  <Field name="supportingEvidence" placeholder="Supporting Evidence" className="form-input"/>
                </div>
              </div>

              {/* ================= RESOLUTION TRACKING ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Resolution Tracking</h3>
                <div className="form-fields">
                  <Field name="assignedTo" placeholder="Assigned To" className="form-input"/>
                  <Field name="priority" placeholder="Priority" className="form-input"/>
                  <Field name="status" placeholder="Status" className="form-input"/>
                  <Field name="targetResolutionDate" type="date" className="form-input"/>
                  <Field name="resolutionSummary" placeholder="Resolution Summary" className="form-input"/>
                  <Field name="actualResolutionDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= RESOLUTION ACTIONS TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Resolution Actions</h3>

                <FieldArray name="resolutionActions">
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
                              actionDate:"",
                              actionTaken:"",
                              responsiblePerson:"",
                              remarks:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Action
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Action Date</th>
                            <th>Action Taken</th>
                            <th>Responsible Person</th>
                            <th>Remarks</th>

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
                          {values.resolutionActions.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`resolutionActions.${index}.actionDate`} type="date" className="form-input"/></td>
                              <td><Field name={`resolutionActions.${index}.actionTaken`} className="form-input"/></td>
                              <td><Field name={`resolutionActions.${index}.responsiblePerson`} className="form-input"/></td>
                              <td><Field name={`resolutionActions.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`resolutionActions.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= CLOSURE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Closure</h3>
                <div className="form-fields">
                  <Field name="closureStatus" placeholder="Closure Status" className="form-input"/>
                  <Field name="closureComments" placeholder="Closure Comments" className="form-input"/>
                </div>
              </div>

              {/* ================= AUDIT TRAIL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Trail</h3>
                <div className="form-fields">
                  <Field name="createdOn" type="date" className="form-input"/>
                  <Field name="lastUpdatedOn" type="date" className="form-input"/>
                  <Field name="documentOwner" className="form-input"/>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Logged By"
                    value={values.loggedSignature}
                    onChange={(val)=>setFieldValue("loggedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                </div>
              </div>

              {/* ================= ADDITIONAL SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove })=>(
                  <>
                    {!isPrintMode && (
                      <button type="button" className="btn-submit"
                        onClick={()=>push({data:{}})}>
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
                          <button type="button" onClick={()=>remove(index)}>
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
                    Submit Dispute Resolution Tracker
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

export default FRM00929_DisputeResolutionTracker;