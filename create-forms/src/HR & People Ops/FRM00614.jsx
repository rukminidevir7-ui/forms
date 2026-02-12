import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  candidate: Yup.object({
    name: Yup.string().required('Required'),
    position: Yup.string().required('Required'),
    interview_date: Yup.date().required('Required'),
  }),
  feedback: Yup.object({
    technical_rating: Yup.number().min(1).max(5).required('Required'),
    comm_rating: Yup.number().min(1).max(5).required('Required'),
    comments: Yup.string().required('Required'),
    recommendation: Yup.string().required('Required'),
  }),
});

const initialValues = {
  candidate: {
    name: '',
    position: '',
    interview_date: '',
  },
  feedback: {
    technical_rating: '',
    comm_rating: '',
    comments: '',
    recommendation: 'Hold', // Default
  },
};

const FRM00614 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper
      formId="FRM-00614"
      version="1.0"
      title="Interview Feedback Form"
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
                <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: 5 }}>CANDIDATE DETAILS</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 20 }}>
                  <div><strong>Name:</strong> {values.candidate.name || '—'}</div>
                  <div><strong>Position:</strong> {values.candidate.position || '—'}</div>
                  <div><strong>Date:</strong> {values.candidate.interview_date || '—'}</div>
                </div>

                <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: 5 }}>EVALUATION</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 15 }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <th style={{ border: '1px solid #ddd', padding: 8 }}>Criteria</th>
                      <th style={{ border: '1px solid #ddd', padding: 8 }}>Rating (1-5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>Technical Skills</td>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>{values.feedback.technical_rating || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>Communication</td>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>{values.feedback.comm_rating || '—'}</td>
                    </tr>
                  </tbody>
                </table>
                
                <div style={{ marginBottom: 15 }}>
                   <strong>Recommendation:</strong> <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{values.feedback.recommendation}</span>
                </div>
                <div>
                  <strong>Interviewer Comments:</strong>
                  <div style={{ border: '1px solid #eee', padding: 10, marginTop: 5, whiteSpace: 'pre-wrap' }}>
                    {values.feedback.comments || '—'}
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
                  <Field name="candidate.name" className="input-field" placeholder="John Doe" style={inputStyle} />
                  {errors.candidate?.name && touched.candidate?.name && <div style={errorStyle}>{errors.candidate.name}</div>}
                </div>
                <div>
                   <label>Position</label>
                   <Field name="candidate.position" className="input-field" placeholder="Site Engineer" style={inputStyle} />
                </div>
                <div>
                   <label>Date</label>
                   <Field name="candidate.interview_date" type="date" className="input-field" style={inputStyle} />
                </div>
              </div>

              <h4 style={{ marginTop: 20 }}>Evaluation</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label>Technical Rating (1-5)</label>
                  <Field name="feedback.technical_rating" type="number" min="1" max="5" style={inputStyle} />
                </div>
                <div>
                  <label>Communication Rating (1-5)</label>
                  <Field name="feedback.comm_rating" type="number" min="1" max="5" style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label>Recommendation</label>
                <Field as="select" name="feedback.recommendation" style={inputStyle}>
                  <option value="Hold">Hold</option>
                  <option value="Select">Select</option>
                  <option value="Reject">Reject</option>
                </Field>
              </div>

              <div>
                <label>Detailed Comments</label>
                <Field as="textarea" name="feedback.comments" rows="4" style={{ ...inputStyle, fontFamily: 'sans-serif' }} />
                {errors.feedback?.comments && touched.feedback?.comments && <div style={errorStyle}>{errors.feedback.comments}</div>}
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

// Simple inline styles to match your tempo
const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' };
const errorStyle = { color: 'red', fontSize: '12px', marginTop: '2px' };
const buttonStyle = { padding: '10px 24px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default FRM00614;