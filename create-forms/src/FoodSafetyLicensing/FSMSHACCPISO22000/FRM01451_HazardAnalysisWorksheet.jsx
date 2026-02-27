// FRM01451_HazardAnalysisWorksheet.jsx
// FRM-01451 – Hazard Analysis Worksheet
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
  worksheetNumber: Yup.string().required("Required"),
  processStep: Yup.string().required("Required"),
  complianceRequired: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01451",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  documentTitle: "",
  departmentName: "",
  processArea: "",
  worksheetNumber: "",
  version: "",
  effectiveDate: "",
  reviewDate: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  productProcess: "",
  productionLine: "",

  /* 3. Hazard Identification */
  processStep: "",
  hazardType: "",
  hazardDescription: "",
  causeOfHazard: "",
  potentialImpact: "",

  /* 4. Risk Evaluation */
  likelihood: "",
  severity: "",
  riskRating: "",
  significance: "",

  /* 5. Control Measures */
  existingControlMeasures: "",
  preventiveMeasures: "",
  monitoringMethod: "",
  responsiblePerson: "",

  /* 6. Corrective Actions */
  correctiveActionRequired: "",
  actionDescription: "",
  targetCompletionDate: "",
  actionOwner: "",

  /* 7. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",
  complianceRequired: "",

  /* 8. Verification */
  verifiedBy: "",
  verificationDate: "",
  verificationComments: "",

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

const FRM01451_HazardAnalysisWorksheet = () => {

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
    <ModernFormWrapper formId="FRM-01451" title="Hazard Analysis Worksheet">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Hazard Analysis Worksheet Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01451"
            title="FRM-01451 — Hazard Analysis Worksheet"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* Section Rendering Pattern Same As Previous Form */}

          {[
            ["General Information",[
              ["documentTitle","Document Title"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["worksheetNumber","Worksheet Number"],
              ["version","Version"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["productProcess","Product / Process"],
              ["productionLine","Production Line"]
            ]],
            ["Hazard Identification",[
              ["processStep","Process Step"],
              ["hazardType","Hazard Type (Biological / Chemical / Physical)"],
              ["hazardDescription","Hazard Description"],
              ["causeOfHazard","Cause of Hazard"],
              ["potentialImpact","Potential Impact"]
            ]],
            ["Risk Evaluation",[
              ["likelihood","Likelihood"],
              ["severity","Severity"],
              ["riskRating","Risk Rating"],
              ["significance","Significance (Yes/No)"]
            ]],
            ["Control Measures",[
              ["existingControlMeasures","Existing Control Measures"],
              ["preventiveMeasures","Preventive Measures"],
              ["monitoringMethod","Monitoring Method"],
              ["responsiblePerson","Responsible Person"]
            ]],
            ["Corrective Actions",[
              ["correctiveActionRequired","Corrective Action Required"],
              ["actionDescription","Action Description"],
              ["targetCompletionDate","Target Completion Date"],
              ["actionOwner","Action Owner"]
            ]],
            ["Compliance & Reference",[
              ["applicableStandard","Applicable Standard"],
              ["regulatoryRequirement","Regulatory Requirement"],
              ["licenseNumber","License Number"],
              ["governmentReference","Government Reference"],
              ["complianceRequired","Compliance Required (Yes/No)"]
            ]],
            ["Verification",[
              ["verifiedBy","Verified By"],
              ["verificationDate","Verification Date"],
              ["verificationComments","Comments"]
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
                      type={name.toLowerCase().includes("date") ? "date" : "text"}
                      as={name.toLowerCase().includes("description") || name.toLowerCase().includes("impact") || name.toLowerCase().includes("comments") ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Attachments — SAME STRUCTURE */}
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

          {/* Approval — SAME STRUCTURE */}
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
                Submit Hazard Analysis Worksheet
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

export default FRM01451_HazardAnalysisWorksheet;