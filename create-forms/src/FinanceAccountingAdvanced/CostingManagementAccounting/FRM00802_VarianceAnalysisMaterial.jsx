// FRM00802_VarianceAnalysisMaterial.jsx
// FRM-00802 – Variance Analysis (Material) – Request / Initiation
// Enterprise Grade – Auto Calculation + Compliance + Structured Layout

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
  analysisId: Yup.string().required("Required"),
  costingPeriod: Yup.string().required("Required"),
  productItem: Yup.string().required("Required"),
  materialCode: Yup.string().required("Required"),
  standardQuantity: Yup.number().typeError("Must be number").required("Required"),
  actualQuantity: Yup.number().typeError("Must be number").required("Required"),
  standardCost: Yup.number().typeError("Must be number").required("Required"),
  actualCost: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  analysisId: "",
  costingPeriod: "",
  productItem: "",
  materialCode: "",
  standardQuantity: "",
  actualQuantity: "",
  standardCost: "",
  actualCost: "",
  varianceAmount: "",
  variancePercent: "",

  rootCause: "",
  correctiveAction: "",
  impactAssessment: "",

  preparedBy: "",
  approvalDate: "",

  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00802_VarianceAnalysisMaterial = () => {

  const { isPrintMode } = usePrintMode();

  const calculateVariance = (standard, actual) => {
    const s = parseFloat(standard) || 0;
    const a = parseFloat(actual) || 0;
    return (a - s).toFixed(2);
  };

  const calculatePercent = (standard, variance) => {
    const s = parseFloat(standard) || 0;
    const v = parseFloat(variance) || 0;
    if (s === 0) return 0;
    return ((v / s) * 100).toFixed(2);
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
      formId="FRM-00802"
      title="Variance Analysis (Material) – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Material Variance Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00802"
              title="MATERIAL VARIANCE ANALYSIS"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Material Variance Analysis</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"analysisId","Analysis ID")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"productItem","Product / Item")}
                  {renderField(values,"materialCode","Material Code")}

                  {renderField(values,"standardQuantity","Standard Quantity","number")}
                  {renderField(values,"actualQuantity","Actual Quantity","number")}

                  <Field
                    name="standardCost"
                    type="number"
                    className="form-input"
                    placeholder="Standard Cost"
                    onBlur={(e)=>{
                      const variance = calculateVariance(
                        e.target.value,
                        values.actualCost
                      );
                      const percent = calculatePercent(e.target.value, variance);
                      setFieldValue("varianceAmount", variance);
                      setFieldValue("variancePercent", percent);
                    }}
                  />
                  <ErrorMessage name="standardCost" component="div" className="form-error"/>

                  <Field
                    name="actualCost"
                    type="number"
                    className="form-input"
                    placeholder="Actual Cost"
                    onBlur={(e)=>{
                      const variance = calculateVariance(
                        values.standardCost,
                        e.target.value
                      );
                      const percent = calculatePercent(values.standardCost, variance);
                      setFieldValue("varianceAmount", variance);
                      setFieldValue("variancePercent", percent);
                    }}
                  />
                  <ErrorMessage name="actualCost" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Variance: {values.varianceAmount}</div>
                    : <Field name="varianceAmount" readOnly className="form-input" placeholder="Variance Amount"/>}

                  {isPrintMode
                    ? <div className="print-value">Variance %: {values.variancePercent}</div>
                    : <Field name="variancePercent" readOnly className="form-input" placeholder="Variance %"/>}

                  {renderField(values,"rootCause","Root Cause")}
                  {renderField(values,"correctiveAction","Corrective Action")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"approvalDate","Approval Date","date")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= SIGNATURES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Signatures</h3>

                <div className="three-column-signatures">
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
              </div>

              {/* ================= CUSTOM SIGNATURES ================= */}
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

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Material Variance
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

export default FRM00802_VarianceAnalysisMaterial;
