// FRM00607_ProcessingInventoryUpdate.jsx
// FRM-00607 – Processing Inventory Update Form

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
  updateId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  requesterName: Yup.string().required('Required'),
  requesterDept: Yup.string().required('Required'),
  requesterEmail: Yup.string().required('Required'),

  processingActivity: Yup.string().required('Required'),
  businessPurpose: Yup.string().required('Required'),
  systemApplication: Yup.string().required('Required'),
  dataOwner: Yup.string().required('Required'),

  dataCategories: Yup.string().required('Required'),
  sensitiveData: Yup.string().required('Required'),
  dataSubjects: Yup.string().required('Required'),
  retentionPeriod: Yup.string().required('Required'),

  legalBasis: Yup.string().required('Required'),
  transferOutside: Yup.string().required('Required'),
  dpiaRequired: Yup.string().required('Required'),

  changeType: Yup.string().required('Required'),
  changeDescription: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),

  requestedSignature: Yup.object(),
  privacySignature: Yup.object(),
  approvalSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  updateId: '',
  requestDate: '',

  requesterName: '',
  requesterDept: '',
  requesterEmail: '',
  requesterContact: '',

  processingActivity: '',
  businessPurpose: '',
  systemApplication: '',
  dataOwner: '',
  thirdParties: '',

  dataCategories: '',
  sensitiveData: '',
  dataSubjects: '',
  processingLocation: '',
  retentionPeriod: '',

  legalBasis: '',
  securityControls: '',
  transferOutside: '',
  dpiaRequired: '',

  changeType: '',
  changeDescription: '',
  effectiveDate: '',

  requestedSignature: {},
  privacySignature: {},
  approvalSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00607_ProcessingInventoryUpdate = () => {

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
    <ModernFormWrapper formId="FRM-00607" title="Processing Inventory Update – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Processing Inventory Update submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00607"
              title="PROCESSING INVENTORY UPDATE – REQUEST & APPROVAL FORM"
              department="Data Protection & Privacy"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'updateId','Update ID')}
                  {field(values,'requestDate','Request Date','date')}
                </div>
              </div>

              {/* 2. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Name')}
                  {field(values,'requesterDept','Department / Business Unit')}
                  {field(values,'requesterEmail','Email')}
                  {field(values,'requesterContact','Contact Number')}
                </div>
              </div>

              {/* 3. Processing Activity Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Processing Activity Details</h3>
                <div className="form-fields">
                  {field(values,'processingActivity','Processing Activity Name')}
                  {textarea(values,'businessPurpose','Business Purpose')}
                  {field(values,'systemApplication','System / Application')}
                  {field(values,'dataOwner','Data Owner')}
                  {textarea(values,'thirdParties','Third Parties Involved')}
                </div>
              </div>

              {/* 4. Data Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Data Details</h3>
                <div className="form-fields">
                  {textarea(values,'dataCategories','Data Categories')}
                  {selectField(values,'sensitiveData','Sensitive Data Included',['Yes','No'])}
                  {field(values,'dataSubjects','Data Subjects')}
                  {field(values,'processingLocation','Processing Location')}
                  {field(values,'retentionPeriod','Retention Period')}
                </div>
              </div>

              {/* 5. Security & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Security & Compliance</h3>
                <div className="form-fields">
                  {field(values,'legalBasis','Legal Basis')}
                  {textarea(values,'securityControls','Security Controls')}
                  {selectField(values,'transferOutside','Transfer Outside Jurisdiction',['Yes','No'])}
                  {selectField(values,'dpiaRequired','DPIA Required',['Yes','No','Under Review'])}
                </div>
              </div>

              {/* 6. Change Summary */}
              <div className="form-section">
                <h3 className="form-section-title">6. Change Summary</h3>
                <div className="form-fields">
                  {selectField(values,'changeType','Type of Change',['New','Update','Closure'])}
                  {textarea(values,'changeDescription','Description of Change')}
                  {field(values,'effectiveDate','Effective Date','date')}
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section">
                <div className="print-value">
                  <strong>Declaration:</strong><br/>
                  The processing inventory update is accurate and reflects
                  current processing activities in accordance with
                  organizational data protection policies.
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>

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
                      label="Privacy Review"
                      value={values.privacySignature || {}}
                      onChange={(val) => setFieldValue("privacySignature", val)}
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
                    Submit Update
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

export default FRM00607_ProcessingInventoryUpdate;
