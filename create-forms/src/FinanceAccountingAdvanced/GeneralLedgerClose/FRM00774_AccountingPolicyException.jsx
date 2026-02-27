// FRM00774_AccountingPolicyException.jsx
// FRM-00774 – Accounting Policy Exception – Request / Initiation
// Enterprise Grade – Dynamic + Compliance + Custom Signatures

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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
  exceptionId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  reportingPeriod: Yup.string().required("Required"),
  policyName: Yup.string().required("Required"),
  policyReference: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  exceptionId: "",
  department: "",
  requestDate: "",
  reportingPeriod: "",

  policyName: "",
  policyReference: "",
  businessArea: "",
  descriptionOfException: "",
  reasonForException: "",
  effectivePeriod: "",
  financialImpact: "",

  riskLevel: "",
  mitigationControls: "",
  complianceConsiderations: "",
  conclusion: "",
  status: "",

  supportingDocumentsIndicator: "",
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00774_AccountingPolicyException = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error"/>
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00774"
      title="Accounting Policy Exception – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Accounting Policy Exception Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00774"
              title="ACCOUNTING POLICY EXCEPTION – REQUEST"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"exceptionId","Exception ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"reportingPeriod","Reporting Period")}
                </div>
              </div>

              {/* EXCEPTION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Exception Details</h3>
                <div className="form-fields">
                  {renderField(values,"policyName","Policy Name")}
                  {renderField(values,"policyReference","Policy Reference")}
                  {renderField(values,"businessArea","Business Area")}
                  {renderField(values,"descriptionOfException","Description of Exception")}
                  {renderField(values,"reasonForException","Reason for Exception")}
                  {renderField(values,"effectivePeriod","Effective Period")}
                  {renderField(values,"financialImpact","Financial Impact")}
                </div>
              </div>

              {/* RISK & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Compliance</h3>
                <div className="form-fields">

                  {!isPrintMode ? (
                    <Field as="select" name="riskLevel" className="form-input">
                      <option value="">Select Risk Level</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.riskLevel}</div>
                  )}

                  {renderField(values,"mitigationControls","Mitigation Controls")}
                  {renderField(values,"complianceConsiderations","Compliance Considerations")}
                  {renderField(values,"conclusion","Conclusion")}

                  {!isPrintMode ? (
                    <Field as="select" name="status" className="form-input">
                      <option value="">Status</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                      <option>Escalated</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.status}</div>
                  )}

                </div>
              </div>

              {/* CONTROL & DOCUMENTATION */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Documentation</h3>
                <div className="form-fields">
                  {renderField(values,"supportingDocumentsIndicator","Supporting Documents (Yes/No)")}
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"preparedDate","Prepared Date","date")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Finance Manager"
                    value={values.financeManagerSignature}
                    onChange={(val)=>setFieldValue("financeManagerSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Finance Controller"
                    value={values.financeControllerSignature}
                    onChange={(val)=>setFieldValue("financeControllerSignature",val)}
                  />
                </div>

                <div style={{marginTop:10}}>
                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val)=>setFieldValue("cfoSignature",val)}
                  />
                </div>

                {/* Custom Signatures (Mandatory Support) */}
                <FieldArray name="additionalSignatures">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({data:{}})}
                        >
                          + Add Custom Signature
                        </button>
                      )}

                      {values.additionalSignatures.map((sig,index)=>(
                        <div key={index}>
                          <ApprovalSignatureBlock
                            label={`Custom Signature ${index+1}`}
                            value={sig.data||{}}
                            onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
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

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Policy Exception
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

export default FRM00774_AccountingPolicyException;
