// FRM01829_RiskAssessmentNewActivity.jsx
// FRM-01829 – Risk Assessment for New Activity (Checklist)
// Enterprise Grade – HSE Hazard Risk Governance

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
  assessmentId: Yup.string().required("Required"),
  newActivityName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01829",
  checklistNumber: "",
  assessmentId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  newActivityName: "",
  proposedStartDate: "",
  assessmentDate: "",
  status: "",

  activityDescription: "",
  reasonForIntroduction: "",
  processEquipmentInvolved: "",
  manpowerRequirement: "",
  materialsUsed: "",

  hazardEntries: [
    {
      activityStep: "",
      hazardIdentified: "",
      hazardType: "",
      potentialConsequence: "",
      likelihoodRating: "",
      severityRating: "",
      riskScore: "",
      riskLevel: "",
      controlMeasures: "",
      responsiblePerson: "",
      targetDate: "",
      residualRiskLevel: "",
      entryStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  permitRequired: "",
  trainingRequired: "",
  emergencyRequired: "",

  riskMatrixAttached: "",
  layoutDrawingAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01829_RiskAssessmentNewActivity = () => {

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
    <ModernFormWrapper formId="FRM-01829" title="Risk Assessment for New Activity">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Risk Assessment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01829"
              title="RISK ASSESSMENT FOR NEW ACTIVITY"
              department="HSE / EHS – Risk Assessment"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"checklistNumber","Checklist Number")}
                  {field(values,"assessmentId","Assessment ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"newActivityName","New Activity Name")}
                  {field(values,"proposedStartDate","Proposed Start Date","date")}
                  {field(values,"assessmentDate","Assessment Date","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= ACTIVITY DESCRIPTION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Activity Description</h3>
                <div className="form-fields">
                  {field(values,"activityDescription","Detailed Description of New Activity","text",true)}
                  {field(values,"reasonForIntroduction","Reason for Introduction","text",true)}
                  {field(values,"processEquipmentInvolved","Process / Equipment Involved","text",true)}
                  {field(values,"manpowerRequirement","Manpower Requirement")}
                  {field(values,"materialsUsed","Materials / Chemicals Used","text",true)}
                </div>
              </div>

              {/* ================= HAZARD TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Hazard & Risk Evaluation Details</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("hazardEntries",
                        [...values.hazardEntries,{
                          activityStep:"",
                          hazardIdentified:"",
                          hazardType:"",
                          potentialConsequence:"",
                          likelihoodRating:"",
                          severityRating:"",
                          riskScore:"",
                          riskLevel:"",
                          controlMeasures:"",
                          responsiblePerson:"",
                          targetDate:"",
                          residualRiskLevel:"",
                          entryStatus:"",
                          remarks:"",
                          dynamicFields:{}
                        }]
                      )}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="hazardEntries">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Activity Step</th>
                          <th>Hazard</th>
                          <th>Type</th>
                          <th>Consequence</th>
                          <th>L</th>
                          <th>S</th>
                          <th>Risk Score</th>
                          <th>Risk Level</th>
                          <th>Control Measures</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Residual Risk</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.hazardEntries.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {["activityStep","hazardIdentified","potentialConsequence","controlMeasures","remarks"]
                              .map(fieldName=>(
                                <td key={fieldName}>
                                  {isPrintMode
                                    ? row[fieldName] || "-"
                                    : <Field as="textarea"
                                        name={`hazardEntries.${index}.${fieldName}`}
                                        className="form-input"/>
                                  }
                                </td>
                              ))
                            }

                            <td>
                              {isPrintMode
                                ? row.hazardType || "-"
                                : <Field as="select"
                                    name={`hazardEntries.${index}.hazardType`}
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
                                  : <Field name={`hazardEntries.${index}.${fieldName}`} className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field as="select"
                                    name={`hazardEntries.${index}.riskLevel`}
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
                                : <Field name={`hazardEntries.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.targetDate || "-"
                                : <Field type="date"
                                    name={`hazardEntries.${index}.targetDate`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.residualRiskLevel || "-"
                                : <Field as="select"
                                    name={`hazardEntries.${index}.residualRiskLevel`}
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
                                ? row.entryStatus || "-"
                                : <Field as="select"
                                    name={`hazardEntries.${index}.entryStatus`}
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
                                      name={`hazardEntries.${index}.dynamicFields.${col.key}`}
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

              {/* ================= COMPLIANCE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Requirements</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}

                  {["permitRequired","trainingRequired","emergencyRequired"].map(fieldName=>(
                    <div className="form-field" key={fieldName}>
                      <label className="form-label">
                        {fieldName === "permitRequired" ? "Permit Required"
                        : fieldName === "trainingRequired" ? "Training Required"
                        : "Emergency Preparedness Required"}
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

export default FRM01829_RiskAssessmentNewActivity;