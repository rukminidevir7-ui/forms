// FRM00954_GSTRegistrationChecklist.jsx
// FRM-00954 – GST Registration Checklist
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
  applicantName: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  legalNameOfBusiness: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00954",
  version: "1.0",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  applicantName: "",
  businessEntityType: "",

  /* Business Details */
  legalNameOfBusiness: "",
  tradeName: "",
  pan: "",
  constitutionOfBusiness: "",
  dateOfCommencement: "",

  /* Address Details */
  principalPlaceOfBusinessAddress: "",
  state: "",
  district: "",
  pinCode: "",
  contactNumber: "",
  email: "",

  /* Document Checklist */
  panCardCopy: "",
  aadhaarCardCopy: "",
  addressProof: "",
  bankAccountProof: "",
  photograph: "",
  authorizationLetter: "",
  incorporationCertificate: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Checked By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00954_GSTRegistrationChecklist = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00954"
      title="GST Registration Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST Registration Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00954"
              title="GST REGISTRATION CHECKLIST"
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
                  <Field name="applicantName" placeholder="Applicant Name" className="form-input"/>
                  <Field name="businessEntityType" placeholder="Business Entity Type" className="form-input"/>
                </div>
              </div>

              {/* ================= BUSINESS DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Business Details</h3>
                <div className="form-fields">
                  <Field name="legalNameOfBusiness" placeholder="Legal Name of Business" className="form-input"/>
                  <Field name="tradeName" placeholder="Trade Name" className="form-input"/>
                  <Field name="pan" placeholder="PAN" className="form-input"/>
                  <Field name="constitutionOfBusiness" placeholder="Constitution of Business" className="form-input"/>
                  <Field name="dateOfCommencement" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= ADDRESS DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Address Details</h3>
                <div className="form-fields">
                  <Field name="principalPlaceOfBusinessAddress" placeholder="Principal Place of Business Address" className="form-input"/>
                  <Field name="state" placeholder="State" className="form-input"/>
                  <Field name="district" placeholder="District" className="form-input"/>
                  <Field name="pinCode" placeholder="PIN Code" className="form-input"/>
                  <Field name="contactNumber" placeholder="Contact Number" className="form-input"/>
                  <Field name="email" type="email" placeholder="Email" className="form-input"/>
                </div>
              </div>

              {/* ================= DOCUMENT CHECKLIST ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Checklist</h3>
                <div className="form-fields">
                  <Field name="panCardCopy" as="select" className="form-input">
                    <option value="">PAN Card Copy</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="aadhaarCardCopy" as="select" className="form-input">
                    <option value="">Aadhaar Card Copy</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="addressProof" as="select" className="form-input">
                    <option value="">Address Proof</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="bankAccountProof" as="select" className="form-input">
                    <option value="">Bank Account Proof</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="photograph" as="select" className="form-input">
                    <option value="">Photograph</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="authorizationLetter" as="select" className="form-input">
                    <option value="">Authorization Letter</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="incorporationCertificate" as="select" className="form-input">
                    <option value="">Incorporation Certificate</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* ================= VERIFICATION / AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>

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
                                setFieldValue(`approvalRoles.${index}.roleName`,newName)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
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
                    Submit GST Registration Checklist
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

export default FRM00954_GSTRegistrationChecklist;