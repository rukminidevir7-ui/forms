// FRM00905_VendorPaymentConfirmation.jsx
// FRM-00905 / FRM-00906 – Vendor Payment Confirmation – Review / Approval
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
  vendorName: Yup.string().required("Required"),
  paymentReferenceNo: Yup.string().required("Required"),
  paymentAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00905 / FRM-00906",
  version: "1.0",
  date: "",

  department: "Finance & Accounting",
  process: "Accounts Payable & Vendor Finance",

  vendorName: "",
  vendorId: "",

  paymentReferenceNo: "",
  paymentDate: "",
  paymentAmount: "",
  currency: "",
  bankName: "",
  accountNumber: "",

  /* Invoice Details Table */
  invoiceDetails: [
    {
      invoiceNumber: "",
      invoiceDate: "",
      invoiceAmount: "",
      dynamicFields: {}
    }
  ],

  /* Confirmation Details */
  confirmationMethod: "",
  confirmedBy: "",
  contactDetails: "",
  confirmationDate: "",
  remarks: "",

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

const FRM00905_VendorPaymentConfirmation = () => {

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
      formId="FRM-00905"
      title="Vendor Payment Confirmation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Vendor Payment Confirmation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00905 / FRM-00906"
              title="VENDOR PAYMENT CONFIRMATION"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Control</h3>
                <div className="form-fields">
                  <Field name="department" className="form-input"/>
                  <Field name="process" className="form-input"/>
                  <Field name="formId" className="form-input" disabled/>
                  <Field name="version" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= VENDOR & PAYMENT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor & Payment Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorId" placeholder="Vendor ID" className="form-input"/>
                  <Field name="paymentReferenceNo" placeholder="Payment Reference No." className="form-input"/>
                  <Field name="paymentDate" type="date" className="form-input"/>
                  <Field name="paymentAmount" type="number" placeholder="Payment Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="bankName" placeholder="Bank Name" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                </div>
              </div>

              {/* ================= INVOICE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Details</h3>

                <FieldArray name="invoiceDetails">
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
                              invoiceNumber:"",
                              invoiceDate:"",
                              invoiceAmount:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Invoice
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Invoice Amount</th>

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
                          {values.invoiceDetails.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`invoiceDetails.${index}.invoiceNumber`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`invoiceDetails.${index}.invoiceDate`} type="date" className="form-input"/>
                              </td>

                              <td>
                                <Field name={`invoiceDetails.${index}.invoiceAmount`} type="number" className="form-input"/>
                              </td>

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

              {/* ================= CONFIRMATION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Confirmation Details</h3>
                <div className="form-fields">
                  <Field name="confirmationMethod" placeholder="Confirmation Method (Email/Portal/Letter)" className="form-input"/>
                  <Field name="confirmedBy" placeholder="Confirmed By (Vendor Contact)" className="form-input"/>
                  <Field name="contactDetails" placeholder="Contact Details" className="form-input"/>
                  <Field name="confirmationDate" type="date" className="form-input"/>
                  <Field name="remarks" placeholder="Remarks" className="form-input"/>
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
                    label="Verified By"
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
                    Submit Vendor Payment Confirmation
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

export default FRM00905_VendorPaymentConfirmation;
