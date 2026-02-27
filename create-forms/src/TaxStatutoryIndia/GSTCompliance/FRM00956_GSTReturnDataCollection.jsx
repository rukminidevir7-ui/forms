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
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="returnPeriodFrom" type="date" className="form-input"/>
                  <Field name="returnPeriodTo" type="date" className="form-input"/>
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

              {/* ================= TAX DATA SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Tax Data Summary</h3>
                <div className="form-fields">
                  <Field name="taxableValue" type="number" placeholder="Taxable Value" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="outputTaxLiability" type="number" placeholder="Output Tax Liability" className="form-input"/>
                  <Field name="inputTaxCredit" type="number" placeholder="Input Tax Credit" className="form-input"/>
                  <Field name="netTaxPayable" type="number" placeholder="Net Tax Payable" className="form-input"/>
                  <Field name="interestLateFee" type="number" placeholder="Interest / Late Fee" className="form-input"/>
                </div>
              </div>

              {/* ================= FILING DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Filing Details</h3>
                <div className="form-fields">
                  <Field name="returnFilingDueDate" type="date" className="form-input"/>
                  <Field name="proposedFilingDate" type="date" className="form-input"/>
                  <Field name="filingStatus" placeholder="Filing Status" className="form-input"/>
                  <Field name="preparedByTeam" placeholder="Prepared By Team" className="form-input"/>
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