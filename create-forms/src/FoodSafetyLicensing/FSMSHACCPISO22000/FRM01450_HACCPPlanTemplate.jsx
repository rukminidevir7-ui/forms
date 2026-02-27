// FRM01450_HACCPPlanTemplate.jsx
// FRM-01450 – HACCP Plan Template
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
  documentTitle: Yup.string().required("Required"),
  planNumber: Yup.string().required("Required"),
  teamLeader: Yup.string().required("Required"),
  complianceRequired: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01450",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  documentTitle: "",
  departmentName: "",
  processArea: "",
  planNumber: "",
  version: "",
  effectiveDate: "",
  reviewDate: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  productCategory: "",
  processLine: "",

  /* 3. HACCP Team */
  teamLeader: "",
  teamMembers: "",
  expertise: "",
  contactDetails: "",

  /* 4. Product Description */
  productName: "",
  ingredients: "",
  packaging: "",
  shelfLife: "",
  storageConditions: "",
  intendedUse: "",

  /* 5. Process Flow */
  processSteps: "",
  flowDiagramReference: "",
  onsiteConfirmation: "",

  /* 6. Hazard Analysis */
  hazardType: "",
  hazardDescription: "",
  preventiveMeasures: "",
  significanceLevel: "",

  /* 7. Critical Control Points */
  ccpNumber: "",
  criticalLimits: "",
  monitoringProcedure: "",
  correctiveAction: "",
  verificationMethod: "",
  responsiblePerson: "",

  /* 8. Compliance & Regulatory Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",
  complianceRequired: "",

  /* 9. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 10. Approval */
  approvalDate: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01450_HACCPPlanTemplate = () => {

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
    <ModernFormWrapper formId="FRM-01450" title="HACCP Plan Template">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HACCP Plan Template Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01450"
            title="FRM-01450 — HACCP Plan Template"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1. General Information */}
          <div className="form-section">
            <h3 className="form-section-title">General Information</h3>
            <div className="form-fields">
              {[
                ["documentTitle","Document Title"],
                ["departmentName","Department"],
                ["processArea","Process Area"],
                ["planNumber","Plan Number"],
                ["version","Version"],
                ["status","Status"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
              <div className="form-field">
                <label className="form-label">Effective Date</label>
                <Field name="effectiveDate" type="date" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Review Date</label>
                <Field name="reviewDate" type="date" className="form-input"/>
              </div>
            </div>
          </div>

          {/* 2–8 Sections */}
          {[
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["productCategory","Product Category"],
              ["processLine","Process Line"]
            ]],
            ["HACCP Team",[
              ["teamLeader","Team Leader"],
              ["teamMembers","Team Members"],
              ["expertise","Expertise"],
              ["contactDetails","Contact Details"]
            ]],
            ["Product Description",[
              ["productName","Product Name"],
              ["ingredients","Ingredients"],
              ["packaging","Packaging"],
              ["shelfLife","Shelf Life"],
              ["storageConditions","Storage Conditions"],
              ["intendedUse","Intended Use"]
            ]],
            ["Process Flow",[
              ["processSteps","Process Steps"],
              ["flowDiagramReference","Flow Diagram Reference"],
              ["onsiteConfirmation","On-Site Confirmation (Yes/No)"]
            ]],
            ["Hazard Analysis",[
              ["hazardType","Hazard Type (Biological / Chemical / Physical)"],
              ["hazardDescription","Hazard Description"],
              ["preventiveMeasures","Preventive Measures"],
              ["significanceLevel","Significance Level"]
            ]],
            ["Critical Control Points",[
              ["ccpNumber","CCP Number"],
              ["criticalLimits","Critical Limits"],
              ["monitoringProcedure","Monitoring Procedure"],
              ["correctiveAction","Corrective Action"],
              ["verificationMethod","Verification Method"],
              ["responsiblePerson","Responsible Person"]
            ]],
            ["Compliance & Regulatory Reference",[
              ["applicableStandard","Applicable Standard"],
              ["regulatoryRequirement","Regulatory Requirement"],
              ["licenseNumber","License Number"],
              ["governmentReference","Government Reference"],
              ["complianceRequired","Compliance Required (Yes/No)"]
            ]]
          ].map(([section,fields])=>(
            <div className="form-section" key={section}>
              <h3 className="form-section-title">{section}</h3>
              <div className="form-fields">
                {fields.map(([name,label])=>(
                  <div className="form-field" key={name}>
                    <label className="form-label">{label}</label>
                    <Field name={name} className="form-input"/>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 9. Attachments (Same as FRM-01449) */}
          <div className="form-section">
            <FormAttachments values={values} />

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
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.attachmentList.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`attachmentList.${index}.item`} className="form-input"/></td>
                      <td><Field name={`attachmentList.${index}.remarks`} className="form-input"/></td>
                      {dynamicColumns.map(col=>(
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

          {/* 10. Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval & Sign-off</h3>

            <div className="form-field">
              <label className="form-label">Approval Date</label>
              <Field name="approvalDate" type="date" className="form-input"/>
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
                Submit HACCP Plan Template
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

export default FRM01450_HACCPPlanTemplate;