// FRM00855_MonthlyPerformancePack.jsx
// FRM-00855 – Monthly Performance Pack – Request / Initiation
// Enterprise Grade – Dynamic Financial & KPI Tables

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
  businessUnit: Yup.string().required("Required"),
  period: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  submissionDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  businessUnit: "",
  period: "",
  preparedBy: "",
  submissionDate: "",
  version: "1.0",

  financialSummary: [
    {
      metric: "",
      actual: "",
      budget: "",
      forecast: "",
      variance: "",
      variancePercent: "",
      dynamicFields: {}
    }
  ],

  kpiTable: [
    {
      kpi: "",
      target: "",
      actual: "",
      variance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  managementCommentary: "",
  risksIssuesActions: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00855_MonthlyPerformancePack = () => {

  const { isPrintMode } = usePrintMode();
  const [financialColumns, setFinancialColumns] = useState([]);
  const [kpiColumns, setKpiColumns] = useState([]);

  const calculateVariance = (actual, budget) => {
    const a = parseFloat(actual) || 0;
    const b = parseFloat(budget) || 0;
    const variance = a - b;
    const percent = b !== 0 ? ((variance / b) * 100).toFixed(2) : "0.00";
    return { variance: variance.toFixed(2), percent };
  };

  const calculateKPIVariance = (actual, target) => {
    const a = parseFloat(actual) || 0;
    const t = parseFloat(target) || 0;
    return (a - t).toFixed(2);
  };

  const addFinancialColumn = () => {
    const name = prompt("Enter Financial Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (financialColumns.find(c=>c.key===key)) return;
    setFinancialColumns([...financialColumns,{key,label:name}]);
  };

  const addKPIColumn = () => {
    const name = prompt("Enter KPI Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (kpiColumns.find(c=>c.key===key)) return;
    setKpiColumns([...kpiColumns,{key,label:name}]);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00855"
      title="Monthly Performance Pack"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Monthly Performance Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00855"
              title="MONTHLY PERFORMANCE PACK"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="businessUnit" placeholder="Business Unit / Project" className="form-input"/>
                  <Field name="period" placeholder="Period (Month/Year)" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="submissionDate" type="date" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= FINANCIAL SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Summary</h3>

                <FieldArray name="financialSummary">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addFinancialColumn}>
                            + Add Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              metric:"",
                              actual:"",
                              budget:"",
                              forecast:"",
                              variance:"",
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
                            <th>Actual</th>
                            <th>Budget</th>
                            <th>Forecast</th>
                            <th>Variance</th>
                            <th>Variance %</th>
                            {financialColumns.map(col=>(
                              <th key={col.key}>{col.label}</th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.financialSummary.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`financialSummary.${index}.metric`} className="form-input"/></td>

                              <td>
                                <Field
                                  name={`financialSummary.${index}.actual`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const result = calculateVariance(
                                      e.target.value,
                                      values.financialSummary[index].budget
                                    );
                                    setFieldValue(`financialSummary.${index}.variance`,result.variance);
                                    setFieldValue(`financialSummary.${index}.variancePercent`,result.percent);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`financialSummary.${index}.budget`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const result = calculateVariance(
                                      values.financialSummary[index].actual,
                                      e.target.value
                                    );
                                    setFieldValue(`financialSummary.${index}.variance`,result.variance);
                                    setFieldValue(`financialSummary.${index}.variancePercent`,result.percent);
                                  }}
                                />
                              </td>

                              <td><Field name={`financialSummary.${index}.forecast`} type="number" className="form-input"/></td>
                              <td><Field name={`financialSummary.${index}.variance`} readOnly className="form-input"/></td>
                              <td><Field name={`financialSummary.${index}.variancePercent`} readOnly className="form-input"/></td>

                              {financialColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`financialSummary.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= KPI PERFORMANCE SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Key Performance Indicators (KPI) Summary</h3>

                <FieldArray name="kpiTable">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addKPIColumn}>
                            + Add Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              kpi:"",
                              target:"",
                              actual:"",
                              variance:"",
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
                            <th>KPI</th>
                            <th>Target</th>
                            <th>Actual</th>
                            <th>Variance</th>
                            <th>Remarks</th>
                            {kpiColumns.map(col=>(
                              <th key={col.key}>{col.label}</th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.kpiTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`kpiTable.${index}.kpi`} className="form-input"/></td>
                              <td><Field name={`kpiTable.${index}.target`} type="number" className="form-input"/></td>

                              <td>
                                <Field
                                  name={`kpiTable.${index}.actual`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateKPIVariance(
                                      e.target.value,
                                      values.kpiTable[index].target
                                    );
                                    setFieldValue(`kpiTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td><Field name={`kpiTable.${index}.variance`} readOnly className="form-input"/></td>
                              <td><Field name={`kpiTable.${index}.remarks`} className="form-input"/></td>

                              {kpiColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`kpiTable.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* ================= MANAGEMENT COMMENTARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Management Commentary & Key Insights</h3>
                <Field name="managementCommentary" className="form-input"/>
              </div>

              {/* ================= RISKS & ACTION ITEMS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risks, Issues & Action Items</h3>
                <Field name="risksIssuesActions" className="form-input"/>
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
                    Submit Monthly Performance Pack
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

export default FRM00855_MonthlyPerformancePack;
