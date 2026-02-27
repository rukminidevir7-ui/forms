// FRM00492_WaterConsumptionLog.jsx
// FRM-00492 – Water Consumption Log – Log / Register

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
  department: Yup.string().required('Required'),
  process: Yup.string().required('Required'),
  site: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  meterNo: Yup.string().required('Required'),
  logEntries: Yup.array().of(
    Yup.object().shape({
      date: Yup.string().required('Required'),
      shift: Yup.string().required('Required'),
      openingReading: Yup.number().required('Required'),
      closingReading: Yup.number().required('Required')
    })
  ),
  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()
});

const initialValues = {

  formId: 'FRM-00492',
  department: 'Facilities & Utilities',
  process: 'Utilities',
  logType: 'Operational Log',

  site: '',
  location: '',
  meterNo: '',

  logEntries: [
    {
      date: '',
      shift: '',
      openingReading: '',
      closingReading: '',
      consumption: '',
      remarks: ''
    }
  ],

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00492_WaterConsumptionLog = () => {

  const { isPrintMode } = usePrintMode();

  const calculateConsumption = (opening, closing) => {
    if (opening === '' || closing === '') return '';
    const diff = Number(closing) - Number(opening);
    return diff >= 0 ? diff.toFixed(2) : '';
  };

  return (
    <ModernFormWrapper
      formId="FRM-00492"
      title="Water Consumption Log – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Water Consumption Log saved successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00492"
              title="WATER CONSUMPTION LOG"
              department="Facilities & Utilities – Utilities"
            >

              {/* FORM METADATA */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="department" className="form-input" />
                  <Field name="process" className="form-input" />
                  <Field name="logType" className="form-input" />
                  <Field name="site" placeholder="Site / Facility" className="form-input" />
                  <Field name="location" placeholder="Location" className="form-input" />
                  <Field name="meterNo" placeholder="Meter No" className="form-input" />
                </div>
              </div>

              {/* CONSUMPTION LOG TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Consumption Log Entries</h3>

                <FieldArray name="logEntries">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({
                              date: '',
                              shift: '',
                              openingReading: '',
                              closingReading: '',
                              consumption: '',
                              remarks: ''
                            })
                          }
                        >
                          + Add Entry
                        </button>
                      )}

                      {values.logEntries.map((entry, index) => {

                        const consumption = calculateConsumption(
                          entry.openingReading,
                          entry.closingReading
                        );

                        return (
                          <div
                            key={index}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 2fr auto',
                              gap: '8px',
                              marginBottom: '10px'
                            }}
                          >
                            <Field
                              type="date"
                              name={`logEntries.${index}.date`}
                              className="form-input"
                            />

                            <Field
                              name={`logEntries.${index}.shift`}
                              placeholder="Shift"
                              className="form-input"
                            />

                            <Field
                              type="number"
                              name={`logEntries.${index}.openingReading`}
                              placeholder="Opening (KL)"
                              className="form-input"
                            />

                            <Field
                              type="number"
                              name={`logEntries.${index}.closingReading`}
                              placeholder="Closing (KL)"
                              className="form-input"
                            />

                            <input
                              type="number"
                              value={consumption}
                              readOnly
                              className="form-input"
                            />

                            <Field
                              name={`logEntries.${index}.remarks`}
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
                                  border: 'none'
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
                {isPrintMode
                  ? <div className="print-value">
                      {values.attachments?.length > 0 ? 'Documents Attached' : '________________'}
                    </div>
                  : <FormAttachments values={values} />}
              </div>

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures role="Recorded By" values={values} />
                  <FormSignatures role="Checked By" values={values} />
                </div>

              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Water Consumption Log
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

export default FRM00492_WaterConsumptionLog;
