// FRM00864_CostHeadJustification.jsx
// FRM-00864 – Cost Head Justification – Request / Initiation
// Enterprise Grade – Dynamic Cost Justification Table

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
  date: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  businessUnit: "",
  period: "",
  preparedBy: "",
  date: "",
  version: "1.0",

  costHeadTable: [
    {
      costHead: "",
      description: "",
      budgetAmount: "",
      actualProposedAmount: "",
      variance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  justification: "",
  impactAssessment: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00864_CostHeadJustification = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= VARIANCE ================= */

  const calculateVariance = (actual, budget) => {
    const a = parseFloat(actual) || 0;
    const b = parseFloat(budget) || 0;
    return (a - b).toFixed(2);
  };

  /* ================= COLUMN LOGIC ================= */

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;

    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) return;

    setDynamicColumns([...dynamicColumns, { key, label: name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00864"
      title="Cost Head Justification"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cost Head Justification Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00864"
              title="COST HEAD JUSTIFICATION"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="businessUnit" placeholder="Business Unit / Cost Center" className="form-input"/>
                  <Field name="period" placeholder="Period" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= COST HEAD DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Cost Head Details</h3>

                <FieldArray name="costHeadTable">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex", gap:"10px", marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>

                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              costHead:"",
                              description:"",
                              budgetAmount:"",
                              actualProposedAmount:"",
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
                            <th>Cost Head</th>
                            <th>Description</th>
                            <th>Budget Amount</th>
                            <th>Actual / Proposed Amount</th>
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
                          {values.costHeadTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`costHeadTable.${index}.costHead`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`costHeadTable.${index}.description`} className="form-input"/>
                              </td>

                              <td>
                                <Field
                                  name={`costHeadTable.${index}.budgetAmount`}
                                  type="number"
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`costHeadTable.${index}.actualProposedAmount`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      e.target.value,
                                      values.costHeadTable[index].budgetAmount
                                    );
                                    setFieldValue(`costHeadTable.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`costHeadTable.${index}.variance`}
                                  readOnly
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field name={`costHeadTable.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`costHeadTable.${index}.dynamicFields.${col.key}`}
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

              {/* ================= JUSTIFICATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Justification / Business Rationale</h3>
                <Field name="justification" className="form-input"/>
              </div>

              {/* ================= IMPACT ASSESSMENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Financial / Operational Impact</h3>
                <Field name="impactAssessment" className="form-input"/>
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

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Cost Head Justification
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

export default FRM00864_CostHeadJustification;
