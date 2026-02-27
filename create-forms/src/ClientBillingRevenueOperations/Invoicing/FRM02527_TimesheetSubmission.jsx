// FRM02527_28_TimesheetSubmissionApprovalUniversal.jsx
// FRM-02527 & FRM-02528 – Timesheet Submission & Approval — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Invoicing (T&M, Milestone, Usage)

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
  resourceName: Yup.string().required("Required"),
  billingPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02527-28",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Resource Details */
  resourceName: "",
  employeeId: "",
  role: "",
  businessUnit: "",
  managerName: "",

  /* 2. Client / Project Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  projectCode: "",
  billingPeriod: "",

  /* 3. Time Entries */
  timeEntries: [
    {
      date: "",
      taskDescription: "",
      hoursWorked: "",
      billable: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 4. Summary */
  totalHours: "",
  totalBillableHours: "",
  nonBillableHours: "",

  /* 6. Approval Review */
  totalHoursReviewed: "",
  exceptionsIdentified: "",
  managerComments: "",
  decision: "",

  /* 7. Sign-off */
  approvalRoles: [
    { roleName: "Submitted By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ]
};

/* ================= COMPONENT ================= */

const FRM02527_TimesheetSubmission = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const calculateSummary = (values, setFieldValue) => {
    let total = 0;
    let billable = 0;

    values.timeEntries.forEach(item => {
      const hrs = Number(item.hoursWorked || 0);
      total += hrs;
      if (item.billable === "Yes") billable += hrs;
    });

    setFieldValue("totalHours", total.toFixed(2));
    setFieldValue("totalBillableHours", billable.toFixed(2));
    setFieldValue("nonBillableHours", (total - billable).toFixed(2));
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
    <ModernFormWrapper formId="FRM-02527-28" title="Timesheet Submission & Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Timesheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02527-28"
              title="Timesheet Submission & Approval — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Resource Details */}
              <div className="form-section">
                <h3 className="form-section-title">Resource Details</h3>
                <div className="form-fields">
                  {field(values,"resourceName","Resource Name")}
                  {field(values,"employeeId","Employee ID")}
                  {field(values,"role","Role / Designation")}
                  {field(values,"businessUnit","Department / Business Unit")}
                  {field(values,"managerName","Manager Name")}
                </div>
              </div>

              {/* 2. Client / Project */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"projectCode","Project Code")}
                  {field(values,"billingPeriod","Billing Period")}
                </div>
              </div>

              {/* 3. Time Entries */}
              <div className="form-section">
                <h3 className="form-section-title">Time Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("timeEntries",[
                        ...values.timeEntries,
                        { date:"", taskDescription:"", hoursWorked:"", billable:"", remarks:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="timeEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Task / Activity Description</th>
                          <th>Hours Worked</th>
                          <th>Billable (Yes/No)</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.timeEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field type="date" name={`timeEntries.${index}.date`} className="form-input"/></td>
                            <td><Field name={`timeEntries.${index}.taskDescription`} className="form-input"/></td>
                            <td>
                              <Field
                                name={`timeEntries.${index}.hoursWorked`}
                                className="form-input"
                                onBlur={()=>calculateSummary(values,setFieldValue)}
                              />
                            </td>
                            <td>
                              <Field
                                as="select"
                                name={`timeEntries.${index}.billable`}
                                className="form-input"
                                onChange={(e)=>{
                                  setFieldValue(`timeEntries.${index}.billable`,e.target.value);
                                  calculateSummary(values,setFieldValue);
                                }}
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td><Field name={`timeEntries.${index}.remarks`} className="form-input"/></td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`timeEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 4. Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-fields">
                  {field(values,"totalHours","Total Hours")}
                  {field(values,"totalBillableHours","Total Billable Hours")}
                  {field(values,"nonBillableHours","Non-Billable Hours")}
                </div>
              </div>

              {/* Attachments */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 6. Approval Review */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Review</h3>
                <div className="form-fields">
                  {field(values,"totalHoursReviewed","Total Hours Reviewed")}
                  {field(values,"exceptionsIdentified","Exceptions Identified")}
                  {field(values,"managerComments","Manager Comments")}
                  {field(values,"decision","Decision (Approved / Rejected / Revision Required)")}
                </div>
              </div>

              {/* 7. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>}
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
                    Submit Timesheet
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

export default FRM02527_TimesheetSubmission;