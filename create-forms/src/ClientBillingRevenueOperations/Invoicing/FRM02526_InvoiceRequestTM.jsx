// FRM02526_InvoiceRequestTMUniversal.jsx
// FRM-02526 – Invoice Request (T&M) — Universal Form
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
  clientName: Yup.string().required("Required"),
  billingPeriod: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02526",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Client / Project Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  businessUnit: "",
  billingPeriod: "",
  requestDate: "",

  /* 2. Time & Material Details */
  tmItems: [
    {
      resourceRole: "",
      description: "",
      hoursQty: "",
      rate: "",
      amount: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Billing Summary */
  subtotal: "",
  taxes: "",
  totalAmount: "",
  currency: "",

  /* 4. Supporting Details */
  timesheetsAttached: "",
  approvalsAttached: "",
  poReference: "",
  remarks: "",

  /* 5. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02526_InvoiceRequestTMUniversal = () => {

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

  const calculateTotals = (values, setFieldValue) => {
    const subtotal = values.tmItems.reduce((sum, item) => {
      const amount = Number(item.hoursQty || 0) * Number(item.rate || 0);
      return sum + amount;
    }, 0);

    const taxes = Number(values.taxes || 0);
    const total = subtotal + taxes;

    setFieldValue("subtotal", subtotal.toFixed(2));
    setFieldValue("totalAmount", total.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02526" title="Invoice Request (T&M)">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Invoice Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02526"
              title="FRM-02526 — Invoice Request (T&M)"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Client / Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"billingPeriod","Billing Period")}
                  {field(values,"requestDate","Request Date","date")}
                </div>
              </div>

              {/* 2. T&M Details */}
              <div className="form-section">
                <h3 className="form-section-title">Time & Material Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("tmItems",[
                        ...values.tmItems,
                        {
                          resourceRole:"",
                          description:"",
                          hoursQty:"",
                          rate:"",
                          amount:"",
                          remarks:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="tmItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Resource / Role</th>
                          <th>Description</th>
                          <th>Hours / Qty</th>
                          <th>Rate</th>
                          <th>Amount</th>
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
                        {values.tmItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`tmItems.${index}.resourceRole`} className="form-input"/></td>
                            <td><Field name={`tmItems.${index}.description`} className="form-input"/></td>
                            <td>
                              <Field
                                name={`tmItems.${index}.hoursQty`}
                                className="form-input"
                                onBlur={()=>calculateTotals(values,setFieldValue)}
                              />
                            </td>
                            <td>
                              <Field
                                name={`tmItems.${index}.rate`}
                                className="form-input"
                                onBlur={()=>calculateTotals(values,setFieldValue)}
                              />
                            </td>
                            <td className="print-value">
                              {(Number(row.hoursQty||0)*Number(row.rate||0)).toFixed(2)}
                            </td>
                            <td><Field name={`tmItems.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`tmItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 3. Billing Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Summary</h3>
                <div className="form-fields">
                  {field(values,"subtotal","Subtotal")}
                  {field(values,"taxes","Taxes")}
                  {field(values,"totalAmount","Total Amount")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 4. Supporting Details */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Details</h3>
                <div className="form-fields">
                  {field(values,"timesheetsAttached","Timesheets Attached")}
                  {field(values,"approvalsAttached","Approvals Attached")}
                  {field(values,"poReference","PO Reference")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

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

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Invoice Request
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

export default FRM02526_InvoiceRequestTMUniversal;