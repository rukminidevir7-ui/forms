// FRM00818_CostReductionSavingsTracker.jsx
// FRM-00818 – Cost Reduction Savings Tracker – Log
// Enterprise Grade – Dynamic Rows + Dynamic Columns + Structured Layout

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
  department: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  period: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  businessUnit: "",
  period: "",

  initiatives: [
    {
      initiativeId: "",
      initiativeName: "",
      owner: "",
      baselineCost: "",
      currentCost: "",
      savings: "",
      savingsType: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  preparedBy: "",
  preparedDate: "",
  reviewedBy: "",
  reviewedDate: "",
  approvedBy: "",
  approvedDate: "",

  additionalSignatures: [],
  attachments: [],
  customFields: []
};

const FRM00818_CostReductionSavingsTracker = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN LOGIC ================= */

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

  /* ================= SAVINGS CALC ================= */

  const calculateSavings = (baseline, current) => {
    const b = parseFloat(baseline) || 0;
    const c = parseFloat(current) || 0;
    return (b - c).toFixed(2);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00818"
      title="Cost Reduction Savings Tracker – Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Savings Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00818"
              title="COST REDUCTION SAVINGS TRACKER"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}

              <div className="form-section">
                <div className="form-fields">
                  <Field name="companyName" placeholder="Company Name" className="form-input"/>
                  <Field name="department" placeholder="Department" className="form-input"/>
                  <Field name="businessUnit" placeholder="Business Unit" className="form-input"/>
                  <Field name="period" placeholder="Period" className="form-input"/>
                </div>
              </div>

              <div className="form-section">
                <FieldArray name="initiatives">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ display: "flex", gap: "10px", marginBottom: 10 }}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>

                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                initiativeId: "",
                                initiativeName: "",
                                owner: "",
                                baselineCost: "",
                                currentCost: "",
                                savings: "",
                                savingsType: "",
                                status: "",
                                remarks: "",
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Initiative ID</th>
                            <th>Initiative Name</th>
                            <th>Owner</th>
                            <th>Baseline Cost</th>
                            <th>Current Cost</th>
                            <th>Savings</th>
                            <th>Savings Type</th>
                            <th>Status</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={() => removeColumn(col.key)}
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
                          {values.initiatives.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>

                              <td><Field name={`initiatives.${index}.initiativeId`} className="form-input"/></td>
                              <td><Field name={`initiatives.${index}.initiativeName`} className="form-input"/></td>
                              <td><Field name={`initiatives.${index}.owner`} className="form-input"/></td>

                              <td>
                                <Field
                                  name={`initiatives.${index}.baselineCost`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const savings = calculateSavings(
                                      e.target.value,
                                      row.currentCost
                                    );
                                    setFieldValue(`initiatives.${index}.savings`, savings);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`initiatives.${index}.currentCost`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const savings = calculateSavings(
                                      row.baselineCost,
                                      e.target.value
                                    );
                                    setFieldValue(`initiatives.${index}.savings`, savings);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`initiatives.${index}.savings`}
                                  readOnly
                                  className="form-input"
                                />
                              </td>

                              <td><Field name={`initiatives.${index}.savingsType`} className="form-input"/></td>
                              <td><Field name={`initiatives.${index}.status`} className="form-input"/></td>
                              <td><Field name={`initiatives.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`initiatives.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>
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

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= SIGNATURES ================= */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="preparedDate" type="date" className="form-input"/>

                  <Field name="reviewedBy" placeholder="Reviewed By" className="form-input"/>
                  <Field name="reviewedDate" type="date" className="form-input"/>

                  <Field name="approvedBy" placeholder="Approved By" className="form-input"/>
                  <Field name="approvedDate" type="date" className="form-input"/>
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
                    Submit Savings Tracker
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

export default FRM00818_CostReductionSavingsTracker;
