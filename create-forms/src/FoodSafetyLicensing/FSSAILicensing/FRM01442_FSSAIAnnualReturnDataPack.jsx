// FRM01442_FSSAIAnnualReturnDataPack.jsx
// FSSAI Annual Return Data Form – Universal
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
  financialYear: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01442",
  department: "FSSAI Licensing",

  /* Organization Details */
  companyName: "",
  businessUnitLocation: "",
  address: "",

  /* License Details */
  fssaiLicenseNumber: "",
  licenseCategory: "",
  validityPeriod: "",

  /* Return Period */
  financialYear: "",
  returnSubmissionDate: "",

  /* Operational Data */
  productsManufactured: "",
  productionQuantity: "",
  salesQuantity: "",
  importExportDetails: "",

  /* Compliance Details */
  inspectionsDuringYear: "",
  nonComplianceIncidents: "",
  correctiveActions: "",

  reviewComments: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01442_FSSAIAnnualReturnDataPack = () => {

  const { isPrintMode } = usePrintMode();

  return(
    <ModernFormWrapper formId="FRM-01442" title="FSSAI Annual Return Data Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSSAI Annual Return Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01442"
            title="FRM-01442 — FSSAI Annual Return Data Form"
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

              <div className="form-field">
                <label className="form-label">Validity Period</label>
                <Field name="validityPeriod" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Return Period */}
          <div className="form-section">
            <h3 className="form-section-title">Return Period</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Financial Year</label>
                <Field name="financialYear" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Return Submission Date</label>
                <Field name="returnSubmissionDate" type="date" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Operational Data */}
          <div className="form-section">
            <h3 className="form-section-title">Operational Data</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Products Manufactured / Handled</label>
                <Field as="textarea" name="productsManufactured" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Production Quantity</label>
                <Field name="productionQuantity" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Sales Quantity</label>
                <Field name="salesQuantity" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Import / Export Details</label>
                <Field as="textarea" name="importExportDetails" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Compliance Details */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Inspections During Year</label>
                <Field as="textarea" name="inspectionsDuringYear" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Non-Compliance Incidents</label>
                <Field as="textarea" name="nonComplianceIncidents" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Corrective Actions</label>
                <Field as="textarea" name="correctiveActions" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Documents */}
          <div className="form-section">
            {/* <h3 className="form-section-title">Documents</h3> */}
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
                Submit Annual Return
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

export default FRM01442_FSSAIAnnualReturnDataPack;