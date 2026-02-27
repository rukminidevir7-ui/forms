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
  positionDepartment: Yup.string().required('Position / Department is required'),
  addressVerificationCompleted: Yup.string().required('Address Verification is required'),
  employmentHistoryVerification: Yup.string().required('Employment History Verification is required'),
  educationQualificationVerification: Yup.string().required('Education Qualification Verification is required'),
  identityProofVerification: Yup.string().required('Identity Proof Verification is required'),
  criminalRecordCheck: Yup.string().required('Criminal Record Check is required'),
  referenceCheckCompleted: Yup.string().required('Reference Check Completed is required'),
  consentFormCollected: Yup.string().required('Consent Form Collected is required'),
  backgroundVerificationVendorName: Yup.string().required('Background Verification Vendor Name is required'),
  initiatedBy: Yup.string().required('Initiated By is required'),
  initiationDate: Yup.string().required('Initiation Date is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateFullName: '',
  candidateIDApplicationID: '',
  positionDepartment: '',
  addressVerificationCompleted: '',
  employmentHistoryVerification: '',
  educationQualificationVerification: '',
  identityProofVerification: '',
  criminalRecordCheck: '',
  referenceCheckCompleted: '',
  consentFormCollected: '',
  backgroundVerificationVendorName: '',
  initiatedBy: '',
  initiationDate: '',
  customFields: [],
  signatures: {
    initiator: { type: '', data: '', name: '' }
  }
};

const FRM00624 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00624" title="Background Verification Initiation – Checklist" department="HR & People Ops">
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
            <label className="form-label required">Position / Department</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionDepartment || '___________________'}</div>
            ) : (
              <>
                <Field name="positionDepartment" className="form-input" placeholder="Enter position/department" />
                <ErrorMessage name="positionDepartment" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">✅ Verification Checklist (Yes / No / NA)</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Address Verification Completed</label>
            {isPrintMode ? (
              <div className="print-value">{values.addressVerificationCompleted || '___________________'}</div>
            ) : (
              <>
                <Field name="addressVerificationCompleted" as="select" className="form-input">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </Field>
                <ErrorMessage name="addressVerificationCompleted" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Employment History Verification</label>
            {isPrintMode ? (
              <div className="print-value">{values.employmentHistoryVerification || '___________________'}</div>
            ) : (
              <>
                <Field name="employmentHistoryVerification" as="select" className="form-input">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </Field>
                <ErrorMessage name="employmentHistoryVerification" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Education Qualification Verification</label>
            {isPrintMode ? (
              <div className="print-value">{values.educationQualificationVerification || '___________________'}</div>
            ) : (
              <>
                <Field name="educationQualificationVerification" as="select" className="form-input">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </Field>
                <ErrorMessage name="educationQualificationVerification" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Identity Proof Verification</label>
            {isPrintMode ? (
              <div className="print-value">{values.identityProofVerification || '___________________'}</div>
            ) : (
              <>
                <Field name="identityProofVerification" as="select" className="form-input">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </Field>
                <ErrorMessage name="identityProofVerification" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Criminal Record Check</label>
            {isPrintMode ? (
              <div className="print-value">{values.criminalRecordCheck || '___________________'}</div>
            ) : (
              <>
                <Field name="criminalRecordCheck" as="select" className="form-input">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </Field>
                <ErrorMessage name="criminalRecordCheck" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Check Completed</label>
            {isPrintMode ? (
              <div className="print-value">{values.referenceCheckCompleted || '___________________'}</div>
            ) : (
              <>
                <Field name="referenceCheckCompleted" as="select" className="form-input">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </Field>
                <ErrorMessage name="referenceCheckCompleted" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Consent Form Collected</label>
            {isPrintMode ? (
              <div className="print-value">{values.consentFormCollected || '___________________'}</div>
            ) : (
              <>
                <Field name="consentFormCollected" as="select" className="form-input">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </Field>
                <ErrorMessage name="consentFormCollected" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">🏢 Vendor & Initiation Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Background Verification Vendor Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.backgroundVerificationVendorName || '___________________'}</div>
            ) : (
              <>
                <Field name="backgroundVerificationVendorName" className="form-input" placeholder="E.g., FirstAdvantage, SMRC" />
                <ErrorMessage name="backgroundVerificationVendorName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Initiated By (HR Name)</label>
            {isPrintMode ? (
              <div className="print-value">{values.initiatedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="initiatedBy" className="form-input" placeholder="Enter HR name who initiated" />
                <ErrorMessage name="initiatedBy" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Initiation Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.initiationDate || '___________________'}</div>
            ) : (
              <>
                <Field name="initiationDate" type="date" className="form-input" />
                <ErrorMessage name="initiationDate" component="div" className="form-error" />
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
        <h3 className="form-section-title">✍️ Verification Initiation</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="HR Initiator" onChange={(sig) => setFieldValue('signatures.initiator', sig)} value={values.signatures.initiator} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">HR Initiator</div>
              <div className="sig-space">
                {values.signatures.initiator?.data && <img src={values.signatures.initiator.data} alt="Signature" className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.initiator?.name && `Name: ${values.signatures.initiator.name}`}</div>
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
    <ModernFormWrapper formId="FRM-00624" title="Background Verification Initiation – Checklist">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00624;