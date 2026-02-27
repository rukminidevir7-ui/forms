// FRM00594_ConsentWithdrawal.jsx
// FRM-00594 / FRM-00595 – Consent Withdrawal Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
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
  withdrawalId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  name: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  organization: Yup.string().required('Required'),
  email: Yup.string().required('Required'),

  originalConsentId: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),
  consentGrantedDate: Yup.string().required('Required'),

  reason: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  legalBasisAfterWithdrawal: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  requestedSignature: Yup.object(),
  reviewSignature: Yup.object(),
  approvalSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  withdrawalId: '',
  requestDate: '',

  name: '',
  customerId: '',
  organization: '',
  email: '',
  contactNumber: '',

  originalConsentId: '',
  purpose: '',
  consentGrantedDate: '',
  processingActivities: '',

  reason: '',
  effectiveDate: '',
  impactOnServices: '',
  acknowledgementMethod: '',

  policyReference: '',
  legalBasisAfterWithdrawal: '',
  status: '',
  remarks: '',

  requestedSignature: {},
  reviewSignature: {},
  approvalSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00594_ConsentWithdrawal = () => {

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
      formId="FRM-00594"
      title="Consent Withdrawal – Request & Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Consent Withdrawal submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00594"
              title="CONSENT WITHDRAWAL – REQUEST & APPROVAL FORM"
              department="Data Protection & Privacy"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'withdrawalId','Withdrawal ID')}
                  {field(values,'requestDate','Request Date','date')}
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

              {/* 3. Original Consent Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Original Consent Details</h3>
                <div className="form-fields">
                  {field(values,'originalConsentId','Consent ID')}
                  {textarea(values,'purpose','Purpose of Processing')}
                  {field(values,'consentGrantedDate','Consent Granted Date','date')}
                  {textarea(values,'processingActivities','Processing Activities')}
                </div>
              </div>

              {/* 4. Withdrawal Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Withdrawal Details</h3>
                <div className="form-fields">
                  {textarea(values,'reason','Reason for Withdrawal')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {textarea(values,'impactOnServices','Impact on Services')}
                  {textarea(values,'acknowledgementMethod','Acknowledgement Method')}
                </div>
              </div>

              {/* 5. Compliance & Tracking */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Tracking</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}
                  {field(values,'legalBasisAfterWithdrawal','Legal Basis After Withdrawal')}
                  {selectField(values,'status','Status',
                    ['Pending','Under Review','Approved','Rejected','Closed'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Requested By (Data Subject)"
                      value={values.requestedSignature || {}}
                      onChange={(val) => setFieldValue("requestedSignature", val)}
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

                {/* Custom Signatures */}
                <div style={{ marginTop: 30 }}>
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 20 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: 30 }}>
                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />
                            {!isPrintMode && (
                              <button type="button" onClick={() => remove(index)}>
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Withdrawal Request
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

export default FRM00594_ConsentWithdrawal;
