// FRM00600_DataRetentionException.jsx
// FRM-00600 – Data Retention Exception Form

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
  exceptionId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  name: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  email: Yup.string().required('Required'),

  dataCategory: Yup.string().required('Required'),
  system: Yup.string().required('Required'),
  businessPurpose: Yup.string().required('Required'),
  currentRetention: Yup.string().required('Required'),
  proposedRetention: Yup.string().required('Required'),

  reason: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),
  mitigationControls: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  legalBasis: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),
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
  exceptionId: '',
  requestDate: '',

  name: '',
  department: '',
  email: '',
  contactNumber: '',

  dataCategory: '',
  system: '',
  businessPurpose: '',
  currentRetention: '',
  proposedRetention: '',

  reason: '',
  riskAssessment: '',
  mitigationControls: '',
  legalRequirement: '',

  policyReference: '',
  legalBasis: '',
  reviewFrequency: '',
  status: '',
  remarks: '',

  requestedSignature: {},
  reviewSignature: {},
  approvalSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00600_DataRetentionException = () => {

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
    <ModernFormWrapper formId="FRM-00600" title="Data Retention Exception – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Data Retention Exception submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00600"
              title="DATA RETENTION EXCEPTION – REQUEST & APPROVAL FORM"
              department="Data Protection & Privacy"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'exceptionId','Exception ID')}
                  {field(values,'requestDate','Request Date','date')}
                </div>
              </div>

              {/* 2. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'name','Name')}
                  {field(values,'department','Employee / Department')}
                  {field(values,'email','Email')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 3. Data Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Data Details</h3>
                <div className="form-fields">
                  {field(values,'dataCategory','Data Category')}
                  {field(values,'system','System / Application')}
                  {textarea(values,'businessPurpose','Business Purpose')}
                  {field(values,'currentRetention','Current Retention Period')}
                  {field(values,'proposedRetention','Proposed Extended Period')}
                </div>
              </div>

              {/* 4. Justification & Risk */}
              <div className="form-section">
                <h3 className="form-section-title">4. Justification & Risk Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'reason','Reason for Exception')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
                  {textarea(values,'mitigationControls','Mitigation Controls')}
                  {field(values,'legalRequirement','Legal / Regulatory Requirement')}
                </div>
              </div>

              {/* 5. Compliance & Governance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Governance</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}
                  {field(values,'legalBasis','Legal Basis')}
                  {selectField(values,'reviewFrequency','Review Frequency',
                    ['Quarterly','Half-Yearly','Annually'])}
                  {selectField(values,'status','Status',
                    ['Pending','Approved','Rejected','Under Review','Closed'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section">
                <div className="print-value">
                  <strong>Declaration:</strong><br />
                  The requested retention exception is necessary for the stated
                  business or legal purpose and will be reviewed periodically
                  in accordance with organizational data protection policies.
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Requested By"
                      value={values.requestedSignature || {}}
                      onChange={(val) => setFieldValue("requestedSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Information Security / Privacy Review"
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
                    Submit Exception Request
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

export default FRM00600_DataRetentionException;
