// FRM01259_ROCFilingChecklist.jsx
// FRM-01259 – ROC Filing Checklist
// Enterprise Grade – Corporate & Secretarial – Governance & ROC

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
  filingType: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01259",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  filingType: "",
  relevantForm: "",
  dueDate: "",
  preparedBy: "",

  checklistItems: [
    { item: "Applicable form identified correctly", status: "", remarks: "", dynamicFields: {} },
    { item: "Supporting documents compiled", status: "", remarks: "", dynamicFields: {} },
    { item: "Digital signatures available and valid", status: "", remarks: "", dynamicFields: {} },
    { item: "Fees calculated correctly", status: "", remarks: "", dynamicFields: {} }
  ],

  signedForms: "",
  approvals: "",
  financialStatements: "",
  challans: "",
  otherSupportingDocuments: "",

  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01259_ROCFilingChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return;
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
    <ModernFormWrapper formId="FRM-01259" title="ROC Filing Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ROC Filing Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01259"
              title="ROC FILING CHECKLIST"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* GENERAL INFO */}
              <div className="form-section">
                <h3 className="form-section-title">1. General Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"filingType","Filing Type")}
                  {field(values,"relevantForm","Relevant Form (e.g., AOC-4, MGT-7, PAS-3)")}
                  {field(values,"dueDate","Due Date","date")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* COMPLIANCE CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">2. Compliance Checklist</h3>

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
                          { item: "", status: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Item
                    </button>
                  </div>
                )}

                <FieldArray name="checklistItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Yes / No / NA</th>
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
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`checklistItems.${index}.item`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`checklistItems.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`checklistItems.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`checklistItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* ATTACHMENTS SECTION (STRUCTURED) */}
              <div className="form-section">
                <h3 className="form-section-title">3. Attachments</h3>
                <div className="form-fields">
                  {field(values,"signedForms","Signed Forms")}
                  {field(values,"approvals","Board / Shareholder Approvals")}
                  {field(values,"financialStatements","Financial Statements / Annexures")}
                  {field(values,"challans","Challans / Payment Proof")}
                  {field(values,"otherSupportingDocuments","Other Supporting Documents")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* SIGN-OFF WITH DYNAMIC ROLES */}
              <div className="form-section">
                <h3 className="form-section-title">4. Sign-off</h3>

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

                <div className="form-fields" style={{ marginTop: 20 }}>
                  {field(values,"comments","Comments")}
                </div>

              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit ROC Filing Checklist
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

export default FRM01259_ROCFilingChecklist;