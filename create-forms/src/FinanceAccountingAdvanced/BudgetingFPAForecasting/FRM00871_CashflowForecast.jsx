// FRM00871_CashflowForecast.jsx
// FRM-00871 – Cashflow Forecast – Request / Initiation
// Enterprise Grade – Dynamic Cashflow Table

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
  forecastPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  submissionDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  businessUnit: "",
  forecastPeriod: "",
  preparedBy: "",
  submissionDate: "",
  version: "1.0",

  cashflowTable: [
    {
      category: "",
      openingBalance: "",
      cashInflows: "",
      cashOutflows: "",
      netMovement: "",
      closingBalance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  keyAssumptions: "",
  risksSensitivities: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00871_CashflowForecast = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= CALCULATIONS ================= */

  const calculateNetMovement = (inflows, outflows) => {
    const i = parseFloat(inflows) || 0;
    const o = parseFloat(outflows) || 0;
    return (i - o).toFixed(2);
  };

  const calculateClosingBalance = (opening, net) => {
    const o = parseFloat(opening) || 0;
    const n = parseFloat(net) || 0;
    return (o + n).toFixed(2);
  };

  /* ================= COLUMN LOGIC ================= */

  const addColumn = () => {
    const name = prompt("Enter Column Name");
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
      formId="FRM-00871"
      title="Cashflow Forecast"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cashflow Forecast Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00871"
              title="CASHFLOW FORECAST"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="businessUnit" placeholder="Business Unit / Entity" className="form-input"/>
                  <Field name="forecastPeriod" placeholder="Forecast Period" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="submissionDate" type="date" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= CASHFLOW FORECAST DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Cashflow Forecast Details</h3>

                <FieldArray name="cashflowTable">
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
                              category:"",
                              openingBalance:"",
                              cashInflows:"",
                              cashOutflows:"",
                              netMovement:"",
                              closingBalance:"",
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
                            <th>Category</th>
                            <th>Opening Balance</th>
                            <th>Cash Inflows</th>
                            <th>Cash Outflows</th>
                            <th>Net Movement</th>
                            <th>Closing Balance</th>
                            <th>Remarks</th>

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
                          {values.cashflowTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td><Field name={`cashflowTable.${index}.category`} className="form-input"/></td>

                              <td>
                                <Field
                                  name={`cashflowTable.${index}.openingBalance`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const net = calculateNetMovement(
                                      values.cashflowTable[index].cashInflows,
                                      values.cashflowTable[index].cashOutflows
                                    );
                                    const closing = calculateClosingBalance(e.target.value, net);
                                    setFieldValue(`cashflowTable.${index}.netMovement`,net);
                                    setFieldValue(`cashflowTable.${index}.closingBalance`,closing);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`cashflowTable.${index}.cashInflows`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const net = calculateNetMovement(
                                      e.target.value,
                                      values.cashflowTable[index].cashOutflows
                                    );
                                    const closing = calculateClosingBalance(
                                      values.cashflowTable[index].openingBalance,
                                      net
                                    );
                                    setFieldValue(`cashflowTable.${index}.netMovement`,net);
                                    setFieldValue(`cashflowTable.${index}.closingBalance`,closing);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`cashflowTable.${index}.cashOutflows`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const net = calculateNetMovement(
                                      values.cashflowTable[index].cashInflows,
                                      e.target.value
                                    );
                                    const closing = calculateClosingBalance(
                                      values.cashflowTable[index].openingBalance,
                                      net
                                    );
                                    setFieldValue(`cashflowTable.${index}.netMovement`,net);
                                    setFieldValue(`cashflowTable.${index}.closingBalance`,closing);
                                  }}
                                />
                              </td>

                              <td>
                                <Field name={`cashflowTable.${index}.netMovement`} readOnly className="form-input"/>
                              </td>

                              <td>
                                <Field name={`cashflowTable.${index}.closingBalance`} readOnly className="form-input"/>
                              </td>

                              <td>
                                <Field name={`cashflowTable.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`cashflowTable.${index}.dynamicFields.${col.key}`}
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

              {/* ================= KEY ASSUMPTIONS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Key Assumptions</h3>
                <Field name="keyAssumptions" className="form-input"/>
              </div>

              {/* ================= RISKS & SENSITIVITIES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risks / Sensitivities</h3>
                <Field name="risksSensitivities" className="form-input"/>
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
                    Submit Cashflow Forecast
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

export default FRM00871_CashflowForecast;
