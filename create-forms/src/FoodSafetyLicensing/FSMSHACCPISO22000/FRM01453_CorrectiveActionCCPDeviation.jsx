// FRM01453_CorrectiveActionCCPDeviation.jsx
// FRM-01453 – Corrective Action for CCP Deviation
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
  formIdRef: Yup.string().required("Required"),
  ccpReferenceNumber: Yup.string().required("Required"),
  rootCause: Yup.string().required("Required"),
  complianceRequired: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01453",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  formIdRef: "",
  departmentName: "",
  processArea: "",
  ccpReferenceNumber: "",
  date: "",
  shift: "",
  priority: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  productionLine: "",
  productName: "",

  /* 3. Deviation Details */
  deviationDetectedDateTime: "",
  parameter: "",
  criticalLimit: "",
  observedValue: "",
  deviationDescription: "",
  immediateActionTaken: "",

  /* 4. Root Cause Analysis */
  rootCause: "",
  investigationMethod: "",
  contributingFactors: "",
  riskLevel: "",

  /* 5. Corrective Action Plan */
  correctiveActionDescription: "",
  preventiveAction: "",
  targetCompletionDate: "",
  actionOwner: "",
  resourcesRequired: "",

  /* 6. Verification & Effectiveness */
  verificationMethod: "",
  effectivenessCheckDate: "",
  verifiedBy: "",
  verificationComments: "",

  /* 7. Compliance & Regulatory Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",
  complianceRequired: "",

  /* 8. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 9. Approval Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01453_CorrectiveActionCCPDeviation = () => {

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
    <ModernFormWrapper formId="FRM-01453" title="Corrective Action for CCP Deviation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Corrective Action for CCP Deviation Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01453"
            title="FRM-01453 — Corrective Action for CCP Deviation"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {[
            ["General Information",[
              ["formIdRef","Form ID"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["ccpReferenceNumber","CCP Reference Number"],
              ["date","Date"],
              ["shift","Shift"],
              ["priority","Priority"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["productionLine","Production Line"],
              ["productName","Product Name"]
            ]],
            ["Deviation Details",[
              ["deviationDetectedDateTime","Deviation Detected Date & Time"],
              ["parameter","Parameter"],
              ["criticalLimit","Critical Limit"],
              ["observedValue","Observed Value"],
              ["deviationDescription","Deviation Description"],
              ["immediateActionTaken","Immediate Action Taken"]
            ]],
            ["Root Cause Analysis",[
              ["rootCause","Root Cause"],
              ["investigationMethod","Investigation Method"],
              ["contributingFactors","Contributing Factors"],
              ["riskLevel","Risk Level"]
            ]],
            ["Corrective Action Plan",[
              ["correctiveActionDescription","Corrective Action Description"],
              ["preventiveAction","Preventive Action"],
              ["targetCompletionDate","Target Completion Date"],
              ["actionOwner","Action Owner"],
              ["resourcesRequired","Resources Required"]
            ]],
            ["Verification & Effectiveness",[
              ["verificationMethod","Verification Method"],
              ["effectivenessCheckDate","Effectiveness Check Date"],
              ["verifiedBy","Verified By"],
              ["verificationComments","Comments"]
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
                    <Field
                      name={name}
                      type={name.toLowerCase().includes("date")?"date":"text"}
                      as={
                        name.toLowerCase().includes("description") ||
                        name.toLowerCase().includes("cause") ||
                        name.toLowerCase().includes("action") ||
                        name.toLowerCase().includes("comments") ||
                        name.toLowerCase().includes("resources")
                          ? "textarea"
                          : "input"
                      }
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Attachments */}
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

          {/* Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval Workflow</h3>

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
                Submit Corrective Action Form
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

export default FRM01453_CorrectiveActionCCPDeviation;