// FRM00887_CreditNoteReceipt.jsx
// FRM-00887 – Credit Note Receipt – Request / Approval / Report
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
  creditNoteNumber: Yup.string().required("Required"),
  totalAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00887",
  version: "1.0",
  date: "",
  referenceNo: "",

  vendorName: "",
  vendorCode: "",
  contactPerson: "",
  contactDetails: "",

  creditNoteNumber: "",
  creditNoteDate: "",
  currency: "",
  totalAmount: "",

  originalInvoiceNumber: "",
  invoiceDate: "",
  poNumber: "",
  grnNumber: "",

  originalInvoiceAmount: "",
  creditAmount: "",
  taxAmount: "",
  netAdjustment: "",

  reasonCategory: "",
  description: "",
  businessJustification: "",

  glAccount: "",
  costCenter: "",
  businessUnit: "",
  impactAmount: "",

  policyCheckCompleted: "",
  riskLevel: "",
  complianceRemarks: "",

  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  adjustmentBreakdown: [
    {
      adjustmentType: "",
      description: "",
      amount: "",
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

const FRM00887_CreditNoteReceipt = () => {

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
    <ModernFormWrapper formId="FRM-00887" title="Credit Note Receipt">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Credit Note Receipt Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00887"
              title="CREDIT NOTE RECEIPT"
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
{/* ================= CREDIT NOTE DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Credit Note Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Credit Note Number</label>
      <Field name="creditNoteNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Credit Note Date</label>
      <Field name="creditNoteDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Total Credit Note Amount</label>
      <Field name="totalAmount" type="number" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= REFERENCE TRANSACTION DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Reference Transaction Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Original Invoice Number</label>
      <Field name="originalInvoiceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Date</label>
      <Field name="invoiceDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">PO Number</label>
      <Field name="poNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">GRN Number</label>
      <Field name="grnNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Original Invoice Amount</label>
      <Field name="originalInvoiceAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Credit Amount</label>
      <Field name="creditAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Tax Amount</label>
      <Field name="taxAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Net Adjustment</label>
      <Field name="netAdjustment" type="number" className="form-input"/>
    </div>

  </div>
</div>

              {/* ================= ADJUSTMENT BREAKDOWN ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustment Breakdown</h3>

                <FieldArray name="adjustmentBreakdown">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                          <button type="button" className="btn-submit"
                            onClick={()=>push({adjustmentType:"",description:"",amount:"",dynamicFields:{}})}>
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Adjustment Type</th>
                            <th>Description</th>
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
                          {values.adjustmentBreakdown.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`adjustmentBreakdown.${index}.adjustmentType`} className="form-input"/></td>
                              <td><Field name={`adjustmentBreakdown.${index}.description`} className="form-input"/></td>
                              <td><Field name={`adjustmentBreakdown.${index}.amount`} type="number" className="form-input"/></td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`adjustmentBreakdown.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

             {/* ================= REASON & BUSINESS JUSTIFICATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Reason & Business Justification</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Reason Category</label>
      <Field name="reasonCategory" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Description of Adjustment</label>
      <Field name="description" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Business Justification</label>
      <Field name="businessJustification" className="form-input"/>
    </div>

  </div>
</div>

             {/* ================= COMPLIANCE & RISK ================= */}
<div className="form-section">
  <h3 className="form-section-title">Compliance & Risk Review</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Policy Check Completed</label>
      <Field name="policyCheckCompleted" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Risk Level</label>
      <Field name="riskLevel" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Compliance Remarks</label>
      <Field name="complianceRemarks" className="form-input"/>
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
                    Submit Credit Note
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

export default FRM00887_CreditNoteReceipt;
