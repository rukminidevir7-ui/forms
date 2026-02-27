// FRM00559_SystemDowntimeNotification.jsx
// FRM-00559 / FRM-00560 – System Downtime Notification Form

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

  notificationId: Yup.string().required('Required'),
  notificationDate: Yup.string().required('Required'),

  systemName: Yup.string().required('Required'),
  environment: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  downtimeType: Yup.string().required('Required'),
  startDateTime: Yup.string().required('Required'),
  endDateTime: Yup.string().required('Required'),
  expectedDuration: Yup.string().required('Required'),
  reasonForDowntime: Yup.string().required('Required'),
  servicesImpacted: Yup.string().required('Required'),

  usersNotified: Yup.string().required('Required'),
  notificationMethod: Yup.string().required('Required'),
  supportContact: Yup.string().required('Required'),

  preparedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  itHeadSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  notificationId: '',
  notificationDate: '',

  systemName: '',
  environment: '',
  businessUnit: '',
  location: '',

  downtimeType: '',
  startDateTime: '',
  endDateTime: '',
  expectedDuration: '',
  reasonForDowntime: '',
  servicesImpacted: '',

  usersNotified: '',
  notificationMethod: '',
  supportContact: '',
  remarks: '',

  preparedBySignature: {},
  managerSignature: {},
  itHeadSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00559_SystemDowntimeNotification = () => {

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
    <ModernFormWrapper formId="FRM-00559" title="System Downtime Notification – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('System Downtime Notification submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00559"
              title="SYSTEM DOWNTIME NOTIFICATION – REQUEST & APPROVAL FORM"
              department="IT & Systems – Application & Data"
            >

              {/* 1. Notification Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Notification Information</h3>
                <div className="form-fields">
                  {field(values,'notificationId','Notification ID')}
                  {field(values,'notificationDate','Notification Date','date')}
                </div>
              </div>

              {/* 2. System Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. System Details</h3>
                <div className="form-fields">
                  {field(values,'systemName','System / Application Name')}
                  {selectField(values,'environment','Environment',
                    ['Production','UAT','Development','Staging'])}
                  {field(values,'businessUnit','Business Unit')}
                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 3. Downtime Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Downtime Details</h3>
                <div className="form-fields">
                  {selectField(values,'downtimeType','Downtime Type',
                    ['Planned','Unplanned'])}

                  {field(values,'startDateTime','Start Date & Time','datetime-local')}
                  {field(values,'endDateTime','End Date & Time','datetime-local')}
                  {field(values,'expectedDuration','Expected Duration (e.g., 2 Hours)')}
                  {textarea(values,'reasonForDowntime','Reason for Downtime')}
                  {textarea(values,'servicesImpacted','Services Impacted')}
                </div>
              </div>

              {/* 4. Communication Plan */}
              <div className="form-section">
                <h3 className="form-section-title">4. Communication Plan</h3>
                <div className="form-fields">
                  {textarea(values,'usersNotified','Users Notified')}

                  {selectField(values,'notificationMethod','Notification Method',
                    ['Email','SMS','Teams','Slack','Portal Notice'])}

                  {field(values,'supportContact','Support Contact')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Prepared By"
                      value={values.preparedBySignature || {}}
                      onChange={(val) => setFieldValue("preparedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Manager Approval"
                      value={values.managerSignature || {}}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="IT Head Approval"
                      value={values.itHeadSignature || {}}
                      onChange={(val) => setFieldValue("itHeadSignature", val)}
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
                    Submit Downtime Notification
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

export default FRM00559_SystemDowntimeNotification;
