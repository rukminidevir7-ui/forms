// FRM01792_HSEKPIDataCapture.jsx
// FRM-01792 / 01793 / 01794 – HSE KPI Data Capture (Universal)
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
  reportingPeriod: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01792",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  reportingPeriod: "",
  dataSubmissionDate: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  hseHeadName: "",

  kpiEntries: [
    {
      kpiCategory: "",
      kpiName: "",
      kpiDescription: "",
      baselineValue: "",
      targetValue: "",
      actualValue: "",
      unitOfMeasurement: "",
      variance: "",
      trend: "",
      dataSource: "",
      responsiblePerson: "",
      riskLevel: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  overallPerformanceStatus: "",
  correctiveActionsRequired: "",
  improvementPlan: "",
  nextReviewDate: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  legalRequirementLinked: "",

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

const FRM01792_HSEKPIDataCapture = () => {

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
    <ModernFormWrapper formId="FRM-01792" title="HSE KPI Data Capture">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE KPI Data Capture Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01792"
              title="HSE KPI DATA CAPTURE"
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
                  {field(values,"reportingPeriod","Reporting Period (Month / Quarter / Year)")}
                  {field(values,"dataSubmissionDate","Data Submission Date","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"hseHeadName","HSE Head Name")}
                </div>
              </div>

              {/* KPI Table */}
              <div className="form-section">
                <h3 className="form-section-title">KPI Data Details</h3>

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
                        setFieldValue("kpiEntries", [
                          ...values.kpiEntries,
                          {
                            kpiCategory:"",
                            kpiName:"",
                            kpiDescription:"",
                            baselineValue:"",
                            targetValue:"",
                            actualValue:"",
                            unitOfMeasurement:"",
                            variance:"",
                            trend:"",
                            dataSource:"",
                            responsiblePerson:"",
                            riskLevel:"",
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

               <FieldArray name="kpiEntries">
  {({ remove }) => (
    <table className="items-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Category</th>
          <th>KPI Name</th>
          <th>Description</th>
          <th>Baseline</th>
          <th>Target</th>
          <th>Actual</th>
          <th>Unit</th>
          <th>Variance</th>
          <th>Trend</th>
          <th>Data Source</th>
          <th>Responsible</th>
          <th>Risk Level</th>
          <th>Remarks</th>
          {dynamicColumns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          {!isPrintMode && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {values.kpiEntries.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            {/* CATEGORY */}
            <td>
              {isPrintMode ? (
                row.kpiCategory || "-"
              ) : (
                <Field
                  as="select"
                  name={`kpiEntries.${index}.kpiCategory`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Health</option>
                  <option>Safety</option>
                  <option>Environment</option>
                </Field>
              )}
            </td>

            {/* SIMPLE TEXT FIELDS */}
            {[
              "kpiName",
              "kpiDescription",
              "baselineValue",
              "targetValue",
              "actualValue",
              "unitOfMeasurement",
              "variance",
              "dataSource",
              "responsiblePerson",
              "riskLevel",
              "remarks"
            ].map(fieldName => (
              <td key={fieldName}>
                {isPrintMode ? (
                  row[fieldName] || "-"
                ) : fieldName === "kpiDescription" || fieldName === "remarks" ? (
                  <Field
                    as="textarea"
                    name={`kpiEntries.${index}.${fieldName}`}
                    className="form-input"
                  />
                ) : (
                  <Field
                    name={`kpiEntries.${index}.${fieldName}`}
                    className="form-input"
                  />
                )}
              </td>
            ))}

            {/* TREND SELECT */}
            <td>
              {isPrintMode ? (
                row.trend || "-"
              ) : (
                <Field
                  as="select"
                  name={`kpiEntries.${index}.trend`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Up</option>
                  <option>Down</option>
                  <option>Stable</option>
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
                      name={`kpiEntries.${index}.dynamicFields.${col.key}`}
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

              {/* Performance Evaluation */}
              <div className="form-section">
                <h3 className="form-section-title">Performance Evaluation</h3>
                <div className="form-fields">
                  {field(values,"overallPerformanceStatus","Overall Performance Status")}
                  {field(values,"correctiveActionsRequired","Corrective Actions Required","text",true)}
                  {field(values,"improvementPlan","Improvement Plan","text",true)}
                  {field(values,"nextReviewDate","Next Review Date","date")}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"legalRequirementLinked","Legal Requirement Linked (Yes/No)")}
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
                    Submit HSE KPI Data Capture
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

export default FRM01792_HSEKPIDataCapture;