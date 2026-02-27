// FRM01402_DutyExemptionNotificationCheck.jsx
// FRM-01402–01404 – Duty Exemption Notification Check
// Enterprise Grade – Customs & Trade (Advanced) – Customs Operations

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormAttachments from "../../components/FormAttachments";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  referenceNumber: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  notificationNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01402-01404",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Reference Details */
  referenceNumber: "",
  requestDate: "",
  departmentName: "",
  preparedBy: "",
  businessUnit: "",

  /* 2. Transaction Details */
  partyName: "",
  iecNumber: "",
  gstin: "",
  documentNumber: "",
  port: "",
  country: "",

  /* 3. Notification Details */
  notificationNumber: "",
  notificationDate: "",
  description: "",
  applicableGoods: "",
  conditions: "",

  /* 4. Assessment */
  assessmentItems: [
    { checkItem:"", observation:"", status:"", remarks:"", dynamicFields:{} }
  ],

  /* 5. Decision */
  eligibilityResult: "",
  recommendedAction: "",
  riskLevel: "",

  /* 6. Attachments */
  documentsAttached: "",
  additionalNotes: "",

  /* 7. Sign-off */
  approvalRoles: [
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01402_DutyExemptionNotificationCheck = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const field = (values,name,label,type="text",multiline=false)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            {multiline
              ? <Field as="textarea" name={name} className="form-input"/>
              : <Field name={name} type={type} className="form-input"/>
            }
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="FRM-01402-01404" title="Duty Exemption Notification Check">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Duty Exemption Notification Check Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01402–01404"
            title="FRM-01402–01404 — Duty Exemption Notification Check"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Reference Details */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"referenceNumber","Reference Number")}
              {field(values,"requestDate","Request Date","date")}
              {field(values,"departmentName","Department")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"businessUnit","Business Unit")}
            </div>
          </div>

          {/* 2. Transaction Details */}
          <div className="form-section">
            <h3 className="form-section-title">Transaction Details</h3>
            <div className="form-fields">
              {field(values,"partyName","Importer / Exporter Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}
              {field(values,"documentNumber","BoE / Shipping Bill Number")}
              {field(values,"port","Port")}
              {field(values,"country","Country")}
            </div>
          </div>

          {/* 3. Notification Details */}
          <div className="form-section">
            <h3 className="form-section-title">Notification Details</h3>
            <div className="form-fields">
              {field(values,"notificationNumber","Notification Number")}
              {field(values,"notificationDate","Notification Date","date")}
              {field(values,"description","Description","text",true)}
              {field(values,"applicableGoods","Applicable Goods")}
              {field(values,"conditions","Conditions","text",true)}
            </div>
          </div>

          {/* 4. Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Assessment</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("assessmentItems",[
                    ...values.assessmentItems,
                    {checkItem:"",observation:"",status:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="assessmentItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Check Item</th>
                    <th>Observation</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.assessmentItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`assessmentItems.${index}.checkItem`} className="form-input"/></td>
                      <td><Field name={`assessmentItems.${index}.observation`} className="form-input"/></td>
                      <td>
                        <Field as="select" name={`assessmentItems.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Eligible</option>
                          <option>Not Eligible</option>
                          <option>Conditional</option>
                        </Field>
                      </td>
                      <td><Field name={`assessmentItems.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`assessmentItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                        </td>
                      ))}

                      {!isPrintMode &&
                        <td>
                          <button type="button" onClick={()=>remove(index)}>
                            Remove
                          </button>
                        </td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </FieldArray>
          </div>

          {/* 5. Decision */}
          <div className="form-section">
            <h3 className="form-section-title">Decision</h3>
            <div className="form-fields">
              {field(values,"eligibilityResult","Eligibility Result")}
              {field(values,"recommendedAction","Recommended Action","text",true)}
              {field(values,"riskLevel","Risk Level")}
            </div>
          </div>

          {/* 6. Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
            <div className="form-fields">
              {field(values,"documentsAttached","Documents Attached")}
              {field(values,"additionalNotes","Additional Notes","text",true)}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 7. Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-off</h3>

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button type="button" className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}>
                  + Add Role
                </button>}

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
                      <button type="button" onClick={()=>remove(index)}>
                        Remove
                      </button>}
                  </div>
                ))}
              </div>
              </>
            )}
            </FieldArray>

            {field(values,"approvalDate","Date","date")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Notification Check
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

export default FRM01402_DutyExemptionNotificationCheck;