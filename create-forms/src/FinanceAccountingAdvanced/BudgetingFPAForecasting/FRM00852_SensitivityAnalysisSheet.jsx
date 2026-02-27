// FRM00852_SensitivityAnalysisSheet.jsx
// FRM-00852 – Sensitivity Analysis Sheet – Request / Initiation
// Enterprise Grade – Dynamic Sensitivity Analysis Tables

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  formId: Yup.string().required("Required"),
  projectUnit: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  reviewPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00852",
  projectUnit: "",
  date: "",
  preparedBy: "",
  reviewPeriod: "",
  version: "1.0",

  assumptions: [
    {
      parameter: "",
      baseValue: "",
      lowCase: "",
      highCase: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  financialImpact: [
    {
      metric: "",
      baseResult: "",
      lowImpact: "",
      highImpact: "",
      variancePercent: "",
      dynamicFields: {}
    }
  ],

  riskCommentary: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00852_SensitivityAnalysisSheet = () => {

  const { isPrintMode } = usePrintMode();
  const [assumptionColumns, setAssumptionColumns] = useState([]);
  const [impactColumns, setImpactColumns] = useState([]);

  const calculateVariancePercent = (base, high) => {
    const b = parseFloat(base) || 0;
    const h = parseFloat(high) || 0;
    if (b === 0) return "0.00";
    return (((h - b) / b) * 100).toFixed(2);
  };

  const addAssumptionColumn = () => {
    const name = prompt("Enter Assumption Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (assumptionColumns.find(c=>c.key===key)) return;
    setAssumptionColumns([...assumptionColumns,{key,label:name}]);
  };

  const addImpactColumn = () => {
    const name = prompt("Enter Financial Impact Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (impactColumns.find(c=>c.key===key)) return;
    setImpactColumns([...impactColumns,{key,label:name}]);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00852"
      title="Sensitivity Analysis Sheet"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Sensitivity Analysis Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00852"
              title="SENSITIVITY ANALYSIS SHEET"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="projectUnit" placeholder="Project / Business Unit" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="reviewPeriod" placeholder="Review Period" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= KEY ASSUMPTIONS TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Key Assumptions Analysis</h3>

                <FieldArray name="assumptions">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addAssumptionColumn}>
                            + Add Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              parameter:"",
                              baseValue:"",
                              lowCase:"",
                              highCase:"",
                              remarks:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Parameter</th>
                            <th>Base Value</th>
                            <th>Low Case</th>
                            <th>High Case</th>
                            <th>Remarks</th>
                            {assumptionColumns.map(col=>(
                              <th key={col.key}>{col.label}</th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.assumptions.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`assumptions.${index}.parameter`} className="form-input"/></td>
                              <td><Field name={`assumptions.${index}.baseValue`} type="number" className="form-input"/></td>
                              <td><Field name={`assumptions.${index}.lowCase`} type="number" className="form-input"/></td>
                              <td><Field name={`assumptions.${index}.highCase`} type="number" className="form-input"/></td>
                              <td><Field name={`assumptions.${index}.remarks`} className="form-input"/></td>

                              {assumptionColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`assumptions.${index}.dynamicFields.${col.key}`} className="form-input"/>
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>Remove</button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= FINANCIAL IMPACT ANALYSIS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact Analysis</h3>

                <FieldArray name="financialImpact">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addImpactColumn}>
                            + Add Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              metric:"",
                              baseResult:"",
                              lowImpact:"",
                              highImpact:"",
                              variancePercent:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Metric</th>
                            <th>Base Result</th>
                            <th>Low Scenario Impact</th>
                            <th>High Scenario Impact</th>
                            <th>Variance %</th>
                            {impactColumns.map(col=>(
                              <th key={col.key}>{col.label}</th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.financialImpact.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`financialImpact.${index}.metric`} className="form-input"/></td>
                              <td><Field name={`financialImpact.${index}.baseResult`} type="number" className="form-input"/></td>
                              <td><Field name={`financialImpact.${index}.lowImpact`} type="number" className="form-input"/></td>
                              <td>
                                <Field
                                  name={`financialImpact.${index}.highImpact`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const percent = calculateVariancePercent(
                                      values.financialImpact[index].baseResult,
                                      e.target.value
                                    );
                                    setFieldValue(`financialImpact.${index}.variancePercent`,percent);
                                  }}
                                />
                              </td>
                              <td>
                                <Field name={`financialImpact.${index}.variancePercent`} readOnly className="form-input"/>
                              </td>

                              {impactColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`financialImpact.${index}.dynamicFields.${col.key}`} className="form-input"/>
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>Remove</button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= RISK OBSERVATIONS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Observations & Commentary</h3>
                <Field name="riskCommentary" className="form-input"/>
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

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Sensitivity Analysis
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

export default FRM00852_SensitivityAnalysisSheet;
