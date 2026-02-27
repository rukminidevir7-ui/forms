// FRM01433_FSSAILicenseRequirementAssessment.jsx
// FSSAI License Requirement Assessment – Universal
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
  checklistReferenceNo: Yup.string().required("Required"),
  businessName: Yup.string().required("Required"),
  entityType: Yup.string().required("Required"),
  licenseTypeRecommended: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01433",
  department: "FSSAI Licensing",

  checklistReferenceNo: "",
  date: "",
  businessName: "",
  entityType: "",
  gstinPan: "",
  locationState: "",

  checklistItems: [
    { item: "Nature of food business identified", status: "", remarks: "", dynamicFields:{} },
    { item: "Turnover assessed for license category", status: "", remarks: "", dynamicFields:{} },
    { item: "Manufacturing / Processing activity reviewed", status: "", remarks: "", dynamicFields:{} },
    { item: "Storage / Warehouse operations reviewed", status: "", remarks: "", dynamicFields:{} },
    { item: "Import / Export activity assessed", status: "", remarks: "", dynamicFields:{} },
    { item: "Central vs State license applicability determined", status: "", remarks: "", dynamicFields:{} },
    { item: "Multiple locations requirement reviewed", status: "", remarks: "", dynamicFields:{} },
    { item: "Existing license validity checked", status: "", remarks: "", dynamicFields:{} },
    { item: "Supporting documents availability verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Compliance obligations identified", status: "", remarks: "", dynamicFields:{} },
    { item: "Internal assessment completed", status: "", remarks: "", dynamicFields:{} }
  ],

  licenseTypeRecommended: "",
  keyObservations: "",
  riskLevel: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01433_FSSAILicenseRequirementAssessment = () => {

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
    <ModernFormWrapper formId="FRM-01433" title="FSSAI License Requirement Assessment Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSSAI License Requirement Assessment Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01433"
            title="FSSAI License Requirement Assessment Checklist"
            department="Food Safety Licensing | FSSAI Licensing"
          >

          {/* Business Details */}
          <div className="form-section">
            <h3 className="form-section-title">Business Details</h3>
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
                <label className="form-label">Business Name</label>
                <Field name="businessName" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Entity Type</label>
                <Field name="entityType" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">GSTIN / PAN</label>
                <Field name="gstinPan" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Location / State</label>
                <Field name="locationState" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Checklist Table */}
          <div className="form-section">
            <h3 className="form-section-title">Assessment Checklist</h3>

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
                <label className="form-label">License Type Recommended</label>
                <Field name="licenseTypeRecommended" className="form-input"/>
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
          <FormAttachments values={values} />

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
                Submit Assessment
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

export default FRM01433_FSSAILicenseRequirementAssessment;