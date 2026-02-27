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
  interviewRoundsCompleted: Yup.string().required('Interview Rounds Completed is required'),
  overallRating: Yup.string().required('Overall Rating is required'),
  finalDecision: Yup.string().required('Final Decision is required'),
  approvedBy: Yup.string().required('Approved By is required'),
  decisionDate: Yup.string().required('Decision Date is required'),
  recruitmentStatus: Yup.string().required('Recruitment Status is required'),
  hrRemarks: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  interviewRefNo: '',
  candidateName: '',
  positionJobTitle: '',
  interviewRoundsCompleted: '',
  overallRating: '',
  finalDecision: '',
  approvedBy: '',
  decisionDate: '',
  recruitmentStatus: '',
  hrRemarks: '',
  customFields: [],
  signatures: {
    approver: { type: '', data: '', name: '' }
  }
};

const FRM00616 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00616" title="Interview Feedback – Report / Record" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">📄 Final Record Fields</h3>
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
            <label className="form-label required">Interview Rounds Completed</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewRoundsCompleted || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewRoundsCompleted" className="form-input" placeholder="e.g., HR, Technical, Final" />
                <ErrorMessage name="interviewRoundsCompleted" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Overall Rating</label>
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
            <label className="form-label required">Final Decision</label>
            {isPrintMode ? (
              <div className="print-value">{values.finalDecision || '___________________'}</div>
            ) : (
              <>
                <Field name="finalDecision" as="select" className="form-input">
                  <option value="">-- Select Decision --</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </Field>
                <ErrorMessage name="finalDecision" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Approved By</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="approvedBy" className="form-input" placeholder="Enter approver name" />
                <ErrorMessage name="approvedBy" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Decision Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.decisionDate || '___________________'}</div>
            ) : (
              <>
                <Field name="decisionDate" type="date" className="form-input" />
                <ErrorMessage name="decisionDate" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Recruitment Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.recruitmentStatus || '___________________'}</div>
            ) : (
              <>
                <Field name="recruitmentStatus" as="select" className="form-input">
                  <option value="">-- Select Status --</option>
                  <option value="Offer Released">Offer Released</option>
                  <option value="In Process">In Process</option>
                  <option value="Closed">Closed</option>
                </Field>
                <ErrorMessage name="recruitmentStatus" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label">HR Remarks</label>
            {isPrintMode ? (
              <div className="print-value">{values.hrRemarks || '___________________'}</div>
            ) : (
              <>
                <Field name="hrRemarks" as="textarea" className="form-textarea" placeholder="Add HR remarks" rows="2" />
                <ErrorMessage name="hrRemarks" component="div" className="form-error" />
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
        <h3 className="form-section-title">✍️ Record Approval</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Approver" onChange={(sig) => setFieldValue('signatures.approver', sig)} value={values.signatures.approver} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">Approver</div>
              <div className="sig-space">
                {values.signatures.approver?.data && <img src={values.signatures.approver.data} alt="Signature" className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.approver?.name && `Name: ${values.signatures.approver.name}`}</div>
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
    <ModernFormWrapper formId="FRM-00616" title="Interview Feedback – Report / Record">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00616;