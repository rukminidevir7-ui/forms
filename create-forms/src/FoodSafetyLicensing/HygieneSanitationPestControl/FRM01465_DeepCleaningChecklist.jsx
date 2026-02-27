// FRM01465_DeepCleaningChecklist.jsx
// FRM-01465 – Deep Cleaning Checklist
// Enterprise Grade – Food Safety Licensing – Hygiene, Sanitation & Pest Control

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
  checklistNumber: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01465",
  department: "Hygiene, Sanitation & Pest Control",

  /* 1. General Information */
  checklistNumber: "",
  departmentName: "",
  area: "",
  cleaningType: "",
  date: "",
  plannedStartTime: "",
  plannedEndTime: "",
  supervisor: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  productionArea: "",
  businessUnit: "",

  /* 3. Deep Cleaning Tasks */
  deepCleaningTasks: [
    {
      cleaningArea: "",
      equipmentSurface: "",
      cleaningTask: "",
      methodChemicalUsed: "",
      frequency: "",
      completed: "",
      checkedBy: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 4. Verification */
  verifiedBy: "",
  verificationDate: "",
  comments: "",

  /* 5. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 6. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 7. Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01465_DeepCleaningChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01465" title="Deep Cleaning Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Deep Cleaning Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01465"
            title="FRM-01465 — Deep Cleaning Checklist"
            department="Food Safety Licensing | Hygiene, Sanitation & Pest Control"
          >

          {/* 1 & 2 Sections */}
          {[
            ["General Information",[
              ["checklistNumber","Checklist Number"],
              ["departmentName","Department"],
              ["area","Area"],
              ["cleaningType","Cleaning Type"],
              ["date","Date"],
              ["plannedStartTime","Planned Start Time"],
              ["plannedEndTime","Planned End Time"],
              ["supervisor","Supervisor"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["productionArea","Production Area"],
              ["businessUnit","Business Unit"]
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
                      type={
                        name==="date" ? "date" :
                        name.toLowerCase().includes("time") ? "time" :
                        "text"
                      }
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 3. Deep Cleaning Tasks */}
          <div className="form-section">
            <h3 className="form-section-title">Deep Cleaning Tasks</h3>

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
                    setFieldValue("deepCleaningTasks", [
                      ...values.deepCleaningTasks,
                      {
                        cleaningArea:"",
                        equipmentSurface:"",
                        cleaningTask:"",
                        methodChemicalUsed:"",
                        frequency:"",
                        completed:"",
                        checkedBy:"",
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

            <FieldArray name="deepCleaningTasks">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Cleaning Area</th>
                    <th>Equipment / Surface</th>
                    <th>Cleaning Task</th>
                    <th>Method / Chemical Used</th>
                    <th>Frequency</th>
                    <th>Completed (Yes/No)</th>
                    <th>Checked By</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.deepCleaningTasks.map((row,index)=>(
                    <tr key={index}>
                      {["cleaningArea","equipmentSurface","cleaningTask","methodChemicalUsed","frequency","completed","checkedBy","remarks"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`deepCleaningTasks.${index}.${field}`}
                            as={field==="remarks"?"textarea":"input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`deepCleaningTasks.${index}.dynamicFields.${col.key}`}
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

          {/* 4. Verification */}
          <div className="form-section">
            <h3 className="form-section-title">Verification</h3>
            <div className="form-fields">
              {[
                ["verifiedBy","Verified By"],
                ["verificationDate","Verification Date"],
                ["comments","Comments"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field
                    name={name}
                    type={name==="verificationDate"?"date":"text"}
                    as={name==="comments"?"textarea":"input"}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 5. Compliance */}
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

          {/* 6. Attachments — SAME STRUCTURE */}
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

          {/* 7. Authorization */}
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
                Submit Deep Cleaning Checklist
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

export default FRM01465_DeepCleaningChecklist;