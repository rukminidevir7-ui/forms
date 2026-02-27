// FRM01427_ExportRefundApplicationChecklist.jsx
// Export Refund Application Checklist – Universal
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
  exporterName: Yup.string().required("Required"),
  refundType: Yup.string().required("Required"),
  overallStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01427",
  department: "Export Benefits & Schemes",

  checklistReferenceNo: "",
  date: "",
  exporterName: "",
  iec: "",
  refundType: "",

  checklistItems: [
    { item: "Refund application form completed", status: "", remarks: "", dynamicFields:{} },
    { item: "Shipping bill details verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Invoice details verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Export proceeds realization confirmed", status: "", remarks: "", dynamicFields:{} },
    { item: "Refund eligibility confirmed", status: "", remarks: "", dynamicFields:{} },
    { item: "Bank account details verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Tax payment proof available", status: "", remarks: "", dynamicFields:{} },
    { item: "Supporting documents attached", status: "", remarks: "", dynamicFields:{} },
    { item: "Declaration signed", status: "", remarks: "", dynamicFields:{} },
    { item: "Internal review completed", status: "", remarks: "", dynamicFields:{} }
  ],

  overallStatus: "",
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

const FRM01427_ExportRefundApplicationChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01427" title="Export Refund Application Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Refund Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01427"
            title="Export Refund Application Checklist"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Basic Information */}
          <div className="form-section">
            <h3 className="form-section-title">Basic Information</h3>
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
                <label className="form-label">Exporter Name</label>
                <Field name="exporterName" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">IEC</label>
                <Field name="iec" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Refund Type</label>
                <Field as="select" name="refundType" className="form-input">
                  <option value="">Select</option>
                  <option>GST</option>
                  <option>Duty</option>
                  <option>Other</option>
                </Field>
              </div>

            </div>
          </div>

          {/* Checklist Table */}
          <div className="form-section">
            <h3 className="form-section-title">Checklist Items</h3>

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
                <label className="form-label">Overall Status</label>
                <Field as="select" name="overallStatus" className="form-input">
                  <option value="">Select</option>
                  <option>Eligible for Refund</option>
                  <option>Not Eligible</option>
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
                Submit Refund Checklist
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

export default FRM01427_ExportRefundApplicationChecklist;