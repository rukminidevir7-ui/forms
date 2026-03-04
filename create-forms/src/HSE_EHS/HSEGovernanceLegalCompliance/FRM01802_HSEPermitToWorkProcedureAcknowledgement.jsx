// FRM01802_HSEPermitToWorkProcedureAcknowledgement.jsx
// FRM-01802 / 01803 / 01804 – HSE Permit-to-Work Procedure Acknowledgement (Universal)
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
  acknowledgementDate: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01802",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  procedureVersion: "",
  effectiveDate: "",
  acknowledgementDate: "",
  status: "",

  name: "",
  employeeId: "",
  contractorCompanyName: "",
  designation: "",
  employeeDepartment: "",
  workLocation: "",
  contactNumber: "",
  emailId: "",

  permitCategories: [
    {
      permitType: "",
      trainingCompleted: "",
      competencyVerified: "",
      validCertification: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  understandingConfirmation: "",
  complianceCommitment: "",
  consequenceUnderstanding: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  internalProcedureReference: "",

  trainingRecordAttached: "",
  competencyCertificateAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Acknowledged By (Employee / Contractor)", data: {} },
    { roleName: "Reviewed By (HSE Officer)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01802_HSEPermitToWorkProcedureAcknowledgement = () => {

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
    <ModernFormWrapper formId="FRM-01802" title="HSE Permit-to-Work Procedure Acknowledgement">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Permit-to-Work Acknowledgement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01802"
              title="HSE PERMIT-TO-WORK PROCEDURE ACKNOWLEDGEMENT"
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
                  {field(values,"procedureVersion","Procedure Version")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"acknowledgementDate","Acknowledgement Date","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Employee / Contractor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Employee / Contractor Details</h3>
                <div className="form-fields">
                  {field(values,"name","Name")}
                  {field(values,"employeeId","Employee ID / Contractor ID")}
                  {field(values,"contractorCompanyName","Company Name (if contractor)")}
                  {field(values,"designation","Designation")}
                  {field(values,"employeeDepartment","Department")}
                  {field(values,"workLocation","Work Location")}
                  {field(values,"contactNumber","Contact Number")}
                  {field(values,"emailId","Email ID")}
                </div>
              </div>

              {/* Permit Categories Table */}
              <div className="form-section">
                <h3 className="form-section-title">Permit-to-Work Categories Covered</h3>

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
                        setFieldValue("permitCategories", [
                          ...values.permitCategories,
                          {
                            permitType:"",
                            trainingCompleted:"",
                            competencyVerified:"",
                            validCertification:"",
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

                <FieldArray name="permitCategories">
  {({ remove }) => (
    <table className="items-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Permit Type</th>
          <th>Training Completed</th>
          <th>Competency Verified</th>
          <th>Valid Certification</th>
          <th>Remarks</th>
          {dynamicColumns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          {!isPrintMode && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {values.permitCategories.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            {/* PERMIT TYPE */}
            <td>
              {isPrintMode ? (
                row.permitType || "-"
              ) : (
                <Field
                  as="select"
                  name={`permitCategories.${index}.permitType`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Hot Work</option>
                  <option>Confined Space</option>
                  <option>Electrical</option>
                  <option>Work at Height</option>
                  <option>Excavation</option>
                  <option>Others</option>
                </Field>
              )}
            </td>

            {/* TRAINING COMPLETED */}
            <td>
              {isPrintMode ? (
                row.trainingCompleted || "-"
              ) : (
                <Field
                  as="select"
                  name={`permitCategories.${index}.trainingCompleted`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
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
                  name={`permitCategories.${index}.competencyVerified`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              )}
            </td>

            {/* VALID CERTIFICATION */}
            <td>
              {isPrintMode ? (
                row.validCertification || "-"
              ) : (
                <Field
                  as="select"
                  name={`permitCategories.${index}.validCertification`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              )}
            </td>

            {/* REMARKS */}
            <td>
              {isPrintMode ? (
                row.remarks || "-"
              ) : (
                <Field
                  as="textarea"
                  name={`permitCategories.${index}.remarks`}
                  className="form-input"
                />
              )}
            </td>

            {/* DYNAMIC COLUMNS */}
            {dynamicColumns.map(col => (
              <td key={col.key}>
                {isPrintMode
                  ? row.dynamicFields?.[col.key] || "-"
                  : (
                    <Field
                      name={`permitCategories.${index}.dynamicFields.${col.key}`}
                      className="form-input"
                    />
                  )
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

              {/* Acknowledgement Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Acknowledgement Declaration</h3>
                <div className="form-fields">
                  {field(values,"understandingConfirmation","Confirmation of Understanding of PTW Procedure")}
                  {field(values,"complianceCommitment","Commitment to Comply with Safety Requirements")}
                  {field(values,"consequenceUnderstanding","Understanding of Consequences for Non-Compliance")}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"internalProcedureReference","Internal Procedure Reference Number")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"trainingRecordAttached","Training Record Attached (Yes/No)")}
                  {field(values,"competencyCertificateAttached","Competency Certificate Attached (Yes/No)")}
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
                    Submit Permit-to-Work Acknowledgement
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

export default FRM01802_HSEPermitToWorkProcedureAcknowledgement;