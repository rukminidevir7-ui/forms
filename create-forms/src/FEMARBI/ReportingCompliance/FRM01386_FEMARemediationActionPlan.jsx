// FRM01386_FEMARemediationActionPlan.jsx
// FRM-01386 – FEMA Remediation Action Plan
// Enterprise Grade – FEMA & RBI – Reporting & Compliance

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
  companyName: Yup.string().required("Required"),
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  planReferenceNo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01386",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Organization Details */
  companyName: "",
  cin: "",
  pan: "",
  planReferenceNo: "",
  planDate: "",
  preparedBy: "",

  /* 2. Related Incident */
  incidentReference: "",
  description: "",
  regulationImpacted: "",
  riskLevel: "",

  /* 3. Remediation Actions */
  remediationActions: [
    {
      actionItem: "",
      owner: "",
      targetDate: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 4. Monitoring & Review */
  reviewFrequency: "",
  nextReviewDate: "",
  monitoringOwner: "",
  monitoringComments: "",

  /* 6. Approval */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",
  approvalComments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01386_FEMARemediationActionPlan = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ---- Add Column ---- */
  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  /* ---- Remove Column ---- */
  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field
              as={type === "textarea" ? "textarea" : "input"}
              name={name}
              type={type !== "textarea" ? type : undefined}
              className="form-input"
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01386" title="FEMA Remediation Action Plan">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FEMA Remediation Action Plan Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01386"
              title="FRM-01386 — FEMA Remediation Action Plan"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"planReferenceNo","Plan Reference No")}
                  {field(values,"planDate","Plan Date","date")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* 2. Related Incident */}
              <div className="form-section">
                <h3 className="form-section-title">Related Incident / Exception</h3>
                <div className="form-fields">
                  {field(values,"incidentReference","Incident Reference")}
                  {field(values,"description","Description","textarea")}
                  {field(values,"regulationImpacted","Regulation Impacted")}
                  {field(values,"riskLevel","Risk Level (Low/Medium/High/Critical)")}
                </div>
              </div>

              {/* 3. Remediation Actions Table */}
              <div className="form-section">
                <h3 className="form-section-title">Remediation Actions</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("remediationActions", [
                          ...values.remediationActions,
                          {
                            actionItem: "",
                            owner: "",
                            targetDate: "",
                            status: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="remediationActions">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Action Item</th>
                          <th>Owner</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
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
                        {values.remediationActions.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`remediationActions.${index}.actionItem`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`remediationActions.${index}.owner`} className="form-input"/>
                            </td>
                            <td>
                              <Field type="date" name={`remediationActions.${index}.targetDate`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`remediationActions.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>Deferred</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`remediationActions.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`remediationActions.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 4. Monitoring & Review */}
              <div className="form-section">
                <h3 className="form-section-title">Monitoring & Review</h3>
                <div className="form-fields">
                  {field(values,"reviewFrequency","Review Frequency")}
                  {field(values,"nextReviewDate","Next Review Date","date")}
                  {field(values,"monitoringOwner","Monitoring Owner")}
                  {field(values,"monitoringComments","Comments","textarea")}
                </div>
              </div>

              {/* 5. Supporting Documents */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Documents</h3>
                <FormAttachments values={values}/>
              </div>

              <FormCustomFields values={values}/>

              {/* 6. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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

                {field(values,"approvalDate","Approval Date","date")}
                {field(values,"approvalComments","Comments","textarea")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Remediation Plan
                  </button>
                </div>
              }

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01386_FEMARemediationActionPlan;