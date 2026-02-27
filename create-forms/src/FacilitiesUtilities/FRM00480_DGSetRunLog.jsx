// FRM00480_DGSetRunLog.jsx
// FRM-00480 – DG Set Run Log – Log / Register Form

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  location: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  dgSetId: Yup.string().required('Required'),
  operatorName: Yup.string().required('Required'),
  shift: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  runEntries: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.string().required('Required'),
      stopTime: Yup.string().required('Required')
    })
  ),
  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()
});

const initialValues = {
  formId: 'FRM-00480',
  location: '',
  date: '',
  dgSetId: '',
  operatorName: '',
  shift: '',
  department: '',
  runEntries: [
    {
      startTime: '',
      stopTime: '',
      runningHours: '',
      load: '',
      fuelLevel: '',
      remarks: ''
    }
  ],
  signatures: [],
  attachments: [],
  customFields: []
};

const FRM00480_DGSetRunLog = () => {

  const { isPrintMode } = usePrintMode();

  const calculateHours = (start, stop) => {
    if (!start || !stop) return '';
    const startTime = new Date(`1970-01-01T${start}`);
    const stopTime = new Date(`1970-01-01T${stop}`);
    const diff = (stopTime - startTime) / (1000 * 60 * 60);
    return diff > 0 ? diff.toFixed(2) : '';
  };

  return (
    <ModernFormWrapper
      formId="FRM-00480"
      title="DG Set Run Log – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('DG Set Run Log saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00480"
              title="DG SET RUN LOG"
              department="Facilities & Utilities – Utilities"
            >

              {/* BASIC DETAILS */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="location" placeholder="Location" className="form-input" />
                  <Field name="date" type="date" className="form-input" />
                  <Field name="dgSetId" placeholder="DG Set ID" className="form-input" />
                  <Field name="operatorName" placeholder="Operator Name" className="form-input" />
                  <Field name="shift" placeholder="Shift" className="form-input" />
                  <Field name="department" placeholder="Department" className="form-input" />
                </div>
              </div>

              {/* RUN LOG TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Run Log Entries</h3>

                <FieldArray name="runEntries">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({
                              startTime: '',
                              stopTime: '',
                              runningHours: '',
                              load: '',
                              fuelLevel: '',
                              remarks: ''
                            })
                          }
                        >
                          + Add Entry
                        </button>
                      )}

                      {values.runEntries.map((entry, index) => {

                        const hours = calculateHours(
                          entry.startTime,
                          entry.stopTime
                        );

                        return (
                          <div
                            key={index}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr auto',
                              gap: '10px',
                              marginBottom: '10px'
                            }}
                          >
                            <Field
                              type="time"
                              name={`runEntries.${index}.startTime`}
                              className="form-input"
                            />

                            <Field
                              type="time"
                              name={`runEntries.${index}.stopTime`}
                              className="form-input"
                            />

                            <input
                              type="number"
                              value={hours}
                              readOnly
                              className="form-input"
                            />

                            <Field
                              name={`runEntries.${index}.load`}
                              placeholder="Load (kW)"
                              className="form-input"
                            />

                            <Field
                              name={`runEntries.${index}.fuelLevel`}
                              placeholder="Fuel Level"
                              className="form-input"
                            />

                            <Field
                              name={`runEntries.${index}.remarks`}
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
                                  cursor: 'pointer'
                                }}
                              >
                                X
                              </button>
                            )}

                          </div>
                        );
                      })}

                    </>
                  )}
                </FieldArray>

              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                {isPrintMode ? (
                  <div className="print-value">
                    {values.attachments?.length > 0
                      ? 'Documents Attached'
                      : '________________'}
                  </div>
                ) : (
                  <FormAttachments values={values} />
                )}
              </div>

              {/* SIGNATURES */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures role="Prepared By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Reviewed By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Approved By" values={values} setFieldValue={setFieldValue} />
                </div>
              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save DG Run Log
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

export default FRM00480_DGSetRunLog;
