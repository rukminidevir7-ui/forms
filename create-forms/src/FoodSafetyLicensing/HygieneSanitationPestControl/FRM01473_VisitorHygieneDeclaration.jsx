// FRM01473_VisitorHygieneDeclaration.jsx
// FRM-01473 – Visitor Hygiene Declaration
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
  formReferenceId: Yup.string().required("Required"),
  visitDate: Yup.string().required("Required"),
  visitorName: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01473",
  department: "Hygiene, Sanitation & Pest Control",

  /* 1. General Information */
  formReferenceId: "",
  departmentName: "",
  processArea: "",
  visitDate: "",
  visitTime: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",
  areaVisiting: "",

  /* 3. Visitor Details */
  visitorName: "",
  visitorOrganization: "",
  contactNumber: "",
  email: "",
  purposeOfVisit: "",
  hostNameDepartment: "",

  /* 4. Health Declaration */
  illnessSymptoms: "",
  illnessDetails: "",
  skinInfection: "",
  openWoundsCuts: "",
  recentMedicalTreatment: "",
  fitToEnterProductionArea: "",

  /* 5. Hygiene Compliance */
  visitorBriefingCompleted: "",
  protectiveClothingIssued: "",
  complianceWithHygieneRules: "",
  escortRequired: "",
  supervisorObservation: "",

  /* 6. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 7. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 8. Declaration & Authorization */
  visitorSignature: "",
  hostSignature: "",
  approvalRoles: [
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01473_VisitorHygieneDeclaration = () => {

  const { isPrintMode } = usePrintMode();
  const [attachmentColumns, setAttachmentColumns] = useState([]);

  const addAttachmentColumn = () => {
    const name = prompt("Enter New Attachment Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(attachmentColumns.find(c=>c.key===key)) return alert("Column exists");
    setAttachmentColumns([...attachmentColumns,{key,label:name}]);
  };

  return(
    <ModernFormWrapper formId="FRM-01473" title="Visitor Hygiene Declaration">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Visitor Hygiene Declaration Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01473"
            title="FRM-01473 — Visitor Hygiene Declaration"
            department="Food Safety Licensing | Hygiene, Sanitation & Pest Control"
          >

          {[
            ["General Information",[
              ["formReferenceId","Form ID"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["visitDate","Visit Date"],
              ["visitTime","Visit Time"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["businessUnit","Business Unit"],
              ["areaVisiting","Area Visiting"]
            ]],
            ["Visitor Details",[
              ["visitorName","Visitor Name"],
              ["visitorOrganization","Organization / Company"],
              ["contactNumber","Contact Number"],
              ["email","Email"],
              ["purposeOfVisit","Purpose of Visit"],
              ["hostNameDepartment","Host Name / Department"]
            ]],
            ["Health Declaration",[
              ["illnessSymptoms","Any Illness Symptoms (Yes/No)"],
              ["illnessDetails","Illness Details"],
              ["skinInfection","Skin Infection (Yes/No)"],
              ["openWoundsCuts","Open Wounds / Cuts (Yes/No)"],
              ["recentMedicalTreatment","Recent Medical Treatment"],
              ["fitToEnterProductionArea","Fit to Enter Production Area (Yes/No)"]
            ]],
            ["Hygiene Compliance",[
              ["visitorBriefingCompleted","Visitor Briefing Completed (Yes/No)"],
              ["protectiveClothingIssued","Protective Clothing Issued (Yes/No)"],
              ["complianceWithHygieneRules","Compliance with Hygiene Rules (Yes/No)"],
              ["escortRequired","Escort Required (Yes/No)"],
              ["supervisorObservation","Supervisor Observation"]
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
                    <Field
                      name={name}
                      type={
                        name.toLowerCase().includes("date") ? "date" :
                        name.toLowerCase().includes("time") ? "time" :
                        "text"
                      }
                      as={["illnessDetails","recentMedicalTreatment","supervisorObservation"].includes(name) ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Attachments */}
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

          {/* Declaration & Authorization */}
          <div className="form-section">
            <h3 className="form-section-title">Declaration & Authorization</h3>

            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Visitor Signature</label>
                <Field name="visitorSignature" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Host Signature</label>
                <Field name="hostSignature" className="form-input"/>
              </div>
            </div>

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
                Submit Visitor Hygiene Declaration
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

export default FRM01473_VisitorHygieneDeclaration;