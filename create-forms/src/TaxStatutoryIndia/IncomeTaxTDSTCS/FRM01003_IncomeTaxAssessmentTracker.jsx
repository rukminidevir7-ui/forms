// FRM01003_IncomeTaxAssessmentTracker.jsx
// FRM-01003 – Income Tax Assessment Tracker
// Enterprise Grade – Tax & Statutory (India) – Income Tax & TDS/TCS

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
  financialYear: Yup.string().required("Required"),
  legalName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01003",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax & TDS/TCS",
  financialYear: "",
  assessmentYear: "",
  referenceNumber: "",
  location: "",
  pan: "",
  legalName: "",

  assessmentCases: [
    {
      caseId: "",
      noticeRef: "",
      section: "",
      noticeDate: "",
      responseDue: "",
      status: "",
      owner: "",
      riskLevel: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  generalRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01003_IncomeTaxAssessmentTracker = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= DYNAMIC COLUMN FUNCTIONS ================= */

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

  /* ================= SUMMARY ================= */

  const calculateSummary = (cases) => {
    const total = cases.length;
    const open = cases.filter(c => c.status !== "Closed").length;
    const closed = cases.filter(c => c.status === "Closed").length;
    const highRisk = cases.filter(c => c.riskLevel === "High").length;
    return { total, open, closed, highRisk };
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
      formId="FRM-01003"
      title="Income Tax Assessment Tracker"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Income Tax Assessment Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values.assessmentCases);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01003"
                title="INCOME TAX ASSESSMENT TRACKER"
                department="Tax & Statutory (India) – Income Tax & TDS/TCS"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"department","Department")}
                    {field(values,"function","Function")}
                    {field(values,"financialYear","Financial Year")}
                    {field(values,"assessmentYear","Assessment Year")}
                    {field(values,"referenceNumber","Reference Number")}
                    {field(values,"location","Location")}
                    {field(values,"pan","PAN")}
                    {field(values,"legalName","Legal Name")}
                  </div>
                </div>

                {/* ASSESSMENT DETAILS TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Assessment Details</h3>

                  {!isPrintMode && (
                    <div style={{ marginBottom: 15 }}>
                      <button
                        type="button"
                        className="btn-submit"
                        onClick={addColumn}
                      >
                        + Add Column
                      </button>

                      <button
                        type="button"
                        className="btn-submit"
                        style={{ marginLeft: 10 }}
                        onClick={() =>
                          setFieldValue("assessmentCases", [
                            ...values.assessmentCases,
                            {
                              caseId: "",
                              noticeRef: "",
                              section: "",
                              noticeDate: "",
                              responseDue: "",
                              status: "",
                              owner: "",
                              riskLevel: "",
                              remarks: "",
                              dynamicFields: {}
                            }
                          ])
                        }
                      >
                        + Add Case
                      </button>
                    </div>
                  )}

                  <FieldArray name="assessmentCases">
                    {({ remove }) => (

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Case ID</th>
                            <th>Notice Ref</th>
                            <th>Section</th>
                            <th>Notice Date</th>
                            <th>Response Due</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Risk</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={() => removeColumn(col.key)}
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
                          {values.assessmentCases.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`assessmentCases.${index}.caseId`} className="form-input"/></td>
                              <td><Field name={`assessmentCases.${index}.noticeRef`} className="form-input"/></td>
                              <td><Field name={`assessmentCases.${index}.section`} className="form-input"/></td>
                              <td><Field name={`assessmentCases.${index}.noticeDate`} type="date" className="form-input"/></td>
                              <td><Field name={`assessmentCases.${index}.responseDue`} type="date" className="form-input"/></td>
                              <td>
                                <Field as="select" name={`assessmentCases.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Open</option>
                                  <option>Under Review</option>
                                  <option>Closed</option>
                                </Field>
                              </td>
                              <td><Field name={`assessmentCases.${index}.owner`} className="form-input"/></td>
                              <td>
                                <Field as="select" name={`assessmentCases.${index}.riskLevel`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Low</option>
                                  <option>Medium</option>
                                  <option>High</option>
                                </Field>
                              </td>
                              <td><Field name={`assessmentCases.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`assessmentCases.${index}.dynamicFields.${col.key}`}
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

                {/* SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Cases: {summary.total}</div>
                    <div className="print-value">Open Cases: {summary.open}</div>
                    <div className="print-value">Closed Cases: {summary.closed}</div>
                    <div className="print-value">High Risk Cases: {summary.highRisk}</div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="form-section">
                  <h3 className="form-section-title">Notes</h3>
                  <div className="form-fields">
                    {field(values,"generalRemarks","General Remarks")}
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
                                  setFieldValue(`approvalRoles.${index}.roleName`,val)
                                }
                                onChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.data`,val)
                                }
                              />
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  className="btn-remove-role"
                                  onClick={()=>remove(index)}
                                >
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
                      Submit Assessment Tracker
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

export default FRM01003_IncomeTaxAssessmentTracker;