// FRM00491_BoilerLog.jsx
// FRM-00491 – Boiler Log – Log / Register

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
  boilerId: Yup.string().required('Required'),
  logEntries: Yup.array().of(
    Yup.object().shape({
      date: Yup.string().required('Required'),
      shift: Yup.string().required('Required'),
      startTime: Yup.string().required('Required'),
      endTime: Yup.string().required('Required')
    })
  ),
  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()
});

const initialValues = {

  formId: 'FRM-00491',
  department: 'Facilities & Utilities',
  process: 'Utilities',
  logType: 'Operational Log',

  site: '',
  location: '',
  boilerId: '',

  logEntries: [
    {
      date: '',
      shift: '',
      startTime: '',
      endTime: '',
      runningHours: '',
      steamPressure: '',
      waterLevel: '',
      fuelConsumption: '',
      temperature: '',
      remarks: ''
    }
  ],

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00491_BoilerLog = () => {

  const { isPrintMode } = usePrintMode();

  const calculateHours = (start, end) => {
    if (!start || !end) return '';
    const s = new Date(`1970-01-01T${start}`);
    const e = new Date(`1970-01-01T${end}`);
    const diff = (e - s) / (1000 * 60 * 60);
    return diff > 0 ? diff.toFixed(2) : '';
  };

  return (
    <ModernFormWrapper
      formId="FRM-00491"
      title="Boiler Log – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Boiler Log saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00491"
              title="BOILER LOG"
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
                  <Field name="boilerId" placeholder="Boiler ID / Equipment No" className="form-input" />
                </div>
              </div>

              {/* OPERATIONAL LOG TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Operational Log Entries</h3>

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
                              startTime: '',
                              endTime: '',
                              runningHours: '',
                              steamPressure: '',
                              waterLevel: '',
                              fuelConsumption: '',
                              temperature: '',
                              remarks: ''
                            })
                          }
                        >
                          + Add Entry
                        </button>
                      )}

                      {values.logEntries.map((entry, index) => {

                        const hours = calculateHours(
                          entry.startTime,
                          entry.endTime
                        );

                        return (
                          <div
                            key={index}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr auto',
                              gap: '8px',
                              marginBottom: '10px'
                            }}
                          >
                            <Field type="date" name={`logEntries.${index}.date`} className="form-input" />
                            <Field name={`logEntries.${index}.shift`} placeholder="Shift" className="form-input" />
                            <Field type="time" name={`logEntries.${index}.startTime`} className="form-input" />
                            <Field type="time" name={`logEntries.${index}.endTime`} className="form-input" />

                            <input
                              type="number"
                              value={hours}
                              readOnly
                              className="form-input"
                            />

                            <Field name={`logEntries.${index}.steamPressure`} placeholder="Steam Pressure" className="form-input" />
                            <Field name={`logEntries.${index}.waterLevel`} placeholder="Water Level" className="form-input" />
                            <Field name={`logEntries.${index}.fuelConsumption`} placeholder="Fuel Consumption" className="form-input" />
                            <Field name={`logEntries.${index}.temperature`} placeholder="Temperature" className="form-input" />
                            <Field name={`logEntries.${index}.remarks`} placeholder="Remarks" className="form-input" />

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
                  <FormSignatures role="Logged By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Checked By" values={values} setFieldValue={setFieldValue} />
                </div>

              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Boiler Log
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

export default FRM00491_BoilerLog;
