// FRM01818_HSECorrectiveActionTracker.jsx
// FRM-01818 – HSE Corrective Action Tracker Log
// Enterprise Grade – HSE Governance & CAPA Management

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
  logNumber: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01818",
  logNumber: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  reportingPeriod: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  hseHeadName: "",

  correctiveActions: [
    {
      referenceSource: "",
      issueDescription: "",
      riskLevel: "",
      rootCause: "",
      correctiveAction: "",
      preventiveAction: "",
      responsiblePerson: "",
      targetDate: "",
      completionDate: "",
      actionStatus: "",
      overdue: "",
      verificationDate: "",
      verifiedBy: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  supportingDocsAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management Representative)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01818_HSECorrectiveActionTracker = () => {

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
    <ModernFormWrapper formId="FRM-01818" title="HSE Corrective Action Tracker Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Corrective Action Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01818"
              title="HSE CORRECTIVE ACTION TRACKER LOG"
              department="HSE / EHS – CAPA Governance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"logNumber","Log Number")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"reportingPeriod","Reporting Period")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"hseHeadName","HSE Head Name")}
                </div>
              </div>

              {/* Corrective Action Table */}
              <div className="form-section">
                <h3 className="form-section-title">Corrective Action Details</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("correctiveActions",
                        [...values.correctiveActions,{
                          referenceSource:"",
                          issueDescription:"",
                          riskLevel:"",
                          rootCause:"",
                          correctiveAction:"",
                          preventiveAction:"",
                          responsiblePerson:"",
                          targetDate:"",
                          completionDate:"",
                          actionStatus:"",
                          overdue:"",
                          verificationDate:"",
                          verifiedBy:"",
                          remarks:"",
                          dynamicFields:{}
                        }]
                      )}
                    >
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
                          <th>Reference Source</th>
                          <th>Issue Description</th>
                          <th>Risk Level</th>
                          <th>Root Cause</th>
                          <th>Corrective Action</th>
                          <th>Preventive Action</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Completion Date</th>
                          <th>Status</th>
                          <th>Overdue</th>
                          <th>Verification Date</th>
                          <th>Verified By</th>
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

                            {/* Reference Source */}
                            <td>
                              {isPrintMode
                                ? row.referenceSource || "-"
                                : <Field as="select"
                                    name={`correctiveActions.${index}.referenceSource`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Audit</option>
                                    <option>Incident</option>
                                    <option>Inspection</option>
                                    <option>Notice</option>
                                  </Field>
                              }
                            </td>

                            {/* Textarea heavy fields */}
                            {["issueDescription","rootCause","correctiveAction","preventiveAction"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field as="textarea"
                                      name={`correctiveActions.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            {/* Risk Level */}
                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field as="select"
                                    name={`correctiveActions.${index}.riskLevel`}
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
                                : <Field name={`correctiveActions.${index}.responsiblePerson`} className="form-input"/>
                              }
                            </td>

                            {["targetDate","completionDate","verificationDate"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field type="date"
                                      name={`correctiveActions.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.actionStatus || "-"
                                : <Field as="select"
                                    name={`correctiveActions.${index}.actionStatus`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Closed</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.overdue || "-"
                                : <Field as="select"
                                    name={`correctiveActions.${index}.overdue`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.verifiedBy || "-"
                                : <Field name={`correctiveActions.${index}.verifiedBy`} className="form-input"/>
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

export default FRM01818_HSECorrectiveActionTracker;