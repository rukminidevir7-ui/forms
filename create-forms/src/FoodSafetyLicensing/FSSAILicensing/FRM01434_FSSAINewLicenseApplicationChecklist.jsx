// FRM01434_FSSAINewLicenseApplicationChecklist.jsx
// FSSAI New License Application Checklist – Universal
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
  formIdRef: Yup.string().required("Required"),
  businessName: Yup.string().required("Required"),
  natureOfFoodBusiness: Yup.string().required("Required"),
  eligibilityConfirmed: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01434",
  department: "FSSAI Licensing",

  formIdRef: "",
  businessName: "",
  legalEntityType: "",
  cinLlpin: "",
  pan: "",
  gstin: "",
  registeredAddress: "",
  plantAddress: "",
  stateDistrict: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  applicationDate: "",
  departmentFunction: "",
  industryPurpose: "",
  infrastructurePurpose: "",
  governmentAuthorityRef: "FSSAI",

  natureOfFoodBusiness: "",
  businessCategory: "",
  scaleOfOperations: "",
  installedCapacityTurnover: "",
  numberOfLocations: "",
  productCategories: "",

  documentationChecklist: [
    { item: "Form B completed and signed", status: "", remarks: "", dynamicFields:{} },
    { item: "Blueprint/Layout of processing unit", status: "", remarks: "", dynamicFields:{} },
    { item: "List of Directors/Partners with ID proof", status: "", remarks: "", dynamicFields:{} },
    { item: "Photo ID and address proof of applicant", status: "", remarks: "", dynamicFields:{} },
    { item: "Proof of possession of premises", status: "", remarks: "", dynamicFields:{} },
    { item: "FSMS plan", status: "", remarks: "", dynamicFields:{} },
    { item: "List of equipment and machinery", status: "", remarks: "", dynamicFields:{} },
    { item: "Water analysis report", status: "", remarks: "", dynamicFields:{} },
    { item: "Product list with category", status: "", remarks: "", dynamicFields:{} },
    { item: "Authority letter / Board resolution", status: "", remarks: "", dynamicFields:{} },
    { item: "NOC from municipality/local authority", status: "", remarks: "", dynamicFields:{} },
    { item: "Import Export Code", status: "", remarks: "", dynamicFields:{} },
    { item: "Proof of turnover / CA certificate", status: "", remarks: "", dynamicFields:{} },
    { item: "Declaration form", status: "", remarks: "", dynamicFields:{} }
  ],

  eligibilityConfirmed: "",
  documentationCompleteness: "",
  regulatoryGaps: "",
  riskLevel: "",
  remarksObservations: "",

  applicationNumber: "",
  dateSubmitted: "",
  portalReference: "",
  submissionStatus: "",
  expectedApprovalDate: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01434_FSSAINewLicenseApplicationChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01434" title="FSSAI New License Application Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSSAI New License Application Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01434"
            title="FRM-01434 — FSSAI New License Application Checklist"
            department="Food Safety Licensing | FSSAI Licensing"
          >

          {/* Basic Reference Information */}
          <div className="form-section">
            <h3 className="form-section-title">Basic Reference Information</h3>
            <div className="form-fields">

              {[
                ["formIdRef","Form ID"],
                ["businessName","Business/Applicant Name"],
                ["legalEntityType","Legal Entity Type"],
                ["cinLlpin","CIN / LLPIN"],
                ["pan","PAN"],
                ["gstin","GSTIN"],
                ["registeredAddress","Registered Address"],
                ["plantAddress","Plant/Unit Address"],
                ["stateDistrict","State / District"],
                ["contactName","Contact Person Name"],
                ["contactEmail","Contact Email"],
                ["contactPhone","Contact Phone"],
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}

              <div className="form-field">
                <label className="form-label">Application Date</label>
                <Field name="applicationDate" type="date" className="form-input"/>
              </div>

              {[
                ["departmentFunction","Department / Function"],
                ["industryPurpose","Industry Purpose"],
                ["infrastructurePurpose","Infrastructure Purpose"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}

            </div>
          </div>

          {/* License Requirement */}
          <div className="form-section">
            <h3 className="form-section-title">License Requirement Details</h3>
            <div className="form-fields">
              {[
                ["natureOfFoodBusiness","Nature of Food Business"],
                ["businessCategory","Business Category"],
                ["scaleOfOperations","Scale of Operations"],
                ["installedCapacityTurnover","Installed Capacity / Turnover"],
                ["numberOfLocations","Number of Locations"],
                ["productCategories","Product Categories"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Checklist */}
          <div className="form-section">
            <h3 className="form-section-title">Application Documentation Checklist</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("documentationChecklist",[
                    ...values.documentationChecklist,
                    {item:"New Checklist Item",status:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="documentationChecklist">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Checklist Item</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.documentationChecklist.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`documentationChecklist.${index}.item`} className="form-input"/></td>
                      <td>
                        <Field as="select" name={`documentationChecklist.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Available</option>
                          <option>Pending</option>
                          <option>Not Applicable</option>
                        </Field>
                      </td>
                      <td><Field name={`documentationChecklist.${index}.remarks`} className="form-input"/></td>
                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`documentationChecklist.${index}.dynamicFields.${col.key}`} className="form-input"/>
                        </td>
                      ))}
                      {!isPrintMode && <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </FieldArray>
          </div>

          {/* Compliance & Risk Review */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance & Risk Review</h3>
            <div className="form-fields">
              {[
                ["eligibilityConfirmed","Eligibility Confirmed"],
                ["documentationCompleteness","Documentation Completeness Status"],
                ["regulatoryGaps","Regulatory Gaps Identified"],
                ["riskLevel","Risk Level"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
              <div className="form-field">
                <label className="form-label">Remarks / Observations</label>
                <Field as="textarea" name="remarksObservations" className="form-input"/>
              </div>
            </div>
          </div>

          {/* Submission Tracking */}
          <div className="form-section">
            <h3 className="form-section-title">Submission Tracking</h3>
            <div className="form-fields">
              {[
                ["applicationNumber","Application Number"],
                ["portalReference","Portal Reference"],
                ["submissionStatus","Submission Status"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
              <div className="form-field">
                <label className="form-label">Date Submitted</label>
                <Field name="dateSubmitted" type="date" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Expected Approval Date</label>
                <Field name="expectedApprovalDate" type="date" className="form-input"/>
              </div>
            </div>
          </div>

          <FormCustomFields values={values}/>
          <FormAttachments values={values} />

          {/* Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval & Sign-off</h3>

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
                        {!isPrintMode && <button type="button" onClick={()=>remove(index)}>Remove</button>}
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
                Submit FSSAI Application Checklist
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

export default FRM01434_FSSAINewLicenseApplicationChecklist;