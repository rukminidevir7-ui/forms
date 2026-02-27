// FRM02594_RevenueAssuranceRegisterUpdate.jsx
// FRM-02594 – Revenue Assurance Register Update
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
  registerReferenceNo: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  updateDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02594",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Register Context */
  registerReferenceNo: "",
  businessUnit: "",
  registerOwner: "",
  updateDate: "",
  periodCovered: "",

  /* 2. Register Update Details */
  registerEntries: [
    {
      entryId: "",
      category: "",
      description: "",
      impact: "",
      status: "",
      owner: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Summary */
  totalEntriesUpdated: "",
  keyChanges: "",
  overallStatus: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02594_RevenueAssuranceRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g, "");
    if (dynamicColumns.find(c => c.key === key)) {
      alert("Column already exists");
      return;
    }
    setDynamicColumns([...dynamicColumns, { key, label: name }]);
  };

  const calculateTotalEntries = (values, setFieldValue) => {
    const count = values.registerEntries.length;
    setFieldValue("totalEntriesUpdated", count);
  };

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02594" title="Revenue Assurance Register Update">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Revenue Assurance Register Updated Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateTotalEntries(values,setFieldValue);
        },[values.registerEntries]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02594"
            title="FRM-02594 — Revenue Assurance Register Update"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Register Context */}
          <div className="form-section">
            <h3 className="form-section-title">Register Context</h3>
            <div className="form-fields">
              {field(values,"registerReferenceNo","Register Reference No")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"registerOwner","Register Owner")}
              {field(values,"updateDate","Update Date","date")}
              {field(values,"periodCovered","Period Covered")}
            </div>
          </div>

          {/* 2. Register Update Details */}
          <div className="form-section">
            <h3 className="form-section-title">Register Update Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("registerEntries",[
                    ...values.registerEntries,
                    {
                      entryId:"",
                      category:"",
                      description:"",
                      impact:"",
                      status:"",
                      owner:"",
                      remarks:"",
                      dynamicFields:{}
                    }
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="registerEntries">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Entry ID</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Impact</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.registerEntries.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`registerEntries.${index}.entryId`} className="form-input"/></td>
                      <td><Field name={`registerEntries.${index}.category`} className="form-input"/></td>
                      <td><Field name={`registerEntries.${index}.description`} className="form-input"/></td>
                      <td><Field name={`registerEntries.${index}.impact`} className="form-input"/></td>
                      <td>
                        <Field as="select" name={`registerEntries.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Open</option>
                          <option>In Progress</option>
                          <option>Closed</option>
                        </Field>
                      </td>
                      <td><Field name={`registerEntries.${index}.owner`} className="form-input"/></td>
                      <td><Field name={`registerEntries.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`registerEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 3. Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Summary</h3>
            <div className="form-fields">
              {field(values,"totalEntriesUpdated","Total Entries Updated")}
              {field(values,"keyChanges","Key Changes")}
              {field(values,"overallStatus","Overall Status")}
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
                Submit Register Update
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

export default FRM02594_RevenueAssuranceRegisterUpdate;