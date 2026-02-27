// FRM01420_RODTEPClaimDataPack.jsx
// RODTEP Claim Data Form – Universal
// Enterprise Grade – Customs & Trade (Advanced) – Export Benefits & Schemes

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
  formReferenceNo: Yup.string().required("Required"),
  claimId: Yup.string().required("Required"),
  exporterName: Yup.string().required("Required"),
  shippingBillNo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01420",
  department: "Export Benefits & Schemes",

  formReferenceNo: "",
  claimId: "",
  date: "",
  preparedBy: "",

  /* Exporter Details */
  exporterName: "",
  iec: "",
  gstin: "",
  address: "",

  /* Shipment Details */
  shippingBillNo: "",
  shippingBillDate: "",
  portOfExport: "",
  fobValue: "",
  currency: "",

  /* Claim Line Items */
  claimItems: [
    {
      hsn: "",
      productDescription: "",
      rodtepRate: "",
      claimAmount: "",
      calculationBasis: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* Attachments */
  shippingBillCopy: "",
  invoiceCopy: "",
  packingList: "",
  supportingDocuments: "",

  /* Sign-Off */
  approvalRoles: [
    { roleName: "Verified By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",
  signature: ""
};

/* ================= COMPONENT ================= */

const FRM01420_RODTEPClaimDataPack = () => {

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
    <ModernFormWrapper formId="FRM-01420" title="RODTEP Claim Data Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("RODTEP Claim Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01420"
            title="RODTEP Claim Data Form"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Form Info */}
          <div className="form-section">
            <h3 className="form-section-title">Form Information</h3>
            <div className="form-fields">
              {field(values,"formReferenceNo","Form Reference No")}
              {field(values,"claimId","Claim ID")}
              {field(values,"date","Date","date")}
              {field(values,"preparedBy","Prepared By")}
            </div>
          </div>

          {/* Exporter Details */}
          <div className="form-section">
            <h3 className="form-section-title">Exporter Details</h3>
            <div className="form-fields">
              {field(values,"exporterName","Exporter Name")}
              {field(values,"iec","IEC")}
              {field(values,"gstin","GSTIN")}
              {field(values,"address","Address","text",true)}
            </div>
          </div>

          {/* Shipment Details */}
          <div className="form-section">
            <h3 className="form-section-title">Shipment Details</h3>
            <div className="form-fields">
              {field(values,"shippingBillNo","Shipping Bill No")}
              {field(values,"shippingBillDate","Shipping Bill Date","date")}
              {field(values,"portOfExport","Port of Export")}
              {field(values,"fobValue","FOB Value")}
              {field(values,"currency","Currency")}
            </div>
          </div>

          {/* Claim Details */}
          <div className="form-section">
            <h3 className="form-section-title">Claim Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("claimItems",[
                    ...values.claimItems,
                    {hsn:"",productDescription:"",rodtepRate:"",claimAmount:"",calculationBasis:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="claimItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>HSN</th>
                    <th>Product Description</th>
                    <th>RODTEP Rate</th>
                    <th>Claim Amount</th>
                    <th>Calculation Basis</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.claimItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`claimItems.${index}.hsn`} className="form-input"/></td>
                      <td><Field name={`claimItems.${index}.productDescription`} className="form-input"/></td>
                      <td><Field name={`claimItems.${index}.rodtepRate`} className="form-input"/></td>
                      <td><Field name={`claimItems.${index}.claimAmount`} className="form-input"/></td>
                      <td><Field name={`claimItems.${index}.calculationBasis`} className="form-input"/></td>
                      <td><Field name={`claimItems.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`claimItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
            <div className="form-fields">
              {field(values,"shippingBillCopy","Shipping Bill Copy")}
              {field(values,"invoiceCopy","Invoice")}
              {field(values,"packingList","Packing List")}
              {field(values,"supportingDocuments","Supporting Documents")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* Sign-Off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-Off</h3>

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
            {field(values,"signature","Signature")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit RODTEP Claim
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

export default FRM01420_RODTEPClaimDataPack;