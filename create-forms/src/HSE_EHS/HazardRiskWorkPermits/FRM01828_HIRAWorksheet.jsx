// FRM01828_HIRAWorksheet.jsx
// FRM-01828 – HIRA Worksheet
// Enterprise Grade – Hazard Identification & Risk Assessment

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
  hiraId: Yup.string().required("Required"),
  activityProcessName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01828",
  hiraId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  activityProcessName: "",
  assessmentDate: "",
  assessmentType: "",
  status: "",

  preparedBy: "",
  reviewedBy: "",
  approvedBy: "",
  teamMembers: "",

  hiraEntries: [
    {
      activityStep: "",
      hazardIdentified: "",
      hazardCategory: "",
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
      residualRiskLevel: "",
      entryStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  riskMatrixAttached: "",
  workPermitLinked: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Assessment Completed By", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01828_HIRAWorksheet = () => {

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
    <ModernFormWrapper formId="FRM-01828" title="HIRA Worksheet">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HIRA Worksheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01828"
              title="HIRA WORKSHEET"
              department="HSE / EHS – Hazard Risk Management"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"hiraId","HIRA ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"activityProcessName","Activity / Process Name")}
                  {field(values,"assessmentDate","Assessment Date","date")}

                  <div className="form-field">
                    <label className="form-label">Assessment Type</label>
                    {isPrintMode
                      ? <div className="print-value">{values.assessmentType || "-"}</div>
                      : <Field as="select" name="assessmentType" className="form-input">
                          <option value="">Select</option>
                          <option>Routine</option>
                          <option>Non-Routine</option>
                          <option>Emergency</option>
                        </Field>
                    }
                  </div>

                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= TEAM DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Assessment Team Details</h3>
                <div className="form-fields">
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"reviewedBy","Reviewed By (HSE)")}
                  {field(values,"approvedBy","Approved By (Department Head)")}
                  {field(values,"teamMembers","Team Members Involved","text",true)}
                </div>
              </div>

              {/* ================= HIRA TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Hazard Identification & Risk Assessment</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("hiraEntries",
                        [...values.hiraEntries,{
                          activityStep:"",
                          hazardIdentified:"",
                          hazardCategory:"",
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

                <FieldArray name="hiraEntries">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Activity Step</th>
                          <th>Hazard</th>
                          <th>Category</th>
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
                        {values.hiraEntries.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {["activityStep","hazardIdentified","potentialConsequence","existingControls","additionalControls","remarks"]
                              .map(fieldName=>(
                                <td key={fieldName}>
                                  {isPrintMode
                                    ? row[fieldName] || "-"
                                    : <Field as="textarea"
                                        name={`hiraEntries.${index}.${fieldName}`}
                                        className="form-input"/>
                                  }
                                </td>
                              ))
                            }

                            <td>
                              {isPrintMode
                                ? row.hazardCategory || "-"
                                : <Field as="select"
                                    name={`hiraEntries.${index}.hazardCategory`}
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
                                  : <Field name={`hiraEntries.${index}.${fieldName}`} className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field as="select"
                                    name={`hiraEntries.${index}.riskLevel`}
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
                                : <Field name={`hiraEntries.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            {["targetDate","completionDate"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field type="date"
                                      name={`hiraEntries.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.residualRiskLevel || "-"
                                : <Field as="select"
                                    name={`hiraEntries.${index}.residualRiskLevel`}
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
                                    name={`hiraEntries.${index}.entryStatus`}
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
                                      name={`hiraEntries.${index}.dynamicFields.${col.key}`}
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

export default FRM01828_HIRAWorksheet;