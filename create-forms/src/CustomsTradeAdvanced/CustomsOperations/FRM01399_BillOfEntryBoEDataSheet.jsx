// FRM01399_BillOfEntryDataSheet.jsx
// FRM-01399 – Bill of Entry (BoE) Data Sheet
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
  importerName: Yup.string().required("Required"),
  iecNumber: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
  boeNumber: Yup.string().required("Required"),
  boeDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01399",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Importer Details */
  importerName: "",
  iecNumber: "",
  gstin: "",
  address: "",
  contactPerson: "",

  /* 2. Shipment Details */
  boeNumber: "",
  boeDate: "",
  portOfImport: "",
  countryOfOrigin: "",
  supplierName: "",
  invoiceNumber: "",
  invoiceDate: "",

  /* 3. Goods Details */
  goodsItems: [
    { itemDescription:"", hsnCode:"", quantity:"", value:"", duty:"", dynamicFields:{} }
  ],

  /* 4. Duty & Valuation Summary */
  assessableValue: "",
  totalDuty: "",
  additionalCharges: "",
  totalPayable: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01399_BillOfEntryDataSheet = () => {

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
    <ModernFormWrapper formId="FRM-01399" title="Bill of Entry (BoE) Data Sheet">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("BoE Data Sheet Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01399"
            title="FRM-01399 — Bill of Entry (BoE) Data Sheet"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Importer Details */}
          <div className="form-section">
            <h3 className="form-section-title">Importer Details</h3>
            <div className="form-fields">
              {field(values,"importerName","Importer Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}
              {field(values,"address","Address","text",true)}
              {field(values,"contactPerson","Contact Person")}
            </div>
          </div>

          {/* 2. Shipment Details */}
          <div className="form-section">
            <h3 className="form-section-title">Shipment Details</h3>
            <div className="form-fields">
              {field(values,"boeNumber","BoE Number")}
              {field(values,"boeDate","BoE Date","date")}
              {field(values,"portOfImport","Port of Import")}
              {field(values,"countryOfOrigin","Country of Origin")}
              {field(values,"supplierName","Supplier Name")}
              {field(values,"invoiceNumber","Invoice Number")}
              {field(values,"invoiceDate","Invoice Date","date")}
            </div>
          </div>

          {/* 3. Goods Details */}
          <div className="form-section">
            <h3 className="form-section-title">Goods Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("goodsItems",[
                    ...values.goodsItems,
                    {itemDescription:"",hsnCode:"",quantity:"",value:"",duty:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="goodsItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>HSN Code</th>
                    <th>Quantity</th>
                    <th>Value</th>
                    <th>Duty</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.goodsItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`goodsItems.${index}.itemDescription`} className="form-input"/></td>
                      <td><Field name={`goodsItems.${index}.hsnCode`} className="form-input"/></td>
                      <td><Field name={`goodsItems.${index}.quantity`} className="form-input"/></td>
                      <td><Field name={`goodsItems.${index}.value`} className="form-input"/></td>
                      <td><Field name={`goodsItems.${index}.duty`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`goodsItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 4. Duty & Valuation Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Duty & Valuation Summary</h3>
            <div className="form-fields">
              {field(values,"assessableValue","Assessable Value")}
              {field(values,"totalDuty","Total Duty")}
              {field(values,"additionalCharges","Additional Charges")}
              {field(values,"totalPayable","Total Payable")}
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
                Submit BoE Data Sheet
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

export default FRM01399_BillOfEntryDataSheet;