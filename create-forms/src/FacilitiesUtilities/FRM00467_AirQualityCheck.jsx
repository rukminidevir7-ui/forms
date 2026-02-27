// FRM00467_AirQualityCheck.jsx
// FRM-00467 – Air Quality Check – Request / Initiation Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  department: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  contact: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),
  frequency: Yup.string().required('Required'),
  observations: Yup.string(),
  measurementDetails: Yup.array().of(
    Yup.object().shape({
      parameter: Yup.string().required('Required'),
      reading: Yup.string().required('Required'),
      unit: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ),
  signatures: Yup.array(),
  customFields: Yup.array()
});

const initialValues = {
  formNo: 'FRM-00467',
  date: '',
  department: '',
  location: '',
  requestedBy: '',
  contact: '',
  purpose: '',
  frequency: '',
  observations: '',
  measurementDetails: [
    { parameter: 'PM2.5', reading: '', unit: 'μg/m3', remarks: '' },
    { parameter: 'PM10', reading: '', unit: 'μg/m3', remarks: '' },
    { parameter: 'CO2', reading: '', unit: 'ppm', remarks: '' },
    { parameter: 'Temperature', reading: '', unit: '°C', remarks: '' },
    { parameter: 'Humidity', reading: '', unit: '%', remarks: '' }
  ],
  signatures: [],
  customFields: []
};

const FRM00467_AirQualityCheck = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00467"
      title="Air Quality Check – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Air Quality Check submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00467"
              title="Air Quality Check"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* Basic Details */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Details</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label required">Date</label>
                    <Field name="date" type="date" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Department</label>
                    <Field name="department" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Location</label>
                    <Field name="location" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Requested By</label>
                    <Field name="requestedBy" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Contact</label>
                    <Field name="contact" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Purpose</label>
                    <Field name="purpose" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Frequency</label>
                    <Field name="frequency" className="form-input" />
                  </div>

                </div>
              </div>

              {/* Measurement Details with Add/Remove */}
              <div className="form-section">
                <h3 className="form-section-title">
                  Measurement Details
                </h3>

                <FieldArray name="measurementDetails">
                  {({ push, remove }) => (
                    <>

                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({
                              parameter: '',
                              reading: '',
                              unit: '',
                              remarks: ''
                            })
                          }
                        >
                          + Add Measurement Row
                        </button>
                      )}

                      {values.measurementDetails.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                            gap: '10px',
                            marginBottom: '10px'
                          }}
                        >
                          <Field
                            name={`measurementDetails.${index}.parameter`}
                            placeholder="Parameter"
                            className="form-input"
                          />
                          <Field
                            name={`measurementDetails.${index}.reading`}
                            placeholder="Reading"
                            className="form-input"
                          />
                          <Field
                            name={`measurementDetails.${index}.unit`}
                            placeholder="Unit"
                            className="form-input"
                          />
                          <Field
                            name={`measurementDetails.${index}.remarks`}
                            placeholder="Remarks"
                            className="form-input"
                          />

                          {!isPrintMode && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              style={{
                                background: 'red',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer'
                              }}
                            >
                              X
                            </button>
                          )}
                        </div>
                      ))}

                    </>
                  )}
                </FieldArray>

              </div>

              {/* Observations */}
              <div className="form-section">
                <h3 className="form-section-title">Observations / Notes</h3>
                <Field
                  as="textarea"
                  name="observations"
                  className="form-textarea"
                  rows="4"
                />
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures role="Prepared By" values={values} />
                  <FormSignatures role="Reviewed By" values={values} />
                  <FormSignatures role="Approved By" values={values} />
                </div>
              </div>

              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Air Quality Check
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

export default FRM00467_AirQualityCheck;
