// FRM01448_FSSAILicenseRegisterUpdate.jsx
// FSSAI License Register Update Log – Universal
// Enterprise Grade – Food Safety Licensing – FSSAI Licensing

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import FormAttachments from "../../components/FormAttachments";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  registerOwner: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01448",
  department: "FSSAI Licensing",

  companyName: "",
  businessUnitLocation: "",
  registerOwner: "",
  lastUpdatedDate: "",

  licenseRegister: [
    {
      licenseNo: "",
      location: "",
      category: "",
      issueDate: "",
      expiryDate: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01448_FSSAILicenseRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  return(
    <ModernFormWrapper formId="FRM-01448" title="FSSAI License Register Update Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("License Register Updated Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01448"
            title="FRM-01448 — FSSAI License Register Update Log"
            department="Food Safety Licensing | FSSAI Licensing"
          >

          {/* Header Details */}
          <div className="form-section">
            <h3 className="form-section-title">Register Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Company Name</label>
                <Field name="companyName" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Business Unit / Location</label>
                <Field name="businessUnitLocation" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Register Owner</label>
                <Field name="registerOwner" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Last Updated Date</label>
                <Field name="lastUpdatedDate" type="date" className="form-input"/>
              </div>

            </div>
          </div>

          {/* License Register Table */}
          <div className="form-section">
            <h3 className="form-section-title">License Register Entries</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>

                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("licenseRegister",[
                    ...values.licenseRegister,
                    {
                      licenseNo:"",
                      location:"",
                      category:"",
                      issueDate:"",
                      expiryDate:"",
                      status:"",
                      remarks:"",
                      dynamicFields:{}
                    }
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="licenseRegister">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>License No</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Issue Date</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.licenseRegister.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`licenseRegister.${index}.licenseNo`} className="form-input"/></td>
                      <td><Field name={`licenseRegister.${index}.location`} className="form-input"/></td>
                      <td><Field name={`licenseRegister.${index}.category`} className="form-input"/></td>
                      <td><Field type="date" name={`licenseRegister.${index}.issueDate`} className="form-input"/></td>
                      <td><Field type="date" name={`licenseRegister.${index}.expiryDate`} className="form-input"/></td>
                      <td>
                        <Field as="select" name={`licenseRegister.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Active</option>
                          <option>Expired</option>
                          <option>Suspended</option>
                          <option>Cancelled</option>
                        </Field>
                      </td>
                      <td><Field name={`licenseRegister.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`licenseRegister.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval</h3>
            <div className="three-column-signatures">
              {values.approvalRoles.map((role,index)=>(
                <ApprovalSignatureBlock
                  key={index}
                  roleName={role.roleName}
                  value={role.data}
                  allowRoleEdit={!isPrintMode}
                  onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                  onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                />
              ))}
            </div>
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
      )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01448_FSSAILicenseRegisterUpdate;