import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  candidate: Yup.object({
    name: Yup.string().required('Required'),
    application_id: Yup.string().required('Required'),
  }),
  referee: Yup.object({
    name: Yup.string().required('Required'),
    organization: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
    contact_number: Yup.string().required('Required'),
    relationship: Yup.string().required('Required'),
  }),
});

const initialValues = {
  candidate: {
    name: '',
    application_id: '',
  },
  referee: {
    name: '',
    organization: '',
    designation: '',
    contact_number: '',
    relationship: '', // e.g., Direct Manager, Peer
  },
};

const FRM00620 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper formId="FRM-00620" version="1.0" title="Reference Check Initiation">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => setFormValues(values)}
      >
        {({ values, errors, touched, isSubmitting }) => {
          useEffect(() => setFormValues(values), [values]);

          if (isPrintMode) {
            return (
              <div className="print-view">
                <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: 5 }}>CANDIDATE DETAILS</h4>
                <div style={{ marginBottom: 15 }}>
                  <strong>Candidate Name:</strong> {values.candidate.name || '—'} <br />
                  <strong>Application ID:</strong> {values.candidate.application_id || '—'}
                </div>

                <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: 5 }}>REFEREE DETAILS</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: 8, border: '1px solid #eee', width: '30%' }}><strong>Referee Name:</strong></td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{values.referee.name || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 8, border: '1px solid #eee' }}><strong>Organization:</strong></td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{values.referee.organization || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 8, border: '1px solid #eee' }}><strong>Designation:</strong></td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{values.referee.designation || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 8, border: '1px solid #eee' }}><strong>Relationship:</strong></td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{values.referee.relationship || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 8, border: '1px solid #eee' }}><strong>Contact No:</strong></td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{values.referee.contact_number || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          }

          return (
            <Form>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label>Candidate Name</label>
                  <Field name="candidate.name" style={inputStyle} />
                  {errors.candidate?.name && touched.candidate?.name && <div style={errorStyle}>{errors.candidate.name}</div>}
                </div>
                <div>
                  <label>Application ID</label>
                  <Field name="candidate.application_id" style={inputStyle} />
                </div>
              </div>

              <h4 style={{ borderBottom: '1px solid #eee', marginBottom: 10 }}>Referee Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div>
                   <label>Referee Name</label>
                   <Field name="referee.name" style={inputStyle} />
                </div>
                <div>
                   <label>Current Organization</label>
                   <Field name="referee.organization" style={inputStyle} />
                </div>
                <div>
                   <label>Designation</label>
                   <Field name="referee.designation" style={inputStyle} />
                </div>
                <div>
                   <label>Relationship to Candidate</label>
                   <Field name="referee.relationship" style={inputStyle} placeholder="e.g. Reporting Manager" />
                </div>
                <div>
                   <label>Contact Number</label>
                   <Field name="referee.contact_number" style={inputStyle} />
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button type="submit" disabled={isSubmitting} style={buttonStyle}>💾 Save & Preview</button>
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

export default FRM00620;