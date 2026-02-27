// FRM00746_YearEndCloseChecklist.jsx
// FRM-00746 – Year-End Close Checklist (Enterprise Grade – Updated with Dynamic Columns)

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

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  fiscalYear: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  checklistDate: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  overallStatus: Yup.string().required("Required"),
  targetCompletionDate: Yup.string().required("Required")
});

const initialChecklist = [
  {
    controlArea: "Journal Entries Review",
    item: "All manual journal entries reviewed and approved",
    status: "",
    owner: "",
    evidence: "",
    remarks: "",
    dynamicFields: {}
  },
  {
    controlArea: "Balance Sheet Reconciliation",
    item: "All balance sheet accounts reconciled and signed-off",
    status: "",
    owner: "",
    evidence: "",
    remarks: "",
    dynamicFields: {}
  }
];

const initialValues = {
  companyName: "",
  fiscalYear: "",
  department: "",
  checklistDate: "",
  preparedBy: "",
  checklist: initialChecklist,
  overallStatus: "",
  keyIssues: "",
  actionsRequired: "",
  targetCompletionDate: "",
  preparedSignature: {},
  reviewedSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  attachments: [],
  customFields: []
};

const FRM00746_YearEndCloseChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ============================
     Dynamic Column Logic
  ============================ */

  const addColumn = () => {
    const columnName = prompt("Enter New Checklist Column Name");
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
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00746" title="Year-End Close Checklist">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Year-End Close Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00746"
              title="YEAR-END CLOSE CHECKLIST"
              department="Finance & Accounting – Annual Financial Closure"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"fiscalYear","Fiscal Year")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"checklistDate","Checklist Date","date")}
                  {renderField(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* CHECKLIST TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Year-End Close Activities</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 20 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                      style={{ marginRight: 10 }}   // ✅ 10px spacing
                    >
                      + Add Custom Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      onClick={() =>
                        values.checklist.push({
                          controlArea:"",
                          item:"",
                          status:"",
                          owner:"",
                          evidence:"",
                          remarks:"",
                          dynamicFields: {}
                        })
                      }
                    >
                      + Add Checklist Item
                    </button>
                  </div>
                )}

                <FieldArray name="checklist">
                  {({ remove }) => (

                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Control Area</th>
                          <th>Checklist Item</th>
                          <th>Status</th>
                          <th>Owner</th>
                          <th>Evidence Ref</th>
                          <th>Remarks</th>

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
                        {values.checklist.map((row, index) => (
                          <tr key={index}>
                            <td><Field name={`checklist.${index}.controlArea`} className="form-input"/></td>
                            <td><Field name={`checklist.${index}.item`} className="form-input"/></td>

                            <td>
                              {!isPrintMode ? (
                                <Field as="select" name={`checklist.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Done</option>
                                  <option>Pending</option>
                                  <option>NA</option>
                                </Field>
                              ) : (
                                <div className="print-value">{row.status}</div>
                              )}
                            </td>

                            <td><Field name={`checklist.${index}.owner`} className="form-input"/></td>
                            <td><Field name={`checklist.${index}.evidence`} className="form-input"/></td>
                            <td><Field name={`checklist.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`checklist.${index}.dynamicFields.${col.key}`}
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

                  )}
                </FieldArray>
              </div>

              {/* SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-fields">
                  {!isPrintMode ? (
                    <Field as="select" name="overallStatus" className="form-input">
                      <option value="">Overall Status</option>
                      <option>Completed</option>
                      <option>Partially Completed</option>
                      <option>Pending</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.overallStatus}</div>
                  )}

                  {renderField(values,"keyIssues","Key Issues")}
                  {renderField(values,"actionsRequired","Actions Required")}
                  {renderField(values,"targetCompletionDate","Target Completion Date","date")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* SIGN-OFF WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off Workflow</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val) => setFieldValue("preparedSignature", val)}
                  />
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val) => setFieldValue("reviewedSignature", val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Controller"
                    value={values.financeControllerSignature}
                    onChange={(val) => setFieldValue("financeControllerSignature", val)}
                  />
                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val) => setFieldValue("cfoSignature", val)}
                  />
                </div>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Year-End Close
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

export default FRM00746_YearEndCloseChecklist;
