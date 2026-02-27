// FRM00603_DataSharingApproval.jsx
// FRM-00603 – Data Sharing Approval Form

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
  approvalId: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  requestRefId: Yup.string().required('Required'),
  requestingDept: Yup.string().required('Required'),
  dataOwner: Yup.string().required('Required'),
  recipient: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),

  dataCategories: Yup.string().required('Required'),
  sensitivity: Yup.string().required('Required'),
  transferMethod: Yup.string().required('Required'),

  legalBasis: Yup.string().required('Required'),
  dpaInPlace: Yup.string().required('Required'),
  riskSummary: Yup.string().required('Required'),

  decision: Yup.string().required('Required'),

  reviewedSignature: Yup.object(),
  infoSecSignature: Yup.object(),
  finalSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  approvalId: '',
  approvalDate: '',

  requestRefId: '',
  requestingDept: '',
  dataOwner: '',
  recipient: '',
  purpose: '',

  dataCategories: '',
  sensitivity: '',
  volume: '',
  transferMethod: '',

  legalBasis: '',
  dpaInPlace: '',
  riskSummary: '',
  securityControls: '',

  decision: '',
  conditions: '',
  validityPeriod: '',

  reviewedSignature: {},
  infoSecSignature: {},
  finalSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00603_DataSharingApproval = () => {

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
    <ModernFormWrapper formId="FRM-00603" title="Data Sharing Approval – Approval Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Data Sharing Approval submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00603"
              title="DATA SHARING APPROVAL – APPROVAL FORM"
              department="Data Protection & Privacy"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'approvalId','Approval ID')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              {/* 2. Data Sharing Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Data Sharing Details</h3>
                <div className="form-fields">
                  {field(values,'requestRefId','Request Reference ID')}
                  {field(values,'requestingDept','Requesting Department')}
                  {field(values,'dataOwner','Data Owner')}
                  {field(values,'recipient','Third Party / Recipient')}
                  {textarea(values,'purpose','Purpose of Sharing')}
                </div>
              </div>

              {/* 3. Data Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Data Scope</h3>
                <div className="form-fields">
                  {textarea(values,'dataCategories','Data Categories')}
                  {selectField(values,'sensitivity','Sensitivity Classification',
                    ['Public','Internal','Confidential','Restricted'])}
                  {field(values,'volume','Volume / Records')}
                  {selectField(values,'transferMethod','Transfer Method',
                    ['Encrypted Email','Secure FTP','API Integration','Physical Media'])}
                </div>
              </div>

              {/* 4. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">4. Risk & Compliance Assessment</h3>
                <div className="form-fields">
                  {field(values,'legalBasis','Legal Basis')}
                  {selectField(values,'dpaInPlace','Data Processing Agreement in Place',['Yes','No'])}
                  {textarea(values,'riskSummary','Risk Assessment Summary')}
                  {textarea(values,'securityControls','Security Controls Required')}
                </div>
              </div>

              {/* 5. Approval Decision */}
              <div className="form-section">
                <h3 className="form-section-title">5. Approval Decision</h3>
                <div className="form-fields">
                  {selectField(values,'decision','Decision',['Approved','Rejected','Conditional'])}
                  {textarea(values,'conditions','Conditions (if any)')}
                  {field(values,'validityPeriod','Validity Period')}
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section">
                <div className="print-value">
                  <strong>Declaration:</strong><br />
                  The data sharing activity has been reviewed for compliance with
                  applicable data protection regulations and organizational policies,
                  and the above decision is recorded.
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reviewed By (Privacy / Legal)"
                      value={values.reviewedSignature || {}}
                      onChange={(val) => setFieldValue("reviewedSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Information Security Approval"
                      value={values.infoSecSignature || {}}
                      onChange={(val) => setFieldValue("infoSecSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Final Authorization"
                      value={values.finalSignature || {}}
                      onChange={(val) => setFieldValue("finalSignature", val)}
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
                    Submit Approval
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

export default FRM00603_DataSharingApproval;
