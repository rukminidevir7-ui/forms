// FRM00735_CompetencyAssessmentChecklist.jsx
// FRM-00735 – Competency Assessment Checklist

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
  employeeName: Yup.string().required("Required"),
  employeeId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
  assessmentDate: Yup.string().required("Required"),
  assessedBy: Yup.string().required("Required"),
});

const initialValues = {
  employeeName: "",
  employeeId: "",
  department: "",
  designation: "",
  assessmentDate: "",
  assessedBy: "",

  competencies: [
    {
      skillArea: "",
      requiredLevel: "",
      actualLevel: "",
      gap: "",
      remarks: "",
      status: "",
      dynamicFields: {}
    }
  ],

  overallCompetency: "",
  trainingRequired: "",

  assessorSignature: {},
  hrSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00735_CompetencyAssessmentChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Field Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");

    if (dynamicColumns.find(col => col.key === key)) {
      alert("Field already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

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
      formId="FRM-00735"
      title="Competency Assessment Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Competency Assessment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00735"
              title="COMPETENCY ASSESSMENT CHECKLIST"
              department="Training & Competency"
              process="Competency Evaluation"
            >

              {/* EMPLOYEE INFO */}
              <div className="form-section">
                <h3 className="form-section-title">Employee Information</h3>
                <div className="form-fields">
                  {renderField(values,"employeeName","Employee Name")}
                  {renderField(values,"employeeId","Employee ID")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"designation","Designation")}
                  {renderField(values,"assessmentDate","Assessment Date","date")}
                  {renderField(values,"assessedBy","Assessed By")}
                </div>
              </div>

              {/* COMPETENCY TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Competency Evaluation</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                      style={{ marginRight: 10 }}
                    >
                      + Add Field
                    </button>
                  </div>
                )}

                <FieldArray name="competencies">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({
                              skillArea: "",
                              requiredLevel: "",
                              actualLevel: "",
                              gap: "",
                              remarks: "",
                              status: "",
                              dynamicFields: {}
                            })
                          }
                        >
                          + Add Skill Area
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Skill Area</th>
                            <th>Required</th>
                            <th>Actual</th>
                            <th>Gap</th>
                            <th>Remarks</th>
                            <th>Status</th>

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
                          {values.competencies.map((row, index) => (
                            <tr key={index}>

                              <td>
                                <Field name={`competencies.${index}.skillArea`} className="form-input" />
                              </td>

                              <td>
                                <Field type="number" name={`competencies.${index}.requiredLevel`} className="form-input" />
                              </td>

                              <td>
                                <Field type="number" name={`competencies.${index}.actualLevel`} className="form-input" />
                              </td>

                              <td>
                                <Field type="number" name={`competencies.${index}.gap`} className="form-input" />
                              </td>

                              <td>
                                <Field name={`competencies.${index}.remarks`} className="form-input" />
                              </td>

                              <td>
                                {!isPrintMode ? (
                                  <Field as="select" name={`competencies.${index}.status`} className="form-input">
                                    <option value="">Select</option>
                                    <option>Pass</option>
                                    <option>Fail</option>
                                  </Field>
                                ) : (
                                  <div className="print-value">{row.status}</div>
                                )}
                              </td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`competencies.${index}.dynamicFields.${col.key}`}
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

              {/* FINAL EVALUATION */}
              <div className="form-section">
                <h3 className="form-section-title">Final Evaluation</h3>

                <div className="form-fields">
                  {renderField(values,"overallCompetency","Overall Competency Level")}

                  {!isPrintMode ? (
                    <Field as="select" name="trainingRequired" className="form-input">
                      <option value="">Training Required?</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.trainingRequired}</div>
                  )}
                </div>

                <div className="three-column-signatures" style={{ marginTop: 25 }}>
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Assessor Signature"
                      value={values.assessorSignature}
                      onChange={(val) => setFieldValue("assessorSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR Verification"
                      value={values.hrSignature}
                      onChange={(val) => setFieldValue("hrSignature", val)}
                    />
                  </div>
                </div>

                {/* CUSTOM SIGNATURES */}
                <div style={{ marginTop: 30 }}>
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 15 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: 25 }}>
                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />

                            {!isPrintMode && (
                              <button type="button" onClick={() => remove(index)}>
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Competency Assessment
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

export default FRM00735_CompetencyAssessmentChecklist;
