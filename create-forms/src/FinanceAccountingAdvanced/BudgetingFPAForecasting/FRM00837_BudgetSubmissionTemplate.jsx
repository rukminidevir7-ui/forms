// FRM00837_BudgetSubmissionTemplate.jsx
// FRM-00837 – Budget Submission Template – Report / Record
// Enterprise Grade – Dynamic Budget Table + Variance Auto Calculation

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
  companyName: Yup.string().required("Required"),
  budgetYear: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  submissionDate: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  version: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  budgetYear: "",
  businessUnit: "",
  submissionDate: "",
  preparedBy: "",
  version: "",

  budgetTable: [
    {
      accountHead: "",
      costCenter: "",
      currentActual: "",
      budgetAmount: "",
      variance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00837_BudgetSubmissionTemplate = () => {

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

  /* ================= VARIANCE CALC ================= */

  const calculateVariance = (actual, budget) => {
    const a = parseFloat(actual) || 0;
    const b = parseFloat(budget) || 0;
    return (b - a).toFixed(2);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00837"
      title="Budget Submission Template"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Budget Submission Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00837"
              title="BUDGET SUBMISSION TEMPLATE"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= HEADER ================= */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="companyName" placeholder="Company Name" className="form-input"/>
                  <Field name="budgetYear" placeholder="Budget Year" className="form-input"/>
                  <Field name="businessUnit" placeholder="Business Unit / Department" className="form-input"/>
                  <Field name="submissionDate" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= BUDGET TABLE ================= */}
              <div className="form-section">
                <FieldArray name="budgetTable">
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
                              accountHead:"",
                              costCenter:"",
                              currentActual:"",
                              budgetAmount:"",
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
                            <th>Account / Cost Head</th>
                            <th>Cost Center</th>
                            <th>Current Year Actual</th>
                            <th>Budget Amount</th>
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
                          {values.budgetTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`budgetTable.${index}.accountHead`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`budgetTable.${index}.costCenter`} className="form-input"/>
                              </td>

                              <td>
                                <Field
                                  name={`budgetTable.${index}.currentActual`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      e.target.value,
                                      values.budgetTable[index].budgetAmount
                                    );
                                    setFieldValue(`budgetTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`budgetTable.${index}.budgetAmount`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      values.budgetTable[index].currentActual,
                                      e.target.value
                                    );
                                    setFieldValue(`budgetTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                {isPrintMode
                                  ? <div className="print-value">{row.variance}</div>
                                  : <Field name={`budgetTable.${index}.variance`} readOnly className="form-input"/>}
                              </td>

                              <td>
                                <Field name={`budgetTable.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`budgetTable.${index}.dynamicFields.${col.key}`}
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

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= SIGN-OFF ================= */}
              <div className="form-section">
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
                    Submit Budget
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

export default FRM00837_BudgetSubmissionTemplate;
