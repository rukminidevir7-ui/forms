// FRM01096_PolicyScheduleRegister.jsx
// FRM-01096 – Policy Schedule Register
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01096",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  location: "",
  businessUnit: "",

  policyRegister: [
    {
      policyNo: "",
      insurer: "",
      policyType: "",
      startDate: "",
      endDate: "",
      sumInsured: "",
      premium: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  comments: "",

  approvalRoles: [
    { roleName: "Maintained By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01096_PolicyScheduleRegister = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  /* ================= SUMMARY ================= */

  const calculateSummary = (policies) => {
    const total = policies.length;
    const active = policies.filter(p => p.status === "Active").length;
    const expired = policies.filter(p => p.status === "Expired").length;
    return { total, active, expired };
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
      formId="FRM-01096"
      title="Policy Schedule Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Policy Schedule Register Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values.policyRegister);

          return (
            <Form>
              <ModernA4Template
                formId="FRM-01096"
                title="POLICY SCHEDULE REGISTER"
                department="Insurance & Risk Finance – Insurance Management"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"department","Department")}
                    {field(values,"function","Function")}
                    {field(values,"location","Location")}
                    {field(values,"businessUnit","Business Unit")}
                  </div>
                </div>

                {/* POLICY REGISTER TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Policy Register</h3>

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
                          setFieldValue("policyRegister", [
                            ...values.policyRegister,
                            {
                              policyNo:"",
                              insurer:"",
                              policyType:"",
                              startDate:"",
                              endDate:"",
                              sumInsured:"",
                              premium:"",
                              status:"",
                              remarks:"",
                              dynamicFields:{}
                            }
                          ])
                        }
                      >
                        + Add Policy
                      </button>
                    </div>
                  )}

                  <FieldArray name="policyRegister">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Policy No</th>
                            <th>Insurer</th>
                            <th>Policy Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Sum Insured</th>
                            <th>Premium</th>
                            <th>Status</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.policyRegister.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`policyRegister.${index}.policyNo`} className="form-input"/></td>
                              <td><Field name={`policyRegister.${index}.insurer`} className="form-input"/></td>
                              <td><Field name={`policyRegister.${index}.policyType`} className="form-input"/></td>
                              <td><Field name={`policyRegister.${index}.startDate`} type="date" className="form-input"/></td>
                              <td><Field name={`policyRegister.${index}.endDate`} type="date" className="form-input"/></td>
                              <td><Field name={`policyRegister.${index}.sumInsured`} type="number" className="form-input"/></td>
                              <td><Field name={`policyRegister.${index}.premium`} type="number" className="form-input"/></td>

                              <td>
                                <Field as="select" name={`policyRegister.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Active</option>
                                  <option>Expired</option>
                                  <option>Cancelled</option>
                                </Field>
                              </td>

                              <td><Field name={`policyRegister.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`policyRegister.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                    <div className="print-value">Total Policies: {summary.total}</div>
                    <div className="print-value">Active Policies: {summary.active}</div>
                    <div className="print-value">Expired Policies: {summary.expired}</div>
                    {field(values,"comments","Comments")}
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
                          <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
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
                      Submit Policy Schedule Register
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

export default FRM01096_PolicyScheduleRegister;