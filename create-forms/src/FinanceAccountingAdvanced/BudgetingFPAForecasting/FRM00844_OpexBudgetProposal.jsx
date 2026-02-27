// FRM00844_OpexBudgetProposal.jsx
// FRM-00844 – Opex Budget Proposal – Request / Initiation
// Enterprise Grade – Dynamic Expense Table + Auto Annual Calculation

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
  costCenter: Yup.string().required("Required"),
  budgetFrom: Yup.string().required("Required"),
  budgetTo: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  preparedByName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  department: "",
  costCenter: "",
  budgetFrom: "",
  budgetTo: "",
  requestDate: "",
  preparedByName: "",
  designation: "",

  budgetTable: [
    {
      expenseCategory: "",
      description: "",
      monthlyCost: "",
      annualCost: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  businessJustification: "",
  financialImpact: "",
  riskCompliance: "",

  preparedSignature: {},
  reviewedSignature: {},
  financeApprovalSignature: {},
  managementApprovalSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00844_OpexBudgetProposal = () => {

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

  /* ================= CALCULATION ================= */

  const calculateAnnual = (monthly) => {
    const m = parseFloat(monthly) || 0;
    return (m * 12).toFixed(2);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00844"
      title="Opex Budget Proposal"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Opex Budget Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00844"
              title="OPEX BUDGET PROPOSAL"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= HEADER ================= */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="department" placeholder="Department" className="form-input"/>
                  <Field name="costCenter" placeholder="Cost Center" className="form-input"/>
                  <Field name="budgetFrom" type="date" className="form-input"/>
                  <Field name="budgetTo" type="date" className="form-input"/>
                  <Field name="requestDate" type="date" className="form-input"/>
                  <Field name="preparedByName" placeholder="Prepared By" className="form-input"/>
                  <Field name="designation" placeholder="Designation" className="form-input"/>
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
                              expenseCategory:"",
                              description:"",
                              monthlyCost:"",
                              annualCost:"",
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
                            <th>Expense Category</th>
                            <th>Description</th>
                            <th>Monthly Cost</th>
                            <th>Annual Cost</th>
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
                                <Field name={`budgetTable.${index}.expenseCategory`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`budgetTable.${index}.description`} className="form-input"/>
                              </td>

                              <td>
                                <Field
                                  name={`budgetTable.${index}.monthlyCost`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const annual = calculateAnnual(e.target.value);
                                    setFieldValue(`budgetTable.${index}.annualCost`,annual);
                                  }}
                                />
                              </td>

                              <td>
                                {isPrintMode
                                  ? <div className="print-value">{row.annualCost}</div>
                                  : <Field name={`budgetTable.${index}.annualCost`} readOnly className="form-input"/>}
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

              {/* ================= TEXT SECTIONS ================= */}
              <div className="form-section">
                <Field name="businessJustification" placeholder="Business Justification" className="form-input"/>
                <Field name="financialImpact" placeholder="Financial Impact / Notes" className="form-input"/>
                <Field name="riskCompliance" placeholder="Risk / Compliance Considerations" className="form-input"/>
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
                    label="Finance Approval"
                    value={values.financeApprovalSignature}
                    onChange={(val)=>setFieldValue("financeApprovalSignature",val)}
                  />
                </div>

                <div className="three-column-signatures" style={{ marginTop:20 }}>
                  <ApprovalSignatureBlock
                    label="Management Approval"
                    value={values.managementApprovalSignature}
                    onChange={(val)=>setFieldValue("managementApprovalSignature",val)}
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
                    Submit Opex Proposal
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

export default FRM00844_OpexBudgetProposal;
