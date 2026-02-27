// FRM01382_FEMAAuditChecklist.jsx
// FRM-01382 – FEMA Audit Checklist
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
  auditPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01382",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Entity Details */
  companyName: "",
  cin: "",
  pan: "",
  auditPeriod: "",
  auditDate: "",
  auditorName: "",

  /* 2. Audit Checklist */
  auditChecklist: [
    { item: "FEMA policies documented", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "FDI/ODI transactions reviewed", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "ECB compliance verified", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Remittance compliance checked", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "FLA filings validated", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Regulatory approvals verified", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Documentation completeness confirmed", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Registers and logs updated", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Exceptions tracked and resolved", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} },
    { item: "Internal controls evaluated", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} }
  ],

  /* 3. Observations */
  keyObservations: "",
  riskAreas: "",

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

const FRM01382_FEMAAuditChecklist = () => {

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
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01382" title="FEMA Audit Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FEMA Audit Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01382"
              title="FRM-01382 — FEMA Audit Checklist"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Entity Details */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"auditPeriod","Audit Period")}
                  {field(values,"auditDate","Audit Date","date")}
                  {field(values,"auditorName","Auditor Name")}
                </div>
              </div>

              {/* 2. Audit Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Checklist</h3>

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
                        setFieldValue("auditChecklist", [
                          ...values.auditChecklist,
                          { item: "", compliant: "", verifiedBy: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="auditChecklist">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Checklist Item</th>
                          <th>Compliant (Yes/No)</th>
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
                        {values.auditChecklist.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`auditChecklist.${index}.item`} className="form-input"/>
                            </td>

                            <td>
                              <Field as="select"
                                name={`auditChecklist.${index}.compliant`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>

                            <td>
                              <Field name={`auditChecklist.${index}.verifiedBy`} className="form-input"/>
                            </td>

                            <td>
                              <Field name={`auditChecklist.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`auditChecklist.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 3. Observations */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>
                <div className="form-fields">
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"riskAreas","Risk Areas Identified")}
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
                    Submit Audit Checklist
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

export default FRM01382_FEMAAuditChecklist;