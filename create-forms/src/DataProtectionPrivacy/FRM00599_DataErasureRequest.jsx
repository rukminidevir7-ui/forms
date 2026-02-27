// FRM00599_DataErasureRequest.jsx
// FRM-00599 – Data Erasure Request Form

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
  requestId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  name: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  organization: Yup.string().required('Required'),
  email: Yup.string().required('Required'),

  dataToBeErased: Yup.string().required('Required'),
  systems: Yup.string().required('Required'),
  reason: Yup.string().required('Required'),

  verificationMethod: Yup.string().required('Required'),
  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  legalBasis: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  dataSubjectSignature: Yup.object(),
  privacyReviewSignature: Yup.object(),
  approvalSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  requestId: '',
  requestDate: '',

  name: '',
  customerId: '',
  organization: '',
  email: '',
  contactNumber: '',

  dataToBeErased: '',
  systems: '',
  reason: '',
  legalContractRef: '',
  supportingDocuments: '',

  verificationMethod: '',
  verifiedBy: '',
  verificationDate: '',

  policyReference: '',
  legalBasis: '',
  retentionException: '',
  status: '',
  remarks: '',

  dataSubjectSignature: {},
  privacyReviewSignature: {},
  approvalSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00599_DataErasureRequest = () => {

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
    <ModernFormWrapper formId="FRM-00599" title="Data Erasure Request – Request Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Data Erasure Request submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00599"
              title="DATA ERASURE REQUEST – REQUEST FORM"
              department="Data Protection & Privacy"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'requestId','Request ID')}
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

              {/* 3. Erasure Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Erasure Details</h3>
                <div className="form-fields">
                  {textarea(values,'dataToBeErased','Data to be Erased')}
                  {textarea(values,'systems','Systems / Applications')}
                  {textarea(values,'reason','Reason for Erasure')}
                  {field(values,'legalContractRef','Legal / Contract Reference (if any)')}
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                </div>
              </div>

              {/* 4. Identity Verification */}
              <div className="form-section">
                <h3 className="form-section-title">4. Identity Verification</h3>
                <div className="form-fields">
                  {selectField(values,'verificationMethod','Verification Method',
                    ['Government ID','Employee ID','Email Confirmation','OTP Verification'])}
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'verificationDate','Verification Date','date')}
                </div>
              </div>

              {/* 5. Compliance & Tracking */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Tracking</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}
                  {field(values,'legalBasis','Legal Basis')}
                  {field(values,'retentionException','Retention Exception (if applicable)')}
                  {selectField(values,'status','Status',
                    ['Pending','Under Review','Approved','Rejected','Closed'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section">
                <div className="print-value">
                  <strong>Declaration:</strong><br />
                  I confirm that the information provided is accurate and request
                  erasure of my personal data under applicable data protection regulations,
                  subject to legal obligations.
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Requested By (Data Subject)"
                      value={values.dataSubjectSignature || {}}
                      onChange={(val) => setFieldValue("dataSubjectSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Privacy Team Review"
                      value={values.privacyReviewSignature || {}}
                      onChange={(val) => setFieldValue("privacyReviewSignature", val)}
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
                    Submit Erasure Request
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

export default FRM00599_DataErasureRequest;
