// FRM01436_FSSAILicenseModificationRequest.jsx
// FSSAI License Modification Request Form – Universal
// Enterprise Grade – Food Safety Licensing – FSSAI Licensing

import React from "react";
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
  modificationType: Yup.string().required("Required"),
  reasonForModification: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01436",
  department: "FSSAI Licensing",

  /* Organization Details */
  companyName: "",
  businessUnitLocation: "",
  address: "",

  /* License Details */
  fssaiLicenseNumber: "",
  licenseCategory: "",

  /* Modification Details */
  modificationType: "",
  reasonForModification: "",
  effectiveDate: "",
  regulatoryAuthority: "",

  /* Documents */
  documentChecklist: [
    { item: "Supporting Documents Attached", status: "", remarks: "", dynamicFields:{} },
    { item: "Previous License Copy", status: "", remarks: "", dynamicFields:{} }
  ],

  reviewComments: "",

  approvalRoles: [
    { roleName: "Requested By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01436_FSSAILicenseModificationRequest = () => {

  const { isPrintMode } = usePrintMode();

  return(
    <ModernFormWrapper formId="FRM-01436" title="FSSAI License Modification Request Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSSAI License Modification Request Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01436"
            title="FRM-01436 — FSSAI License Modification Request Form"
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

          {/* License Details */}
          <div className="form-section">
            <h3 className="form-section-title">License Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">FSSAI License Number</label>
                <Field name="fssaiLicenseNumber" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">License Category</label>
                <Field name="licenseCategory" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Modification Details */}
          <div className="form-section">
            <h3 className="form-section-title">Modification Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Type of Modification</label>
                <Field name="modificationType" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Reason for Modification</label>
                <Field as="textarea" name="reasonForModification" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Effective Date</label>
                <Field name="effectiveDate" type="date" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Regulatory Reference Authority / State</label>
                <Field name="regulatoryAuthority" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Documents */}
          <div className="form-section">
            <h3 className="form-section-title">Documents</h3>

            <FieldArray name="documentChecklist">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Document Item</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.documentChecklist.map((row,index)=>(
                    <tr key={index}>
                      <td>
                        <Field name={`documentChecklist.${index}.item`} className="form-input"/>
                      </td>
                      <td>
                        <Field as="select" name={`documentChecklist.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Attached</option>
                          <option>Pending</option>
                          <option>Not Applicable</option>
                        </Field>
                      </td>
                      <td>
                        <Field name={`documentChecklist.${index}.remarks`} className="form-input"/>
                      </td>
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

            <FormAttachments values={values}/>
          </div>

          {/* Review Comments */}
          <div className="form-section">
            <h3 className="form-section-title">Review Comments / Notes</h3>
            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Comments</label>
                <Field as="textarea" name="reviewComments" className="form-input"/>
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
                Submit Modification Request
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

export default FRM01436_FSSAILicenseModificationRequest;