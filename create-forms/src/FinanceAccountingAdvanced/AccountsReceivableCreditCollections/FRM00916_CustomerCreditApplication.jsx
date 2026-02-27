// FRM00916_CustomerCreditApplication.jsx
// FRM-00916 – Customer Credit Application – Request / Initiation
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
  requestedCreditLimit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00916",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",

  /* Customer Info */
  customerName: "",
  registeredAddress: "",
  contactPerson: "",
  phone: "",
  email: "",
  taxId: "",

  /* Credit Details */
  requestedCreditLimit: "",
  currency: "",
  paymentTerms: "",
  creditPeriodDays: "",
  purposeJustification: "",

  /* Financial Information */
  annualRevenue: "",
  bankName: "",
  bankAccountNumber: "",
  ifscSwift: "",

  tradeReferences: [
    {
      referenceName: "",
      contactDetails: "",
      relationshipYears: "",
      dynamicFields: {}
    }
  ],

  supportingDocsAttached: "",
  documentReference: "",

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

const FRM00916_CustomerCreditApplication = () => {

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
      formId="FRM-00916"
      title="Customer Credit Application"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customer Credit Application Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00916"
              title="CUSTOMER CREDIT APPLICATION"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Control</h3>
                <div className="form-fields">
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="version" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* ================= CUSTOMER INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Information</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="registeredAddress" placeholder="Registered Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" placeholder="Email" className="form-input"/>
                  <Field name="taxId" placeholder="Tax ID / GST" className="form-input"/>
                </div>
              </div>

              {/* ================= CREDIT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Credit Details</h3>
                <div className="form-fields">
                  <Field name="requestedCreditLimit" type="number" placeholder="Requested Credit Limit" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="paymentTerms" placeholder="Payment Terms" className="form-input"/>
                  <Field name="creditPeriodDays" type="number" placeholder="Credit Period (Days)" className="form-input"/>
                  <Field name="purposeJustification" placeholder="Purpose / Justification" className="form-input"/>
                </div>
              </div>

              {/* ================= FINANCIAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Information</h3>
                <div className="form-fields">
                  <Field name="annualRevenue" type="number" placeholder="Annual Revenue" className="form-input"/>
                  <Field name="bankName" placeholder="Bank Name" className="form-input"/>
                  <Field name="bankAccountNumber" placeholder="Bank Account Number" className="form-input"/>
                  <Field name="ifscSwift" placeholder="IFSC / SWIFT" className="form-input"/>
                </div>
              </div>

              {/* ================= TRADE REFERENCES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Trade References</h3>

                <FieldArray name="tradeReferences">
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
                              referenceName:"",
                              contactDetails:"",
                              relationshipYears:"",
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
                            <th>Reference Name</th>
                            <th>Contact Details</th>
                            <th>Relationship (Years)</th>
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
                          {values.tradeReferences.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`tradeReferences.${index}.referenceName`} className="form-input"/></td>
                              <td><Field name={`tradeReferences.${index}.contactDetails`} className="form-input"/></td>
                              <td><Field name={`tradeReferences.${index}.relationshipYears`} type="number" className="form-input"/></td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`tradeReferences.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= SUPPORTING INFO ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  <Field name="supportingDocsAttached" placeholder="Supporting Documents Attached (Y/N)" className="form-input"/>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
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
                <h3 className="form-section-title">Authorization</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />
                  <ApprovalSignatureBlock label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock label="Approved By"
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
                    Submit Customer Credit Application
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

export default FRM00916_CustomerCreditApplication;