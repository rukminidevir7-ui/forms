// FRM00879_VendorBankChangeVerification.jsx
// FRM-00879 – Vendor Bank Change Verification – Checklist
// Enterprise Grade – Fraud Prevention & Control

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
  preparedBy: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestId: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  newBankName: Yup.string().required("Required")
});

/* ================= PRELOADED CHECKLIST ================= */

const defaultChecklist = [
  { item: "Vendor Request Letter Received", status: "", remarks: "", dynamicFields:{} },
  { item: "Authorized Signatory Confirmation", status: "", remarks: "", dynamicFields:{} },
  { item: "Cancelled Cheque / Bank Proof", status: "", remarks: "", dynamicFields:{} },
  { item: "Bank Letter / Bank Statement", status: "", remarks: "", dynamicFields:{} },
  { item: "GST / Tax Validation", status: "", remarks: "", dynamicFields:{} },
  { item: "Vendor Master Data Match", status: "", remarks: "", dynamicFields:{} },
  { item: "Duplicate Check Completed", status: "", remarks: "", dynamicFields:{} }
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00879",
  version: "1.0",
  date: "",

  preparedBy: "",
  department: "",
  requestId: "",

  vendorName: "",
  vendorCode: "",
  vendorCategory: "",
  businessUnit: "",
  contactPerson: "",
  contactEmail: "",
  contactPhone: "",

  changeType: "",
  effectiveDate: "",
  reason: "",
  previousBank: "",
  previousAccountMasked: "",
  newBankName: "",
  newAccountMasked: "",
  ifscSwift: "",
  branchName: "",
  country: "",

  checklist: defaultChecklist,

  callbackDone: "",
  verificationDate: "",
  verifiedBy: "",
  callNotes: "",
  emailVerified: "",
  fraudRiskCheck: "",

  riskLevel: "",
  escalationRequired: "",
  redFlags: "",
  riskComments: "",

  erpUpdatedBy: "",
  updateDate: "",
  changeReference: "",
  archivedOldRecord: "",
  notificationSent: "",

  auditLogRef: "",
  docsLocation: "",
  auditRemarks: "",

  initiatedSignature: {},
  financeSignature: {},
  complianceSignature: {},
  finalApprovalSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00879_VendorBankChangeVerification = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN LOGIC ================= */

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
      formId="FRM-00879"
      title="Vendor Bank Change Verification"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Vendor Bank Change Verification Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00879"
              title="VENDOR BANK CHANGE VERIFICATION"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">1. Document Control</h3>
                <div className="form-fields">
                  <Field name="version" placeholder="Version No" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="department" placeholder="Department" className="form-input"/>
                  <Field name="requestId" placeholder="Reference Ticket / Request ID" className="form-input"/>
                </div>
              </div>

              {/* ================= VENDOR DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorCode" placeholder="Vendor Code / ID" className="form-input"/>
                  <Field name="vendorCategory" placeholder="Vendor Category" className="form-input"/>
                  <Field name="businessUnit" placeholder="Business Unit" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="contactEmail" placeholder="Contact Email" className="form-input"/>
                  <Field name="contactPhone" placeholder="Contact Phone" className="form-input"/>
                </div>
              </div>

              {/* ================= BANK CHANGE SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">3. Bank Change Request Summary</h3>
                <div className="form-fields">
                  <Field name="changeType" placeholder="Type of Change" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                  <Field name="reason" placeholder="Reason for Change" className="form-input"/>
                  <Field name="previousBank" placeholder="Previous Bank Name" className="form-input"/>
                  <Field name="previousAccountMasked" placeholder="Previous Account (Masked)" className="form-input"/>
                  <Field name="newBankName" placeholder="New Bank Name" className="form-input"/>
                  <Field name="newAccountMasked" placeholder="New Account (Masked)" className="form-input"/>
                  <Field name="ifscSwift" placeholder="IFSC / SWIFT Code" className="form-input"/>
                  <Field name="branchName" placeholder="Branch Name" className="form-input"/>
                  <Field name="country" placeholder="Country" className="form-input"/>
                </div>
              </div>

              {/* ================= CHECKLIST TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">4. Supporting Documents Verification</h3>

                <FieldArray name="checklist">
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
                            onClick={()=>push({ item:"", status:"", remarks:"", dynamicFields:{} })}
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Item</th>
                            <th>Status (Yes/No)</th>
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
                          {values.checklist.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`checklist.${index}.item`} className="form-input"/></td>
                              <td>
                                <Field as="select" name={`checklist.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </Field>
                              </td>
                              <td><Field name={`checklist.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`checklist.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">7. Approval Workflow</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Initiated By"
                    value={values.initiatedSignature}
                    onChange={(val)=>setFieldValue("initiatedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Verification"
                    value={values.financeSignature}
                    onChange={(val)=>setFieldValue("financeSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Compliance Review"
                    value={values.complianceSignature}
                    onChange={(val)=>setFieldValue("complianceSignature",val)}
                  />
                </div>
                <div style={{marginTop:20}}>
                  <ApprovalSignatureBlock
                    label="Final Approval Authority"
                    value={values.finalApprovalSignature}
                    onChange={(val)=>setFieldValue("finalApprovalSignature",val)}
                  />
                </div>
              </div>

              {/* ================= CUSTOM SIGNATURES ================= */}
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
                    Submit Vendor Bank Change Verification
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

export default FRM00879_VendorBankChangeVerification;
