// FRM02523_BillingCalendarUpdateLogUniversal.jsx
// FRM-02523 – Billing Calendar Update Log — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

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
  calendarName: Yup.string().required("Required"),
  period: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02523",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Log Information */
  calendarName: "",
  businessUnit: "",
  period: "",
  maintainedBy: "",
  lastUpdatedDate: "",

  /* 2. Update Entries */
  updateEntries: [
    {
      updateRef: "",
      updateDate: "",
      changeDescription: "",
      effectiveDate: "",
      updatedBy: "",
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
  ]
};

/* ================= COMPONENT ================= */

const FRM02523_BillingCalendarUpdateLogUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02523" title="Billing Calendar Update Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Calendar Update Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02523"
              title="FRM-02523 — Billing Calendar Update Log"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Log Information */}
              <div className="form-section">
                <h3 className="form-section-title">Log Information</h3>
                <div className="form-fields">
                  {field(values,"calendarName","Calendar Name")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"period","Period")}
                  {field(values,"maintainedBy","Maintained By")}
                  {field(values,"lastUpdatedDate","Last Updated Date","date")}
                </div>
              </div>

              {/* 2. Update Entries */}
              <div className="form-section">
                <h3 className="form-section-title">Update Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("updateEntries",[
                        ...values.updateEntries,
                        {
                          updateRef:"",
                          updateDate:"",
                          changeDescription:"",
                          effectiveDate:"",
                          updatedBy:"",
                          remarks:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="updateEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Update Ref</th>
                          <th>Update Date</th>
                          <th>Change Description</th>
                          <th>Effective Date</th>
                          <th>Updated By</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>}
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.updateEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`updateEntries.${index}.updateRef`} className="form-input"/></td>
                            <td><Field type="date" name={`updateEntries.${index}.updateDate`} className="form-input"/></td>
                            <td><Field name={`updateEntries.${index}.changeDescription`} className="form-input"/></td>
                            <td><Field type="date" name={`updateEntries.${index}.effectiveDate`} className="form-input"/></td>
                            <td><Field name={`updateEntries.${index}.updatedBy`} className="form-input"/></td>
                            <td><Field name={`updateEntries.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`updateEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 3. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                {field(values,"generalNotes","General Notes")}
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 4. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
                    Submit Billing Calendar Update Log
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

export default FRM02523_BillingCalendarUpdateLogUniversal;