// FRM00591_ConsentCapture.jsx
// FRM-00591 / FRM-00592 – Consent Capture Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  companyName: Yup.string().required('Required'),
  consentId: Yup.string().required('Required'),
  consentDate: Yup.string().required('Required'),

  name: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  organization: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  purpose: Yup.string().required('Required'),
  dataCategories: Yup.string().required('Required'),
  processingActivities: Yup.string().required('Required'),

  consentType: Yup.string().required('Required'),
  validFrom: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  legalBasis: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  consentSignature: Yup.object(),
  reviewSignature: Yup.object(),
  approvalSignature: Yup.object(),

  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  consentId: '',
  consentDate: '',

  name: '',
  customerId: '',
  organization: '',
  email: '',
  contactNumber: '',

  purpose: '',
  dataCategories: '',
  processingActivities: '',
  thirdParties: '',

  consentType: '',
  validFrom: '',
  validUntil: '',
  withdrawalMechanism: '',

  policyReference: '',
  legalBasis: '',
  status: '',
  remarks: '',

  consentSignature: {},
  reviewSignature: {},
  approvalSignature: {},

  customFields: [],
  attachments: []
};

const FRM00591_ConsentCapture = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
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
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} rows="4" className="form-textarea" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const selectField = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">Select</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00591"
      title="Consent Capture – Request & Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Consent Capture submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00591"
              title="CONSENT CAPTURE – REQUEST & APPROVAL FORM"
              department="Data Protection & Privacy"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'consentId','Consent ID')}
                  {field(values,'consentDate','Consent Date','date')}
                </div>
              </div>

              {/* 2. Data Subject Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Data Subject Details</h3>
                <div className="form-fields">
                  {field(values,'name','Name')}
                  {field(values,'customerId','Customer / Employee ID')}
                  {field(values,'organization','Department / Organization')}
                  {field(values,'email','Email Address')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 3. Processing Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Processing Details</h3>
                <div className="form-fields">
                  {textarea(values,'purpose','Purpose of Processing')}
                  {textarea(values,'dataCategories','Data Categories')}
                  {textarea(values,'processingActivities','Processing Activities')}
                  {textarea(values,'thirdParties','Third Parties Involved')}
                </div>
              </div>

              {/* 4. Consent Scope & Validity */}
              <div className="form-section">
                <h3 className="form-section-title">4. Consent Scope & Validity</h3>
                <div className="form-fields">
                  {selectField(values,'consentType','Consent Type',
                    ['Explicit','Implied'])}
                  {field(values,'validFrom','Consent Valid From','date')}
                  {field(values,'validUntil','Consent Valid Until','date')}
                  {textarea(values,'withdrawalMechanism','Withdrawal Mechanism')}
                </div>
              </div>

              {/* 5. Compliance & Tracking */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Tracking</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}
                  {field(values,'legalBasis','Legal Basis')}
                  {selectField(values,'status','Status',
                    ['Pending','Active','Withdrawn','Expired'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization – 3 Column Layout */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Consent Provided By"
                      value={values.consentSignature || {}}
                      onChange={(val) => setFieldValue("consentSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reviewed By (Privacy Team)"
                      value={values.reviewSignature || {}}
                      onChange={(val) => setFieldValue("reviewSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Authorized Approval"
                      value={values.approvalSignature || {}}
                      onChange={(val) => setFieldValue("approvalSignature", val)}
                    />
                  </div>

                </div>

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Consent
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

export default FRM00591_ConsentCapture;
