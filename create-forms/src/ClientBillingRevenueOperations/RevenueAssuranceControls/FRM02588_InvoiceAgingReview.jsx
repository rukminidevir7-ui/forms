// FRM02588_InvoiceAgingReview.jsx
// FRM-02588 – Invoice Aging Review
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
  reviewReferenceNo: Yup.string().required("Required"),
  reviewPeriod: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  reviewDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02588",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Reference */
  reviewReferenceNo: "",
  reviewPeriod: "",
  businessUnit: "",
  preparedBy: "",
  reviewDate: "",

  /* 2. Aging Summary */
  totalReceivables: "",
  currentBucket: "",
  bucket31to60: "",
  bucket61to90: "",
  over90: "",

  /* 3. Aging Details */
  agingItems: [
    { clientInvoice:"", invoiceDate:"", amount:"", agingBucket:"", actionRequired:"", dynamicFields:{} }
  ],

  /* 4. Observations */
  keyObservations: "",
  highRiskAccounts: "",
  collectionChallenges: "",

  /* 5. Action Plan */
  actionItems: [
    { actionItem:"", owner:"", targetDate:"", status:"", remarks:"", dynamicFields:{} }
  ],

  /* 6. Sign-off */
  approvalRoles: [
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02588_InvoiceAgingReview = () => {

  const { isPrintMode } = usePrintMode();

  const [agingColumns, setAgingColumns] = useState([]);
  const [actionColumns, setActionColumns] = useState([]);

  const addColumn = (type) => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");

    if(type==="aging"){
      if(agingColumns.find(c=>c.key===key)) return alert("Column exists");
      setAgingColumns([...agingColumns,{key,label:name}]);
    } else {
      if(actionColumns.find(c=>c.key===key)) return alert("Column exists");
      setActionColumns([...actionColumns,{key,label:name}]);
    }
  };

  const calculateTotals = (values,setFieldValue)=>{
    const total = values.agingItems.reduce(
      (sum,row)=> sum + Number(row.amount || 0),0
    );
    setFieldValue("totalReceivables", total.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02588" title="Invoice Aging Review">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Invoice Aging Review Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateTotals(values,setFieldValue);
        },[values.agingItems]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02588"
            title="FRM-02588 — Invoice Aging Review"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"reviewReferenceNo","Review Reference No")}
              {field(values,"reviewPeriod","Review Period")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"reviewDate","Review Date","date")}
            </div>
          </div>

          {/* 2. Aging Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Aging Summary</h3>
            <div className="form-fields">
              {field(values,"totalReceivables","Total Receivables")}
              {field(values,"currentBucket","Current (0–30 days)")}
              {field(values,"bucket31to60","31–60 days")}
              {field(values,"bucket61to90","61–90 days")}
              {field(values,"over90","Over 90 days")}
            </div>
          </div>

          {/* 3. Aging Details */}
          <div className="form-section">
            <h3 className="form-section-title">Invoice Aging Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={()=>addColumn("aging")}>+ Add Column</button>
                <button type="button" className="btn-submit" style={{marginLeft:10}}
                  onClick={()=>setFieldValue("agingItems",[
                    ...values.agingItems,
                    {clientInvoice:"",invoiceDate:"",amount:"",agingBucket:"",actionRequired:"",dynamicFields:{}}
                  ])}>
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="agingItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Client/Invoice</th>
                    <th>Invoice Date</th>
                    <th>Amount</th>
                    <th>Aging Bucket</th>
                    <th>Action Required</th>
                    {agingColumns.map(col=><th key={col.key}>{col.label}</th>)}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.agingItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`agingItems.${index}.clientInvoice`} className="form-input"/></td>
                      <td><Field type="date" name={`agingItems.${index}.invoiceDate`} className="form-input"/></td>
                      <td><Field type="number" name={`agingItems.${index}.amount`} className="form-input"/></td>
                      <td><Field name={`agingItems.${index}.agingBucket`} className="form-input"/></td>
                      <td><Field name={`agingItems.${index}.actionRequired`} className="form-input"/></td>
                      {agingColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`agingItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                        </td>
                      ))}
                      {!isPrintMode &&
                        <td>
                          <button type="button" onClick={()=>remove(index)}>Remove</button>
                        </td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </FieldArray>
          </div>

          {/* 4. Observations */}
          <div className="form-section">
            <h3 className="form-section-title">Observations & Risks</h3>
            <div className="form-fields">
              {field(values,"keyObservations","Key Observations")}
              {field(values,"highRiskAccounts","High-Risk Accounts")}
              {field(values,"collectionChallenges","Collection Challenges")}
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
                      {!isPrintMode &&
                        <td>
                          <button type="button" onClick={()=>remove(index)}>Remove</button>
                        </td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </FieldArray>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 6. Sign-off */}
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
                      <button type="button" onClick={()=>remove(index)}>Remove</button>}
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
                Submit Invoice Aging Review
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

export default FRM02588_InvoiceAgingReview;