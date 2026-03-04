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
{/* ================= CONTACT INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Contact Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field
        name="contactPerson"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Phone Number</label>
      <Field
        name="phone"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Email Address</label>
      <Field
        name="email"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Tax ID / GST Number</label>
      <Field
        name="taxId"
        className="form-input"
      />
    </div>

  </div>
</div>


{/* ================= ATTACHMENTS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Attachments</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Supporting Documents Attached</label>
      <Field
        name="supportingDocsAttached"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Document Reference</label>
      <Field
        name="documentReference"
        className="form-input"
      />
    </div>

  </div>
</div>


{/* ================= AUDIT TRAIL ================= */}
<div className="form-section">
  <h3 className="form-section-title">Audit Trail</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Created On</label>
      <Field
        name="createdOn"
        type="date"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Last Updated On</label>
      <Field
        name="lastUpdatedOn"
        type="date"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Document Owner</label>
      <Field
        name="documentOwner"
        className="form-input"
      />
    </div>

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

             {/* ================= GENERAL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">General Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Record Date</label>
      <Field
        name="date"
        type="date"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field
        name="referenceNumber"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Location / Branch</label>
      <Field
        name="location"
        className="form-input"
      />
    </div>

  </div>
</div>


{/* ================= CUSTOMER DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Customer Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Customer Name</label>
      <Field
        name="customerName"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Customer ID</label>
      <Field
        name="customerId"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Account Number</label>
      <Field
        name="accountNumber"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field
        name="contactPerson"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Phone Number</label>
      <Field
        name="phone"
        className="form-input"
      />
    </div>

  </div>
</div>


{/* ================= CALL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Call Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Call Date</label>
      <Field
        name="callDate"
        type="date"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Call Time</label>
      <Field
        name="callTime"
        type="time"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Call Type</label>
      <Field
        name="callType"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Call Status</label>
      <Field
        name="callStatus"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Collector Name</label>
      <Field
        name="collectorName"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Collector ID</label>
      <Field
        name="collectorId"
        className="form-input"
      />
    </div>

  </div>
</div>


{/* ================= DISCUSSION DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Discussion Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Outstanding Amount</label>
      <Field
        name="outstandingAmount"
        type="number"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field
        name="currency"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Promise to Pay Date</label>
      <Field
        name="promiseToPayDate"
        type="date"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Promised Amount</label>
      <Field
        name="promiseAmount"
        type="number"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Discussion Summary</label>
      <Field
        name="discussionSummary"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Follow-Up Action</label>
      <Field
        name="followUpAction"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Next Follow-Up Date</label>
      <Field
        name="nextFollowUpDate"
        type="date"
        className="form-input"
      />
    </div>

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