// FRM00917_CreditLimitProposal.jsx
// FRM-00917 / 00918 / 00919 – Credit Limit Proposal
// Initiation / Approval / Report
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
  proposedCreditLimit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00917 / FRM-00918 / FRM-00919",
  formType: "Initiation",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",
  email: "",
  taxId: "",

  /* Proposal Details */
  currentCreditLimit: "",
  currency: "",
  proposedCreditLimit: "",
  effectiveDate: "",
  creditPeriodDays: "",
  paymentTerms: "",
  justification: "",

  /* Risk Assessment */
  riskRating: "",
  assessmentNotes: "",
  exposureAmount: "",
  outstandingBalance: "",

  /* Financial Snapshot */
  annualRevenue: "",
  averageMonthlySales: "",
  paymentHistorySummary: "",

  /* Supporting */
  supportingDocsAttached: "",
  documentReference: "",

  /* Optional Dynamic Financial Indicators */
  additionalMetrics: [
    {
      metricName: "",
      metricValue: "",
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

const FRM00917_CreditLimitProposal = () => {

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
      formId="FRM-00917"
      title="Credit Limit Proposal"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Credit Limit Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId={values.formId}
              title="CREDIT LIMIT PROPOSAL"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formType" as="select" className="form-input">
                    <option value="Initiation">Initiation</option>
                    <option value="Approval">Approval</option>
                    <option value="Report">Report</option>
                  </Field>
                  <Field name="version" className="form-input"/>
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
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" placeholder="Email" className="form-input"/>
                  <Field name="taxId" placeholder="Tax ID / GST" className="form-input"/>
                </div>
              </div>

              {/* ================= PROPOSAL DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Proposal Details</h3>
                <div className="form-fields">
                  <Field name="currentCreditLimit" type="number" placeholder="Current Credit Limit" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="proposedCreditLimit" type="number" placeholder="Proposed Credit Limit" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                  <Field name="creditPeriodDays" type="number" placeholder="Credit Period (Days)" className="form-input"/>
                  <Field name="paymentTerms" placeholder="Payment Terms" className="form-input"/>
                  <Field name="justification" placeholder="Reason / Justification" className="form-input"/>
                </div>
              </div>

              {/* ================= RISK ASSESSMENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  <Field name="riskRating" placeholder="Risk Rating" className="form-input"/>
                  <Field name="assessmentNotes" placeholder="Assessment Notes" className="form-input"/>
                  <Field name="exposureAmount" type="number" placeholder="Exposure Amount" className="form-input"/>
                  <Field name="outstandingBalance" type="number" placeholder="Outstanding Balance" className="form-input"/>
                </div>
              </div>

              {/* ================= FINANCIAL SNAPSHOT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Snapshot</h3>
                <div className="form-fields">
                  <Field name="annualRevenue" type="number" placeholder="Annual Revenue" className="form-input"/>
                  <Field name="averageMonthlySales" type="number" placeholder="Average Monthly Sales" className="form-input"/>
                  <Field name="paymentHistorySummary" placeholder="Payment History Summary" className="form-input"/>
                </div>
              </div>

              {/* ================= OPTIONAL METRICS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Additional Financial Metrics</h3>

                <FieldArray name="additionalMetrics">
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
                              metricName:"",
                              metricValue:"",
                              remarks:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Metric
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Metric Name</th>
                            <th>Metric Value</th>
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
                          {values.additionalMetrics.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`additionalMetrics.${index}.metricName`} className="form-input"/></td>
                              <td><Field name={`additionalMetrics.${index}.metricValue`} className="form-input"/></td>
                              <td><Field name={`additionalMetrics.${index}.remarks`} className="form-input"/></td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`additionalMetrics.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= SUPPORTING ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  <Field name="supportingDocsAttached" placeholder="Supporting Docs Attached (Y/N)" className="form-input"/>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
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

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
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
                    Submit Credit Limit Proposal
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

export default FRM00917_CreditLimitProposal;