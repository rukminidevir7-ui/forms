// FRM01084_ClaimDocumentChecklist.jsx
// FRM-01084 – Claim Document Checklist
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  claimReference: Yup.string().required("Required"),
  policyNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01084",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  claimReference: "",
  policyNumber: "",
  insurer: "",
  businessUnit: "",

  checklistItems: [
    { document: "Claim Form", received: "", remarks: "", dynamicFields: {} },
    { document: "Policy Copy", received: "", remarks: "", dynamicFields: {} },
    { document: "Incident Report", received: "", remarks: "", dynamicFields: {} },
    { document: "Photographic Evidence", received: "", remarks: "", dynamicFields: {} },
    { document: "Police Report (if applicable)", received: "", remarks: "", dynamicFields: {} },
    { document: "Repair/Replacement Estimates", received: "", remarks: "", dynamicFields: {} },
    { document: "Invoices/Proof of Loss", received: "", remarks: "", dynamicFields: {} },
    { document: "Surveyor Report", received: "", remarks: "", dynamicFields: {} },
    { document: "Correspondence with Insurer", received: "", remarks: "", dynamicFields: {} },
    { document: "Other Supporting Documents", received: "", remarks: "", dynamicFields: {} }
  ],

  overallStatus: "",
  pendingDocuments: "",
  comments: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01084_ClaimDocumentChecklist = () => {

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

  const calculateSummary = (items) => {
    const total = items.length;
    const received = items.filter(i => i.received === "Yes").length;
    const pending = total - received;
    return { total, received, pending };
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
      formId="FRM-01084"
      title="Claim Document Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Claim Document Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>{

          const summary = calculateSummary(values.checklistItems);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01084"
                title="CLAIM DOCUMENT CHECKLIST"
                department="Insurance & Risk Finance – Insurance Management"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"claimReference","Claim Reference")}
                    {field(values,"policyNumber","Policy Number")}
                    {field(values,"insurer","Insurer")}
                    {field(values,"businessUnit","Business Unit")}
                  </div>
                </div>

                {/* CHECKLIST TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Checklist Items</h3>

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
                          setFieldValue("checklistItems", [
                            ...values.checklistItems,
                            { document: "", received: "", remarks: "", dynamicFields: {} }
                          ])
                        }
                      >
                        + Add Checklist Item
                      </button>
                    </div>
                  )}

                  <FieldArray name="checklistItems">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Document Description</th>
                            <th>Received (Yes/No)</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={()=>removeColumn(col.key)}
                                    style={{ marginLeft:5 }}
                                  >
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.checklistItems.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                <Field
                                  name={`checklistItems.${index}.document`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  as="select"
                                  name={`checklistItems.${index}.received`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </Field>
                              </td>

                              <td>
                                <Field
                                  name={`checklistItems.${index}.remarks`}
                                  className="form-input"
                                />
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`checklistItems.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
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

                {/* CHECKLIST SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Checklist Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Documents: {summary.total}</div>
                    <div className="print-value">Received: {summary.received}</div>
                    <div className="print-value">Pending: {summary.pending}</div>
                    {field(values,"overallStatus","Overall Status")}
                    {field(values,"pendingDocuments","Pending Documents")}
                    {field(values,"comments","Comments")}
                    {field(values,"remarks","Remarks")}
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
                                onRoleNameChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.roleName`,val)}
                                onChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.data`,val)}
                              />
                              {!isPrintMode &&
                                <button
                                  type="button"
                                  className="btn-remove-role"
                                  onClick={()=>remove(index)}
                                >
                                  Remove Role
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
                      Submit Claim Document Checklist
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

export default FRM01084_ClaimDocumentChecklist;