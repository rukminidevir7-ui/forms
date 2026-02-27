// FRM00870_HeadcountPlan.jsx
// FRM-00870 – Headcount Plan – Request / Initiation
// Enterprise Grade – Dynamic Headcount Planning Sheet

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
  planningPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  date: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  businessUnit: "",
  planningPeriod: "",
  preparedBy: "",
  date: "",
  version: "1.0",

  headcountTable: [
    {
      department: "",
      role: "",
      currentHC: "",
      plannedHC: "",
      netChange: "",
      avgCost: "",
      totalCostImpact: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  keyAssumptions: "",
  risksConstraints: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00870_HeadcountPlan = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= CALCULATIONS ================= */

  const calculateNetChange = (planned, current) => {
    const p = parseFloat(planned) || 0;
    const c = parseFloat(current) || 0;
    return (p - c).toFixed(0);
  };

  const calculateTotalCostImpact = (netChange, avgCost) => {
    const n = parseFloat(netChange) || 0;
    const a = parseFloat(avgCost) || 0;
    return (n * a).toFixed(2);
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
      formId="FRM-00870"
      title="Headcount Plan"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Headcount Plan Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00870"
              title="HEADCOUNT PLAN"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="businessUnit" placeholder="Business Unit / Function" className="form-input"/>
                  <Field name="planningPeriod" placeholder="Planning Period" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= HEADCOUNT PLANNING DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Headcount Planning Details</h3>

                <FieldArray name="headcountTable">
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
                              department:"",
                              role:"",
                              currentHC:"",
                              plannedHC:"",
                              netChange:"",
                              avgCost:"",
                              totalCostImpact:"",
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
                            <th>Department</th>
                            <th>Role / Position</th>
                            <th>Current HC</th>
                            <th>Planned HC</th>
                            <th>Net Change</th>
                            <th>Avg Cost</th>
                            <th>Total Cost Impact</th>
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
                          {values.headcountTable.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`headcountTable.${index}.department`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`headcountTable.${index}.role`} className="form-input"/>
                              </td>

                              <td>
                                <Field
                                  name={`headcountTable.${index}.currentHC`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const net = calculateNetChange(
                                      values.headcountTable[index].plannedHC,
                                      e.target.value
                                    );
                                    setFieldValue(`headcountTable.${index}.netChange`, net);

                                    const impact = calculateTotalCostImpact(
                                      net,
                                      values.headcountTable[index].avgCost
                                    );
                                    setFieldValue(`headcountTable.${index}.totalCostImpact`, impact);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`headcountTable.${index}.plannedHC`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const net = calculateNetChange(
                                      e.target.value,
                                      values.headcountTable[index].currentHC
                                    );
                                    setFieldValue(`headcountTable.${index}.netChange`, net);

                                    const impact = calculateTotalCostImpact(
                                      net,
                                      values.headcountTable[index].avgCost
                                    );
                                    setFieldValue(`headcountTable.${index}.totalCostImpact`, impact);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`headcountTable.${index}.netChange`}
                                  readOnly
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`headcountTable.${index}.avgCost`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const impact = calculateTotalCostImpact(
                                      values.headcountTable[index].netChange,
                                      e.target.value
                                    );
                                    setFieldValue(`headcountTable.${index}.totalCostImpact`, impact);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`headcountTable.${index}.totalCostImpact`}
                                  readOnly
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field name={`headcountTable.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`headcountTable.${index}.dynamicFields.${col.key}`}
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

              {/* ================= KEY ASSUMPTIONS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Key Assumptions</h3>
                <Field name="keyAssumptions" className="form-input"/>
              </div>

              {/* ================= RISKS & CONSTRAINTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risks / Constraints</h3>
                <Field name="risksConstraints" className="form-input"/>
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
                    Submit Headcount Plan
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

export default FRM00870_HeadcountPlan;
