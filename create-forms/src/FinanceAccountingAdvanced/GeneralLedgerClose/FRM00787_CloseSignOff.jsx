// FRM00787_CloseSignOff.jsx
// FRM-00787 – Close Sign-Off – Final Period Close Certification
// Enterprise Grade – Certification + Executive Workflow + Custom Signatures

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
  signOffId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  closeDate: Yup.string().required("Required"),
  reportingPeriod: Yup.string().required("Required"),
  closeCycle: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  signOffId: "",
  department: "",
  closeDate: "",
  reportingPeriod: "",

  closeCycle: "",
  trialBalanceFinalized: "",
  reconciliationsCompleted: "",
  adjustmentsPosted: "",
  openIssues: "",
  overallStatus: "",

  preparedBy: "",
  reviewComments: "",
  controlConfirmation: "",

  preparedSignature: {},
  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00787_CloseSignOff = () => {

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

  const renderYesNo = (values, name, label) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {!isPrintMode ? (
        <Field as="select" name={name} className="form-input">
          <option value="">Select</option>
          <option>Yes</option>
          <option>No</option>
        </Field>
      ) : (
        <div className="print-value">{values[name]}</div>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00787"
      title="Close Sign-Off – Final Certification"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Close Sign-Off Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00787"
              title="CLOSE SIGN-OFF CERTIFICATION"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"signOffId","Sign-off ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"closeDate","Close Date","date")}
                  {renderField(values,"reportingPeriod","Reporting Period")}
                </div>
              </div>

              {/* CLOSE SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Close Summary</h3>
                <div className="form-fields">

                  {!isPrintMode ? (
                    <Field as="select" name="closeCycle" className="form-input">
                      <option value="">Select Close Cycle</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Year-End</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.closeCycle}</div>
                  )}

                  {renderYesNo(values,"trialBalanceFinalized","Trial Balance Finalized")}
                  {renderYesNo(values,"reconciliationsCompleted","Reconciliations Completed")}
                  {renderYesNo(values,"adjustmentsPosted","Adjustments Posted")}
                  {renderField(values,"openIssues","Open Issues")}

                  {!isPrintMode ? (
                    <Field as="select" name="overallStatus" className="form-input">
                      <option value="">Overall Status</option>
                      <option>Completed</option>
                      <option>Completed with Exceptions</option>
                      <option>Pending</option>
                      <option>Escalated</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.overallStatus}</div>
                  )}

                </div>
              </div>

              {/* CERTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Certification</h3>
                <div className="form-fields">
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"reviewComments","Review Comments")}
                  {renderField(values,"controlConfirmation","Control Confirmation Statement")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL WORKFLOW */}
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
                    label="Finance Manager"
                    value={values.financeManagerSignature}
                    onChange={(val)=>setFieldValue("financeManagerSignature",val)}
                  />
                </div>

                <div className="three-column-signatures" style={{marginTop:20}}>
                  <ApprovalSignatureBlock
                    label="Finance Controller"
                    value={values.financeControllerSignature}
                    onChange={(val)=>setFieldValue("financeControllerSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val)=>setFieldValue("cfoSignature",val)}
                  />
                </div>

                {/* Custom Signatures */}
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
                    Submit Close Sign-Off
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

export default FRM00787_CloseSignOff;
