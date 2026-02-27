// FRM00493_WastewaterTreatmentLog.jsx
// FRM-00493 – Wastewater Treatment Log – Log / Register

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
  plant: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  plantId: Yup.string().required('Required'),
  monitoringEntries: Yup.array().of(
    Yup.object().shape({
      date: Yup.string().required('Required'),
      shift: Yup.string().required('Required')
    })
  ),
  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()
});

const initialValues = {

  formId: 'FRM-00493',
  department: 'Facilities & Utilities',
  process: 'Utilities',
  logType: 'Operational Log',

  plant: '',
  location: '',
  plantId: '',

  monitoringEntries: [
    {
      date: '',
      shift: '',
      influentFlow: '',
      effluentFlow: '',
      ph: '',
      tss: '',
      bod: '',
      cod: '',
      chlorineDose: '',
      remarks: ''
    }
  ],

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00493_WastewaterTreatmentLog = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00493"
      title="Wastewater Treatment Log – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Wastewater Treatment Log saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00493"
              title="WASTEWATER TREATMENT LOG"
              department="Facilities & Utilities – Utilities"
            >

              {/* FORM METADATA */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="department" className="form-input" />
                  <Field name="process" className="form-input" />
                  <Field name="logType" className="form-input" />
                  <Field name="plant" placeholder="Plant / Facility" className="form-input" />
                  <Field name="location" placeholder="Location" className="form-input" />
                  <Field name="plantId" placeholder="STP / ETP ID" className="form-input" />
                </div>
              </div>

              {/* MONITORING TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Treatment Monitoring Entries</h3>

                <FieldArray name="monitoringEntries">
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
                              influentFlow: '',
                              effluentFlow: '',
                              ph: '',
                              tss: '',
                              bod: '',
                              cod: '',
                              chlorineDose: '',
                              remarks: ''
                            })
                          }
                        >
                          + Add Entry
                        </button>
                      )}

                      {values.monitoringEntries.map((entry, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'grid',
                            gridTemplateColumns:
                              '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr auto',
                            gap: '8px',
                            marginBottom: '10px'
                          }}
                        >
                          <Field type="date" name={`monitoringEntries.${index}.date`} className="form-input" />
                          <Field name={`monitoringEntries.${index}.shift`} placeholder="Shift" className="form-input" />
                          <Field name={`monitoringEntries.${index}.influentFlow`} placeholder="Influent (m³)" className="form-input" />
                          <Field name={`monitoringEntries.${index}.effluentFlow`} placeholder="Effluent (m³)" className="form-input" />
                          <Field name={`monitoringEntries.${index}.ph`} placeholder="pH" className="form-input" />
                          <Field name={`monitoringEntries.${index}.tss`} placeholder="TSS" className="form-input" />
                          <Field name={`monitoringEntries.${index}.bod`} placeholder="BOD" className="form-input" />
                          <Field name={`monitoringEntries.${index}.cod`} placeholder="COD" className="form-input" />
                          <Field name={`monitoringEntries.${index}.chlorineDose`} placeholder="Chlorine Dose" className="form-input" />
                          <Field name={`monitoringEntries.${index}.remarks`} placeholder="Remarks" className="form-input" />

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
                      ))}

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
                  <FormSignatures role="Recorded By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Checked By" values={values} setFieldValue={setFieldValue} />
                </div>

              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Wastewater Treatment Log
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

export default FRM00493_WastewaterTreatmentLog;
