// FRM01444_FSSAINonComplianceIncident.jsx
// FSSAI Non-Compliance Incident – Universal
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
  incidentDate: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  typeOfNonCompliance: Yup.string().required("Required"),
  descriptionOfIncident: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01444",
  department: "FSSAI Licensing",

  /* Reference Details */
  formNumber: "",
  incidentDate: "",
  departmentName: "",

  /* Organization Details */
  companyName: "",
  locationFacility: "",
  fssaiLicenseNumber: "",

  /* Incident Details */
  typeOfNonCompliance: "",
  descriptionOfIncident: "",
  dateDetected: "",
  reportedBy: "",

  /* Impact Assessment */
  foodSafetyImpact: "",
  productsAffected: "",
  riskLevel: "",

  /* Corrective Action */
  immediateActionTaken: "",
  rootCause: "",
  preventiveActionPlan: "",

  /* Regulatory Reference */
  applicableRegulation: "",

  reviewObservations: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01444_FSSAINonComplianceIncident = () => {

  const { isPrintMode } = usePrintMode();

  return(
    <ModernFormWrapper formId="FRM-01444" title="FSSAI Non-Compliance Incident Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Non-Compliance Incident Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01444"
            title="FRM-01444 — FSSAI Non-Compliance Incident Form"
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
                <label className="form-label">Incident Date</label>
                <Field name="incidentDate" type="date" className="form-input"/>
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
                <label className="form-label">Location / Facility</label>
                <Field name="locationFacility" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">FSSAI License Number</label>
                <Field name="fssaiLicenseNumber" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Incident Details */}
          <div className="form-section">
            <h3 className="form-section-title">Incident Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Type of Non-Compliance</label>
                <Field name="typeOfNonCompliance" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Description of Incident</label>
                <Field as="textarea" name="descriptionOfIncident" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Date Detected</label>
                <Field name="dateDetected" type="date" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Reported By</label>
                <Field name="reportedBy" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Impact Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Impact Assessment</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Food Safety Impact</label>
                <Field as="textarea" name="foodSafetyImpact" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Products Affected</label>
                <Field name="productsAffected" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Risk Level</label>
                <Field name="riskLevel" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Corrective Action */}
          <div className="form-section">
            <h3 className="form-section-title">Corrective Action</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Immediate Action Taken</label>
                <Field as="textarea" name="immediateActionTaken" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Root Cause</label>
                <Field as="textarea" name="rootCause" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Preventive Action Plan</label>
                <Field as="textarea" name="preventiveActionPlan" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Regulatory Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Regulatory Reference</h3>
            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Applicable Regulation</label>
                <Field name="applicableRegulation" className="form-input"/>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="form-section">
            <h3 className="form-section-title">Documents</h3>
            <FormAttachments values={values}/>
          </div>

          {/* Review Observations */}
          <div className="form-section">
            <h3 className="form-section-title">Review Observations / Notes</h3>
            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Observations</label>
                <Field as="textarea" name="reviewObservations" className="form-input"/>
              </div>
            </div>
          </div>

          <FormCustomFields values={values}/>

          {/* Approval Workflow */}
          <div className="form-section">
            <h3 className="form-section-title">Approval Workflow</h3>
            <div className="three-column-signatures">
              {values.approvalRoles.map((role,index)=>(
                <ApprovalSignatureBlock
                  key={index}
                  roleName={role.roleName}
                  value={role.data}
                  allowRoleEdit={!isPrintMode}
                  onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                  onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                />
              ))}
            </div>
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Incident Report
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

export default FRM01444_FSSAINonComplianceIncident;