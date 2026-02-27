// FRM01064_RepaymentScheduleTracker.jsx
// FRM-01064 – Repayment Schedule Tracker
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
  formId: "FRM-01064",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  currency: "",
  businessUnit: "",

  repaymentSchedule: [
    {
      installmentNo: "",
      dueDate: "",
      principalAmount: "",
      interestAmount: "",
      totalDue: "",
      paymentDate: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01064_RepaymentScheduleTracker = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= SUMMARY CALCULATION ================= */

  const calculateSummary = (rows) => {
    const totalPrincipal = rows.reduce((sum, r) => sum + (Number(r.principalAmount) || 0), 0);
    const totalInterest = rows.reduce((sum, r) => sum + (Number(r.interestAmount) || 0), 0);
    const totalAmount = rows.reduce((sum, r) => sum + (Number(r.totalDue) || 0), 0);
    const outstanding = rows
      .filter(r => r.status !== "Paid")
      .reduce((sum, r) => sum + (Number(r.totalDue) || 0), 0);

    return { totalPrincipal, totalInterest, totalAmount, outstanding };
  };

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g,"");
    if (dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{ key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
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
      formId="FRM-01064"
      title="Repayment Schedule Tracker"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Repayment Schedule Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values.repaymentSchedule);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01064"
                title="REPAYMENT SCHEDULE TRACKER"
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
                    {field(values,"currency","Currency")}
                    {field(values,"businessUnit","Business Unit")}
                  </div>
                </div>

                {/* REPAYMENT TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Repayment Schedule</h3>

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
                          setFieldValue("repaymentSchedule", [
                            ...values.repaymentSchedule,
                            {
                              installmentNo:"",
                              dueDate:"",
                              principalAmount:"",
                              interestAmount:"",
                              totalDue:"",
                              paymentDate:"",
                              status:"",
                              remarks:"",
                              dynamicFields:{}
                            }
                          ])
                        }
                      >
                        + Add Installment
                      </button>
                    </div>
                  )}

                  <FieldArray name="repaymentSchedule">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Installment No</th>
                            <th>Due Date</th>
                            <th>Principal</th>
                            <th>Interest</th>
                            <th>Total Due</th>
                            <th>Payment Date</th>
                            <th>Status</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={()=>removeColumn(col.key)}
                                    style={{ marginLeft:5 }}
                                  >x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.repaymentSchedule.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`repaymentSchedule.${index}.installmentNo`} className="form-input"/></td>
                              <td><Field name={`repaymentSchedule.${index}.dueDate`} type="date" className="form-input"/></td>
                              <td><Field name={`repaymentSchedule.${index}.principalAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`repaymentSchedule.${index}.interestAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`repaymentSchedule.${index}.totalDue`} type="number" className="form-input"/></td>
                              <td><Field name={`repaymentSchedule.${index}.paymentDate`} type="date" className="form-input"/></td>
                              <td>
                                <Field as="select" name={`repaymentSchedule.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Pending</option>
                                  <option>Paid</option>
                                  <option>Overdue</option>
                                </Field>
                              </td>
                              <td><Field name={`repaymentSchedule.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`repaymentSchedule.${index}.dynamicFields.${col.key}`}
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
                    <div className="print-value">Total Principal: {summary.totalPrincipal}</div>
                    <div className="print-value">Total Interest: {summary.totalInterest}</div>
                    <div className="print-value">Total Amount: {summary.totalAmount}</div>
                    <div className="print-value">Outstanding Balance: {summary.outstanding}</div>
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
                                <button type="button" onClick={()=>remove(index)}>
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
                      Submit Repayment Schedule Tracker
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

export default FRM01064_RepaymentScheduleTracker;