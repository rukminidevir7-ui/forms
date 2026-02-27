// FRM00588_SecureDisposalCertificate.jsx
// FRM-00588 – Secure Disposal Certificate

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
  certificateNo: Yup.string().required('Required'),
  disposalDate: Yup.string().required('Required'),

  assetType: Yup.string().required('Required'),
  assetDescription: Yup.string().required('Required'),
  assetTag: Yup.string().required('Required'),
  quantity: Yup.number().required('Required'),
  ownerDepartment: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  disposalMethod: Yup.string().required('Required'),
  vendorTeam: Yup.string().required('Required'),
  certificateReference: Yup.string().required('Required'),
  dataSanitizationMethod: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  environmentalCompliance: Yup.string().required('Required'),
  witnessName: Yup.string().required('Required'),

  disposedBySignature: Yup.object(),
  verifiedBySignature: Yup.object(),
  authorizedBySignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  certificateNo: '',
  disposalDate: '',

  assetType: '',
  assetDescription: '',
  assetTag: '',
  quantity: '',
  ownerDepartment: '',
  location: '',

  disposalMethod: '',
  vendorTeam: '',
  certificateReference: '',
  dataSanitizationMethod: '',

  policyReference: '',
  environmentalCompliance: '',
  witnessName: '',
  remarks: '',

  disposedBySignature: {},
  verifiedBySignature: {},
  authorizedBySignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00588_SecureDisposalCertificate = () => {

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
            <option value="Others">Others</option>
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <Field as="textarea" name={name} className="form-textarea" rows="4" />
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00588" title="Secure Disposal Certificate">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Secure Disposal Certificate submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00588"
              title="SECURE DISPOSAL CERTIFICATE"
              department="Information Security – Security Operations"
            >

              {/* 1. Certificate Info */}
              <div className="form-section">
                <h3 className="form-section-title">Certificate Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'certificateNo','Certificate No')}
                  {field(values,'disposalDate','Disposal Date','date')}
                </div>
              </div>

              {/* 2. Asset Details */}
              <div className="form-section">
                <h3 className="form-section-title">Asset Details</h3>
                <div className="form-fields">
                  {field(values,'assetType','Asset Type')}
                  {field(values,'assetDescription','Asset Description')}
                  {field(values,'assetTag','Asset Tag / Serial No')}
                  {field(values,'quantity','Quantity','number')}
                  {field(values,'ownerDepartment','Owner Department')}
                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 3. Disposal Details */}
              <div className="form-section">
                <h3 className="form-section-title">Disposal Details</h3>
                <div className="form-fields">
                  {selectField(values,'disposalMethod','Disposal Method',
                    ['Shredding','Wiping','Physical Destruction','Degaussing'])}

                  {field(values,'vendorTeam','Vendor / Internal Team')}
                  {field(values,'certificateReference','Certificate / Reference No')}
                  {field(values,'dataSanitizationMethod','Data Sanitization Method')}
                </div>
              </div>

              {/* 4. Compliance & Assurance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance & Assurance</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}

                  {selectField(values,'environmentalCompliance','Environmental Compliance',
                    ['Compliant','Non-Compliant','Vendor Certified'])}

                  {field(values,'witnessName','Witness Name')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* Certification Statement */}
              <div className="form-section">
                <div className="print-value" style={{ fontWeight: 600 }}>
                  Certification Statement:
                </div>
                <div className="print-value">
                  This certifies that the above-listed assets/materials have been securely
                  disposed in accordance with organizational security policies and
                  applicable regulatory requirements.
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Disposed By"
                      value={values.disposedBySignature || {}}
                      onChange={(val) => setFieldValue("disposedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Verified By"
                      value={values.verifiedBySignature || {}}
                      onChange={(val) => setFieldValue("verifiedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Authorized By"
                      value={values.authorizedBySignature || {}}
                      onChange={(val) => setFieldValue("authorizedBySignature", val)}
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
                    Submit Secure Disposal Certificate
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

export default FRM00588_SecureDisposalCertificate;
