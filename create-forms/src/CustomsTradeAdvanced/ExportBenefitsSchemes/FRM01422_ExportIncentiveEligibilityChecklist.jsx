// FRM01422_ExportIncentiveEligibilityChecklist.jsx
// Export Incentive Eligibility Checklist – Universal
// Enterprise Grade – Customs & Trade (Advanced) – Export Benefits & Schemes

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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
  scheme: Yup.string().required("Required"),
  eligibilityStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01422",
  department: "Export Benefits & Schemes",

  checklistReferenceNo: "",
  date: "",
  exporterName: "",
  iec: "",
  scheme: "",

  checklistItems: [
    { item: "Valid IEC available", status: "", remarks: "", dynamicFields:{} },
    { item: "Exporter registered on relevant portal", status: "", remarks: "", dynamicFields:{} },
    { item: "Shipping bill filed correctly", status: "", remarks: "", dynamicFields:{} },
    { item: "Scheme selected correctly in shipping bill", status: "", remarks: "", dynamicFields:{} },
    { item: "Product eligible under scheme", status: "", remarks: "", dynamicFields:{} },
    { item: "HSN classification validated", status: "", remarks: "", dynamicFields:{} },
    { item: "FOB value correctly declared", status: "", remarks: "", dynamicFields:{} },
    { item: "Export proceeds realization requirement reviewed", status: "", remarks: "", dynamicFields:{} },
    { item: "No disqualification conditions applicable", status: "", remarks: "", dynamicFields:{} },
    { item: "Supporting documents available", status: "", remarks: "", dynamicFields:{} },
    { item: "Previous claims reviewed for duplication", status: "", remarks: "", dynamicFields:{} },
    { item: "Internal compliance check completed", status: "", remarks: "", dynamicFields:{} }
  ],

  eligibilityStatus: "",
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

const FRM01422_ExportIncentiveEligibilityChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01422" title="Export Incentive Eligibility Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Eligibility Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01422"
            title="Export Incentive Eligibility Checklist"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Basic Info */}
          <div className="form-section">
            <h3 className="form-section-title">Basic Information</h3>
            <div className="form-fields">
              <Field name="checklistReferenceNo" className="form-input" placeholder="Checklist Reference No"/>
              <Field name="date" type="date" className="form-input"/>
              <Field name="exporterName" className="form-input" placeholder="Exporter Name"/>
              <Field name="iec" className="form-input" placeholder="IEC"/>
              <Field as="select" name="scheme" className="form-input">
                <option value="">Select Scheme</option>
                <option>RODTEP</option>
                <option>Drawback</option>
                <option>Other</option>
              </Field>
            </div>
          </div>

          {/* Checklist */}
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

          {/* Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Assessment Summary</h3>
            <div className="form-fields">
              <Field as="select" name="eligibilityStatus" className="form-input">
                <option value="">Eligibility Status</option>
                <option>Eligible</option>
                <option>Not Eligible</option>
                <option>Conditional</option>
              </Field>
              <Field name="riskLevel" className="form-input" placeholder="Risk Level"/>
              <Field as="textarea" name="keyObservations" className="form-input" placeholder="Key Observations"/>
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

            <Field name="approvalDate" type="date" className="form-input"/>
            <Field name="signature" className="form-input" placeholder="Signature"/>
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

export default FRM01422_ExportIncentiveEligibilityChecklist;