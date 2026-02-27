// FRM00585_SecurityAwarenessQuiz.jsx
// FRM-00585 / FRM-00586 – Security Awareness Quiz Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  companyName: Yup.string().required('Required'),
  quizId: Yup.string().required('Required'),
  quizDate: Yup.string().required('Required'),

  targetAudience: Yup.string().required('Required'),
  departmentUnit: Yup.string().required('Required'),
  deliveryMode: Yup.string().required('Required'),
  frequency: Yup.string().required('Required'),

  topicsCovered: Yup.string().required('Required'),
  policyReferences: Yup.string().required('Required'),
  totalQuestions: Yup.number().required('Required'),
  passingCriteria: Yup.string().required('Required'),

  totalParticipants: Yup.number().required('Required'),
  passed: Yup.number().required('Required'),
  failed: Yup.number().required('Required'),
  averageScore: Yup.string().required('Required'),

  keyObservations: Yup.string().required('Required'),
  improvementActions: Yup.string().required('Required'),
  nextQuizDate: Yup.string().required('Required'),

  trainingRequirement: Yup.string().required('Required'),
  auditReference: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  preparedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  infoSecSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  quizId: '',
  quizDate: '',

  targetAudience: '',
  departmentUnit: '',
  deliveryMode: '',
  frequency: '',

  topicsCovered: '',
  policyReferences: '',
  totalQuestions: '',
  passingCriteria: '',

  totalParticipants: '',
  passed: '',
  failed: '',
  averageScore: '',

  keyObservations: '',
  improvementActions: '',
  nextQuizDate: '',

  trainingRequirement: '',
  auditReference: '',
  status: '',
  remarks: '',

  preparedBySignature: {},
  managerSignature: {},
  infoSecSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00585_SecurityAwarenessQuiz = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const selectField = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">Select</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
            <option value="Others">Others</option>
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="4" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00585" title="Security Awareness Quiz – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Security Awareness Quiz submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00585"
              title="SECURITY AWARENESS QUIZ – REQUEST & APPROVAL FORM"
              department="Information Security – Security Operations"
            >

              {/* 1. Quiz Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Quiz Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'quizId','Quiz ID')}
                  {field(values,'quizDate','Quiz Date','date')}
                </div>
              </div>

              {/* 2. Quiz Scope */}
              <div className="form-section">
                <h3 className="form-section-title">2. Quiz Scope</h3>
                <div className="form-fields">
                  {field(values,'targetAudience','Target Audience')}
                  {field(values,'departmentUnit','Department / Business Unit')}

                  {selectField(values,'deliveryMode','Delivery Mode',
                    ['Online','Classroom','Hybrid'])}

                  {selectField(values,'frequency','Frequency',
                    ['One-Time','Quarterly','Bi-Annual','Annual'])}
                </div>
              </div>

              {/* 3. Content Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Content Details</h3>
                <div className="form-fields">
                  {textarea(values,'topicsCovered','Topics Covered')}
                  {field(values,'policyReferences','Policy References')}
                  {field(values,'totalQuestions','Total Questions','number')}
                  {field(values,'passingCriteria','Passing Criteria')}
                </div>
              </div>

              {/* 4. Results Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Results Summary</h3>
                <div className="form-fields">
                  {field(values,'totalParticipants','Total Participants','number')}
                  {field(values,'passed','Passed','number')}
                  {field(values,'failed','Failed','number')}
                  {field(values,'averageScore','Average Score (%)')}
                </div>
              </div>

              {/* 5. Observations & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">5. Observations & Actions</h3>
                <div className="form-fields">
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'improvementActions','Improvement Actions')}
                  {field(values,'nextQuizDate','Next Quiz Date','date')}
                </div>
              </div>

              {/* 6. Compliance & Governance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Compliance & Governance</h3>
                <div className="form-fields">
                  {field(values,'trainingRequirement','Training Requirement')}

                  {selectField(values,'auditReference','Audit Reference',
                    ['ISO 27001','SOC 2','Internal Audit','Regulatory','None'])}

                  {selectField(values,'status','Status',
                    ['Planned','Completed','Action Required','Closed'])}

                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Prepared By"
                      value={values.preparedBySignature || {}}
                      onChange={(val) => setFieldValue("preparedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Manager Approval"
                      value={values.managerSignature || {}}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Information Security Approval"
                      value={values.infoSecSignature || {}}
                      onChange={(val) => setFieldValue("infoSecSignature", val)}
                    />
                  </div>
                </div>

                {/* Custom Signatures */}
                <div style={{ marginTop: 30 }}>
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 20 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: 30, position: "relative" }}>
                            {!isPrintMode && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  background: "red",
                                  color: "#fff",
                                  border: "none",
                                  padding: "5px 10px",
                                  cursor: "pointer"
                                }}
                              >
                                Remove
                              </button>
                            )}

                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Security Awareness Quiz
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

export default FRM00585_SecurityAwarenessQuiz;
