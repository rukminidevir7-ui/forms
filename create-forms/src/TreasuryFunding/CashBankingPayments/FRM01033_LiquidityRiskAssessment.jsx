// FRM01033_LiquidityRiskAssessmentChecklist.jsx
// FRM-01033 – Liquidity Risk Assessment Checklist
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
  formId: "FRM-01033",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  assessmentPeriodFrom: "",
  assessmentPeriodTo: "",
  currency: "",
  businessUnit: "",

  checklistItems: [
    { item: "Cashflow Forecast Prepared", status: "", remarks: "", dynamicFields: {} },
    { item: "Liquidity Buffer Adequate", status: "", remarks: "", dynamicFields: {} },
    { item: "Short-term Funding Available", status: "", remarks: "", dynamicFields: {} },
    { item: "Debt Covenants Compliance", status: "", remarks: "", dynamicFields: {} },
    { item: "Bank Limits Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Stress Testing Performed", status: "", remarks: "", dynamicFields: {} },
    { item: "Funding Concentration Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Contingency Plan Available", status: "", remarks: "", dynamicFields: {} },
    { item: "Market Risk Considered", status: "", remarks: "", dynamicFields: {} },
    { item: "Management Review Completed", status: "", remarks: "", dynamicFields: {} }
  ],

  overallRiskRating: "",
  keyRisksIdentified: "",
  mitigationActions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01033_LiquidityRiskAssessmentChecklist = () => {

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
      formId="FRM-01033"
      title="Liquidity Risk Assessment Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Liquidity Risk Assessment Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01033"
              title="LIQUIDITY RISK ASSESSMENT CHECKLIST"
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
                  {field(values,"assessmentPeriodFrom","Assessment Period From","date")}
                  {field(values,"assessmentPeriodTo","Assessment Period To","date")}
                  {field(values,"currency","Currency")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* CHECKLIST TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Checklist Items</h3>

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
                        setFieldValue("checklistItems", [
                          ...values.checklistItems,
                          { item: "", status: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Checklist Item
                    </button>
                  </div>
                )}

                <FieldArray name="checklistItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>Status (Yes/No)</th>
                          <th>Remarks</th>

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
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field
                                name={`checklistItems.${index}.item`}
                                className="form-input"
                              />
                            </td>
                            <td>
                              <Field
                                as="select"
                                name={`checklistItems.${index}.status`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td>
                              <Field
                                name={`checklistItems.${index}.remarks`}
                                className="form-input"
                              />
                            </td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`checklistItems.${index}.dynamicFields.${col.key}`}
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
                  )}
                </FieldArray>
              </div>

              {/* ASSESSMENT SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Assessment Summary</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Overall Risk Rating</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.overallRiskRating}</div>
                    ) : (
                      <Field as="select" name="overallRiskRating" className="form-input">
                        <option value="">Select</option>
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>High</option>
                        <option>Critical</option>
                      </Field>
                    )}
                  </div>

                  {field(values,"keyRisksIdentified","Key Risks Identified")}
                  {field(values,"mitigationActions","Mitigation Actions")}
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
                    Submit Liquidity Risk Assessment Checklist
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

export default FRM01033_LiquidityRiskAssessmentChecklist;