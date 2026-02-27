// FRM02556_PromiseToPayTrackerUniversal.jsx
// FRM-02556 – Promise-to-Pay Tracker — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Collections, Receipts & Disputes

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
  clientName: Yup.string().required("Required"),
  period: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02556",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Tracker Context */
  clientName: "",
  clientCode: "",
  businessUnit: "",
  period: "",
  maintainedBy: "",

  /* 2. Promise-to-Pay Entries */
  ptpEntries: [
    {
      entryRef: "",
      invoiceNo: "",
      promiseDate: "",
      promisedAmount: "",
      currency: "",
      committedBy: "",
      followUpDate: "",
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
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02556_PromiseToPayTrackerUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02556" title="Promise-to-Pay Tracker">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Promise-to-Pay Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02556"
              title="FRM-02556 — Promise-to-Pay Tracker — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Tracker Context */}
              <div className="form-section">
                <h3 className="form-section-title">Tracker Context</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"period","Period")}
                  {field(values,"maintainedBy","Maintained By")}
                </div>
              </div>

              {/* 2. Promise-to-Pay Entries */}
              <div className="form-section">
                <h3 className="form-section-title">Promise-to-Pay Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("ptpEntries",[
                        ...values.ptpEntries,
                        {
                          entryRef:"",
                          invoiceNo:"",
                          promiseDate:"",
                          promisedAmount:"",
                          currency:"",
                          committedBy:"",
                          followUpDate:"",
                          status:"",
                          remarks:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="ptpEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Entry Ref</th>
                          <th>Invoice No</th>
                          <th>Promise Date</th>
                          <th>Promised Amount</th>
                          <th>Currency</th>
                          <th>Committed By</th>
                          <th>Follow-up Date</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.ptpEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`ptpEntries.${index}.entryRef`} className="form-input"/></td>
                            <td><Field name={`ptpEntries.${index}.invoiceNo`} className="form-input"/></td>
                            <td><Field type="date" name={`ptpEntries.${index}.promiseDate`} className="form-input"/></td>
                            <td><Field type="number" name={`ptpEntries.${index}.promisedAmount`} className="form-input"/></td>
                            <td><Field name={`ptpEntries.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`ptpEntries.${index}.committedBy`} className="form-input"/></td>
                            <td><Field type="date" name={`ptpEntries.${index}.followUpDate`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`ptpEntries.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Open</option>
                                <option>Honored</option>
                                <option>Broken</option>
                                <option>Escalated</option>
                              </Field>
                            </td>
                            <td><Field name={`ptpEntries.${index}.remarks`} className="form-input"/></td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`ptpEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                <div className="form-fields">
                  {field(values,"generalNotes","General Notes")}
                </div>
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

                {field(values,"approvalDate","Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit PTP Tracker
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

export default FRM02556_PromiseToPayTrackerUniversal;