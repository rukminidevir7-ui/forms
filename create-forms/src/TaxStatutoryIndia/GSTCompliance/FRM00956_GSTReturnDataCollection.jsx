// FRM00956_00957_00958_GSTReturnDataCollection.jsx
// FRM-00956 / 00957 / 00958 – GST Return Data Collection
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
  returnPeriodFrom: Yup.date().required("Required"),
  returnPeriodTo: Yup.date().required("Required"),
  taxableValue: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00956 / 00957 / 00958",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  returnPeriodFrom: "",
  returnPeriodTo: "",
  referenceNumber: "",
  location: "",
  gstin: "",
  returnType: "",

  /* Business Details */
  legalNameOfBusiness: "",
  tradeName: "",
  pan: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Tax Data Summary */
  taxableValue: "",
  currency: "",
  outputTaxLiability: "",
  inputTaxCredit: "",
  netTaxPayable: "",
  interestLateFee: "",

  /* Filing Details */
  returnFilingDueDate: "",
  proposedFilingDate: "",
  filingStatus: "",
  preparedByTeam: "",

  /* Notes */
  keyNotes: "",
  issuesObservations: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00956_GSTReturnDataCollection = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00956"
      title="GST Return Data Collection"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST Return Data Collection Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00956 / 00957 / 00958"
              title="GST RETURN DATA COLLECTION"
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
      <label className="form-label">Return Period From</label>
      <Field name="returnPeriodFrom" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Return Period To</label>
      <Field name="returnPeriodTo" type="date" className="form-input"/>
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
      <label className="form-label">Return Type</label>
      <Field name="returnType" placeholder="Return Type" className="form-input"/>
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


{/* ================= TAX DATA SUMMARY ================= */}
<div className="form-section">
  <h3 className="form-section-title">Tax Data Summary</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Taxable Value</label>
      <Field name="taxableValue" type="number" placeholder="Taxable Value" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" placeholder="Currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Output Tax Liability</label>
      <Field name="outputTaxLiability" type="number" placeholder="Output Tax Liability" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Input Tax Credit</label>
      <Field name="inputTaxCredit" type="number" placeholder="Input Tax Credit" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Net Tax Payable</label>
      <Field name="netTaxPayable" type="number" placeholder="Net Tax Payable" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Interest / Late Fee</label>
      <Field name="interestLateFee" type="number" placeholder="Interest / Late Fee" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= FILING DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Filing Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Return Filing Due Date</label>
      <Field name="returnFilingDueDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Proposed Filing Date</label>
      <Field name="proposedFilingDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Filing Status</label>
      <Field name="filingStatus" placeholder="Filing Status" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Prepared By Team</label>
      <Field name="preparedByTeam" placeholder="Prepared By Team" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= NOTES ================= */}
<div className="form-section">
  <h3 className="form-section-title">Notes</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Key Notes</label>
      <Field name="keyNotes" placeholder="Key Notes" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Issues / Observations</label>
      <Field name="issuesObservations" placeholder="Issues / Observations" className="form-input"/>
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
                    Submit GST Return Data Collection
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

export default FRM00956_GSTReturnDataCollection;