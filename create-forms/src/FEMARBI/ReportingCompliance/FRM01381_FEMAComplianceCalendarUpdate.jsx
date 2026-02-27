// FRM01381_FEMAComplianceCalendarUpdate.jsx
// FRM-01381 – FEMA Compliance Calendar Update
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
  calendarPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01381",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Organization Information */
  companyName: "",
  cin: "",
  pan: "",
  calendarPeriod: "",
  maintainedBy: "",
  lastUpdatedDate: "",

  /* 2. Calendar Entries */
  calendarEntries: [
    {
      dueDate: "",
      complianceItem: "",
      regulationReference: "",
      responsibleOwner: "",
      status: "",
      completionDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Notes */
  generalNotes: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01381_FEMAComplianceCalendarUpdate = () => {

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
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01381" title="FEMA Compliance Calendar Update">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FEMA Compliance Calendar Updated Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01381"
              title="FRM-01381 — FEMA Compliance Calendar Update"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Organization Information */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"calendarPeriod","Calendar Period")}
                  {field(values,"maintainedBy","Maintained By")}
                  {field(values,"lastUpdatedDate","Last Updated Date","date")}
                </div>
              </div>

              {/* 2. Calendar Entries */}
              <div className="form-section">
                <h3 className="form-section-title">Calendar Entries</h3>

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
                        setFieldValue("calendarEntries", [
                          ...values.calendarEntries,
                          {
                            dueDate: "",
                            complianceItem: "",
                            regulationReference: "",
                            responsibleOwner: "",
                            status: "",
                            completionDate: "",
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

                <FieldArray name="calendarEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Due Date</th>
                          <th>Compliance Item</th>
                          <th>Regulation Reference</th>
                          <th>Responsible Owner</th>
                          <th>Status</th>
                          <th>Completion Date</th>
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
                        {values.calendarEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field type="date" name={`calendarEntries.${index}.dueDate`} className="form-input"/></td>
                            <td><Field name={`calendarEntries.${index}.complianceItem`} className="form-input"/></td>
                            <td><Field name={`calendarEntries.${index}.regulationReference`} className="form-input"/></td>
                            <td><Field name={`calendarEntries.${index}.responsibleOwner`} className="form-input"/></td>

                            <td>
                              <Field as="select"
                                name={`calendarEntries.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>Overdue</option>
                              </Field>
                            </td>

                            <td>
                              <Field type="date"
                                name={`calendarEntries.${index}.completionDate`}
                                className="form-input"/>
                            </td>

                            <td>
                              <Field name={`calendarEntries.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`calendarEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 3. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  {field(values,"generalNotes","General Notes")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* 4. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
                    Submit Compliance Calendar
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

export default FRM01381_FEMAComplianceCalendarUpdate;