// FRM00832_CostingExceptionApproval.jsx
// FRM-00832 – Costing Exception Approval – Approval / Authorization
// Enterprise Grade – Multi-Level Approval Workflow

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
  approvalId: Yup.string().required("Required"),
  requestReference: Yup.string().required("Required"),
  approvalDate: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  exceptionCategory: Yup.string().required("Required"),
  processArea: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  justification: Yup.string().required("Required"),
  financialImpact: Yup.number().typeError("Must be number").required("Required"),
  validityPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  approvalId: "",
  requestReference: "",
  approvalDate: "",
  businessUnit: "",
  exceptionCategory: "",
  processArea: "",

  description: "",
  justification: "",
  financialImpact: "",
  riskAssessment: "",
  mitigationControls: "",
  validityPeriod: "",
  conditionsOfApproval: "",

  preparedSignature: {},
  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00832_CostingExceptionApproval = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input"/>
          <ErrorMessage name={name} component="div" className="form-error"/>
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00832"
      title="Costing Exception Approval – Authorization"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Costing Exception Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00832"
              title="COSTING EXCEPTION APPROVAL"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Exception Approval Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"approvalId","Approval ID")}
                  {renderField(values,"requestReference","Request Reference")}
                  {renderField(values,"approvalDate","Approval Date","date")}
                  {renderField(values,"businessUnit","Business Unit / Plant")}
                  {renderField(values,"exceptionCategory","Exception Category")}
                  {renderField(values,"processArea","Process / Area")}

                  {renderField(values,"description","Description of Exception")}
                  {renderField(values,"justification","Reason / Justification")}
                  {renderField(values,"financialImpact","Financial Impact","number")}
                  {renderField(values,"riskAssessment","Risk Assessment")}
                  {renderField(values,"mitigationControls","Mitigation / Controls")}
                  {renderField(values,"validityPeriod","Validity Period")}
                  {renderField(values,"conditionsOfApproval","Conditions of Approval")}

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
                    label="Finance Manager Approval"
                    value={values.financeManagerSignature}
                    onChange={(val)=>setFieldValue("financeManagerSignature",val)}
                  />
                </div>

                <div className="three-column-signatures" style={{ marginTop:20 }}>
                  <ApprovalSignatureBlock
                    label="Finance Controller Approval"
                    value={values.financeControllerSignature}
                    onChange={(val)=>setFieldValue("financeControllerSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val)=>setFieldValue("cfoSignature",val)}
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
                    Submit Exception Approval
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

export default FRM00832_CostingExceptionApproval;
