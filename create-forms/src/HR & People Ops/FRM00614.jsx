import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  interviewRefNo: Yup.string().required('Interview Reference No. is required'),
  candidateName: Yup.string().required('Candidate Name is required'),
  positionJobTitle: Yup.string().required('Position / Job Title is required'),
  interviewDate: Yup.string().required('Interview Date is required'),
  interviewerName: Yup.string().required('Interviewer Name is required'),
  interviewRound: Yup.string().required('Interview Round is required'),
  keySkillsAssessed: Yup.string().required('Key Skills Assessed is required'),
  overallRating: Yup.string().required('Overall Interview Rating is required'),
  interviewerRecommendation: Yup.string().required('Interviewer Recommendation is required'),
  interviewerComments: Yup.string().required('Interviewer Comments is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  interviewRefNo: '',
  candidateName: '',
  positionJobTitle: '',
  interviewDate: '',
  interviewerName: '',
  interviewRound: '',
  keySkillsAssessed: '',
  overallRating: '',
  interviewerRecommendation: '',
  interviewerComments: '',
  customFields: [],
  signatures: {
    interviewer: { type: '', data: '', name: '' },
    panelMember: { type: '', data: '', name: '' }
  }
};

const FRM00614 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00614" title="Interview Feedback – Request/Initiation Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">📋 Interview Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Interview Reference No.</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewRefNo || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewRefNo" className="form-input" placeholder="e.g., INT-001-2024" />
                <ErrorMessage name="interviewRefNo" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Candidate Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateName || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateName" className="form-input" placeholder="Enter candidate name" />
                <ErrorMessage name="candidateName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Position / Job Title</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionJobTitle || '___________________'}</div>
            ) : (
              <>
                <Field name="positionJobTitle" className="form-input" placeholder="Enter position" />
                <ErrorMessage name="positionJobTitle" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Interview Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewDate || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewDate" type="date" className="form-input" />
                <ErrorMessage name="interviewDate" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Interviewer Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewerName || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewerName" className="form-input" placeholder="Enter interviewer name" />
                <ErrorMessage name="interviewerName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Interview Round</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewRound || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewRound" as="select" className="form-input">
                  <option value="">-- Select Round --</option>
                  <option value="HR">HR</option>
                  <option value="Technical">Technical</option>
                  <option value="Managerial">Managerial</option>
                  <option value="Final">Final</option>
                </Field>
                <ErrorMessage name="interviewRound" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Key Skills Assessed</label>
            {isPrintMode ? (
              <div className="print-value">{values.keySkillsAssessed || '___________________'}</div>
            ) : (
              <>
                <Field name="keySkillsAssessed" as="textarea" className="form-textarea" placeholder="List skills assessed" rows="2" />
                <ErrorMessage name="keySkillsAssessed" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Overall Interview Rating</label>
            {isPrintMode ? (
              <div className="print-value">{values.overallRating || '___________________'}</div>
            ) : (
              <>
                <Field name="overallRating" as="select" className="form-input">
                  <option value="">-- Select Rating --</option>
                  <option value="1 - Poor">1 - Poor</option>
                  <option value="2 - Fair">2 - Fair</option>
                  <option value="3 - Good">3 - Good</option>
                  <option value="4 - Very Good">4 - Very Good</option>
                  <option value="5 - Excellent">5 - Excellent</option>
                </Field>
                <ErrorMessage name="overallRating" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Interviewer Recommendation</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewerRecommendation || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewerRecommendation" as="select" className="form-input">
                  <option value="">-- Select Recommendation --</option>
                  <option value="Proceed">Proceed</option>
                  <option value="Hold">Hold</option>
                  <option value="Reject">Reject</option>
                </Field>
                <ErrorMessage name="interviewerRecommendation" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Interviewer Comments</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewerComments || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewerComments" as="textarea" className="form-textarea" placeholder="Add comments" rows="2" />
                <ErrorMessage name="interviewerComments" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Custom Fields</h3>
          <FieldArray name="customFields">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { customFields } = values;
              return (
                <div>
                  {customFields.map((field, index) => (
                    <div key={field.id || index} className="custom-field-row">
                      <div className="form-field">
                        <Field name={`customFields.${index}.fieldName`} className="form-input" placeholder="Field Name" />
                      </div>
                      <div className="form-field" style={{ flex: 2 }}>
                        <Field name={`customFields.${index}.fieldValue`} className="form-input" placeholder="Field Value" />
                      </div>
                      <button type="button" className="btn-remove" onClick={() => remove(index)}>✕ Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-add-field" onClick={() => push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>➕ Add Field</button>
                </div>
              );
            }}
          </FieldArray>
        </div>
      )}

      {isPrintMode && values.customFields && values.customFields.length > 0 && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Fields</h3>
          <div className="form-fields">
            {values.customFields.map((field, index) => (
              <div key={index} className="form-field full-width custom-field-print">
                <strong>{field.fieldName}:</strong> {field.fieldValue || '___________________'}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Digital Signatures & Approvals</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Interviewer" onChange={(sig) => setFieldValue('signatures.interviewer', sig)} value={values.signatures.interviewer} />
            <SignatureComponent name="Panel Member" onChange={(sig) => setFieldValue('signatures.panelMember', sig)} value={values.signatures.panelMember} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            {['interviewer', 'panelMember'].map((role) => (
              <div key={role} className="print-signature-box">
                <div className="sig-name">{role === 'interviewer' ? 'Interviewer' : 'Panel Member'}</div>
                <div className="sig-space">
                  {values.signatures[role]?.data && <img src={values.signatures[role].data} alt={`Signature - ${role}`} className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
                </div>
                <div className="sig-line"></div>
                <div className="sig-date">{values.signatures[role]?.name && `Name: ${values.signatures[role].name}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isPrintMode && (
        <div className="form-actions">
          <button type="submit" className="btn-submit">💾 Save Form</button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00614" title="Interview Feedback – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00614;