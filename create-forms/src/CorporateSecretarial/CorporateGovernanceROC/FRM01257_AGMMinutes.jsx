// FRM01257_AGMMinutes.jsx
// FRM-01257 – AGM Minutes
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
  agmDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01257",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  agmDate: "",
  agmTime: "",
  venueMode: "",
  chairperson: "",

  attendance: [
    { name: "", status: "", signature: "", dynamicFields: {} }
  ],

  proceedings: [
    { agendaItem: "", discussionSummary: "", resolutionDecision: "", dynamicFields: {} }
  ],

  votingSummary: [
    { resolution: "", votesFor: "", votesAgainst: "", abstained: "", dynamicFields: {} }
  ],

  meetingEndTime: "",
  nextAGM: "",
  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01257_AGMMinutes = () => {

  const { isPrintMode } = usePrintMode();
  const [attendanceCols, setAttendanceCols] = useState([]);
  const [proceedingCols, setProceedingCols] = useState([]);
  const [votingCols, setVotingCols] = useState([]);

  const addColumn = (type) => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");

    const addTo = (setter, cols) => {
      if (cols.find(col => col.key === key)) return;
      setter([...cols, { key, label: columnName }]);
    };

    if (type === "attendance") addTo(setAttendanceCols, attendanceCols);
    if (type === "proceedings") addTo(setProceedingCols, proceedingCols);
    if (type === "voting") addTo(setVotingCols, votingCols);
  };

  const removeColumn = (type, key) => {
    if (type === "attendance") setAttendanceCols(attendanceCols.filter(col => col.key !== key));
    if (type === "proceedings") setProceedingCols(proceedingCols.filter(col => col.key !== key));
    if (type === "voting") setVotingCols(votingCols.filter(col => col.key !== key));
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
    <ModernFormWrapper formId="FRM-01257" title="AGM Minutes">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("AGM Minutes Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01257"
              title="AGM MINUTES"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* MEETING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">1. Meeting Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"agmDate","AGM Date","date")}
                  {field(values,"agmTime","AGM Time","time")}
                  {field(values,"venueMode","Venue / Mode")}
                  {field(values,"chairperson","Chairperson")}
                </div>
              </div>

              {/* ATTENDANCE */}
              <div className="form-section">
                <h3 className="form-section-title">2. Attendance</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("attendance")}>+ Add Column</button>
                    <button type="button" className="btn-submit" style={{ marginLeft: 10 }}
                      onClick={()=>setFieldValue("attendance", [...values.attendance, { name:"", status:"", signature:"", dynamicFields:{} }])}>
                      + Add Member
                    </button>
                  </div>
                )}

                <FieldArray name="attendance">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Member / Director Name</th>
                          <th>Present / Absent</th>
                          <th>Signature</th>
                          {attendanceCols.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && <button type="button" onClick={()=>removeColumn("attendance", col.key)}>x</button>}
                            </th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.attendance.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`attendance.${index}.name`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`attendance.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Present</option>
                                <option>Absent</option>
                              </Field>
                            </td>
                            <td><Field name={`attendance.${index}.signature`} className="form-input"/></td>
                            {attendanceCols.map(col=>(
                              <td key={col.key}>
                                <Field name={`attendance.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode && <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
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
                    <button type="button" className="btn-submit" onClick={()=>addColumn("proceedings")}>+ Add Column</button>
                    <button type="button" className="btn-submit" style={{ marginLeft: 10 }}
                      onClick={()=>setFieldValue("proceedings", [...values.proceedings, { agendaItem:"", discussionSummary:"", resolutionDecision:"", dynamicFields:{} }])}>
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
                          <th>Resolution / Decision</th>
                          {proceedingCols.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && <button type="button" onClick={()=>removeColumn("proceedings", col.key)}>x</button>}
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
                            <td><Field name={`proceedings.${index}.resolutionDecision`} className="form-input"/></td>
                            {proceedingCols.map(col=>(
                              <td key={col.key}>
                                <Field name={`proceedings.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode && <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* VOTING SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">4. Voting Summary</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("voting")}>+ Add Column</button>
                    <button type="button" className="btn-submit" style={{ marginLeft: 10 }}
                      onClick={()=>setFieldValue("votingSummary", [...values.votingSummary, { resolution:"", votesFor:"", votesAgainst:"", abstained:"", dynamicFields:{} }])}>
                      + Add Resolution
                    </button>
                  </div>
                )}

                <FieldArray name="votingSummary">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Resolution</th>
                          <th>Votes For</th>
                          <th>Votes Against</th>
                          <th>Abstained</th>
                          {votingCols.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && <button type="button" onClick={()=>removeColumn("voting", col.key)}>x</button>}
                            </th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.votingSummary.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`votingSummary.${index}.resolution`} className="form-input"/></td>
                            <td><Field name={`votingSummary.${index}.votesFor`} className="form-input"/></td>
                            <td><Field name={`votingSummary.${index}.votesAgainst`} className="form-input"/></td>
                            <td><Field name={`votingSummary.${index}.abstained`} className="form-input"/></td>
                            {votingCols.map(col=>(
                              <td key={col.key}>
                                <Field name={`votingSummary.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode && <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* CLOSURE */}
              <div className="form-section">
                <h3 className="form-section-title">5. Closure</h3>
                <div className="form-fields">
                  {field(values,"meetingEndTime","Meeting End Time","time")}
                  {field(values,"nextAGM","Next AGM (if proposed)")}
                  {field(values,"comments","Comments")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">6. Sign-off</h3>
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
                            {!isPrintMode && <button type="button" onClick={()=>remove(index)}>Remove</button>}
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
                    Submit AGM Minutes
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

export default FRM01257_AGMMinutes;