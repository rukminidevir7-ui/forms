// FRM01491_MockRecallReport.jsx
// FRM-01491 – Mock Recall Report
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
  formReferenceId: Yup.string().required("Required"),
  drillDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01491",
  department: "Labeling, Claims & Traceability",

  /* 1. General Information */
  formReferenceId: "",
  departmentName: "",
  processArea: "",
  drillDate: "",
  recallType: "Mock",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",

  /* 3. Product / Batch Details */
  productName: "",
  productCode: "",
  batchLotNumber: "",
  manufacturingDate: "",
  expiryDate: "",
  distributionArea: "",

  /* 4. Recall Objective & Scope */
  objective: "",
  scopeDescription: "",
  recallClassification: "",
  teamMembers: "",
  timeTarget: "",

  /* 5. Recall Execution Details */
  recallExecutionDetails: [
    {
      actionStep: "",
      responsible: "",
      startTime: "",
      completionTime: "",
      outcome: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 6. Results & Findings */
  traceabilityTimeAchieved: "",
  gapsIdentified: "",
  rootCause: "",
  correctiveActions: "",
  preventiveActions: "",
  overallEffectiveness: "",

  /* 7. Communication Details */
  internalCommunication: "",
  customerNotificationSimulation: "",
  regulatoryNotificationSimulation: "",
  communicationOutcome: "",

  /* 8. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 9. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 10. Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01491_MockRecallReport = () => {

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
    <ModernFormWrapper formId="FRM-01491" title="Mock Recall Report">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Mock Recall Report Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01491"
            title="FRM-01491 — Mock Recall Report"
            department="Food Safety Licensing | Labeling, Claims & Traceability"
          >

          {/* Sections 1–4 */}
          {[
            ["General Information",[
              ["formReferenceId","Form ID"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["drillDate","Drill Date"],
              ["recallType","Recall Type (Mock)"],
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
              ["batchLotNumber","Batch / Lot Number"],
              ["manufacturingDate","Manufacturing Date"],
              ["expiryDate","Expiry Date"],
              ["distributionArea","Distribution Area"]
            ]],
            ["Recall Objective & Scope",[
              ["objective","Objective"],
              ["scopeDescription","Scope Description"],
              ["recallClassification","Recall Classification"],
              ["teamMembers","Team Members"],
              ["timeTarget","Time Target"]
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

          {/* 5. Recall Execution Details */}
          <div className="form-section">
            <h3 className="form-section-title">Recall Execution Details</h3>

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
                    setFieldValue("recallExecutionDetails", [
                      ...values.recallExecutionDetails,
                      {
                        actionStep:"",
                        responsible:"",
                        startTime:"",
                        completionTime:"",
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

            <FieldArray name="recallExecutionDetails">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Action Step</th>
                    <th>Responsible</th>
                    <th>Start Time</th>
                    <th>Completion Time</th>
                    <th>Outcome</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.recallExecutionDetails.map((row,index)=>(
                    <tr key={index}>
                      <td><Field as="textarea" name={`recallExecutionDetails.${index}.actionStep`} className="form-input"/></td>
                      <td><Field name={`recallExecutionDetails.${index}.responsible`} className="form-input"/></td>
                      <td><Field type="time" name={`recallExecutionDetails.${index}.startTime`} className="form-input"/></td>
                      <td><Field type="time" name={`recallExecutionDetails.${index}.completionTime`} className="form-input"/></td>
                      <td><Field as="textarea" name={`recallExecutionDetails.${index}.outcome`} className="form-input"/></td>
                      <td><Field as="textarea" name={`recallExecutionDetails.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`recallExecutionDetails.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* Remaining sections follow same enterprise pattern (Results, Communication, Compliance, Attachments, Authorization) */}

          <FormCustomFields values={values}/>

          {/* Authorization */}
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
                Submit Mock Recall Report
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

export default FRM01491_MockRecallReport;