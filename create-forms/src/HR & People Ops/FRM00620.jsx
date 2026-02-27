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
  candidateEmailID: Yup.string().email('Invalid email format').required('Candidate Email ID is required'),
  positionAppliedFor: Yup.string().required('Position Applied For is required'),
  department: Yup.string().required('Department is required'),
  totalYearsOfExperience: Yup.string().required('Total Years of Experience is required'),
  referencePersonName: Yup.string().required('Reference Person Name is required'),
  referencePersonDesignation: Yup.string().required('Reference Person Designation is required'),
  referenceOrganizationName: Yup.string().required('Reference Organization Name is required'),
  referenceContactNumberEmail: Yup.string().required('Reference Contact Number / Email is required'),
  relationshipWithCandidate: Yup.string().required('Relationship with Candidate is required'),
  reasonForReferenceCheck: Yup.string().required('Reason for Reference Check is required'),
  requestedBy: Yup.string().required('Requested By is required'),
  requestDate: Yup.string().required('Request Date is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateFullName: '',
  candidateEmailID: '',
  positionAppliedFor: '',
  department: '',
  totalYearsOfExperience: '',
  referencePersonName: '',
  referencePersonDesignation: '',
  referenceOrganizationName: '',
  referenceContactNumberEmail: '',
  relationshipWithCandidate: '',
  reasonForReferenceCheck: '',
  requestedBy: '',
  requestDate: '',
  customFields: [],
  signatures: {
    recruiter: { type: '', data: '', name: '' }
  }
};

const FRM00620 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00620" title="Reference Check – Request / Initiation Form" department="HR & People Ops">
      
      {/* Candidate Information */}
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
            <label className="form-label required">Candidate Email ID</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateEmailID || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateEmailID" type="email" className="form-input" placeholder="candidate@email.com" />
                <ErrorMessage name="candidateEmailID" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Position Applied For</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionAppliedFor || '___________________'}</div>
            ) : (
              <>
                <Field name="positionAppliedFor" className="form-input" placeholder="e.g., Senior Developer" />
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
            <label className="form-label required">Total Years of Experience</label>
            {isPrintMode ? (
              <div className="print-value">{values.totalYearsOfExperience || '___________________'}</div>
            ) : (
              <>
                <Field name="totalYearsOfExperience" className="form-input" placeholder="e.g., 5 years" />
                <ErrorMessage name="totalYearsOfExperience" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reference Information */}
      <div className="form-section">
        <h3 className="form-section-title">👥 Reference Information</h3>
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
            <label className="form-label required">Reference Person Designation</label>
            {isPrintMode ? (
              <div className="print-value">{values.referencePersonDesignation || '___________________'}</div>
            ) : (
              <>
                <Field name="referencePersonDesignation" className="form-input" placeholder="e.g., Manager, Lead" />
                <ErrorMessage name="referencePersonDesignation" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Organization Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceOrganizationName || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceOrganizationName" className="form-input" placeholder="Enter organization name" />
                <ErrorMessage name="referenceOrganizationName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Contact Number / Email</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceContactNumberEmail || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceContactNumberEmail" className="form-input" placeholder="+91-XXXXX-XXXXX or email@org.com" />
                <ErrorMessage name="referenceContactNumberEmail" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Relationship with Candidate</label>
            {isPrintMode ? (
              <div className="print-value">{values.relationshipWithCandidate || '___________________'}</div>
            ) : (
              <>
                <Field name="relationshipWithCandidate" className="form-input" placeholder="e.g., Former Manager, Colleague" />
                <ErrorMessage name="relationshipWithCandidate" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Request Details */}
      <div className="form-section">
        <h3 className="form-section-title">📋 Request Details</h3>
        <div className="form-fields">
          <div className="form-field full-width">
            <label className="form-label required">Reason for Reference Check</label>
            {isPrintMode ? (
              <div className="print-value">{values.reasonForReferenceCheck || '___________________'}</div>
            ) : (
              <>
                <Field name="reasonForReferenceCheck" as="textarea" className="form-textarea" placeholder="Describe the reason for this reference check" rows="4" />
                <ErrorMessage name="reasonForReferenceCheck" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Requested By (Recruiter / HR Name)</label>
            {isPrintMode ? (
              <div className="print-value">{values.requestedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="requestedBy" className="form-input" placeholder="Enter recruiter/HR name" />
                <ErrorMessage name="requestedBy" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Request Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.requestDate || '___________________'}</div>
            ) : (
              <>
                <Field name="requestDate" type="date" className="form-input" />
                <ErrorMessage name="requestDate" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Custom Fields */}
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

      {/* Signature Section */}
      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Request Initiation</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent
              name="Recruiter / HR"
              onChange={(sig) => setFieldValue('signatures.recruiter', sig)}
              value={values.signatures.recruiter}
            />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">Recruiter / HR</div>
              <div className="sig-space">
                {values.signatures.recruiter?.data && (
                  <img
                    src={values.signatures.recruiter.data}
                    alt="Signature"
                    className="print-sig-image"
                    style={{ maxWidth: '100%', maxHeight: '80px' }}
                  />
                )}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.recruiter?.name && `Name: ${values.signatures.recruiter.name}`}</div>
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
    <ModernFormWrapper formId="FRM-00620" title="Reference Check – Request / Initiation Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
          alert('✅ Form saved successfully!');
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00620;
