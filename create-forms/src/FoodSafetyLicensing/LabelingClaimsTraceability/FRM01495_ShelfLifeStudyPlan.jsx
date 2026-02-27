// FRM01495_ShelfLifeStudyPlan.jsx
// FRM-01495 – Shelf-life Study Plan
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
  preparedDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01495",
  department: "Labeling, Claims & Traceability",

  /* 1. General Information */
  planNumber: "",
  departmentName: "",
  processArea: "",
  preparedDate: "",
  studyType: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",

  /* 3. Product Details */
  productName: "",
  productCode: "",
  batchNumber: "",
  manufacturingDate: "",
  proposedShelfLife: "",
  packagingType: "",

  /* 4. Study Objective & Scope */
  objective: "",
  scopeDescription: "",
  storageConditions: "",
  samplingPlan: "",
  testParameters: "",

  /* 5. Study Schedule */
  studySchedule: [
    {
      timePoint: "",
      testParameter: "",
      method: "",
      acceptanceCriteria: "",
      responsible: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 6. Evaluation Criteria */
  acceptanceCriteriaSummary: "",
  statisticalMethod: "",
  failureCriteria: "",
  conclusionApproach: "",

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

const FRM01495_ShelfLifeStudyPlan = () => {

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
    <ModernFormWrapper formId="FRM-01495" title="Shelf-life Study Plan">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Shelf-life Study Plan Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01495"
            title="FRM-01495 — Shelf-life Study Plan"
            department="Food Safety Licensing | Labeling, Claims & Traceability"
          >

          {/* Sections 1–4 */}
          {[
            ["General Information",[
              ["planNumber","Plan Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["preparedDate","Prepared Date"],
              ["studyType","Study Type (Real Time / Accelerated)"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["businessUnit","Business Unit"]
            ]],
            ["Product Details",[
              ["productName","Product Name"],
              ["productCode","Product Code"],
              ["batchNumber","Batch Number"],
              ["manufacturingDate","Manufacturing Date"],
              ["proposedShelfLife","Proposed Shelf Life"],
              ["packagingType","Packaging Type"]
            ]],
            ["Study Objective & Scope",[
              ["objective","Objective"],
              ["scopeDescription","Scope Description"],
              ["storageConditions","Storage Conditions"],
              ["samplingPlan","Sampling Plan"],
              ["testParameters","Test Parameters"]
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
                      type={["preparedDate","manufacturingDate"].includes(name) ? "date" : "text"}
                      as={["objective","scopeDescription","storageConditions","samplingPlan","testParameters"].includes(name) ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 5. Study Schedule */}
          <div className="form-section">
            <h3 className="form-section-title">Study Schedule</h3>

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
                    setFieldValue("studySchedule", [
                      ...values.studySchedule,
                      {
                        timePoint:"",
                        testParameter:"",
                        method:"",
                        acceptanceCriteria:"",
                        responsible:"",
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

            <FieldArray name="studySchedule">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Time Point</th>
                    <th>Test Parameter</th>
                    <th>Method</th>
                    <th>Acceptance Criteria</th>
                    <th>Responsible</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.studySchedule.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`studySchedule.${index}.timePoint`} className="form-input"/></td>
                      <td><Field name={`studySchedule.${index}.testParameter`} className="form-input"/></td>
                      <td><Field name={`studySchedule.${index}.method`} className="form-input"/></td>
                      <td><Field name={`studySchedule.${index}.acceptanceCriteria`} className="form-input"/></td>
                      <td><Field name={`studySchedule.${index}.responsible`} className="form-input"/></td>
                      <td><Field name={`studySchedule.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`studySchedule.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 6. Evaluation Criteria */}
          <div className="form-section">
            <h3 className="form-section-title">Evaluation Criteria</h3>
            <div className="form-fields">
              {[
                ["acceptanceCriteriaSummary","Acceptance Criteria Summary"],
                ["statisticalMethod","Statistical Method"],
                ["failureCriteria","Failure Criteria"],
                ["conclusionApproach","Conclusion Approach"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field as="textarea" name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance, Attachments & Authorization follow same enterprise pattern */}

          <FormCustomFields values={values}/>

          {/* Authorization */}
          <div className="form-section">
            <h3 className="form-section-title">Authorization</h3>
            <FieldArray name="approvalRoles">
              {()=>(
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
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Shelf-life Study Plan
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

export default FRM01495_ShelfLifeStudyPlan;