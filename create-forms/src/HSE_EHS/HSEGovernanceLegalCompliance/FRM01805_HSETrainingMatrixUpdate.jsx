// FRM01805_HSETrainingMatrixUpdate.jsx
// FRM-01805 / 01806 / 01807 – HSE Training Matrix Update (Universal)
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
  financialYear: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01805",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  financialYear: "",
  updateDate: "",
  reviewFrequency: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  hseHeadName: "",
  hrRepresentativeName: "",

  trainingEntries: [
    {
      employeeName: "",
      employeeId: "",
      designation: "",
      employeeDepartment: "",
      trainingCategory: "",
      trainingRequired: "",
      lastTrainingDate: "",
      nextDueDate: "",
      trainingStatus: "",
      trainerName: "",
      competencyVerified: "",
      certificateValidTill: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  totalEmployeesCovered: "",
  totalTrainingsCompleted: "",
  totalTrainingsPending: "",
  totalTrainingsOverdue: "",
  improvementPlan: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  attendanceSheetAttached: "",
  trainingCertificatesAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By (HSE/HR)", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01805_HSETrainingMatrixUpdate = () => {

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
    <ModernFormWrapper formId="FRM-01805" title="HSE Training Matrix Update">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Training Matrix Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01805"
              title="HSE TRAINING MATRIX UPDATE"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"updateDate","Update Date","date")}
                  {field(values,"reviewFrequency","Review Frequency")}
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
                  {field(values,"hrRepresentativeName","HR Representative Name")}
                </div>
              </div>

              {/* Training Matrix Table */}
              <div className="form-section">
                <h3 className="form-section-title">Training Matrix Details</h3>

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
                        setFieldValue("trainingEntries", [
                          ...values.trainingEntries,
                          {
                            employeeName:"",
                            employeeId:"",
                            designation:"",
                            employeeDepartment:"",
                            trainingCategory:"",
                            trainingRequired:"",
                            lastTrainingDate:"",
                            nextDueDate:"",
                            trainingStatus:"",
                            trainerName:"",
                            competencyVerified:"",
                            certificateValidTill:"",
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

               <FieldArray name="trainingEntries">
  {({ remove }) => (
    <table className="items-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Employee Name</th>
          <th>Employee ID</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Training Category</th>
          <th>Training Required</th>
          <th>Last Training</th>
          <th>Next Due</th>
          <th>Status</th>
          <th>Trainer / Agency</th>
          <th>Competency Verified</th>
          <th>Certificate Valid Till</th>
          <th>Remarks</th>
          {dynamicColumns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          {!isPrintMode && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {values.trainingEntries.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            {/* SIMPLE TEXT FIELDS */}
            {[
              "employeeName",
              "employeeId",
              "designation",
              "employeeDepartment",
              "trainerName"
            ].map(fieldName => (
              <td key={fieldName}>
                {isPrintMode
                  ? row[fieldName] || "-"
                  : <Field
                      name={`trainingEntries.${index}.${fieldName}`}
                      className="form-input"
                    />
                }
              </td>
            ))}

            {/* TRAINING CATEGORY */}
            <td>
              {isPrintMode ? (
                row.trainingCategory || "-"
              ) : (
                <Field
                  as="select"
                  name={`trainingEntries.${index}.trainingCategory`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Induction</option>
                  <option>Fire</option>
                  <option>First Aid</option>
                  <option>PTW</option>
                  <option>Environmental</option>
                  <option>Other</option>
                </Field>
              )}
            </td>

            {/* TRAINING REQUIRED */}
            <td>
              {isPrintMode ? (
                row.trainingRequired || "-"
              ) : (
                <Field
                  as="select"
                  name={`trainingEntries.${index}.trainingRequired`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              )}
            </td>

            {/* DATE FIELDS */}
            {["lastTrainingDate", "nextDueDate"].map(fieldName => (
              <td key={fieldName}>
                {isPrintMode
                  ? row[fieldName] || "-"
                  : <Field
                      type="date"
                      name={`trainingEntries.${index}.${fieldName}`}
                      className="form-input"
                    />
                }
              </td>
            ))}

            {/* STATUS */}
            <td>
              {isPrintMode ? (
                row.trainingStatus || "-"
              ) : (
                <Field
                  as="select"
                  name={`trainingEntries.${index}.trainingStatus`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </Field>
              )}
            </td>

            {/* COMPETENCY VERIFIED */}
            <td>
              {isPrintMode ? (
                row.competencyVerified || "-"
              ) : (
                <Field
                  as="select"
                  name={`trainingEntries.${index}.competencyVerified`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              )}
            </td>

            {/* CERTIFICATE VALID TILL */}
            <td>
              {isPrintMode
                ? row.certificateValidTill || "-"
                : <Field
                    type="date"
                    name={`trainingEntries.${index}.certificateValidTill`}
                    className="form-input"
                  />
              }
            </td>

            {/* REMARKS */}
            <td>
              {isPrintMode
                ? row.remarks || "-"
                : <Field
                    as="textarea"
                    name={`trainingEntries.${index}.remarks`}
                    className="form-input"
                  />
              }
            </td>

            {/* DYNAMIC COLUMNS */}
            {dynamicColumns.map(col => (
              <td key={col.key}>
                {isPrintMode
                  ? row.dynamicFields?.[col.key] || "-"
                  : <Field
                      name={`trainingEntries.${index}.dynamicFields.${col.key}`}
                      className="form-input"
                    />
                }
              </td>
            ))}

            {!isPrintMode && (
              <td>
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</FieldArray>
              </div>

              {/* Summary & Evaluation */}
              <div className="form-section">
                <h3 className="form-section-title">Summary & Evaluation</h3>
                <div className="form-fields">
                  {field(values,"totalEmployeesCovered","Total Employees Covered")}
                  {field(values,"totalTrainingsCompleted","Total Trainings Completed")}
                  {field(values,"totalTrainingsPending","Total Trainings Pending")}
                  {field(values,"totalTrainingsOverdue","Total Trainings Overdue")}
                  {field(values,"improvementPlan","Improvement Plan","text",true)}
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

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"attendanceSheetAttached","Training Attendance Sheet Attached (Yes/No)")}
                  {field(values,"trainingCertificatesAttached","Training Certificates Attached (Yes/No)")}
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
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
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
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit HSE Training Matrix
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

export default FRM01805_HSETrainingMatrixUpdate;