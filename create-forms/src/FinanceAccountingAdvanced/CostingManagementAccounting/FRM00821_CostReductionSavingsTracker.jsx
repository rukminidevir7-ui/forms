// FRM00821_CostReductionSavingsTracker.jsx
// FRM-00821 – Cost Reduction Savings Tracker – Log
// Enterprise Grade – Dynamic Rows + Dynamic Columns + Auto Savings

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

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  period: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required")
});

const initialValues = {
  companyName: "",
  department: "",
  businessUnit: "",
  period: "",

  tracker: [
    {
      slNo: 1,
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
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00821_CostReductionSavingsTracker = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= Dynamic Column Logic ================= */

  const addColumn = () => {
    const columnName = prompt("Enter Column Name");
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

  const calculateSavings = (baseline, current) => {
    const b = parseFloat(baseline) || 0;
    const c = parseFloat(current) || 0;
    return (b - c).toFixed(2);
  };

  return (
    <ModernFormWrapper
      formId="FRM-00821"
      title="Cost Reduction Savings Tracker – Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Savings Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00821"
              title="COST REDUCTION SAVINGS TRACKER"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= HEADER ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Tracker Header</h3>
                <div className="form-fields">
                  <Field name="companyName" className="form-input" placeholder="Company Name"/>
                  <Field name="department" className="form-input" placeholder="Department"/>
                  <Field name="businessUnit" className="form-input" placeholder="Business Unit"/>
                  <Field name="period" className="form-input" placeholder="Period"/>
                </div>
              </div>

              {/* ================= TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Savings Log</h3>

                <FieldArray name="tracker">
                  {({ push, remove }) => (
                    <>

                      {!isPrintMode && (
                        <div style={{ display: "flex", gap: "10px", marginBottom: 10 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={addColumn}
                          >
                            + Add Custom Column
                          </button>

                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                slNo: values.tracker.length + 1,
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
                                    style={{ marginLeft: 5 }}
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
                          {values.tracker.map((row, index) => (
                            <tr key={index}>
                              <td>{row.slNo}</td>
                              <td><Field name={`tracker.${index}.initiativeId`} className="form-input"/></td>
                              <td><Field name={`tracker.${index}.initiativeName`} className="form-input"/></td>
                              <td><Field name={`tracker.${index}.owner`} className="form-input"/></td>

                              <td>
                                <Field
                                  name={`tracker.${index}.baselineCost`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const savings = calculateSavings(
                                      e.target.value,
                                      row.currentCost
                                    );
                                    setFieldValue(`tracker.${index}.savings`, savings);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`tracker.${index}.currentCost`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const savings = calculateSavings(
                                      row.baselineCost,
                                      e.target.value
                                    );
                                    setFieldValue(`tracker.${index}.savings`, savings);
                                  }}
                                />
                              </td>

                              <td>
                                <Field
                                  name={`tracker.${index}.savings`}
                                  readOnly
                                  className="form-input"
                                />
                              </td>

                              <td><Field name={`tracker.${index}.savingsType`} className="form-input"/></td>
                              <td><Field name={`tracker.${index}.status`} className="form-input"/></td>
                              <td><Field name={`tracker.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`tracker.${index}.dynamicFields.${col.key}`}
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
                <h3 className="form-section-title">Signatures</h3>
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

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00821_CostReductionSavingsTracker;
