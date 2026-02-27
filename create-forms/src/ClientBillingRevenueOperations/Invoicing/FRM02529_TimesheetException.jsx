// FRM02529_TimesheetExceptionUniversal.jsx
// FRM-02529 – Timesheet Exception — Universal Form
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
  exceptionReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  exceptionType: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02529",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Exception Reference */
  exceptionReferenceNo: "",
  requestDate: "",
  timesheetReference: "",
  billingPeriod: "",

  /* 2. Resource / Project Details */
  resourceName: "",
  employeeId: "",
  clientName: "",
  projectName: "",
  managerName: "",

  /* 3. Exception Details */
  exceptionType: "",
  dateOfException: "",
  affectedEntries: [
    {
      affectedTimeEntry: "",
      description: "",
      reason: "",
      dynamicFields: {}
    }
  ],

  /* 4. Impact Assessment */
  billableImpact: "",
  financialImpact: "",
  invoiceAdjustmentRequired: "",
  remarks: "",

  /* 6. Approval Decision */
  decision: "",
  approvalComments: "",
  conditions: "",

  /* 7. Sign-off */
  approvalRoles: [
    { roleName: "Submitted By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02529_TimesheetExceptionUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02529" title="Timesheet Exception">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Timesheet Exception Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02529"
              title="FRM-02529 — Timesheet Exception — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Exception Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Exception Reference</h3>
                <div className="form-fields">
                  {field(values,"exceptionReferenceNo","Exception Reference No")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"timesheetReference","Timesheet Reference")}
                  {field(values,"billingPeriod","Billing Period")}
                </div>
              </div>

              {/* 2. Resource / Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Resource / Project Details</h3>
                <div className="form-fields">
                  {field(values,"resourceName","Resource Name")}
                  {field(values,"employeeId","Employee ID")}
                  {field(values,"clientName","Client Name")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"managerName","Manager Name")}
                </div>
              </div>

              {/* 3. Exception Details */}
              <div className="form-section">
                <h3 className="form-section-title">Exception Details</h3>

                <div className="form-fields">
                  {field(values,"exceptionType","Exception Type")}
                  {field(values,"dateOfException","Date of Exception","date")}
                </div>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("affectedEntries",[
                        ...values.affectedEntries,
                        { affectedTimeEntry:"", description:"", reason:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="affectedEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Affected Time Entry</th>
                          <th>Description of Issue</th>
                          <th>Reason for Exception</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.affectedEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`affectedEntries.${index}.affectedTimeEntry`} className="form-input"/></td>
                            <td><Field name={`affectedEntries.${index}.description`} className="form-input"/></td>
                            <td><Field name={`affectedEntries.${index}.reason`} className="form-input"/></td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`affectedEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"billableImpact","Billable Impact")}
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"invoiceAdjustmentRequired","Invoice Adjustment Required")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* Supporting Docs */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 6. Approval Decision */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Decision</h3>
                <div className="form-fields">
                  {field(values,"decision","Decision (Approved / Rejected / Revision Required)")}
                  {field(values,"approvalComments","Approval Comments")}
                  {field(values,"conditions","Conditions (if any)")}
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

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Exception
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

export default FRM02529_TimesheetExceptionUniversal;