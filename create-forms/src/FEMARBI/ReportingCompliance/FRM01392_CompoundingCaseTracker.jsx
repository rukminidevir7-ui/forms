// FRM01392_CompoundingCaseTracker.jsx
// FRM-01392 – Compounding Case Tracker
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
  trackerPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01392",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Organization Information */
  companyName: "",
  cin: "",
  pan: "",
  trackerPeriod: "",
  maintainedBy: "",
  lastUpdatedDate: "",

  /* 2. Case Tracker Entries */
  caseEntries: [
    {
      caseReference: "",
      noticeDate: "",
      regulation: "",
      description: "",
      authority: "",
      status: "",
      closureDate: "",
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

const FRM01392_CompoundingCaseTracker = () => {

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
    <ModernFormWrapper formId="FRM-01392" title="Compounding Case Tracker">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Compounding Case Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01392"
              title="FRM-01392 — Compounding Case Tracker"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Organization Information */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"trackerPeriod","Tracker Period")}
                  {field(values,"maintainedBy","Maintained By")}
                  {field(values,"lastUpdatedDate","Last Updated Date","date")}
                </div>
              </div>

              {/* 2. Case Tracker Entries */}
              <div className="form-section">
                <h3 className="form-section-title">Case Tracker Entries</h3>

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
                        setFieldValue("caseEntries", [
                          ...values.caseEntries,
                          {
                            caseReference: "",
                            noticeDate: "",
                            regulation: "",
                            description: "",
                            authority: "",
                            status: "",
                            closureDate: "",
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

                <FieldArray name="caseEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Case Reference</th>
                          <th>Notice Date</th>
                          <th>Regulation</th>
                          <th>Description</th>
                          <th>Authority</th>
                          <th>Status</th>
                          <th>Closure Date</th>
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
                        {values.caseEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`caseEntries.${index}.caseReference`} className="form-input"/></td>
                            <td><Field type="date" name={`caseEntries.${index}.noticeDate`} className="form-input"/></td>
                            <td><Field name={`caseEntries.${index}.regulation`} className="form-input"/></td>
                            <td><Field name={`caseEntries.${index}.description`} className="form-input"/></td>
                            <td><Field name={`caseEntries.${index}.authority`} className="form-input"/></td>

                            <td>
                              <Field as="select"
                                name={`caseEntries.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Open</option>
                                <option>Under Review</option>
                                <option>Filed</option>
                                <option>Closed</option>
                                <option>Compounded</option>
                              </Field>
                            </td>

                            <td>
                              <Field type="date"
                                name={`caseEntries.${index}.closureDate`}
                                className="form-input"/>
                            </td>

                            <td>
                              <Field name={`caseEntries.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`caseEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                  {field(values,"generalNotes","General Notes","textarea")}
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
                    Submit Compounding Case Tracker
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

export default FRM01392_CompoundingCaseTracker;