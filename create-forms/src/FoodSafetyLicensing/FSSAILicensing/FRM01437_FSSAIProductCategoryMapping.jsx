// FRM01437_FSSAIProductCategoryMapping.jsx
// FSSAI Product Category Mapping – Universal
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
  formNumber: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  productName: Yup.string().required("Required"),
  proposedCategory: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01437",
  department: "FSSAI Licensing",

  /* Reference Details */
  formNumber: "",
  requestDate: "",
  departmentName: "",

  /* Organization Details */
  companyName: "",
  businessUnitLocation: "",
  address: "",

  /* License Details */
  fssaiLicenseNumber: "",
  licenseCategory: "",

  /* Product Mapping Details */
  productName: "",
  productDescription: "",
  proposedCategory: "",
  existingCategory: "",
  justificationNotes: "",

  /* Regulatory Reference */
  applicableRegulations: "",
  regulatoryAuthority: "",

  /* Document Checklist */
  documentChecklist: [
    { item: "Product Specification Sheet", status: "", remarks: "", dynamicFields:{} },
    { item: "Label / Artwork", status: "", remarks: "", dynamicFields:{} },
    { item: "Test Reports", status: "", remarks: "", dynamicFields:{} }
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

const FRM01437_FSSAIProductCategoryMapping = () => {

  const { isPrintMode } = usePrintMode();

  return(
    <ModernFormWrapper formId="FRM-01437" title="FSSAI Product Category Mapping">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSSAI Product Category Mapping Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01437"
            title="FRM-01437 — FSSAI Product Category Mapping"
            department="Food Safety Licensing | FSSAI Licensing"
          >

          {/* Reference Details */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Form Number</label>
                <Field name="formNumber" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Request Date</label>
                <Field name="requestDate" type="date" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Department</label>
                <Field name="departmentName" className="form-input"/>
              </div>

            </div>
          </div>

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

          {/* Product Mapping Details */}
          <div className="form-section">
            <h3 className="form-section-title">Product Mapping Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Product Name</label>
                <Field name="productName" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Product Description</label>
                <Field as="textarea" name="productDescription" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Proposed FSSAI Category</label>
                <Field name="proposedCategory" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Existing Category (if any)</label>
                <Field name="existingCategory" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Justification / Notes</label>
                <Field as="textarea" name="justificationNotes" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Regulatory Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Regulatory Reference</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Applicable Regulations</label>
                <Field name="applicableRegulations" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Authority / State</label>
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

          {/* Approval Workflow */}
          <div className="form-section">
            <h3 className="form-section-title">Approval Workflow</h3>

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
                Submit Product Category Mapping
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

export default FRM01437_FSSAIProductCategoryMapping;