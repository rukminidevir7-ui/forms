// FRM00464_WaterQualityTest.jsx
// FRM-00464 – Water Quality Test – Request / Initiation Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  requestorName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  facilityLocation: Yup.string().required('Required'),
  samplingPoint: Yup.string().required('Required'),
  requestedDate: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  testDetails: Yup.string().required('Required'),
  testType: Yup.string().required('Required'),
  parameters: Yup.string().required('Required'),

  sampleCollectionDate: Yup.string(),
  testingLaboratory: Yup.string(),
  observations: Yup.string(),

  attachments: Yup.array(),
  signatures: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  requestorName: '',
  department: '',
  contactNumber: '',
  facilityLocation: '',
  samplingPoint: '',
  requestedDate: '',
  priority: '',
  testDetails: '',
  testType: '',
  parameters: '',

  sampleCollectionDate: '',
  testingLaboratory: '',
  observations: '',

  attachments: [],
  signatures: [],
  customFields: []

};

const FRM00464_WaterQualityTest = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="4" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00464"
      title="Water Quality Test – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Water Quality Test request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00464"
              title="Water Quality Test"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* 1. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'requestorName','Requestor Name')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 2. Test Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Test Request Details</h3>
                <div className="form-fields">
                  {field(values,'facilityLocation','Facility / Location')}
                  {field(values,'samplingPoint','Sampling Point')}
                  {field(values,'requestedDate','Requested Date','date')}
                  {select(values,'priority','Priority',['Low','Medium','High'])}
                  {field(values,'testType','Test Type')}
                </div>
              </div>

              {/* 3. Test Specifications */}
              <div className="form-section">
                <h3 className="form-section-title">3. Test Specifications</h3>
                <div className="form-fields">
                  {textarea(values,'testDetails','Test Details')}
                  {textarea(values,'parameters','Parameters to be Tested')}
                </div>
              </div>

              {/* 4. Lab & Results Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Laboratory & Results</h3>
                <div className="form-fields">
                  {field(values,'sampleCollectionDate','Sample Collection Date','date')}
                  {field(values,'testingLaboratory','Testing Laboratory')}
                  {textarea(values,'observations','Observations / Findings')}
                </div>
              </div>

              {/* 5. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields full-width">
                  {isPrintMode ? (
                    <div className="print-value">
                      {values.attachments?.length > 0
                        ? 'Documents Attached'
                        : '___________________'}
                    </div>
                  ) : (
                    <FormAttachments values={values} />
                  )}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>

                  <div>
                    <label className="form-label required">Prepared By</label>
                    <FormSignatures
                      values={values}
                      setFieldValue={setFieldValue}
                      role="Prepared By"
                    />
                  </div>

                  <div>
                    <label className="form-label required">Reviewed By</label>
                    <FormSignatures
                      values={values}
                      setFieldValue={setFieldValue}
                      role="Reviewed By"
                    />
                  </div>

                  <div>
                    <label className="form-label required">Approved By</label>
                    <FormSignatures
                      values={values}
                      setFieldValue={setFieldValue}
                      role="Approved By"
                    />
                  </div>

                </div>
              </div>

              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Water Quality Test Request
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>

        )}

      </Formik>

    </ModernFormWrapper>

  );

};

export default FRM00464_WaterQualityTest;
