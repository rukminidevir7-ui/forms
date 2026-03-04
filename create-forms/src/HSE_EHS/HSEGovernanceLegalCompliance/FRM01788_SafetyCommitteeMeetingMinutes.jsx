// FRM01788_SafetyCommitteeMeetingMinutes.jsx
// FRM-01788 – Safety Committee Meeting Minutes
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
  meetingDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01788",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  meetingDate: "",
  meetingTime: "",
  meetingVenue: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  hseHeadName: "",

  attendance: [
    {
      memberName: "",
      designation: "",
      memberDepartment: "",
      role: "",
      present: "",
      signature: "",
      dynamicFields: {}
    }
  ],

  agendaItems: [
    {
      agendaItem: "",
      discussionSummary: "",
      decisionTaken: "",
      responsiblePerson: "",
      targetDate: "",
      statusEntry: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  notificationReference: "",

  attendanceSheetAttached: "",
  supportingDocumentsAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management Representative)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01788_SafetyCommitteeMeetingMinutes = () => {

  const { isPrintMode } = usePrintMode();
  const [attendanceColumns, setAttendanceColumns] = useState([]);
  const [agendaColumns, setAgendaColumns] = useState([]);

  const addColumn = (type) => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (type === "attendance") {
      if (attendanceColumns.find(col => col.key === key)) return;
      setAttendanceColumns([...attendanceColumns, { key, label: columnName }]);
    } else {
      if (agendaColumns.find(col => col.key === key)) return;
      setAgendaColumns([...agendaColumns, { key, label: columnName }]);
    }
  };

  const removeColumn = (type, key) => {
    if (type === "attendance") {
      setAttendanceColumns(attendanceColumns.filter(col => col.key !== key));
    } else {
      setAgendaColumns(agendaColumns.filter(col => col.key !== key));
    }
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
    <ModernFormWrapper formId="FRM-01788" title="Safety Committee Meeting Minutes">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Safety Committee Meeting Minutes Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01788"
              title="SAFETY COMMITTEE MEETING MINUTES"
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
                  {field(values,"meetingDate","Meeting Date","date")}
                  {field(values,"meetingTime","Meeting Time","time")}
                  {field(values,"meetingVenue","Meeting Venue")}
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

              {/* Attendance Table */}
              <div className="form-section">
                <h3 className="form-section-title">Attendance Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("attendance")}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("attendance", [
                          ...values.attendance,
                          { memberName:"",designation:"",memberDepartment:"",role:"",present:"",signature:"",dynamicFields:{} }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="attendance">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Member Name</th>
                          <th>Designation</th>
                          <th>Department</th>
                          <th>Role</th>
                          <th>Present</th>
                          <th>Signature</th>
                          {attendanceColumns.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn("attendance",col.key)}>x</button>}
                            </th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.attendance.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td><Field name={`attendance.${index}.memberName`} className="form-input"/></td>
                            <td><Field name={`attendance.${index}.designation`} className="form-input"/></td>
                            <td><Field name={`attendance.${index}.memberDepartment`} className="form-input"/></td>
                            <td><Field name={`attendance.${index}.role`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`attendance.${index}.present`} className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td><Field name={`attendance.${index}.signature`} className="form-input"/></td>

                            {attendanceColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`attendance.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* Agenda Table */}
              <div className="form-section">
                <h3 className="form-section-title">Agenda & Discussion Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("agenda")}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("agendaItems", [
                          ...values.agendaItems,
                          { agendaItem:"",discussionSummary:"",decisionTaken:"",responsiblePerson:"",targetDate:"",statusEntry:"",remarks:"",dynamicFields:{} }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="agendaItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Agenda Item</th>
                          <th>Discussion Summary</th>
                          <th>Decision Taken</th>
                          <th>Responsible Person</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {agendaColumns.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn("agenda",col.key)}>x</button>}
                            </th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.agendaItems.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td><Field as="textarea" name={`agendaItems.${index}.agendaItem`} className="form-input"/></td>
                            <td><Field as="textarea" name={`agendaItems.${index}.discussionSummary`} className="form-input"/></td>
                            <td><Field as="textarea" name={`agendaItems.${index}.decisionTaken`} className="form-input"/></td>
                            <td><Field name={`agendaItems.${index}.responsiblePerson`} className="form-input"/></td>
                            <td><Field type="date" name={`agendaItems.${index}.targetDate`} className="form-input"/></td>
                            <td><Field name={`agendaItems.${index}.statusEntry`} className="form-input"/></td>
                            <td><Field as="textarea" name={`agendaItems.${index}.remarks`} className="form-input"/></td>

                            {agendaColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`agendaItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
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
                  {field(values,"notificationReference","Notification Reference")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"attendanceSheetAttached","Attendance Sheet Attached (Yes/No)")}
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
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
                    Submit Safety Committee Meeting Minutes
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

export default FRM01788_SafetyCommitteeMeetingMinutes;