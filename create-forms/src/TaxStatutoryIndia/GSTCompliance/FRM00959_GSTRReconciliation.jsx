// FRM00959_00960_00961_GSTRReconciliation.jsx
// FRM-00959 / 00960 / 00961 – GSTR Reconciliation
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
  reconciliationPeriodFrom: Yup.date().required("Required"),
  reconciliationPeriodTo: Yup.date().required("Required"),
  booksTurnover: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00959 / 00960 / 00961",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  reconciliationPeriodFrom: "",
  reconciliationPeriodTo: "",
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

  /* Reconciliation Summary */
  booksTurnover: "",
  gstReturnTurnover: "",
  differenceAmount: "",
  differenceReason: "",
  outputTaxBooks: "",
  outputTaxReturn: "",
  inputTaxCreditBooks: "",
  inputTaxCreditReturn: "",
  netTaxDifference: "",

  /* Adjustments */
  adjustmentsIdentified: "",
  adjustmentAmount: "",
  adjustmentNotes: "",

  /* Compliance Status */
  reconciliationStatus: "",
  keyIssues: "",
  actionRequired: "",

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

const FRM00959_GSTRReconciliation = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00959"
      title="GSTR Reconciliation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GSTR Reconciliation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00959 / 00960 / 00961"
              title="GSTR RECONCILIATION"
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
                  <Field name="reconciliationPeriodFrom" type="date" className="form-input"/>
                  <Field name="reconciliationPeriodTo" type="date" className="form-input"/>
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

              {/* ================= RECONCILIATION SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Reconciliation Summary</h3>
                <div className="form-fields">
                  <Field name="booksTurnover" type="number" placeholder="Books Turnover" className="form-input"/>
                  <Field name="gstReturnTurnover" type="number" placeholder="GST Return Turnover" className="form-input"/>
                  <Field name="differenceAmount" type="number" placeholder="Difference Amount" className="form-input"/>
                  <Field name="differenceReason" placeholder="Difference Reason" className="form-input"/>
                  <Field name="outputTaxBooks" type="number" placeholder="Output Tax as per Books" className="form-input"/>
                  <Field name="outputTaxReturn" type="number" placeholder="Output Tax as per Return" className="form-input"/>
                  <Field name="inputTaxCreditBooks" type="number" placeholder="Input Tax Credit as per Books" className="form-input"/>
                  <Field name="inputTaxCreditReturn" type="number" placeholder="Input Tax Credit as per Return" className="form-input"/>
                  <Field name="netTaxDifference" type="number" placeholder="Net Tax Difference" className="form-input"/>
                </div>
              </div>

              {/* ================= ADJUSTMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustments</h3>
                <div className="form-fields">
                  <Field name="adjustmentsIdentified" placeholder="Adjustments Identified" className="form-input"/>
                  <Field name="adjustmentAmount" type="number" placeholder="Adjustment Amount" className="form-input"/>
                  <Field name="adjustmentNotes" placeholder="Adjustment Notes" className="form-input"/>
                </div>
              </div>

              {/* ================= COMPLIANCE STATUS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Status</h3>
                <div className="form-fields">
                  <Field name="reconciliationStatus" placeholder="Reconciliation Status" className="form-input"/>
                  <Field name="keyIssues" placeholder="Key Issues" className="form-input"/>
                  <Field name="actionRequired" placeholder="Action Required" className="form-input"/>
                </div>
              </div>

              {/* ================= ATTACHMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  <Field name="supportingDocumentsAttached" as="select" className="form-input">
                    <option value="">Supporting Documents Attached?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
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
                    Submit GSTR Reconciliation
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

export default FRM00959_GSTRReconciliation;