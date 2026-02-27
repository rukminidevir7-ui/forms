// FRM00801_StandardCostRevision.jsx
// FRM-00801 – Standard Cost Revision – Report / Record
// Enterprise Grade – Auto Variance + Compliance + Custom Signatures

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
  revisionId: Yup.string().required("Required"),
  costingPeriod: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required"),
  productItem: Yup.string().required("Required"),
  previousStandardCost: Yup.number().typeError("Must be number").required("Required"),
  revisedStandardCost: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  revisionId: "",
  costingPeriod: "",
  effectiveDate: "",
  productItem: "",

  previousStandardCost: "",
  revisedStandardCost: "",
  variance: "",

  reasonForRevision: "",
  impactAssessment: "",

  preparedBy: "",
  approvalDate: "",
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00801_StandardCostRevision = () => {

  const { isPrintMode } = usePrintMode();

  const calculateVariance = (previous, revised) => {
    const p = parseFloat(previous) || 0;
    const r = parseFloat(revised) || 0;
    return (r - p).toFixed(2);
  };

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
      formId="FRM-00801"
      title="Standard Cost Revision – Report"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Standard Cost Revision Recorded Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00801"
              title="STANDARD COST REVISION RECORD"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* BASIC INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">Revision Information</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"revisionId","Revision ID")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                  {renderField(values,"productItem","Product / Item")}
                </div>
              </div>

              {/* COST REVISION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Cost Revision Details</h3>
                <div className="form-fields">

                  <Field
                    name="previousStandardCost"
                    type="number"
                    className="form-input"
                    placeholder="Previous Standard Cost"
                    onBlur={(e)=>{
                      const variance = calculateVariance(
                        e.target.value,
                        values.revisedStandardCost
                      );
                      setFieldValue("variance", variance);
                    }}
                  />
                  <ErrorMessage name="previousStandardCost" component="div" className="form-error"/>

                  <Field
                    name="revisedStandardCost"
                    type="number"
                    className="form-input"
                    placeholder="Revised Standard Cost"
                    onBlur={(e)=>{
                      const variance = calculateVariance(
                        values.previousStandardCost,
                        e.target.value
                      );
                      setFieldValue("variance", variance);
                    }}
                  />
                  <ErrorMessage name="revisedStandardCost" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Variance: {values.variance}</div>
                    : <Field name="variance" readOnly className="form-input" placeholder="Variance"/>}

                  {renderField(values,"reasonForRevision","Reason for Revision")}
                  {renderField(values,"impactAssessment","Impact Assessment")}

                </div>
              </div>

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off</h3>
                <div className="form-fields">
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"approvalDate","Approval Date","date")}
                </div>

                <div className="three-column-signatures" style={{marginTop:20}}>
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

                {/* Custom Signatures */}
                <FieldArray name="additionalSignatures">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button type="button" className="btn-submit" onClick={()=>push({data:{}})}>
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
                            <button type="button" onClick={()=>remove(index)}>Remove</button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>

              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Revision Record
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

export default FRM00801_StandardCostRevision;
