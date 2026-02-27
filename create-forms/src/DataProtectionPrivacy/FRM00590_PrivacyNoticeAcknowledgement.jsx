// FRM00590_PrivacyNoticeAcknowledgement.jsx
// FRM-00590 – Privacy Notice Acknowledgement

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
  acknowledgementId: Yup.string().required('Required'),
  acknowledgementDate: Yup.string().required('Required'),

  individualName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  departmentUnit: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  noticeVersion: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),
  purposeOfProcessing: Yup.string().required('Required'),
  dataCategories: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  consentRequired: Yup.string().required('Required'),

  acknowledgedBySignature: Yup.object(),
  privacyOfficerSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  acknowledgementId: '',
  acknowledgementDate: '',

  individualName: '',
  employeeId: '',
  departmentUnit: '',
  email: '',
  contactNumber: '',

  noticeVersion: '',
  effectiveDate: '',
  purposeOfProcessing: '',
  dataCategories: '',

  policyReference: '',
  consentRequired: '',
  remarks: '',

  acknowledgedBySignature: {},
  privacyOfficerSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00590_PrivacyNoticeAcknowledgement = () => {

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
      formId="FRM-00590"
      title="Privacy Notice Acknowledgement"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Privacy Notice Acknowledgement submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00590"
              title="PRIVACY NOTICE ACKNOWLEDGEMENT"
              department="Data Protection & Privacy"
            >

              {/* 1. Acknowledgement Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Acknowledgement Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'acknowledgementId','Acknowledgement ID')}
                  {field(values,'acknowledgementDate','Acknowledgement Date','date')}
                </div>
              </div>

              {/* 2. Individual Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Individual Details</h3>
                <div className="form-fields">
                  {field(values,'individualName','Name')}
                  {field(values,'employeeId','Employee / User ID')}
                  {field(values,'departmentUnit','Department / Business Unit')}
                  {field(values,'email','Email Address')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 3. Privacy Notice Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Privacy Notice Details</h3>
                <div className="form-fields">
                  {field(values,'noticeVersion','Notice Version')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {textarea(values,'purposeOfProcessing','Purpose of Processing')}
                  {textarea(values,'dataCategories','Data Categories Covered')}
                </div>
              </div>

              {/* Acknowledgement Statement */}
              <div className="form-section">
                <div className="print-value">
                  <strong>Acknowledgement Statement:</strong><br/>
                  I confirm that I have read, understood, and acknowledge the Privacy Notice.
                  I understand my responsibilities and the manner in which my personal data
                  will be processed in accordance with applicable data protection regulations
                  and organizational policies.
                </div>
              </div>

              {/* 4. Compliance & Tracking */}
              <div className="form-section">
                <h3 className="form-section-title">4. Compliance & Tracking</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}
                  {selectField(values,'consentRequired','Consent Required',['Yes','No'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Acknowledged By"
                      value={values.acknowledgedBySignature || {}}
                      onChange={(val) => setFieldValue("acknowledgedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Privacy Officer / Authorized Signatory"
                      value={values.privacyOfficerSignature || {}}
                      onChange={(val) => setFieldValue("privacyOfficerSignature", val)}
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
                          <div key={index} style={{ marginBottom: 30, position: "relative" }}>

                            {!isPrintMode && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  background: "red",
                                  color: "#fff",
                                  border: "none",
                                  padding: "5px 10px",
                                  cursor: "pointer"
                                }}
                              >
                                Remove
                              </button>
                            )}

                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />
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
                    Submit Privacy Notice Acknowledgement
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

export default FRM00590_PrivacyNoticeAcknowledgement;
