// FRM01085_ClaimStatusTracker.jsx
// FRM-01085 – Claim Status Tracker
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01085",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  location: "",
  businessUnit: "",

  claimLog: [
    {
      claimRef: "",
      policyNo: "",
      insurer: "",
      dateOfLoss: "",
      claimAmount: "",
      status: "",
      lastUpdate: "",
      owner: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  comments: "",

  approvalRoles: [
    { roleName: "Logged By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01085_ClaimStatusTracker = () => {

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

  const calculateSummary = (claims) => {
    const total = claims.length;
    const open = claims.filter(c => c.status !== "Closed").length;
    const closed = claims.filter(c => c.status === "Closed").length;
    return { total, open, closed };
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
      formId="FRM-01085"
      title="Claim Status Tracker"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Claim Status Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>{

          const summary = calculateSummary(values.claimLog);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01085"
                title="CLAIM STATUS TRACKER"
                department="Insurance & Risk Finance – Insurance Management"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"department","Department")}
                    {field(values,"function","Function")}
                    {field(values,"location","Location")}
                    {field(values,"businessUnit","Business Unit")}
                  </div>
                </div>

                {/* CLAIM TRACKING TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Claim Tracking Log</h3>

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
                          setFieldValue("claimLog", [
                            ...values.claimLog,
                            {
                              claimRef: "",
                              policyNo: "",
                              insurer: "",
                              dateOfLoss: "",
                              claimAmount: "",
                              status: "",
                              lastUpdate: "",
                              owner: "",
                              remarks: "",
                              dynamicFields: {}
                            }
                          ])
                        }
                      >
                        + Add Claim
                      </button>
                    </div>
                  )}

                  <FieldArray name="claimLog">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Claim Ref</th>
                            <th>Policy No</th>
                            <th>Insurer</th>
                            <th>Date of Loss</th>
                            <th>Claim Amount</th>
                            <th>Status</th>
                            <th>Last Update</th>
                            <th>Owner</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={()=>removeColumn(col.key)}
                                    style={{ marginLeft:5 }}
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
                          {values.claimLog.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`claimLog.${index}.claimRef`} className="form-input"/></td>
                              <td><Field name={`claimLog.${index}.policyNo`} className="form-input"/></td>
                              <td><Field name={`claimLog.${index}.insurer`} className="form-input"/></td>
                              <td><Field name={`claimLog.${index}.dateOfLoss`} type="date" className="form-input"/></td>
                              <td><Field name={`claimLog.${index}.claimAmount`} type="number" className="form-input"/></td>

                              <td>
                                <Field as="select" name={`claimLog.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Open</option>
                                  <option>Under Review</option>
                                  <option>Settled</option>
                                  <option>Closed</option>
                                </Field>
                              </td>

                              <td><Field name={`claimLog.${index}.lastUpdate`} type="date" className="form-input"/></td>
                              <td><Field name={`claimLog.${index}.owner`} className="form-input"/></td>
                              <td><Field name={`claimLog.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`claimLog.${index}.dynamicFields.${col.key}`}
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
                    <div className="print-value">Total Claims: {summary.total}</div>
                    <div className="print-value">Open Claims: {summary.open}</div>
                    <div className="print-value">Closed Claims: {summary.closed}</div>
                    {field(values,"comments","Comments")}
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
                        {!isPrintMode &&
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({ roleName:"New Role", data:{} })}
                          >
                            + Add Role
                          </button>
                        }

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
                              {!isPrintMode &&
                                <button
                                  type="button"
                                  className="btn-remove-role"
                                  onClick={()=>remove(index)}
                                >
                                  Remove Role
                                </button>
                              }
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </FieldArray>
                </div>

                {!isPrintMode &&
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      Submit Claim Status Tracker
                    </button>
                  </div>
                }

              </ModernA4Template>

            </Form>
          );
        }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01085_ClaimStatusTracker;