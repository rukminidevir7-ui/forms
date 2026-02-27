// FRM02522_ClientBillingSLADefinitionUniversal.jsx
// FRM-02522 – Client Billing SLA Definition — Universal Form
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
  clientName: Yup.string().required("Required"),
  slaName: Yup.string().required("Required"),
  effectiveDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02522",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  legalEntity: "",
  businessUnit: "",
  effectiveDate: "",
  referenceNo: "",

  /* 2. SLA Overview */
  slaName: "",
  slaDescription: "",
  serviceScope: "",
  applicableBillingType: "",

  /* 3. SLA Metrics */
  slaMetrics: [
    {
      metric: "",
      target: "",
      measurementMethod: "",
      frequency: "",
      penalty: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 4. Escalation & Governance */
  escalationMatrix: "",
  reviewCycle: "",
  reportingMethod: "",
  specialConditions: "",

  /* 5. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02522_ClientBillingSLADefinitionUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02522" title="Client Billing SLA Definition">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Client Billing SLA Definition Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02522"
              title="FRM-02522 — Client Billing SLA Definition"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntity","Legal Entity")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"referenceNo","Reference No")}
                </div>
              </div>

              {/* 2. SLA Overview */}
              <div className="form-section">
                <h3 className="form-section-title">SLA Overview</h3>
                <div className="form-fields">
                  {field(values,"slaName","SLA Name")}
                  {field(values,"slaDescription","SLA Description")}
                  {field(values,"serviceScope","Service Scope")}
                  {field(values,"applicableBillingType","Applicable Billing Type")}
                </div>
              </div>

              {/* 3. SLA Metrics */}
              <div className="form-section">
                <h3 className="form-section-title">SLA Metrics</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("slaMetrics",[
                        ...values.slaMetrics,
                        {
                          metric:"",
                          target:"",
                          measurementMethod:"",
                          frequency:"",
                          penalty:"",
                          remarks:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="slaMetrics">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Metric</th>
                          <th>Target</th>
                          <th>Measurement Method</th>
                          <th>Frequency</th>
                          <th>Penalty / Action</th>
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
                        {values.slaMetrics.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`slaMetrics.${index}.metric`} className="form-input"/></td>
                            <td><Field name={`slaMetrics.${index}.target`} className="form-input"/></td>
                            <td><Field name={`slaMetrics.${index}.measurementMethod`} className="form-input"/></td>
                            <td><Field name={`slaMetrics.${index}.frequency`} className="form-input"/></td>
                            <td><Field name={`slaMetrics.${index}.penalty`} className="form-input"/></td>
                            <td><Field name={`slaMetrics.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`slaMetrics.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 4. Escalation & Governance */}
              <div className="form-section">
                <h3 className="form-section-title">Escalation & Governance</h3>
                <div className="form-fields">
                  {field(values,"escalationMatrix","Escalation Matrix")}
                  {field(values,"reviewCycle","Review Cycle")}
                  {field(values,"reportingMethod","Reporting Method")}
                  {field(values,"specialConditions","Special Conditions")}
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
                    Submit SLA Definition
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

export default FRM02522_ClientBillingSLADefinitionUniversal;