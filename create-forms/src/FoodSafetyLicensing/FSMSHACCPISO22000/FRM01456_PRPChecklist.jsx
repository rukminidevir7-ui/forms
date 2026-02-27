// FRM01456_PRPChecklist.jsx
// FRM-01456 – PRP (Prerequisite Program) Checklist
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
  checklistNumber: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01456",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  departmentName: "",
  processArea: "",
  checklistNumber: "",
  date: "",
  shift: "",
  auditorInspector: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  productionArea: "",
  productCategory: "",

  /* 3. PRP Checklist Items */
  prpChecklist: Array.from({ length: 15 }, (_, i) => ({
    slNo: i + 1,
    prpArea: "",
    checklistItem: "",
    requirement: "",
    compliance: "",
    remarks: "",
    actionRequired: "",
    responsible: "",
    dynamicFields:{}
  })),

  /* 4. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",
  overallComplianceStatus: "",

  /* 5. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 6. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01456_PRPChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01456" title="PRP Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("PRP Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01456"
            title="FRM-01456 — PRP (Prerequisite Program) Checklist"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1 & 2 Sections */}
          {[
            ["General Information",[
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["checklistNumber","Checklist Number"],
              ["date","Date"],
              ["shift","Shift"],
              ["auditorInspector","Auditor / Inspector"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["productionArea","Production Area"],
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
                      type={name==="date"?"date":"text"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 3. PRP Checklist Items */}
          <div className="form-section">
            <h3 className="form-section-title">PRP Checklist Items</h3>

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
                    setFieldValue("prpChecklist", [
                      ...values.prpChecklist,
                      {
                        slNo: values.prpChecklist.length + 1,
                        prpArea:"",
                        checklistItem:"",
                        requirement:"",
                        compliance:"",
                        remarks:"",
                        actionRequired:"",
                        responsible:"",
                        dynamicFields:{}
                      }
                    ])
                  }
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="prpChecklist">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>PRP Area</th>
                    <th>Checklist Item</th>
                    <th>Requirement</th>
                    <th>Compliance (Yes/No)</th>
                    <th>Remarks</th>
                    <th>Action Required</th>
                    <th>Responsible</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.prpChecklist.map((row,index)=>(
                    <tr key={index}>
                      <td>{row.slNo}</td>
                      {["prpArea","checklistItem","requirement","compliance","remarks","actionRequired","responsible"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`prpChecklist.${index}.${field}`}
                            as={["checklistItem","requirement","remarks","actionRequired"].includes(field) ? "textarea" : "input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`prpChecklist.${index}.dynamicFields.${col.key}`}
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

          {/* 4. Compliance & Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance & Reference</h3>
            <div className="form-fields">
              {[
                ["applicableStandard","Applicable Standard"],
                ["regulatoryRequirement","Regulatory Requirement"],
                ["licenseNumber","License Number"],
                ["governmentReference","Government Reference"],
                ["overallComplianceStatus","Overall Compliance Status"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field
                    as={name==="overallComplianceStatus"?"textarea":"input"}
                    name={name}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 5. Attachments */}
          <div className="form-section">
            <FormAttachments values={values}/>
          </div>

          <FormCustomFields values={values}/>

          {/* 6. Approval */}
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
                Submit PRP Checklist
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

export default FRM01456_PRPChecklist;