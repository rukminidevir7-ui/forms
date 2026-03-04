// FRM00965_EInvoiceExceptionLog.jsx
// FRM-00965 – E-Invoice Exception Log
// Enterprise Grade – Tax & Statutory (India) – GST Compliance

import React from "react";
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
  exceptionId: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required"),
  gstin: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00965",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",

  /* Exception Details */
  exceptionId: "",
  exceptionDate: "",
  invoiceNumber: "",
  customerName: "",
  gstin: "",
  errorCode: "",
  errorDescription: "",

  /* Financial Impact */
  invoiceAmount: "",
  currency: "",
  taxAmount: "",
  impactAmount: "",

  /* Resolution Tracking */
  status: "",
  priority: "",
  assignedTo: "",
  targetResolutionDate: "",
  resolutionNotes: "",
  actualResolutionDate: "",

  /* Notes */
  notes: "",
  comments: "",
  supportingReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Logged By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00965_EInvoiceExceptionLog = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00965"
      title="E-Invoice Exception Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("E-Invoice Exception Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00965"
              title="E-INVOICE EXCEPTION LOG"
              department="Tax & Statutory (India) – GST Compliance"
            >

           {/* ================= GENERAL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">General Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Form ID</label>
      <Field name="formId" disabled className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Department</label>
      <Field name="department" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Function</label>
      <Field name="function" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location</label>
      <Field name="location" placeholder="Location" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= EXCEPTION DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Exception Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Exception ID</label>
      <Field name="exceptionId" placeholder="Exception ID" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Exception Date</label>
      <Field name="exceptionDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Invoice Number</label>
      <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Customer Name</label>
      <Field name="customerName" placeholder="Customer Name" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">GSTIN</label>
      <Field name="gstin" placeholder="GSTIN" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Error Code</label>
      <Field name="errorCode" placeholder="Error Code" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Error Description</label>
      <Field name="errorDescription" placeholder="Error Description" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= FINANCIAL IMPACT ================= */}
<div className="form-section">
  <h3 className="form-section-title">Financial Impact</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Invoice Amount</label>
      <Field name="invoiceAmount" type="number" placeholder="Invoice Amount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" placeholder="Currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Tax Amount</label>
      <Field name="taxAmount" type="number" placeholder="Tax Amount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Impact Amount</label>
      <Field name="impactAmount" type="number" placeholder="Impact Amount" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= RESOLUTION TRACKING ================= */}
<div className="form-section">
  <h3 className="form-section-title">Resolution Tracking</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Status</label>
      <Field name="status" placeholder="Status" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Priority</label>
      <Field name="priority" placeholder="Priority" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Assigned To</label>
      <Field name="assignedTo" placeholder="Assigned To" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Target Resolution Date</label>
      <Field name="targetResolutionDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Resolution Notes</label>
      <Field name="resolutionNotes" placeholder="Resolution Notes" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Actual Resolution Date</label>
      <Field name="actualResolutionDate" type="date" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= NOTES ================= */}
<div className="form-section">
  <h3 className="form-section-title">Notes</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Notes</label>
      <Field name="notes" placeholder="Notes" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Comments</label>
      <Field name="comments" placeholder="Comments" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Supporting Reference</label>
      <Field name="supportingReference" placeholder="Supporting Reference" className="form-input"/>
    </div>

  </div>
</div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role, index) => (
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(newName)=>
                                setFieldValue(`approvalRoles.${index}.roleName`, newName)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`, val)
                              }
                            />

                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit E-Invoice Exception Log
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

export default FRM00965_EInvoiceExceptionLog;