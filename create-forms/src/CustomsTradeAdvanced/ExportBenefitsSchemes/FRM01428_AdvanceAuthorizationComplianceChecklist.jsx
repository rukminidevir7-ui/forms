// FRM01428_AdvanceAuthorizationComplianceChecklist.jsx
// Advance Authorization Compliance Checklist – Universal
// Enterprise Grade – Customs & Trade (Advanced) – Export Benefits & Schemes

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  checklistReferenceNo: Yup.string().required("Required"),
  authorizationNo: Yup.string().required("Required"),
  exporterName: Yup.string().required("Required"),
  complianceStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01428",
  department: "Export Benefits & Schemes",

  checklistReferenceNo: "",
  date: "",
  authorizationNo: "",
  authorizationDate: "",
  exporterName: "",
  iec: "",

  checklistItems: [
    { item: "Authorization validity checked", status: "", remarks: "", dynamicFields:{} },
    { item: "Input-output norms verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Import quantities within limits", status: "", remarks: "", dynamicFields:{} },
    { item: "Export obligation period reviewed", status: "", remarks: "", dynamicFields:{} },
    { item: "Export performance verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Shipping bills linked to authorization", status: "", remarks: "", dynamicFields:{} },
    { item: "Bond / LUT compliance verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Duty exemption conditions complied", status: "", remarks: "", dynamicFields:{} },
    { item: "Documentation complete", status: "", remarks: "", dynamicFields:{} },
    { item: "Redemption application status checked", status: "", remarks: "", dynamicFields:{} },
    { item: "Internal compliance review completed", status: "", remarks: "", dynamicFields:{} }
  ],

  complianceStatus: "",
  keyObservations: "",
  riskLevel: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} }
  ],
  approvalDate: "",
  signature: ""
};

/* ================= COMPONENT ================= */

const FRM01428_AdvanceAuthorizationComplianceChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01428" title="Advance Authorization Compliance Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Advance Authorization Compliance Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01428"
            title="Advance Authorization Compliance Checklist"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Authorization Details */}
          <div className="form-section">
            <h3 className="form-section-title">Authorization Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Checklist Reference No</label>
                <Field name="checklistReferenceNo" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Date</label>
                <Field name="date" type="date" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Authorization No</label>
                <Field name="authorizationNo" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Authorization Date</label>
                <Field name="authorizationDate" type="date" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Exporter Name</label>
                <Field name="exporterName" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">IEC</label>
                <Field name="iec" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance Checklist</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("checklistItems",[
                    ...values.checklistItems,
                    {item:"New Checklist Item",status:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="checklistItems">
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
                  {values.checklistItems.map((row,index)=>(
                    <tr key={index}>
                      <td>
                        <Field name={`checklistItems.${index}.item`} className="form-input"/>
                      </td>
                      <td>
                        <Field as="select" name={`checklistItems.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>NA</option>
                        </Field>
                      </td>
                      <td>
                        <Field name={`checklistItems.${index}.remarks`} className="form-input"/>
                      </td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`checklistItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* Assessment Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Assessment Summary</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Compliance Status</label>
                <Field as="select" name="complianceStatus" className="form-input">
                  <option value="">Select</option>
                  <option>Compliant</option>
                  <option>Non-Compliant</option>
                  <option>Conditional / Clarification Required</option>
                </Field>
              </div>

              <div className="form-field">
                <label className="form-label">Risk Level</label>
                <Field name="riskLevel" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Key Observations</label>
                <Field as="textarea" name="keyObservations" className="form-input"/>
              </div>

            </div>
          </div>

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

            <div className="form-field">
              <label className="form-label">Approval Date</label>
              <Field name="approvalDate" type="date" className="form-input"/>
            </div>

            <div className="form-field">
              <label className="form-label">Signature</label>
              <Field name="signature" className="form-input"/>
            </div>

          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Compliance Checklist
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

export default FRM01428_AdvanceAuthorizationComplianceChecklist;