import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  candidate: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  project: Yup.string().required('Required'),
  ctc: Yup.object({
    fixed: Yup.number().required('Required'),
    variable: Yup.number().required('Required'),
  }),
  budget_status: Yup.string().required('Required'),
});

const initialValues = {
  candidate: '',
  designation: '',
  project: '',
  grade: '',
  ctc: {
    fixed: '',
    variable: '',
    total: '',
  },
  budget_status: 'Within Budget',
  justification: '', // If over budget
  joining_date: '',
};

const FRM00623 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper formId="FRM-00623" version="1.0" title="Offer Approval Note">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => setFormValues(values)}
      >
        {({ values, errors, touched, setFieldValue }) => {
          useEffect(() => {
            const total = Number(values.ctc.fixed || 0) + Number(values.ctc.variable || 0);
            setFieldValue('ctc.total', total);
            setFormValues(values);
          }, [values.ctc.fixed, values.ctc.variable]);

          if (isPrintMode) {
            return (
              <div className="print-view">
                <h4 style={{ borderBottom: '1px solid #ddd' }}>PROPOSAL DETAILS</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 20 }}>
                   <div><strong>Candidate:</strong> {values.candidate}</div>
                   <div><strong>Designation:</strong> {values.designation}</div>
                   <div><strong>Project/Dept:</strong> {values.project}</div>
                   <div><strong>Grade/Level:</strong> {values.grade || '—'}</div>
                   <div><strong>Exp. Joining:</strong> {values.joining_date || '—'}</div>
                </div>

                <h4 style={{ borderBottom: '1px solid #ddd' }}>COMPENSATION (CTC)</h4>
                <table style={{ width: '100%', marginBottom: 20 }}>
                  <tbody>
                    <tr><td><strong>Fixed Component:</strong></td><td>{values.ctc.fixed}</td></tr>
                    <tr><td><strong>Variable/Bonus:</strong></td><td>{values.ctc.variable}</td></tr>
                    <tr style={{ borderTop: '1px solid #000' }}>
                      <td><strong>Total Annual CTC:</strong></td>
                      <td><strong>{values.ctc.total}</strong></td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ padding: 10, background: '#f5f5f5', border: '1px solid #ddd' }}>
                   <strong>Budget Status:</strong> {values.budget_status}
                   {values.budget_status === 'Over Budget' && (
                     <div style={{ marginTop: 5 }}><strong>Justification:</strong> {values.justification}</div>
                   )}
                </div>

                <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'center' }}><hr style={{ width: 100 }} />Hiring Manager</div>
                  <div style={{ textAlign: 'center' }}><hr style={{ width: 100 }} />Finance Head</div>
                  <div style={{ textAlign: 'center' }}><hr style={{ width: 100 }} />HR Head</div>
                </div>
              </div>
            );
          }

          return (
            <Form>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 15 }}>
                <div>
                  <label>Candidate Name</label>
                  <Field name="candidate" style={inputStyle} />
                </div>
                <div>
                  <label>Proposed Designation</label>
                  <Field name="designation" style={inputStyle} />
                </div>
                <div>
                  <label>Project / Department</label>
                  <Field name="project" style={inputStyle} />
                </div>
                <div>
                  <label>Grade / Level</label>
                  <Field name="grade" style={inputStyle} />
                </div>
                <div>
                  <label>Expected Joining Date</label>
                  <Field name="joining_date" type="date" style={inputStyle} />
                </div>
              </div>

              <h4 style={{ marginBottom: 10 }}>Compensation Proposal</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15, marginBottom: 15 }}>
                <div>
                  <label>Fixed CTC (Annual)</label>
                  <Field name="ctc.fixed" type="number" style={inputStyle} />
                </div>
                <div>
                  <label>Variable / Bonus</label>
                  <Field name="ctc.variable" type="number" style={inputStyle} />
                </div>
                <div>
                  <label>Total CTC</label>
                  <input value={values.ctc.total} readOnly style={{ ...inputStyle, background: '#eee', fontWeight: 'bold' }} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label>Budget Status</label>
                <Field as="select" name="budget_status" style={inputStyle}>
                  <option value="Within Budget">Within Budget</option>
                  <option value="Over Budget">Over Budget (Requires Justification)</option>
                </Field>
              </div>

              {values.budget_status === 'Over Budget' && (
                <div style={{ marginBottom: 20 }}>
                  <label>Budget Deviation Justification</label>
                  <Field as="textarea" name="justification" rows="3" style={inputStyle} />
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button type="submit" style={buttonStyle}>💾 Generate Approval Note</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '10px 24px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default FRM00623;