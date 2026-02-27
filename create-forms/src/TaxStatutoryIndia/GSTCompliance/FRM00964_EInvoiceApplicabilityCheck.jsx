// FRM00964_EInvoiceApplicabilityCheck.jsx
// FRM-00964 – E-Invoice Applicability Check
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
  legalNameOfBusiness: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
  aggregateTurnoverCurrentFY: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00964",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  assessmentPeriodFrom: "",
  assessmentPeriodTo: "",

  /* Business Details */
  legalNameOfBusiness: "",
  tradeName: "",
  gstin: "",
  pan: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Turnover Details */
  aggregateTurnoverPreviousFY: "",
  currency: "",
  aggregateTurnoverCurrentFY: "",
  thresholdLimit: "",

  /* Applicability Assessment */
  eInvoiceApplicable: "",
  applicableFromDate: "",
  reasonBasis: "",
  exemptionCategory: "",

  /* Compliance Status */
  irpRegistrationStatus: "",
  systemReadinessStatus: "",
  keyRisksIssues: "",
  actionRequired: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00964_EInvoiceApplicabilityCheck = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00964"
      title="E-Invoice Applicability Check"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("E-Invoice Applicability Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00964"
              title="E-INVOICE APPLICABILITY CHECK"
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
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="assessmentPeriodFrom" type="date" className="form-input"/>
                  <Field name="assessmentPeriodTo" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= BUSINESS DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Business Details</h3>
                <div className="form-fields">
                  <Field name="legalNameOfBusiness" placeholder="Legal Name of Business" className="form-input"/>
                  <Field name="tradeName" placeholder="Trade Name" className="form-input"/>
                  <Field name="gstin" placeholder="GSTIN" className="form-input"/>
                  <Field name="pan" placeholder="PAN" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" type="email" placeholder="Email" className="form-input"/>
                </div>
              </div>

              {/* ================= TURNOVER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Turnover Details</h3>
                <div className="form-fields">
                  <Field name="aggregateTurnoverPreviousFY" type="number" placeholder="Aggregate Turnover (Previous FY)" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="aggregateTurnoverCurrentFY" type="number" placeholder="Aggregate Turnover (Current FY)" className="form-input"/>
                  <Field name="thresholdLimit" type="number" placeholder="Threshold Limit" className="form-input"/>
                </div>
              </div>

              {/* ================= APPLICABILITY ASSESSMENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Applicability Assessment</h3>
                <div className="form-fields">
                  <Field name="eInvoiceApplicable" as="select" className="form-input">
                    <option value="">E-Invoice Applicable?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="applicableFromDate" type="date" className="form-input"/>
                  <Field name="reasonBasis" placeholder="Reason / Basis" className="form-input"/>
                  <Field name="exemptionCategory" placeholder="Exemption Category (if any)" className="form-input"/>
                </div>
              </div>

              {/* ================= COMPLIANCE STATUS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Status</h3>
                <div className="form-fields">
                  <Field name="irpRegistrationStatus" placeholder="IRP Registration Status" className="form-input"/>
                  <Field name="systemReadinessStatus" placeholder="System Readiness Status" className="form-input"/>
                  <Field name="keyRisksIssues" placeholder="Key Risks / Issues" className="form-input"/>
                  <Field name="actionRequired" placeholder="Action Required" className="form-input"/>
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
                    Submit E-Invoice Applicability Check
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

export default FRM00964_EInvoiceApplicabilityCheck;