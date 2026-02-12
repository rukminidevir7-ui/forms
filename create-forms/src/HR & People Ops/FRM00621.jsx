import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  ref_req_id: Yup.string().required('Required'),
  feedback: Yup.object({
    performance_rating: Yup.string().required('Required'),
    would_rehire: Yup.string().required('Required'),
    strengths: Yup.string().required('Required'),
  }),
  result: Yup.string().required('Required'),
});

const initialValues = {
  ref_req_id: '',
  feedback: {
    performance_rating: 'Average',
    would_rehire: 'Yes',
    strengths: '',
    weaknesses: '',
    comments: '',
  },
  result: 'Positive', // Positive, Negative, Inconclusive
};

const FRM00621 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper formId="FRM-00621" version="1.0" title="Reference Check Outcome">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => setFormValues(values)}
      >
        {({ values, errors, touched }) => {
          useEffect(() => setFormValues(values), [values]);

          if (isPrintMode) {
            return (
              <div>
                <div style={{ padding: 10, border: '1px solid #ccc', background: '#f9f9f9', marginBottom: 20 }}>
                   <strong>Linked Request ID:</strong> {values.ref_req_id || '—'}
                </div>

                <h4 style={{ borderBottom: '1px solid #ddd' }}>FEEDBACK SUMMARY</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, margin: '15px 0' }}>
                   <div><strong>Performance Rating:</strong> {values.feedback.performance_rating}</div>
                   <div><strong>Would Rehire?</strong> {values.feedback.would_rehire}</div>
                </div>

                <div style={{ marginBottom: 15 }}>
                  <strong>Key Strengths:</strong>
                  <p style={{ marginTop: 5 }}>{values.feedback.strengths || '—'}</p>
                </div>
                <div style={{ marginBottom: 15 }}>
                  <strong>Areas of Improvement:</strong>
                  <p style={{ marginTop: 5 }}>{values.feedback.weaknesses || '—'}</p>
                </div>

                <div style={{ padding: 10, border: '1px solid #333', marginTop: 20 }}>
                   <strong>Overall Result:</strong> <span style={{ fontWeight: 'bold' }}>{values.result.toUpperCase()}</span>
                </div>
              </div>
            );
          }

          return (
            <Form>
               <div style={{ marginBottom: 20 }}>
                 <label>Linked Request ID (FRM-00620)</label>
                 <Field name="ref_req_id" style={inputStyle} />
               </div>

               <h4 style={{ marginBottom: 10 }}>Feedback Details</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 15 }}>
                 <div>
                   <label>Performance Rating (Previous Role)</label>
                   <Field as="select" name="feedback.performance_rating" style={inputStyle}>
                     <option value="Excellent">Excellent</option>
                     <option value="Good">Good</option>
                     <option value="Average">Average</option>
                     <option value="Below Average">Below Average</option>
                   </Field>
                 </div>
                 <div>
                   <label>Would they rehire?</label>
                   <Field as="select" name="feedback.would_rehire" style={inputStyle}>
                     <option value="Yes">Yes</option>
                     <option value="No">No</option>
                     <option value="Maybe">Maybe</option>
                   </Field>
                 </div>
               </div>

               <div style={{ marginBottom: 15 }}>
                 <label>Key Strengths</label>
                 <Field as="textarea" name="feedback.strengths" rows="3" style={inputStyle} />
                 {errors.feedback?.strengths && touched.feedback?.strengths && <div style={errorStyle}>{errors.feedback.strengths}</div>}
               </div>

               <div style={{ marginBottom: 15 }}>
                 <label>Weaknesses / Areas of Improvement</label>
                 <Field as="textarea" name="feedback.weaknesses" rows="3" style={inputStyle} />
               </div>

               <div style={{ marginTop: 20, padding: 15, background: '#eee', borderRadius: 4 }}>
                 <label style={{ fontWeight: 'bold' }}>Final Reference Check Result</label>
                 <Field as="select" name="result" style={{ ...inputStyle, width: '100%', fontWeight: 'bold' }}>
                   <option value="Positive">Positive - Proceed</option>
                   <option value="Negative">Negative - Do Not Hire</option>
                   <option value="Inconclusive">Inconclusive - Needs More Refs</option>
                 </Field>
               </div>

               <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <button type="submit" style={buttonStyle}>💾 Submit Outcome</button>
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
const buttonStyle = { padding: '10px 24px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default FRM00621;