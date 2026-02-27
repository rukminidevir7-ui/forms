// FRM01460_ISO22000GapAssessment.jsx
// FRM-01460 – ISO 22000 Gap Assessment Checklist
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
  assessmentNumber: Yup.string().required("Required"),
  assessmentDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01460",
  department: "FSMS / HACCP / ISO 22000",

  /* 1️⃣ General Information */
  assessmentNumber: "",
  departmentName: "",
  processArea: "",
  assessmentDate: "",
  assessmentType: "",
  leadAssessor: "",
  assessmentTeam: "",
  status: "",

  /* 2️⃣ Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",
  productCategory: "",

  /* 3️⃣ Gap Assessment Checklist Items */
  gapChecklist: [
    {
      slNo: 1,
      isoClause: "",
      requirement: "",
      currentPractice: "",
      gapIdentified: "",
      gapDescription: "",
      riskLevel: "",
      actionRequired: "",
      responsible: "",
      targetDate: "",
      dynamicFields:{}
    }
  ],

  /* 4️⃣ Assessment Summary */
  majorGaps: "",
  minorGaps: "",
  observations: "",
  overallReadinessStatus: "",

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

const FRM01460_ISO22000GapAssessment = () => {

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
    <ModernFormWrapper formId="FRM-01460" title="ISO 22000 Gap Assessment Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ISO 22000 Gap Assessment Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01460"
            title="FRM-01460 — ISO 22000 Gap Assessment Checklist"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1️⃣ & 2️⃣ Sections */}
          {[
            ["General Information",[
              ["assessmentNumber","Assessment Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["assessmentDate","Assessment Date"],
              ["assessmentType","Assessment Type"],
              ["leadAssessor","Lead Assessor"],
              ["assessmentTeam","Assessment Team"],
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

          {/* 3️⃣ Gap Assessment Checklist Items */}
          <div className="form-section">
            <h3 className="form-section-title">Gap Assessment Checklist Items</h3>

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
                    setFieldValue("gapChecklist", [
                      ...values.gapChecklist,
                      {
                        slNo: values.gapChecklist.length + 1,
                        isoClause:"",
                        requirement:"",
                        currentPractice:"",
                        gapIdentified:"",
                        gapDescription:"",
                        riskLevel:"",
                        actionRequired:"",
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

            <FieldArray name="gapChecklist">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>ISO Clause</th>
                    <th>Requirement</th>
                    <th>Current Practice</th>
                    <th>Gap Identified (Yes/No)</th>
                    <th>Gap Description</th>
                    <th>Risk Level</th>
                    <th>Action Required</th>
                    <th>Responsible</th>
                    <th>Target Date</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.gapChecklist.map((row,index)=>(
                    <tr key={index}>
                      <td>{row.slNo}</td>
                      {["isoClause","requirement","currentPractice","gapIdentified","gapDescription","riskLevel","actionRequired","responsible","targetDate"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`gapChecklist.${index}.${field}`}
                            type={field==="targetDate"?"date":"text"}
                            as={["requirement","currentPractice","gapDescription","actionRequired"].includes(field) ? "textarea" : "input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`gapChecklist.${index}.dynamicFields.${col.key}`}
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

          {/* 4️⃣ Assessment Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Assessment Summary</h3>
            <div className="form-fields">
              {[
                ["majorGaps","Major Gaps"],
                ["minorGaps","Minor Gaps"],
                ["observations","Observations"],
                ["overallReadinessStatus","Overall Readiness Status"]
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
                Submit ISO 22000 Gap Assessment
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

export default FRM01460_ISO22000GapAssessment;