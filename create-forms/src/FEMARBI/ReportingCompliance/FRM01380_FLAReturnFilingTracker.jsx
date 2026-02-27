// FRM01380_FLAReturnFilingTracker.jsx
// FRM-01380 – FLA Return Filing Tracker
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
  financialYear: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01380",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Entity Information */
  companyName: "",
  cin: "",
  pan: "",
  financialYear: "",
  trackerPeriod: "",
  maintainedBy: "",

  /* 2. Filing Tracker Entries */
  trackerEntries: [
    {
      date: "",
      referenceNo: "",
      submissionType: "",
      submissionDate: "",
      acknowledgementNo: "",
      filedBy: "",
      status: "",
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

const FRM01380_FLAReturnFilingTracker = () => {

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
    <ModernFormWrapper formId="FRM-01380" title="FLA Return Filing Tracker">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FLA Return Filing Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01380"
              title="FRM-01380 — FLA Return Filing Tracker"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Entity Information */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"trackerPeriod","Tracker Period")}
                  {field(values,"maintainedBy","Maintained By")}
                </div>
              </div>

              {/* 2. Filing Tracker Table */}
              <div className="form-section">
                <h3 className="form-section-title">Filing Tracker Entries</h3>

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
                        setFieldValue("trackerEntries", [
                          ...values.trackerEntries,
                          {
                            date: "",
                            referenceNo: "",
                            submissionType: "",
                            submissionDate: "",
                            acknowledgementNo: "",
                            filedBy: "",
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

                <FieldArray name="trackerEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Reference No</th>
                          <th>Submission Type</th>
                          <th>Submission Date</th>
                          <th>Acknowledgement No</th>
                          <th>Filed By</th>
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
                        {values.trackerEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field type="date" name={`trackerEntries.${index}.date`} className="form-input"/></td>
                            <td><Field name={`trackerEntries.${index}.referenceNo`} className="form-input"/></td>
                            <td><Field name={`trackerEntries.${index}.submissionType`} className="form-input"/></td>
                            <td><Field type="date" name={`trackerEntries.${index}.submissionDate`} className="form-input"/></td>
                            <td><Field name={`trackerEntries.${index}.acknowledgementNo`} className="form-input"/></td>
                            <td><Field name={`trackerEntries.${index}.filedBy`} className="form-input"/></td>

                            <td>
                              <Field as="select"
                                name={`trackerEntries.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Draft</option>
                                <option>Submitted</option>
                                <option>Acknowledged</option>
                                <option>Rejected</option>
                              </Field>
                            </td>

                            <td>
                              <Field name={`trackerEntries.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`trackerEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                    Submit Filing Tracker
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

export default FRM01380_FLAReturnFilingTracker;