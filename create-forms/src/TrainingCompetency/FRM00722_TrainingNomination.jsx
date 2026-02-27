// FRM00722_TrainingNomination.jsx
// FRM-00722/23/24 – Training Nomination Master Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  nominationDate: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  employeeName: Yup.string().required("Required"),
  employeeId: Yup.string().required("Required"),
  trainingTitle: Yup.string().required("Required"),
  trainingType: Yup.string().required("Required"),
  trainingDates: Yup.string().required("Required")
});

const initialValues = {
  nominationId: "Auto Generated",
  nominationDate: "",
  department: "",
  nominatedBy: "",
  employeeName: "",
  employeeId: "",
  designation: "",
  dateOfJoining: "",
  skillLevel: "",

  trainingTitle: "",
  trainingCode: "",
  trainingProvider: "",
  trainingType: "",
  trainingLocation: "",
  trainingDates: "",
  trainingDuration: "",
  trainingCost: "",
  sponsorshipType: "",

  justification: "",
  gapIdentified: "",
  expectedImprovement: "",

  supervisorSignature: {},
  hrSignature: {},
  financeSignature: {},
  status: "",
  remarks: "",

  attended: "",
  certificateAttached: "",
  assessmentScore: "",
  erpUpdated: "",

  attachments: [],
  customFields: []
};

const FRM00722_TrainingNomination = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type = "text") => (
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
      formId="FRM-00722/23/24"
      title="Training Nomination Master Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Training Nomination Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00722/23/24"
              title="TRAINING NOMINATION FORM"
              department="Training & Competency"
              process="Employee Development"
            >

              {/* SECTION 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 1: Nomination Details</h3>
                <div className="form-fields">
                  {renderField(values,"nominationId","Nomination ID")}
                  {renderField(values,"nominationDate","Nomination Date","date")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"nominatedBy","Nominated By")}
                  {renderField(values,"employeeName","Employee Name")}
                  {renderField(values,"employeeId","Employee ID")}
                  {renderField(values,"designation","Designation")}
                  {renderField(values,"dateOfJoining","Date of Joining","date")}
                  
                  {!isPrintMode ? (
                    <Field as="select" name="skillLevel" className="form-input">
                      <option value="">Current Skill Level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.skillLevel}</div>
                  )}
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 2: Training Details</h3>
                <div className="form-fields">

                  {renderField(values,"trainingTitle","Training Title")}
                  {renderField(values,"trainingCode","Training Code")}
                  {renderField(values,"trainingProvider","Training Provider")}

                  {!isPrintMode ? (
                    <Field as="select" name="trainingType" className="form-input">
                      <option value="">Training Type</option>
                      <option>Internal</option>
                      <option>External</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.trainingType}</div>
                  )}

                  {renderField(values,"trainingLocation","Training Location")}
                  {renderField(values,"trainingDates","Training Dates")}
                  {renderField(values,"trainingDuration","Training Duration")}
                  {renderField(values,"trainingCost","Training Cost")}

                  {!isPrintMode ? (
                    <Field as="select" name="sponsorshipType" className="form-input">
                      <option value="">Sponsorship Type</option>
                      <option>Company</option>
                      <option>Self</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.sponsorshipType}</div>
                  )}
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 3: Justification</h3>

                <Field as="textarea"
                  name="justification"
                  placeholder="Why Nominate This Employee?"
                  className="form-textarea"
                  rows="3"
                />

                <Field as="textarea"
                  name="gapIdentified"
                  placeholder="Gap Identified"
                  className="form-textarea"
                  rows="3"
                />

                <Field as="textarea"
                  name="expectedImprovement"
                  placeholder="Expected Improvement"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* SECTION 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 4: Approval</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Immediate Supervisor Approval"
                      value={values.supervisorSignature}
                      onChange={(val) => setFieldValue("supervisorSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR Approval"
                      value={values.hrSignature}
                      onChange={(val) => setFieldValue("hrSignature", val)}
                    />
                  </div>

                  {values.trainingCost && (
                    <div className="signature-column">
                      <ApprovalSignatureBlock
                        label="Finance Approval"
                        value={values.financeSignature}
                        onChange={(val) => setFieldValue("financeSignature", val)}
                      />
                    </div>
                  )}

                </div>

                {!isPrintMode ? (
                  <Field as="select" name="status" className="form-input">
                    <option value="">Status</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                    <option>On Hold</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.status}</div>
                )}

                <Field as="textarea"
                  name="remarks"
                  placeholder="Remarks"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* SECTION 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Section 5: Completion Record</h3>

                <div className="form-fields">
                  {renderField(values,"attended","Training Attended (Yes/No)")}
                  {renderField(values,"certificateAttached","Certificate Attached (Yes/No)")}
                  {renderField(values,"assessmentScore","Assessment Score")}
                  {renderField(values,"erpUpdated","Record Updated in ERP (Yes/No)")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Training Nomination
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

export default FRM00722_TrainingNomination;
