// FRM01789_HSEObjectivesTargets.jsx
// FRM-01789 / 01790 / 01791 – HSE Objectives & Targets (Universal)
// Enterprise Grade – HSE Governance & Legal Compliance

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
  department: Yup.string().required("Required"),
  financialYear: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01789",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  financialYear: "",
  effectiveFrom: "",
  reviewFrequency: "",
  status: "",

  companyName: "",
  corporateOfficeAddress: "",
  plantSiteName: "",
  hseHeadName: "",

  objectives: [
    {
      objectiveCategory: "",
      objectiveDescription: "",
      baselineValue: "",
      targetValue: "",
      unitOfMeasurement: "",
      timeFrame: "",
      responsiblePerson: "",
      monitoringMethod: "",
      legalRequirementLinked: "",
      riskLevel: "",
      currentStatus: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  performanceReviewDate: "",
  evaluationSummary: "",
  correctiveActionsRequired: "",
  improvementPlan: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  notificationReference: "",

  supportingDocumentsAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management Representative)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01789_HSEObjectivesTargets = () => {

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

  const field = (values, name, label, type="text", textarea=false) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : textarea
          ? <Field as="textarea" name={name} className="form-input" rows="3"/>
          : <Field name={name} type={type} className="form-input"/>
      }
      <ErrorMessage name={name} component="div" className="form-error"/>
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01789" title="HSE Objectives & Targets">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Objectives & Targets Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01789"
              title="HSE OBJECTIVES & TARGETS"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"effectiveFrom","Effective From","date")}
                  {field(values,"reviewFrequency","Review Frequency")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"corporateOfficeAddress","Corporate Office Address","text",true)}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"hseHeadName","HSE Head Name")}
                </div>
              </div>

              {/* Objectives Table */}
              <div className="form-section">
                <h3 className="form-section-title">Objectives & Targets Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("objectives", [
                          ...values.objectives,
                          {
                            objectiveCategory:"",
                            objectiveDescription:"",
                            baselineValue:"",
                            targetValue:"",
                            unitOfMeasurement:"",
                            timeFrame:"",
                            responsiblePerson:"",
                            monitoringMethod:"",
                            legalRequirementLinked:"",
                            riskLevel:"",
                            currentStatus:"",
                            remarks:"",
                            dynamicFields:{}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="objectives">
  {({ remove }) => (
    <table className="items-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Category</th>
          <th>Description</th>
          <th>Baseline</th>
          <th>Target</th>
          <th>Unit</th>
          <th>Time Frame</th>
          <th>Responsible</th>
          <th>Monitoring</th>
          <th>Legal Linked</th>
          <th>Risk Level</th>
          <th>Current Status</th>
          <th>Remarks</th>
          {dynamicColumns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          {!isPrintMode && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {values.objectives.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            {/* CATEGORY */}
            <td>
              {isPrintMode ? (
                row.objectiveCategory || "-"
              ) : (
                <Field
                  as="select"
                  name={`objectives.${index}.objectiveCategory`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Health</option>
                  <option>Safety</option>
                  <option>Environment</option>
                </Field>
              )}
            </td>

            {/* DESCRIPTION */}
            <td>
              {isPrintMode ? (
                row.objectiveDescription || "-"
              ) : (
                <Field
                  as="textarea"
                  name={`objectives.${index}.objectiveDescription`}
                  className="form-input"
                />
              )}
            </td>

            {/* SIMPLE TEXT FIELDS */}
            {[
              "baselineValue",
              "targetValue",
              "unitOfMeasurement",
              "timeFrame",
              "responsiblePerson",
              "monitoringMethod",
              "riskLevel",
              "currentStatus",
              "remarks"
            ].map(fieldName => (
              <td key={fieldName}>
                {isPrintMode ? (
                  row[fieldName] || "-"
                ) : (
                  <Field
                    name={`objectives.${index}.${fieldName}`}
                    className="form-input"
                  />
                )}
              </td>
            ))}

            {/* LEGAL LINKED */}
            <td>
              {isPrintMode ? (
                row.legalRequirementLinked || "-"
              ) : (
                <Field
                  as="select"
                  name={`objectives.${index}.legalRequirementLinked`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              )}
            </td>

            {/* DYNAMIC COLUMNS */}
            {dynamicColumns.map(col => (
              <td key={col.key}>
                {isPrintMode
                  ? row.dynamicFields?.[col.key] || "-"
                  : (
                    <Field
                      name={`objectives.${index}.dynamicFields.${col.key}`}
                      className="form-input"
                    />
                  )
                }
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

              {/* Review & Evaluation */}
              <div className="form-section">
                <h3 className="form-section-title">Review & Evaluation</h3>
                <div className="form-fields">
                  {field(values,"performanceReviewDate","Performance Review Date","date")}
                  {field(values,"evaluationSummary","Evaluation Summary","text",true)}
                  {field(values,"correctiveActionsRequired","Corrective Actions Required","text",true)}
                  {field(values,"improvementPlan","Improvement Plan","text",true)}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"notificationReference","Notification Reference")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"uploadReferenceId","Upload Reference ID")}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                    Submit HSE Objectives & Targets
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

export default FRM01789_HSEObjectivesTargets;