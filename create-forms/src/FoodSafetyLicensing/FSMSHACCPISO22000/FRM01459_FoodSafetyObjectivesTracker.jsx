// FRM01459_FoodSafetyObjectivesTracker.jsx
// FRM-01459 – Food Safety Objectives Tracker
// Enterprise Grade – Food Safety Licensing – FSMS / HACCP / ISO 22000

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import FormAttachments from "../../components/FormAttachments";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  trackerNumber: Yup.string().required("Required"),
  period: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01459",
  department: "FSMS / HACCP / ISO 22000",

  /* 1️⃣ General Information */
  departmentName: "",
  processArea: "",
  trackerNumber: "",
  period: "",
  date: "",
  status: "",

  /* 2️⃣ Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",
  productCategory: "",

  /* 3️⃣ Objectives Tracking Entries */
  objectivesEntries: [
    {
      slNo: 1,
      objective: "",
      kpiMetric: "",
      targetValue: "",
      currentValue: "",
      variance: "",
      responsible: "",
      dueDate: "",
      rowStatus: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 4️⃣ Performance Summary */
  overallPerformance: "",
  keyAchievements: "",
  issuesRisks: "",
  improvementActions: "",

  /* 5️⃣ Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 6️⃣ Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 7️⃣ Approval */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01459_FoodSafetyObjectivesTracker = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  return(
    <ModernFormWrapper formId="FRM-01459" title="Food Safety Objectives Tracker">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Food Safety Objectives Tracker Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01459"
            title="FRM-01459 — Food Safety Objectives Tracker"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1️⃣ & 2️⃣ Sections */}
          {[
            ["General Information",[
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["trackerNumber","Tracker Number"],
              ["period","Period"],
              ["date","Date"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["businessUnit","Business Unit"],
              ["productCategory","Product Category"]
            ]]
          ].map(([section,fields])=>(
            <div className="form-section" key={section}>
              <h3 className="form-section-title">{section}</h3>
              <div className="form-fields">
                {fields.map(([name,label])=>(
                  <div className="form-field" key={name}>
                    <label className="form-label">{label}</label>
                    <Field
                      name={name}
                      type={name.toLowerCase().includes("date")?"date":"text"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 3️⃣ Objectives Tracking Entries */}
          <div className="form-section">
            <h3 className="form-section-title">Objectives Tracking Entries</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={() =>
                    setFieldValue("objectivesEntries", [
                      ...values.objectivesEntries,
                      {
                        slNo: values.objectivesEntries.length + 1,
                        objective:"",
                        kpiMetric:"",
                        targetValue:"",
                        currentValue:"",
                        variance:"",
                        responsible:"",
                        dueDate:"",
                        rowStatus:"",
                        remarks:"",
                        dynamicFields:{}
                      }
                    ])
                  }
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="objectivesEntries">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Objective</th>
                    <th>KPI / Metric</th>
                    <th>Target Value</th>
                    <th>Current Value</th>
                    <th>Variance</th>
                    <th>Responsible</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.objectivesEntries.map((row,index)=>(
                    <tr key={index}>
                      <td>{row.slNo}</td>
                      {["objective","kpiMetric","targetValue","currentValue","variance","responsible","dueDate","rowStatus","remarks"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`objectivesEntries.${index}.${field}`}
                            type={field==="dueDate"?"date":"text"}
                            as={field==="remarks"?"textarea":"input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`objectivesEntries.${index}.dynamicFields.${col.key}`}
                            className="form-input"
                          />
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

          {/* 4️⃣ Performance Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Performance Summary</h3>
            <div className="form-fields">
              {[
                ["overallPerformance","Overall Performance"],
                ["keyAchievements","Key Achievements"],
                ["issuesRisks","Issues / Risks"],
                ["improvementActions","Improvement Actions"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field as="textarea" name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 5️⃣ Compliance & Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance & Reference</h3>
            <div className="form-fields">
              {[
                ["applicableStandard","Applicable Standard"],
                ["regulatoryRequirement","Regulatory Requirement"],
                ["licenseNumber","License Number"],
                ["governmentReference","Government Reference"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="form-section">
            <FormAttachments values={values}/>
          </div>

          <FormCustomFields values={values}/>

          {/* 7️⃣ Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval</h3>
            <FieldArray name="approvalRoles">
              {({push,remove})=>(
                <>
                  {!isPrintMode &&
                    <button type="button" className="btn-submit"
                      onClick={()=>push({roleName:"New Role",data:{}})}>
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
                Submit Objectives Tracker
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

export default FRM01459_FoodSafetyObjectivesTracker;