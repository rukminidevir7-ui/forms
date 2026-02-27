// FRM01481_LabelArtworkApproval.jsx
// FRM-01481 – Label Artwork Approval
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
  approvalNumber: Yup.string().required("Required"),
  approvalDate: Yup.string().required("Required"),
  productName: Yup.string().required("Required"),
  artworkTitle: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01481",
  department: "Labeling, Claims & Traceability",

  /* 1. General Information */
  approvalNumber: "",
  departmentName: "",
  processArea: "",
  approvalDate: "",
  artworkVersion: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  businessUnit: "",

  /* 3. Product Details */
  productName: "",
  productCode: "",
  packSize: "",
  marketRegion: "",
  brandName: "",

  /* 4. Artwork Details */
  artworkTitle: "",
  labelType: "",
  language: "",
  designAgency: "",
  changeDescription: "",

  /* 5. Compliance Verification */
  regulatoryComplianceVerified: "",
  ingredientDeclarationVerified: "",
  nutritionalInformationVerified: "",
  allergenDeclarationVerified: "",
  barcodeVerified: "",
  claimsVerified: "",
  legalReviewComments: "",

  /* 6. Risk Assessment */
  riskLevel: "",
  impactAssessment: "",
  correctiveActionRequired: "",
  remarks: "",

  /* 7. Attachments */
  artworkFileAttached: "",
  attachmentList: [
    { item: "Supporting Document 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 8. Authorization */
  finalApprovalDate: "",
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01481_LabelArtworkApproval = () => {

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
    <ModernFormWrapper formId="FRM-01481" title="Label Artwork Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Label Artwork Approval Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01481"
            title="FRM-01481 — Label Artwork Approval"
            department="Food Safety Licensing | Labeling, Claims & Traceability"
          >

          {[
            ["General Information",[
              ["approvalNumber","Approval Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["approvalDate","Approval Date"],
              ["artworkVersion","Artwork Version"],
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
              ["packSize","Pack Size"],
              ["marketRegion","Market / Region"],
              ["brandName","Brand Name"]
            ]],
            ["Artwork Details",[
              ["artworkTitle","Artwork Title"],
              ["labelType","Label Type"],
              ["language","Language"],
              ["designAgency","Design Agency"],
              ["changeDescription","Change Description"]
            ]],
            ["Compliance Verification",[
              ["regulatoryComplianceVerified","Regulatory Compliance Verified (Yes/No)"],
              ["ingredientDeclarationVerified","Ingredient Declaration Verified (Yes/No)"],
              ["nutritionalInformationVerified","Nutritional Information Verified (Yes/No)"],
              ["allergenDeclarationVerified","Allergen Declaration Verified (Yes/No)"],
              ["barcodeVerified","Barcode Verified (Yes/No)"],
              ["claimsVerified","Claims Verified"],
              ["legalReviewComments","Legal Review Comments"]
            ]],
            ["Risk Assessment",[
              ["riskLevel","Risk Level"],
              ["impactAssessment","Impact Assessment"],
              ["correctiveActionRequired","Corrective Action Required"],
              ["remarks","Remarks"]
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
                      as={["changeDescription","legalReviewComments","impactAssessment","correctiveActionRequired","remarks"].includes(name) ? "textarea" : "input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 7. Attachments */}
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
                      { item: "New Supporting Document", remarks: "", dynamicFields:{} }
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
                    <th>Supporting Documents</th>
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
                <label className="form-label">Artwork File Attached (Yes/No)</label>
                <Field name="artworkFileAttached" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Upload Reference ID</label>
                <Field name="uploadReferenceId" className="form-input"/>
              </div>
            </div>
          </div>

          <FormCustomFields values={values}/>

          {/* 8. Authorization */}
          <div className="form-section">
            <h3 className="form-section-title">Authorization</h3>

            <div className="form-field">
              <label className="form-label">Approval Date</label>
              <Field name="finalApprovalDate" type="date" className="form-input"/>
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
                Submit Label Artwork Approval
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

export default FRM01481_LabelArtworkApproval;