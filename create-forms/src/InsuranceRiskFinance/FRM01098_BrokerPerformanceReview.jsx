// FRM01098_BrokerPerformanceReview.jsx
// FRM-01098 / 01099 / 01100 – Broker Performance Review
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  brokerName: Yup.string().required("Required"),
  reviewPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01098 / 01099 / 01100",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  reviewPeriod: "",
  preparedBy: "",
  currency: "",

  brokerName: "",
  brokerFirm: "",
  contactDetails: "",
  serviceCategory: "",
  relationshipStartDate: "",

  performanceCriteria: [
    { criteria: "Service Quality Rating", rating: "", remarks: "", dynamicFields: {} },
    { criteria: "Responsiveness", rating: "", remarks: "", dynamicFields: {} },
    { criteria: "Technical Expertise", rating: "", remarks: "", dynamicFields: {} },
    { criteria: "Claims Support", rating: "", remarks: "", dynamicFields: {} },
    { criteria: "Compliance Adherence", rating: "", remarks: "", dynamicFields: {} },
    { criteria: "Cost Effectiveness", rating: "", remarks: "", dynamicFields: {} }
  ],

  strengths: "",
  areasForImprovement: "",
  keyAchievements: "",
  issuesNoted: "",

  overallRating: "",
  recommendation: "",
  actionPlan: "",
  finalRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01098_BrokerPerformanceReview = () => {

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
      formId="FRM-01098"
      title="Broker Performance Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Broker Performance Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01098 / 01099 / 01100"
              title="BROKER PERFORMANCE REVIEW"
              department="Insurance & Risk Finance – Insurance Management"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"reviewPeriod","Review Period")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* BROKER DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Broker Details</h3>
                <div className="form-fields">
                  {field(values,"brokerName","Broker Name")}
                  {field(values,"brokerFirm","Company/Firm")}
                  {field(values,"contactDetails","Contact Details")}
                  {field(values,"serviceCategory","Service Category")}
                  {field(values,"relationshipStartDate","Relationship Start Date","date")}
                </div>
              </div>

              {/* PERFORMANCE EVALUATION */}
              <div className="form-section">
                <h3 className="form-section-title">Performance Evaluation</h3>

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
                        setFieldValue("performanceCriteria", [
                          ...values.performanceCriteria,
                          { criteria: "", rating: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Criteria
                    </button>
                  </div>
                )}

                <FieldArray name="performanceCriteria">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Evaluation Criteria</th>
                          <th>Rating (1-5)</th>
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
                        {values.performanceCriteria.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`performanceCriteria.${index}.criteria`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`performanceCriteria.${index}.rating`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>1 - Poor</option>
                                <option>2 - Fair</option>
                                <option>3 - Good</option>
                                <option>4 - Very Good</option>
                                <option>5 - Excellent</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`performanceCriteria.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`performanceCriteria.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* OBSERVATIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>
                <div className="form-fields">
                  {field(values,"strengths","Strengths")}
                  {field(values,"areasForImprovement","Areas for Improvement")}
                  {field(values,"keyAchievements","Key Achievements")}
                  {field(values,"issuesNoted","Issues Noted")}
                </div>
              </div>

              {/* OUTCOME */}
              <div className="form-section">
                <h3 className="form-section-title">Outcome</h3>
                <div className="form-fields">
                  {field(values,"overallRating","Overall Rating")}
                  {field(values,"recommendation","Recommendation")}
                  {field(values,"actionPlan","Action Plan")}
                  {field(values,"finalRemarks","Remarks")}
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
                    Submit Broker Performance Review
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

export default FRM01098_BrokerPerformanceReview;