// FRM00983_TDSReturnPreparationChecklist.jsx
// FRM-00983 – TDS Return Preparation Checklist
// Enterprise Grade – Tax & Statutory (India) – Income Tax & TDS/TCS

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
  returnQuarter: Yup.string().required("Required"),
  financialYear: Yup.string().required("Required"),
  returnType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00983",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax & TDS/TCS",
  returnQuarter: "",
  financialYear: "",
  referenceNumber: "",
  location: "",

  /* Return Details */
  returnType: "",
  dueDate: "",
  preparedByName: "",

  /* Dynamic Checklist */
  preparationChecklist: [
    { item: "Deductee Master Verified", status: "", dynamicFields: {} },
    { item: "PAN Validation Completed", status: "", dynamicFields: {} },
    { item: "TDS Calculation Verified", status: "", dynamicFields: {} },
    { item: "Challan Details Matched", status: "", dynamicFields: {} },
    { item: "Interest Calculation Verified", status: "", dynamicFields: {} },
    { item: "Section Codes Verified", status: "", dynamicFields: {} },
    { item: "Form 16/16A Data Prepared", status: "", dynamicFields: {} },
    { item: "Error Validation (FVU) Completed", status: "", dynamicFields: {} },
    { item: "Previous Corrections Considered", status: "", dynamicFields: {} }
  ],

  /* Observations */
  keyObservations: "",
  issuesIdentified: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00983_TDSReturnPreparationChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= DYNAMIC COLUMN FUNCTIONS ================= */

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
      formId="FRM-00983"
      title="TDS Return Preparation Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("TDS Return Preparation Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00983"
              title="TDS RETURN PREPARATION CHECKLIST"
              department="Tax & Statutory (India) – Income Tax & TDS/TCS"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"returnQuarter","Return Quarter")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* RETURN DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Return Details</h3>
                <div className="form-fields">
                  {field(values,"returnType","Return Type (24Q/26Q/27Q/27EQ)")}
                  {field(values,"dueDate","Due Date","date")}
                  {field(values,"preparedByName","Prepared By")}
                </div>
              </div>

              {/* PREPARATION CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">Preparation Checklist</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                    >
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("preparationChecklist", [
                          ...values.preparationChecklist,
                          { item: "", status: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Checklist Item
                    </button>
                  </div>
                )}

                <FieldArray name="preparationChecklist">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Checklist Item</th>
                          <th>Status</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={() => removeColumn(col.key)}
                                  style={{ marginLeft: 5 }}
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
                        {values.preparationChecklist.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field
                                name={`preparationChecklist.${index}.item`}
                                className="form-input"
                              />
                            </td>

                            <td>
                              <Field
                                as="select"
                                name={`preparationChecklist.${index}.status`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>NA</option>
                              </Field>
                            </td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`preparationChecklist.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

                            {!isPrintMode && (
                              <td>
                                <button
                                  type="button"
                                  onClick={()=>remove(index)}
                                >
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

              {/* OBSERVATIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>
                <div className="form-fields">
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"issuesIdentified","Issues / Errors Identified")}
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
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit TDS Return Preparation Checklist
                  </button>
                </div>
              )}

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00983_TDSReturnPreparationChecklist;