// FRM01462_FoodSafetyTrainingPlan.jsx
// FRM-01462 – Food Safety Training Plan (FoSTaC/Internal)
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
  planNumber: Yup.string().required("Required"),
  planPeriod: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01462",
  department: "FSMS / HACCP / ISO 22000",

  /* 1️⃣ General Information */
  planNumber: "",
  departmentName: "",
  processArea: "",
  planPeriod: "",
  preparedDate: "",
  status: "",

  /* 2️⃣ Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",
  productCategory: "",

  /* 3️⃣ Training Needs Analysis */
  trainingObjective: "",
  targetAudience: "",
  competencyGapIdentified: "",
  trainingType: "",
  priorityLevel: "",

  /* 4️⃣ Training Schedule */
  trainingSchedule: [
    {
      slNo: 1,
      trainingTopic: "",
      trainer: "",
      mode: "",
      plannedDate: "",
      duration: "",
      participants: "",
      location: "",
      evaluationMethod: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 5️⃣ Resources & Budget */
  trainingMaterials: "",
  estimatedCost: "",
  budgetApproval: "",
  resourcesRequired: "",

  /* 6️⃣ Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 7️⃣ Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 8️⃣ Approval */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01462_FoodSafetyTrainingPlan = () => {

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
    <ModernFormWrapper formId="FRM-01462" title="Food Safety Training Plan">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Food Safety Training Plan Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01462"
            title="FRM-01462 — Food Safety Training Plan (FoSTaC/Internal)"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1️⃣ & 2️⃣ Sections */}
          {[
            ["General Information",[
              ["planNumber","Plan Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["planPeriod","Plan Period"],
              ["preparedDate","Prepared Date"],
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

          {/* 3️⃣ Training Needs Analysis */}
          <div className="form-section">
            <h3 className="form-section-title">Training Needs Analysis</h3>
            <div className="form-fields">
              {[
                ["trainingObjective","Training Objective"],
                ["targetAudience","Target Audience"],
                ["competencyGapIdentified","Competency Gap Identified"],
                ["trainingType","Training Type (FoSTaC/Internal/External)"],
                ["priorityLevel","Priority Level"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field
                    as="textarea"
                    name={name}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 4️⃣ Training Schedule */}
          <div className="form-section">
            <h3 className="form-section-title">Training Schedule</h3>

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
                    setFieldValue("trainingSchedule", [
                      ...values.trainingSchedule,
                      {
                        slNo: values.trainingSchedule.length + 1,
                        trainingTopic:"",
                        trainer:"",
                        mode:"",
                        plannedDate:"",
                        duration:"",
                        participants:"",
                        location:"",
                        evaluationMethod:"",
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

            <FieldArray name="trainingSchedule">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Training Topic</th>
                    <th>Trainer</th>
                    <th>Mode</th>
                    <th>Planned Date</th>
                    <th>Duration</th>
                    <th>Participants</th>
                    <th>Location</th>
                    <th>Evaluation Method</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.trainingSchedule.map((row,index)=>(
                    <tr key={index}>
                      <td>{row.slNo}</td>
                      {["trainingTopic","trainer","mode","plannedDate","duration","participants","location","evaluationMethod","remarks"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`trainingSchedule.${index}.${field}`}
                            type={field==="plannedDate"?"date":"text"}
                            as={field==="remarks"?"textarea":"input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`trainingSchedule.${index}.dynamicFields.${col.key}`}
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

          {/* 5️⃣ Resources & Budget */}
          <div className="form-section">
            <h3 className="form-section-title">Resources & Budget</h3>
            <div className="form-fields">
              {[
                ["trainingMaterials","Training Materials"],
                ["estimatedCost","Estimated Cost"],
                ["budgetApproval","Budget Approval"],
                ["resourcesRequired","Resources Required"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field as="textarea" name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 6️⃣ Compliance & Reference */}
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

          {/* 7️⃣ Attachments */}
          <div className="form-section">
            <FormAttachments values={values}/>
          </div>

          <FormCustomFields values={values}/>

          {/* 8️⃣ Approval */}
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
                Submit Training Plan
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

export default FRM01462_FoodSafetyTrainingPlan;