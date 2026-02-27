// FRM00477_ElectricityMeterReading.jsx
// FRM-00477 – Electricity Meter Reading – Request / Initiation Form

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

  date: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  meterId: Yup.string().required('Required'),
  meterType: Yup.string().required('Required'),
  previousReading: Yup.number().required('Required'),
  currentReading: Yup.number().required('Required'),
  readingDate: Yup.string().required('Required'),

  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  formId: 'FRM-00477-00479',
  date: '',
  location: '',
  department: '',
  requestedBy: '',
  approvedBy: '',

  meterId: '',
  meterType: '',
  previousReading: '',
  currentReading: '',
  unitsConsumed: '',
  readingDate: '',
  remarks: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00477_ElectricityMeterReading = () => {

  const { isPrintMode } = usePrintMode();

  const calculateUnits = (prev, curr) => {
    if (!prev || !curr) return '';
    return Number(curr) - Number(prev);
  };

  const field = (values, name, label, type = 'text', required = false) => (
    <div className="form-field">
      <label className={`form-label ${required ? 'required' : ''}`}>
        {label}
      </label>
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

  return (

    <ModernFormWrapper
      formId="FRM-00477"
      title="Electricity Meter Reading – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Electricity Meter Reading submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => {

          const units = calculateUnits(values.previousReading, values.currentReading);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-00477"
                title="ELECTRICITY METER READING FORM"
                department="Facilities & Utilities – Utilities"
              >

                {/* HEADER */}
                <div className="form-section">
                  <div className="form-fields">
                    {field(values,'formId','Form ID')}
                    {field(values,'date','Date','date',true)}
                  </div>
                </div>

                {/* LOCATION DETAILS */}
                <div className="form-section">
                  <div className="form-fields">
                    {field(values,'location','Location', 'text', true)}
                    {field(values,'department','Department', 'text', true)}
                    {field(values,'requestedBy','Requested By')}
                    {field(values,'approvedBy','Approved By')}
                  </div>
                </div>

                {/* METER DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Meter Details</h3>
                  <div className="form-fields">
                    {field(values,'meterId','Meter ID', 'text', true)}
                    {field(values,'meterType','Meter Type', 'text', true)}
                    {field(values,'previousReading','Previous Reading','number',true)}
                    {field(values,'currentReading','Current Reading','number',true)}

                    <div className="form-field">
                      <label className="form-label required">Units Consumed</label>
                      {isPrintMode ? (
                        <div className="print-value">
                          {units || '_________'}
                        </div>
                      ) : (
                        <input
                          type="number"
                          value={units}
                          readOnly
                          className="form-input"
                        />
                      )}
                    </div>

                    {field(values,'readingDate','Reading Date','date',true)}
                  </div>
                </div>

                {/* REMARKS */}
                <div className="form-section">
                  <h3 className="form-section-title">Remarks</h3>
                  <Field
                    as="textarea"
                    name="remarks"
                    className="form-textarea"
                    rows="3"
                  />
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
                    <FormSignatures
                      role="Prepared By"
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <FormSignatures
                      role="Verified By"
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <FormSignatures
                      role="Authorized Signatory"
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </div>

                {/* CUSTOM FIELDS */}
                <FormCustomFields values={values} />

                {!isPrintMode && (
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      Submit Meter Reading
                    </button>
                  </div>
                )}

              </ModernA4Template>

            </Form>
          );
        }}

      </Formik>

    </ModernFormWrapper>

  );

};

export default FRM00477_ElectricityMeterReading;
