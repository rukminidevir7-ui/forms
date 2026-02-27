// FRM00192_BackgroundVerificationConsent.jsx
// FRM-00192 – Background Verification Consent – Checklist Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // 1. Basic Information
  requestDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  candidateId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  verificationType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Candidate Details
  fullName: Yup.string().required('Required'),
  dateOfBirth: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  emailPhone: Yup.string().required('Required'),
  governmentIdType: Yup.string().required('Required'),
  governmentIdNumber: Yup.string().required('Required'),

  // 3. Verification Scope (Checklist)
  educationVerification: Yup.boolean(),
  employmentVerification: Yup.boolean(),
  identityVerification: Yup.boolean(),
  addressVerification: Yup.boolean(),
  criminalRecordCheck: Yup.boolean(),
  referenceCheck: Yup.boolean(),

  // 4. Consent Declaration
  consentStatement: Yup.string().required('Required'),
  consentGivenBy: Yup.string().required('Required'),
  consentDate: Yup.string().required('Required'),

  // 5. Review & Authorization
  hrReview: Yup.string().required('Required'),
  legalReview: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  preparedBy: '',
  candidateId: '',
  contactDetails: '',
  verificationType: '',
  priorityLevel: '',

  fullName: '',
  dateOfBirth: '',
  address: '',
  emailPhone: '',
  governmentIdType: '',
  governmentIdNumber: '',

  educationVerification: false,
  employmentVerification: false,
  identityVerification: false,
  addressVerification: false,
  criminalRecordCheck: false,
  referenceCheck: false,

  consentStatement: '',
  consentGivenBy: '',
  consentDate: '',

  hrReview: '',
  legalReview: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00192_BackgroundVerificationConsent = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const checkbox = (values, name, label) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">
          {values[name] ? 'Yes' : 'No'}
        </div>
      ) : (
        <Field type="checkbox" name={name} />
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00192"
      title="Background Verification Consent – Checklist Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Background Verification Consent submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00192"
              title="Background Verification Consent"
              department="Legal & Contracts – Employment Legal"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'candidateId','Employee / Candidate ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'verificationType','Verification Type',['Pre-Employment','Periodic Review','Promotion Check','Contractual Requirement'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Candidate Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Candidate Details</h3>
                <div className="form-fields">
                  {field(values,'fullName','Full Name')}
                  {field(values,'dateOfBirth','Date of Birth','date')}
                  {field(values,'address','Address')}
                  {field(values,'emailPhone','Email / Phone')}
                  {select(values,'governmentIdType','Government ID Type',['Passport','National ID','Driver License','Aadhaar','Other'])}
                  {field(values,'governmentIdNumber','ID Number')}
                </div>
              </div>

              {/* 3. Verification Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Verification Scope</h3>
                <div className="form-fields">
                  {checkbox(values,'educationVerification','Education Verification')}
                  {checkbox(values,'employmentVerification','Employment History Verification')}
                  {checkbox(values,'identityVerification','Identity Verification')}
                  {checkbox(values,'addressVerification','Address Verification')}
                  {checkbox(values,'criminalRecordCheck','Criminal Record Check')}
                  {checkbox(values,'referenceCheck','Reference Check')}
                </div>
              </div>

              {/* 4. Consent Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">4. Consent Declaration</h3>
                <div className="form-fields">
                  {textarea(values,'consentStatement','Consent Statement')}
                  {field(values,'consentGivenBy','Consent Given By (Name)')}
                  {field(values,'consentDate','Date','date')}
                </div>
              </div>

              {/* 5. Review & Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Review & Authorization</h3>
                <div className="form-fields">
                  {field(values,'hrReview','HR Review')}
                  {field(values,'legalReview','Legal Review')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Background Verification Consent
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

export default FRM00192_BackgroundVerificationConsent;
