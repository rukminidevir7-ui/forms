// FRM02582_DeferredRevenueWorkingUniversal.jsx
// FRM-02582 – Deferred Revenue Working — Universal Form
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
  workingReferenceNo: Yup.string().required("Required"),
  period: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  preparedDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02582",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Reference */
  workingReferenceNo: "",
  period: "",
  businessUnit: "",
  preparedBy: "",
  preparedDate: "",

  /* 2. Summary */
  openingBalance: "",
  additionsDuringPeriod: "",
  revenueRecognized: "",
  closingBalance: "",

  /* 3. Deferred Items */
  deferredItems: [
    { contractClient:"", description:"", amount:"", recognitionPeriod:"", balance:"", dynamicFields:{} }
  ],

  /* 4. Observations */
  keyObservations: "",
  accountingNotes: "",
  adjustmentsRequired: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02582_DeferredRevenueWorking = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const calculateClosingBalance = (values,setFieldValue)=>{
    const opening = Number(values.openingBalance || 0);
    const additions = Number(values.additionsDuringPeriod || 0);
    const recognized = Number(values.revenueRecognized || 0);
    const closing = opening + additions - recognized;
    setFieldValue("closingBalance", closing.toFixed(2));
  };

  const field = (values,name,label,type="text",onBlurHandler=null)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" onBlur={onBlurHandler}/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="FRM-02582" title="Deferred Revenue Working">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Deferred Revenue Working Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateClosingBalance(values,setFieldValue);
        },[values.openingBalance,values.additionsDuringPeriod,values.revenueRecognized]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02582"
            title="FRM-02582 — Deferred Revenue Working — Universal Form"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"workingReferenceNo","Working Reference No")}
              {field(values,"period","Period")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"preparedDate","Prepared Date","date")}
            </div>
          </div>

          {/* 2. Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Summary</h3>
            <div className="form-fields">
              {field(values,"openingBalance","Opening Balance","number",
                ()=>calculateClosingBalance(values,setFieldValue))}
              {field(values,"additionsDuringPeriod","Additions During Period","number",
                ()=>calculateClosingBalance(values,setFieldValue))}
              {field(values,"revenueRecognized","Revenue Recognized","number",
                ()=>calculateClosingBalance(values,setFieldValue))}
              {field(values,"closingBalance","Closing Balance")}
            </div>
          </div>

          {/* 3. Deferred Items */}
          <div className="form-section">
            <h3 className="form-section-title">Deferred Items Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                <button type="button" className="btn-submit" style={{marginLeft:10}}
                  onClick={()=>setFieldValue("deferredItems",[
                    ...values.deferredItems,
                    {contractClient:"",description:"",amount:"",recognitionPeriod:"",balance:"",dynamicFields:{}}
                  ])}>
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="deferredItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Contract/Client</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Recognition Period</th>
                    <th>Balance</th>
                    {dynamicColumns.map(col=><th key={col.key}>{col.label}</th>)}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.deferredItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`deferredItems.${index}.contractClient`} className="form-input"/></td>
                      <td><Field name={`deferredItems.${index}.description`} className="form-input"/></td>
                      <td><Field type="number" name={`deferredItems.${index}.amount`} className="form-input"/></td>
                      <td><Field name={`deferredItems.${index}.recognitionPeriod`} className="form-input"/></td>
                      <td><Field name={`deferredItems.${index}.balance`} className="form-input"/></td>
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`deferredItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 4. Observations */}
          <div className="form-section">
            <h3 className="form-section-title">Observations</h3>
            <div className="form-fields">
              {field(values,"keyObservations","Key Observations")}
              {field(values,"accountingNotes","Accounting Notes")}
              {field(values,"adjustmentsRequired","Adjustments Required")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 5. Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-off</h3>
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
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Deferred Revenue Working
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

export default FRM02582_DeferredRevenueWorking;