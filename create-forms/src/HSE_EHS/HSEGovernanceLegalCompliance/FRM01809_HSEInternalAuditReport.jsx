// FRM01809_HSEInternalAuditReport.jsx
// FRM-01809 – HSE Internal Audit Report Checklist
// Enterprise Grade – HSE Governance & Legal Compliance

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
  department: Yup.string().required("Required"),
  auditDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01809",
  checklistNumber: "",
  auditDate: "",
  auditPeriodCovered: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  auditType: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  leadAuditorName: "",
  auditTeamMembers: "",

  findings: [
    {
      clauseReference: "",
      observationDescription: "",
      nonConformityType: "",
      rootCause: "",
      correctiveAction: "",
      responsiblePerson: "",
      targetDate: "",
      findingStatus: "",
      verificationDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  totalFindings: "",
  totalMajor: "",
  totalMinor: "",
  totalObservations: "",
  overallComplianceStatus: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  checklistAttached: "",
  evidenceAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By (Lead Auditor)", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management Representative)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01809_HSEInternalAuditReport = () => {

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
    <ModernFormWrapper formId="FRM-01809" title="HSE Internal Audit Report Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Internal Audit Report Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01809"
              title="HSE INTERNAL AUDIT REPORT CHECKLIST"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"checklistNumber","Checklist Number")}
                  {field(values,"auditDate","Audit Date","date")}
                  {field(values,"auditPeriodCovered","Audit Period Covered")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}

                  <div className="form-field">
                    <label className="form-label">Audit Type</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.auditType || "-"}</div>
                    ) : (
                      <Field as="select" name="auditType" className="form-input">
                        <option value="">Select</option>
                        <option>System</option>
                        <option>Process</option>
                        <option>Compliance</option>
                      </Field>
                    )}
                  </div>

                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"leadAuditorName","Lead Auditor Name")}
                  {field(values,"auditTeamMembers","Audit Team Members","text",true)}
                </div>
              </div>

              {/* Findings Table */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Findings Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("findings", [
                          ...values.findings,
                          {
                            clauseReference:"",
                            observationDescription:"",
                            nonConformityType:"",
                            rootCause:"",
                            correctiveAction:"",
                            responsiblePerson:"",
                            targetDate:"",
                            findingStatus:"",
                            verificationDate:"",
                            remarks:"",
                            dynamicFields:{}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="findings">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Audit Clause</th>
                          <th>Observation</th>
                          <th>NC Type</th>
                          <th>Root Cause</th>
                          <th>Corrective Action</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Verification Date</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.findings.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {[
                              "clauseReference",
                              "responsiblePerson"
                            ].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field
                                      name={`findings.${index}.${fieldName}`}
                                      className="form-input"
                                    />
                                }
                              </td>
                            ))}

                            {["observationDescription","rootCause","correctiveAction","remarks"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field
                                      as="textarea"
                                      name={`findings.${index}.${fieldName}`}
                                      className="form-input"
                                    />
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.nonConformityType || "-"
                                : <Field
                                    as="select"
                                    name={`findings.${index}.nonConformityType`}
                                    className="form-input"
                                  >
                                    <option value="">Select</option>
                                    <option>Major</option>
                                    <option>Minor</option>
                                    <option>Observation</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.targetDate || "-"
                                : <Field
                                    type="date"
                                    name={`findings.${index}.targetDate`}
                                    className="form-input"
                                  />
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.findingStatus || "-"
                                : <Field
                                    as="select"
                                    name={`findings.${index}.findingStatus`}
                                    className="form-input"
                                  >
                                    <option value="">Select</option>
                                    <option>Open</option>
                                    <option>Closed</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.verificationDate || "-"
                                : <Field
                                    type="date"
                                    name={`findings.${index}.verificationDate`}
                                    className="form-input"
                                  />
                              }
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`findings.${index}.dynamicFields.${col.key}`}
                                      className="form-input"
                                    />
                                }
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
                                </button>
                              </td>
                            }

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* Audit Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Summary</h3>
                <div className="form-fields">
                  {field(values,"totalFindings","Total Findings")}
                  {field(values,"totalMajor","Total Major Non-Conformities")}
                  {field(values,"totalMinor","Total Minor Non-Conformities")}
                  {field(values,"totalObservations","Total Observations")}
                  {field(values,"overallComplianceStatus","Overall Compliance Status")}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"complianceLinked","Compliance Obligation Linked (Yes/No)")}
                </div>
              </div>

              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"checklistAttached","Audit Checklist Attached (Yes/No)")}
                  {field(values,"evidenceAttached","Evidence Documents Attached (Yes/No)")}
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
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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

export default FRM01809_HSEInternalAuditReport;