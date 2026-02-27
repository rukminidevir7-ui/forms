// FRM00861_BudgetVsActualVariance.jsx
// FRM-00861 – Budget vs Actual Variance – Request / Initiation
// Enterprise Grade – Dynamic Variance Table with Headings

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

  varianceTable: [
    {
      account: "",
      budget: "",
      actual: "",
      variance: "",
      variancePercent: "",
      comments: "",
      dynamicFields: {}
    }
  ],

  summaryInsights: "",
  correctiveActions: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00861_BudgetVsActualVariance = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= VARIANCE CALC ================= */

  const calculateVariance = (actual, budget) => {
    const a = parseFloat(actual) || 0;
    const b = parseFloat(budget) || 0;
    const variance = a - b;
    const percent = b !== 0 ? ((variance / b) * 100).toFixed(2) : "0.00";
    return { variance: variance.toFixed(2), percent };
  };

  /* ================= COLUMN LOGIC ================= */

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;

    const key = name.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return;

    setDynamicColumns([...dynamicColumns, { key, label: name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00861"
      title="Budget vs Actual Variance"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Budget vs Actual Variance Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00861"
              title="BUDGET VS ACTUAL VARIANCE"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= HEADER SECTION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="businessUnit" placeholder="Business Unit / Cost Center" className="form-input"/>
                  <Field name="period" placeholder="Period" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="submissionDate" type="date" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= VARIANCE ANALYSIS TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Variance Analysis Table</h3>

                <FieldArray name="varianceTable">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{ display:"flex", gap:"10px", marginBottom:10 }}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>

                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              account:"",
                              budget:"",
                              actual:"",
                              variance:"",
                              variancePercent:"",
                              comments:"",
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
                            <th>Account / Category</th>
                            <th>Budget</th>
                            <th>Actual</th>
                            <th>Variance</th>
                            <th>Variance %</th>
                            <th>Comments</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.varianceTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`varianceTable.${index}.account`} className="form-input"/>
                              </td>

                              <td>
                                <Field
                                  name={`varianceTable.${index}.budget`}
                                  type="number"
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`varianceTable.${index}.actual`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const result = calculateVariance(
                                      e.target.value,
                                      values.varianceTable[index].budget
                                    );
                                    setFieldValue(`varianceTable.${index}.variance`, result.variance);
                                    setFieldValue(`varianceTable.${index}.variancePercent`, result.percent);
                                  }}
                                />
                              </td>

                              <td>
                                <Field name={`varianceTable.${index}.variance`} readOnly className="form-input"/>
                              </td>

                              <td>
                                <Field name={`varianceTable.${index}.variancePercent`} readOnly className="form-input"/>
                              </td>

                              <td>
                                <Field name={`varianceTable.${index}.comments`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`varianceTable.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
                                    Remove
                                  </button>
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

              {/* ================= SUMMARY SECTION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Summary Insights</h3>
                <Field name="summaryInsights" className="form-input"/>
              </div>

              {/* ================= CORRECTIVE ACTIONS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Corrective Actions / Recommendations</h3>
                <Field name="correctiveActions" className="form-input"/>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= SIGNATURE WORKFLOW ================= */}
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

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Budget vs Actual Variance
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

export default FRM00861_BudgetVsActualVariance;
