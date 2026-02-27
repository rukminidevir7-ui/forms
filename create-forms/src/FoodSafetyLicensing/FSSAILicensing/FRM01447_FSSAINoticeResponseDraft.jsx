// FRM01447_FSSAINoticeResponseDraft.jsx
// FSSAI Notice Response Form – Universal
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
  noticeReferenceNumber: Yup.string().required("Required"),
  noticeDate: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  responseSummary: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01447",
  department: "FSSAI Licensing",

  /* Reference Details */
  noticeReferenceNumber: "",
  noticeDate: "",
  responseDueDate: "",

  /* Organization Details */
  companyName: "",
  locationFacility: "",
  fssaiLicenseNumber: "",

  /* Authority Details */
  issuingAuthority: "",
  jurisdictionState: "",

  /* Notice Summary */
  subjectOfNotice: "",
  summaryOfAllegation: "",

  /* Response Details */
  responseSummary: "",
  correctiveActionsProposed: "",
  supportingExplanation: "",

  /* Compliance Actions */
  immediateActionsTaken: "",
  preventiveMeasures: "",

  reviewComments: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01447_FSSAINoticeResponseDraft = () => {

  const { isPrintMode } = usePrintMode();

  return(
    <ModernFormWrapper formId="FRM-01447" title="FSSAI Notice Response Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FSSAI Notice Response Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01447"
            title="FRM-01447 — FSSAI Notice Response Form"
            department="Food Safety Licensing | FSSAI Licensing"
          >

          {/* Reference Details */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Notice Reference Number</label>
                <Field name="noticeReferenceNumber" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Notice Date</label>
                <Field name="noticeDate" type="date" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Response Due Date</label>
                <Field name="responseDueDate" type="date" className="form-input"/>
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

          {/* Authority Details */}
          <div className="form-section">
            <h3 className="form-section-title">Authority Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Issuing Authority</label>
                <Field name="issuingAuthority" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Jurisdiction / State</label>
                <Field name="jurisdictionState" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Notice Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Notice Summary</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Subject of Notice</label>
                <Field name="subjectOfNotice" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Summary of Allegation / Observation</label>
                <Field as="textarea" name="summaryOfAllegation" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Response Details */}
          <div className="form-section">
            <h3 className="form-section-title">Response Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Response Summary</label>
                <Field as="textarea" name="responseSummary" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Corrective Actions Proposed</label>
                <Field as="textarea" name="correctiveActionsProposed" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Supporting Explanation</label>
                <Field as="textarea" name="supportingExplanation" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Compliance Actions */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance Actions</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Immediate Actions Taken</label>
                <Field as="textarea" name="immediateActionsTaken" className="form-input"/>
              </div>

              <div className="form-field">
                <label className="form-label">Preventive Measures</label>
                <Field as="textarea" name="preventiveMeasures" className="form-input"/>
              </div>

            </div>
          </div>

          {/* Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
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
                Submit Notice Response
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

export default FRM01447_FSSAINoticeResponseDraft;