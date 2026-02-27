// FRM00736_CertificationRequestForm.jsx
// FRM-00736 – Certification Request Form

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
  requestId: Yup.string().required("Required"),
  employeeName: Yup.string().required("Required"),
  certificationName: Yup.string().required("Required"),
  certificationBody: Yup.string().required("Required"),
  validityPeriod: Yup.string().required("Required"),
  reason: Yup.string().required("Required"),
  estimatedCost: Yup.string().required("Required"),
});

const initialValues = {
  requestId: "Auto Generated",
  employeeName: "",
  employeeId: "",
  department: "",
  designation: "",
  certificationName: "",
  certificationBody: "",
  validityPeriod: "",
  reason: "",
  estimatedCost: "",

  supervisorSignature: {},
  hrSignature: {},
  financeSignature: {},

  status: "",
  approvalRemarks: "",

  additionalSignatures: [],
  attachments: [],
  customFields: []
};

const FRM00736_CertificationRequestForm = () => {

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

  return (
    <ModernFormWrapper
      formId="FRM-00736"
      title="Certification Request Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Certification Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00736"
              title="CERTIFICATION REQUEST FORM"
              department="Training & Competency"
              process="Certification Management"
            >

              {/* SECTION 1 – REQUEST DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Request Information</h3>
                <div className="form-fields">
                  {field(values,"requestId","Request ID")}
                  {field(values,"employeeName","Employee Name")}
                  {field(values,"employeeId","Employee ID")}
                  {field(values,"department","Department")}
                  {field(values,"designation","Designation")}
                  {field(values,"certificationName","Certification Name")}
                  {field(values,"certificationBody","Certification Body")}
                  {field(values,"validityPeriod","Validity Period")}
                  {field(values,"estimatedCost","Estimated Cost")}
                </div>

                <Field
                  as="textarea"
                  name="reason"
                  placeholder="Reason for Certification"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* SECTION 2 – APPROVAL SECTION */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Section</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Supervisor Approval"
                      value={values.supervisorSignature}
                      onChange={(val) =>
                        setFieldValue("supervisorSignature", val)
                      }
                    />
                  </div>

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
                      label="Finance Approval"
                      value={values.financeSignature}
                      onChange={(val) =>
                        setFieldValue("financeSignature", val)
                      }
                    />
                  </div>

                </div>

                {field(values,"status","Status (Approved / Rejected / On Hold)")}

                <Field
                  as="textarea"
                  name="approvalRemarks"
                  placeholder="Approval Remarks"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* CUSTOM SIGNATURE SECTION (MANDATORY AS PER YOUR RULE) */}
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

              {/* ATTACHMENTS & CUSTOM FIELDS (MANDATORY AS PER YOUR RULE) */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Certification Request
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

export default FRM00736_CertificationRequestForm;
