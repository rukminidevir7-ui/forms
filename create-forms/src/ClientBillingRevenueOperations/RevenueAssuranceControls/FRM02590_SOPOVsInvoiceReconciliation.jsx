// FRM02590_SOPOVsInvoiceReconciliation.jsx
// FRM-02590 – SO/PO vs Invoice Reconciliation
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
  reconciliationReferenceNo: Yup.string().required("Required"),
  period: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  date: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02590",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Reference */
  reconciliationReferenceNo: "",
  period: "",
  businessUnit: "",
  preparedBy: "",
  date: "",

  /* 2. Document Context */
  clientName: "",
  clientCode: "",
  salesOrderNo: "",
  purchaseOrderNo: "",
  invoiceNo: "",
  currency: "",

  /* 3. Reconciliation Details */
  reconciliationItems: [
    { itemLine:"", soAmount:"", poAmount:"", invoiceAmount:"", variance:"", remarks:"", dynamicFields:{} }
  ],

  /* 4. Summary */
  totalSOAmount: "",
  totalPOAmount: "",
  totalInvoiceAmount: "",
  totalVariance: "",
  reconciliationStatus: "",

  /* 5. Observations */
  keyObservations: "",
  rootCauses: "",
  correctiveActions: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02590_SOPOVsInvoiceReconciliation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const calculateTotals = (values,setFieldValue)=>{
    let totalSO = 0, totalPO = 0, totalInv = 0, totalVar = 0;

    values.reconciliationItems.forEach(row=>{
      const so = Number(row.soAmount || 0);
      const po = Number(row.poAmount || 0);
      const inv = Number(row.invoiceAmount || 0);
      const variance = inv - so;

      totalSO += so;
      totalPO += po;
      totalInv += inv;
      totalVar += variance;
    });

    setFieldValue("totalSOAmount", totalSO.toFixed(2));
    setFieldValue("totalPOAmount", totalPO.toFixed(2));
    setFieldValue("totalInvoiceAmount", totalInv.toFixed(2));
    setFieldValue("totalVariance", totalVar.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02590" title="SO/PO vs Invoice Reconciliation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Reconciliation Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateTotals(values,setFieldValue);
        },[values.reconciliationItems]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02590"
            title="FRM-02590 — SO/PO vs Invoice Reconciliation"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"reconciliationReferenceNo","Reconciliation Reference No")}
              {field(values,"period","Period")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"date","Date","date")}
            </div>
          </div>

          {/* 2. Context */}
          <div className="form-section">
            <h3 className="form-section-title">Document Context</h3>
            <div className="form-fields">
              {field(values,"clientName","Client Name")}
              {field(values,"clientCode","Client Code")}
              {field(values,"salesOrderNo","Sales Order No")}
              {field(values,"purchaseOrderNo","Purchase Order No")}
              {field(values,"invoiceNo","Invoice No")}
              {field(values,"currency","Currency")}
            </div>
          </div>

          {/* 3. Reconciliation Details */}
          <div className="form-section">
            <h3 className="form-section-title">Reconciliation Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("reconciliationItems",[
                    ...values.reconciliationItems,
                    {itemLine:"",soAmount:"",poAmount:"",invoiceAmount:"",variance:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="reconciliationItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Item/Line</th>
                    <th>SO Amount</th>
                    <th>PO Amount</th>
                    <th>Invoice Amount</th>
                    <th>Variance</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=><th key={col.key}>{col.label}</th>)}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.reconciliationItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`reconciliationItems.${index}.itemLine`} className="form-input"/></td>
                      <td><Field type="number" name={`reconciliationItems.${index}.soAmount`} className="form-input"/></td>
                      <td><Field type="number" name={`reconciliationItems.${index}.poAmount`} className="form-input"/></td>
                      <td><Field type="number" name={`reconciliationItems.${index}.invoiceAmount`} className="form-input"/></td>
                      <td>
                        {(Number(row.invoiceAmount||0) - Number(row.soAmount||0)).toFixed(2)}
                      </td>
                      <td><Field name={`reconciliationItems.${index}.remarks`} className="form-input"/></td>
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`reconciliationItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 4. Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Summary</h3>
            <div className="form-fields">
              {field(values,"totalSOAmount","Total SO Amount")}
              {field(values,"totalPOAmount","Total PO Amount")}
              {field(values,"totalInvoiceAmount","Total Invoice Amount")}
              {field(values,"totalVariance","Total Variance")}
              {field(values,"reconciliationStatus","Reconciliation Status")}
            </div>
          </div>

          {/* 5. Observations */}
          <div className="form-section">
            <h3 className="form-section-title">Observations</h3>
            <div className="form-fields">
              {field(values,"keyObservations","Key Observations")}
              {field(values,"rootCauses","Root Causes")}
              {field(values,"correctiveActions","Corrective Actions")}
            </div>
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
                Submit Reconciliation
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

export default FRM02590_SOPOVsInvoiceReconciliation;