// FRM00883_InvoiceDisputeNote.jsx
// FRM-00883 – Invoice Dispute Note – Report / Record
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
  referenceNo: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required"),
  disputeCategory: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00883",
  version: "1.0",
  date: "",
  referenceNo: "",

  vendorName: "",
  invoiceNumber: "",
  invoiceDate: "",
  invoiceAmount: "",
  poNumber: "",
  grnNumber: "",
  currency: "",
  paymentTerms: "",

  disputeCategory: "",
  disputeIdentifiedDate: "",
  amountUnderDispute: "",
  description: "",
  supportingRef: "",

  resolutionTracking: [
    {
      actionOwner: "",
      targetDate: "",
      currentStatus: "",
      resolutionSummary: "",
      dynamicFields: {}
    }
  ],

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00883_InvoiceDisputeNote = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN LOGIC ================= */

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00883"
      title="Invoice Dispute Note"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Invoice Dispute Note Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00883"
              title="INVOICE DISPUTE NOTE"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

             {/* ================= DOCUMENT HEADER ================= */}
<div className="form-section">
  <h3 className="form-section-title">Document Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Document Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field name="referenceNo" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Version Number</label>
      <Field name="version" className="form-input"/>
    </div>

  </div>
</div>
             {/* ================= INVOICE DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Invoice Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Vendor Name</label>
      <Field name="vendorName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Number</label>
      <Field name="invoiceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Date</label>
      <Field name="invoiceDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Amount</label>
      <Field name="invoiceAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">PO Number</label>
      <Field name="poNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">GRN Number</label>
      <Field name="grnNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Payment Terms</label>
      <Field name="paymentTerms" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= DISPUTE DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Dispute Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Dispute Category</label>
      <Field name="disputeCategory" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Dispute Identified Date</label>
      <Field name="disputeIdentifiedDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Amount Under Dispute</label>
      <Field name="amountUnderDispute" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Description of Issue</label>
      <Field name="description" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Supporting Document Reference</label>
      <Field name="supportingRef" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= RESOLUTION TRACKING TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Resolution Tracking</h3>

                <FieldArray name="resolutionTracking">
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
                              actionOwner:"",
                              targetDate:"",
                              currentStatus:"",
                              resolutionSummary:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Action Owner</th>
                            <th>Target Resolution Date</th>
                            <th>Current Status</th>
                            <th>Resolution Summary</th>

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
                          {values.resolutionTracking.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`resolutionTracking.${index}.actionOwner`} className="form-input"/></td>
                              <td><Field name={`resolutionTracking.${index}.targetDate`} type="date" className="form-input"/></td>
                              <td><Field name={`resolutionTracking.${index}.currentStatus`} className="form-input"/></td>
                              <td><Field name={`resolutionTracking.${index}.resolutionSummary`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`resolutionTracking.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= APPROVALS ================= */}
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

              {/* ================= CUSTOM SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove })=>(
                  <>
                    {!isPrintMode && (
                      <button type="button" className="btn-submit" onClick={()=>push({data:{}})}>
                        + Add Custom Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index}>
                        <ApprovalSignatureBlock
                          label={`Custom Signature ${index+1}`}
                          value={sig.data||{}}
                          onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
                        />
                        {!isPrintMode && (
                          <button type="button" onClick={()=>remove(index)}>Remove</button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Invoice Dispute Note
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

export default FRM00883_InvoiceDisputeNote;
