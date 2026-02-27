// FRM00553_ApplicationBugReport.jsx
// FRM-00553 – Application Bug Request Form

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

  dateReported: Yup.string().required('Required'),
  ticketId: Yup.string().required('Required'),

  reporterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  contactNumber: Yup.string().required('Required'),

  applicationName: Yup.string().required('Required'),
  moduleScreen: Yup.string().required('Required'),
  environment: Yup.string().required('Required'),
  severity: Yup.string().required('Required'),
  frequency: Yup.string().required('Required'),

  stepsToReproduce: Yup.string().required('Required'),
  expectedResult: Yup.string().required('Required'),
  actualResult: Yup.string().required('Required'),

  businessImpact: Yup.string().required('Required'),
  usersAffected: Yup.string().required('Required'),
  workaroundAvailable: Yup.string().required('Required'),

  reportedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  itSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  dateReported: '',
  ticketId: '',

  reporterName: '',
  employeeId: '',
  department: '',
  email: '',
  contactNumber: '',

  applicationName: '',
  moduleScreen: '',
  environment: '',
  severity: '',
  frequency: '',

  stepsToReproduce: '',
  expectedResult: '',
  actualResult: '',

  businessImpact: '',
  usersAffected: '',
  workaroundAvailable: '',
  additionalInfo: '',

  reportedBySignature: {},
  managerSignature: {},
  itSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00553_ApplicationBugReport = () => {

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
    <ModernFormWrapper formId="FRM-00553" title="Application Bug – Request Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Application Bug Report submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00553"
              title="APPLICATION BUG – REQUEST FORM"
              department="IT & Systems – Application & Data"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'dateReported','Date Reported','date')}
                  {field(values,'ticketId','Ticket ID')}
                </div>
              </div>

              {/* 2. Reporter Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Reporter Details</h3>
                <div className="form-fields">
                  {field(values,'reporterName','Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'email','Email','email')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 3. Bug Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Bug Details</h3>
                <div className="form-fields">
                  {field(values,'applicationName','Application Name')}
                  {field(values,'moduleScreen','Module / Screen')}

                  {selectField(values,'environment','Environment',
                    ['Production','UAT','Development'])}

                  {selectField(values,'severity','Severity',
                    ['Low','Medium','High','Critical'])}

                  {selectField(values,'frequency','Frequency',
                    ['Always','Intermittent','Rare'])}

                  {textarea(values,'stepsToReproduce','Steps to Reproduce')}
                  {textarea(values,'expectedResult','Expected Result')}
                  {textarea(values,'actualResult','Actual Result')}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'businessImpact','Business Impact')}
                  {field(values,'usersAffected','Number of Users Affected')}
                  {selectField(values,'workaroundAvailable','Workaround Available',
                    ['Yes','No'])}
                  {textarea(values,'additionalInfo','Remarks / Additional Info')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

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
                      label="Manager Review"
                      value={values.managerSignature || {}}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="IT Review"
                      value={values.itSignature || {}}
                      onChange={(val) => setFieldValue("itSignature", val)}
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
                    Submit Bug Report
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

export default FRM00553_ApplicationBugReport;
