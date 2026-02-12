import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  ref_id: Yup.string().required('Reference ID required'),
  verification: Yup.object({
    status: Yup.string().required('Required'),
    received_date: Yup.date().required('Required'),
    verifier_name: Yup.string().required('Required'),
  }),
});

const initialValues = {
  ref_id: '',
  verification: {
    status: 'Pending',
    received_date: new Date().toISOString().split('T')[0],
    verifier_name: '',
    comments: '',
  },
};

const FRM00618 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper formId="FRM-00618" version="1.0" title="Consent Verification & Approval">
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
                <div style={{ padding: 10, background: '#f9f9f9', border: '1px solid #ddd', marginBottom: 20 }}>
                   <strong>Request Reference ID:</strong> {values.ref_id || '—'}
                </div>
                
                <h4 style={{ borderBottom: '1px solid #ddd' }}>VERIFICATION DETAILS</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 15 }}>
                  <div><strong>Verification Status:</strong> {values.verification.status}</div>
                  <div><strong>Date Received:</strong> {values.verification.received_date}</div>
                  <div><strong>Verified By:</strong> {values.verification.verifier_name}</div>
                </div>
                
                <div style={{ marginTop: 20 }}>
                   <strong>Comments/Deficiencies:</strong>
                   <div style={{ border: '1px solid #eee', padding: 10, marginTop: 5 }}>
                     {values.verification.comments || 'No comments'}
                   </div>
                </div>
              </div>
            );
          }

          return (
            <Form>
               <div style={{ marginBottom: 20 }}>
                 <label>Linked Request ID (FRM-00617 Ref)</label>
                 <Field name="ref_id" style={inputStyle} placeholder="Enter Request ID" />
                 {errors.ref_id && touched.ref_id && <div style={errorStyle}>{errors.ref_id}</div>}
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                 <div>
                   <label>Verification Status</label>
                   <Field as="select" name="verification.status" style={inputStyle}>
                     <option value="Pending">Pending</option>
                     <option value="Verified & Accepted">Verified & Accepted</option>
                     <option value="Rejected / Re-sign Required">Rejected / Re-sign Required</option>
                   </Field>
                 </div>
                 <div>
                   <label>Date Received</label>
                   <Field name="verification.received_date" type="date" style={inputStyle} />
                 </div>
               </div>

               <div style={{ marginTop: 15 }}>
                 <label>Verified By (HR Name)</label>
                 <Field name="verification.verifier_name" style={inputStyle} />
               </div>

               <div style={{ marginTop: 15 }}>
                 <label>Comments (e.g., Signature missing, document unclear)</label>
                 <Field as="textarea" name="verification.comments" rows="3" style={inputStyle} />
               </div>

               <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <button type="submit" style={buttonStyle}>💾 Submit Verification</button>
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

export default FRM00618;