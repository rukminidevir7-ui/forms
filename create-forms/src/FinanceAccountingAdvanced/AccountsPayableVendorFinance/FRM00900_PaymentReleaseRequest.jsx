// FRM00900_PaymentReleaseRequest.jsx
// FRM-00900 – Payment Release Request – Request / Approval
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
  requestId: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required"),
  paymentAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00900",
  version: "1.0",

  requestId: "",
  date: "",

  businessUnit: "",
  department: "",

  vendorName: "",
  vendorId: "",

  invoiceNumber: "",
  invoiceDate: "",

  paymentAmount: "",
  currency: "",
  paymentMethod: "",
  priority: "",

  businessJustification: "",

  /* Risk & Compliance Checklist */
  complianceChecks: [
    {
      checkItem: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

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

const FRM00900_PaymentReleaseRequest = () => {

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
      formId="FRM-00900"
      title="Payment Release Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Payment Release Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00900"
              title="PAYMENT RELEASE REQUEST"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* ================= REQUEST INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Request Information</h3>
                <div className="form-fields">
                  <Field name="requestId" placeholder="Request ID" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="businessUnit" placeholder="Business Unit" className="form-input"/>
                  <Field name="department" placeholder="Department" className="form-input"/>
                </div>
              </div>

              {/* ================= VENDOR & INVOICE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor & Invoice Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorId" placeholder="Vendor ID" className="form-input"/>
                  <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
                  <Field name="invoiceDate" type="date" className="form-input"/>
                  <Field name="paymentAmount" type="number" placeholder="Payment Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="paymentMethod" placeholder="Payment Method" className="form-input"/>
                  <Field name="priority" placeholder="Priority" className="form-input"/>
                </div>
              </div>

              {/* ================= BUSINESS JUSTIFICATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Business Justification</h3>
                <Field name="businessJustification" className="form-input"/>
              </div>

              {/* ================= RISK & COMPLIANCE CHECKS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Compliance Checks</h3>

                <FieldArray name="complianceChecks">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              checkItem:"",
                              status:"",
                              remarks:"",
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
                            <th>Check Item</th>
                            <th>Status (Y/N)</th>
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
                          {values.complianceChecks.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>
                                <Field name={`complianceChecks.${index}.checkItem`} className="form-input"/>
                              </td>
                              <td>
                                <Field as="select" name={`complianceChecks.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </Field>
                              </td>
                              <td>
                                <Field name={`complianceChecks.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`complianceChecks.${index}.dynamicFields.${col.key}`}
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
                    Submit Payment Release Request
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

export default FRM00900_PaymentReleaseRequest;
