// FRM00565_SecurityIncidentReport.jsx
// FRM-00565 / FRM-00566 – Security Incident Report Form

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
  detectedDateTime: Yup.string().required('Required'),

  incidentType: Yup.string().required('Required'),
  severityLevel: Yup.string().required('Required'),
  detectedBy: Yup.string().required('Required'),
  locationSystem: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),

  incidentDescription: Yup.string().required('Required'),
  affectedAssets: Yup.string().required('Required'),
  businessImpact: Yup.string().required('Required'),
  immediateActions: Yup.string().required('Required'),

  rootCause: Yup.string().required('Required'),
  containmentMeasures: Yup.string().required('Required'),
  correctiveActions: Yup.string().required('Required'),
  preventiveActions: Yup.string().required('Required'),
  targetClosureDate: Yup.string().required('Required'),

  regulatoryNotification: Yup.string().required('Required'),
  legalReview: Yup.string().required('Required'),
  customerNotification: Yup.string().required('Required'),

  reportedBySignature: Yup.object(),
  securityManagerSignature: Yup.object(),
  cisoSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  incidentId: '',
  detectedDateTime: '',

  incidentType: '',
  severityLevel: '',
  detectedBy: '',
  locationSystem: '',
  businessUnit: '',

  incidentDescription: '',
  affectedAssets: '',
  businessImpact: '',
  immediateActions: '',

  rootCause: '',
  containmentMeasures: '',
  correctiveActions: '',
  preventiveActions: '',
  targetClosureDate: '',

  regulatoryNotification: '',
  legalReview: '',
  customerNotification: '',
  remarks: '',

  reportedBySignature: {},
  securityManagerSignature: {},
  cisoSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00565_SecurityIncidentReport = () => {

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
    <ModernFormWrapper formId="FRM-00565" title="Security Incident – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Security Incident Report submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00565"
              title="SECURITY INCIDENT – REQUEST & APPROVAL FORM"
              department="Information Security – Security Operations"
            >

              {/* 1. Basic Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Incident Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'incidentId','Incident ID')}
                  {field(values,'detectedDateTime','Date & Time Detected','datetime-local')}
                </div>
              </div>

              {/* 2. Incident Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Incident Details</h3>
                <div className="form-fields">

                  {selectField(values,'incidentType','Incident Type',
                    ['Malware','Phishing','Data Breach','Unauthorized Access','DoS','Insider Threat'])}

                  {selectField(values,'severityLevel','Severity Level',
                    ['Low','Medium','High','Critical'])}

                  {field(values,'detectedBy','Detected By')}
                  {field(values,'locationSystem','Location / System')}
                  {field(values,'businessUnit','Business Unit')}
                </div>
              </div>

              {/* 3. Description & Impact */}
              <div className="form-section">
                <h3 className="form-section-title">3. Description & Impact</h3>
                <div className="form-fields">
                  {textarea(values,'incidentDescription','Incident Description')}
                  {textarea(values,'affectedAssets','Affected Assets / Data')}
                  {textarea(values,'businessImpact','Business Impact')}
                  {textarea(values,'immediateActions','Immediate Actions Taken')}
                </div>
              </div>

              {/* 4. Investigation & Response */}
              <div className="form-section">
                <h3 className="form-section-title">4. Investigation & Response</h3>
                <div className="form-fields">
                  {textarea(values,'rootCause','Root Cause')}
                  {textarea(values,'containmentMeasures','Containment Measures')}
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {textarea(values,'preventiveActions','Preventive Actions')}
                  {field(values,'targetClosureDate','Target Closure Date','date')}
                </div>
              </div>

              {/* 5. Compliance & Notification */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Notification</h3>
                <div className="form-fields">

                  {selectField(values,'regulatoryNotification','Regulatory Notification Required',
                    ['Yes','No'])}

                  {selectField(values,'legalReview','Legal / Compliance Review',
                    ['Required','Not Required','Completed'])}

                  {selectField(values,'customerNotification','Customer Notification Required',
                    ['Yes','No'])}

                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

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
                      label="Security Manager Approval"
                      value={values.securityManagerSignature || {}}
                      onChange={(val) => setFieldValue("securityManagerSignature", val)}
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
                    Submit Security Incident
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

export default FRM00565_SecurityIncidentReport;
