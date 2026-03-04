// FRM00915_VendorSettlementAgreement.jsx
// FRM-00915 – Vendor Settlement Agreement
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
  agreementNumber: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  settlementAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00915",
  version: "1.0",
  effectiveDate: "",
  preparedBy: "",
  department: "Finance & Accounting (Advanced)",
  process: "Accounts Payable & Vendor Finance",
  confidentialityLevel: "",

  /* Agreement Details */
  agreementNumber: "",
  agreementDate: "",
  projectName: "",
  projectCode: "",
  vendorName: "",
  vendorCode: "",
  contractNumber: "",

  /* Settlement Summary */
  originalContractValue: "",
  totalInvoicedAmount: "",
  totalPaidAmount: "",
  outstandingAmount: "",
  settlementAmount: "",
  settlementBasis: "",

  /* Adjustment Details (Dynamic Rows) */
  adjustments: [
    {
      adjustmentType: "",
      amount: "",
      dynamicFields: {}
    }
  ],

  netPayableRecoverable: "",

  /* Terms & Conditions */
  settlementTerms: "",
  paymentMethod: "",
  settlementDate: "",
  legalNotes: "",
  remarks: "",

  /* Supporting Information */
  supportingDocsAttached: "",
  referenceDocuments: "",

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

const FRM00915_VendorSettlementAgreement = () => {

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
      formId="FRM-00915"
      title="Vendor Settlement Agreement"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Vendor Settlement Agreement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00915"
              title="VENDOR SETTLEMENT AGREEMENT"
              department="Finance & Accounting (Advanced) – Accounts Payable & Vendor Finance"
            >

             {/* ================= 1. DOCUMENT CONTROL ================= */}
<div className="form-section">
  <h3 className="form-section-title">1. Document Control</h3>
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
      <label className="form-label">Effective Date</label>
      <Field name="effectiveDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Prepared By</label>
      <Field name="preparedBy" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Department</label>
      <Field name="department" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Process</label>
      <Field name="process" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Confidentiality Level</label>
      <Field name="confidentialityLevel" className="form-input"/>
    </div>

  </div>
</div>
{/* ================= 2. AGREEMENT DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">2. Agreement Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Agreement Number</label>
      <Field name="agreementNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Agreement Date</label>
      <Field name="agreementDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Project / Contract Name</label>
      <Field name="projectName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Project Code</label>
      <Field name="projectCode" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Vendor Name</label>
      <Field name="vendorName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Vendor Code</label>
      <Field name="vendorCode" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contract / PO Number</label>
      <Field name="contractNumber" className="form-input"/>
    </div>

  </div>
</div>

            {/* ================= 3. SETTLEMENT SUMMARY ================= */}
<div className="form-section">
  <h3 className="form-section-title">3. Settlement Summary</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Original Contract Value</label>
      <Field name="originalContractValue" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Total Invoiced Amount</label>
      <Field name="totalInvoicedAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Total Paid Amount</label>
      <Field name="totalPaidAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Outstanding Amount</label>
      <Field name="outstandingAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Proposed Settlement Amount</label>
      <Field name="settlementAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Settlement Basis / Justification</label>
      <Field name="settlementBasis" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= 4. ADJUSTMENT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">4. Adjustment Details</h3>

                <FieldArray name="adjustments">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button type="button" className="btn-submit"
                            onClick={()=>push({adjustmentType:"",amount:"",dynamicFields:{}})}>
                            + Add Adjustment
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Adjustment Type</th>
                            <th>Amount</th>

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
                          {values.adjustments.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>
                                <Field name={`adjustments.${index}.adjustmentType`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`adjustments.${index}.amount`} type="number" className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`adjustments.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                  <Field name="netPayableRecoverable" type="number"
                    placeholder="Net Payable / Recoverable"
                    className="form-input"/>
                </div>
              </div>

             {/* ================= 5. TERMS & CONDITIONS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Terms & Conditions</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Settlement Terms</label>
      <Field name="settlementTerms" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Payment Method</label>
      <Field name="paymentMethod" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Settlement Date</label>
      <Field name="settlementDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Legal / Contractual Notes</label>
      <Field name="legalNotes" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Additional Remarks</label>
      <Field name="remarks" className="form-input"/>
    </div>

  </div>
</div>

             {/* ================= 6. SUPPORTING INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Supporting Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Supporting Documents Attached</label>
      <Field name="supportingDocsAttached" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Documents</label>
      <Field name="referenceDocuments" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= 8. ERP TRACKING ================= */}
<div className="form-section">
  <h3 className="form-section-title">ERP Tracking</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Workflow Status</label>
      <Field name="workflowStatus" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Approval Reference ID</label>
      <Field name="approvalReferenceId" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">ERP Posting Reference</label>
      <Field name="postingReference" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Closure Date</label>
      <Field name="closureDate" type="date" className="form-input"/>
    </div>

  </div>
</div>

             {/* ================= AUDIT TRAIL ================= */}
<div className="form-section">
  <h3 className="form-section-title">Audit Trail</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Created On</label>
      <Field name="createdOn" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Last Updated On</label>
      <Field name="lastUpdatedOn" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Document Owner</label>
      <Field name="documentOwner" className="form-input"/>
    </div>

  </div>
</div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">7. Approval Workflow</h3>
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
                      <div key={index}>
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
                    Submit Vendor Settlement Agreement
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

export default FRM00915_VendorSettlementAgreement;
