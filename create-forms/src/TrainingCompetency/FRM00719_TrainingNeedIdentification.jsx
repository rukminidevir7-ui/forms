// FRM00725_TrainingNeedIdentification.jsx
// TRAINING NEED IDENTIFICATION – MASTER FORM

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  requestDate: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestedBy: Yup.string().required("Required"),
  trainingType: Yup.string().required("Required"),
  trainingCategory: Yup.string().required("Required"),
  trainingMode: Yup.string().required("Required"),
  reason: Yup.string().required("Required"),
  problemStatement: Yup.string().required("Required"),
  expectedOutcome: Yup.string().required("Required"),
  numberOfEmployees: Yup.string().required("Required")
});

const initialValues = {
  formId: "Auto Generated",
  requestDate: "",
  department: "",
  plantLocation: "",
  requestedBy: "",
  employeeId: "",
  designation: "",
  contactNumber: "",
  email: "",

  trainingType: "",
  trainingCategory: "",
  trainingMode: "",
  reason: "",
  otherReason: "",
  problemStatement: "",
  expectedOutcome: "",
  targetParticipants: "",
  numberOfEmployees: "",
  proposedTimeline: "",
  estimatedBudget: "",

  businessImpact: "",
  complianceReference: "",
  sopReference: "",

  hodSignature: {},
  hrSignature: {},
  managementSignature: {},
  status: "",
  approvalRemarks: "",

  scheduledDate: "",
  trainerAssigned: "",
  finalBudget: "",
  erpCode: "",
  documentControlNo: "",
  revisionNo: "",

  attachments: [],
  customFields: []
};

const FRM00725_TrainingNeedIdentification = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00725"
      title="Training Need Identification Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Training Need Identification Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00725"
              title="TRAINING NEED IDENTIFICATION FORM"
              department="Training & Competency"
              process="Training Operations"
            >

              {/* SECTION 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 1: Basic Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"plantLocation","Plant Location")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"employeeId","Employee ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"contactNumber","Contact Number")}
                  {field(values,"email","Email","email")}
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 2: Training Requirement Details</h3>
                <div className="form-fields">

                  {field(values,"trainingType","Type of Training")}
                  {field(values,"trainingCategory","Training Category")}
                  {field(values,"trainingMode","Training Mode")}
                  {field(values,"reason","Reason for Training")}
                  {field(values,"otherReason","Other (Specify)")}
                  
                  <Field as="textarea" name="problemStatement" 
                    placeholder="Problem Statement" 
                    className="form-textarea" rows="3" />

                  <Field as="textarea" name="expectedOutcome" 
                    placeholder="Expected Learning Outcome" 
                    className="form-textarea" rows="3" />

                  {field(values,"targetParticipants","Target Participants")}
                  {field(values,"numberOfEmployees","Number of Employees")}
                  {field(values,"proposedTimeline","Proposed Timeline")}
                  {field(values,"estimatedBudget","Estimated Budget")}
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 3: Risk & Justification</h3>
                <div className="form-fields">
                  <Field as="textarea" name="businessImpact" 
                    placeholder="Business Impact if Training Not Conducted" 
                    className="form-textarea" rows="3" />

                  {field(values,"complianceReference","Compliance Reference")}
                  {field(values,"sopReference","Related SOP / Policy Reference")}
                </div>
              </div>

              {/* SECTION 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 4: Approval Section</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reviewed By (HOD)"
                      value={values.hodSignature}
                      onChange={(val) => setFieldValue("hodSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR / Training Manager"
                      value={values.hrSignature}
                      onChange={(val) => setFieldValue("hrSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Management Approval"
                      value={values.managementSignature}
                      onChange={(val) => setFieldValue("managementSignature", val)}
                    />
                  </div>
                </div>

                {field(values,"status","Status (Approved / Rejected / On Hold)")}

                <Field as="textarea"
                  name="approvalRemarks"
                  placeholder="Approval Remarks"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* SECTION 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 5: Final Record</h3>
                <div className="form-fields">
                  {field(values,"scheduledDate","Training Scheduled Date","date")}
                  {field(values,"trainerAssigned","Trainer Assigned")}
                  {field(values,"finalBudget","Final Approved Budget")}
                  {field(values,"erpCode","ERP Training Code")}
                  {field(values,"documentControlNo","Document Control No")}
                  {field(values,"revisionNo","Revision No")}
                </div>

                <div style={{ marginTop: 30 }}>
                  <div className="print-value">
                    Controlled Copy Stamp Area
                  </div>
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Training Need Identification
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00725_TrainingNeedIdentification;
