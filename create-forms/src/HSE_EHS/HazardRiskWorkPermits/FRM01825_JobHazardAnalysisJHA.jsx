// FRM01825_JobHazardAnalysisJHA.jsx
// FRM-01825 – Job Hazard Analysis (JHA)
// Enterprise Grade – HSE Hazard Risk Work Control

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
  jhaId: Yup.string().required("Required"),
  jobTaskName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01825",
  jhaId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  jobTaskName: "",
  workPermitRequired: "",
  dateOfAnalysis: "",
  reviewFrequency: "",
  status: "",

  preparedBy: "",
  reviewedBy: "",
  approvedBy: "",
  teamMembers: "",

  taskAnalysis: [
    {
      taskStep: "",
      hazardIdentified: "",
      hazardType: "",
      potentialConsequence: "",
      existingControls: "",
      likelihoodRating: "",
      severityRating: "",
      riskScore: "",
      riskLevel: "",
      additionalControls: "",
      responsiblePerson: "",
      targetDate: "",
      completionDate: "",
      verificationDate: "",
      stepStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  requiredPPE: "",
  isolationRequired: "",
  emergencyPreparedness: "",
  specialInstructions: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  workPermitAttached: "",
  supportingRiskAttached: "",
  uploadReferenceId: "",

  jhaCommunicated: "",
  communicationDate: "",
  authorizedSignature: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE)", data: {} },
    { roleName: "Approved By (Supervisor/Manager)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01825_JobHazardAnalysisJHA = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g,'');
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
    <ModernFormWrapper formId="FRM-01825" title="Job Hazard Analysis (JHA)">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("JHA Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01825"
              title="JOB HAZARD ANALYSIS (JHA)"
              department="HSE / EHS – Hazard Risk Work Permits"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"jhaId","JHA ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"jobTaskName","Job / Task Name")}
                  
                  <div className="form-field">
                    <label className="form-label">Work Permit Required</label>
                    {isPrintMode
                      ? <div className="print-value">{values.workPermitRequired || "-"}</div>
                      : <Field as="select" name="workPermitRequired" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>

                  {field(values,"dateOfAnalysis","Date of Analysis","date")}
                  {field(values,"reviewFrequency","Review Frequency")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= TEAM DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Analysis Team Details</h3>
                <div className="form-fields">
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"reviewedBy","Reviewed By (HSE)")}
                  {field(values,"approvedBy","Approved By (Supervisor/Manager)")}
                  {field(values,"teamMembers","Team Members Involved","text",true)}
                </div>
              </div>

              {/* ================= TASK & HAZARD TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Task & Hazard Analysis Details</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("taskAnalysis",
                        [...values.taskAnalysis,{
                          taskStep:"",
                          hazardIdentified:"",
                          hazardType:"",
                          potentialConsequence:"",
                          existingControls:"",
                          likelihoodRating:"",
                          severityRating:"",
                          riskScore:"",
                          riskLevel:"",
                          additionalControls:"",
                          responsiblePerson:"",
                          targetDate:"",
                          completionDate:"",
                          verificationDate:"",
                          stepStatus:"",
                          remarks:"",
                          dynamicFields:{}
                        }]
                      )}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="taskAnalysis">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Task Step</th>
                          <th>Hazard</th>
                          <th>Hazard Type</th>
                          <th>Consequence</th>
                          <th>Existing Controls</th>
                          <th>L</th>
                          <th>S</th>
                          <th>Risk Score</th>
                          <th>Risk Level</th>
                          <th>Additional Controls</th>
                          <th>Responsible</th>
                          <th>Target</th>
                          <th>Completion</th>
                          <th>Verification</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.taskAnalysis.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {["taskStep","hazardIdentified","potentialConsequence","existingControls","additionalControls","remarks"]
                              .map(fieldName=>(
                                <td key={fieldName}>
                                  {isPrintMode
                                    ? row[fieldName] || "-"
                                    : <Field as="textarea"
                                        name={`taskAnalysis.${index}.${fieldName}`}
                                        className="form-input"/>
                                  }
                                </td>
                              ))
                            }

                            <td>
                              {isPrintMode
                                ? row.hazardType || "-"
                                : <Field as="select"
                                    name={`taskAnalysis.${index}.hazardType`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Physical</option>
                                    <option>Chemical</option>
                                    <option>Biological</option>
                                    <option>Ergonomic</option>
                                    <option>Environmental</option>
                                    <option>Other</option>
                                  </Field>
                              }
                            </td>

                            {["likelihoodRating","severityRating","riskScore"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field name={`taskAnalysis.${index}.${fieldName}`} className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field as="select"
                                    name={`taskAnalysis.${index}.riskLevel`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.responsiblePerson || "-"
                                : <Field name={`taskAnalysis.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            {["targetDate","completionDate","verificationDate"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field type="date"
                                      name={`taskAnalysis.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.stepStatus || "-"
                                : <Field as="select"
                                    name={`taskAnalysis.${index}.stepStatus`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Open</option>
                                    <option>Closed</option>
                                  </Field>
                              }
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`taskAnalysis.${index}.dynamicFields.${col.key}`}
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

              {/* ================= PPE & SAFETY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">PPE & Safety Controls</h3>
                <div className="form-fields">
                  {field(values,"requiredPPE","Required PPE","text",true)}

                  <div className="form-field">
                    <label className="form-label">Isolation / Lockout Required</label>
                    {isPrintMode
                      ? <div className="print-value">{values.isolationRequired || "-"}</div>
                      : <Field as="select" name="isolationRequired" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>

                  {field(values,"emergencyPreparedness","Emergency Preparedness Measures","text",true)}
                  {field(values,"specialInstructions","Special Instructions","text",true)}
                </div>
              </div>

              {/* ================= LEGAL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  <div className="form-field">
                    <label className="form-label">Compliance Obligation Linked</label>
                    {isPrintMode
                      ? <div className="print-value">{values.complianceLinked || "-"}</div>
                      : <Field as="select" name="complianceLinked" className="form-input">
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

              {/* ================= AUTHORIZATION CONFIRMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization Confirmation</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">JHA Communicated to Work Team</label>
                    {isPrintMode
                      ? <div className="print-value">{values.jhaCommunicated || "-"}</div>
                      : <Field as="select" name="jhaCommunicated" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>

                  {field(values,"communicationDate","Communication Date","date")}
                  {field(values,"authorizedSignature","Authorized Signature")}
                </div>
              </div>

              {/* ================= APPROVAL BLOCKS ================= */}
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

export default FRM01825_JobHazardAnalysisJHA;