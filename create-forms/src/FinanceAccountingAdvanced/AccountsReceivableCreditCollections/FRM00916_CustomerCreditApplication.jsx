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

    <div className="form-field">
      <label className="form-label">Form ID</label>
      <Field name="formId" disabled className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Version</label>
      <Field name="version" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Document Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field name="referenceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location / Branch</label>
      <Field name="location" className="form-input"/>
    </div>

  </div>
</div>

            {/* ================= CUSTOMER INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Customer Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Customer Name</label>
      <Field name="customerName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Registered Address</label>
      <Field name="registeredAddress" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field name="contactPerson" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Phone Number</label>
      <Field name="phone" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Email Address</label>
      <Field name="email" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Tax ID / GST Number</label>
      <Field name="taxId" className="form-input"/>
    </div>

  </div>
</div>

             {/* ================= CREDIT DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Credit Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Requested Credit Limit</label>
      <Field name="requestedCreditLimit" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Payment Terms</label>
      <Field name="paymentTerms" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Credit Period (Days)</label>
      <Field name="creditPeriodDays" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Purpose / Business Justification</label>
      <Field name="purposeJustification" className="form-input"/>
    </div>

  </div>
</div>

            {/* ================= FINANCIAL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Financial Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Annual Revenue</label>
      <Field name="annualRevenue" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Bank Name</label>
      <Field name="bankName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Bank Account Number</label>
      <Field name="bankAccountNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">IFSC / SWIFT Code</label>
      <Field name="ifscSwift" className="form-input"/>
    </div>

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

             {/* ================= SUPPORTING INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Supporting Information</h3>
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