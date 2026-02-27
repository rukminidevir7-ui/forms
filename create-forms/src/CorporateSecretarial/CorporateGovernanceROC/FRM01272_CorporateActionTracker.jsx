// FRM01272_CorporateActionTracker.jsx
// FRM-01272 – Corporate Action Tracker Log
// Enterprise Grade – Corporate & Secretarial – Governance & ROC

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
  financialYear: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01272",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  financialYear: "",
  departmentName: "",
  preparedBy: "",
  date: "",

  actionTracker: [
    {
      actionId: "",
      actionDescription: "",
      owner: "",
      startDate: "",
      dueDate: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  keyObservations: "",
  risksIssues: "",
  nextSteps: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01272_CorporateActionTracker = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return;
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
      formId="FRM-01272"
      title="Corporate Action Tracker Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Corporate Action Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01272"
              title="CORPORATE ACTION TRACKER LOG"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">1. General Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"departmentName","Department")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"date","Date","date")}
                </div>
              </div>

              {/* ACTION TRACKER TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">2. Action Tracker</h3>

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
                        setFieldValue("actionTracker", [
                          ...values.actionTracker,
                          {
                            actionId: "",
                            actionDescription: "",
                            owner: "",
                            startDate: "",
                            dueDate: "",
                            status: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="actionTracker">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Action ID</th>
                          <th>Action Description</th>
                          <th>Owner</th>
                          <th>Start Date</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.actionTracker.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`actionTracker.${index}.actionId`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`actionTracker.${index}.actionDescription`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`actionTracker.${index}.owner`} className="form-input"/>
                            </td>
                            <td>
                              <Field type="date" name={`actionTracker.${index}.startDate`} className="form-input"/>
                            </td>
                            <td>
                              <Field type="date" name={`actionTracker.${index}.dueDate`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`actionTracker.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>On Hold</option>
                                <option>Cancelled</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`actionTracker.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`actionTracker.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* REVIEW NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">3. Review Notes</h3>
                <div className="form-fields">
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"risksIssues","Risks / Issues")}
                  {field(values,"nextSteps","Next Steps")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">4. Sign-off</h3>

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
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
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
                    Submit Action Tracker
                  </button>
                </div>
              }

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01272_CorporateActionTracker;