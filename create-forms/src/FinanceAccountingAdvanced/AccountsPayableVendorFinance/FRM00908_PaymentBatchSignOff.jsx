// FRM00908_PaymentBatchSignOff.jsx
// FRM-00908 – Payment Batch Sign-off – Approval Form
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
  batchId: Yup.string().required("Required"),
  paymentRunDate: Yup.string().required("Required"),
  totalBatchAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00908",
  version: "1.0",
  effectiveDate: "",

  department: "Finance & Accounting (Advanced)",
  process: "Accounts Payable & Vendor Finance",

  /* Batch Details */
  batchId: "",
  paymentRunDate: "",
  paymentMethod: "",
  bankAccountUsed: "",
  totalPayments: "",
  totalBatchAmount: "",
  currency: "",
  periodFrom: "",
  periodTo: "",

  /* Vendor Summary Table */
  vendorSummary: [
    {
      vendorName: "",
      vendorCode: "",
      invoiceCount: "",
      totalInvoiceAmount: "",
      adjustments: "",
      netPayableAmount: "",
      dynamicFields: {}
    }
  ],

  /* Control & Validation */
  threeWayMatchStatus: "",
  duplicateCheckCompleted: "",
  approvalLimitsVerified: "",
  supportingDocsVerified: "",
  exceptionNotes: "",

  /* Final Approver Decision */
  finalDecision: "",
  decisionComments: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  preparedSignature: {},
  reviewedSignature: {},
  finalApproverSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00908_PaymentBatchSignOff = () => {

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
      formId="FRM-00908"
      title="Payment Batch Sign-off"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Payment Batch Sign-off Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00908"
              title="PAYMENT BATCH SIGN-OFF"
              department="Finance & Accounting (Advanced) – Accounts Payable & Vendor Finance"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Control</h3>
                <div className="form-fields">
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="version" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="process" className="form-input"/>
                </div>
              </div>

              {/* ================= BATCH DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Batch Details</h3>
                <div className="form-fields">
                  <Field name="batchId" placeholder="Batch ID / Reference No" className="form-input"/>
                  <Field name="paymentRunDate" type="date" className="form-input"/>
                  <Field name="paymentMethod" placeholder="Payment Method" className="form-input"/>
                  <Field name="bankAccountUsed" placeholder="Bank Account Used" className="form-input"/>
                  <Field name="totalPayments" type="number" placeholder="Total No of Payments" className="form-input"/>
                  <Field name="totalBatchAmount" type="number" placeholder="Total Batch Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="periodFrom" type="date" className="form-input"/>
                  <Field name="periodTo" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= VENDOR SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor Summary</h3>

                <FieldArray name="vendorSummary">
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
                              vendorName:"",
                              vendorCode:"",
                              invoiceCount:"",
                              totalInvoiceAmount:"",
                              adjustments:"",
                              netPayableAmount:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Vendor
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Vendor Name</th>
                            <th>Vendor Code</th>
                            <th>Invoice Count</th>
                            <th>Total Invoice Amount</th>
                            <th>Adjustments</th>
                            <th>Net Payable Amount</th>

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
                          {values.vendorSummary.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`vendorSummary.${index}.vendorName`} className="form-input"/></td>
                              <td><Field name={`vendorSummary.${index}.vendorCode`} className="form-input"/></td>
                              <td><Field name={`vendorSummary.${index}.invoiceCount`} type="number" className="form-input"/></td>
                              <td><Field name={`vendorSummary.${index}.totalInvoiceAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`vendorSummary.${index}.adjustments`} type="number" className="form-input"/></td>
                              <td><Field name={`vendorSummary.${index}.netPayableAmount`} type="number" className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`vendorSummary.${index}.dynamicFields.${col.key}`}
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
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= CONTROL & VALIDATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Validation</h3>
                <div className="form-fields">
                  <Field name="threeWayMatchStatus" placeholder="Three-Way Match Status" className="form-input"/>
                  <Field name="duplicateCheckCompleted" placeholder="Duplicate Check Completed (Y/N)" className="form-input"/>
                  <Field name="approvalLimitsVerified" placeholder="Approval Limits Verified (Y/N)" className="form-input"/>
                  <Field name="supportingDocsVerified" placeholder="Supporting Documents Verified (Y/N)" className="form-input"/>
                  <Field name="exceptionNotes" placeholder="Exception Notes" className="form-input"/>
                </div>
              </div>

              {/* ================= FINAL APPROVER DECISION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Final Approver Decision</h3>
                <div className="form-fields">
                  <Field as="select" name="finalDecision" className="form-input">
                    <option value="">Select Decision</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved with Conditions">Approved with Conditions</option>
                  </Field>
                  <Field name="decisionComments" placeholder="Decision Comments" className="form-input"/>
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
                    label="Final Approver"
                    value={values.finalApproverSignature}
                    onChange={(val)=>setFieldValue("finalApproverSignature",val)}
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
                    Submit Payment Batch Sign-off
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

export default FRM00908_PaymentBatchSignOff;
