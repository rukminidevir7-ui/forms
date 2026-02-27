// FRM01388_RBIInspectionReadinessPackChecklist.jsx
// FRM-01388 – RBI Inspection Readiness Pack Checklist
// Enterprise Grade – FEMA & RBI – Reporting & Compliance

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
  companyName: Yup.string().required("Required"),
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  inspectionPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01388",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Entity Details */
  companyName: "",
  cin: "",
  pan: "",
  inspectionPeriod: "",
  inspectionDate: "",
  preparedBy: "",

  /* 2. Readiness Checklist */
  readinessChecklist: [
    { item: "FEMA policies and procedures", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "FDI/ODI transaction files", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "ECB documentation", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Remittance records and supporting docs", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "FLA filings and reconciliations", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Registers and logs updated", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Compliance calendar status", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Previous inspection observations closure", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Evidence dossier completeness", available: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Management approvals and sign-offs", available: "", verifiedBy: "", remarks: "", dynamicFields: {} }
  ],

  /* 3. Notes */
  generalNotes: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01388_RBIInspectionReadinessPackChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ---- Add Column ---- */
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

  /* ---- Remove Column ---- */
  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field
              as={type === "textarea" ? "textarea" : "input"}
              name={name}
              type={type !== "textarea" ? type : undefined}
              className="form-input"
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01388" title="RBI Inspection Readiness Pack Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("RBI Inspection Readiness Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01388"
              title="FRM-01388 — RBI Inspection Readiness Pack Checklist"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Entity Details */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"inspectionPeriod","Inspection Period")}
                  {field(values,"inspectionDate","Inspection Date","date")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* 2. Readiness Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Readiness Checklist</h3>

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
                        setFieldValue("readinessChecklist", [
                          ...values.readinessChecklist,
                          { item: "", available: "", verifiedBy: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="readinessChecklist">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Checklist Item</th>
                          <th>Available (Yes/No)</th>
                          <th>Verified By</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.readinessChecklist.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`readinessChecklist.${index}.item`} className="form-input"/>
                            </td>

                            <td>
                              <Field as="select"
                                name={`readinessChecklist.${index}.available`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>

                            <td>
                              <Field name={`readinessChecklist.${index}.verifiedBy`} className="form-input"/>
                            </td>

                            <td>
                              <Field name={`readinessChecklist.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`readinessChecklist.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
                                </button>
                              </td>
                            }
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
                  {field(values,"generalNotes","General Notes","textarea")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* 4. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
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
                    Submit Inspection Readiness Pack
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

export default FRM01388_RBIInspectionReadinessPackChecklist;