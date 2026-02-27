// FRM00826_ReworkCostAnalysis.jsx
// FRM-00826 – Rework Cost Analysis – Request / Initiation
// Enterprise Grade – Auto Rework Cost Calculation + Numeric Enforcement

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
  reworkCategory: Yup.string().required("Required"),
  standardReworkHours: Yup.number().typeError("Must be number").required("Required"),
  actualReworkHours: Yup.number().typeError("Must be number").required("Required"),
  reworkRate: Yup.number().typeError("Must be number").required("Required")
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
  reworkCategory: "",

  standardReworkHours: "",
  actualReworkHours: "",
  reworkRate: "",
  totalReworkCost: "",

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

const FRM00826_ReworkCostAnalysis = () => {

  const { isPrintMode } = usePrintMode();

  const calculateTotalReworkCost = (values) => {
    const hours = parseFloat(values.actualReworkHours) || 0;
    const rate = parseFloat(values.reworkRate) || 0;
    return (hours * rate).toFixed(2);
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
      formId="FRM-00826"
      title="Rework Cost Analysis – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Rework Cost Analysis Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00826"
              title="REWORK COST ANALYSIS"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Rework Analysis Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"analysisId","Analysis ID")}
                  {renderField(values,"analysisDate","Analysis Date","date")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"plantLocation","Plant / Location")}
                  {renderField(values,"productProcess","Product / Process")}
                  {renderField(values,"reworkCategory","Rework Category")}

                  <Field
                    name="standardReworkHours"
                    type="number"
                    className="form-input"
                    placeholder="Standard Rework Hours"
                  />
                  <ErrorMessage name="standardReworkHours" component="div" className="form-error"/>

                  <Field
                    name="actualReworkHours"
                    type="number"
                    className="form-input"
                    placeholder="Actual Rework Hours"
                    onBlur={()=>{
                      const total = calculateTotalReworkCost(values);
                      setFieldValue("totalReworkCost", total);
                    }}
                  />
                  <ErrorMessage name="actualReworkHours" component="div" className="form-error"/>

                  <Field
                    name="reworkRate"
                    type="number"
                    className="form-input"
                    placeholder="Rework Rate / Cost"
                    onBlur={()=>{
                      const total = calculateTotalReworkCost(values);
                      setFieldValue("totalReworkCost", total);
                    }}
                  />
                  <ErrorMessage name="reworkRate" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Total Rework Cost: {values.totalReworkCost}</div>
                    : <Field name="totalReworkCost" readOnly className="form-input" placeholder="Total Rework Cost"/>}

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
                    Submit Rework Analysis
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

export default FRM00826_ReworkCostAnalysis;
