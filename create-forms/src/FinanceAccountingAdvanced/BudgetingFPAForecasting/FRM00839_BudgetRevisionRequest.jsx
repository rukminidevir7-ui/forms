// FRM00839_BudgetRevisionRequest.jsx
// FRM-00839 – Budget Revision Request – Request / Initiation
// Enterprise Grade – Auto Variance Calculation + Multi-Level Approval

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
  department: Yup.string().required("Required"),
  requestId: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  budgetPeriod: Yup.string().required("Required"),
  costCenter: Yup.string().required("Required"),
  currentBudget: Yup.number().typeError("Must be number").required("Required"),
  proposedBudget: Yup.number().typeError("Must be number").required("Required"),
  reason: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  requestId: "",
  requestDate: "",
  budgetPeriod: "",
  costCenter: "",

  currentBudget: "",
  proposedBudget: "",
  varianceAmount: "",

  reason: "",
  impactAssessment: "",
  fundingSource: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00839_BudgetRevisionRequest = () => {

  const { isPrintMode } = usePrintMode();

  const calculateVariance = (current, proposed) => {
    const c = parseFloat(current) || 0;
    const p = parseFloat(proposed) || 0;
    return (p - c).toFixed(2);
  };

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
      formId="FRM-00839"
      title="Budget Revision Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Budget Revision Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00839"
              title="BUDGET REVISION REQUEST"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Revision Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department / Business Unit")}
                  {renderField(values,"requestId","Request ID")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"budgetPeriod","Budget Year / Period")}
                  {renderField(values,"costCenter","Cost Center / Account")}

                  <Field
                    name="currentBudget"
                    type="number"
                    className="form-input"
                    placeholder="Current Budget Amount"
                    onBlur={(e)=>{
                      const variance = calculateVariance(
                        e.target.value,
                        values.proposedBudget
                      );
                      setFieldValue("varianceAmount", variance);
                    }}
                  />
                  <ErrorMessage name="currentBudget" component="div" className="form-error"/>

                  <Field
                    name="proposedBudget"
                    type="number"
                    className="form-input"
                    placeholder="Proposed Revised Budget"
                    onBlur={(e)=>{
                      const variance = calculateVariance(
                        values.currentBudget,
                        e.target.value
                      );
                      setFieldValue("varianceAmount", variance);
                    }}
                  />
                  <ErrorMessage name="proposedBudget" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Variance Amount: {values.varianceAmount}</div>
                    : <Field name="varianceAmount" readOnly className="form-input" placeholder="Variance Amount"/>}

                  {renderField(values,"reason","Reason for Revision")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
                  {renderField(values,"fundingSource","Funding Source / Offset")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

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
                    Submit Budget Revision
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

export default FRM00839_BudgetRevisionRequest;
