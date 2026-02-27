// FRM00899_PaymentHoldRequest.jsx
// FRM-00899 – Payment Hold Request – Request / Approval
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
  requestedBy: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00899",
  version: "1.0",
  date: "",
  referenceNo: "",

  /* Requestor Details */
  requestedBy: "",
  employeeId: "",

  /* Payment Details */
  vendorName: "",
  vendorId: "",
  invoiceNumber: "",
  invoiceDate: "",
  paymentAmount: "",
  currency: "",
  paymentDueDate: "",

  /* Hold Details */
  reasonForHold: "",
  holdEffectiveFrom: "",
  expectedReleaseDate: "",
  supportingReference: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  /* Additional Invoices (Dynamic Table) */
  additionalInvoices: [
    {
      invoiceNumber: "",
      invoiceDate: "",
      paymentAmount: "",
      currency: "",
      paymentDueDate: "",
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

const FRM00899_PaymentHoldRequest = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

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
      formId="FRM-00899"
      title="Payment Hold Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Payment Hold Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00899"
              title="PAYMENT HOLD REQUEST"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Control</h3>
                <div className="form-fields">
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNo" placeholder="Reference No" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= REQUESTOR DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Requested By</h3>
                <div className="form-fields">
                  <Field name="requestedBy" placeholder="Requested By" className="form-input"/>
                  <Field name="employeeId" placeholder="Employee ID" className="form-input"/>
                </div>
              </div>

              {/* ================= PAYMENT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Payment Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorId" placeholder="Vendor ID" className="form-input"/>
                  <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
                  <Field name="invoiceDate" type="date" className="form-input"/>
                  <Field name="paymentAmount" type="number" placeholder="Payment Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="paymentDueDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= ADDITIONAL INVOICES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Additional Invoices (If Any)</h3>

                <FieldArray name="additionalInvoices">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              invoiceNumber:"",
                              invoiceDate:"",
                              paymentAmount:"",
                              currency:"",
                              paymentDueDate:"",
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
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Payment Amount</th>
                            <th>Currency</th>
                            <th>Payment Due Date</th>
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
                          {values.additionalInvoices.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`additionalInvoices.${index}.invoiceNumber`} className="form-input"/></td>
                              <td><Field name={`additionalInvoices.${index}.invoiceDate`} type="date" className="form-input"/></td>
                              <td><Field name={`additionalInvoices.${index}.paymentAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`additionalInvoices.${index}.currency`} className="form-input"/></td>
                              <td><Field name={`additionalInvoices.${index}.paymentDueDate`} type="date" className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`additionalInvoices.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= HOLD DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Hold Details</h3>
                <div className="form-fields">
                  <Field name="reasonForHold" placeholder="Reason for Hold" className="form-input"/>
                  <Field name="holdEffectiveFrom" type="date" className="form-input"/>
                  <Field name="expectedReleaseDate" type="date" className="form-input"/>
                  <Field name="supportingReference" placeholder="Supporting Reference" className="form-input"/>
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

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>
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
                    Submit Payment Hold Request
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

export default FRM00899_PaymentHoldRequest;
