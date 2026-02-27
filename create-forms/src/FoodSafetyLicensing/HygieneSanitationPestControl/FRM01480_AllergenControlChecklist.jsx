// FRM01480_AllergenControlChecklist.jsx
// FRM-01480 – Allergen Control Checklist
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
  inspectionDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01480",
  department: "Hygiene, Sanitation & Pest Control",

  /* 1. General Information */
  checklistNumber: "",
  departmentName: "",
  area: "",
  inspectionDate: "",
  inspector: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",
  productionArea: "",

  /* 3. Allergen Control Checklist Items */
  allergenChecklistItems: [
    {
      allergenType: "",
      controlMeasure: "",
      cleaningVerification: "",
      labelingVerified: "",
      segregationMaintained: "",
      crossContactRisk: "",
      compliance: "",
      correctiveAction: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 4. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 5. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 6. Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01480_AllergenControlChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01480" title="Allergen Control Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Allergen Control Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01480"
            title="FRM-01480 — Allergen Control Checklist"
            department="Food Safety Licensing | Hygiene, Sanitation & Pest Control"
          >

          {/* 1 & 2 Sections */}
          {[
            ["General Information",[
              ["checklistNumber","Checklist Number"],
              ["departmentName","Department"],
              ["area","Area"],
              ["inspectionDate","Inspection Date"],
              ["inspector","Inspector"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["businessUnit","Business Unit"],
              ["productionArea","Production Area"]
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
                      type={name==="inspectionDate" ? "date" : "text"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 3. Allergen Control Checklist Items */}
          <div className="form-section">
            <h3 className="form-section-title">Allergen Control Checklist Items</h3>

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
                    setFieldValue("allergenChecklistItems", [
                      ...values.allergenChecklistItems,
                      {
                        allergenType:"",
                        controlMeasure:"",
                        cleaningVerification:"",
                        labelingVerified:"",
                        segregationMaintained:"",
                        crossContactRisk:"",
                        compliance:"",
                        correctiveAction:"",
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

            <FieldArray name="allergenChecklistItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Allergen Type</th>
                    <th>Control Measure</th>
                    <th>Cleaning Verification</th>
                    <th>Labeling Verified</th>
                    <th>Segregation Maintained</th>
                    <th>Cross Contact Risk</th>
                    <th>Compliance (Yes/No)</th>
                    <th>Corrective Action</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.allergenChecklistItems.map((row,index)=>(
                    <tr key={index}>
                      {["allergenType","controlMeasure","cleaningVerification","labelingVerified","segregationMaintained","crossContactRisk","compliance","correctiveAction","remarks"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`allergenChecklistItems.${index}.${field}`}
                            as={["correctiveAction","remarks"].includes(field) ? "textarea" : "input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`allergenChecklistItems.${index}.dynamicFields.${col.key}`}
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

          {/* 4. Compliance */}
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

          {/* 5. Attachments */}
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

          {/* 6. Authorization */}
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
                Submit Allergen Control Checklist
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

export default FRM01480_AllergenControlChecklist;