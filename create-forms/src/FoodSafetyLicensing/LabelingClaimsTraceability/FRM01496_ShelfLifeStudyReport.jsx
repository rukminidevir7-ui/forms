// FRM01496_ShelfLifeStudyReport.jsx
// FRM-01496 – Shelf-life Study Report
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
  studyDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01496",
  department: "Labeling, Claims & Traceability",

  /* 1. General Information */
  formReferenceId: "",
  departmentName: "",
  processArea: "",
  studyDate: "",
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
  packagingType: "",
  proposedShelfLife: "",

  /* 4. Study Objective & Scope */
  objective: "",
  scopeDescription: "",
  storageConditions: "",
  samplingPlan: "",
  testParameters: "",

  /* 5. Study Results Details */
  studyResultsDetails: [
    {
      timePoint: "",
      testParameter: "",
      result: "",
      acceptanceCriteria: "",
      complianceStatus: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 6. Evaluation & Conclusion */
  trendAnalysis: "",
  statisticalMethod: "",
  shelfLifeDetermination: "",
  conclusion: "",
  gapsIdentified: "",
  correctiveActions: "",

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

const FRM01496_ShelfLifeStudyReport = () => {

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
    <ModernFormWrapper formId="FRM-01496" title="Shelf-life Study Report">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Shelf-life Study Report Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01496"
            title="FRM-01496 — Shelf-life Study Report"
            department="Food Safety Licensing | Labeling, Claims & Traceability"
          >

          {/* Sections 1–4 */}
          {[
            ["General Information",[
              ["formReferenceId","Form ID"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["studyDate","Study Date"],
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
              ["packagingType","Packaging Type"],
              ["proposedShelfLife","Proposed Shelf Life"]
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
                      type={["studyDate","manufacturingDate"].includes(name) ? "date" : "text"}
                      as={["objective","scopeDescription","storageConditions","samplingPlan","testParameters"].includes(name) ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 5. Study Results Details */}
          <div className="form-section">
            <h3 className="form-section-title">Study Results Details</h3>

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
                    setFieldValue("studyResultsDetails", [
                      ...values.studyResultsDetails,
                      {
                        timePoint:"",
                        testParameter:"",
                        result:"",
                        acceptanceCriteria:"",
                        complianceStatus:"",
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

            <FieldArray name="studyResultsDetails">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Time Point</th>
                    <th>Test Parameter</th>
                    <th>Result</th>
                    <th>Acceptance Criteria</th>
                    <th>Compliance Status</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.studyResultsDetails.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`studyResultsDetails.${index}.timePoint`} className="form-input"/></td>
                      <td><Field name={`studyResultsDetails.${index}.testParameter`} className="form-input"/></td>
                      <td><Field name={`studyResultsDetails.${index}.result`} className="form-input"/></td>
                      <td><Field name={`studyResultsDetails.${index}.acceptanceCriteria`} className="form-input"/></td>
                      <td><Field name={`studyResultsDetails.${index}.complianceStatus`} className="form-input"/></td>
                      <td><Field name={`studyResultsDetails.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`studyResultsDetails.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 6. Evaluation & Conclusion */}
          <div className="form-section">
            <h3 className="form-section-title">Evaluation & Conclusion</h3>
            <div className="form-fields">
              {[
                ["trendAnalysis","Trend Analysis"],
                ["statisticalMethod","Statistical Method"],
                ["shelfLifeDetermination","Shelf Life Determination"],
                ["conclusion","Conclusion"],
                ["gapsIdentified","Gaps Identified"],
                ["correctiveActions","Corrective Actions"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field as="textarea" name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

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
                Submit Shelf-life Study Report
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

export default FRM01496_ShelfLifeStudyReport;