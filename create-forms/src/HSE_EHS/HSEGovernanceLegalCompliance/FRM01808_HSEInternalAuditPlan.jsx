// FRM01808_HSEInternalAuditPlan.jsx
// FRM-01808 – HSE Internal Audit Plan Checklist
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
  auditYear: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01808",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  auditYear: "",
  auditCycle: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  hseHeadName: "",

  auditEntries: [
    {
      auditArea: "",
      applicableStandard: "",
      riskLevel: "",
      auditType: "",
      plannedAuditDate: "",
      leadAuditor: "",
      auditTeamMembers: "",
      auditCriteria: "",
      auditScope: "",
      auditStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  previousFindingsAttached: "",
  auditChecklistAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management Representative)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01808_HSEInternalAuditPlan = () => {

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

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <Field name={name} type={type} className="form-input"/>
      }
      <ErrorMessage name={name} component="div" className="form-error"/>
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01808" title="HSE Internal Audit Plan Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Internal Audit Plan Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01808"
              title="HSE INTERNAL AUDIT PLAN CHECKLIST"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Checklist Number")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"auditYear","Audit Year")}
                  
                  <div className="form-field">
                    <label className="form-label">Audit Cycle</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.auditCycle || "-"}</div>
                    ) : (
                      <Field as="select" name="auditCycle" className="form-input">
                        <option value="">Select</option>
                        <option>Quarterly</option>
                        <option>Half-Yearly</option>
                        <option>Annual</option>
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
                  {field(values,"hseHeadName","HSE Head Name")}
                </div>
              </div>

              {/* Audit Plan Table */}
              <div className="form-section">
                <h3 className="form-section-title">Internal Audit Plan Details</h3>

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
                        setFieldValue("auditEntries", [
                          ...values.auditEntries,
                          {
                            auditArea:"",
                            applicableStandard:"",
                            riskLevel:"",
                            auditType:"",
                            plannedAuditDate:"",
                            leadAuditor:"",
                            auditTeamMembers:"",
                            auditCriteria:"",
                            auditScope:"",
                            auditStatus:"",
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

                <FieldArray name="auditEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Audit Area</th>
                          <th>Applicable Standard</th>
                          <th>Risk Level</th>
                          <th>Audit Type</th>
                          <th>Planned Date</th>
                          <th>Lead Auditor</th>
                          <th>Audit Team</th>
                          <th>Audit Criteria</th>
                          <th>Audit Scope</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.auditEntries.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>

                            {/* SIMPLE TEXT FIELDS */}
                            {[
                              "auditArea",
                              "leadAuditor",
                              "auditTeamMembers",
                              "auditCriteria",
                              "auditScope"
                            ].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field
                                      name={`auditEntries.${index}.${fieldName}`}
                                      className="form-input"
                                    />
                                }
                              </td>
                            ))}

                            {/* Applicable Standard */}
                            <td>
                              {isPrintMode ? (
                                row.applicableStandard || "-"
                              ) : (
                                <Field
                                  as="select"
                                  name={`auditEntries.${index}.applicableStandard`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>ISO 45001</option>
                                  <option>ISO 14001</option>
                                  <option>Legal</option>
                                </Field>
                              )}
                            </td>

                            {/* Risk Level */}
                            <td>
                              {isPrintMode
                                ? row.riskLevel || "-"
                                : <Field
                                    name={`auditEntries.${index}.riskLevel`}
                                    className="form-input"
                                  />
                              }
                            </td>

                            {/* Audit Type */}
                            <td>
                              {isPrintMode ? (
                                row.auditType || "-"
                              ) : (
                                <Field
                                  as="select"
                                  name={`auditEntries.${index}.auditType`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>System</option>
                                  <option>Process</option>
                                  <option>Compliance</option>
                                </Field>
                              )}
                            </td>

                            {/* Planned Date */}
                            <td>
                              {isPrintMode
                                ? row.plannedAuditDate || "-"
                                : <Field
                                    type="date"
                                    name={`auditEntries.${index}.plannedAuditDate`}
                                    className="form-input"
                                  />
                              }
                            </td>

                            {/* Status */}
                            <td>
                              {isPrintMode ? (
                                row.auditStatus || "-"
                              ) : (
                                <Field
                                  as="select"
                                  name={`auditEntries.${index}.auditStatus`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>Planned</option>
                                  <option>Completed</option>
                                  <option>Postponed</option>
                                </Field>
                              )}
                            </td>

                            {/* Remarks */}
                            <td>
                              {isPrintMode
                                ? row.remarks || "-"
                                : <Field
                                    as="textarea"
                                    name={`auditEntries.${index}.remarks`}
                                    className="form-input"
                                  />
                              }
                            </td>

                            {/* Dynamic Columns */}
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`auditEntries.${index}.dynamicFields.${col.key}`}
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

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"complianceLinked","Compliance Obligation Linked (Yes/No)")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"previousFindingsAttached","Previous Audit Findings Attached (Yes/No)")}
                  {field(values,"auditChecklistAttached","Audit Checklist Attached (Yes/No)")}
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

export default FRM01808_HSEInternalAuditPlan;