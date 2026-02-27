// FRM01254_BoardMinutes.jsx
// FRM-01254 – Board Minutes
// Enterprise Grade – Corporate & Secretarial – Governance & ROC

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
  meetingDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01254",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  meetingDate: "",
  meetingTime: "",
  venueMode: "",
  chairperson: "",

  attendance: [
    { directorName: "", status: "", signature: "", dynamicFields: {} }
  ],

  proceedings: [
    { agendaItem: "", discussionSummary: "", decisionAction: "", dynamicFields: {} }
  ],

  meetingEndTime: "",
  nextMeetingDate: "",
  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By (Chairperson)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01254_BoardMinutes = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumnsAttendance, setDynamicColumnsAttendance] = useState([]);
  const [dynamicColumnsProceedings, setDynamicColumnsProceedings] = useState([]);

  const addColumn = (type) => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");

    if (type === "attendance") {
      if (dynamicColumnsAttendance.find(col => col.key === key)) return;
      setDynamicColumnsAttendance([...dynamicColumnsAttendance, { key, label: columnName }]);
    } else {
      if (dynamicColumnsProceedings.find(col => col.key === key)) return;
      setDynamicColumnsProceedings([...dynamicColumnsProceedings, { key, label: columnName }]);
    }
  };

  const removeColumn = (type, key) => {
    if (type === "attendance") {
      setDynamicColumnsAttendance(dynamicColumnsAttendance.filter(col => col.key !== key));
    } else {
      setDynamicColumnsProceedings(dynamicColumnsProceedings.filter(col => col.key !== key));
    }
  };

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01254" title="Board Minutes">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Board Minutes Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01254"
              title="BOARD MINUTES"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* MEETING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">1. Meeting Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"meetingDate","Meeting Date","date")}
                  {field(values,"meetingTime","Meeting Time","time")}
                  {field(values,"venueMode","Venue / Mode")}
                  {field(values,"chairperson","Chairperson")}
                </div>
              </div>

              {/* ATTENDANCE */}
              <div className="form-section">
                <h3 className="form-section-title">2. Attendance</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("attendance")}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit" style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("attendance", [
                          ...values.attendance,
                          { directorName: "", status: "", signature: "", dynamicFields: {} }
                        ])
                      }>
                      + Add Director
                    </button>
                  </div>
                )}

                <FieldArray name="attendance">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Director Name</th>
                          <th>Present / Absent</th>
                          <th>Signature</th>

                          {dynamicColumnsAttendance.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn("attendance", col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.attendance.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`attendance.${index}.directorName`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`attendance.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Present</option>
                                <option>Absent</option>
                              </Field>
                            </td>
                            <td><Field name={`attendance.${index}.signature`} className="form-input"/></td>

                            {dynamicColumnsAttendance.map(col=>(
                              <td key={col.key}>
                                <Field name={`attendance.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* PROCEEDINGS */}
              <div className="form-section">
                <h3 className="form-section-title">3. Proceedings Summary</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("proceedings")}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit" style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("proceedings", [
                          ...values.proceedings,
                          { agendaItem: "", discussionSummary: "", decisionAction: "", dynamicFields: {} }
                        ])
                      }>
                      + Add Agenda Item
                    </button>
                  </div>
                )}

                <FieldArray name="proceedings">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Agenda Item</th>
                          <th>Discussion Summary</th>
                          <th>Decision / Action</th>

                          {dynamicColumnsProceedings.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn("proceedings", col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.proceedings.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`proceedings.${index}.agendaItem`} className="form-input"/></td>
                            <td><Field name={`proceedings.${index}.discussionSummary`} className="form-input"/></td>
                            <td><Field name={`proceedings.${index}.decisionAction`} className="form-input"/></td>

                            {dynamicColumnsProceedings.map(col=>(
                              <td key={col.key}>
                                <Field name={`proceedings.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* CLOSURE */}
              <div className="form-section">
                <h3 className="form-section-title">4. Closure</h3>
                <div className="form-fields">
                  {field(values,"meetingEndTime","Meeting End Time","time")}
                  {field(values,"nextMeetingDate","Next Meeting Date","date")}
                  {field(values,"comments","Comments")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">5. Sign-off</h3>

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
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Board Minutes
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

export default FRM01254_BoardMinutes;