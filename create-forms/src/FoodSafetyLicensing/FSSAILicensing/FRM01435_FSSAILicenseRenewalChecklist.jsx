// FRM01435_FSSAILicenseRenewalChecklist.jsx
// FSSAI License Renewal Checklist – Universal
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
  fssaiLicenseNumber: Yup.string().required("Required"),
  licenseCategory: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01435",
  department: "FSSAI Licensing",

  companyName: "",
  businessUnitLocation: "",
  address: "",

  fssaiLicenseNumber: "",
  licenseCategory: "",
  validityPeriod: "",

  renewalChecks: [
    { item: "Returns Filed", status: "", remarks: "", dynamicFields:{} },
    { item: "Inspection Compliance", status: "", remarks: "", dynamicFields:{} },
    { item: "Hygiene Compliance", status: "", remarks: "", dynamicFields:{} },
    { item: "Product Approval Status", status: "", remarks: "", dynamicFields:{} }
  ],

  documentChecklist: [
    { item: "Renewal Application Form", status: "", remarks: "", dynamicFields:{} },
    { item: "Previous License Copy", status: "", remarks: "", dynamicFields:{} },
    { item: "Returns Acknowledgements", status: "", remarks: "", dynamicFields:{} },
    { item: "Inspection Reports", status: "", remarks: "", dynamicFields:{} }
  ],

  reviewObservations: "",
  riskLevel: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01435_FSSAILicenseRenewalChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const renderChecklistTable = (name, title, values, setFieldValue) => (
    <div className="form-section">
      <h3 className="form-section-title">{title}</h3>

      {!isPrintMode &&
        <div style={{marginBottom:15}}>
          <button type="button" className="btn-submit" onClick={addColumn}>
            + Add Column
          </button>

          <button
            type="button"
            className="btn-submit"
            style={{marginLeft:10}}
            onClick={()=>setFieldValue(name,[
              ...values[name],
              { item:"New Checklist Item", status:"", remarks:"", dynamicFields:{} }
            ])}
          >
            + Add Row
          </button>
        </div>
      }

      <FieldArray name={name}>
      {({remove})=>(
        <table className="items-table">
          <thead>
            <tr>
              <th>Checklist Item</th>
              <th>Status</th>
              <th>Remarks</th>
              {dynamicColumns.map(col=>(
                <th key={col.key}>{col.label}</th>
              ))}
              {!isPrintMode && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {values[name].map((row,index)=>(
              <tr key={index}>
                <td>
                  <Field name={`${name}.${index}.item`} className="form-input"/>
                </td>
                <td>
                  <Field as="select" name={`${name}.${index}.status`} className="form-input">
                    <option value="">Select</option>
                    <option>Compliant</option>
                    <option>Pending</option>
                    <option>Not Applicable</option>
                  </Field>
                </td>
                <td>
                  <Field name={`${name}.${index}.remarks`} className="form-input"/>
                </td>
                {dynamicColumns.map(col=>(
                  <td key={col.key}>
                    <Field name={`${name}.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
  );

  return(
    <ModernFormWrapper formId="FRM-01435" title="FSSAI License Renewal Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSSAI License Renewal Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01435"
            title="FRM-01435 — FSSAI License Renewal Checklist"
            department="Food Safety Licensing | FSSAI Licensing"
          >

          {/* Organization Details */}
          <div className="form-section">
            <h3 className="form-section-title">Organization Details</h3>
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
                <label className="form-label">Address</label>
                <Field name="address" className="form-input"/>
              </div>

            </div>
          </div>

          {/* License Reference */}
          <div className="form-section">
            <h3 className="form-section-title">License Reference</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">FSSAI License Number</label>
                <Field name="fssaiLicenseNumber" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">License Category</label>
                <Field name="licenseCategory" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Validity Period</label>
                <Field name="validityPeriod" className="form-input"/>
              </div>

            </div>
          </div>

          {renderChecklistTable("renewalChecks","Renewal Compliance Checks",values,setFieldValue)}

          {/* Document Checklist + Attachments */}
          {renderChecklistTable("documentChecklist","Document Verification Checklist",values,setFieldValue)}

          <FormAttachments values={values} />

          {/* Review Observations */}
          <div className="form-section">
            <h3 className="form-section-title">Review Observations / Risks</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Observations</label>
                <Field as="textarea" name="reviewObservations" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Risk Level</label>
                <Field name="riskLevel" className="form-input"/>
              </div>

            </div>
          </div>

          <FormCustomFields values={values}/>

          {/* Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval</h3>

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

          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Renewal Checklist
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

export default FRM01435_FSSAILicenseRenewalChecklist;