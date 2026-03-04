// FRM00962_InputTaxCreditClaimWorking.jsx
// FRM-00962 – Input Tax Credit (ITC) Claim Working
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
  claimPeriodFrom: Yup.date().required("Required"),
  claimPeriodTo: Yup.date().required("Required"),
  eligibleITC: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00962",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  claimPeriodFrom: "",
  claimPeriodTo: "",
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

  /* ITC Summary */
  eligibleITC: "",
  currency: "",
  ineligibleITC: "",
  blockedCredit: "",
  itcClaimed: "",
  itcReversed: "",
  netITCAvailable: "",

  /* Reconciliation */
  booksITC: "",
  returnITC: "",
  differenceAmount: "",
  differenceReason: "",

  /* Notes */
  keyNotes: "",
  issuesObservations: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00962_InputTaxCreditClaimWorking = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00962"
      title="Input Tax Credit (ITC) Claim Working"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ITC Claim Working Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00962"
              title="INPUT TAX CREDIT (ITC) CLAIM WORKING"
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
      <label className="form-label">Claim Period From</label>
      <Field name="claimPeriodFrom" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Claim Period To</label>
      <Field name="claimPeriodTo" type="date" className="form-input"/>
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


{/* ================= ITC SUMMARY ================= */}
<div className="form-section">
  <h3 className="form-section-title">ITC Summary</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Eligible ITC</label>
      <Field name="eligibleITC" type="number" placeholder="Eligible ITC" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" placeholder="Currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Ineligible ITC</label>
      <Field name="ineligibleITC" type="number" placeholder="Ineligible ITC" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Blocked Credit</label>
      <Field name="blockedCredit" type="number" placeholder="Blocked Credit" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">ITC Claimed</label>
      <Field name="itcClaimed" type="number" placeholder="ITC Claimed" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">ITC Reversed</label>
      <Field name="itcReversed" type="number" placeholder="ITC Reversed" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Net ITC Available</label>
      <Field name="netITCAvailable" type="number" placeholder="Net ITC Available" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= RECONCILIATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">Reconciliation</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Books ITC</label>
      <Field name="booksITC" type="number" placeholder="Books ITC" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Return ITC</label>
      <Field name="returnITC" type="number" placeholder="Return ITC" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Difference Amount</label>
      <Field name="differenceAmount" type="number" placeholder="Difference Amount" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Difference Reason</label>
      <Field name="differenceReason" placeholder="Difference Reason" className="form-input"/>
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
                    Submit ITC Claim Working
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

export default FRM00962_InputTaxCreditClaimWorking;