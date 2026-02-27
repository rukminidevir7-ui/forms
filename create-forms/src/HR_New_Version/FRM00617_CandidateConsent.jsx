// FRM00617_CandidateConsent.jsx
// FRM-00617 – Candidate Consent – Request & Approval Form

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

  // Section 1 – Request / Consent Information
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  positionJobTitle: Yup.string().required('Required'),
  candidateName: Yup.string().required('Required'),
  candidateContactEmail: Yup.string().email('Invalid email').required('Required'),
  purposeOfConsent: Yup.string().required('Required'),
  typeOfDataCollected: Yup.string().required('Required'),
  validityPeriod: Yup.string().required('Required'),
  consentDeclaration: Yup.string().required('Required'),
  candidateSignatureName: Yup.string().required('Required'),
  candidateConsentDate: Yup.string().required('Required'),

  // Section 2 – Approval Details
  consentReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  department: '',
  positionJobTitle: '',
  candidateName: '',
  candidateContactEmail: '',
  purposeOfConsent: '',
  typeOfDataCollected: '',
  validityPeriod: '',
  consentDeclaration: '',
  candidateSignatureName: '',
  candidateConsentDate: '',

  consentReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00617_CandidateConsent = () => {

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
      formId="FRM-00617"
      title="Candidate Consent – Request & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Candidate consent submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00617"
              title="Candidate Consent – Request & Approval"
              department="HR & Talent Acquisition"
            >

              {/* Section 1 – Candidate Consent Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Candidate Consent Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'positionJobTitle','Position / Job Title')}
                  {field(values,'candidateName','Candidate Name')}
                  {field(values,'candidateContactEmail','Candidate Contact Email')}
                  {select(values,'purposeOfConsent','Purpose of Consent',['Recruitment','Background Verification','Reference Check','Data Processing','Other'])}
                  {textarea(values,'typeOfDataCollected','Type of Data to be Collected')}
                  {field(values,'validityPeriod','Validity Period of Consent')}
                  {textarea(values,'consentDeclaration','Consent Declaration')}
                  {field(values,'candidateSignatureName','Candidate Signature Name')}
                  {field(values,'candidateConsentDate','Candidate Consent Date','date')}
                </div>
              </div>

              {/* Section 2 – Approval Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Approval / Authorization Details</h3>
                <div className="form-fields">
                  {field(values,'consentReferenceNumber','Consent Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {textarea(values,'approvalComments','Approval Decision / Comments')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default FRM00617_CandidateConsent;
