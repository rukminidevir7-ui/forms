// FRM02551_PaymentFollowupCallLogUniversal.jsx
// FRM-02551 – Payment Follow-up Call Log — Universal Form
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
  formId: "FRM-02551",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Log Context */
  clientName: "",
  clientCode: "",
  businessUnit: "",
  period: "",
  maintainedBy: "",

  /* 2. Call Log Entries */
  callEntries: [
    {
      callDate: "",
      invoiceNo: "",
      contactPerson: "",
      contactMethod: "",
      discussionSummary: "",
      nextAction: "",
      followUpDate: "",
      status: "",
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

const FRM02551_PaymentFollowupCallLogUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02551" title="Payment Follow-Up Call Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Payment Follow-Up Call Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02551"
              title="FRM-02551 — Payment Follow-Up Call Log — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Log Context */}
              <div className="form-section">
                <h3 className="form-section-title">Log Context</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"period","Period")}
                  {field(values,"maintainedBy","Maintained By")}
                </div>
              </div>

              {/* 2. Call Log Entries */}
              <div className="form-section">
                <h3 className="form-section-title">Call Log Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("callEntries",[
                        ...values.callEntries,
                        {
                          callDate:"",
                          invoiceNo:"",
                          contactPerson:"",
                          contactMethod:"",
                          discussionSummary:"",
                          nextAction:"",
                          followUpDate:"",
                          status:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="callEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Call Date</th>
                          <th>Invoice No</th>
                          <th>Contact Person</th>
                          <th>Contact Method</th>
                          <th>Discussion Summary</th>
                          <th>Next Action</th>
                          <th>Follow-up Date</th>
                          <th>Status</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.callEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field type="date" name={`callEntries.${index}.callDate`} className="form-input"/></td>
                            <td><Field name={`callEntries.${index}.invoiceNo`} className="form-input"/></td>
                            <td><Field name={`callEntries.${index}.contactPerson`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`callEntries.${index}.contactMethod`} className="form-input">
                                <option value="">Select</option>
                                <option>Phone</option>
                                <option>Email</option>
                                <option>Portal</option>
                                <option>In-Person</option>
                              </Field>
                            </td>
                            <td><Field name={`callEntries.${index}.discussionSummary`} className="form-input"/></td>
                            <td><Field name={`callEntries.${index}.nextAction`} className="form-input"/></td>
                            <td><Field type="date" name={`callEntries.${index}.followUpDate`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`callEntries.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Open</option>
                                <option>Follow-up Scheduled</option>
                                <option>Resolved</option>
                                <option>Escalated</option>
                              </Field>
                            </td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`callEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                    Submit Call Log
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

export default FRM02551_PaymentFollowupCallLogUniversal;