// FRM01452_CCPMonitoringLog.jsx
// FRM-01452 – Critical Control Point (CCP) Monitoring Log
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
  logNumber: Yup.string().required("Required"),
  departmentName: Yup.string().required("Required"),
  complianceRequired: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01452",
  department: "FSMS / HACCP / ISO 22000",

  /* 1. General Information */
  departmentName: "",
  processArea: "",
  logNumber: "",
  version: "",
  effectiveDate: "",
  shift: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  productionLine: "",
  productName: "",

  /* 3. CCP Monitoring Entries */
  monitoringEntries: [
    {
      date: "",
      time: "",
      ccpNo: "",
      parameter: "",
      criticalLimit: "",
      observedValue: "",
      deviation: "",
      actionTaken: "",
      operator: "",
      supervisor: "",
      dynamicFields:{}
    }
  ],

  /* 4. Verification */
  verifiedBy: "",
  verificationDate: "",
  verificationComments: "",

  /* 5. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",
  complianceRequired: "",

  /* 6. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 7. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01452_CCPMonitoringLog = () => {

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
    <ModernFormWrapper formId="FRM-01452" title="CCP Monitoring Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("CCP Monitoring Log Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01452"
            title="FRM-01452 — Critical Control Point (CCP) Monitoring Log"
            department="Food Safety Licensing | FSMS / HACCP / ISO 22000"
          >

          {/* 1. General Information */}
          <div className="form-section">
            <h3 className="form-section-title">General Information</h3>
            <div className="form-fields">
              {[
                ["departmentName","Department"],
                ["processArea","Process Area"],
                ["logNumber","Log Number"],
                ["version","Version"],
                ["shift","Shift"],
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
                ["productionLine","Production Line"],
                ["productName","Product Name"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 3. CCP Monitoring Entries */}
          <div className="form-section">
            <h3 className="form-section-title">CCP Monitoring Entries</h3>

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
                    setFieldValue("monitoringEntries", [
                      ...values.monitoringEntries,
                      {
                        date:"",
                        time:"",
                        ccpNo:"",
                        parameter:"",
                        criticalLimit:"",
                        observedValue:"",
                        deviation:"",
                        actionTaken:"",
                        operator:"",
                        supervisor:"",
                        dynamicFields:{}
                      }
                    ])
                  }
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="monitoringEntries">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>CCP No</th>
                    <th>Parameter</th>
                    <th>Critical Limit</th>
                    <th>Observed Value</th>
                    <th>Deviation (Yes/No)</th>
                    <th>Action Taken</th>
                    <th>Operator</th>
                    <th>Supervisor</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.monitoringEntries.map((row,index)=>(
                    <tr key={index}>
                      {["date","time","ccpNo","parameter","criticalLimit","observedValue","deviation","actionTaken","operator","supervisor"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`monitoringEntries.${index}.${field}`}
                            type={field==="date"?"date":field==="time"?"time":"text"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`monitoringEntries.${index}.dynamicFields.${col.key}`}
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

          {/* 4–5 Sections */}
          {[
            ["Verification",[
              ["verifiedBy","Verified By"],
              ["verificationDate","Verification Date"],
              ["verificationComments","Comments"]
            ]],
            ["Compliance & Reference",[
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
                      type={name.includes("Date")?"date":"text"}
                      as={name==="verificationComments"?"textarea":"input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Attachments — SAME PATTERN */}
          <div className="form-section">
            <FormAttachments values={values}/>
          </div>

          <FormCustomFields values={values}/>

          {/* Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval & Sign-off</h3>
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
                Submit CCP Monitoring Log
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

export default FRM01452_CCPMonitoringLog;