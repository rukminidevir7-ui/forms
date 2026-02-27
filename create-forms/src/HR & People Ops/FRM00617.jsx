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
  candidateEmailID: Yup.string().email('Invalid email').required('Candidate Email ID is required'),
  candidateMobileNumber: Yup.string().required('Candidate Mobile Number is required'),
  positionAppliedFor: Yup.string().required('Position Applied For is required'),
  department: Yup.string().required('Department is required'),
  typeOfConsent: Yup.string().required('Type of Consent is required'),
  consentDescription: Yup.string().required('Consent Description/Purpose is required'),
  consentGivenDate: Yup.string().required('Consent Given Date is required'),
  recruiterName: Yup.string().required('Recruiter Name is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateFullName: '',
  candidateEmailID: '',
  candidateMobileNumber: '',
  positionAppliedFor: '',
  department: '',
  typeOfConsent: '',
  consentDescription: '',
  consentGivenDate: '',
  recruiterName: '',
  customFields: [],
  signatures: {
    candidate: { type: '', data: '', name: '' }
  }
};

const FRM00617 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00617" title="Candidate Consent – Request / Initiation Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Candidate Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Candidate Full Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateFullName || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateFullName" className="form-input" placeholder="Enter full name" />
                <ErrorMessage name="candidateFullName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Candidate Email ID</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateEmailID || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateEmailID" type="email" className="form-input" placeholder="example@email.com" />
                <ErrorMessage name="candidateEmailID" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Candidate Mobile Number</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateMobileNumber || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateMobileNumber" className="form-input" placeholder="Enter mobile number" />
                <ErrorMessage name="candidateMobileNumber" component="div" className="form-error" />
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
          <div className="form-field">
            <label className="form-label required">Type of Consent</label>
            {isPrintMode ? (
              <div className="print-value">{values.typeOfConsent || '___________________'}</div>
            ) : (
              <>
                <Field name="typeOfConsent" as="select" className="form-input">
                  <option value="">-- Select Type --</option>
                  <option value="Interview">Interview</option>
                  <option value="Background Check">Background Check</option>
                  <option value="Data Usage">Data Usage</option>
                  <option value="All">All</option>
                </Field>
                <ErrorMessage name="typeOfConsent" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Consent Description / Purpose</label>
            {isPrintMode ? (
              <div className="print-value">{values.consentDescription || '___________________'}</div>
            ) : (
              <>
                <Field name="consentDescription" as="textarea" className="form-textarea" placeholder="Describe the purpose of consent" rows="2" />
                <ErrorMessage name="consentDescription" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Consent Given Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.consentGivenDate || '___________________'}</div>
            ) : (
              <>
                <Field name="consentGivenDate" type="date" className="form-input" />
                <ErrorMessage name="consentGivenDate" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Recruiter Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.recruiterName || '___________________'}</div>
            ) : (
              <>
                <Field name="recruiterName" className="form-input" placeholder="Enter recruiter name" />
                <ErrorMessage name="recruiterName" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Additional Custom Fields</h3>
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
                      <button type="button" className="btn-remove" onClick={() => remove(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-add-field" onClick={() => push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>Add Field</button>
                </div>
              );
            }}
          </FieldArray>
        </div>
      )}

      {isPrintMode && values.customFields && values.customFields.length > 0 && (
        <div className="form-section">
          <h3 className="form-section-title">Additional Fields</h3>
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
        <h3 className="form-section-title">✍️ Candidate Signature</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Candidate" onChange={(sig) => setFieldValue('signatures.candidate', sig)} value={values.signatures.candidate} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">Candidate</div>
              <div className="sig-space">
                {values.signatures.candidate?.data && <img src={values.signatures.candidate.data} alt="Signature" className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.candidate?.name && `Name: ${values.signatures.candidate.name}`}</div>
            </div>
          </div>
        )}
      </div>

      {!isPrintMode && (
        <div className="form-actions">
          <button type="submit" className="btn-submit">Save Form</button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00617" title="Candidate Consent – Request / Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00617;