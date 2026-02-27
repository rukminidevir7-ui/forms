// FRM02531_TimesheetExceptionUniversal.jsx
// FRM-02531 – Timesheet Exception — Universal Form
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
  billingPeriod: Yup.string().required("Required"),
  finalStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02531",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Exception Reference */
  exceptionReferenceNo: "",
  timesheetReference: "",
  billingPeriod: "",
  raisedDate: "",

  /* 2. Resource / Project Details */
  resourceName: "",
  employeeId: "",
  clientName: "",
  projectName: "",
  managerName: "",

  /* 3. Exception Details */
  exceptionType: "",
  affectedDate: "",
  affectedEntryDescription: "",
  reasonForException: "",
  detailedExplanation: "",

  /* 4. Impact Summary */
  billableImpact: "",
  financialImpact: "",
  invoiceAdjustment: "",
  finalStatus: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  closureDate: ""
};

/* ================= COMPONENT ================= */

const FRM02531_TimesheetExceptionUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02531" title="Timesheet Exception">
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
              formId="FRM-02531"
              title="FRM-02531 — Timesheet Exception"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Exception Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Exception Reference</h3>
                <div className="form-fields">
                  {field(values,"exceptionReferenceNo","Exception Reference No")}
                  {field(values,"timesheetReference","Timesheet Reference")}
                  {field(values,"billingPeriod","Billing Period")}
                  {field(values,"raisedDate","Raised Date","date")}
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

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Additional Field Column
                    </button>
                  </div>
                )}

                <div className="form-fields">
                  {field(values,"exceptionType","Exception Type")}
                  {field(values,"affectedDate","Affected Date","date")}
                  {field(values,"affectedEntryDescription","Affected Entry Description")}
                  {field(values,"reasonForException","Reason for Exception")}
                  {field(values,"detailedExplanation","Detailed Explanation")}
                </div>

                {dynamicColumns.map(col=>(
                  <div key={col.key} className="form-field">
                    <label className="form-label">{col.label}</label>
                    <Field name={`dynamic_${col.key}`} className="form-input"/>
                    {!isPrintMode &&
                      <button type="button" onClick={()=>removeColumn(col.key)}>
                        Remove
                      </button>}
                  </div>
                ))}

              </div>

              {/* 4. Impact Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Summary</h3>
                <div className="form-fields">
                  {field(values,"billableImpact","Billable Impact")}
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"invoiceAdjustment","Invoice Adjustment")}
                  {field(values,"finalStatus","Final Status")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 6. Sign-off */}
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

                {field(values,"closureDate","Closure Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Timesheet Exception
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

export default FRM02531_TimesheetExceptionUniversal;