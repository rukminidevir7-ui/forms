// FRM01819_HazardIdentificationReport.jsx
// FRM-01819 – Hazard Identification
// Enterprise Grade – HSE Hazard & Risk Management

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
  hazardId: Yup.string().required("Required"),
  dateIdentified: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01819",
  hazardId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  dateIdentified: "",
  workActivity: "",
  status: "",

  reporterName: "",
  employeeId: "",
  designation: "",
  reporterDepartment: "",
  contactNumber: "",
  emailId: "",

  hazardDescription: "",
  hazardCategory: "",
  hazardLocation: "",
  potentialConsequence: "",
  personsExposed: "",
  existingControls: "",

  riskAssessments: [
    {
      likelihoodRating: "",
      severityRating: "",
      riskScore: "",
      riskLevel: "",
      additionalControls: "",
      responsiblePerson: "",
      targetDate: "",
      completionDate: "",
      verificationDate: "",
      verifiedBy: "",
      assessmentStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  photoAttached: "",
  riskSheetAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Submitted By", data: {} },
    { roleName: "Reviewed By (HSE)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01819_HazardIdentificationReport = () => {

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
    <ModernFormWrapper formId="FRM-01819" title="Hazard Identification">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Hazard Identification Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01819"
              title="HAZARD IDENTIFICATION"
              department="HSE / EHS – Hazard Management"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"hazardId","Hazard ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"dateIdentified","Date Identified","date")}
                  {field(values,"workActivity","Work Activity")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Reporter Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reporter Details</h3>
                <div className="form-fields">
                  {field(values,"reporterName","Name")}
                  {field(values,"employeeId","Employee ID / Contractor ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"reporterDepartment","Department / Company")}
                  {field(values,"contactNumber","Contact Number")}
                  {field(values,"emailId","Email ID")}
                </div>
              </div>

              {/* Hazard Details */}
              <div className="form-section">
                <h3 className="form-section-title">Hazard Details</h3>
                <div className="form-fields">
                  {field(values,"hazardDescription","Hazard Description","text",true)}

                  <div className="form-field">
                    <label className="form-label">Hazard Category</label>
                    {isPrintMode
                      ? <div className="print-value">{values.hazardCategory || "-"}</div>
                      : <Field as="select" name="hazardCategory" className="form-input">
                          <option value="">Select</option>
                          <option>Physical</option>
                          <option>Chemical</option>
                          <option>Biological</option>
                          <option>Ergonomic</option>
                          <option>Environmental</option>
                          <option>Other</option>
                        </Field>
                    }
                  </div>

                  {field(values,"hazardLocation","Location of Hazard")}
                  {field(values,"potentialConsequence","Potential Consequence","text",true)}
                  {field(values,"personsExposed","Persons Exposed")}
                  {field(values,"existingControls","Existing Controls","text",true)}
                </div>
              </div>

              {/* Risk Assessment Table */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment Details</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("riskAssessments",
                        [...values.riskAssessments,{
                          likelihoodRating:"",
                          severityRating:"",
                          riskScore:"",
                          riskLevel:"",
                          additionalControls:"",
                          responsiblePerson:"",
                          targetDate:"",
                          completionDate:"",
                          verificationDate:"",
                          verifiedBy:"",
                          assessmentStatus:"",
                          remarks:"",
                          dynamicFields:{}
                        }]
                      )}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="riskAssessments">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Likelihood</th>
                          <th>Severity</th>
                          <th>Risk Score</th>
                          <th>Risk Level</th>
                          <th>Additional Controls</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Completion Date</th>
                          <th>Verification Date</th>
                          <th>Verified By</th>
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
                        {values.riskAssessments.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {["likelihoodRating","severityRating","riskScore"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field name={`riskAssessments.${index}.${fieldName}`} className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field as="select"
                                    name={`riskAssessments.${index}.riskLevel`}
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
                                ? row.additionalControls || "-"
                                : <Field as="textarea"
                                    name={`riskAssessments.${index}.additionalControls`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.responsiblePerson || "-"
                                : <Field name={`riskAssessments.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            {["targetDate","completionDate","verificationDate"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field type="date"
                                      name={`riskAssessments.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.verifiedBy || "-"
                                : <Field name={`riskAssessments.${index}.verifiedBy`} className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.assessmentStatus || "-"
                                : <Field as="select"
                                    name={`riskAssessments.${index}.assessmentStatus`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Open</option>
                                    <option>Closed</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.remarks || "-"
                                : <Field as="textarea"
                                    name={`riskAssessments.${index}.remarks`}
                                    className="form-input"/>
                              }
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`riskAssessments.${index}.dynamicFields.${col.key}`}
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

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"photoAttached","Photographic Evidence Attached (Yes/No)")}
                  {field(values,"riskSheetAttached","Risk Assessment Sheet Attached (Yes/No)")}
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

export default FRM01819_HazardIdentificationReport;