// FRM00604_BreachNotificationDraft.jsx
// FRM-00604 – Breach Notification Draft Form

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
  notificationId: Yup.string().required('Required'),
  draftDate: Yup.string().required('Required'),

  incidentRefId: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  dateDetected: Yup.string().required('Required'),
  reportedBy: Yup.string().required('Required'),

  breachType: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  dataCategories: Yup.string().required('Required'),
  estimatedRecords: Yup.string().required('Required'),
  riskLevel: Yup.string().required('Required'),

  notificationRequired: Yup.string().required('Required'),
  legalBasis: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  preparedSignature: Yup.object(),
  privacyReviewSignature: Yup.object(),
  authorizedSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  notificationId: '',
  draftDate: '',

  incidentRefId: '',
  incidentDate: '',
  dateDetected: '',
  reportedBy: '',
  locationSystem: '',

  breachType: '',
  description: '',
  dataCategories: '',
  estimatedRecords: '',
  riskLevel: '',

  impactIndividuals: '',
  businessImpact: '',
  regulatoryImpact: '',
  likelihoodHarm: '',

  immediateActions: '',
  containmentMeasures: '',
  correctiveActions: '',
  notificationRequired: '',

  legalBasis: '',
  regulatorDeadline: '',
  policyReference: '',
  status: '',
  remarks: '',

  preparedSignature: {},
  privacyReviewSignature: {},
  authorizedSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00604_BreachNotificationDraft = () => {

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
    <ModernFormWrapper formId="FRM-00604" title="Breach Notification Draft – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Breach Notification Draft submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00604"
              title="BREACH NOTIFICATION DRAFT – REQUEST & APPROVAL FORM"
              department="Data Protection & Privacy"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'notificationId','Notification ID')}
                  {field(values,'draftDate','Draft Date','date')}
                </div>
              </div>

              {/* 2. Incident Overview */}
              <div className="form-section">
                <h3 className="form-section-title">2. Incident Overview</h3>
                <div className="form-fields">
                  {field(values,'incidentRefId','Incident Reference ID')}
                  {field(values,'incidentDate','Date of Incident','date')}
                  {field(values,'dateDetected','Date Detected','date')}
                  {field(values,'reportedBy','Reported By')}
                  {field(values,'locationSystem','Location / System')}
                </div>
              </div>

              {/* 3. Breach Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Breach Details</h3>
                <div className="form-fields">
                  {selectField(values,'breachType','Type of Breach',
                    ['Unauthorized Access','Data Leak','Loss/Theft','Ransomware','Insider Threat'])}
                  {textarea(values,'description','Description')}
                  {textarea(values,'dataCategories','Data Categories Impacted')}
                  {field(values,'estimatedRecords','Estimated Records Affected')}
                  {selectField(values,'riskLevel','Risk Level',
                    ['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'impactIndividuals','Impact on Individuals')}
                  {textarea(values,'businessImpact','Business Impact')}
                  {textarea(values,'regulatoryImpact','Regulatory Impact')}
                  {textarea(values,'likelihoodHarm','Likelihood of Harm')}
                </div>
              </div>

              {/* 5. Response Actions */}
              <div className="form-section">
                <h3 className="form-section-title">5. Response Actions</h3>
                <div className="form-fields">
                  {textarea(values,'immediateActions','Immediate Actions Taken')}
                  {textarea(values,'containmentMeasures','Containment Measures')}
                  {textarea(values,'correctiveActions','Corrective Actions Planned')}
                  {selectField(values,'notificationRequired','Notification Required',['Yes','No'])}
                </div>
              </div>

              {/* 6. Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Compliance & Governance</h3>
                <div className="form-fields">
                  {field(values,'legalBasis','Legal Basis')}
                  {field(values,'regulatorDeadline','Regulator Notification Deadline','date')}
                  {field(values,'policyReference','Policy Reference')}
                  {selectField(values,'status','Status',['Draft','Under Review','Approved','Submitted'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section">
                <div className="print-value">
                  <strong>Declaration:</strong><br/>
                  The breach notification draft has been prepared based on available
                  information and will be updated as further investigation progresses
                  in accordance with data protection policies.
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Prepared By"
                      value={values.preparedSignature || {}}
                      onChange={(val) => setFieldValue("preparedSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Privacy / Legal Review"
                      value={values.privacyReviewSignature || {}}
                      onChange={(val) => setFieldValue("privacyReviewSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Authorized Approval"
                      value={values.authorizedSignature || {}}
                      onChange={(val) => setFieldValue("authorizedSignature", val)}
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
                    Submit Draft
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

export default FRM00604_BreachNotificationDraft;
