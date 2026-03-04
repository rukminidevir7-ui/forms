// FRM00890_VendorAdvanceSettlement.jsx
// FRM-00890 – Vendor Advance Settlement – Request / Approval / Report
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
  advanceAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00890",
  version: "1.0",
  date: "",
  referenceNo: "",

  vendorName: "",
  vendorCode: "",
  contactPerson: "",
  contactDetails: "",

  bankName: "",
  bankAccountNumber: "",
  ifscSwift: "",
  paymentMethod: "",

  advanceReferenceNumber: "",
  advanceDate: "",
  currency: "",
  advanceAmount: "",

  purpose: "",
  projectCostCenter: "",
  businessUnit: "",
  settlementDueDate: "",

  justification: "",

  policyComplianceConfirmed: "",
  supportingDocsVerified: "",
  riskLevel: "",
  complianceRemarks: "",

  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  settlementBreakdown: [
    {
      invoiceReferenceNo: "",
      amountAdjusted: "",
      taxAdjustment: "",
      balanceRemaining: "",
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

const FRM00890_VendorAdvanceSettlement = () => {

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
      formId="FRM-00890"
      title="Vendor Advance Settlement"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Vendor Advance Settlement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00890"
              title="VENDOR ADVANCE SETTLEMENT"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
<div className="form-section">
  <h3 className="form-section-title">Document Control</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Document Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field name="referenceNo" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Version Number</label>
      <Field name="version" className="form-input"/>
    </div>

  </div>
</div>

             {/* ================= VENDOR DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Vendor Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Vendor Name</label>
      <Field name="vendorName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Vendor Code</label>
      <Field name="vendorCode" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field name="contactPerson" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contact Details</label>
      <Field name="contactDetails" className="form-input"/>
    </div>

  </div>
</div>

             {/* ================= BANK DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Bank Details</h3>
  <div className="form-fields">

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

    <div className="form-field">
      <label className="form-label">Payment Method</label>
      <Field name="paymentMethod" className="form-input"/>
    </div>

  </div>
</div>
              {/* ================= ADVANCE DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Advance Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Advance Reference Number</label>
      <Field name="advanceReferenceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Advance Date</label>
      <Field name="advanceDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Advance Amount</label>
      <Field name="advanceAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Purpose of Advance</label>
      <Field name="purpose" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Project / Cost Center</label>
      <Field name="projectCostCenter" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Business Unit</label>
      <Field name="businessUnit" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Settlement Due Date</label>
      <Field name="settlementDueDate" type="date" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= SETTLEMENT BREAKDOWN ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Settlement Breakdown</h3>

                <FieldArray name="settlementBreakdown">
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
                              amountAdjusted:"",
                              taxAdjustment:"",
                              balanceRemaining:"",
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
                            <th>Amount Adjusted</th>
                            <th>Tax Adjustment</th>
                            <th>Balance Remaining</th>
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
                          {values.settlementBreakdown.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`settlementBreakdown.${index}.invoiceReferenceNo`} className="form-input"/></td>
                              <td><Field name={`settlementBreakdown.${index}.amountAdjusted`} type="number" className="form-input"/></td>
                              <td><Field name={`settlementBreakdown.${index}.taxAdjustment`} type="number" className="form-input"/></td>
                              <td><Field name={`settlementBreakdown.${index}.balanceRemaining`} type="number" className="form-input"/></td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`settlementBreakdown.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= JUSTIFICATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Justification & Notes</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Business Justification</label>
      <Field
        name="justification"
        className="form-input"
      />
    </div>

  </div>
</div>

            {/* ================= COMPLIANCE & CHECKS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Compliance & Risk Review</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Policy Compliance Confirmed</label>
      <Field
        name="policyComplianceConfirmed"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Supporting Documents Verified</label>
      <Field
        name="supportingDocsVerified"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Risk Level</label>
      <Field
        name="riskLevel"
        className="form-input"
      />
    </div>

    <div className="form-field">
      <label className="form-label">Compliance Remarks</label>
      <Field
        name="complianceRemarks"
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
                    Submit Vendor Advance Settlement
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

export default FRM00890_VendorAdvanceSettlement;
