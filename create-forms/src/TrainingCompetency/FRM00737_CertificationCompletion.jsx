// FRM00737_CertificationCompletionRecord.jsx
// FRM-00737/38/39 – Certification Completion Master Form

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

const validationSchema = Yup.object({
  certificationName: Yup.string().required("Required"),
  certificateNumber: Yup.string().required("Required"),
  issuingAuthority: Yup.string().required("Required"),
  issueDate: Yup.string().required("Required"),
  expiryDate: Yup.string().required("Required"),
});

const initialValues = {
  certificationName: "",
  certificateNumber: "",
  issuingAuthority: "",
  issueDate: "",
  expiryDate: "",

  certificateAttached: "",
  verifiedBy: "",
  erpUpdated: "",

  hrSignature: {},
  complianceSignature: {},

  documentControlNo: "",

  additionalSignatures: [],
  attachments: [],
  customFields: []
};

const FRM00737_CertificationCompletionRecord = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const selectField = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name]}</div>
      ) : (
        <Field as="select" name={name} className="form-input">
          <option value="">Select</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </Field>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00737/38/39"
      title="Certification Completion Master Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Certification Completion Record Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00737/38/39"
              title="CERTIFICATION COMPLETION RECORD"
              department="Training & Competency"
              process="Certification Management"
            >

              {/* SECTION 1 – CERTIFICATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Section 1: Certification Details</h3>
                <div className="form-fields">
                  {field(values,"certificationName","Certification Name")}
                  {field(values,"certificateNumber","Certificate Number")}
                  {field(values,"issuingAuthority","Issuing Authority")}
                  {field(values,"issueDate","Issue Date","date")}
                  {field(values,"expiryDate","Expiry Date","date")}
                </div>
              </div>

              {/* SECTION 2 – VERIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Section 2: Verification</h3>
                <div className="form-fields">
                  {selectField(values,"certificateAttached","Certificate Attached (Yes/No)",["Yes","No"])}
                  {field(values,"verifiedBy","Verified By")}
                  {selectField(values,"erpUpdated","ERP Updated (Yes/No)",["Yes","No"])}
                </div>
              </div>

              {/* SECTION 3 – APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">Section 3: Approval</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR Approval"
                      value={values.hrSignature}
                      onChange={(val) =>
                        setFieldValue("hrSignature", val)
                      }
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Compliance Approval"
                      value={values.complianceSignature}
                      onChange={(val) =>
                        setFieldValue("complianceSignature", val)
                      }
                    />
                  </div>

                </div>

                <div className="form-fields" style={{ marginTop: 20 }}>
                  {field(values,"documentControlNo","Document Control No")}
                </div>
              </div>

              {/* CUSTOM SIGNATURE SECTION (MANDATORY RULE) */}
              <div className="form-section">
                <h3 className="form-section-title">Additional Signatures</h3>

                <FieldArray name="additionalSignatures">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() => push({ data: {} })}
                        >
                          + Add Custom Signature
                        </button>
                      )}

                      {values.additionalSignatures.map((sig, index) => (
                        <div key={index} style={{ marginBottom: 25 }}>
                          <ApprovalSignatureBlock
                            label={`Custom Signature ${index + 1}`}
                            value={sig.data || {}}
                            onChange={(val) =>
                              setFieldValue(
                                `additionalSignatures.${index}.data`,
                                val
                              )
                            }
                          />

                          {!isPrintMode && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS (MANDATORY RULE) */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Certification Completion Record
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

export default FRM00737_CertificationCompletionRecord;
