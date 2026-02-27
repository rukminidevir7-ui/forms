// FRM01072_LenderCommunicationLog.jsx
// FRM-01072 – Lender Communication Log
// Enterprise Grade – Treasury & Funding – Lending, Borrowing & Credit Facilities

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
  borrowerName: Yup.string().required("Required"),
  facilityReference: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01072",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  communicationLog: [
    {
      logDate: "",
      lender: "",
      contactPerson: "",
      mode: "",
      subject: "",
      summary: "",
      actionItems: "",
      owner: "",
      status: "",
      dynamicFields: {}
    }
  ],

  keyNotes: "",

  approvalRoles: [
    { roleName: "Logged By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01072_LenderCommunicationLog = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= SUMMARY ================= */

  const calculateSummary = (logs) => {
    const total = logs.length;
    const open = logs.filter(l => l.status !== "Closed").length;
    return { total, open };
  };

  /* ================= COLUMN FUNCTIONS ================= */

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
    <ModernFormWrapper
      formId="FRM-01072"
      title="Lender Communication Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Lender Communication Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values.communicationLog);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01072"
                title="LENDER COMMUNICATION LOG"
                department="Treasury & Funding – Lending, Borrowing & Credit Facilities"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"referenceNumber","Reference Number")}
                    {field(values,"location","Location")}
                    {field(values,"borrowerName","Borrower Name")}
                    {field(values,"facilityReference","Facility Reference")}
                    {field(values,"businessUnit","Business Unit")}
                    {field(values,"currency","Currency")}
                  </div>
                </div>

                {/* COMMUNICATION LOG TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Communication Log</h3>

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
                          setFieldValue("communicationLog", [
                            ...values.communicationLog,
                            {
                              logDate: "",
                              lender: "",
                              contactPerson: "",
                              mode: "",
                              subject: "",
                              summary: "",
                              actionItems: "",
                              owner: "",
                              status: "",
                              dynamicFields: {}
                            }
                          ])
                        }
                      >
                        + Add Row
                      </button>
                    </div>
                  )}

                  <FieldArray name="communicationLog">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Lender</th>
                            <th>Contact Person</th>
                            <th>Mode</th>
                            <th>Subject</th>
                            <th>Summary</th>
                            <th>Action Items</th>
                            <th>Owner</th>
                            <th>Status</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={() => removeColumn(col.key)}
                                    style={{ marginLeft: 5 }}
                                  >
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.communicationLog.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`communicationLog.${index}.logDate`} type="date" className="form-input"/></td>
                              <td><Field name={`communicationLog.${index}.lender`} className="form-input"/></td>
                              <td><Field name={`communicationLog.${index}.contactPerson`} className="form-input"/></td>
                              <td><Field name={`communicationLog.${index}.mode`} className="form-input"/></td>
                              <td><Field name={`communicationLog.${index}.subject`} className="form-input"/></td>
                              <td><Field name={`communicationLog.${index}.summary`} className="form-input"/></td>
                              <td><Field name={`communicationLog.${index}.actionItems`} className="form-input"/></td>
                              <td><Field name={`communicationLog.${index}.owner`} className="form-input"/></td>

                              <td>
                                <Field as="select" name={`communicationLog.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Open</option>
                                  <option>In Progress</option>
                                  <option>Closed</option>
                                </Field>
                              </td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`communicationLog.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
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

                {/* SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Communications: {summary.total}</div>
                    <div className="print-value">Open Action Items: {summary.open}</div>
                    {field(values,"keyNotes","Key Notes")}
                  </div>
                </div>

                <FormAttachments values={values}/>
                <FormCustomFields values={values}/>

                {/* AUTHORIZATION */}
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
                                onRoleNameChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.roleName`,val)}
                                onChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.data`,val)}
                              />
                              {!isPrintMode &&
                                <button
                                  type="button"
                                  className="btn-remove-role"
                                  onClick={()=>remove(index)}
                                >
                                  Remove Role
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
                      Submit Communication Log
                    </button>
                  </div>
                }

              </ModernA4Template>

            </Form>
          );
        }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01072_LenderCommunicationLog;