// FRM00729_TrainingEffectivenessEvaluation.jsx
// FRM-00729/30/31 – Training Effectiveness Evaluation Master Form

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import "../styles/FRM00611.css";

const validationSchema = Yup.object({
  trainingTitle: Yup.string().required("Required"),
  employeeName: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  evaluationDate: Yup.string().required("Required"),
  evaluatedBy: Yup.string().required("Required"),
});

const initialValues = {
  trainingTitle: "",
  employeeName: "",
  department: "",
  evaluationDate: "",
  evaluatedBy: "",

  performanceCriteria: [
    { criteria: "Technical Skill", before: "", after: "", improvement: "", dynamicFields: {} },
    { criteria: "Compliance Understanding", before: "", after: "", improvement: "", dynamicFields: {} },
    { criteria: "Productivity", before: "", after: "", improvement: "", dynamicFields: {} },
    { criteria: "Error Reduction", before: "", after: "", improvement: "", dynamicFields: {} },
    { criteria: "Safety Compliance", before: "", after: "", improvement: "", dynamicFields: {} },
  ],

  productivityImpact: "",
  errorReductionImpact: "",
  qualityImpact: "",
  supervisorComments: "",

  hodSignature: {},
  hrSignature: {},
  effectivenessStatus: "",
  followUpDate: "",

  attachments: [],
  customFields: []
};

const FRM00729_TrainingEffectivenessEvaluation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  // Add Column
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

  // Remove Column
  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const renderField = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <Field name={name} type={type} className="form-input" />
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00729/30/31"
      title="Training Effectiveness Evaluation Master Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Training Effectiveness Evaluation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00729/30/31"
              title="TRAINING EFFECTIVENESS EVALUATION FORM"
              department="Training & Competency"
              process="Training Effectiveness Review"
            >

              {/* SECTION 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 1: Training Information</h3>
                <div className="form-fields">
                  {renderField(values,"trainingTitle","Training Title")}
                  {renderField(values,"employeeName","Employee Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"evaluationDate","Evaluation Date","date")}
                  {renderField(values,"evaluatedBy","Evaluated By")}
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 2: Performance Evaluation</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn} style={{ marginRight: 10 }}>
                      + Add Column
                    </button>
                  </div>
                )}

                <FieldArray name="performanceCriteria">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({ criteria: "", before: "", after: "", improvement: "", dynamicFields: {} })
                          }
                        >
                          + Add Criteria Row
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Criteria</th>
                            <th>Before Training</th>
                            <th>After Training</th>
                            <th>Improvement</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    style={{ marginLeft: 6 }}
                                    onClick={() => removeColumn(col.key)}
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
                          {values.performanceCriteria.map((row, index) => (
                            <tr key={index}>

                              <td>
                                <Field
                                  name={`performanceCriteria.${index}.criteria`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  type="number"
                                  name={`performanceCriteria.${index}.before`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  type="number"
                                  name={`performanceCriteria.${index}.after`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  type="number"
                                  name={`performanceCriteria.${index}.improvement`}
                                  className="form-input"
                                />
                              </td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`performanceCriteria.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* SECTION 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 3: KPI Impact</h3>
                <div className="form-fields">
                  {renderField(values,"productivityImpact","Productivity Improvement %")}
                  {renderField(values,"errorReductionImpact","Error Reduction %")}
                  {renderField(values,"qualityImpact","Quality Score Impact")}
                </div>

                <Field
                  as="textarea"
                  name="supervisorComments"
                  placeholder="Supervisor Comments"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* SECTION 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 4: Final Approval</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HOD Approval"
                      value={values.hodSignature}
                      onChange={(val) => setFieldValue("hodSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR Approval"
                      value={values.hrSignature}
                      onChange={(val) => setFieldValue("hrSignature", val)}
                    />
                  </div>
                </div>

                {!isPrintMode ? (
                  <Field as="select" name="effectivenessStatus" className="form-input">
                    <option value="">Effectiveness Status</option>
                    <option>Effective</option>
                    <option>Needs Retraining</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.effectivenessStatus}</div>
                )}

                {renderField(values,"followUpDate","Follow-up Date","date")}
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Evaluation
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

export default FRM00729_TrainingEffectivenessEvaluation;
