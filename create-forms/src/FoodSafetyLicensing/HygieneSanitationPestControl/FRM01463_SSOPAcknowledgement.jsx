// FRM01463_SSOPAcknowledgement.jsx
// FRM-01463 – Sanitation Standard Operating Procedure (SSOP) Acknowledgement
// Enterprise Grade – Food Safety Licensing – Hygiene, Sanitation & Pest Control

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
  acknowledgementNumber: Yup.string().required("Required"),
  ssopTitle: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01463",
  department: "Hygiene, Sanitation & Pest Control",

  /* 1. General Information */
  acknowledgementNumber: "",
  departmentName: "",
  processArea: "",
  ssopReferenceNumber: "",
  version: "",
  effectiveDate: "",
  status: "",

  /* 2. Organization Details */
  companyName: "",
  sitePlant: "",
  location: "",
  productionArea: "",
  businessUnit: "",

  /* 3. SSOP Details */
  ssopTitle: "",
  scope: "",
  sanitationArea: "",
  frequency: "",
  responsibleDepartment: "",

  /* 4. Personnel Acknowledgement */
  personnelAcknowledgement: [
    {
      employeeName: "",
      employeeId: "",
      designation: "",
      department: "",
      trainingDate: "",
      signature: "",
      remarks: "",
      dynamicFields:{}
    }
  ],

  /* 5. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  licenseNumber: "",
  governmentReference: "",

  /* 6. Attachments */
  documentsAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 7. Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01463_SSOPAcknowledgement = () => {

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
    <ModernFormWrapper formId="FRM-01463" title="SSOP Acknowledgement">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("SSOP Acknowledgement Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01463"
            title="FRM-01463 — Sanitation Standard Operating Procedure (SSOP) Acknowledgement"
            department="Food Safety Licensing | Hygiene, Sanitation & Pest Control"
          >

          {/* 1–3 Sections */}
          {[
            ["General Information",[
              ["acknowledgementNumber","Acknowledgement Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["ssopReferenceNumber","SSOP Reference Number"],
              ["version","Version"],
              ["effectiveDate","Effective Date"],
              ["status","Status"]
            ]],
            ["Organization Details",[
              ["companyName","Company Name"],
              ["sitePlant","Site / Plant"],
              ["location","Location"],
              ["productionArea","Production Area"],
              ["businessUnit","Business Unit"]
            ]],
            ["SSOP Details",[
              ["ssopTitle","SSOP Title"],
              ["scope","Scope"],
              ["sanitationArea","Sanitation Area"],
              ["frequency","Frequency"],
              ["responsibleDepartment","Responsible Department"]
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
                      type={name==="effectiveDate"?"date":"text"}
                      as={name==="scope"?"textarea":"input"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 4. Personnel Acknowledgement */}
          <div className="form-section">
            <h3 className="form-section-title">Personnel Acknowledgement</h3>

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
                    setFieldValue("personnelAcknowledgement", [
                      ...values.personnelAcknowledgement,
                      {
                        employeeName:"",
                        employeeId:"",
                        designation:"",
                        department:"",
                        trainingDate:"",
                        signature:"",
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

            <FieldArray name="personnelAcknowledgement">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Training Date</th>
                    <th>Signature</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.personnelAcknowledgement.map((row,index)=>(
                    <tr key={index}>
                      {["employeeName","employeeId","designation","department","trainingDate","signature","remarks"].map(field=>(
                        <td key={field}>
                          <Field
                            name={`personnelAcknowledgement.${index}.${field}`}
                            type={field==="trainingDate"?"date":"text"}
                            as={field==="remarks"?"textarea":"input"}
                            className="form-input"
                          />
                        </td>
                      ))}
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field
                            name={`personnelAcknowledgement.${index}.dynamicFields.${col.key}`}
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

          {/* 5. Compliance */}
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

          {/* 6. Attachments */}
          <div className="form-section">
            <FormAttachments values={values}/>
          </div>

          <FormCustomFields values={values}/>

          {/* 7. Authorization */}
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
                Submit SSOP Acknowledgement
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

export default FRM01463_SSOPAcknowledgement;