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

    <div className="form-field">
      <label className="form-label">Version Number</label>
      <Field name="version" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Effective Date</label>
      <Field name="effectiveDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Department</label>
      <Field name="department" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Process</label>
      <Field name="process" className="form-input"/>
    </div>

  </div>
</div>

             {/* 2. REQUEST INFORMATION */}
<div className="form-section">
  <h3 className="form-section-title">2. Request Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Request Number</label>
      <Field name="requestNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Request Date</label>
      <Field name="requestDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Requested By</label>
      <Field name="requestedBy" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Employee ID</label>
      <Field name="employeeId" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Department / Cost Center</label>
      <Field name="costCenter" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location</label>
      <Field name="location" className="form-input"/>
    </div>

  </div>
</div>
{/* 3. VENDOR DETAILS */}
<div className="form-section">
  <h3 className="form-section-title">3. Vendor Details</h3>
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
      <label className="form-label">Vendor Contact</label>
      <Field name="vendorContact" className="form-input"/>
    </div>

  </div>
</div>

            {/* 4. INVOICE DETAILS */}
<div className="form-section">
  <h3 className="form-section-title">4. Invoice Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Invoice Number</label>
      <Field name="invoiceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Date</label>
      <Field name="invoiceDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Amount</label>
      <Field name="invoiceAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

  </div>
</div>

             {/* 5. PURCHASE ORDER DETAILS */}
<div className="form-section">
  <h3 className="form-section-title">5. Purchase Order Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">PO Number</label>
      <Field name="poNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">PO Date</label>
      <Field name="poDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">PO Amount</label>
      <Field name="poAmount" type="number" className="form-input"/>
    </div>

  </div>
</div>
{/* 6. GOODS RECEIPT DETAILS */}
<div className="form-section">
  <h3 className="form-section-title">6. Goods Receipt Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">GRN Number</label>
      <Field name="grnNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">GRN Date</label>
      <Field name="grnDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Received Quantity</label>
      <Field name="receivedQuantity" type="number" className="form-input"/>
    </div>

  </div>
</div>
            {/* 7. EXCEPTION DETAILS */}
<div className="form-section">
  <h3 className="form-section-title">7. Exception Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Exception Type</label>
      <Field name="exceptionType" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Description of Exception</label>
      <Field name="description" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Root Cause Analysis</label>
      <Field name="rootCause" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Operational / Financial Impact Assessment</label>
      <Field name="impactAssessment" className="form-input"/>
    </div>

  </div>
</div>

              {/* 8. FINANCIAL IMPACT */}
<div className="form-section">
  <h3 className="form-section-title">8. Financial Impact</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Impact Amount</label>
      <Field name="impactAmount" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">GL Account</label>
      <Field name="glAccount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Financial Cost Center</label>
      <Field name="financialCostCenter" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Budget Impact</label>
      <Field name="budgetImpact" className="form-input"/>
    </div>

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
