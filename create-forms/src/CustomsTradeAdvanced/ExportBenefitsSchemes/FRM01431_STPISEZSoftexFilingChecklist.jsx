// FRM01431_STPISEZSoftexFilingChecklist.jsx
// STPI / SEZ Softex Filing Checklist – Universal
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
  unitName: Yup.string().required("Required"),
  softexPeriod: Yup.string().required("Required"),
  filingStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01431",
  department: "Export Benefits & Schemes",

  checklistReferenceNo: "",
  date: "",
  unitName: "",
  iecGstin: "",
  location: "",
  softexPeriod: "",

  checklistItems: [
    { item: "Softex form prepared", status: "", remarks: "", dynamicFields:{} },
    { item: "Invoice details verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Export value reconciliation completed", status: "", remarks: "", dynamicFields:{} },
    { item: "Customer contract / agreement available", status: "", remarks: "", dynamicFields:{} },
    { item: "Work completion evidence available", status: "", remarks: "", dynamicFields:{} },
    { item: "Bank realization tracking initiated", status: "", remarks: "", dynamicFields:{} },
    { item: "STPI/SEZ portal data validated", status: "", remarks: "", dynamicFields:{} },
    { item: "Supporting documents attached", status: "", remarks: "", dynamicFields:{} },
    { item: "Internal review completed", status: "", remarks: "", dynamicFields:{} },
    { item: "Submission deadline verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Acknowledgement tracking initiated", status: "", remarks: "", dynamicFields:{} }
  ],

  filingStatus: "",
  keyObservations: "",
  riskLevel: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01431_STPISEZSoftexFilingChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01431" title="STPI / SEZ Softex Filing Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Softex Filing Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01431"
            title="STPI / SEZ Softex Filing Checklist"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Filing Details */}
          <div className="form-section">
            <h3 className="form-section-title">Filing Details</h3>
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
                <label className="form-label">Unit Name</label>
                <Field name="unitName" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">IEC / GSTIN</label>
                <Field name="iecGstin" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">STPI / SEZ Location</label>
                <Field name="location" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Softex Period</label>
                <Field name="softexPeriod" className="form-input"/>
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
                <label className="form-label">Filing Status</label>
                <Field as="select" name="filingStatus" className="form-input">
                  <option value="">Select</option>
                  <option>Filed</option>
                  <option>Pending</option>
                  <option>Requires Clarification</option>
                  <option>Delayed</option>
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

          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Softex Filing Checklist
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

export default FRM01431_STPISEZSoftexFilingChecklist;