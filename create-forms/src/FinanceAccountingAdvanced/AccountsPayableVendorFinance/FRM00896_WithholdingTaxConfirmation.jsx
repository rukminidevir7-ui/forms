// FRM00896_WithholdingTaxConfirmation.jsx
// FRM-00896 – Withholding Tax Confirmation – Request / Approval / Report
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
  vendorName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00896",
  version: "1.0",
  date: "",
  referenceNo: "",

  /* Vendor Details */
  vendorName: "",
  vendorCode: "",
  panTaxId: "",
  country: "",
  address: "",
  contactPerson: "",
  contactDetails: "",
  vendorCategory: "",

  /* Compliance */
  lowerNilCertificate: "",
  certificateNumber: "",
  validTill: "",
  taxResidencyStatus: "",
  policyComplianceConfirmed: "",
  supportingDocsVerified: "",
  riskLevel: "",
  complianceRemarks: "",

  /* Notes */
  notes: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  /* Transactions */
  transactions: [
    {
      invoiceReferenceNo: "",
      invoiceDate: "",
      grossAmount: "",
      currency: "",
      natureOfPayment: "",
      sectionCode: "",
      applicableRate: "",
      taxAmount: "",
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

const FRM00896_WithholdingTaxConfirmation = () => {

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
      formId="FRM-00896"
      title="Withholding Tax Confirmation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Withholding Tax Confirmation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00896"
              title="WITHHOLDING TAX CONFIRMATION"
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

              {/* ================= VENDOR DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorCode" placeholder="Vendor Code" className="form-input"/>
                  <Field name="panTaxId" placeholder="PAN / Tax ID" className="form-input"/>
                  <Field name="country" placeholder="Country" className="form-input"/>
                  <Field name="address" placeholder="Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="contactDetails" placeholder="Contact Details" className="form-input"/>
                  <Field name="vendorCategory" placeholder="Vendor Category" className="form-input"/>
                </div>
              </div>

              {/* ================= TRANSACTION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction Details</h3>

                <FieldArray name="transactions">
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
                              invoiceDate:"",
                              grossAmount:"",
                              currency:"",
                              natureOfPayment:"",
                              sectionCode:"",
                              applicableRate:"",
                              taxAmount:"",
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
                            <th>Invoice Date</th>
                            <th>Gross Amount</th>
                            <th>Currency</th>
                            <th>Nature of Payment</th>
                            <th>Section Code</th>
                            <th>Applicable Rate (%)</th>
                            <th>Tax Amount</th>
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
                          {values.transactions.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`transactions.${index}.invoiceReferenceNo`} className="form-input"/></td>
                              <td><Field name={`transactions.${index}.invoiceDate`} type="date" className="form-input"/></td>
                              <td><Field name={`transactions.${index}.grossAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`transactions.${index}.currency`} className="form-input"/></td>
                              <td><Field name={`transactions.${index}.natureOfPayment`} className="form-input"/></td>
                              <td><Field name={`transactions.${index}.sectionCode`} className="form-input"/></td>
                              <td><Field name={`transactions.${index}.applicableRate`} type="number" className="form-input"/></td>
                              <td><Field name={`transactions.${index}.taxAmount`} type="number" className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`transactions.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= COMPLIANCE & VERIFICATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance & Verification</h3>
                <div className="form-fields">
                  <Field name="lowerNilCertificate" placeholder="Lower/Nil Certificate (Y/N)" className="form-input"/>
                  <Field name="certificateNumber" placeholder="Certificate Number" className="form-input"/>
                  <Field name="validTill" type="date" className="form-input"/>
                  <Field name="taxResidencyStatus" placeholder="Tax Residency Status" className="form-input"/>
                  <Field name="policyComplianceConfirmed" placeholder="Policy Compliance Confirmed (Y/N)" className="form-input"/>
                  <Field name="supportingDocsVerified" placeholder="Supporting Documents Verified (Y/N)" className="form-input"/>
                  <Field name="riskLevel" className="form-input"/>
                  <Field name="complianceRemarks" className="form-input"/>
                </div>
              </div>

              {/* ================= NOTES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <Field name="notes" className="form-input"/>
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
                    Submit Withholding Tax Confirmation
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

export default FRM00896_WithholdingTaxConfirmation;
