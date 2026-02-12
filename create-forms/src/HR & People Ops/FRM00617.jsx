import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  candidate: Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    application_id: Yup.string().required('Required'),
  }),
  consent_details: Yup.object({
    consent_types: Yup.array().min(1, 'Select at least one consent type').required('Required'),
    request_date: Yup.date().required('Required'),
  }),
});

const initialValues = {
  candidate: {
    name: '',
    email: '',
    application_id: '',
  },
  consent_details: {
    consent_types: [], // Array for checkboxes
    request_date: new Date().toISOString().split('T')[0],
    remarks: '',
  },
};

const FRM00617 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper
      formId="FRM-00617"
      version="1.0"
      title="Candidate Consent Request"
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormValues(values);
          console.log(values);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => {
          useEffect(() => {
            setFormValues(values);
          }, [values]);

          if (isPrintMode) {
            return (
              <div className="print-view">
                <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: 5 }}>CANDIDATE INFORMATION</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 20 }}>
                  <div><strong>Name:</strong> {values.candidate.name || '—'}</div>
                  <div><strong>Application ID:</strong> {values.candidate.application_id || '—'}</div>
                  <div><strong>Email:</strong> {values.candidate.email || '—'}</div>
                </div>

                <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: 5 }}>CONSENT SCOPE</h4>
                <div style={{ marginBottom: 15 }}>
                  <strong>Requested Consents:</strong>
                  <ul style={{ marginTop: 5 }}>
                    {values.consent_details.consent_types.length > 0 
                      ? values.consent_details.consent_types.map(t => <li key={t}>{t}</li>)
                      : <li>None selected</li>}
                  </ul>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                   <div><strong>Request Date:</strong> {values.consent_details.request_date || '—'}</div>
                </div>
                
                <div style={{ marginTop: 15 }}>
                  <strong>Additional Remarks:</strong>
                  <div style={{ border: '1px solid #eee', padding: 10, marginTop: 5 }}>
                    {values.consent_details.remarks || '—'}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Form>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label>Candidate Name</label>
                  <Field name="candidate.name" style={inputStyle} placeholder="Full Name" />
                  {errors.candidate?.name && touched.candidate?.name && <div style={errorStyle}>{errors.candidate.name}</div>}
                </div>
                <div>
                   <label>Application ID</label>
                   <Field name="candidate.application_id" style={inputStyle} placeholder="APP-2023-XXXX" />
                </div>
                <div>
                   <label>Email Address</label>
                   <Field name="candidate.email" type="email" style={inputStyle} placeholder="candidate@example.com" />
                </div>
                <div>
                   <label>Date of Request</label>
                   <Field name="consent_details.request_date" type="date" style={inputStyle} />
                </div>
              </div>

              <h4 style={{ marginTop: 20, borderBottom: '1px solid #eee' }}>Consent Scope</h4>
              <div style={{ margin: '15px 0' }}>
                <label style={{ display: 'block', marginBottom: 5 }}>Select required consents:</label>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <label><Field type="checkbox" name="consent_details.consent_types" value="Background Verification (BGV)" /> Background Verification</label>
                  <label><Field type="checkbox" name="consent_details.consent_types" value="Data Privacy / GDPR" /> Data Privacy / GDPR</label>
                  <label><Field type="checkbox" name="consent_details.consent_types" value="Reference Check" /> Reference Check</label>
                  <label><Field type="checkbox" name="consent_details.consent_types" value="Medical Examination" /> Medical Exam</label>
                </div>
                {errors.consent_details?.consent_types && touched.consent_details?.consent_types && (
                  <div style={errorStyle}>{errors.consent_details.consent_types}</div>
                )}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label>Remarks / Instructions</label>
                <Field as="textarea" name="consent_details.remarks" rows="3" style={inputStyle} />
              </div>

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button type="submit" disabled={isSubmitting} style={buttonStyle}>💾 Initiate Request</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' };
const errorStyle = { color: 'red', fontSize: '12px', marginTop: '2px' };
const buttonStyle = { padding: '10px 24px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default FRM00617;