// FRM01785_SafetyCommitteeConstitution.jsx
// FRM-01785 / 01786 / 01787 – Safety Committee Constitution (Universal)
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
  constitutionDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01785",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  constitutionDate: "",
  effectiveFrom: "",
  status: "",

  companyName: "",
  corporateOfficeAddress: "",
  plantSiteName: "",
  totalEmployeesStrength: "",
  applicableLegislation: "",

  committeeMembers: [
    {
      memberName: "",
      employeeId: "",
      designation: "",
      memberDepartment: "",
      role: "",
      contactNumber: "",
      emailId: "",
      nominationDate: "",
      tenurePeriod: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  purpose: "",
  scopeOfActivities: "",
  meetingFrequency: "",
  quorumRequirement: "",
  responsibilities: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  notificationReference: "",

  nominationLettersAttached: "",
  employeeRepListAttached: "",
  governmentNotificationAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management Representative)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01785_SafetyCommitteeConstitution = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

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
    <ModernFormWrapper formId="FRM-01785" title="Safety Committee Constitution">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Safety Committee Constitution Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01785"
              title="SAFETY COMMITTEE CONSTITUTION"
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
                  {field(values,"constitutionDate","Constitution Date","date")}
                  {field(values,"effectiveFrom","Effective From","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"corporateOfficeAddress","Corporate Office Address","text",true)}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"totalEmployeesStrength","Total Employees Strength")}
                  {field(values,"applicableLegislation","Applicable Legislation", "text", true)}
                </div>
              </div>

              {/* Committee Members Table */}
              <div className="form-section">
                <h3 className="form-section-title">Committee Member Details</h3>

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
                        setFieldValue("committeeMembers", [
                          ...values.committeeMembers,
                          {
                            memberName: "",
                            employeeId: "",
                            designation: "",
                            memberDepartment: "",
                            role: "",
                            contactNumber: "",
                            emailId: "",
                            nominationDate: "",
                            tenurePeriod: "",
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

                <FieldArray name="committeeMembers">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Member Name</th>
                          <th>Employee ID</th>
                          <th>Designation</th>
                          <th>Department</th>
                          <th>Role</th>
                          <th>Contact</th>
                          <th>Email</th>
                          <th>Nomination Date</th>
                          <th>Tenure Period</th>
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
                        {values.committeeMembers.map((row,index)=>(
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><Field name={`committeeMembers.${index}.memberName`} className="form-input"/></td>
                            <td><Field name={`committeeMembers.${index}.employeeId`} className="form-input"/></td>
                            <td><Field name={`committeeMembers.${index}.designation`} className="form-input"/></td>
                            <td><Field name={`committeeMembers.${index}.memberDepartment`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`committeeMembers.${index}.role`} className="form-input">
                                <option value="">Select</option>
                                <option>Chairperson</option>
                                <option>Member</option>
                                <option>Worker Representative</option>
                              </Field>
                            </td>
                            <td><Field name={`committeeMembers.${index}.contactNumber`} className="form-input"/></td>
                            <td><Field name={`committeeMembers.${index}.emailId`} className="form-input"/></td>
                            <td><Field type="date" name={`committeeMembers.${index}.nominationDate`} className="form-input"/></td>
                            <td><Field name={`committeeMembers.${index}.tenurePeriod`} className="form-input"/></td>
                            <td><Field as="textarea" name={`committeeMembers.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`committeeMembers.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* Terms of Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Terms of Reference</h3>
                <div className="form-fields">
                  {field(values,"purpose","Purpose of Committee","text",true)}
                  {field(values,"scopeOfActivities","Scope of Activities","text",true)}
                  {field(values,"meetingFrequency","Meeting Frequency")}
                  {field(values,"quorumRequirement","Quorum Requirement")}
                  {field(values,"responsibilities","Responsibilities of Members","text",true)}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Regulatory Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"notificationReference","Notification / Circular Reference")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"nominationLettersAttached","Nomination Letters Attached (Yes/No)")}
                  {field(values,"employeeRepListAttached","Employee Representative List Attached (Yes/No)")}
                  {field(values,"governmentNotificationAttached","Government Notification Attached (Yes/No)")}
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

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Safety Committee Constitution
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

export default FRM01785_SafetyCommitteeConstitution;