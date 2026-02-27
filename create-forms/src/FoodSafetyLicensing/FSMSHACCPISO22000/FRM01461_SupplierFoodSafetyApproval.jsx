// FRM01461_SupplierFoodSafetyApproval.jsx
// FRM-01461 – Supplier Food Safety Approval
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
  approvalNumber: Yup.string().required("Required"),
  supplierName: Yup.string().required("Required"),
  approvalDecision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01461",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  approvalNumber: "",
  departmentName: "",
  processArea: "",
  approvalDate: "",
  approvalType: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",

  /* 3. Supplier Details */
  supplierName: "",
  supplierId: "",
  supplierAddress: "",
  contactPerson: "",
  contactNumber: "",
  email: "",
  materialServiceProvided: "",

  /* 4. Food Safety Evaluation */
  certification: "",
  licenseNumber: "",
  auditConducted: "",
  auditDate: "",
  riskLevel: "",
  evaluationSummary: "",

  /* 5. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  governmentReference: "",
  complianceStatus: "",

  /* 6. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 7. Approval Decision */
  approvalDecision: "",
  conditionsRemarks: "",
  validityPeriod: "",
  nextReviewDate: "",

  /* 8. Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01461_SupplierFoodSafetyApproval = () => {

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
    <ModernFormWrapper formId="FRM-01461" title="Supplier Food Safety Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Supplier Food Safety Approval Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01461"
            title="FRM-01461 — Supplier Food Safety Approval"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1–5 Sections */}
          {[
            ["General Information",[
              ["approvalNumber","Approval Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["approvalDate","Approval Date"],
              ["approvalType","Approval Type"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["businessUnit","Business Unit"]
            ]],
            ["Supplier Details",[
              ["supplierName","Supplier Name"],
              ["supplierId","Supplier ID"],
              ["supplierAddress","Supplier Address"],
              ["contactPerson","Contact Person"],
              ["contactNumber","Contact Number"],
              ["email","Email"],
              ["materialServiceProvided","Material / Service Provided"]
            ]],
            ["Food Safety Evaluation",[
              ["certification","Certification (ISO 22000 / FSSC / HACCP / Others)"],
              ["licenseNumber","License Number"],
              ["auditConducted","Audit Conducted (Yes/No)"],
              ["auditDate","Audit Date"],
              ["riskLevel","Risk Level"],
              ["evaluationSummary","Evaluation Summary"]
            ]],
            ["Compliance & Reference",[
              ["applicableStandard","Applicable Standard"],
              ["regulatoryRequirement","Regulatory Requirement"],
              ["governmentReference","Government Reference"],
              ["complianceStatus","Compliance Status"]
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
                      as={name==="evaluationSummary" || name==="supplierAddress" ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 6. Attachments */}
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

          {/* 7. Approval Decision */}
          <div className="form-section">
            <h3 className="form-section-title">Approval Decision</h3>
            <div className="form-fields">
              {[
                ["approvalDecision","Approval Decision (Approved / Conditional / Rejected)"],
                ["conditionsRemarks","Conditions / Remarks"],
                ["validityPeriod","Validity Period"],
                ["nextReviewDate","Next Review Date"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field
                    name={name}
                    type={name==="nextReviewDate"?"date":"text"}
                    as={name==="conditionsRemarks"?"textarea":"input"}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
          </div>

          <FormCustomFields values={values}/>

          {/* 8. Authorization */}
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
                Submit Supplier Approval
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

export default FRM01461_SupplierFoodSafetyApproval;