// FRM00726_TrainingFeedbackMaster.jsx
// FRM-00726/27/28 – Training Feedback & Review Master Form

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
  trainingName: Yup.string().required("Required"),
  trainer: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  participantName: Yup.string().required("Required"),
  employeeId: Yup.string().required("Required"),
});

const initialValues = {
  trainingName: "",
  trainer: "",
  date: "",
  department: "",
  participantName: "",
  employeeId: "",

  contentRelevance: "",
  trainerKnowledge: "",
  presentationSkills: "",
  practicalUsefulness: "",
  trainingMaterials: "",
  overallSatisfaction: "",

  learning: "",
  improvement: "",
  recommend: "",

  hrComments: "",
  managerSignature: {},
  actionRequired: "",
  actionPlan: "",

  attachments: [],
  customFields: []
};

const FRM00726_TrainingFeedbackMaster = () => {

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
      formId="FRM-00726/27/28"
      title="Training Feedback & Review Master Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Training Feedback Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00726/27/28"
              title="TRAINING FEEDBACK & REVIEW FORM"
              department="Training & Competency"
              process="Training Evaluation"
            >

              {/* SECTION 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 1: Training Details</h3>
                <div className="form-fields">
                  {renderField(values,"trainingName","Training Name")}
                  {renderField(values,"trainer","Trainer")}
                  {renderField(values,"date","Date","date")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"participantName","Participant Name")}
                  {renderField(values,"employeeId","Employee ID")}
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 2: Feedback Rating (1–5 Scale)</h3>
                <div className="form-fields">
                  {renderRating(values,"contentRelevance","Content Relevance")}
                  {renderRating(values,"trainerKnowledge","Trainer Knowledge")}
                  {renderRating(values,"presentationSkills","Presentation Skills")}
                  {renderRating(values,"practicalUsefulness","Practical Usefulness")}
                  {renderRating(values,"trainingMaterials","Training Materials")}
                  {renderRating(values,"overallSatisfaction","Overall Satisfaction")}
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 3: Open Feedback</h3>

                <Field
                  as="textarea"
                  name="learning"
                  placeholder="What Did You Learn?"
                  className="form-textarea"
                  rows="3"
                />

                <Field
                  as="textarea"
                  name="improvement"
                  placeholder="What Can Be Improved?"
                  className="form-textarea"
                  rows="3"
                />

                {!isPrintMode ? (
                  <Field as="select" name="recommend" className="form-input">
                    <option value="">Would You Recommend?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.recommend}</div>
                )}
              </div>

              {/* SECTION 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 4: Approval & Record</h3>

                <Field
                  as="textarea"
                  name="hrComments"
                  placeholder="HR Review Comments"
                  className="form-textarea"
                  rows="3"
                />

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Training Manager Approval"
                      value={values.managerSignature}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                </div>

                {!isPrintMode ? (
                  <Field as="select" name="actionRequired" className="form-input">
                    <option value="">Action Required?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.actionRequired}</div>
                )}

                <Field
                  as="textarea"
                  name="actionPlan"
                  placeholder="Action Plan"
                  className="form-textarea"
                  rows="3"
                />

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Feedback
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

export default FRM00726_TrainingFeedbackMaster;
