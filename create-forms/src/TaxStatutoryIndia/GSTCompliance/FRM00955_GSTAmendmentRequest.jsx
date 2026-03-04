// FRM00955_GSTAmendmentRequest.jsx
// FRM-00955 – GST Amendment Request (Request / Initiation)
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
  gstin: Yup.string().required("Required"),
  amendmentType: Yup.string().required("Required"),
  fieldToBeAmended: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00955",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  gstin: "",
  amendmentType: "",

  /* Business Details */
  legalNameOfBusiness: "",
  tradeName: "",
  pan: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Amendment Details */
  fieldToBeAmended: "",
  effectiveDate: "",
  currentDetails: "",
  proposedDetails: "",
  reasonForAmendment: "",

  /* Supporting Information */
  impactAssessment: "",
  remarks: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00955_GSTAmendmentRequest = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00955"
      title="GST Amendment Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST Amendment Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00955"
              title="GST AMENDMENT REQUEST"
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

    <div className="form-field">
      <label className="form-label">GSTIN</label>
      <Field name="gstin" placeholder="GSTIN" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Amendment Type</label>
      <Field name="amendmentType" placeholder="Amendment Type" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= BUSINESS DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Business Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Legal Name of Business</label>
      <Field name="legalNameOfBusiness" placeholder="Legal Name of Business" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Trade Name</label>
      <Field name="tradeName" placeholder="Trade Name" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">PAN</label>
      <Field name="pan" placeholder="PAN" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Phone</label>
      <Field name="phone" placeholder="Phone" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Email</label>
      <Field name="email" type="email" placeholder="Email" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= AMENDMENT DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Amendment Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Field to be Amended</label>
      <Field name="fieldToBeAmended" placeholder="Field to be Amended" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Effective Date</label>
      <Field name="effectiveDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Current Details</label>
      <Field name="currentDetails" placeholder="Current Details" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Proposed Details</label>
      <Field name="proposedDetails" placeholder="Proposed Details" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reason for Amendment</label>
      <Field name="reasonForAmendment" placeholder="Reason for Amendment" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= SUPPORTING INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Supporting Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Impact Assessment</label>
      <Field name="impactAssessment" placeholder="Impact Assessment" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Remarks</label>
      <Field name="remarks" placeholder="Remarks" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= ATTACHMENTS ================= */}
<div className="form-section">
              <FormAttachments values={values}/>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Supporting Documents Attached?</label>
      <Field name="supportingDocumentsAttached" as="select" className="form-input">
        <option value="">Supporting Documents Attached?</option>
        <option>Yes</option>
        <option>No</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Document Reference</label>
      <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
    </div>

  </div>
</div>
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
                    Submit GST Amendment Request
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

export default FRM00955_GSTAmendmentRequest;