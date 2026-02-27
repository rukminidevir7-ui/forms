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
  typeOfConsentProvided: Yup.string().required('Type of Consent Provided is required'),
  consentStatus: Yup.string().required('Consent Status is required'),
  consentGivenDate: Yup.string().required('Consent Given Date is required'),
  approvedBy: Yup.string().required('Approved By is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  recordCreatedOn: Yup.string().required('Record Created On is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateFullName: '',
  candidateIDApplicationID: '',
  positionAppliedFor: '',
  department: '',
  typeOfConsentProvided: '',
  consentStatus: '',
  consentGivenDate: '',
  approvedBy: '',
  approvalDate: '',
  recordCreatedOn: '',
  customFields: [],
  signatures: {
    approver: { type: '', data: '', name: '' }
  }
};

const FRM00619 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00619" title="Candidate Consent – Report / Record Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">📄 Record Fields</h3>
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
          <div className="form-field">
            <label className="form-label required">Type of Consent Provided</label>
            {isPrintMode ? (
              <div className="print-value">{values.typeOfConsentProvided || '___________________'}</div>
            ) : (
              <>
                <Field name="typeOfConsentProvided" as="select" className="form-input">
                  <option value="">-- Select Type --</option>
                  <option value="Interview">Interview</option>
                  <option value="Background Check">Background Check</option>
                  <option value="Data Usage">Data Usage</option>
                  <option value="All">All</option>
                </Field>
                <ErrorMessage name="typeOfConsentProvided" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Consent Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.consentStatus || '___________________'}</div>
            ) : (
              <>
                <Field name="consentStatus" as="select" className="form-input">
                  <option value="">-- Select Status --</option>
                  <option value="Granted">Granted</option>
                  <option value="Denied">Denied</option>
                  <option value="Withdrawn">Withdrawn</option>
                </Field>
                <ErrorMessage name="consentStatus" component="div" className="form-error" />
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
            <label className="form-label required">Approval Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalDate || '___________________'}</div>
            ) : (
              <>
                <Field name="approvalDate" type="date" className="form-input" />
                <ErrorMessage name="approvalDate" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Record Created On</label>
            {isPrintMode ? (
              <div className="print-value">{values.recordCreatedOn || '___________________'}</div>
            ) : (
              <>
                <Field name="recordCreatedOn" type="date" className="form-input" />
                <ErrorMessage name="recordCreatedOn" component="div" className="form-error" />
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
        <h3 className="form-section-title">✍️ Record Certification</h3>
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
    <ModernFormWrapper formId="FRM-00619" title="Candidate Consent – Report / Record Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00619;