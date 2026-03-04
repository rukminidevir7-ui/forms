// FRM01817_SafetyNonComplianceNotice.jsx
// FRM-01817 – Safety Non-Compliance Notice
// Enterprise Grade – HSE Governance & Enforcement

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
  noticeNumber: Yup.string().required("Required"),
  issueDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01817",
  noticeNumber: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  issueDate: "",
  referenceType: "",
  severityLevel: "",
  status: "",

  partyName: "",
  employeeId: "",
  designation: "",
  partyDepartment: "",
  workLocation: "",
  contactNumber: "",

  nonComplianceDescription: "",
  applicableClause: "",
  category: "",
  riskLevel: "",
  potentialConsequence: "",

  correctiveActions: [
    {
      correctiveDescription: "",
      responsiblePerson: "",
      targetDate: "",
      completionDate: "",
      verificationBy: "",
      correctiveStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  closureDeadline: "",
  escalationRequired: "",
  escalationLevel: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceImpacted: "",

  photoAttached: "",
  supportingDocsAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Issued By (HSE)", data: {} },
    { roleName: "Reviewed By (Department Head)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01817_SafetyNonComplianceNotice = () => {

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
    <ModernFormWrapper formId="FRM-01817" title="Safety Non-Compliance Notice">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Safety Non-Compliance Notice Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01817"
              title="SAFETY NON-COMPLIANCE NOTICE"
              department="HSE / EHS – Governance & Enforcement"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"noticeNumber","Notice Number")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"issueDate","Date of Issue","date")}

                  <div className="form-field">
                    <label className="form-label">Reference</label>
                    {isPrintMode
                      ? <div className="print-value">{values.referenceType || "-"}</div>
                      : <Field as="select" name="referenceType" className="form-input">
                          <option value="">Select</option>
                          <option>Audit</option>
                          <option>Inspection</option>
                          <option>Incident</option>
                          <option>Observation</option>
                        </Field>
                    }
                  </div>

                  <div className="form-field">
                    <label className="form-label">Severity Level</label>
                    {isPrintMode
                      ? <div className="print-value">{values.severityLevel || "-"}</div>
                      : <Field as="select" name="severityLevel" className="form-input">
                          <option value="">Select</option>
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </Field>
                    }
                  </div>

                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Concerned Party */}
              <div className="form-section">
                <h3 className="form-section-title">Concerned Party Details</h3>
                <div className="form-fields">
                  {field(values,"partyName","Employee / Contractor Name")}
                  {field(values,"employeeId","Employee ID / Contractor ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"partyDepartment","Department / Company Name")}
                  {field(values,"workLocation","Work Location")}
                  {field(values,"contactNumber","Contact Number")}
                </div>
              </div>

              {/* Non-Compliance Details */}
              <div className="form-section">
                <h3 className="form-section-title">Non-Compliance Details</h3>
                <div className="form-fields">
                  {field(values,"nonComplianceDescription","Description of Non-Compliance","text",true)}
                  {field(values,"applicableClause","Applicable Procedure / Standard / Legal Clause")}
                  
                  <div className="form-field">
                    <label className="form-label">Category</label>
                    {isPrintMode
                      ? <div className="print-value">{values.category || "-"}</div>
                      : <Field as="select" name="category" className="form-input">
                          <option value="">Select</option>
                          <option>Safety</option>
                          <option>Health</option>
                          <option>Environment</option>
                        </Field>
                    }
                  </div>

                  {field(values,"riskLevel","Risk Level")}
                  {field(values,"potentialConsequence","Potential Consequence","text",true)}
                </div>
              </div>

              {/* Corrective Actions Table */}
              <div className="form-section">
                <h3 className="form-section-title">Corrective Action Requirements</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit" style={{marginLeft:10}}
                      onClick={()=>setFieldValue("correctiveActions",
                        [...values.correctiveActions,{
                          correctiveDescription:"",
                          responsiblePerson:"",
                          targetDate:"",
                          completionDate:"",
                          verificationBy:"",
                          correctiveStatus:"",
                          remarks:"",
                          dynamicFields:{}
                        }]
                      )}>
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="correctiveActions">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Corrective Action</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Completion Date</th>
                          <th>Verification By</th>
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
                        {values.correctiveActions.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            <td>
                              {isPrintMode
                                ? row.correctiveDescription || "-"
                                : <Field as="textarea"
                                    name={`correctiveActions.${index}.correctiveDescription`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.responsiblePerson || "-"
                                : <Field
                                    name={`correctiveActions.${index}.responsiblePerson`}
                                    className="form-input"/>
                              }
                            </td>

                            {["targetDate","completionDate"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field
                                      type="date"
                                      name={`correctiveActions.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.verificationBy || "-"
                                : <Field
                                    name={`correctiveActions.${index}.verificationBy`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.correctiveStatus || "-"
                                : <Field as="select"
                                    name={`correctiveActions.${index}.correctiveStatus`}
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
                                    name={`correctiveActions.${index}.remarks`}
                                    className="form-input"/>
                              }
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`correctiveActions.${index}.dynamicFields.${col.key}`}
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

              {/* Compliance Timeline */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Timeline</h3>
                <div className="form-fields">
                  {field(values,"closureDeadline","Deadline for Closure","date")}

                  <div className="form-field">
                    <label className="form-label">Escalation Required</label>
                    {isPrintMode
                      ? <div className="print-value">{values.escalationRequired || "-"}</div>
                      : <Field as="select" name="escalationRequired" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>

                  <div className="form-field">
                    <label className="form-label">Escalation Level</label>
                    {isPrintMode
                      ? <div className="print-value">{values.escalationLevel || "-"}</div>
                      : <Field as="select" name="escalationLevel" className="form-input">
                          <option value="">Select</option>
                          <option>Supervisor</option>
                          <option>Manager</option>
                          <option>Management</option>
                        </Field>
                    }
                  </div>
                </div>
              </div>

              {/* Legal */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
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
                  {field(values,"photoAttached","Photographic Evidence Attached (Yes/No)")}
                  {field(values,"supportingDocsAttached","Supporting Documents Attached (Yes/No)")}
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

export default FRM01817_SafetyNonComplianceNotice;