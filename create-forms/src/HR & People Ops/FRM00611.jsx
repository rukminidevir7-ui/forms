import React, { useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  proj: Yup.object({
    site_name: Yup.string().required('Required'),
    wbs_code: Yup.string().required('Required'),
  }),
  hire: Yup.object({
    category: Yup.string().required(),
    trade: Yup.string().required(),
    count: Yup.number().min(1).required(),
    reason: Yup.string().required(),
  }),
});

const initialValues = {
  proj: {
    site_name: '{{proj.site_name}}',
    wbs_code: '{{proj.wbs_code}}',
  },
  hire: {
    category: '{{hire.category}}',
    trade: '{{hire.trade}}',
    count: '',
    reason: '',
  },
};

const FRM00611 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = React.useState(initialValues);

  return (
    <FormWrapper
      formId="FRM-00611"
      version="1.0"
      title="Manpower Requisition Form"
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
          // Update form values whenever Formik values change
          React.useEffect(() => {
            setFormValues(values);
          }, [values]);

          // PRINT MODE: Show plain HTML
          if (isPrintMode) {
            return (
              <div>
                <h4 style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>PROJECT & SITE INFORMATION</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <strong>PROJECT SITE:</strong>
                    <div style={{ padding: '8px', border: '1px solid #eee', marginTop: 5 }}>
                      {values.proj.site_name || '—'}
                    </div>
                  </div>
                  <div>
                    <strong>WBS / COST CODE:</strong>
                    <div style={{ padding: '8px', border: '1px solid #eee', marginTop: 5 }}>
                      {values.proj.wbs_code || '—'}
                    </div>
                  </div>
                </div>

                <h4 style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>MANPOWER SPECIFICATIONS</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                      <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
                      <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>Trade</th>
                      <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: 8, border: '1px solid #ddd' }}>{values.hire.category || '—'}</td>
                      <td style={{ padding: 8, border: '1px solid #ddd' }}>{values.hire.trade || '—'}</td>
                      <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'center' }}>{values.hire.count || '—'}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ marginBottom: 20 }}>
                  <strong>Reason for Hiring:</strong>
                  <div style={{ padding: '8px', border: '1px solid #eee', marginTop: 5, whiteSpace: 'pre-wrap' }}>
                    {values.hire.reason || '—'}
                  </div>
                </div>
              </div>
            );
          }

          // EDIT MODE: Show Formik inputs
          return (
            <Form>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ fontWeight: 'bold' }}>PROJECT SITE</label>
                  <Field 
                    name="proj.site_name"
                    placeholder="Enter project site name"
                    style={{ width: '100%', padding: '8px', marginTop: 5, border: '1px solid #ddd', borderRadius: 4 }}
                  />
                  {errors.proj?.site_name && touched.proj?.site_name && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.proj.site_name}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontWeight: 'bold' }}>WBS / COST CODE</label>
                  <Field 
                    name="proj.wbs_code"
                    placeholder="Enter WBS code"
                    style={{ width: '100%', padding: '8px', marginTop: 5, border: '1px solid #ddd', borderRadius: 4 }}
                  />
                  {errors.proj?.wbs_code && touched.proj?.wbs_code && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.proj.wbs_code}</div>
                  )}
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>Trade</th>
                    <th style={{ padding: 8, border: '1px solid #ddd', textAlign: 'left' }}>Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: 8, border: '1px solid #ddd' }}>
                      <Field 
                        name="hire.category"
                        placeholder="e.g., Skilled"
                        style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: 4 }}
                      />
                    </td>
                    <td style={{ padding: 8, border: '1px solid #ddd' }}>
                      <Field 
                        name="hire.trade"
                        placeholder="e.g., Electrician"
                        style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: 4 }}
                      />
                    </td>
                    <td style={{ padding: 8, border: '1px solid #ddd' }}>
                      <Field 
                        name="hire.count" 
                        type="number" 
                        placeholder="0"
                        style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: 4 }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 'bold' }}>Reason for Hiring</label>
                <Field 
                  as="textarea" 
                  name="hire.reason"
                  placeholder="Explain why hiring is needed"
                  rows="4"
                  style={{ width: '100%', padding: '8px', marginTop: 5, border: '1px solid #ddd', borderRadius: 4, fontFamily: 'Arial' }}
                />
                {errors.hire?.reason && touched.hire?.reason && (
                  <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.hire.reason}</div>
                )}
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

export default FRM00611;
