// FRM00847_ForecastUpdate.jsx
// FRM-00847 – Forecast Update – Request / Initiation
// Enterprise Grade – Dynamic Forecast Comparison Table

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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
  department: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  forecastPeriod: Yup.string().required("Required"),
  preparedByName: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  referenceNo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  department: "",
  businessUnit: "",
  forecastPeriod: "",
  preparedByName: "",
  date: "",
  referenceNo: "",

  forecastTable: [
    {
      costCenter: "",
      account: "",
      currentForecast: "",
      revisedForecast: "",
      variance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  justification: "",
  riskImpact: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00847_ForecastUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN LOGIC ================= */

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

  /* ================= VARIANCE ================= */

  const calculateVariance = (current, revised) => {
    const c = parseFloat(current) || 0;
    const r = parseFloat(revised) || 0;
    return (r - c).toFixed(2);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00847"
      title="Forecast Update"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Forecast Update Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00847"
              title="FORECAST UPDATE"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= HEADER ================= */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="department" placeholder="Department" className="form-input"/>
                  <Field name="businessUnit" placeholder="Business Unit" className="form-input"/>
                  <Field name="forecastPeriod" placeholder="Forecast Period" className="form-input"/>
                  <Field name="preparedByName" placeholder="Prepared By" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNo" placeholder="Reference No." className="form-input"/>
                </div>
              </div>

              {/* ================= FORECAST TABLE ================= */}
              <div className="form-section">

                <FieldArray name="forecastTable">
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
                              costCenter:"",
                              account:"",
                              currentForecast:"",
                              revisedForecast:"",
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
                            <th>Cost Center</th>
                            <th>Account</th>
                            <th>Current Forecast</th>
                            <th>Revised Forecast</th>
                            <th>Variance</th>
                            <th>Remarks</th>

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
                          {values.forecastTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`forecastTable.${index}.costCenter`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`forecastTable.${index}.account`} className="form-input"/>
                              </td>

                              <td>
                                <Field
                                  name={`forecastTable.${index}.currentForecast`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      e.target.value,
                                      values.forecastTable[index].revisedForecast
                                    );
                                    setFieldValue(`forecastTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`forecastTable.${index}.revisedForecast`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      values.forecastTable[index].currentForecast,
                                      e.target.value
                                    );
                                    setFieldValue(`forecastTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                {isPrintMode
                                  ? <div className="print-value">{row.variance}</div>
                                  : <Field name={`forecastTable.${index}.variance`} readOnly className="form-input"/>}
                              </td>

                              <td>
                                <Field name={`forecastTable.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`forecastTable.${index}.dynamicFields.${col.key}`}
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

              {/* ================= TEXT SECTIONS ================= */}
              <div className="form-section">
                <Field name="justification" placeholder="Justification / Key Assumptions" className="form-input"/>
                <Field name="riskImpact" placeholder="Risk / Impact Assessment" className="form-input"/>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= APPROVALS ================= */}
              <div className="form-section">
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
                    Submit Forecast Update
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

export default FRM00847_ForecastUpdate;
