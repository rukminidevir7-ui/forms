// FRM02589_BillingAuditChecklist.jsx
// FRM-02589 – Billing Audit Checklist
// Enterprise Grade – Client Billing & Revenue Operations – Revenue Assurance & Controls

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
  auditReferenceNo: Yup.string().required("Required"),
  auditPeriod: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  auditDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02589",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Audit Context */
  auditReferenceNo: "",
  auditPeriod: "",
  businessUnit: "",
  auditorName: "",
  auditDate: "",

  /* 2. Audit Checklist */
  auditItems: [
    { controlArea:"", auditRequirement:"", status:"", remarks:"", dynamicFields:{} }
  ],

  /* 3. Findings Summary */
  keyFindings: "",
  controlWeaknesses: "",
  riskLevel: "",
  recommendations: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02589_BillingAuditChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const field = (values,name,label,type="text")=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="FRM-02589" title="Billing Audit Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Audit Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-02589"
            title="FRM-02589 — Billing Audit Checklist"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Audit Context */}
          <div className="form-section">
            <h3 className="form-section-title">Audit Context</h3>
            <div className="form-fields">
              {field(values,"auditReferenceNo","Audit Reference No")}
              {field(values,"auditPeriod","Audit Period")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"auditorName","Auditor Name")}
              {field(values,"auditDate","Audit Date","date")}
            </div>
          </div>

          {/* 2. Audit Checklist */}
          <div className="form-section">
            <h3 className="form-section-title">Audit Checklist</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("auditItems",[
                    ...values.auditItems,
                    {controlArea:"",auditRequirement:"",status:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="auditItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Control Area</th>
                    <th>Audit Requirement</th>
                    <th>Status (Yes/No/NA)</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.auditItems.map((row,index)=>(
                    <tr key={index}>
                      <td>
                        <Field name={`auditItems.${index}.controlArea`} className="form-input"/>
                      </td>
                      <td>
                        <Field name={`auditItems.${index}.auditRequirement`} className="form-input"/>
                      </td>
                      <td>
                        <Field as="select" name={`auditItems.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>NA</option>
                        </Field>
                      </td>
                      <td>
                        <Field name={`auditItems.${index}.remarks`} className="form-input"/>
                      </td>
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`auditItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 3. Findings Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Findings Summary</h3>
            <div className="form-fields">
              {field(values,"keyFindings","Key Findings")}
              {field(values,"controlWeaknesses","Control Weaknesses")}
              {field(values,"riskLevel","Risk Level")}
              {field(values,"recommendations","Recommendations")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 4. Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-off</h3>

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button
                  type="button"
                  className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}
                >
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
                Submit Billing Audit Checklist
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

export default FRM02589_BillingAuditChecklist;