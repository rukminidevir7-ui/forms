// FRM02578_02580_RevenueLeakageCheckUniversal.jsx
// FRM-02578–02580 – Revenue Leakage Check — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Revenue Assurance & Controls

import React, { useState, useEffect } from "react";
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
  checkReferenceNo: Yup.string().required("Required"),
  initiationDate: Yup.date().required("Required"),
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02578-02580",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Reference */
  checkReferenceNo: "",
  initiationDate: "",
  businessUnit: "",
  processArea: "",
  preparedBy: "",

  /* 2. Scope */
  objective: "",
  scopeDescription: "",
  periodCovered: "",
  systemsReviewed: "",

  /* 3. Leakage Assessment */
  leakageItems: [
    { area: "", observation: "", estimatedImpact: "", rootCause: "", status: "", dynamicFields:{} }
  ],

  /* 4. Risk Summary */
  totalEstimatedImpact: "",
  riskLevel: "",
  keyObservations: "",

  /* 5. Action Plan */
  actionItems: [
    { actionItem:"", owner:"", targetDate:"", status:"", remarks:"", dynamicFields:{} }
  ],

  /* 6. Approval */
  approvalRoles: [
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate:"",
  comments:""
};

/* ================= COMPONENT ================= */

const FRM02578_RevenueLeakageCheck = () => {

  const { isPrintMode } = usePrintMode();

  const [leakageColumns, setLeakageColumns] = useState([]);
  const [actionColumns, setActionColumns] = useState([]);

  const addColumn = (type) => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");

    if(type==="leakage"){
      if(leakageColumns.find(c=>c.key===key)) return alert("Column exists");
      setLeakageColumns([...leakageColumns,{key,label:name}]);
    } else {
      if(actionColumns.find(c=>c.key===key)) return alert("Column exists");
      setActionColumns([...actionColumns,{key,label:name}]);
    }
  };

  const calculateTotalImpact = (values,setFieldValue) => {
    const total = values.leakageItems.reduce(
      (sum,row)=> sum + Number(row.estimatedImpact || 0),0
    );
    setFieldValue("totalEstimatedImpact", total.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02578-02580" title="Revenue Leakage Check">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Revenue Leakage Check Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateTotalImpact(values,setFieldValue);
        },[values.leakageItems]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02578-02580"
            title="FRM-02578–02580 — Revenue Leakage Check — Universal Form"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"checkReferenceNo","Check Reference No")}
              {field(values,"initiationDate","Initiation Date","date")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"processArea","Process Area")}
              {field(values,"preparedBy","Prepared By")}
            </div>
          </div>

          {/* 2. Scope */}
          <div className="form-section">
            <h3 className="form-section-title">Scope & Objective</h3>
            <div className="form-fields">
              {field(values,"objective","Objective")}
              {field(values,"scopeDescription","Scope Description")}
              {field(values,"periodCovered","Period Covered")}
              {field(values,"systemsReviewed","Systems Reviewed")}
            </div>
          </div>

          {/* 3. Leakage Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Leakage Assessment Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={()=>addColumn("leakage")}>+ Add Column</button>
                <button type="button" className="btn-submit" style={{marginLeft:10}}
                  onClick={()=>setFieldValue("leakageItems",[
                    ...values.leakageItems,
                    {area:"",observation:"",estimatedImpact:"",rootCause:"",status:"",dynamicFields:{}}
                  ])}>
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="leakageItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Observation</th>
                    <th>Estimated Impact</th>
                    <th>Root Cause</th>
                    <th>Status</th>
                    {leakageColumns.map(col=><th key={col.key}>{col.label}</th>)}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.leakageItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`leakageItems.${index}.area`} className="form-input"/></td>
                      <td><Field name={`leakageItems.${index}.observation`} className="form-input"/></td>
                      <td><Field type="number" name={`leakageItems.${index}.estimatedImpact`} className="form-input"/></td>
                      <td><Field name={`leakageItems.${index}.rootCause`} className="form-input"/></td>
                      <td><Field name={`leakageItems.${index}.status`} className="form-input"/></td>
                      {leakageColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`leakageItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                        </td>
                      ))}
                      {!isPrintMode && <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </FieldArray>
          </div>

          {/* 4. Risk Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Risk & Impact Summary</h3>
            <div className="form-fields">
              {field(values,"totalEstimatedImpact","Total Estimated Impact")}
              {field(values,"riskLevel","Risk Level")}
              {field(values,"keyObservations","Key Observations")}
            </div>
          </div>

          {/* 5. Action Plan */}
          <div className="form-section">
            <h3 className="form-section-title">Action Plan</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={()=>addColumn("action")}>+ Add Column</button>
                <button type="button" className="btn-submit" style={{marginLeft:10}}
                  onClick={()=>setFieldValue("actionItems",[
                    ...values.actionItems,
                    {actionItem:"",owner:"",targetDate:"",status:"",remarks:"",dynamicFields:{}}
                  ])}>
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="actionItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Action Item</th>
                    <th>Owner</th>
                    <th>Target Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    {actionColumns.map(col=><th key={col.key}>{col.label}</th>)}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.actionItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`actionItems.${index}.actionItem`} className="form-input"/></td>
                      <td><Field name={`actionItems.${index}.owner`} className="form-input"/></td>
                      <td><Field type="date" name={`actionItems.${index}.targetDate`} className="form-input"/></td>
                      <td><Field name={`actionItems.${index}.status`} className="form-input"/></td>
                      <td><Field name={`actionItems.${index}.remarks`} className="form-input"/></td>
                      {actionColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`actionItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                        </td>
                      ))}
                      {!isPrintMode && <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </FieldArray>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 6. Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval & Sign-off</h3>
            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button type="button" className="btn-submit" onClick={()=>push({roleName:"New Role",data:{}})}>+ Add Role</button>}
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
                    {!isPrintMode && <button type="button" onClick={()=>remove(index)}>Remove</button>}
                  </div>
                ))}
              </div>
              </>
            )}
            </FieldArray>

            {field(values,"approvalDate","Approval Date","date")}
            {field(values,"comments","Comments")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Revenue Leakage Check
              </button>
            </div>
          }

          </ModernA4Template>
        </Form>
        );
      }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM02578_RevenueLeakageCheck;