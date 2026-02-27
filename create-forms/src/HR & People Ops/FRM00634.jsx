import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  candidateName: Yup.string().required('Candidate Name is required'),
  applicationID: Yup.string().required('Application ID is required'),
  position: Yup.string().required('Position is required'),
  interviewStage: Yup.string().required('Interview Stage is required'),
  reason: Yup.string().required('Reason for Rejection is required'),
  rejectionCategory: Yup.string().required('Rejection Category is required'),
  communicationMode: Yup.string().required('Communication Mode is required'),
  requestedBy: Yup.string().required('Requested By is required'),
  requestDate: Yup.string().required('Request Date is required')
  ,
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateName: '',
  applicationID: '',
  position: '',
  interviewStage: '',
  reason: '',
  rejectionCategory: '',
  communicationMode: '',
  requestedBy: '',
  requestDate: '',
  customFields: [],
  attachments: { feedbackForm: null, assessmentReport: null },
  signatures: { requestedBy: { type: '', data: '', name: '' } }
};

const FRM00634 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00634" title="Candidate Rejection Communication – Request" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Candidate Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Candidate Name</label>
              {isPrintMode ? <div className="print-value">{values.candidateName || '___________________'}</div> : (
                <>
                  <Field name="candidateName" type="text" className="form-input" placeholder="Enter candidate name" />
                  <ErrorMessage name="candidateName" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Application ID</label>
              {isPrintMode ? <div className="print-value">{values.applicationID || '___________________'}</div> : (
                <>
                  <Field name="applicationID" type="text" className="form-input" placeholder="Enter application ID" />
                  <ErrorMessage name="applicationID" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Rejection Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Position Applied For</label>
              {isPrintMode ? <div className="print-value">{values.position || '___________________'}</div> : (
                <>
                  <Field name="position" type="text" className="form-input" placeholder="Position" />
                  <ErrorMessage name="position" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Interview Stage</label>
              {isPrintMode ? <div className="print-value">{values.interviewStage || '___________________'}</div> : (
                <>
                  <Field name="interviewStage" type="text" className="form-input" placeholder="e.g., Technical / HR" />
                  <ErrorMessage name="interviewStage" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Reason for Rejection</label>
            {isPrintMode ? <div className="print-value">{values.reason || '___________________'}</div> : (
              <>
                <Field name="reason" as="textarea" className="form-input" rows="3" placeholder="Enter reason" />
                <ErrorMessage name="reason" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Rejection Category</label>
              {isPrintMode ? <div className="print-value">{values.rejectionCategory || '___________________'}</div> : (
                <>
                  <Field name="rejectionCategory" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Skill Gap">Skill Gap</option>
                    <option value="Cultural Fit">Cultural Fit</option>
                    <option value="Budget">Budget</option>
                    <option value="Position Closed">Position Closed</option>
                  </Field>
                  <ErrorMessage name="rejectionCategory" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>

            <div className="form-field">
              <label className="form-label required">Communication Mode</label>
              {isPrintMode ? <div className="print-value">{values.communicationMode || '___________________'}</div> : (
                <>
                  <Field name="communicationMode" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Email">Email</option>
                    <option value="Portal">Portal</option>
                  </Field>
                  <ErrorMessage name="communicationMode" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Attachments</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label">Interview Feedback Form</label>
            {isPrintMode ? <div className="print-value">{values.attachments.feedbackForm ? 'Attached' : 'Not attached'}</div> : (
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => setFieldValue('attachments.feedbackForm', e.currentTarget.files[0])} />
            )}
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Assessment Report</label>
            {isPrintMode ? <div className="print-value">{values.attachments.assessmentReport ? 'Attached' : 'Not attached'}</div> : (
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFieldValue('attachments.assessmentReport', e.currentTarget.files[0])} />
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Request Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Requested By</label>
              {isPrintMode ? <div className="print-value">{values.requestedBy || '___________________'}</div> : (
                <>
                  <Field name="requestedBy" type="text" className="form-input" />
                  <ErrorMessage name="requestedBy" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Request Date</label>
              {isPrintMode ? <div className="print-value">{values.requestDate || '___________________'}</div> : (
                <>
                  <Field name="requestDate" type="date" className="form-input" />
                  <ErrorMessage name="requestDate" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
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
                  <button type="button" className="btn-add-field" onClick={() => push({ id: Math.random().toString(36).slice(2), fieldName: '', fieldValue: '' })}>➕ Add Field</button>
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

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Signature</h3>
          <div className="form-fields">
            <SignatureComponent label="Requested By Signature" onChange={(data) => setFieldValue('signatures.requestedBy.data', data)} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.requestedBy.name" type="text" className="form-input" placeholder="Enter name" />
            </div>
          </div>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00634', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (
          <Form>
            {renderFormContent(values, setFieldValue)}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00634;
