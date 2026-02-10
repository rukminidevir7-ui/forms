import React, { useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  stats: Yup.object({
    total_req: Yup.number().required(),
    total_approved: Yup.number().required()
  }),
  item: Yup.object({
    req_id: Yup.string().required(),
    site_name: Yup.string().required(),
    status: Yup.string().required()
  })
});

const initialValues = {
  stats: {
    total_req: '',
    total_approved: ''
  },
  item: {
    req_id: '{{item.req_id}}',
    site_name: '{{item.site_name}}',
    status: '{{item.status}}'
  }
};

const FRM00613 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = React.useState(initialValues);

  return (
    <FormWrapper
      formId="FRM-00613"
      version="1.0"
      title="Manpower Tracking Summary"
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
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{values.stats.total_req || '—'}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>TOTAL REQUESTS</div>
                  </div>
                  <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{values.stats.total_approved || '—'}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>TOTAL APPROVED</div>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#333', color: '#fff' }}>
                      <th style={{ padding: '8px', border: '1px solid #444', textAlign: 'left' }}>Req ID</th>
                      <th style={{ padding: '8px', border: '1px solid #444', textAlign: 'left' }}>Site</th>
                      <th style={{ padding: '8px', border: '1px solid #444', textAlign: 'left' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{values.item.req_id || '—'}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{values.item.site_name || '—'}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>{values.item.status || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          }

          // EDIT MODE: Show form inputs
          return (
            <Form>
              <h4 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Summary Statistics</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>Total Requests</label>
                  <Field
                    name="stats.total_req"
                    type="number"
                    placeholder="0"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: 4 }}
                  />
                  {errors.stats?.total_req && touched.stats?.total_req && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.stats.total_req}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>Total Approved</label>
                  <Field
                    name="stats.total_approved"
                    type="number"
                    placeholder="0"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: 4 }}
                  />
                  {errors.stats?.total_approved && touched.stats?.total_approved && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.stats.total_approved}</div>
                  )}
                </div>
              </div>

              <h4 style={{ marginBottom: '20px', fontWeight: 'bold', marginTop: 30 }}>Tracking Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15, marginBottom: 20 }}>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>Req ID</label>
                  <Field
                    name="item.req_id"
                    placeholder="Enter requisition ID"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: 4 }}
                  />
                  {errors.item?.req_id && touched.item?.req_id && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.item.req_id}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>Site Name</label>
                  <Field
                    name="item.site_name"
                    placeholder="Enter site name"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: 4 }}
                  />
                  {errors.item?.site_name && touched.item?.site_name && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.item.site_name}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>Status</label>
                  <Field
                    name="item.status"
                    placeholder="e.g., Active, Pending"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: 4 }}
                  />
                  {errors.item?.status && touched.item?.status && (
                    <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.item.status}</div>
                  )}
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

export default FRM00613;