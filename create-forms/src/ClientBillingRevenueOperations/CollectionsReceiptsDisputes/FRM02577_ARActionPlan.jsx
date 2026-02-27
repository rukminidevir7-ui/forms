// FRM02577_ARActionPlanUniversal.jsx
// FRM-02577 – AR Action Plan — Universal Form
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
  actionPlanReferenceNo: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  preparedDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02577",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Reference Details */
  actionPlanReferenceNo: "",
  clientName: "",
  clientCode: "",
  businessUnit: "",
  preparedDate: "",

  /* 2. Outstanding Summary */
  totalOutstandingAmount: "",
  agingBucket: "",
  numberOfInvoices: "",
  riskLevel: "",

  /* 3. Action Plan Details */
  actionItems: [
    {
      actionItem: "",
      owner: "",
      targetDate: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 4. Risks & Dependencies */
  keyRisks: "",
  dependencies: "",
  mitigationPlan: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02577_ARActionPlanUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02577" title="AR Action Plan">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("AR Action Plan Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02577"
              title="FRM-02577 — AR Action Plan — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"actionPlanReferenceNo","Action Plan Reference No")}
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedDate","Prepared Date","date")}
                </div>
              </div>

              {/* 2. Outstanding Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Outstanding Summary</h3>
                <div className="form-fields">
                  {field(values,"totalOutstandingAmount","Total Outstanding Amount","number")}
                  {field(values,"agingBucket","Aging Bucket")}
                  {field(values,"numberOfInvoices","Number of Invoices","number")}
                  {field(values,"riskLevel","Risk Level")}
                </div>
              </div>

              {/* 3. Action Plan Details */}
              <div className="form-section">
                <h3 className="form-section-title">Action Plan Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("actionItems",[
                        ...values.actionItems,
                        { actionItem:"", owner:"", targetDate:"", status:"", remarks:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="actionItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Action Item</th>
                          <th>Owner</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.actionItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`actionItems.${index}.actionItem`} className="form-input"/></td>
                            <td><Field name={`actionItems.${index}.owner`} className="form-input"/></td>
                            <td><Field type="date" name={`actionItems.${index}.targetDate`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`actionItems.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>On Hold</option>
                              </Field>
                            </td>
                            <td><Field name={`actionItems.${index}.remarks`} className="form-input"/></td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`actionItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 4. Risks & Dependencies */}
              <div className="form-section">
                <h3 className="form-section-title">Risks & Dependencies</h3>
                <div className="form-fields">
                  {field(values,"keyRisks","Key Risks","text")}
                  {field(values,"dependencies","Dependencies","text")}
                  {field(values,"mitigationPlan","Mitigation Plan","text")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Sign-off */}
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
                    Submit AR Action Plan
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

export default FRM02577_ARActionPlanUniversal;