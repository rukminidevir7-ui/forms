// FRM00934_BadDebtWriteOffRequest.jsx
// FRM-00934 – Bad Debt Write-off Request – Request / Initiation
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
  writeOffAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00934",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",

  /* Invoice / Debt Details Table */
  invoiceDetails: [
    {
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      daysOverdue: "",
      outstandingAmount: "",
      currency: "",
      dynamicFields: {}
    }
  ],

  /* Write-off Details */
  writeOffAmount: "",
  writeOffDate: "",
  reasonForWriteOff: "",
  recoveryActionsTaken: "",

  /* Financial Impact */
  provisionAvailable: "",
  impactAmount: "",
  impactDescription: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  /* Signatures */
  requestedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00934_BadDebtWriteOffRequest = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns, { key, label: name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper formId="FRM-00934" title="Bad Debt Write-off Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bad Debt Write-off Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00934"
              title="BAD DEBT WRITE-OFF REQUEST"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
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
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                </div>
              </div>

              {/* ================= INVOICE / DEBT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice / Debt Details</h3>

                <FieldArray name="invoiceDetails">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex", gap:"10px", marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button type="button" className="btn-submit"
                            onClick={()=>push({
                              invoiceNumber:"",
                              invoiceDate:"",
                              dueDate:"",
                              daysOverdue:"",
                              outstandingAmount:"",
                              currency:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <div style={{overflowX:"auto"}}>
                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Invoice Number</th>
                              <th>Invoice Date</th>
                              <th>Due Date</th>
                              <th>Days Overdue</th>
                              <th>Outstanding Amount</th>
                              <th>Currency</th>

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
                            {values.invoiceDetails.map((row,index)=>(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td><Field name={`invoiceDetails.${index}.invoiceNumber`} className="form-input"/></td>
                                <td><Field name={`invoiceDetails.${index}.invoiceDate`} type="date" className="form-input"/></td>
                                <td><Field name={`invoiceDetails.${index}.dueDate`} type="date" className="form-input"/></td>
                                <td><Field name={`invoiceDetails.${index}.daysOverdue`} type="number" className="form-input"/></td>
                                <td><Field name={`invoiceDetails.${index}.outstandingAmount`} type="number" className="form-input"/></td>
                                <td><Field name={`invoiceDetails.${index}.currency`} className="form-input"/></td>

                                {dynamicColumns.map(col=>(
                                  <td key={col.key}>
                                    <Field
                                      name={`invoiceDetails.${index}.dynamicFields.${col.key}`}
                                      className="form-input"
                                    />
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
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= WRITE-OFF DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Write-off Details</h3>
                <div className="form-fields">
                  <Field name="writeOffAmount" type="number" placeholder="Write-off Amount" className="form-input"/>
                  <Field name="writeOffDate" type="date" className="form-input"/>
                  <Field name="reasonForWriteOff" placeholder="Reason for Write-off" className="form-input"/>
                  <Field name="recoveryActionsTaken" placeholder="Recovery Actions Taken" className="form-input"/>
                </div>
              </div>

              {/* ================= FINANCIAL IMPACT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>
                <div className="form-fields">
                  <Field name="provisionAvailable" placeholder="Provision Available" className="form-input"/>
                  <Field name="impactAmount" type="number" placeholder="Impact Amount" className="form-input"/>
                  <Field name="impactDescription" placeholder="Impact Description" className="form-input"/>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Requested By"
                    value={values.requestedSignature}
                    onChange={(val)=>setFieldValue("requestedSignature",val)}
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
                      <button type="button" className="btn-submit"
                        onClick={()=>push({data:{}})}>
                        + Add Custom Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index}>
                        <ApprovalSignatureBlock
                          label={`Custom Signature ${index+1}`}
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
                    Submit Bad Debt Write-off Request
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

export default FRM00934_BadDebtWriteOffRequest;