// FRM00858_KPIDashboardDataCapture.jsx
// FRM-00858 – KPI Dashboard Data Capture – Request / Initiation
// Enterprise Grade – Dynamic KPI Data Table

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
  reportingPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  submissionDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  businessUnit: "",
  reportingPeriod: "",
  preparedBy: "",
  submissionDate: "",
  version: "1.0",

  kpiData: [
    {
      kpiName: "",
      definition: "",
      owner: "",
      target: "",
      actual: "",
      variance: "",
      unit: "",
      dataSource: "",
      dynamicFields: {}
    }
  ],

  validationNotes: "",
  issuesAssumptions: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00858_KPIDashboardDataCapture = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= VARIANCE ================= */

  const calculateVariance = (actual, target) => {
    const a = parseFloat(actual) || 0;
    const t = parseFloat(target) || 0;
    return (a - t).toFixed(2);
  };

  /* ================= COLUMN LOGIC ================= */

  const addColumn = () => {
    const name = prompt("Enter KPI Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(c=>c.key===key)) return;
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00858"
      title="KPI Dashboard Data Capture"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("KPI Dashboard Data Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00858"
              title="KPI DASHBOARD DATA CAPTURE"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="businessUnit" placeholder="Business Unit / Function" className="form-input"/>
                  <Field name="reportingPeriod" placeholder="Reporting Period" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="submissionDate" type="date" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= KPI DATA CAPTURE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">KPI Data Capture</h3>

                <FieldArray name="kpiData">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>

                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              kpiName:"",
                              definition:"",
                              owner:"",
                              target:"",
                              actual:"",
                              variance:"",
                              unit:"",
                              dataSource:"",
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
                            <th>KPI Name</th>
                            <th>Definition</th>
                            <th>Owner</th>
                            <th>Target</th>
                            <th>Actual</th>
                            <th>Variance</th>
                            <th>Unit</th>
                            <th>Data Source</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={()=>removeColumn(col.key)}>
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.kpiData.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`kpiData.${index}.kpiName`} className="form-input"/></td>
                              <td><Field name={`kpiData.${index}.definition`} className="form-input"/></td>
                              <td><Field name={`kpiData.${index}.owner`} className="form-input"/></td>

                              <td>
                                <Field
                                  name={`kpiData.${index}.target`}
                                  type="number"
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`kpiData.${index}.actual`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      e.target.value,
                                      values.kpiData[index].target
                                    );
                                    setFieldValue(`kpiData.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`kpiData.${index}.variance`}
                                  readOnly
                                  className="form-input"
                                />
                              </td>

                              <td><Field name={`kpiData.${index}.unit`} className="form-input"/></td>
                              <td><Field name={`kpiData.${index}.dataSource`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`kpiData.${index}.dynamicFields.${col.key}`}
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

              {/* ================= DATA VALIDATION NOTES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Data Validation Notes</h3>
                <Field
                  name="validationNotes"
                  className="form-input"
                />
              </div>

              {/* ================= ISSUES & ASSUMPTIONS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Issues & Assumptions</h3>
                <Field
                  name="issuesAssumptions"
                  className="form-input"
                />
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
                      <button
                        type="button"
                        className="btn-submit"
                        onClick={()=>push({data:{}})}
                      >
                        + Add Custom Signature
                      </button>
                    )}

                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index}>
                        <ApprovalSignatureBlock
                          label={`Custom Signature ${index+1}`}
                          value={sig.data||{}}
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

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit KPI Dashboard Data
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

export default FRM00858_KPIDashboardDataCapture;
