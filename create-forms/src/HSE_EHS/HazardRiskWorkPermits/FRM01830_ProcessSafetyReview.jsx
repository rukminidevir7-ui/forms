// FRM01830_ProcessSafetyReview.jsx
// FRM-01830 – Process Safety Review
// Enterprise Grade – HSE Process Safety Governance

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
  reviewId: Yup.string().required("Required"),
  processName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01830",
  reviewId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  processName: "",
  reviewType: "",
  reviewDate: "",
  status: "",

  preparedBy: "",
  reviewedBy: "",
  approvedBy: "",
  teamMembers: "",

  processOverview: "",
  equipmentInvolved: "",
  materialsUsed: "",
  operatingParameters: "",
  criticalSafetySystems: "",

  processRisks: [
    {
      processStep: "",
      hazardIdentified: "",
      hazardType: "",
      potentialConsequence: "",
      existingSafeguards: "",
      likelihoodRating: "",
      severityRating: "",
      riskScore: "",
      riskLevel: "",
      recommendations: "",
      responsiblePerson: "",
      targetDate: "",
      completionDate: "",
      residualRiskLevel: "",
      entryStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  permitRequired: "",
  emergencyVerified: "",
  trainingVerified: "",

  flowDiagramAttached: "",
  riskMatrixAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By Signature", data: {} },
    { roleName: "Reviewed By Signature", data: {} },
    { roleName: "Approved By Signature", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01830_ProcessSafetyReview = () => {

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
    <ModernFormWrapper formId="FRM-01830" title="Process Safety Review">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Process Safety Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01830"
              title="PROCESS SAFETY REVIEW"
              department="HSE / EHS – Process Safety"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"reviewId","Review ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"processName","Process / System Name")}

                  <div className="form-field">
                    <label className="form-label">Review Type</label>
                    {isPrintMode
                      ? <div className="print-value">{values.reviewType || "-"}</div>
                      : <Field as="select" name="reviewType" className="form-input">
                          <option value="">Select</option>
                          <option>Initial</option>
                          <option>Periodic</option>
                          <option>Change Management</option>
                        </Field>
                    }
                  </div>

                  {field(values,"reviewDate","Review Date","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= TEAM DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Review Team Details</h3>
                <div className="form-fields">
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"reviewedBy","Reviewed By (HSE)")}
                  {field(values,"approvedBy","Approved By (Plant Head / Management)")}
                  {field(values,"teamMembers","Team Members Involved","text",true)}
                </div>
              </div>

              {/* ================= PROCESS DESCRIPTION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Process Description</h3>
                <div className="form-fields">
                  {field(values,"processOverview","Process Overview","text",true)}
                  {field(values,"equipmentInvolved","Equipment Involved","text",true)}
                  {field(values,"materialsUsed","Materials / Chemicals Used","text",true)}
                  {field(values,"operatingParameters","Operating Parameters","text",true)}
                  {field(values,"criticalSafetySystems","Critical Safety Systems","text",true)}
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
                      onClick={()=>setFieldValue("processRisks",
                        [...values.processRisks,{
                          processStep:"",
                          hazardIdentified:"",
                          hazardType:"",
                          potentialConsequence:"",
                          existingSafeguards:"",
                          likelihoodRating:"",
                          severityRating:"",
                          riskScore:"",
                          riskLevel:"",
                          recommendations:"",
                          responsiblePerson:"",
                          targetDate:"",
                          completionDate:"",
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

                <FieldArray name="processRisks">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Process Step</th>
                          <th>Hazard</th>
                          <th>Type</th>
                          <th>Consequence</th>
                          <th>Existing Safeguards</th>
                          <th>L</th>
                          <th>S</th>
                          <th>Risk Score</th>
                          <th>Risk Level</th>
                          <th>Recommendations</th>
                          <th>Responsible</th>
                          <th>Target</th>
                          <th>Completion</th>
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
                        {values.processRisks.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {["processStep","hazardIdentified","potentialConsequence","existingSafeguards","recommendations","remarks"]
                              .map(fieldName=>(
                                <td key={fieldName}>
                                  {isPrintMode
                                    ? row[fieldName] || "-"
                                    : <Field as="textarea"
                                        name={`processRisks.${index}.${fieldName}`}
                                        className="form-input"/>
                                  }
                                </td>
                              ))
                            }

                            <td>
                              {isPrintMode
                                ? row.hazardType || "-"
                                : <Field name={`processRisks.${index}.hazardType`} className="form-input"/>
                              }
                            </td>

                            {["likelihoodRating","severityRating","riskScore"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field name={`processRisks.${index}.${fieldName}`} className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field as="select"
                                    name={`processRisks.${index}.riskLevel`}
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
                                : <Field name={`processRisks.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            {["targetDate","completionDate"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field type="date"
                                      name={`processRisks.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.residualRiskLevel || "-"
                                : <Field name={`processRisks.${index}.residualRiskLevel`} className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.entryStatus || "-"
                                : <Field as="select"
                                    name={`processRisks.${index}.entryStatus`}
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
                                      name={`processRisks.${index}.dynamicFields.${col.key}`}
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
                <h3 className="form-section-title">Compliance & Control Verification</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}

                  {["permitRequired","emergencyVerified","trainingVerified"].map(fieldName=>(
                    <div className="form-field" key={fieldName}>
                      <label className="form-label">
                        {fieldName === "permitRequired"
                          ? "Permit Required"
                          : fieldName === "emergencyVerified"
                          ? "Emergency Preparedness Verified"
                          : "Training Verified"}
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

export default FRM01830_ProcessSafetyReview;