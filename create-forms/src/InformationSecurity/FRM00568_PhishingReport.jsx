// FRM00568_PhishingReport.jsx
// FRM-00568 / FRM-00569 – Phishing Incident Report Form

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
  incidentId: Yup.string().required('Required'),
  reportedDateTime: Yup.string().required('Required'),

  reporterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  emailAddress: Yup.string().email('Invalid Email').required('Required'),
  contactNumber: Yup.string().required('Required'),

  emailSubject: Yup.string().required('Required'),
  senderAddress: Yup.string().required('Required'),
  receivedDateTime: Yup.string().required('Required'),
  deliveryMethod: Yup.string().required('Required'),
  suspiciousIndicators: Yup.string().required('Required'),

  userInteraction: Yup.string().required('Required'),
  credentialsSubmitted: Yup.string().required('Required'),
  systemsAffected: Yup.string().required('Required'),
  immediateActions: Yup.string().required('Required'),

  severityLevel: Yup.string().required('Required'),
  analysisSummary: Yup.string().required('Required'),
  containmentMeasures: Yup.string().required('Required'),
  correctiveActions: Yup.string().required('Required'),
  targetClosureDate: Yup.string().required('Required'),

  regulatoryNotification: Yup.string().required('Required'),
  userAwarenessAction: Yup.string().required('Required'),
  policyReference: Yup.string().required('Required'),

  reportedBySignature: Yup.object(),
  securityTeamSignature: Yup.object(),
  cisoSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  incidentId: '',
  reportedDateTime: '',

  reporterName: '',
  employeeId: '',
  department: '',
  emailAddress: '',
  contactNumber: '',

  emailSubject: '',
  senderAddress: '',
  receivedDateTime: '',
  deliveryMethod: '',
  suspiciousIndicators: '',

  userInteraction: '',
  credentialsSubmitted: '',
  systemsAffected: '',
  immediateActions: '',

  severityLevel: '',
  analysisSummary: '',
  containmentMeasures: '',
  correctiveActions: '',
  targetClosureDate: '',

  regulatoryNotification: '',
  userAwarenessAction: '',
  policyReference: '',
  remarks: '',

  reportedBySignature: {},
  securityTeamSignature: {},
  cisoSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00568_PhishingReport = () => {

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
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="4" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00568" title="Phishing Incident – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Phishing Incident submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00568"
              title="PHISHING INCIDENT – REQUEST & APPROVAL FORM"
              department="Information Security – Security Operations"
            >

              {/* 1. Basic Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Incident Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'incidentId','Incident ID')}
                  {field(values,'reportedDateTime','Date & Time Reported','datetime-local')}
                </div>
              </div>

              {/* 2. Reporter Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Reporter Details</h3>
                <div className="form-fields">
                  {field(values,'reporterName','Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'emailAddress','Email Address','email')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 3. Phishing Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Phishing Details</h3>
                <div className="form-fields">
                  {field(values,'emailSubject','Email Subject')}
                  {field(values,'senderAddress','Sender Address')}
                  {field(values,'receivedDateTime','Received Date & Time','datetime-local')}

                  {selectField(values,'deliveryMethod','Delivery Method',
                    ['Email','SMS','Web','Social Media'])}

                  {textarea(values,'suspiciousIndicators','Suspicious Indicators')}
                </div>
              </div>

              {/* 4. Impact & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact & Actions</h3>
                <div className="form-fields">

                  {selectField(values,'userInteraction','User Interaction',
                    ['Clicked','Opened','None','Replied','Downloaded Attachment'])}

                  {selectField(values,'credentialsSubmitted','Credentials Submitted',
                    ['Yes','No','Unknown'])}

                  {textarea(values,'systemsAffected','Systems Affected')}
                  {textarea(values,'immediateActions','Immediate Actions Taken')}
                </div>
              </div>

              {/* 5. Investigation & Response */}
              <div className="form-section">
                <h3 className="form-section-title">5. Investigation & Response</h3>
                <div className="form-fields">
                  {selectField(values,'severityLevel','Severity Level',
                    ['Low','Medium','High','Critical'])}

                  {textarea(values,'analysisSummary','Analysis Summary')}
                  {textarea(values,'containmentMeasures','Containment Measures')}
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {field(values,'targetClosureDate','Target Closure Date','date')}
                </div>
              </div>

              {/* 6. Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Compliance & Notification</h3>
                <div className="form-fields">
                  {selectField(values,'regulatoryNotification','Regulatory Notification Required',
                    ['Yes','No'])}

                  {selectField(values,'userAwarenessAction','User Awareness Action Required',
                    ['Yes','No'])}

                  {field(values,'policyReference','Policy Reference')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reported By"
                      value={values.reportedBySignature || {}}
                      onChange={(val) => setFieldValue("reportedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Security Team Approval"
                      value={values.securityTeamSignature || {}}
                      onChange={(val) => setFieldValue("securityTeamSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="CISO / Head Approval"
                      value={values.cisoSignature || {}}
                      onChange={(val) => setFieldValue("cisoSignature", val)}
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
                    Submit Phishing Incident
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

export default FRM00568_PhishingReport;
