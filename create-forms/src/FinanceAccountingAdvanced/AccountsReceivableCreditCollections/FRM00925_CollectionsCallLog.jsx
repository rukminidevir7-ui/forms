// FRM00925_CollectionsCallLog.jsx
// FRM-00925 – Collections Call Log
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
  customerName: Yup.string().required("Required"),
  callDate: Yup.string().required("Required"),
  collectorName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00925",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  contactPerson: "",
  phone: "",

  /* Call Information */
  callDate: "",
  callTime: "",
  callType: "",
  callStatus: "",
  collectorName: "",
  collectorId: "",

  /* Discussion Details */
  outstandingAmount: "",
  currency: "",
  promiseToPayDate: "",
  promiseAmount: "",
  discussionSummary: "",
  followUpAction: "",
  nextFollowUpDate: "",

  /* Outcome */
  callOutcome: "",
  remarks: "",

  /* Follow-up History Table */
  followUpHistory: [
    {
      followUpDate: "",
      actionTaken: "",
      status: "",
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

const FRM00925_CollectionsCallLog = () => {

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
      formId="FRM-00925"
      title="Collections Call Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Collections Call Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00925"
              title="COLLECTIONS CALL LOG"
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

              {/* ================= CUSTOMER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                </div>
              </div>

              {/* ================= CALL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Call Information</h3>
                <div className="form-fields">
                  <Field name="callDate" type="date" className="form-input"/>
                  <Field name="callTime" type="time" className="form-input"/>
                  <Field name="callType" placeholder="Call Type" className="form-input"/>
                  <Field name="callStatus" placeholder="Call Status" className="form-input"/>
                  <Field name="collectorName" placeholder="Collector Name" className="form-input"/>
                  <Field name="collectorId" placeholder="Collector ID" className="form-input"/>
                </div>
              </div>

              {/* ================= DISCUSSION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Discussion Details</h3>
                <div className="form-fields">
                  <Field name="outstandingAmount" type="number" placeholder="Outstanding Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="promiseToPayDate" type="date" className="form-input"/>
                  <Field name="promiseAmount" type="number" placeholder="Promise Amount" className="form-input"/>
                  <Field name="discussionSummary" placeholder="Discussion Summary" className="form-input"/>
                  <Field name="followUpAction" placeholder="Follow-up Action" className="form-input"/>
                  <Field name="nextFollowUpDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= FOLLOW-UP HISTORY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Follow-up History</h3>

                <FieldArray name="followUpHistory">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button type="button" className="btn-submit"
                            onClick={()=>push({followUpDate:"",actionTaken:"",status:"",dynamicFields:{}})}>
                            + Add Follow-up
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Follow-up Date</th>
                            <th>Action Taken</th>
                            <th>Status</th>
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
                          {values.followUpHistory.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`followUpHistory.${index}.followUpDate`} type="date" className="form-input"/></td>
                              <td><Field name={`followUpHistory.${index}.actionTaken`} className="form-input"/></td>
                              <td><Field name={`followUpHistory.${index}.status`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`followUpHistory.${index}.dynamicFields.${col.key}`} className="form-input"/>
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>Remove</button>
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

              {/* ================= OUTCOME ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Outcome</h3>
                <div className="form-fields">
                  <Field name="callOutcome" placeholder="Call Outcome" className="form-input"/>
                  <Field name="remarks" placeholder="Remarks" className="form-input"/>
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
                    Submit Collections Call Log
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

export default FRM00925_CollectionsCallLog;