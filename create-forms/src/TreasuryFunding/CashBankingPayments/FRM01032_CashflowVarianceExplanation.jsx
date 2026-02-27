// FRM01032_CashflowVarianceExplanation.jsx
// FRM-01032 – Cashflow Variance Explanation
// Enterprise Grade – Treasury & Funding – Cash, Banking & Payments

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
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01032",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  periodFrom: "",
  periodTo: "",
  currency: "",
  businessUnit: "",

  budgetedCashflow: "",
  actualCashflow: "",

  varianceAnalysis: [
    {
      category: "",
      budget: "",
      actual: "",
      variance: "",
      reason: "",
      dynamicFields: {}
    }
  ],

  keyDrivers: "",
  correctiveActions: "",
  impactAssessment: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01032_CashflowVarianceExplanation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  /* ================= CALCULATIONS ================= */

  const calculateSummary = (values) => {
    const budget = Number(values.budgetedCashflow) || 0;
    const actual = Number(values.actualCashflow) || 0;
    const variance = actual - budget;
    const variancePercent = budget !== 0
      ? ((variance / budget) * 100).toFixed(2)
      : 0;

    return { budget, actual, variance, variancePercent };
  };

  const calculateTableTotals = (rows) => {
    let totalBudget = 0;
    let totalActual = 0;

    rows.forEach(row => {
      totalBudget += Number(row.budget) || 0;
      totalActual += Number(row.actual) || 0;
    });

    return {
      totalBudget,
      totalActual,
      totalVariance: totalActual - totalBudget
    };
  };

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-01032"
      title="Cashflow Variance Explanation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cashflow Variance Explanation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values);
          const tableTotals = calculateTableTotals(values.varianceAnalysis);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01032"
                title="CASHFLOW VARIANCE EXPLANATION"
                department="Treasury & Funding – Cash, Banking & Payments"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"referenceNumber","Reference Number")}
                    {field(values,"location","Location")}
                    {field(values,"periodFrom","Period From","date")}
                    {field(values,"periodTo","Period To","date")}
                    {field(values,"currency","Currency")}
                    {field(values,"businessUnit","Business Unit")}
                  </div>
                </div>

                {/* VARIANCE SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Variance Summary</h3>
                  <div className="form-fields">
                    {field(values,"budgetedCashflow","Budgeted Cashflow","number")}
                    {field(values,"actualCashflow","Actual Cashflow","number")}
                    <div className="print-value">Variance Amount: {summary.variance}</div>
                    <div className="print-value">Variance Percentage: {summary.variancePercent}%</div>
                  </div>
                </div>

                {/* VARIANCE ANALYSIS TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Variance Analysis</h3>

                  {!isPrintMode && (
                    <div style={{ marginBottom: 15 }}>
                      <button type="button" className="btn-submit" onClick={addColumn}>
                        + Add Column
                      </button>

                      <button
                        type="button"
                        className="btn-submit"
                        style={{ marginLeft: 10 }}
                        onClick={() =>
                          setFieldValue("varianceAnalysis", [
                            ...values.varianceAnalysis,
                            {
                              category: "",
                              budget: "",
                              actual: "",
                              variance: "",
                              reason: "",
                              dynamicFields: {}
                            }
                          ])
                        }
                      >
                        + Add Category
                      </button>
                    </div>
                  )}

                  <FieldArray name="varianceAnalysis">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Budget</th>
                            <th>Actual</th>
                            <th>Variance</th>
                            <th>Reason</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={()=>removeColumn(col.key)}
                                    style={{ marginLeft: 5 }}
                                  >
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.varianceAnalysis.map((row,index)=>{
                            const variance =
                              (Number(row.actual)||0) -
                              (Number(row.budget)||0);

                            return (
                              <tr key={index}>
                                <td><Field name={`varianceAnalysis.${index}.category`} className="form-input"/></td>
                                <td><Field name={`varianceAnalysis.${index}.budget`} type="number" className="form-input"/></td>
                                <td><Field name={`varianceAnalysis.${index}.actual`} type="number" className="form-input"/></td>
                                <td className="print-value">{variance}</td>
                                <td><Field name={`varianceAnalysis.${index}.reason`} className="form-input"/></td>

                                {dynamicColumns.map(col => (
                                  <td key={col.key}>
                                    <Field
                                      name={`varianceAnalysis.${index}.dynamicFields.${col.key}`}
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
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </FieldArray>

                  <div style={{ marginTop: 10 }} className="print-value">
                    Total Budget: {tableTotals.totalBudget} | 
                    Total Actual: {tableTotals.totalActual} | 
                    Total Variance: {tableTotals.totalVariance}
                  </div>
                </div>

                {/* DETAILED EXPLANATION */}
                <div className="form-section">
                  <h3 className="form-section-title">Detailed Explanation</h3>
                  <div className="form-fields">
                    {field(values,"keyDrivers","Key Drivers")}
                    {field(values,"correctiveActions","Corrective Actions")}
                    {field(values,"impactAssessment","Impact Assessment")}
                    {field(values,"remarks","Remarks")}
                  </div>
                </div>

                <FormAttachments values={values}/>
                <FormCustomFields values={values}/>

                {/* AUTHORIZATION */}
                <div className="form-section">
                  <h3 className="form-section-title">Authorization</h3>

                  <FieldArray name="approvalRoles">
                    {({ push, remove })=>(
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({ roleName:"New Role", data:{} })}
                          >
                            + Add Role
                          </button>
                        )}

                        <div className="three-column-signatures">
                          {values.approvalRoles.map((role,index)=>(
                            <div key={index}>
                              <ApprovalSignatureBlock
                                roleName={role.roleName}
                                value={role.data}
                                allowRoleEdit={!isPrintMode}
                                onRoleNameChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.roleName`,val)}
                                onChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.data`,val)}
                              />
                              {!isPrintMode && (
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove Role
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </FieldArray>
                </div>

                {!isPrintMode && (
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      Submit Cashflow Variance Explanation
                    </button>
                  </div>
                )}

              </ModernA4Template>

            </Form>
          );
        }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01032_CashflowVarianceExplanation;