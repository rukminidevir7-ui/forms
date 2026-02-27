// FRM01441_FSSAIDisplayNoticeChecklist.jsx
// FSSAI Display & Notice Checklist – Universal
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
  locationFacility: Yup.string().required("Required"),
  fssaiLicenseNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01441",
  department: "FSSAI Licensing",

  /* General Details */
  companyName: "",
  locationFacility: "",
  fssaiLicenseNumber: "",

  /* Mandatory Displays */
  mandatoryDisplays: [
    { item: "FSSAI License displayed prominently", status: "", remarks: "", dynamicFields:{} },
    { item: "Food Safety Display Board", status: "", remarks: "", dynamicFields:{} },
    { item: "Hygiene rating (if applicable)", status: "", remarks: "", dynamicFields:{} },
    { item: "No Smoking notice", status: "", remarks: "", dynamicFields:{} },
    { item: "Handwash instructions", status: "", remarks: "", dynamicFields:{} }
  ],

  /* Consumer Information */
  consumerInformation: [
    { item: "Customer grievance contact displayed", status: "", remarks: "", dynamicFields:{} },
    { item: "Price list displayed", status: "", remarks: "", dynamicFields:{} },
    { item: "Product information labels visible", status: "", remarks: "", dynamicFields:{} }
  ],

  /* Compliance Notices */
  complianceNotices: [
    { item: "Allergen information", status: "", remarks: "", dynamicFields:{} },
    { item: "Storage instructions", status: "", remarks: "", dynamicFields:{} },
    { item: "Emergency contacts", status: "", remarks: "", dynamicFields:{} }
  ],

  nonComplianceNotes: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01441_FSSAIDisplayNoticeChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const renderChecklist = (name, title, values, setFieldValue) => (
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
                    <option>Needs Improvement</option>
                    <option>Non-Compliant</option>
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
    <ModernFormWrapper formId="FRM-01441" title="FSSAI Display & Notice Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Display & Notice Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01441"
            title="FRM-01441 — FSSAI Display & Notice Checklist"
            department="Food Safety Licensing | FSSAI Licensing"
          >

          {/* General Details */}
          <div className="form-section">
            <h3 className="form-section-title">General Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Company / Establishment Name</label>
                <Field name="companyName" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Location / Facility</label>
                <Field name="locationFacility" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">FSSAI License Number</label>
                <Field name="fssaiLicenseNumber" className="form-input"/>
              </div>

            </div>
          </div>

          {renderChecklist("mandatoryDisplays","Mandatory Displays",values,setFieldValue)}
          {renderChecklist("consumerInformation","Consumer Information",values,setFieldValue)}
          {renderChecklist("complianceNotices","Compliance Notices",values,setFieldValue)}

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* Observations */}
          <div className="form-section">
            <h3 className="form-section-title">Observations</h3>
            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Non-Compliance Notes</label>
                <Field as="textarea" name="nonComplianceNotes" className="form-input"/>
              </div>
            </div>
          </div>

          {/* Sign-Off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-Off</h3>
            <FieldArray name="approvalRoles">
            {()=>(
              <div className="three-column-signatures">
                {values.approvalRoles.map((role,index)=>(
                  <div key={index}>
                    <ApprovalSignatureBlock
                      roleName={role.roleName}
                      value={role.data}
                      allowRoleEdit={!isPrintMode}
                      onRoleNameChange={()=>{}}
                      onChange={()=>{}}
                    />
                  </div>
                ))}
              </div>
            )}
            </FieldArray>
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Checklist
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

export default FRM01441_FSSAIDisplayNoticeChecklist;