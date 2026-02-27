// FRM01089_LossAssessmentChecklist.jsx
// FRM-01089 – Loss Assessment Checklist
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
  estimatedLossAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01089",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",

  claimReference: "",
  policyNumber: "",
  insurer: "",
  businessUnit: "",
  locationOfLoss: "",
  assessmentDate: "",

  assessmentItems: [
    { item: "Incident Details Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Site Inspection Completed", status: "", remarks: "", dynamicFields: {} },
    { item: "Cause of Loss Identified", status: "", remarks: "", dynamicFields: {} },
    { item: "Extent of Damage Assessed", status: "", remarks: "", dynamicFields: {} },
    { item: "Supporting Evidence Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Estimated Loss Calculated", status: "", remarks: "", dynamicFields: {} },
    { item: "Policy Coverage Confirmed", status: "", remarks: "", dynamicFields: {} },
    { item: "Exclusions Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Salvage Value Assessed", status: "", remarks: "", dynamicFields: {} },
    { item: "Assessment Conclusion Documented", status: "", remarks: "", dynamicFields: {} }
  ],

  overallAssessment: "",
  estimatedLossAmount: "",
  keyObservations: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01089_LossAssessmentChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;

    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: name }]);
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
      formId="FRM-01089"
      title="Loss Assessment Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Loss Assessment Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01089"
              title="LOSS ASSESSMENT CHECKLIST"
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
                  {field(values,"claimReference","Claim Reference")}
                  {field(values,"policyNumber","Policy Number")}
                  {field(values,"insurer","Insurer")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"locationOfLoss","Location of Loss")}
                  {field(values,"assessmentDate","Assessment Date","date")}
                </div>
              </div>

              {/* ASSESSMENT ITEMS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Assessment Items</h3>

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
                        setFieldValue("assessmentItems", [
                          ...values.assessmentItems,
                          { item: "", status: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Assessment Item
                    </button>
                  </div>
                )}

                <FieldArray name="assessmentItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>Status (Yes/No)</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={()=>removeColumn(col.key)}
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
                        {values.assessmentItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field
                                name={`assessmentItems.${index}.item`}
                                className="form-input"
                              />
                            </td>

                            <td>
                              <Field
                                as="select"
                                name={`assessmentItems.${index}.status`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>

                            <td>
                              <Field
                                name={`assessmentItems.${index}.remarks`}
                                className="form-input"
                              />
                            </td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`assessmentItems.${index}.dynamicFields.${col.key}`}
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

              {/* ASSESSMENT SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Assessment Summary</h3>
                <div className="form-fields">
                  {field(values,"overallAssessment","Overall Assessment")}
                  {field(values,"estimatedLossAmount","Estimated Loss Amount","number")}
                  {field(values,"keyObservations","Key Observations")}
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
                    Submit Loss Assessment Checklist
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

export default FRM01089_LossAssessmentChecklist;