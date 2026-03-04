// FRM01814_StopWorkAuthorityRecord.jsx
// FRM-01814 – Stop Work Authority Record (Universal)
// Enterprise Grade – HSE Governance & Risk Control

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
  stopWorkId: Yup.string().required("Required"),
  stopWorkDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01814",
  stopWorkId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  stopWorkDate: "",
  stopWorkTime: "",
  workActivity: "",
  status: "",

  initiatorName: "",
  employeeId: "",
  designation: "",
  initiatorDepartment: "",
  contactNumber: "",

  unsafeDescription: "",
  incidentLocation: "",
  immediateRiskLevel: "",
  potentialConsequence: "",
  immediateActions: "",

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

  conditionVerifiedSafe: "",
  workResumptionDate: "",
  workResumptionTime: "",
  authorizedBy: "",
  resumptionRemarks: "",

  applicableActRule: "",
  complianceImpacted: "",

  photoAttached: "",
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

const FRM01814_StopWorkAuthorityRecord = () => {

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
    <ModernFormWrapper formId="FRM-01814" title="Stop Work Authority Record">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Stop Work Authority Record Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01814"
              title="STOP WORK AUTHORITY RECORD"
              department="HSE / EHS – Risk Intervention"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"stopWorkId","Stop Work ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"stopWorkDate","Date of Stop Work","date")}
                  {field(values,"stopWorkTime","Time of Stop Work","time")}
                  {field(values,"workActivity","Work Activity")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Initiator Details */}
              <div className="form-section">
                <h3 className="form-section-title">Initiator Details</h3>
                <div className="form-fields">
                  {field(values,"initiatorName","Name")}
                  {field(values,"employeeId","Employee ID / Contractor ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"initiatorDepartment","Department / Company")}
                  {field(values,"contactNumber","Contact Number")}
                </div>
              </div>

              {/* Hazard Details */}
              <div className="form-section">
                <h3 className="form-section-title">Hazard & Risk Details</h3>
                <div className="form-fields">
                  {field(values,"unsafeDescription","Description of Unsafe Condition / Act","text",true)}
                  {field(values,"incidentLocation","Location of Incident")}
                  
                  <div className="form-field">
                    <label className="form-label">Immediate Risk Level</label>
                    {isPrintMode
                      ? <div className="print-value">{values.immediateRiskLevel || "-"}</div>
                      : <Field as="select" name="immediateRiskLevel" className="form-input">
                          <option value="">Select</option>
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </Field>
                    }
                  </div>

                  {field(values,"potentialConsequence","Potential Consequence","text",true)}
                  {field(values,"immediateActions","Immediate Actions Taken","text",true)}
                </div>
              </div>

              {/* Corrective Actions Table */}
              <div className="form-section">
                <h3 className="form-section-title">Corrective Action & Resolution Details</h3>

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

              {/* Work Resumption */}
              <div className="form-section">
                <h3 className="form-section-title">Work Resumption Authorization</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Condition Verified Safe</label>
                    {isPrintMode
                      ? <div className="print-value">{values.conditionVerifiedSafe || "-"}</div>
                      : <Field as="select" name="conditionVerifiedSafe" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>

                  {field(values,"workResumptionDate","Date of Work Resumption","date")}
                  {field(values,"workResumptionTime","Time of Work Resumption","time")}
                  {field(values,"authorizedBy","Authorized By")}
                  {field(values,"resumptionRemarks","Remarks","text",true)}
                </div>
              </div>

              {/* Legal */}
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
                  {field(values,"photoAttached","Photographic Evidence Attached (Yes/No)")}
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

export default FRM01814_StopWorkAuthorityRecord;