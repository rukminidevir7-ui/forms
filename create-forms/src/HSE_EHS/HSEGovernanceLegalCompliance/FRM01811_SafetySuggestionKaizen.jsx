// FRM01811_SafetySuggestionKaizen.jsx
// FRM-01811 / 01812 / 01813 – Safety Suggestion / Kaizen (Universal)
// Enterprise Grade – HSE Governance & Continuous Improvement

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
  suggestionId: Yup.string().required("Required"),
  employeeName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01811",
  suggestionId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  submissionDate: "",
  category: "",
  status: "",

  employeeName: "",
  employeeId: "",
  designation: "",
  employeeDepartment: "",
  contactNumber: "",
  emailId: "",

  problemDescription: "",
  currentRisk: "",
  proposedImprovement: "",
  expectedBenefits: "",
  estimatedCost: "",
  riskReductionLevel: "",

  evaluations: [
    {
      evaluationCriteria: "",
      impactLevel: "",
      feasibility: "",
      implementationRequired: "",
      responsiblePerson: "",
      targetDate: "",
      implementationStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  decision: "",
  decisionReason: "",
  rewardApplicable: "",
  implementationCompletionDate: "",

  applicableActRule: "",
  complianceImpacted: "",

  photosAttached: "",
  riskAssessmentAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Submitted By", data: {} },
    { roleName: "Reviewed By (HSE)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01811_SafetySuggestionKaizen = () => {

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

  const field = (values, name, label, type="text", textarea=false) => (
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
    <ModernFormWrapper formId="FRM-01811" title="Safety Suggestion / Kaizen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Safety Suggestion Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01811"
              title="SAFETY SUGGESTION / KAIZEN"
              department="HSE / EHS – Continuous Improvement"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"suggestionId","Suggestion ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"submissionDate","Submission Date","date")}

                  <div className="form-field">
                    <label className="form-label">Category</label>
                    {isPrintMode
                      ? <div className="print-value">{values.category || "-"}</div>
                      : <Field as="select" name="category" className="form-input">
                          <option value="">Select</option>
                          <option>Safety</option>
                          <option>Health</option>
                          <option>Environment</option>
                          <option>Process Improvement</option>
                        </Field>
                    }
                  </div>

                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Suggestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Suggestor Details</h3>
                <div className="form-fields">
                  {field(values,"employeeName","Employee Name")}
                  {field(values,"employeeId","Employee ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"employeeDepartment","Department")}
                  {field(values,"contactNumber","Contact Number")}
                  {field(values,"emailId","Email ID")}
                </div>
              </div>

              {/* Suggestion Details */}
              <div className="form-section">
                <h3 className="form-section-title">Suggestion Details</h3>
                <div className="form-fields">
                  {field(values,"problemDescription","Problem Description","text",true)}
                  {field(values,"currentRisk","Current Risk / Issue Identified","text",true)}
                  {field(values,"proposedImprovement","Proposed Improvement","text",true)}
                  {field(values,"expectedBenefits","Expected Benefits","text",true)}
                  {field(values,"estimatedCost","Estimated Cost")}
                  {field(values,"riskReductionLevel","Estimated Risk Reduction Level")}
                </div>
              </div>

              {/* Evaluation Table */}
              <div className="form-section">
                <h3 className="form-section-title">Evaluation Details</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit" style={{marginLeft:10}}
                      onClick={()=>setFieldValue("evaluations",
                        [...values.evaluations,{
                          evaluationCriteria:"",
                          impactLevel:"",
                          feasibility:"",
                          implementationRequired:"",
                          responsiblePerson:"",
                          targetDate:"",
                          implementationStatus:"",
                          remarks:"",
                          dynamicFields:{}
                        }]
                      )}>
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="evaluations">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Evaluation Criteria</th>
                          <th>Impact Level</th>
                          <th>Feasibility</th>
                          <th>Implementation Required</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
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
                        {values.evaluations.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            <td>
                              {isPrintMode
                                ? row.evaluationCriteria || "-"
                                : <Field name={`evaluations.${index}.evaluationCriteria`} className="form-input"/>
                              }
                            </td>

                            {["impactLevel","feasibility"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field as="select"
                                      name={`evaluations.${index}.${fieldName}`}
                                      className="form-input">
                                      <option value="">Select</option>
                                      <option>Low</option>
                                      <option>Medium</option>
                                      <option>High</option>
                                    </Field>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.implementationRequired || "-"
                                : <Field as="select"
                                    name={`evaluations.${index}.implementationRequired`}
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
                                : <Field name={`evaluations.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.targetDate || "-"
                                : <Field type="date"
                                    name={`evaluations.${index}.targetDate`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.implementationStatus || "-"
                                : <Field name={`evaluations.${index}.implementationStatus`} className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.remarks || "-"
                                : <Field as="textarea"
                                    name={`evaluations.${index}.remarks`}
                                    className="form-input"/>
                              }
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`evaluations.${index}.dynamicFields.${col.key}`}
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

              {/* Decision Section */}
              <div className="form-section">
                <h3 className="form-section-title">Decision & Approval</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Decision</label>
                    {isPrintMode
                      ? <div className="print-value">{values.decision || "-"}</div>
                      : <Field as="select" name="decision" className="form-input">
                          <option value="">Select</option>
                          <option>Approved</option>
                          <option>Rejected</option>
                          <option>Deferred</option>
                        </Field>
                    }
                  </div>

                  {field(values,"decisionReason","Reason for Decision","text",true)}

                  <div className="form-field">
                    <label className="form-label">Reward / Recognition Applicable</label>
                    {isPrintMode
                      ? <div className="print-value">{values.rewardApplicable || "-"}</div>
                      : <Field as="select" name="rewardApplicable" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>

                  {field(values,"implementationCompletionDate","Implementation Completion Date","date")}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  <div className="form-field">
                    <label className="form-label">Compliance Obligation Impacted</label>
                    {isPrintMode
                      ? <div className="print-value">{values.complianceImpacted || "-"}</div>
                      : <Field as="select" name="complianceImpacted" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>
                </div>
              </div>

              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"photosAttached","Supporting Photos Attached (Yes/No)")}
                  {field(values,"riskAssessmentAttached","Risk Assessment Attached (Yes/No)")}
                  {field(values,"uploadReferenceId","Upload Reference ID")}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
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

export default FRM01811_SafetySuggestionKaizen;