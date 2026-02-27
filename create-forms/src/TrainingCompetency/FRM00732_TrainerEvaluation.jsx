// FRM00732_TrainerPerformanceEvaluation.jsx
// FRM-00732/33/34 – Trainer Performance Evaluation Master Form

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import "../styles/FRM00611.css";

const validationSchema = Yup.object({
  trainerName: Yup.string().required("Required"),
  qualification: Yup.string().required("Required"),
  trainingConducted: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
});

const initialValues = {
  trainerName: "",
  qualification: "",
  trainerType: "",
  trainingConducted: "",
  date: "",

  subjectKnowledge: "",
  communication: "",
  practicalExamples: "",
  timeManagement: "",
  participantEngagement: "",

  strengths: "",
  improvements: "",
  recommendation: "",

  hrSignature: {},
  managerSignature: {},
  finalRating: "",

  attachments: [],
  customFields: []
};

const FRM00732_TrainerPerformanceEvaluation = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <Field name={name} type={type} className="form-input" />
      }
    </div>
  );

  const renderRating = (values, name, label) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name]}</div>
      ) : (
        <Field as="select" name={name} className="form-input">
          <option value="">Select Rating (1–5)</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </Field>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00732/33/34"
      title="Trainer Performance Evaluation Master Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Trainer Evaluation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00732/33/34"
              title="TRAINER PERFORMANCE EVALUATION FORM"
              department="Training & Competency"
              process="Trainer Performance Review"
            >

              {/* SECTION 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 1: Trainer Details</h3>
                <div className="form-fields">
                  {renderField(values,"trainerName","Trainer Name")}
                  {renderField(values,"qualification","Qualification")}

                  {!isPrintMode ? (
                    <Field as="select" name="trainerType" className="form-input">
                      <option value="">Internal / External</option>
                      <option>Internal</option>
                      <option>External</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.trainerType}</div>
                  )}

                  {renderField(values,"trainingConducted","Training Conducted")}
                  {renderField(values,"date","Date","date")}
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 2: Evaluation (Rating 1–5)</h3>
                <div className="form-fields">
                  {renderRating(values,"subjectKnowledge","Subject Knowledge")}
                  {renderRating(values,"communication","Communication")}
                  {renderRating(values,"practicalExamples","Practical Examples")}
                  {renderRating(values,"timeManagement","Time Management")}
                  {renderRating(values,"participantEngagement","Participant Engagement")}
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 3: Review</h3>

                <Field
                  as="textarea"
                  name="strengths"
                  placeholder="Strengths"
                  className="form-textarea"
                  rows="3"
                />

                <Field
                  as="textarea"
                  name="improvements"
                  placeholder="Areas for Improvement"
                  className="form-textarea"
                  rows="3"
                />

                {!isPrintMode ? (
                  <Field as="select" name="recommendation" className="form-input">
                    <option value="">Recommendation</option>
                    <option>Continue</option>
                    <option>Improve</option>
                    <option>Replace</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.recommendation}</div>
                )}
              </div>

              {/* SECTION 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 4: Approval</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR Approval"
                      value={values.hrSignature}
                      onChange={(val) => setFieldValue("hrSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Training Manager Sign"
                      value={values.managerSignature}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                </div>

                {renderField(values,"finalRating","Final Rating (Overall)")}
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Trainer Evaluation
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

export default FRM00732_TrainerPerformanceEvaluation;
