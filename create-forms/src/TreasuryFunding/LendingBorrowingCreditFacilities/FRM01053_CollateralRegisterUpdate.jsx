// FRM01053_CollateralRegisterUpdate.jsx
// FRM-01053 – Collateral Register Update
// Enterprise Grade – Treasury & Funding – Lending, Borrowing & Credit Facilities

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
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01053",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  currency: "",

  collateralRegister: [
    {
      collateralId: "",
      borrower: "",
      collateralType: "",
      value: "",
      valuationDate: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  updatesMade: "",
  generalRemarks: "",

  approvalRoles: [
    { roleName: "Updated By", data:{} },
    { roleName: "Reviewed By", data:{} }
  ],

  attachments: [],
  customFields: []
};

const FRM01053_CollateralRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN MANAGEMENT ================= */

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }
    setDynamicColumns([...dynamicColumns,{ key, label:name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const calculateSummary = (rows) => {
    const totalItems = rows.length;
    const totalValue = rows.reduce((sum,row)=>sum + (Number(row.value)||0),0);
    return { totalItems, totalValue };
  };

  const field = (values,name,label,type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-01053"
      title="Collateral Register Update"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Collateral Register Updated Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values.collateralRegister);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01053"
                title="COLLATERAL REGISTER UPDATE"
                department="Treasury & Funding – Lending, Borrowing & Credit Facilities"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"referenceNumber","Reference Number")}
                    {field(values,"location","Location")}
                    {field(values,"businessUnit","Business Unit")}
                    {field(values,"currency","Currency")}
                  </div>
                </div>

                {/* COLLATERAL REGISTER TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Collateral Register</h3>

                  {!isPrintMode && (
                    <div style={{marginBottom:15}}>
                      <button type="button" className="btn-submit" onClick={addColumn}>
                        + Add Column
                      </button>

                      <button
                        type="button"
                        className="btn-submit"
                        style={{marginLeft:10}}
                        onClick={()=>setFieldValue("collateralRegister",[
                          ...values.collateralRegister,
                          {
                            collateralId:"",
                            borrower:"",
                            collateralType:"",
                            value:"",
                            valuationDate:"",
                            status:"",
                            remarks:"",
                            dynamicFields:{}
                          }
                        ])}
                      >
                        + Add Collateral Item
                      </button>
                    </div>
                  )}

                  <FieldArray name="collateralRegister">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Collateral ID</th>
                            <th>Borrower</th>
                            <th>Collateral Type</th>
                            <th>Value</th>
                            <th>Valuation Date</th>
                            <th>Status</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode &&
                                  <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                                }
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.collateralRegister.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`collateralRegister.${index}.collateralId`} className="form-input"/></td>
                              <td><Field name={`collateralRegister.${index}.borrower`} className="form-input"/></td>
                              <td><Field name={`collateralRegister.${index}.collateralType`} className="form-input"/></td>
                              <td><Field name={`collateralRegister.${index}.value`} type="number" className="form-input"/></td>
                              <td><Field name={`collateralRegister.${index}.valuationDate`} type="date" className="form-input"/></td>
                              <td><Field name={`collateralRegister.${index}.status`} className="form-input"/></td>
                              <td><Field name={`collateralRegister.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`collateralRegister.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode &&
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              }
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </FieldArray>
                </div>

                {/* UPDATE SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Update Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Collateral Items: {summary.totalItems}</div>
                    <div className="print-value">Total Value: {summary.totalValue}</div>
                    {field(values,"updatesMade","Updates Made")}
                    {field(values,"generalRemarks","Remarks")}
                  </div>
                </div>

                <FormAttachments values={values}/>
                <FormCustomFields values={values}/>

                {/* AUTHORIZATION */}
                <div className="form-section">
                  <h3 className="form-section-title">Authorization</h3>

                  <FieldArray name="approvalRoles">
                    {({ push, remove })=>(
                      <>
                        {!isPrintMode &&
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({ roleName:"New Role", data:{} })}
                          >
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
                                onRoleNameChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.roleName`,val)}
                                onChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.data`,val)}
                              />
                              {!isPrintMode &&
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove Role
                                </button>
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
                      Submit Collateral Register Update
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

export default FRM01053_CollateralRegisterUpdate;