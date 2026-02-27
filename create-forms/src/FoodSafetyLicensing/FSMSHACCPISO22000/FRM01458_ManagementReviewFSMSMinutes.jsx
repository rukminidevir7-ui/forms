// FRM01458_ManagementReviewFSMSMinutes.jsx
// FRM-01458 – Management Review for FSMS Minutes
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
  meetingNumber: Yup.string().required("Required"),
  meetingDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01458",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  meetingNumber: "",
  departmentName: "",
  processArea: "",
  meetingDate: "",
  meetingTime: "",
  location: "",
  chairperson: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  orgLocation: "",
  businessUnit: "",
  productCategory: "",

  /* 3. Attendees */
  preparedBy: "",
  participants: "",
  absentees: "",
  facilitator: "",

  /* 4. Agenda */
  agendaItems: "",
  objectives: "",
  scope: "",

  /* 5. Discussion Points */
  discussionPoints: Array.from({ length: 10 }, (_, i) => ({
    slNo: i + 1,
    topic: "",
    discussionSummary: "",
    decision: "",
    actionItem: "",
    responsible: "",
    targetDate: "",
    dynamicFields:{}
  })),

  /* 6. Performance Review Inputs */
  auditResults: "",
  customerFeedback: "",
  processPerformance: "",
  correctiveActionsStatus: "",
  riskAndOpportunities: "",
  resourceNeeds: "",

  /* 7. Decisions & Actions Summary */
  keyDecisions: "",
  actionSummary: "",
  followUpRequired: "",

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

  /* 10. Approval */
  approvalRoles: [
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01458_ManagementReviewFSMSMinutes = () => {

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
    <ModernFormWrapper formId="FRM-01458" title="Management Review for FSMS Minutes">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Management Review Minutes Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01458"
            title="FRM-01458 — Management Review for FSMS Minutes"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1 & 2 Sections */}
          {[
            ["General Information",[
              ["meetingNumber","Meeting Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["meetingDate","Meeting Date"],
              ["meetingTime","Meeting Time"],
              ["location","Location"],
              ["chairperson","Chairperson"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["orgLocation","Location"],
              ["businessUnit","Business Unit"],
              ["productCategory","Product Category"]
            ]],
            ["Attendees",[
              ["preparedBy","Prepared By"],
              ["participants","Participants"],
              ["absentees","Absentees"],
              ["facilitator","Facilitator"]
            ]],
            ["Agenda",[
              ["agendaItems","Agenda Items"],
              ["objectives","Objectives"],
              ["scope","Scope"]
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
                      type={name.includes("Date")?"date":name.includes("Time")?"time":"text"}
                      as={["participants","absentees","agendaItems","objectives","scope"].includes(name) ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 5. Discussion Points */}
          <div className="form-section">
            <h3 className="form-section-title">Discussion Points</h3>

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
                    setFieldValue("discussionPoints", [
                      ...values.discussionPoints,
                      {
                        slNo: values.discussionPoints.length + 1,
                        topic:"",
                        discussionSummary:"",
                        decision:"",
                        actionItem:"",
                        responsible:"",
                        targetDate:"",
                        dynamicFields:{}
                      }
                    ])
                  }
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="discussionPoints">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Topic</th>
                    <th>Discussion Summary</th>
                    <th>Decision</th>
                    <th>Action Item</th>
                    <th>Responsible</th>
                    <th>Target Date</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.discussionPoints.map((row,index)=>(
                    <tr key={index}>
                      <td>{row.slNo}</td>
                      {["topic","discussionSummary","decision","actionItem","responsible","targetDate"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`discussionPoints.${index}.${field}`}
                            type={field==="targetDate"?"date":"text"}
                            as={["discussionSummary","decision","actionItem"].includes(field) ? "textarea" : "input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`discussionPoints.${index}.dynamicFields.${col.key}`}
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

          {/* 6 & 7 Sections */}
          {[
            ["Performance Review Inputs",[
              ["auditResults","Audit Results"],
              ["customerFeedback","Customer Feedback"],
              ["processPerformance","Process Performance"],
              ["correctiveActionsStatus","Corrective Actions Status"],
              ["riskAndOpportunities","Risk and Opportunities"],
              ["resourceNeeds","Resource Needs"]
            ]],
            ["Decisions & Actions Summary",[
              ["keyDecisions","Key Decisions"],
              ["actionSummary","Action Summary"],
              ["followUpRequired","Follow-up Required"]
            ]],
            ["Compliance & Reference",[
              ["applicableStandard","Applicable Standard"],
              ["regulatoryRequirement","Regulatory Requirement"],
              ["licenseNumber","License Number"],
              ["governmentReference","Government Reference"]
            ]]
          ].map(([section,fields])=>(
            <div className="form-section" key={section}>
              <h3 className="form-section-title">{section}</h3>
              <div className="form-fields">
                {fields.map(([name,label])=>(
                  <div className="form-field" key={name}>
                    <label className="form-label">{label}</label>
                    <Field as="textarea" name={name} className="form-input"/>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Attachments */}
          <div className="form-section">
            <FormAttachments values={values}/>
          </div>

          <FormCustomFields values={values}/>

          {/* Approval */}
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
                Submit Management Review Minutes
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

export default FRM01458_ManagementReviewFSMSMinutes;