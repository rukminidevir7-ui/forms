// FRM02524_BillingControlsChecklistUniversal.jsx
// FRM-02524 – Billing Controls Checklist — Universal Form
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
  processArea: Yup.string().required("Required"),
  reviewDate: Yup.date().required("Required"),
  overallStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02524",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Control Context */
  clientBusinessUnit: "",
  processArea: "",
  reviewPeriod: "",
  reviewedBy: "",
  reviewDate: "",

  /* 2. Billing Controls */
  controlItems: [
    { controlItem: "Client master data validated", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Billing terms approved", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Rate card approved and active", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Tax configuration validated", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "PO / Contract mapping verified", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Invoice template configured", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Billing schedule approved", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "GSTIN / Tax ID verified", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Revenue recognition rules configured", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Approval workflow configured", status: "", remarks: "", dynamicFields:{} },
    { controlItem: "Supporting documentation available", status: "", remarks: "", dynamicFields:{} }
  ],

  /* 3. Overall Assessment */
  overallStatus: "",
  keyObservations: "",
  recommendedActions: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02524_BillingControlsChecklistUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02524" title="Billing Controls Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Controls Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02524"
              title="FRM-02524 — Billing Controls Checklist"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Control Context */}
              <div className="form-section">
                <h3 className="form-section-title">Control Context</h3>
                <div className="form-fields">
                  {field(values,"clientBusinessUnit","Client / Business Unit")}
                  {field(values,"processArea","Process Area")}
                  {field(values,"reviewPeriod","Review Period")}
                  {field(values,"reviewedBy","Reviewed By")}
                  {field(values,"reviewDate","Review Date","date")}
                </div>
              </div>

              {/* 2. Billing Controls */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Controls</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("controlItems",[
                        ...values.controlItems,
                        { controlItem:"", status:"", remarks:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="controlItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Control Item</th>
                          <th>Status (Yes/No)</th>
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
                        {values.controlItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`controlItems.${index}.controlItem`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select" name={`controlItems.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`controlItems.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`controlItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 3. Overall Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Overall Assessment</h3>
                <div className="form-fields">
                  {field(values,"overallStatus","Overall Control Status (Effective / Needs Improvement / Not Effective)")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"recommendedActions","Recommended Actions")}
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
                    Submit Billing Controls Checklist
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

export default FRM02524_BillingControlsChecklistUniversal;