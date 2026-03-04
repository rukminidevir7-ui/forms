// FRM01833_PreTaskRiskAssessment.jsx
// FRM-01833 – Pre-Task Risk Assessment Checklist
// Enterprise Grade – Operational Risk Control

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
  taskName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01833",
  checklistNumber: "",
  taskName: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  date: "",
  time: "",
  workPermitNumber: "",
  status: "",

  supervisorName: "",
  teamMembers: "",
  contractorName: "",
  totalWorkforce: "",

  hazardChecklist: [
    {
      hazardIdentified: "",
      hazardCategory: "",
      potentialConsequence: "",
      existingControls: "",
      additionalControls: "",
      responsiblePerson: "",
      verifiedBeforeStart: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  ppeConfirmed: "",
  toolsInspected: "",
  emergencyAvailable: "",
  isolationVerified: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  permitRequired: "",

  approvalRoles: [
    { roleName: "Checklist Completed By", data: {} },
    { roleName: "Supervisor Approval", data: {} },
    { roleName: "HSE Verification", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01833_PreTaskRiskAssessment = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, '');
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values,name,label,type="text",textarea=false)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : textarea
          ? <Field as="textarea" name={name} className="form-input" rows="3"/>
          : <Field name={name} type={type} className="form-input"/>
      }
      <ErrorMessage name={name} component="div" className="form-error"/>
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01833" title="Pre-Task Risk Assessment Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Pre-Task Risk Assessment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01833"
              title="PRE-TASK RISK ASSESSMENT CHECKLIST"
              department="HSE / EHS – Operational Safety"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"checklistNumber","Checklist Number")}
                  {field(values,"taskName","Task Name")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"date","Date","date")}
                  {field(values,"time","Time","time")}
                  {field(values,"workPermitNumber","Work Permit Number")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= TASK TEAM DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Task Team Details</h3>
                <div className="form-fields">
                  {field(values,"supervisorName","Supervisor Name")}
                  {field(values,"teamMembers","Team Members","text",true)}
                  {field(values,"contractorName","Contractor Name")}
                  {field(values,"totalWorkforce","Total Workforce Strength")}
                </div>
              </div>

              {/* ================= HAZARD CHECKLIST TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Hazard Identification & Control Checklist</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("hazardChecklist",[
                        ...values.hazardChecklist,
                        {
                          hazardIdentified:"",
                          hazardCategory:"",
                          potentialConsequence:"",
                          existingControls:"",
                          additionalControls:"",
                          responsiblePerson:"",
                          verifiedBeforeStart:"",
                          remarks:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="hazardChecklist">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Hazard</th>
                          <th>Category</th>
                          <th>Consequence</th>
                          <th>Existing Controls</th>
                          <th>Additional Controls</th>
                          <th>Responsible</th>
                          <th>Verified Before Start</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.hazardChecklist.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {["hazardIdentified","potentialConsequence","additionalControls","remarks"]
                              .map(fieldName=>(
                                <td key={fieldName}>
                                  {isPrintMode
                                    ? row[fieldName] || "-"
                                    : <Field as="textarea"
                                        name={`hazardChecklist.${index}.${fieldName}`}
                                        className="form-input"/>
                                  }
                                </td>
                              ))
                            }

                            <td>
                              {isPrintMode
                                ? row.hazardCategory || "-"
                                : <Field name={`hazardChecklist.${index}.hazardCategory`} className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.existingControls || "-"
                                : <Field as="select"
                                    name={`hazardChecklist.${index}.existingControls`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.responsiblePerson || "-"
                                : <Field name={`hazardChecklist.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.verifiedBeforeStart || "-"
                                : <Field as="select"
                                    name={`hazardChecklist.${index}.verifiedBeforeStart`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                  </Field>
                              }
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`hazardChecklist.${index}.dynamicFields.${col.key}`}
                                      className="form-input"/>
                                }
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

              {/* ================= PPE & SAFETY VERIFICATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">PPE & Safety Verification</h3>
                <div className="form-fields">
                  {["ppeConfirmed","toolsInspected","emergencyAvailable","isolationVerified"]
                    .map(fieldName=>(
                      <div className="form-field" key={fieldName}>
                        <label className="form-label">
                          {fieldName==="ppeConfirmed"?"Required PPE Confirmed":
                           fieldName==="toolsInspected"?"Tools & Equipment Inspected":
                           fieldName==="emergencyAvailable"?"Emergency Equipment Available":
                           "Isolation / Lockout Verified"}
                        </label>
                        {isPrintMode
                          ? <div className="print-value">{values[fieldName] || "-"}</div>
                          : <Field as="select" name={fieldName} className="form-input">
                              <option value="">Select</option>
                              <option>Yes</option>
                              <option>No</option>
                            </Field>
                        }
                      </div>
                    ))}
                </div>
              </div>

              {/* ================= COMPLIANCE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}

                  <div className="form-field">
                    <label className="form-label">Permit Required</label>
                    {isPrintMode
                      ? <div className="print-value">{values.permitRequired || "-"}</div>
                      : <Field as="select" name="permitRequired" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({roleName:"New Role",data:{}})}>
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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01833_PreTaskRiskAssessment;