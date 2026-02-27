// FRM00836_AnnualBudgetCallLetter.jsx
// FRM-00836 – Annual Budget Call Letter – Report / Record
// Enterprise Grade – Structured Budget Communication Form

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  companyName: Yup.string().required("Required"),
  financeDepartment: Yup.string().required("Required"),
  referenceId: Yup.string().required("Required"),
  issueDate: Yup.string().required("Required"),
  budgetYear: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  submissionDeadline: Yup.string().required("Required"),
  contactPerson: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  financeDepartment: "",
  referenceId: "",
  issueDate: "",
  budgetYear: "",
  businessUnit: "",
  submissionDeadline: "",

  budgetGuidelines: "",
  keyAssumptions: "",
  scopeOfSubmission: "",
  requiredTemplates: "",
  contactPerson: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00836_AnnualBudgetCallLetter = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type="text") => (
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
      formId="FRM-00836"
      title="Annual Budget Call Letter"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Annual Budget Call Letter Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00836"
              title="ANNUAL BUDGET CALL LETTER"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Budget Communication Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"financeDepartment","Finance Department")}
                  {renderField(values,"referenceId","Reference ID")}
                  {renderField(values,"issueDate","Issue Date","date")}
                  {renderField(values,"budgetYear","Budget Year")}
                  {renderField(values,"businessUnit","Business Unit / Department")}
                  {renderField(values,"submissionDeadline","Submission Deadline","date")}

                  {renderField(values,"budgetGuidelines","Budget Guidelines Summary")}
                  {renderField(values,"keyAssumptions","Key Assumptions")}
                  {renderField(values,"scopeOfSubmission","Scope of Budget Submission")}
                  {renderField(values,"requiredTemplates","Required Templates / Formats")}
                  {renderField(values,"contactPerson","Contact Person")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values} />

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values} />

              {/* ================= SIGNATURES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val)=>setFieldValue("approvedSignature",val)}
                  />
                </div>

                {/* ================= CUSTOM SIGNATURES ================= */}
                <FieldArray name="additionalSignatures">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginTop:20 }}
                          onClick={()=>push({data:{}})}
                        >
                          + Add Custom Signature
                        </button>
                      )}

                      {values.additionalSignatures.map((sig,index)=>(
                        <div key={index} style={{ marginTop:10 }}>
                          <ApprovalSignatureBlock
                            label={`Custom Signature ${index+1}`}
                            value={sig.data || {}}
                            onChange={(val)=>
                              setFieldValue(`additionalSignatures.${index}.data`,val)
                            }
                          />
                          {!isPrintMode && (
                            <button type="button" onClick={()=>remove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>

              </div>

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Budget Call Letter
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

export default FRM00836_AnnualBudgetCallLetter;
