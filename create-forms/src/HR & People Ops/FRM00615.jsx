import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  ref_id: Yup.string().required('Reference to FRM-00614 ID is required'),
  hr_decision: Yup.string().required('Required'),
  final_salary_offer: Yup.number().required('Required'),
  approver_name: Yup.string().required('Required'),
});

const initialValues = {
  ref_id: '',
  hr_comments: '',
  hr_decision: 'Pending',
  final_salary_offer: '',
  approver_name: '',
};

const FRM00615 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper formId="FRM-00615" version="1.0" title="Interview Feedback Approval">
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
                <div style={{ marginBottom: 20, padding: 10, background: '#f9f9f9', border: '1px solid #ddd' }}>
                  <strong>Linked Feedback Form ID:</strong> {values.ref_id || '—'}
                </div>
                <h4 style={{ borderBottom: '1px solid #ddd' }}>FINAL HIRING DECISION</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 10 }}>
                  <div><strong>Decision:</strong> {values.hr_decision}</div>
                  <div><strong>Approved Salary (CTC):</strong> {values.final_salary_offer}</div>
                  <div><strong>Approver:</strong> {values.approver_name}</div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <strong>HR Remarks:</strong>
                  <p style={{ border: '1px solid #eee', padding: 10 }}>{values.hr_comments || '—'}</p>
                </div>
              </div>
            );
          }

          return (
            <Form>
               <div style={{ marginBottom: 15 }}>
                 <label>Linked Feedback Form ID (FRM-00614 Ref)</label>
                 <Field name="ref_id" style={inputStyle} placeholder="Enter Ref ID" />
                 {errors.ref_id && touched.ref_id && <div style={errorStyle}>{errors.ref_id}</div>}
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                 <div>
                   <label>Decision</label>
                   <Field as="select" name="hr_decision" style={inputStyle}>
                     <option value="Pending">Pending</option>
                     <option value="Approved to Hire">Approved to Hire</option>
                     <option value="Rejected">Rejected</option>
                   </Field>
                 </div>
                 <div>
                   <label>Proposed CTC</label>
                   <Field name="final_salary_offer" type="number" style={inputStyle} />
                 </div>
               </div>

               <div style={{ marginTop: 15 }}>
                 <label>Approver Name</label>
                 <Field name="approver_name" style={inputStyle} />
               </div>

               <div style={{ marginTop: 15 }}>
                 <label>HR Remarks</label>
                 <Field as="textarea" name="hr_comments" rows="3" style={inputStyle} />
               </div>

               <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <button type="submit" style={buttonStyle}>💾 Authorize</button>
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

export default FRM00615;