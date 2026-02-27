// FRM00893_RetentionMoneyTracking.jsx
// FRM-00893 – Retention Money Tracking – Request / Approval / Report
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
  vendorName: Yup.string().required("Required"),
  contractNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00893",
  version: "1.0",
  date: "",
  referenceNo: "",

  vendorName: "",
  vendorCode: "",
  contractNumber: "",
  projectCostCenter: "",

  contractValue: "",
  retentionPercent: "",
  retentionCap: "",
  currency: "",

  notes: "",

  policyComplianceConfirmed: "",
  contractTermsVerified: "",
  riskLevel: "",
  complianceRemarks: "",

  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  retentionLedger: [
    {
      invoiceReferenceNo: "",
      invoiceAmount: "",
      retentionDeducted: "",
      cumulativeRetention: "",
      releaseEligibilityDate: "",
      retentionReleased: "",
      balanceRetention: "",
      remarks: "",
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

const FRM00893_RetentionMoneyTracking = () => {

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
      formId="FRM-00893"
      title="Retention Money Tracking"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Retention Money Tracking Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00893"
              title="RETENTION MONEY TRACKING"
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

              {/* ================= VENDOR & CONTRACT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor & Contract Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorCode" placeholder="Vendor Code" className="form-input"/>
                  <Field name="contractNumber" placeholder="Contract Number" className="form-input"/>
                  <Field name="projectCostCenter" placeholder="Project / Cost Center" className="form-input"/>
                  <Field name="contractValue" type="number" placeholder="Contract Value" className="form-input"/>
                  <Field name="retentionPercent" type="number" placeholder="Retention %" className="form-input"/>
                  <Field name="retentionCap" type="number" placeholder="Retention Cap" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                </div>
              </div>

              {/* ================= RETENTION LEDGER ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Retention Ledger</h3>

                <FieldArray name="retentionLedger">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              invoiceReferenceNo:"",
                              invoiceAmount:"",
                              retentionDeducted:"",
                              cumulativeRetention:"",
                              releaseEligibilityDate:"",
                              retentionReleased:"",
                              balanceRetention:"",
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
                            <th>Invoice / Reference No</th>
                            <th>Invoice Amount</th>
                            <th>Retention Deducted</th>
                            <th>Cumulative Retention</th>
                            <th>Release Eligibility Date</th>
                            <th>Retention Released</th>
                            <th>Balance Retention</th>
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
                          {values.retentionLedger.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`retentionLedger.${index}.invoiceReferenceNo`} className="form-input"/></td>
                              <td><Field name={`retentionLedger.${index}.invoiceAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`retentionLedger.${index}.retentionDeducted`} type="number" className="form-input"/></td>
                              <td><Field name={`retentionLedger.${index}.cumulativeRetention`} type="number" className="form-input"/></td>
                              <td><Field name={`retentionLedger.${index}.releaseEligibilityDate`} type="date" className="form-input"/></td>
                              <td><Field name={`retentionLedger.${index}.retentionReleased`} type="number" className="form-input"/></td>
                              <td><Field name={`retentionLedger.${index}.balanceRetention`} type="number" className="form-input"/></td>
                              <td><Field name={`retentionLedger.${index}.remarks`} className="form-input"/></td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`retentionLedger.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= NOTES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <Field name="notes" className="form-input"/>
              </div>

              {/* ================= COMPLIANCE & CHECKS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance & Risk Review</h3>
                <div className="form-fields">
                  <Field name="policyComplianceConfirmed" placeholder="Policy Compliance Confirmed (Y/N)" className="form-input"/>
                  <Field name="contractTermsVerified" placeholder="Contract Terms Verified (Y/N)" className="form-input"/>
                  <Field name="riskLevel" className="form-input"/>
                  <Field name="complianceRemarks" className="form-input"/>
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
                    Submit Retention Money Tracking
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

export default FRM00893_RetentionMoneyTracking;
