// FRM00808_VarianceAnalysisOverhead.jsx
// FRM-00808 – Variance Analysis (Overhead) – Request / Initiation
// Enterprise Grade – Auto Variance + % Calculation + Structured Layout

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
  costCenter: Yup.string().required("Required"),
  overheadCategory: Yup.string().required("Required"),
  budgetedOverhead: Yup.number().typeError("Must be number").required("Required"),
  actualOverhead: Yup.number().typeError("Must be number").required("Required"),
  absorbedOverhead: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  analysisId: "",
  costingPeriod: "",
  costCenter: "",
  overheadCategory: "",
  budgetedOverhead: "",
  actualOverhead: "",
  absorptionBase: "",
  absorbedOverhead: "",
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

const FRM00808_VarianceAnalysisOverhead = () => {

  const { isPrintMode } = usePrintMode();

  const calculateVariance = (values) => {
    const budget = parseFloat(values.budgetedOverhead) || 0;
    const actual = parseFloat(values.actualOverhead) || 0;
    const absorbed = parseFloat(values.absorbedOverhead) || 0;

    const variance = actual - absorbed;

    let percent = 0;
    if (budget !== 0) {
      percent = (variance / budget) * 100;
    }

    return {
      variance: variance.toFixed(2),
      percent: percent.toFixed(2)
    };
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
      formId="FRM-00808"
      title="Variance Analysis (Overhead) – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Overhead Variance Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00808"
              title="OVERHEAD VARIANCE ANALYSIS"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Overhead Variance Analysis</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"analysisId","Analysis ID")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"costCenter","Cost Center")}
                  {renderField(values,"overheadCategory","Overhead Category")}

                  <Field
                    name="budgetedOverhead"
                    type="number"
                    className="form-input"
                    placeholder="Budgeted Overhead"
                    onBlur={()=>{
                      const result = calculateVariance(values);
                      setFieldValue("varianceAmount", result.variance);
                      setFieldValue("variancePercent", result.percent);
                    }}
                  />
                  <ErrorMessage name="budgetedOverhead" component="div" className="form-error"/>

                  <Field
                    name="actualOverhead"
                    type="number"
                    className="form-input"
                    placeholder="Actual Overhead"
                    onBlur={()=>{
                      const result = calculateVariance(values);
                      setFieldValue("varianceAmount", result.variance);
                      setFieldValue("variancePercent", result.percent);
                    }}
                  />
                  <ErrorMessage name="actualOverhead" component="div" className="form-error"/>

                  {renderField(values,"absorptionBase","Absorption Base")}

                  <Field
                    name="absorbedOverhead"
                    type="number"
                    className="form-input"
                    placeholder="Absorbed Overhead"
                    onBlur={()=>{
                      const result = calculateVariance(values);
                      setFieldValue("varianceAmount", result.variance);
                      setFieldValue("variancePercent", result.percent);
                    }}
                  />
                  <ErrorMessage name="absorbedOverhead" component="div" className="form-error"/>

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
                    Submit Overhead Variance
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

export default FRM00808_VarianceAnalysisOverhead;
