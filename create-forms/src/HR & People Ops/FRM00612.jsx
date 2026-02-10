import React, { useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  approval: Yup.object({
    approved: Yup.boolean(),
    decision: Yup.string()
  }),
  budget: Yup.object({
    source: Yup.string().required()
  })
});

const initialValues = {
  req: {
    id: '{{req.id}}'
  },
  approval: {
    approved: false,
    decision: ''
  },
  budget: {
    source: '{{budget.source}}'
  }
};

const FRM00612 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = React.useState(initialValues);

  return (
    <FormWrapper
      formId="FRM-00612"
      version="1.0"
      title="Manpower Authorization Form"
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormValues(values);
          console.log('Form submitted:', values);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => {
          React.useEffect(() => {
            setFormValues(values);
          }, [values]);

          // PRINT MODE: Show plain HTML
          if (isPrintMode) {
            return (
              <div>
                <div style={{ backgroundColor: '#f0f0f0', padding: '15px', marginBottom: '20px' }}>
                  <strong>Reference Requisition:</strong> {values.req.id || '—'}
                </div>

                <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Management Decision</h4>
                <div style={{ padding: '20px 0', border: '1px solid #eee', padding: '15px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <strong>Decision:</strong> {values.approval.decision || '—'}
                  </div>
                  <div>
                    <strong>Approved:</strong> {values.approval.approved ? '✓ Yes' : '✗ No'}
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <strong>BUDGET IMPACT / FUND SOURCE</strong>
                  <div style={{ border: '1px solid #eee', padding: '10px', minHeight: '40px', marginTop: 10 }}>
                    {values.budget.source || '—'}
                  </div>
                </div>

                <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ border: '4px double #ccc', padding: '20px', textAlign: 'center', color: '#999', borderRadius: '10px' }}>
                    OFFICIAL APPROVAL STAMP SPACE
                  </div>
                </div>
              </div>
            );
          }

          // EDIT MODE: Show form inputs
          return (
            <Form>
              <div style={{ backgroundColor: '#f0f0f0', padding: '15px', marginBottom: '20px' }}>
                <strong>Reference Requisition:</strong> {values.req.id}
              </div>

              <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Management Decision</h4>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 10 }}>Decision / Comments</label>
                <Field
                  as="textarea"
                  name="approval.decision"
                  placeholder="Enter your decision..."
                  rows="4"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: 4, fontFamily: 'Arial' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <Field
                    type="checkbox"
                    name="approval.approved"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontWeight: 'bold' }}>Approved as requested</span>
                </label>
              </div>

              <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 10 }}>BUDGET IMPACT / FUND SOURCE</label>
                <Field
                  name="budget.source"
                  placeholder="Enter budget source or fund information"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: 4 }}
                />
                {errors.budget?.source && touched.budget?.source && (
                  <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.budget.source}</div>
                )}
              </div>

              <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ border: '4px double #ccc', padding: '20px', textAlign: 'center', color: '#999', borderRadius: '10px' }}>
                  OFFICIAL APPROVAL STAMP SPACE
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 30 }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#5cb85c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: 14
                  }}
                  disabled={isSubmitting}
                >
                  💾 Save & Preview
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

export default FRM00612;