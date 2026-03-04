// FRM01822_JobSafetyAnalysisJSA.jsx
// FRM-01822 – Job Safety Analysis (JSA)
// Enterprise Grade – HSE Hazard & Risk Work Control

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
  jsaId: Yup.string().required("Required"),
  jobDescription: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01822",
  jsaId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  jobDescription: "",
  workPermitRequired: "",
  dateOfAnalysis: "",
  status: "",

  preparedBy: "",
  reviewedBy: "",
  approvedBy: "",
  teamMembers: "",

  jobSteps: [
    {
      jobStep: "",
      hazardIdentified: "",
      potentialConsequence: "",
      existingControls: "",
      likelihoodRating: "",
      severityRating: "",
      riskScore: "",
      riskLevel: "",
      additionalControls: "",
      responsiblePerson: "",
      targetDate: "",
      stepStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  requiredPPE: "",
  isolationRequired: "",
  emergencyEquipmentAvailable: "",
  specialInstructions: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  workPermitAttached: "",
  riskSheetAttached: "",
  uploadReferenceId: "",

  jsaCommunicated: "",
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

const FRM01822_JobSafetyAnalysisJSA = () => {

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
    <ModernFormWrapper formId="FRM-01822" title="Job Safety Analysis (JSA)">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("JSA Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01822"
              title="JOB SAFETY ANALYSIS (JSA)"
              department="HSE / EHS – Hazard Risk Work Permits"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"jsaId","JSA ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"jobDescription","Job Description","text",true)}

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
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Team Details */}
              <div className="form-section">
                <h3 className="form-section-title">JSA Team Details</h3>
                <div className="form-fields">
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"reviewedBy","Reviewed By (HSE)")}
                  {field(values,"approvedBy","Approved By (Supervisor/Manager)")}
                  {field(values,"teamMembers","Team Members Involved","text",true)}
                </div>
              </div>

              {/* Job Step Table */}
              <div className="form-section">
                <h3 className="form-section-title">Job Steps & Hazard Analysis</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("jobSteps",
                        [...values.jobSteps,{
                          jobStep:"",
                          hazardIdentified:"",
                          potentialConsequence:"",
                          existingControls:"",
                          likelihoodRating:"",
                          severityRating:"",
                          riskScore:"",
                          riskLevel:"",
                          additionalControls:"",
                          responsiblePerson:"",
                          targetDate:"",
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

                <FieldArray name="jobSteps">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Job Step</th>
                          <th>Hazard</th>
                          <th>Consequence</th>
                          <th>Existing Controls</th>
                          <th>L</th>
                          <th>S</th>
                          <th>Risk Score</th>
                          <th>Risk Level</th>
                          <th>Additional Controls</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.jobSteps.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {["jobStep","hazardIdentified","potentialConsequence","existingControls","additionalControls","remarks"]
                              .map(fieldName=>(
                                <td key={fieldName}>
                                  {isPrintMode
                                    ? row[fieldName] || "-"
                                    : <Field as="textarea"
                                        name={`jobSteps.${index}.${fieldName}`}
                                        className="form-input"/>
                                  }
                                </td>
                              ))
                            }

                            {["likelihoodRating","severityRating","riskScore"]
                              .map(fieldName=>(
                                <td key={fieldName}>
                                  {isPrintMode
                                    ? row[fieldName] || "-"
                                    : <Field
                                        name={`jobSteps.${index}.${fieldName}`}
                                        className="form-input"/>
                                  }
                                </td>
                              ))
                            }

                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field as="select"
                                    name={`jobSteps.${index}.riskLevel`}
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
                                : <Field
                                    name={`jobSteps.${index}.responsiblePerson`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.targetDate || "-"
                                : <Field type="date"
                                    name={`jobSteps.${index}.targetDate`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.stepStatus || "-"
                                : <Field as="select"
                                    name={`jobSteps.${index}.stepStatus`}
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
                                      name={`jobSteps.${index}.dynamicFields.${col.key}`}
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

              {/* PPE & Safety */}
              <div className="form-section">
                <h3 className="form-section-title">PPE & Safety Requirements</h3>
                <div className="form-fields">
                  {field(values,"requiredPPE","Required PPE","text",true)}

                  {["isolationRequired","emergencyEquipmentAvailable"].map(fieldName=>(
                    <div className="form-field" key={fieldName}>
                      <label className="form-label">
                        {fieldName === "isolationRequired"
                          ? "Isolation / Lockout Required"
                          : "Emergency Equipment Available"}
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

                  {field(values,"specialInstructions","Special Instructions","text",true)}
                </div>
              </div>

              {/* Legal */}
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

              {/* Authorization Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization Confirmation</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">JSA Communicated to Work Team</label>
                    {isPrintMode
                      ? <div className="print-value">{values.jsaCommunicated || "-"}</div>
                      : <Field as="select" name="jsaCommunicated" className="form-input">
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

              {/* Approval Blocks */}
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

export default FRM01822_JobSafetyAnalysisJSA;