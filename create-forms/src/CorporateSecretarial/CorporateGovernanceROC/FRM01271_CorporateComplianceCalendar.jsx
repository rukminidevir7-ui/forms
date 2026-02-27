// FRM01271_CorporateComplianceCalendar.jsx
// FRM-01271 – Corporate Compliance Calendar Log
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
  formId: "FRM-01271",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  financialYear: "",
  departmentName: "",
  preparedBy: "",
  date: "",

  complianceSchedule: [
    { 
      complianceItem: "", 
      applicableLaw: "", 
      dueDate: "", 
      owner: "", 
      status: "", 
      remarks: "", 
      dynamicFields: {} 
    }
  ],

  observations: "",
  actionRequired: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01271_CorporateComplianceCalendar = () => {

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
      formId="FRM-01271"
      title="Corporate Compliance Calendar Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Corporate Compliance Calendar Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01271"
              title="CORPORATE COMPLIANCE CALENDAR LOG"
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

              {/* COMPLIANCE SCHEDULE */}
              <div className="form-section">
                <h3 className="form-section-title">2. Compliance Schedule</h3>

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
                        setFieldValue("complianceSchedule", [
                          ...values.complianceSchedule,
                          { 
                            complianceItem: "", 
                            applicableLaw: "", 
                            dueDate: "", 
                            owner: "", 
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

                <FieldArray name="complianceSchedule">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl. No.</th>
                          <th>Compliance Item</th>
                          <th>Applicable Law / Regulation</th>
                          <th>Due Date</th>
                          <th>Owner</th>
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
                        {values.complianceSchedule.map((row,index)=>(
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <Field name={`complianceSchedule.${index}.complianceItem`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`complianceSchedule.${index}.applicableLaw`} className="form-input"/>
                            </td>
                            <td>
                              <Field type="date" name={`complianceSchedule.${index}.dueDate`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`complianceSchedule.${index}.owner`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`complianceSchedule.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Pending</option>
                                <option>Completed</option>
                                <option>In Progress</option>
                                <option>Not Applicable</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`complianceSchedule.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`complianceSchedule.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                  {field(values,"observations","Observations")}
                  {field(values,"actionRequired","Action Required")}
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
                    Submit Compliance Calendar
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

export default FRM01271_CorporateComplianceCalendar;