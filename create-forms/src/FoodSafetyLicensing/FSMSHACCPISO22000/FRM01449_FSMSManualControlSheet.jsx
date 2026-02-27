// FRM01449_FSMSManualControlSheet.jsx
// FRM-01449 – FSMS Manual Control Sheet
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
  documentNumber: Yup.string().required("Required"),
  controlObjective: Yup.string().required("Required"),
  complianceRequired: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01449",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  documentTitle: "",
  departmentName: "",
  processArea: "",
  documentNumber: "",
  version: "",
  effectiveDate: "",
  reviewDate: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  foodCategory: "",
  productionLine: "",

  /* 3. Control Details */
  controlObjective: "",
  applicableStandard: "",
  controlDescription: "",
  frequency: "",
  responsiblePerson: "",
  monitoringMethod: "",

  /* 4. Compliance & Reference */
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",
  complianceRequired: "",
  riskLevel: "",

  /* 5. Verification */
  verifiedBy: "",
  verificationDate: "",
  verificationComments: "",

  /* 6. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 7. Approval */
  approvalDate: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01449_FSMSManualControlSheet = () => {

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
    <ModernFormWrapper formId="FRM-01449" title="FSMS Manual Control Sheet">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSMS Manual Control Sheet Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01449"
            title="FRM-01449 — FSMS Manual Control Sheet"
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
                ["documentNumber","Document Number"],
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

          {/* 2. Organization Details */}
          <div className="form-section">
            <h3 className="form-section-title">Organization Details</h3>
            <div className="form-fields">
              {[
                ["companyName","Company Name"],
                ["sitePlant","Site / Plant"],
                ["location","Location"],
                ["foodCategory","Food Category"],
                ["productionLine","Production Line"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Control Details */}
          <div className="form-section">
            <h3 className="form-section-title">Control Details</h3>
            <div className="form-fields">
              {[
                ["controlObjective","Control Objective"],
                ["applicableStandard","Applicable Standard (FSMS / HACCP / ISO 22000)"],
                ["controlDescription","Control Description"],
                ["frequency","Frequency"],
                ["responsiblePerson","Responsible Person"],
                ["monitoringMethod","Monitoring Method"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Compliance & Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance & Reference</h3>
            <div className="form-fields">
              {[
                ["regulatoryRequirement","Regulatory Requirement"],
                ["licenseNumber","License Number"],
                ["governmentReference","Government Reference"],
                ["complianceRequired","Compliance Required (Yes/No)"],
                ["riskLevel","Risk Level"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Verification */}
          <div className="form-section">
            <h3 className="form-section-title">Verification</h3>
            <div className="form-fields">
              {[
                ["verifiedBy","Verified By"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
              <div className="form-field">
                <label className="form-label">Verification Date</label>
                <Field name="verificationDate" type="date" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Comments</label>
                <Field as="textarea" name="verificationComments" className="form-input"/>
              </div>
            </div>
          </div>

         {/* 6. Attachments */}
<div className="form-section">
            <FormAttachments values={values} />


  {!isPrintMode &&
    <div style={{marginBottom:15}}>
      <button
        type="button"
        className="btn-submit"
        onClick={addColumn}
      >
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
            <td>
              <Field
                name={`attachmentList.${index}.item`}
                className="form-input"
              />
            </td>
            <td>
              <Field
                name={`attachmentList.${index}.remarks`}
                className="form-input"
              />
            </td>

            {dynamicColumns.map(col=>(
              <td key={col.key}>
                <Field
                  name={`attachmentList.${index}.dynamicFields.${col.key}`}
                  className="form-input"
                />
              </td>
            ))}

            {!isPrintMode &&
              <td>
                <button
                  type="button"
                  onClick={()=>remove(index)}
                >
                  Remove
                </button>
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

          {/* 7. Approval */}
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
                Submit FSMS Manual Control Sheet
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

export default FRM01449_FSMSManualControlSheet;