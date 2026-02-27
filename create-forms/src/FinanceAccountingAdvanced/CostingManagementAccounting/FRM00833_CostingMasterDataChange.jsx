// FRM00833_CostingMasterDataChange.jsx
// FRM-00833 – Costing Master Data Change – Request / Initiation
// Enterprise Grade – Structured Change Control + Multi-Level Approval Workflow

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
  effectiveDate: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  masterDataObject: Yup.string().required("Required"),
  objectCode: Yup.string().required("Required"),
  fieldChanged: Yup.string().required("Required"),
  currentValue: Yup.string().required("Required"),
  proposedValue: Yup.string().required("Required"),
  justification: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  requestId: "",
  requestDate: "",
  effectiveDate: "",
  businessUnit: "",

  masterDataObject: "",
  objectCode: "",
  fieldChanged: "",
  currentValue: "",
  proposedValue: "",

  justification: "",
  impactAssessment: "",
  riskAssessment: "",
  controlsValidation: "",
  supportingDocuments: "",

  preparedSignature: {},
  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00833_CostingMasterDataChange = () => {

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
      formId="FRM-00833"
      title="Costing Master Data Change – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Costing Master Data Change Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00833"
              title="COSTING MASTER DATA CHANGE"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Master Data Change Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"requestId","Request ID")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                  {renderField(values,"businessUnit","Business Unit / Plant")}

                  {renderField(values,"masterDataObject","Master Data Object")}
                  {renderField(values,"objectCode","Object Code / ID")}
                  {renderField(values,"fieldChanged","Field to be Changed")}
                  {renderField(values,"currentValue","Current Value")}
                  {renderField(values,"proposedValue","Proposed Value")}

                  {renderField(values,"justification","Reason / Justification")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
                  {renderField(values,"riskAssessment","Risk Assessment")}
                  {renderField(values,"controlsValidation","Controls / Validation")}
                  {renderField(values,"supportingDocuments","Supporting Documents")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= APPROVAL WORKFLOW ================= */}
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
                    Submit Master Data Change
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

export default FRM00833_CostingMasterDataChange;
