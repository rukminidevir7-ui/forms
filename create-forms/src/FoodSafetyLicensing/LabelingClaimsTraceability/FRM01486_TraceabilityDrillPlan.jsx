// FRM01486_TraceabilityDrillPlan.jsx
// FRM-01486 – Traceability Drill Plan
// Enterprise Grade – Food Safety Licensing – Labeling, Claims & Traceability

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  planNumber: Yup.string().required("Required"),
  drillDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01486",
  department: "Labeling, Claims & Traceability",

  /* 1. General Information */
  planNumber: "",
  departmentName: "",
  processArea: "",
  drillDate: "",
  drillType: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",

  /* 3. Product / Batch Details */
  productName: "",
  productCode: "",
  batchNumber: "",
  manufacturingDate: "",
  expiryDate: "",

  /* 4. Drill Scope */
  objective: "",
  scopeDescription: "",
  traceabilityDirection: "",
  timeTarget: "",
  teamMembers: "",

  /* 5. Drill Execution Steps */
  drillExecutionSteps: [
    {
      stepDescription: "",
      responsible: "",
      startTime: "",
      endTime: "",
      outcome: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 6. Results & Evaluation */
  traceabilityTimeAchieved: "",
  gapsIdentified: "",
  correctiveActions: "",
  overallEffectiveness: "",

  /* 7. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 8. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 9. Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01486_TraceabilityDrillPlan = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [attachmentColumns, setAttachmentColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const addAttachmentColumn = () => {
    const name = prompt("Enter New Attachment Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(attachmentColumns.find(c=>c.key===key)) return alert("Column exists");
    setAttachmentColumns([...attachmentColumns,{key,label:name}]);
  };

  return(
    <ModernFormWrapper formId="FRM-01486" title="Traceability Drill Plan">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Traceability Drill Plan Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01486"
            title="FRM-01486 — Traceability Drill Plan"
            department="Food Safety Licensing | Labeling, Claims & Traceability"
          >

          {/* Sections 1–4 */}
          {[
            ["General Information",[
              ["planNumber","Plan Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["drillDate","Drill Date"],
              ["drillType","Drill Type"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["businessUnit","Business Unit"]
            ]],
            ["Product / Batch Details",[
              ["productName","Product Name"],
              ["productCode","Product Code"],
              ["batchNumber","Batch Number"],
              ["manufacturingDate","Manufacturing Date"],
              ["expiryDate","Expiry Date"]
            ]],
            ["Drill Scope",[
              ["objective","Objective"],
              ["scopeDescription","Scope Description"],
              ["traceabilityDirection","Traceability Direction (Forward / Backward / Both)"],
              ["timeTarget","Time Target"],
              ["teamMembers","Team Members"]
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
                      type={["drillDate","manufacturingDate","expiryDate"].includes(name) ? "date" : "text"}
                      as={["objective","scopeDescription","teamMembers"].includes(name) ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 5. Drill Execution Steps */}
          <div className="form-section">
            <h3 className="form-section-title">Drill Execution Steps</h3>

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
                    setFieldValue("drillExecutionSteps", [
                      ...values.drillExecutionSteps,
                      {
                        stepDescription:"",
                        responsible:"",
                        startTime:"",
                        endTime:"",
                        outcome:"",
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

            <FieldArray name="drillExecutionSteps">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Step Description</th>
                    <th>Responsible</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Outcome</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.drillExecutionSteps.map((row,index)=>(
                    <tr key={index}>
                      <td><Field as="textarea" name={`drillExecutionSteps.${index}.stepDescription`} className="form-input"/></td>
                      <td><Field name={`drillExecutionSteps.${index}.responsible`} className="form-input"/></td>
                      <td><Field type="time" name={`drillExecutionSteps.${index}.startTime`} className="form-input"/></td>
                      <td><Field type="time" name={`drillExecutionSteps.${index}.endTime`} className="form-input"/></td>
                      <td><Field as="textarea" name={`drillExecutionSteps.${index}.outcome`} className="form-input"/></td>
                      <td><Field as="textarea" name={`drillExecutionSteps.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`drillExecutionSteps.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 6. Results & Evaluation */}
          <div className="form-section">
            <h3 className="form-section-title">Results & Evaluation</h3>
            <div className="form-fields">
              {[
                ["traceabilityTimeAchieved","Traceability Time Achieved"],
                ["gapsIdentified","Gaps Identified"],
                ["correctiveActions","Corrective Actions"],
                ["overallEffectiveness","Overall Effectiveness"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field as="textarea" name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Compliance & Reference */}
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

          {/* 8. Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addAttachmentColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={() =>
                    setFieldValue("attachmentList", [
                      ...values.attachmentList,
                      { item: "New Attachment", remarks: "", dynamicFields:{} }
                    ])
                  }
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="attachmentList">
              {({remove})=>(
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Attachment List</th>
                      <th>Remarks</th>
                      {attachmentColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                      {!isPrintMode && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {values.attachmentList.map((row,index)=>(
                      <tr key={index}>
                        <td><Field name={`attachmentList.${index}.item`} className="form-input"/></td>
                        <td><Field name={`attachmentList.${index}.remarks`} className="form-input"/></td>
                        {attachmentColumns.map(col=>(
                          <td key={col.key}>
                            <Field name={`attachmentList.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

            <div className="form-fields" style={{marginTop:15}}>
              <div className="form-field">
                <label className="form-label">Documents Attached (Yes/No)</label>
                <Field name="documentsAttached" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Upload Reference ID</label>
                <Field name="uploadReferenceId" className="form-input"/>
              </div>
            </div>
          </div>

          <FormCustomFields values={values}/>

          {/* 9. Authorization */}
          <div className="form-section">
            <h3 className="form-section-title">Authorization</h3>
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
                Submit Traceability Drill Plan
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

export default FRM01486_TraceabilityDrillPlan;