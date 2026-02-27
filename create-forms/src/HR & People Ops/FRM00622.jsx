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
  candidateFullName: Yup.string().required('Candidate Full Name is required'),
  candidateIDApplicationID: Yup.string().required('Candidate ID / Application ID is required'),
  positionAppliedFor: Yup.string().required('Position Applied For is required'),
  department: Yup.string().required('Department is required'),
  referencePersonName: Yup.string().required('Reference Person Name is required'),
  referenceOrganization: Yup.string().required('Reference Organization is required'),
  referenceFeedbackSummary: Yup.string().required('Reference Feedback Summary is required'),
  referenceRating: Yup.string().required('Reference Rating is required'),
  referenceCheckStatus: Yup.string().required('Reference Check Status is required'),
  checkedBy: Yup.string().required('Checked By is required'),
  referenceCheckCompletionDate: Yup.string().required('Reference Check Completion Date is required'),
  finalRecommendation: Yup.string().required('Final Recommendation is required'),
  recordCreatedDate: Yup.string().required('Record Created Date is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateFullName: '',
  candidateIDApplicationID: '',
  positionAppliedFor: '',
  department: '',
  referencePersonName: '',
  referenceOrganization: '',
  referenceFeedbackSummary: '',
  referenceRating: '',
  referenceCheckStatus: '',
  checkedBy: '',
  referenceCheckCompletionDate: '',
  finalRecommendation: '',
  recordCreatedDate: '',
  customFields: [],
  signatures: {
    checker: { type: '', data: '', name: '' }
  }
};

const FRM00622 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00622" title="Reference Check – Report / Record Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">👤 Candidate Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Candidate Full Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateFullName || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateFullName" className="form-input" placeholder="Enter candidate name" />
                <ErrorMessage name="candidateFullName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Candidate ID / Application ID</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateIDApplicationID || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateIDApplicationID" className="form-input" placeholder="Enter candidate/application ID" />
                <ErrorMessage name="candidateIDApplicationID" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Position Applied For</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionAppliedFor || '___________________'}</div>
            ) : (
              <>
                <Field name="positionAppliedFor" className="form-input" placeholder="Enter position" />
                <ErrorMessage name="positionAppliedFor" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Department</label>
            {isPrintMode ? (
              <div className="print-value">{values.department || '___________________'}</div>
            ) : (
              <>
                <Field name="department" className="form-input" placeholder="e.g., IT, HR, Finance" />
                <ErrorMessage name="department" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">👥 Reference Feedback</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Reference Person Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.referencePersonName || '___________________'}</div>
            ) : (
              <>
                <Field name="referencePersonName" className="form-input" placeholder="Enter reference person name" />
                <ErrorMessage name="referencePersonName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Organization</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceOrganization || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceOrganization" className="form-input" placeholder="Enter organization name" />
                <ErrorMessage name="referenceOrganization" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Reference Feedback Summary</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceFeedbackSummary || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceFeedbackSummary" as="textarea" className="form-textarea" placeholder="Summarize the feedback provided by the reference" rows="4" />
                <ErrorMessage name="referenceFeedbackSummary" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Rating</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceRating || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceRating" as="select" className="form-input">
                  <option value="">-- Select Rating --</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                </Field>
                <ErrorMessage name="referenceRating" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Check Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceCheckStatus || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceCheckStatus" as="select" className="form-input">
                  <option value="">-- Select Status --</option>
                  <option value="Clear">Clear</option>
                  <option value="Concern">Concern</option>
                  <option value="Not Clear">Not Clear</option>
                </Field>
                <ErrorMessage name="referenceCheckStatus" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">📋 Verification Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Checked By (HR Name)</label>
            {isPrintMode ? (
              <div className="print-value">{values.checkedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="checkedBy" className="form-input" placeholder="Enter HR name" />
                <ErrorMessage name="checkedBy" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Check Completion Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceCheckCompletionDate || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceCheckCompletionDate" type="date" className="form-input" />
                <ErrorMessage name="referenceCheckCompletionDate" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Final Recommendation</label>
            {isPrintMode ? (
              <div className="print-value">{values.finalRecommendation || '___________________'}</div>
            ) : (
              <>
                <Field name="finalRecommendation" as="select" className="form-input">
                  <option value="">-- Select Recommendation --</option>
                  <option value="Proceed">Proceed</option>
                  <option value="Hold">Hold</option>
                  <option value="Reject">Reject</option>
                </Field>
                <ErrorMessage name="finalRecommendation" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Record Created Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.recordCreatedDate || '___________________'}</div>
            ) : (
              <>
                <Field name="recordCreatedDate" type="date" className="form-input" />
                <ErrorMessage name="recordCreatedDate" component="div" className="form-error" />
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
        <h3 className="form-section-title">✍️ Verification Certification</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="HR Checker" onChange={(sig) => setFieldValue('signatures.checker', sig)} value={values.signatures.checker} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">HR Checker</div>
              <div className="sig-space">
                {values.signatures.checker?.data && <img src={values.signatures.checker.data} alt="Signature" className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.checker?.name && `Name: ${values.signatures.checker.name}`}</div>
            </div>
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
    <ModernFormWrapper formId="FRM-00622" title="Reference Check – Report / Record Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00622;