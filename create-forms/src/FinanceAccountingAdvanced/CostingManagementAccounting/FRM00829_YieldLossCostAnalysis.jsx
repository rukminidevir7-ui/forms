// FRM00829_YieldLossCostAnalysis.jsx
// FRM-00829 – Yield Loss Cost Analysis – Request / Initiation
// Enterprise Grade – Auto Yield Loss Calculation + Numeric Enforcement

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
  analysisDate: Yup.string().required("Required"),
  costingPeriod: Yup.string().required("Required"),
  plantLocation: Yup.string().required("Required"),
  productProcess: Yup.string().required("Required"),
  standardYield: Yup.number().typeError("Must be number").required("Required"),
  actualYield: Yup.number().typeError("Must be number").required("Required"),
  inputQty: Yup.number().typeError("Must be number").required("Required"),
  outputQty: Yup.number().typeError("Must be number").required("Required"),
  lossRate: Yup.number().typeError("Must be number").required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  analysisId: "",
  analysisDate: "",
  costingPeriod: "",
  plantLocation: "",
  productProcess: "",

  standardYield: "",
  actualYield: "",
  inputQty: "",
  outputQty: "",
  yieldLossQty: "",
  lossRate: "",
  totalYieldLossCost: "",

  rootCause: "",
  correctiveAction: "",
  financialImpact: "",
  operationalImpact: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00829_YieldLossCostAnalysis = () => {

  const { isPrintMode } = usePrintMode();

  const calculateYieldLossQty = (values) => {
    const input = parseFloat(values.inputQty) || 0;
    const output = parseFloat(values.outputQty) || 0;
    return (input - output).toFixed(2);
  };

  const calculateTotalLossCost = (values) => {
    const lossQty = parseFloat(values.yieldLossQty) || 0;
    const rate = parseFloat(values.lossRate) || 0;
    return (lossQty * rate).toFixed(2);
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
      formId="FRM-00829"
      title="Yield Loss Cost Analysis – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Yield Loss Analysis Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00829"
              title="YIELD LOSS COST ANALYSIS"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Yield Loss Analysis Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"analysisId","Analysis ID")}
                  {renderField(values,"analysisDate","Analysis Date","date")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"plantLocation","Plant / Location")}
                  {renderField(values,"productProcess","Product / Process")}

                  <Field name="standardYield" type="number" className="form-input" placeholder="Standard Yield %"/>
                  <ErrorMessage name="standardYield" component="div" className="form-error"/>

                  <Field name="actualYield" type="number" className="form-input" placeholder="Actual Yield %"/>
                  <ErrorMessage name="actualYield" component="div" className="form-error"/>

                  <Field
                    name="inputQty"
                    type="number"
                    className="form-input"
                    placeholder="Input Quantity"
                    onBlur={()=>{
                      const lossQty = calculateYieldLossQty(values);
                      setFieldValue("yieldLossQty", lossQty);
                    }}
                  />
                  <ErrorMessage name="inputQty" component="div" className="form-error"/>

                  <Field
                    name="outputQty"
                    type="number"
                    className="form-input"
                    placeholder="Output Quantity"
                    onBlur={()=>{
                      const lossQty = calculateYieldLossQty(values);
                      setFieldValue("yieldLossQty", lossQty);
                    }}
                  />
                  <ErrorMessage name="outputQty" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Yield Loss Qty: {values.yieldLossQty}</div>
                    : <Field name="yieldLossQty" readOnly className="form-input" placeholder="Yield Loss Quantity"/>}

                  <Field
                    name="lossRate"
                    type="number"
                    className="form-input"
                    placeholder="Loss Rate / Cost"
                    onBlur={()=>{
                      const total = calculateTotalLossCost(values);
                      setFieldValue("totalYieldLossCost", total);
                    }}
                  />
                  <ErrorMessage name="lossRate" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Total Yield Loss Cost: {values.totalYieldLossCost}</div>
                    : <Field name="totalYieldLossCost" readOnly className="form-input" placeholder="Total Yield Loss Cost"/>}

                  {renderField(values,"rootCause","Root Cause")}
                  {renderField(values,"correctiveAction","Corrective / Preventive Action")}
                  {renderField(values,"financialImpact","Financial Impact")}
                  {renderField(values,"operationalImpact","Operational Impact")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= SIGNATURE WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off Workflow</h3>

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
                          style={{ marginTop:10 }}
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
                    Submit Yield Loss Analysis
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

export default FRM00829_YieldLossCostAnalysis;
