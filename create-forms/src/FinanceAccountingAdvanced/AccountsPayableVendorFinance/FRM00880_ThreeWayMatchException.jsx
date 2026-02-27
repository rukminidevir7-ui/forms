// FRM00880_ThreeWayMatchException.jsx
// FRM-00880 – Three-Way Match Exception – Request / Initiation
// Enterprise Grade – Accounts Payable Control

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  requestDate: Yup.string().required("Required"),
  requestedBy: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required"),
  poNumber: Yup.string().required("Required"),
  exceptionType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00880",
  version: "1.0",
  effectiveDate: "",
  department: "",
  process: "",

  requestNumber: "",
  requestDate: "",
  requestedBy: "",
  employeeId: "",
  costCenter: "",
  location: "",

  vendorName: "",
  vendorCode: "",
  vendorContact: "",

  invoiceNumber: "",
  invoiceDate: "",
  invoiceAmount: "",
  currency: "",

  poNumber: "",
  poDate: "",
  poAmount: "",

  grnNumber: "",
  grnDate: "",
  receivedQuantity: "",

  exceptionType: "",
  description: "",
  rootCause: "",
  impactAssessment: "",

  impactAmount: "",
  glAccount: "",
  financialCostCenter: "",
  budgetImpact: "",

  complianceCheck: "",
  riskLevel: "",
  complianceRemarks: "",

  proposedAction: "",
  responsiblePerson: "",
  targetDate: "",

  closureDate: "",
  closureRemarks: "",

  createdOn: "",
  lastUpdatedOn: "",
  recordOwner: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00880_ThreeWayMatchException = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00880"
      title="Three-Way Match Exception"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Three-Way Match Exception Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00880"
              title="THREE-WAY MATCH EXCEPTION"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* 1. DOCUMENT CONTROL */}
              <div className="form-section">
                <h3 className="form-section-title">1. Document Control</h3>
                <div className="form-fields">
                  <Field name="version" placeholder="Version" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                  <Field name="department" placeholder="Department" className="form-input"/>
                  <Field name="process" placeholder="Process" className="form-input"/>
                </div>
              </div>

              {/* 2. REQUEST INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">2. Request Information</h3>
                <div className="form-fields">
                  <Field name="requestNumber" placeholder="Request Number" className="form-input"/>
                  <Field name="requestDate" type="date" className="form-input"/>
                  <Field name="requestedBy" placeholder="Requested By" className="form-input"/>
                  <Field name="employeeId" placeholder="Employee ID" className="form-input"/>
                  <Field name="costCenter" placeholder="Department / Cost Center" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* 3. VENDOR DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">3. Vendor Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="vendorCode" placeholder="Vendor Code" className="form-input"/>
                  <Field name="vendorContact" placeholder="Vendor Contact" className="form-input"/>
                </div>
              </div>

              {/* 4. INVOICE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">4. Invoice Details</h3>
                <div className="form-fields">
                  <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
                  <Field name="invoiceDate" type="date" className="form-input"/>
                  <Field name="invoiceAmount" type="number" placeholder="Invoice Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                </div>
              </div>

              {/* 5. PO DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">5. Purchase Order Details</h3>
                <div className="form-fields">
                  <Field name="poNumber" placeholder="PO Number" className="form-input"/>
                  <Field name="poDate" type="date" className="form-input"/>
                  <Field name="poAmount" type="number" placeholder="PO Amount" className="form-input"/>
                </div>
              </div>

              {/* 6. GRN DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">6. Goods Receipt Details</h3>
                <div className="form-fields">
                  <Field name="grnNumber" placeholder="GRN Number" className="form-input"/>
                  <Field name="grnDate" type="date" className="form-input"/>
                  <Field name="receivedQuantity" type="number" placeholder="Received Quantity" className="form-input"/>
                </div>
              </div>

              {/* 7. EXCEPTION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">7. Exception Details</h3>
                <div className="form-fields">
                  <Field name="exceptionType" placeholder="Exception Type" className="form-input"/>
                  <Field name="description" placeholder="Description" className="form-input"/>
                  <Field name="rootCause" placeholder="Root Cause" className="form-input"/>
                  <Field name="impactAssessment" placeholder="Impact Assessment" className="form-input"/>
                </div>
              </div>

              {/* 8. FINANCIAL IMPACT */}
              <div className="form-section">
                <h3 className="form-section-title">8. Financial Impact</h3>
                <div className="form-fields">
                  <Field name="impactAmount" type="number" placeholder="Impact Amount" className="form-input"/>
                  <Field name="glAccount" placeholder="GL Account" className="form-input"/>
                  <Field name="financialCostCenter" placeholder="Cost Center" className="form-input"/>
                  <Field name="budgetImpact" placeholder="Budget Impact" className="form-input"/>
                </div>
              </div>

              {/* 9. SUPPORTING DOCUMENTS */}
              {/* <div className="form-section">
                <h3 className="form-section-title">9. Supporting Documents</h3>
              </div> */}

              {/* ATTACHMENTS COMPONENT */}
              <FormAttachments values={values} />

              {/* 10. RISK & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">10. Risk & Compliance</h3>
                <div className="form-fields">
                  <Field as="select" name="complianceCheck" className="form-input">
                    <option value="">Compliance Check Completed?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field as="select" name="riskLevel" className="form-input">
                    <option value="">Risk Level</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </Field>
                  <Field name="complianceRemarks" placeholder="Remarks" className="form-input"/>
                </div>
              </div>

              {/* 11. RESOLUTION PLAN */}
              <div className="form-section">
                <h3 className="form-section-title">11. Resolution Plan</h3>
                <div className="form-fields">
                  <Field name="proposedAction" placeholder="Proposed Action" className="form-input"/>
                  <Field name="responsiblePerson" placeholder="Responsible Person" className="form-input"/>
                  <Field name="targetDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* 12. APPROVALS */}
              <div className="form-section">
                <h3 className="form-section-title">12. Approvals</h3>
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

              {/* 13. CLOSURE */}
              <div className="form-section">
                <h3 className="form-section-title">13. Closure</h3>
                <div className="form-fields">
                  <Field name="closureDate" type="date" className="form-input"/>
                  <Field name="closureRemarks" placeholder="Closure Remarks" className="form-input"/>
                </div>
              </div>

              {/* 14. AUDIT TRAIL */}
              <div className="form-section">
                <h3 className="form-section-title">14. Audit Trail</h3>
                <div className="form-fields">
                  <Field name="createdOn" type="date" className="form-input"/>
                  <Field name="lastUpdatedOn" type="date" className="form-input"/>
                  <Field name="recordOwner" placeholder="Record Owner" className="form-input"/>
                </div>
              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {/* CUSTOM SIGNATURES */}
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
                    Submit Three-Way Match Exception
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

export default FRM00880_ThreeWayMatchException;
