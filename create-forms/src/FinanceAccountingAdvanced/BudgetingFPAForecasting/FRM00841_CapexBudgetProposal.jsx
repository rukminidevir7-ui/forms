// FRM00841_CapexBudgetProposal.jsx
// FRM-00841 – Capex Budget Proposal – Request / Initiation
// Enterprise Grade – Strategic Capital Approval Workflow

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
  businessUnit: Yup.string().required("Required"),
  proposalId: Yup.string().required("Required"),
  proposalDate: Yup.string().required("Required"),
  projectName: Yup.string().required("Required"),
  projectLocation: Yup.string().required("Required"),
  capexCategory: Yup.string().required("Required"),
  budgetPeriod: Yup.string().required("Required"),
  capitalCost: Yup.number().typeError("Must be number").required("Required"),
  usefulLife: Yup.number().typeError("Must be number").required("Required"),
  fundingSource: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  businessUnit: "",
  proposalId: "",
  proposalDate: "",
  projectName: "",
  projectLocation: "",
  capexCategory: "",
  budgetPeriod: "",

  capitalCost: "",
  usefulLife: "",

  expectedBenefits: "",
  strategicJustification: "",
  financialEvaluation: "",
  risksMitigation: "",
  implementationTimeline: "",
  fundingSource: "",

  preparedSignature: {},
  reviewedSignature: {},
  financeApprovalSignature: {},
  executiveApprovalSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00841_CapexBudgetProposal = () => {

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
      formId="FRM-00841"
      title="Capex Budget Proposal"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Capex Budget Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00841"
              title="CAPEX BUDGET PROPOSAL"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= MAIN SECTION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Proposal Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"businessUnit","Business Unit / Department")}
                  {renderField(values,"proposalId","Proposal ID")}
                  {renderField(values,"proposalDate","Proposal Date","date")}
                  {renderField(values,"projectName","Project / Asset Name")}
                  {renderField(values,"projectLocation","Project Location")}
                  {renderField(values,"capexCategory","Capex Category")}
                  {renderField(values,"budgetPeriod","Budget Year / Period")}

                  <Field
                    name="capitalCost"
                    type="number"
                    className="form-input"
                    placeholder="Estimated Capital Cost"
                  />
                  <ErrorMessage name="capitalCost" component="div" className="form-error"/>

                  <Field
                    name="usefulLife"
                    type="number"
                    className="form-input"
                    placeholder="Expected Useful Life (Years)"
                  />
                  <ErrorMessage name="usefulLife" component="div" className="form-error"/>

                  {renderField(values,"expectedBenefits","Expected Benefits / Savings")}
                  {renderField(values,"strategicJustification","Strategic Justification")}
                  {renderField(values,"financialEvaluation","Financial Evaluation (NPV / IRR / Payback)")}
                  {renderField(values,"risksMitigation","Risks & Mitigation")}
                  {renderField(values,"implementationTimeline","Implementation Timeline")}
                  {renderField(values,"fundingSource","Funding Source")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values} />

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values} />

              {/* ================= SIGNATURE WORKFLOW ================= */}
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
                    label="Finance Approval"
                    value={values.financeApprovalSignature}
                    onChange={(val)=>setFieldValue("financeApprovalSignature",val)}
                  />
                </div>

                <div className="three-column-signatures" style={{ marginTop:20 }}>
                  <ApprovalSignatureBlock
                    label="Executive Approval"
                    value={values.executiveApprovalSignature}
                    onChange={(val)=>setFieldValue("executiveApprovalSignature",val)}
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
                    Submit Capex Proposal
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

export default FRM00841_CapexBudgetProposal;
