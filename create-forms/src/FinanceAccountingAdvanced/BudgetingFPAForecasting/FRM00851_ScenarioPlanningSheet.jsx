// FRM00851_ScenarioPlanningSheet.jsx
// FRM-00851 – Scenario Planning Sheet – Report / Record
// Enterprise Grade – Scenario Comparison Sheet

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
  scenarioName: Yup.string().required("Required"),
  scenarioPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  date: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  scenarioName: "",
  scenarioPeriod: "",
  preparedBy: "",
  date: "",
  reviewedBy: "",
  version: "",

  keyAssumptions: "",

  financialTable: [
    {
      metric: "",
      baseline: "",
      scenario: "",
      variance: "",
      dynamicFields: {}
    }
  ],

  risks: "",
  mitigation: "",

  preparedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00851_ScenarioPlanningSheet = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const calculateVariance = (baseline, scenario) => {
    const b = parseFloat(baseline) || 0;
    const s = parseFloat(scenario) || 0;
    return (s - b).toFixed(2);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00851"
      title="Scenario Planning Sheet"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Scenario Planning Sheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00851"
              title="SCENARIO PLANNING SHEET"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="scenarioName" placeholder="Scenario Name" className="form-input"/>
                  <Field name="scenarioPeriod" placeholder="Scenario Period" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="reviewedBy" placeholder="Reviewed By" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= KEY ASSUMPTIONS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Key Assumptions</h3>
                <Field
                  name="keyAssumptions"
                  placeholder="Describe key assumptions used in this scenario"
                  className="form-input"
                />
              </div>

              {/* ================= FINANCIAL IMPACT SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact Summary</h3>

                <FieldArray name="financialTable">
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
                              metric:"",
                              baseline:"",
                              scenario:"",
                              variance:"",
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
                            <th>Baseline</th>
                            <th>Scenario</th>
                            <th>Variance</th>

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
                          {values.financialTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`financialTable.${index}.metric`} className="form-input"/>
                              </td>

                              <td>
                                <Field
                                  name={`financialTable.${index}.baseline`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      e.target.value,
                                      values.financialTable[index].scenario
                                    );
                                    setFieldValue(`financialTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`financialTable.${index}.scenario`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      values.financialTable[index].baseline,
                                      e.target.value
                                    );
                                    setFieldValue(`financialTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                {isPrintMode
                                  ? <div className="print-value">{row.variance}</div>
                                  : <Field name={`financialTable.${index}.variance`} readOnly className="form-input"/>}
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`financialTable.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
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

              {/* ================= RISKS & MITIGATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risks & Mitigation</h3>
                <Field name="risks" placeholder="Risks Identified" className="form-input"/>
                <Field name="mitigation" placeholder="Mitigation Strategy" className="form-input"/>
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
                    Submit Scenario Planning Sheet
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

export default FRM00851_ScenarioPlanningSheet;
