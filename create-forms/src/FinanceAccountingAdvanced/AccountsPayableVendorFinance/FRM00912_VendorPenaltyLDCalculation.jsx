// FRM00912_VendorPenaltyLDCalculation.jsx
// FRM-00912 – Vendor Penalty / LD Calculation
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
  requestNumber: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  contractValue: Yup.string().required("Required"),
  finalPenaltyAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00912",
  version: "1.0",
  effectiveDate: "",
  preparedBy: "",
  department: "Finance & Accounting (Advanced)",
  process: "Accounts Payable & Vendor Finance",
  confidentialityLevel: "",

  /* Request Details */
  requestNumber: "",
  requestDate: "",
  projectName: "",
  projectCode: "",
  costCenter: "",
  vendorName: "",
  vendorCode: "",
  contractNumber: "",
  contractValue: "",

  /* Penalty Details */
  penaltyType: "",
  penaltyReason: "",
  nonComplianceDescription: "",
  clauseReference: "",
  delayDays: "",
  applicableLDPercent: "",
  maximumLDCap: "",
  calculationBasis: "",

  /* Calculation Section */
  calculationItems: [
    {
      contractValueConsidered: "",
      ldRatePerDay: "",
      numberOfDays: "",
      calculatedAmount: "",
      adjustments: "",
      dynamicFields: {}
    }
  ],

  finalPenaltyAmount: "",

  /* Financial Impact */
  recoveryMethod: "",
  impactOnVendorPayment: "",
  budgetImpact: "",
  glAccount: "",

  /* Supporting Information */
  supportingDocsAttached: "",
  referenceDocuments: "",
  remarks: "",

  /* Risk & Compliance */
  contractComplianceVerified: "",
  legalReviewRequired: "",
  financeReviewRequired: "",
  riskRating: "",

  /* ERP Tracking */
  workflowStatus: "",
  approvalReferenceId: "",
  postingReference: "",
  closureDate: "",

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

const FRM00912_VendorPenaltyLDCalculation = () => {

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
    <ModernFormWrapper
      formId="FRM-00912"
      title="Vendor Penalty / LD Calculation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Vendor Penalty / LD Calculation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00912"
              title="VENDOR PENALTY / LD CALCULATION"
              department="Finance & Accounting (Advanced) – Accounts Payable & Vendor Finance"
            >

              {/* 1. DOCUMENT CONTROL */}
              <div className="form-section">
                <h3 className="form-section-title">1. Document Control</h3>
                <div className="form-fields">
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="version" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="process" className="form-input"/>
                  <Field name="confidentialityLevel" placeholder="Confidentiality Level" className="form-input"/>
                </div>
              </div>

              {/* 2. REQUEST DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">2. Request Details</h3>
                <div className="form-fields">
                  <Field name="requestNumber" placeholder="Request Number" className="form-input"/>
                  <Field name="requestDate" type="date" className="form-input"/>
                  <Field name="projectName" placeholder="Project / Contract Name" className="form-input"/>
                  <Field name="projectCode" placeholder="Project Code" className="form-input"/>
                  <Field name="costCenter" placeholder="Cost Center" className="form-input"/>
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorCode" placeholder="Vendor Code" className="form-input"/>
                  <Field name="contractNumber" placeholder="Contract / PO Number" className="form-input"/>
                  <Field name="contractValue" type="number" placeholder="Contract Value" className="form-input"/>
                </div>
              </div>

              {/* 3. PENALTY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">3. Penalty / LD Details</h3>
                <div className="form-fields">
                  <Field name="penaltyType" placeholder="Type of Penalty" className="form-input"/>
                  <Field name="penaltyReason" placeholder="Reason for Penalty" className="form-input"/>
                  <Field name="nonComplianceDescription" placeholder="Description of Non-Compliance" className="form-input"/>
                  <Field name="clauseReference" placeholder="Clause Reference" className="form-input"/>
                  <Field name="delayDays" type="number" placeholder="Delay Period (Days)" className="form-input"/>
                  <Field name="applicableLDPercent" type="number" placeholder="Applicable LD %" className="form-input"/>
                  <Field name="maximumLDCap" type="number" placeholder="Maximum LD Cap" className="form-input"/>
                  <Field name="calculationBasis" placeholder="Calculation Basis" className="form-input"/>
                </div>
              </div>

              {/* 4. CALCULATION SECTION */}
              <div className="form-section">
                <h3 className="form-section-title">4. Calculation Section</h3>

                <FieldArray name="calculationItems">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex", gap:"10px", marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button type="button" className="btn-submit"
                            onClick={()=>push({
                              contractValueConsidered:"",
                              ldRatePerDay:"",
                              numberOfDays:"",
                              calculatedAmount:"",
                              adjustments:"",
                              dynamicFields:{}
                            })}>
                            + Add Calculation Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Contract Value</th>
                            <th>LD Rate</th>
                            <th>No. of Days</th>
                            <th>Calculated Amount</th>
                            <th>Adjustments</th>
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
                          {values.calculationItems.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`calculationItems.${index}.contractValueConsidered`} type="number" className="form-input"/></td>
                              <td><Field name={`calculationItems.${index}.ldRatePerDay`} type="number" className="form-input"/></td>
                              <td><Field name={`calculationItems.${index}.numberOfDays`} type="number" className="form-input"/></td>
                              <td><Field name={`calculationItems.${index}.calculatedAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`calculationItems.${index}.adjustments`} type="number" className="form-input"/></td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`calculationItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

                <div className="form-fields" style={{marginTop:15}}>
                  <Field name="finalPenaltyAmount" type="number" placeholder="Final Penalty Amount" className="form-input"/>
                </div>
              </div>

              {/* Financial, Supporting, Risk, ERP sections remain unchanged */}

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* 8. APPROVAL WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">8. Approval Workflow</h3>
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

              {/* ADDITIONAL SIGNATURES */}
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
                          <button
                            type="button"
                            onClick={()=>remove(index)}
                          >
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
                    Submit Vendor Penalty / LD Calculation
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

export default FRM00912_VendorPenaltyLDCalculation;
