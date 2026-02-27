// FRM00963_ITCReversalWorking.jsx
// FRM-00963 – ITC Reversal Working
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
  reversalPeriodFrom: Yup.date().required("Required"),
  reversalPeriodTo: Yup.date().required("Required"),
  totalITCAvailed: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00963",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  reversalPeriodFrom: "",
  reversalPeriodTo: "",
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

  /* Reversal Summary */
  totalITCAvailed: "",
  currency: "",
  ineligibleITCIdentified: "",
  itcReversed: "",
  netITCAfterReversal: "",

  /* Reversal Details */
  reasonForReversal: "",
  applicableRuleSection: "",
  reversalCalculationMethod: "",
  adjustmentEntryReference: "",

  /* Reconciliation */
  booksITC: "",
  returnITCAfterReversal: "",
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

const FRM00963_ITCReversalWorking = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00963"
      title="ITC Reversal Working"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ITC Reversal Working Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00963"
              title="ITC REVERSAL WORKING"
              department="Tax & Statutory (India) – GST Compliance"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="reversalPeriodFrom" type="date" className="form-input"/>
                  <Field name="reversalPeriodTo" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="gstin" placeholder="GSTIN" className="form-input"/>
                  <Field name="returnType" placeholder="Return Type" className="form-input"/>
                </div>
              </div>

              {/* ================= BUSINESS DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Business Details</h3>
                <div className="form-fields">
                  <Field name="legalNameOfBusiness" placeholder="Legal Name of Business" className="form-input"/>
                  <Field name="tradeName" placeholder="Trade Name" className="form-input"/>
                  <Field name="pan" placeholder="PAN" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" type="email" placeholder="Email" className="form-input"/>
                </div>
              </div>

              {/* ================= REVERSAL SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Reversal Summary</h3>
                <div className="form-fields">
                  <Field name="totalITCAvailed" type="number" placeholder="Total ITC Availed" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="ineligibleITCIdentified" type="number" placeholder="Ineligible ITC Identified" className="form-input"/>
                  <Field name="itcReversed" type="number" placeholder="ITC Reversed" className="form-input"/>
                  <Field name="netITCAfterReversal" type="number" placeholder="Net ITC After Reversal" className="form-input"/>
                </div>
              </div>

              {/* ================= REVERSAL DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Reversal Details</h3>
                <div className="form-fields">
                  <Field name="reasonForReversal" placeholder="Reason for Reversal" className="form-input"/>
                  <Field name="applicableRuleSection" placeholder="Applicable Rule / Section" className="form-input"/>
                  <Field name="reversalCalculationMethod" placeholder="Reversal Calculation Method" className="form-input"/>
                  <Field name="adjustmentEntryReference" placeholder="Adjustment Entry Reference" className="form-input"/>
                </div>
              </div>

              {/* ================= RECONCILIATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Reconciliation</h3>
                <div className="form-fields">
                  <Field name="booksITC" type="number" placeholder="Books ITC" className="form-input"/>
                  <Field name="returnITCAfterReversal" type="number" placeholder="Return ITC After Reversal" className="form-input"/>
                  <Field name="differenceAmount" type="number" placeholder="Difference Amount" className="form-input"/>
                  <Field name="differenceReason" placeholder="Difference Reason" className="form-input"/>
                </div>
              </div>

              {/* ================= NOTES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  <Field name="keyNotes" placeholder="Key Notes" className="form-input"/>
                  <Field name="issuesObservations" placeholder="Issues / Observations" className="form-input"/>
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
                    Submit ITC Reversal Working
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

export default FRM00963_ITCReversalWorking;